import json
import tempfile
import unittest
from pathlib import Path

from peach.follow_secrets import Credential
from peach.http import HttpResponse
from peach import xchina_flaresolverr as solver


class FlareSolverrSettingsTests(unittest.TestCase):
    def test_endpoint_is_limited_to_an_http_v1_service(self):
        self.assertEqual(solver.normalize_endpoint("http://flaresolverr:8191"),
                         "http://flaresolverr:8191/v1")
        self.assertEqual(solver.normalize_endpoint("https://solver.lan/v1/"),
                         "https://solver.lan/v1")
        for value in ("ftp://solver/v1", "http://user:pass@solver/v1",
                      "http://solver/v1?q=1", "http://solver/admin", ""):
            with self.subTest(value=value), self.assertRaises(ValueError):
                solver.normalize_endpoint(value)

    def test_settings_never_return_the_saved_endpoint_and_blank_keeps_it(self):
        with tempfile.TemporaryDirectory() as temp:
            root = Path(temp)
            first = solver.save_settings(root, {
                "enabled": True,
                "endpoint": "http://flaresolverr:8191/v1",
            })
            self.assertEqual(first, {"enabled": True, "endpoint_saved": True})
            second = solver.save_settings(root, {"enabled": False, "endpoint": ""})
            self.assertEqual(second, {"enabled": False, "endpoint_saved": True})
            credential = solver.load_settings(root)
            self.assertEqual(credential.values["endpoint"],
                             "http://flaresolverr:8191/v1")

    def test_enabling_without_an_address_is_rejected(self):
        with tempfile.TemporaryDirectory() as temp, self.assertRaises(ValueError):
            solver.save_settings(Path(temp), {"enabled": True, "endpoint": ""})


class FlareSolverrRequestTests(unittest.TestCase):
    def test_solver_returns_the_page_and_cookie_session(self):
        seen = []

        def transport(request, timeout, max_bytes):
            seen.append((request, timeout, max_bytes))
            return HttpResponse(200, {}, json.dumps({
                "status": "ok",
                "solution": {
                    "status": 200,
                    "url": "https://xchina.co/model/61be1af337a19",
                    "response": "<html>model</html>",
                    "headers": {"Content-Type": "text/html; charset=utf-8"},
                    "cookies": [{"name": "cf_clearance", "value": "abc"}],
                    "userAgent": "Solved Browser",
                },
            }).encode())

        client = solver.FlareSolverr(Credential(solver.CREDENTIAL_PROVIDER, {
            "enabled": "true", "endpoint": "http://flaresolverr:8191/v1",
        }), transport=transport)
        solved = client.solve("https://xchina.co/model/61be1af337a19")
        self.assertEqual(solved.response.body, b"<html>model</html>")
        self.assertEqual(solved.cookie_header, "cf_clearance=abc")
        self.assertEqual(solved.user_agent, "Solved Browser")
        request, timeout, max_bytes = seen[0]
        self.assertEqual(request.method, "POST")
        self.assertEqual(request.url, "http://flaresolverr:8191/v1")
        self.assertEqual(json.loads(request.body)["cmd"], "request.get")
        self.assertEqual(timeout, solver.REQUEST_TIMEOUT)
        self.assertEqual(max_bytes, solver.MAX_RESPONSE_BYTES)

    def test_disabled_solver_never_calls_the_service(self):
        called = False

        def transport(request, timeout, max_bytes):
            nonlocal called
            called = True
            return HttpResponse(500, {}, b"")

        client = solver.FlareSolverr(Credential(solver.CREDENTIAL_PROVIDER, {
            "enabled": "false", "endpoint": "http://flaresolverr:8191/v1",
        }), transport=transport)
        with self.assertRaises(solver.FlareSolverrError):
            client.solve("https://xchina.co/")
        self.assertFalse(called)


if __name__ == "__main__":
    unittest.main()
