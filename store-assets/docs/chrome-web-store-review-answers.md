# Chrome Web Store Review Answers

Use these answers in the Chrome Developer Dashboard privacy and permission review fields.

## 1. Single purpose

### English
Study Shelf has one single purpose: helping users turn their currently open browser tabs into a local learning list. It groups open tabs by website, lets users save useful pages with learning status, tags, and one key takeaway, and helps users reopen or close those tabs when they choose.

### 中文
Study Shelf 的单一用途是：帮助用户把当前打开的浏览器标签页整理成本地学习清单。它会按网站聚合当前标签页，让用户保存有价值的网页，并记录学习状态、标签和一句关键收获，方便用户之后重新打开或主动关闭这些标签页。

## 2. Reason for requesting `tabs`

### English
The `tabs` permission is required to show the user's currently open tabs, read each tab's title and URL for website grouping, focus an existing tab when the user clicks a saved/open tab title, open a saved page in a new tab, and close tabs only when the user clicks a close action. Study Shelf does not use this permission to monitor browsing activity in the background.

### 中文
请求 `tabs` 权限是为了展示用户当前打开的标签页，读取每个标签页的标题和 URL 以便按网站分组；当用户点击网页标题时聚焦已有标签页；当用户点击已保存的学习卡片时重新打开网页；并且只在用户主动点击关闭按钮时关闭标签页。Study Shelf 不会使用该权限在后台监控用户浏览行为。

## 3. Reason for requesting `storage`

### English
The `storage` permission is required to save the user's learning list locally in Chrome. This includes saved page titles and URLs, learning status, tags, key takeaways, language preference, and panel layout preference. The data is stored locally and is not uploaded to a remote server.

### 中文
请求 `storage` 权限是为了在 Chrome 本地保存用户的学习清单，包括已保存网页的标题和 URL、学习状态、标签、关键收获、语言偏好和左右栏宽度偏好。这些数据保存在用户本地，不会上传到远程服务器。

## 4. Reason for requesting `scripting`

### English
The `scripting` permission is used only when the user explicitly saves a page. At that moment, Study Shelf reads basic page metadata such as document title, meta description, headings, and short paragraph snippets to create a useful study item and suggest tags. The extension does not inject persistent scripts, does not modify page content, and does not continuously read pages in the background.

### 中文
请求 `scripting` 权限仅用于用户主动保存网页时读取基础页面信息，例如网页标题、meta 描述、页面标题结构和少量正文片段，以便创建学习条目并建议标签。扩展不会注入持久脚本，不会修改网页内容，也不会在后台持续读取网页。

## 5. Reason for requesting host permissions

### English
Host permissions are required so Study Shelf can extract basic metadata from pages across different websites when the user explicitly chooses to save those pages. This supports the extension's single purpose of turning open tabs into a learning list. Study Shelf does not continuously monitor websites, does not read pages unless the user saves them, and does not upload page content or browsing data to any server.

### 中文
请求主机权限是为了在用户主动保存不同网站的网页时，读取该网页的基础元数据，用于生成本地学习条目和标签建议。这是 Study Shelf “把打开的标签页整理成学习清单”这一单一用途所必需的。Study Shelf 不会持续监控网站，不会在用户未保存网页时读取网页内容，也不会把网页内容或浏览数据上传到服务器。

## 6. Remote code

### Recommended selection
Select: No, I am not using remote code.

### English
Study Shelf does not use remote code. All JavaScript, HTML, CSS, and extension logic are packaged inside the submitted extension. The extension does not load remote scripts and does not use `eval()` or similar mechanisms to execute code from a remote source.

### 中文
Study Shelf 不使用远程代码。所有 JavaScript、HTML、CSS 和扩展逻辑都包含在提交的扩展包内。扩展不会加载远程脚本，也不会使用 `eval()` 或类似方式执行来自远程来源的代码。

## 7. Data usage checkboxes

### Recommended boxes to select
- Web history / 网络记录
- Website content / 网站内容

### Why select Web history / 网络记录
Study Shelf handles tab titles, URLs, and saved time for pages that the user chooses to save or manage. This is used only for grouping tabs and building the user's local learning list.

### 为什么选择网络记录
Study Shelf 会处理用户当前标签页及用户主动保存页面的标题、URL 和保存时间。这些信息仅用于按网站聚合标签页，以及生成用户本地学习清单。

### Why select Website content / 网站内容
Study Shelf reads basic page metadata and short text snippets only when the user explicitly saves a page. This is used to create useful saved study items and tag suggestions.

### 为什么选择网站内容
Study Shelf 仅在用户主动保存网页时读取基础页面元数据和少量文本片段，用于创建学习条目和标签建议。

### Boxes that should not be selected
- Personally identifiable information / 个人身份信息
- Health information / 健康信息
- Financial and payment information / 财务和付款信息
- Authentication information / 身份验证信息
- Personal communications / 个人通讯
- Location / 位置
- User activity / 用户活动

## 8. Data use certification checkboxes

Select all required certification boxes if they appear:

### English
- I do not sell or transfer user data to third parties, except for approved use cases.
- I do not use or transfer user data for purposes unrelated to the extension's single purpose.
- I do not use or transfer user data to determine creditworthiness or for lending purposes.

### 中文
- 我不会出于已获批准用途之外的用途向第三方出售或传输用户数据。
- 我不会为实现与产品单一用途无关的目的而使用或转移用户数据。
- 我不会为确定信用度或实现贷款目的而使用或转移用户数据。

## 9. Privacy policy URL

Chrome Web Store requires a public URL, not a local file path. Publish `store-assets/docs/privacy-policy.md` to a public page, such as GitHub Pages, Notion public page, a product website, or another publicly accessible URL, then paste that URL into the Privacy Policy field.
