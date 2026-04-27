async function updateBadge() {
  try {
    const { studyShelfItems = [] } = await chrome.storage.local.get("studyShelfItems");
    const activeCount = studyShelfItems.filter(item => {
      const status =
        item.status === "unread" ? "to_learn" :
        item.status === "reading" ? "learning" :
        item.status === "done" ? "learned" :
        item.status;
      return status !== "learned";
    }).length;

    await chrome.action.setBadgeText({
      text: activeCount > 0 ? String(activeCount) : ""
    });

    await chrome.action.setBadgeBackgroundColor({
      color: activeCount > 0 ? "#2f6fed" : "#8c94a6"
    });
  } catch {
    chrome.action.setBadgeText({ text: "" });
  }
}

chrome.runtime.onInstalled.addListener(updateBadge);
chrome.runtime.onStartup.addListener(updateBadge);
chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === "local" && changes.studyShelfItems) {
    updateBadge();
  }
});

updateBadge();
