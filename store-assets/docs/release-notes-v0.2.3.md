# Study Shelf v0.2.3 Update Materials

## Chrome Web Store Release Notes

### English

Study Shelf v0.2.3 improves bulk management in the Learning Library:

- Added Select all for currently visible saved pages.
- Added Open for opening selected saved pages in separate tabs.
- Added Remove for removing selected saved pages from the Learning Library.
- Simplified the selected action bar with clearer actions: Open, Remove, Apply, and Cancel.
- Improved helper text in the selected action bar so users understand they can open, remove, or update selected study notes.
- Refined button styling for a lighter and clearer bulk-action experience.

### 中文

Study Shelf v0.2.3 优化了 Learning Library 收藏夹的批量管理体验：

- 新增 Select all，可一键选择当前可见的已收藏网页。
- 新增 Open，可将已选收藏网页批量打开到新标签页。
- 新增 Remove，可从 Learning Library 中批量移除已选收藏网页。
- 简化 selected 操作栏，统一为 Open、Remove、Apply、Cancel 四个动作。
- 优化 selected 操作栏提示语，让用户明确知道可以打开、移除或批量更新学习纸条。
- 优化批量操作按钮样式，让操作区域更轻、更清晰。

## Permission Notes

No new permissions were added in v0.2.3.

The new Open action uses the existing `tabs` permission to open user-selected saved URLs in separate tabs. The new Remove action only updates the user's locally saved Learning Library data through the existing `storage` permission.

本版本没有新增权限。

新的 Open 操作使用已有的 `tabs` 权限，将用户主动选择的收藏网址打开到新标签页。新的 Remove 操作只通过已有的 `storage` 权限更新用户本地保存的 Learning Library 数据。

## Suggested Reviewer Note

Study Shelf v0.2.3 focuses on improving user-controlled bulk actions in the Learning Library. Users can select visible saved pages, open selected pages in separate tabs, remove selected saved pages, or apply status/tag updates. No new permissions are requested in this version.

Study Shelf v0.2.3 主要优化 Learning Library 中由用户主动触发的批量操作。用户可以选择当前可见的已收藏网页，批量打开、批量移除，或统一更新状态/标签。本版本没有请求新增权限。
