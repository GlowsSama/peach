# CosplayTele 分类追更与作品图集证据

- 取证日期：2026-10-26
- 取证通道：Python HTTPX 直接读取公开 HTML；未使用 Cookie、账号或浏览器脚本。
- 用途：Cosplayer 分类追更、分类分页、作品详情字段与图集顺序。
- 登记边界：本文件是人工取证笔记，不是上游原文快照。robots.txt 原文另存为
  [`upstream/cosplaytele-robots.txt`](upstream/cosplaytele-robots.txt)，索引见
  [`docs/reference-sources.json`](../reference-sources.json) 的 `cosplaytele-robots`。

以下结论均为 **实测**，日期与 SHA-256 只标识当次公开响应。分类和作品页包含动态推荐、
懒加载及随作品变化的图集，整页哈希不是长期内容版本。

| 请求 | 状态 | 字节数 | SHA-256 |
| --- | --- | ---: | --- |
| `https://cosplaytele.com/robots.txt` | 200 | 681 | `728e1f06d5b05bfcf8aa824caf5f8d5b859231e6ca2553ccec93632f686254d9` |
| `https://cosplaytele.com/category/tiny-asababy/` | 200 | 291,244 | `3c8cf209da31bbd3b21d26194ab62afd1f83762bf9c70479e9a58b1664cea5b2` |
| `https://cosplaytele.com/category/tiny-asababy/page/2/` | 200 | 291,663 | `b7a04fb0addaed9fd6d4f49162018d3c769ced5d73c3d1cda7de9f745ae93b4c` |
| `https://cosplaytele.com/lynae-10/` | 200 | 380,612 | `ace1e93262f0fb1e46077c8491333825b3853c1c8d0b936cbe094dfeacfd9adc` |

## robots 与请求边界

robots.txt 对 `User-agent: *` 禁止 `/wp-admin/`、`/wp-`、搜索、作者页、feed、
RSS 和 embed 路径，同时允许 `/wp-content/uploads/` 与 `/wp-content/themes/`。
Peach 因此只请求：

```text
/category/<slug>/
/category/<slug>/page/<n>/
分类卡片列出的作品详情
```

搜索、作者页、分类 feed 和第三方 embed 地址都不作为请求入口。作品详情中的第三方
iframe 只记来源给出的嵌入 URL，不向该主机发请求，也不下载站外媒体。

## 分类页

首页与第 2 页使用同一套卡片结构：

| 内容 | 选择器或属性 |
| --- | --- |
| 作品卡片 | `div.col.post-item` |
| 标题与作品链接 | `h5.post-title a.plain[href]` |
| 懒加载缩略图 | `.box-image img` 的 `data-src`／`data-lazy-src`／`src` |
| 摘要 | `.from_the_blog_excerpt` |
| 下一页 | `/category/<slug>/page/2/` |

实测分类首页有 67 个卡片。作品链接有站内绝对地址和根路径两种写法，部分卡片重复出现
同一作品；Peach 以规范作品路径去重。卡片摘要可信，但详情页才提供精确时间和有序图集，
所以仅列表候选保持 `partial`。

## 作品详情

样例 `Tiny Asa cosplay Lynae - Wuthering Waves` 的可重放字段：

| 内容 | 选择器或属性 | 实测值 |
| --- | --- | --- |
| 标题 | `h1.entry-title` | `Tiny Asa アサ (tiny.asababy) cosplay Lynae – Wuthering Waves "59 photos and 1 video"` |
| 精确时间 | `time.entry-date.published[datetime]` | `2026-10-24T16:19:10+08:00` |
| 正文 | `.entry-content.single-page` | 见下 |
| Cosplayer | 正文 `Cosplayer:` | `Tiny Asa アサ (tiny.asababy)` |
| Character | 正文 `Character:` | `Lynae` |
| Appear In | 正文 `Appear In:` | `Wuthering Waves` |
| 图集 | `div.gallery figure a[href]` | 59 张站内 WebP，按 DOM 顺序 |
| 第三方播放器 | `iframe[src]` | `https://cossora.stream/embed/e0e8ae8f-4c3e-4cbb-bcf7-c447526b4963` |

图集地址位于 `/wp-content/uploads/`，只接受 `https://cosplaytele.com` 同主机的图片路径；
主题 UI、站外图床和 `.crp_related` 推荐区不进入作品媒体项。第三方 iframe 存在不等于
Peach 已取得可直接播放的站内视频。本次页面检查**未取得**站内视频直链或 HLS/MP4 地址，
因此 Peach 只展示图集并把 iframe 地址留在 `extra.video_embeds`，不声称视频可代理播放。

## Peach 差异

- 关注输入必须是 Cosplayer 分类 URL，不使用作品详情、作者页、搜索页或分类 feed。
- 分类页真实分页支持向更早内容回填；详情补全有单次预算，失败时保留列表卡片。
- 精确时间和有效站内图集至少要取得一项，详情才从 `partial` 转为完整；只有标题、简介或
  iframe 时继续保持 `partial`。
- 图集按页面顺序写入 `media_items`，作品首图同时作为封面；不猜测标题中的照片或视频数量。
