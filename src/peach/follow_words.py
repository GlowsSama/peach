"""追更来源页面上的原文词表：站点栏名、社交服务名、计数与分节写法。

这里只放数据。界面文字在 `resources/locales/`，逻辑在各自的连接器与发现模块。
"""
from __future__ import annotations

import re

#: XChina 搜索词里跟着人名的站点俗称，例如「喵小吉 小黄书」。
XCHINA_SEARCH_SUFFIX_RE = re.compile(r"\s*小[黄黃][书書]\s*$", re.IGNORECASE)

#: XChina 搜索结果底部的「人物」分区标题；只有这一节里的链接才是模特页。
XCHINA_PERSON_HEADING = "模特/女优/摄影师"

#: 站点没给标题时的兜底名；模特 id 是站上的稳定标识。
XCHINA_MODEL_LABEL = "XChina 模特 {model_id}"

#: XChina 人物卡上社交链接的域名到服务名。服务名是站上的写法，不是界面文字。
XCHINA_SOCIAL_SERVICES = {
    "instagram.com": "Instagram",
    "twitter.com": "X",
    "x.com": "X",
    "tiktok.com": "TikTok",
    "weibo.com": "微博",
}

#: 糖心Vlog 演员页上的作品总数写法，例如「共 12 部影片」。
TANGXIN_COUNT_RE = re.compile(r"(?:共|共计)\s*(\d+)\s*(?:部影片|部视频|个视频)")

#: 糖心Vlog 详情页里「相关影片」之后才是推荐位；它之前的演员链接才是本片作者。
TANGXIN_RELATED_RE = re.compile(r"相关影片|相關影片|相关视频|相關視頻")

#: 糖心Vlog 的站名。品牌名，各语言一致，所以放在词表里而不进语言资源。
TANGXIN_PROVIDER_LABEL = "糖心Vlog"
