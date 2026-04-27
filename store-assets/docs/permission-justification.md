# Chrome Web Store Permission Justifications

## Single purpose
Study Shelf helps users turn open browser tabs into a local learning list with status, tags, and key takeaways.

## `tabs`
Used to read open tab titles and URLs for website grouping, focus existing tabs, open saved pages, and close tabs only when the user clicks a close action.

## `storage`
Used to store the user's saved learning list, tags, status, and key takeaways locally in Chrome.

## `scripting`
Used only when the user saves a page, so the extension can read page metadata such as document title, description, headings, and paragraph snippets for tag suggestions.

## Host permissions: `<all_urls>`
Needed so Study Shelf can extract metadata from pages across websites when the user explicitly saves a page. The extension does not continuously monitor pages and does not upload browsing data to a server.

## Remote code
No remote code is used. All extension code is packaged inside the extension.

## Data usage declaration
Study Shelf handles website content, browsing activity such as tab titles and URLs, and user-entered notes only to provide the extension's core learning-list functionality. Data is stored locally and is not sold or shared with third parties.
