# Do you also have these troubles at work every day?
1. You keep dozens of tabs open for a long time without closing or organizing them, resulting in a slow browser.
2. You open too many webpages, leaving you no time to read them. You hate to close them, for fear of never finding them again.

Give my self-made tool — Study Shelf a try.

# Study Shelf

Study Shelf is a Chrome extension that turns open browser tabs into a calm, organized learning list.

It groups current tabs by website, lets users save useful pages with learning status, tags, and one key takeaway, and helps them close tabs without losing important study materials.

Study Shelf 是一个 Chrome 扩展，可以把杂乱打开的网页整理成一个安静、清晰的学习清单。

它会按照网站聚合当前标签页，让用户把有价值的网页保存下来，并添加学习状态、标签和一句关键收获。保存之后，用户可以更放心地关闭原网页，需要时再从学习清单里重新打开。

## Features

- Group open tabs by website
- Save individual pages or whole website groups
- Close saved tabs when the user chooses
- Reopen saved study pages
- Add status: To Learn, Learning, Learned
- Add tags and one key takeaway
- Search and filter saved pages
- Resize the two-panel layout
- Switch between English and Chinese

## How to use

### Install from GitHub

This extension is currently distributed as an unpacked Chrome extension. You can install it manually from GitHub:

1. Open this repository on GitHub: `https://github.com/feliciaxwf-png/study-shelf`.
2. Click the green `Code` button.
3. Click `Download ZIP`.
4. Unzip the downloaded file on your computer.
5. Open Chrome and go to `chrome://extensions/`.
6. Turn on `Developer mode` in the top-right corner.
7. Click `Load unpacked`.
8. Select the `extension` folder inside the unzipped `study-shelf` project.
9. Open a new tab. Study Shelf will appear as your new tab page.

### Use the extension

1. Open several pages you want to read, learn, or keep for later.
2. Open a new tab to see Study Shelf.
3. Review the left panel, where open tabs are grouped by website.
4. Click `Save` to save one page, or `Save group` to save all pages from the same website.
5. Add a learning status, tags, and one key takeaway in the right panel.
6. Close tabs you no longer need open. You can reopen saved pages from the learning list later.
7. Use search, tag filters, and status filters to find saved study pages.
8. Switch between English and Chinese from the language toggle.

## 使用方法

### 从 GitHub 安装

当前版本可以作为 Chrome 的本地扩展手动安装：

1. 打开 GitHub 仓库：`https://github.com/feliciaxwf-png/study-shelf`。
2. 点击绿色的 `Code` 按钮。
3. 点击 `Download ZIP`。
4. 把下载下来的 ZIP 文件解压到电脑上。
5. 打开 Chrome，进入 `chrome://extensions/`。
6. 打开右上角的 `Developer mode / 开发者模式`。
7. 点击 `Load unpacked / 加载已解压的扩展程序`。
8. 选择解压后的 `study-shelf` 项目里的 `extension` 文件夹。
9. 打开一个新的 Chrome 标签页，就可以看到 Study Shelf。

### 使用插件

1. 先打开一些你想阅读、学习或稍后查看的网页。
2. 打开一个新的 Chrome 标签页，进入 Study Shelf。
3. 查看左侧区域，当前打开的网页会按照网站自动聚合。
4. 点击 `Save / 保存` 保存单个网页，或点击 `Save group / 保存整组` 保存同一网站下的多个网页。
5. 在右侧学习清单里，为网页添加学习状态、标签和一句关键收获。
6. 保存后可以关闭原标签页，之后随时从学习清单重新打开。
7. 使用搜索、标签筛选和状态筛选，快速找到已保存的学习网页。
8. 通过右上角语言切换，在 English 和 中文之间切换。

## How it works

Study Shelf runs entirely inside Chrome as a Manifest V3 extension.

1. It reads the currently open tabs with the Chrome `tabs` API.
2. It groups tabs by website domain so related pages stay together.
3. When the user clicks save, it stores the page title, URL, domain, suggested tags, status, and key takeaway in local Chrome storage.
4. When the user saves a page, it may read basic page metadata, such as title, description, headings, and short text snippets, to suggest tags.
5. Saved pages appear in the learning library on the right side.
6. Users can reopen saved pages, update learning status, edit tags, edit key takeaways, or remove saved items.
7. All saved learning data stays in local Chrome storage. Study Shelf does not upload the user's learning list to a remote server.

## 工作原理

Study Shelf 是一个基于 Manifest V3 的 Chrome 扩展，主要在浏览器本地运行。

1. 它通过 Chrome `tabs` API 读取当前打开的标签页。
2. 它会根据网页域名把标签页按网站分组，让相关页面聚合在一起。
3. 当用户点击保存时，插件会把网页标题、URL、域名、建议标签、学习状态和关键收获保存到 Chrome 本地存储。
4. 当用户主动保存网页时，插件可能会读取网页的基础元数据，例如标题、描述、页面标题结构和少量文本片段，用于生成标签建议。
5. 保存后的网页会出现在右侧的学习清单中。
6. 用户可以重新打开已保存网页，修改学习状态、标签、关键收获，也可以移除学习卡片。
7. 所有学习数据都保存在 Chrome 本地存储中。Study Shelf 不会把用户的学习清单上传到远程服务器。

## Tech stack

- Chrome Extension Manifest V3
- HTML
- CSS
- Vanilla JavaScript
- Chrome APIs: `tabs`, `storage`, `scripting`
- Local-first data storage with `chrome.storage.local`
- No backend server
- No remote code execution
- No build step required


## Local development

1. Open Chrome.
2. Go to `chrome://extensions/`.
3. Turn on Developer mode.
4. Click Load unpacked.
5. Select the `extension` folder in this project.
6. Open a new tab to use Study Shelf.

## Privacy

Study Shelf stores saved pages and learning notes locally in Chrome storage. It does not sell user data, does not display ads, and does not upload the user's learning list to a server.

Privacy policy: https://gist.github.com/feliciaxwf-png/fd31b7fd938d43a8e62cfd53fb71aec7
