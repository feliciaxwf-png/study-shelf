# Study Shelf v0.2.2 Update Materials

## Chrome Web Store Release Notes

### English

Study Shelf v0.2.2 improves the new tab experience and makes tab organization smoother:

- Refined the top search and stats layout for a cleaner, better-aligned interface.
- Search now opens in a separate tab and uses the user's default Chrome search provider.
- Added clearer copy explaining what the search box does.
- Improved website grouping by primary domain, so subdomains are grouped more naturally.
- Improved tag selection when saving selected tabs, including selecting from existing tags.
- Added Close selected for selected tabs.

### 中文

Study Shelf v0.2.2 优化了新标签页体验和标签页整理流程：

- 优化顶部搜索框和数据展示区域的排版，让界面更简洁、对齐更自然。
- 搜索结果会在新标签页打开，并使用用户在 Chrome 中设置的默认搜索引擎。
- 增加更清晰的搜索框说明，帮助用户理解它可以搜索或打开网址。
- 优化按网站分类逻辑，子域名会更自然地合并到主域名下。
- 优化保存网页时的标签选择，支持直接选择已有标签。
- 增加 Close selected，支持批量关闭已选标签页。

## Permission Justification Updates

### search

English:
Study Shelf uses the Search API only when the user actively types a query into the new tab search box. It opens the query in a separate tab using the user's default Chrome search provider. The extension does not change the user's default search engine, does not redirect searches, and does not collect search queries.

中文：
Study Shelf 仅在用户主动在新标签页搜索框输入搜索内容时使用 Search API，并通过用户在 Chrome 中设置的默认搜索引擎在新标签页打开结果。扩展不会修改用户默认搜索引擎，不会重定向搜索，也不会收集用户搜索词。

### tabs

English:
Study Shelf uses the Tabs permission to read the titles, URLs, favicons, window IDs, and tab IDs of currently open tabs so it can group tabs by website, window, or recent activity. It also uses this permission only when the user chooses to open, save, or close selected tabs.

中文：
Study Shelf 使用 Tabs 权限读取当前已打开标签页的标题、网址、网站图标、窗口 ID 和标签页 ID，用于按网站、窗口和最近查看顺序整理标签页。只有在用户主动选择打开、保存或关闭标签页时，才会执行对应操作。

### storage

English:
Study Shelf uses Storage to save the user's study list, tags, status, custom window names, language preference, and layout preference locally in Chrome. This data stays on the user's device unless the user has Chrome sync enabled.

中文：
Study Shelf 使用 Storage 权限保存用户的学习清单、标签、学习状态、自定义窗口名称、语言偏好和布局偏好。这些数据保存在用户本地 Chrome 中，除非用户开启 Chrome 同步。

### scripting

English:
Study Shelf uses Scripting only to support page-related extension behavior when needed by the tab management workflow. It does not inject remote code.

中文：
Study Shelf 仅在标签页管理流程需要时使用 Scripting 支持页面相关扩展行为。扩展不会注入远程代码。

### host permissions

English:
Study Shelf requests host permissions so it can access basic tab metadata across websites, such as page title, URL, and favicon, and present the user's open tabs in a useful study-management view. The extension does not collect full browsing history and does not send website content to external servers.

中文：
Study Shelf 请求主机权限，是为了读取不同网站标签页的基础信息，例如页面标题、网址和网站图标，并将当前打开的网页整理成学习管理视图。扩展不会收集完整浏览历史，也不会把网页内容发送到外部服务器。

## Remote Code

English:
No, Study Shelf does not use remote code. All JavaScript, CSS, HTML, and assets are packaged inside the extension ZIP.

中文：
不使用远程代码。Study Shelf 的 JavaScript、CSS、HTML 和素材都打包在扩展 ZIP 文件中。

## Suggested Single Purpose

English:
Study Shelf is a learning-first tab manager that helps users turn hard-to-close open tabs into a focused study list with tags, learning status, and quick takeaways.

中文：
Study Shelf 是一个学习型标签页管理工具，帮助用户把舍不得关闭的网页整理成带标签、学习状态和重点记录的学习清单。
