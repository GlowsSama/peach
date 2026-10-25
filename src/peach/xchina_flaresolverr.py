"""XChina 的可选 FlareSolverr 回退。

设置只保存在本机 secrets 下。连接器先走普通 HTTP；只有站点返回 Cloudflare
拦截页时才请求这里配置的外部浏览器求解服务。求解得到的 Cookies 只留在当前
连接器实例内，不写日志、不写响应正文，也不并入用户的 XChina 登录 Cookie。
"""
from __future__ import annotations

import json
import urllib.parse
from dataclasses import dataclass
from pathlib import Path
from typing import Mapping

import httpx

from .follow_secrets import Credential, CredentialStore
from .http import HttpRequest, HttpResponse, HttpTransport, HttpxTransport
from .user_agent import USER_AGENT


CREDENTIAL_PROVIDER = "xchina-flaresolverr"
MAX_RESPONSE_BYTES = 16 * 1024 * 1024
REQUEST_TIMEOUT = 75.0


class FlareSolverrError(RuntimeError):
    """外部求解服务不可用、响应格式不符，或没有通过验证。"""


@dataclass(frozen=True)
class SolvedPage:
    response: HttpResponse
    cookie_header: str
    user_agent: str


def normalize_endpoint(value: object) -> str:
    """校验并规范化 `/v1` 接口地址。

    接受 `http://host:8191`、`https://host/v1` 这类地址；拒绝账号密码、查询串、
    片段和任意额外路径。局域网 HTTP 是用户明确配置的本机基础设施，因此不限制
    到公网地址。
    """
    text = str(value or "").strip()
    if not text:
        raise ValueError("请填写 FlareSolverr 地址")
    try:
        parsed = urllib.parse.urlsplit(text)
    except ValueError as exc:
        raise ValueError("FlareSolverr 地址格式不正确") from exc
    if parsed.scheme not in {"http", "https"} or not parsed.hostname:
        raise ValueError("FlareSolverr 地址必须是 http(s) URL")
    if parsed.username is not None or parsed.password is not None:
        raise ValueError("FlareSolverr 地址不能包含账号密码")
    if parsed.query or parsed.fragment:
        raise ValueError("FlareSolverr 地址不能包含查询串或片段")
    path = (parsed.path or "").rstrip("/")
    if path not in {"", "/v1"}:
        raise ValueError("FlareSolverr 地址应指向 /v1，例如 http://flaresolverr:8191/v1")
    return urllib.parse.urlunsplit(
        (parsed.scheme.lower(), parsed.netloc, "/v1", "", ""))


def public_settings(credential: Credential | None) -> dict[str, object]:
    """配置页可读形状；不回显已保存的地址或任何浏览器会话数据。"""
    values = credential.values if credential is not None else {}
    enabled = str(values.get("enabled") or "").strip().lower() in {"1", "true", "yes", "on"}
    return {"enabled": enabled, "endpoint_saved": bool(str(values.get("endpoint") or "").strip())}


def load_settings(root: Path) -> Credential | None:
    return CredentialStore(root).load(CREDENTIAL_PROVIDER)


def save_settings(root: Path, body: Mapping[str, object]) -> dict[str, object]:
    """保存启用状态与可选地址。空白地址保留旧值，关闭不会顺手删除地址。"""
    store = CredentialStore(root)
    existing = store.load(CREDENTIAL_PROVIDER)
    current = dict(existing.values) if existing is not None else {}
    enabled = body.get("enabled", public_settings(existing)["enabled"])
    if not isinstance(enabled, bool):
        raise ValueError("启用状态必须是布尔值")
    endpoint = body.get("endpoint", "")
    if not isinstance(endpoint, str):
        raise ValueError("FlareSolverr 地址必须是文字")
    saved_endpoint = str(current.get("endpoint") or "").strip()
    endpoint = normalize_endpoint(endpoint) if endpoint.strip() else saved_endpoint
    if enabled and not endpoint:
        raise ValueError("启用 FlareSolverr 前请填写地址")
    values = {
        "enabled": "true" if enabled else "false",
        **({"endpoint": endpoint} if endpoint else {}),
    }
    store.save(CREDENTIAL_PROVIDER, values)
    return public_settings(store.load(CREDENTIAL_PROVIDER))


class FlareSolverr:
    """向 FlareSolverr `/v1` 发一次 request.get。"""

    def __init__(self, credential: Credential | None, *, transport: HttpTransport | None = None,
                 timeout: float = REQUEST_TIMEOUT):
        self.credential = credential
        self.transport = transport or HttpxTransport()
        self.timeout = float(timeout)

    @property
    def enabled(self) -> bool:
        return bool(public_settings(self.credential)["enabled"])

    def solve(self, url: str) -> SolvedPage:
        if not self.enabled or self.credential is None:
            raise FlareSolverrError("FlareSolverr 未启用")
        try:
            endpoint = normalize_endpoint(self.credential.values.get("endpoint"))
        except ValueError as exc:
            raise FlareSolverrError(str(exc)) from exc
        body = json.dumps({
            "cmd": "request.get",
            "url": url,
            "maxTimeout": 60000,
        }, ensure_ascii=False).encode("utf-8")
        request = HttpRequest("POST", endpoint, {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "User-Agent": USER_AGENT,
        }, body)
        try:
            response = self.transport(request, self.timeout, MAX_RESPONSE_BYTES)
        except (OSError, httpx.HTTPError) as exc:
            raise FlareSolverrError(
                "无法连接 FlareSolverr，请检查地址、服务状态和网络") from exc
        if response.status != 200:
            raise FlareSolverrError(f"FlareSolverr 返回 HTTP {response.status}")
        try:
            payload = json.loads(response.body.decode("utf-8"))
        except (UnicodeDecodeError, json.JSONDecodeError) as exc:
            raise FlareSolverrError("FlareSolverr 返回的不是合法 JSON") from exc
        return _solved_page(payload, url)


def _cookie_header(cookies: object) -> str:
    pairs: list[str] = []
    if not isinstance(cookies, list):
        return ""
    for cookie in cookies:
        if not isinstance(cookie, dict):
            continue
        name = str(cookie.get("name") or "").strip()
        value = str(cookie.get("value") or "").strip()
        if name and value and ";" not in name and ";" not in value:
            pairs.append(f"{name}={value}")
    return "; ".join(pairs)


def _solved_page(payload: object, url: str) -> SolvedPage:
    """把 FlareSolverr JSON 收成一个不含服务地址的页面结果。"""
    if not isinstance(payload, dict) or payload.get("status") != "ok":
        message = str(payload.get("message") or "验证未通过") if isinstance(payload, dict) else "验证未通过"
        raise FlareSolverrError(f"FlareSolverr 未完成请求：{message[:180]}")
    solution = payload.get("solution")
    if not isinstance(solution, dict):
        raise FlareSolverrError("FlareSolverr 响应缺少 solution")
    try:
        status = int(solution.get("status") or 0)
    except (TypeError, ValueError):
        status = 0
    source = solution.get("response")
    if status < 200 or status >= 400 or not isinstance(source, str):
        raise FlareSolverrError(f"FlareSolverr 求解后的页面状态异常（HTTP {status}）")
    headers = solution.get("headers")
    normalized_headers = {
        str(key): str(value) for key, value in headers.items()
    } if isinstance(headers, dict) else {}
    normalized_headers.setdefault("Content-Type", "text/html; charset=utf-8")
    return SolvedPage(
        response=HttpResponse(status, normalized_headers, source.encode("utf-8"),
                              str(solution.get("url") or url)),
        cookie_header=_cookie_header(solution.get("cookies")),
        user_agent=str(solution.get("userAgent") or ""),
    )
