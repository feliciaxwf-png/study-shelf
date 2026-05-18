const STORAGE_KEY = "studyShelfItems";
const PANEL_WIDTH_KEY = "studyShelfLeftPanel";
const LANGUAGE_KEY = "studyShelfLanguage";
const GROUP_MODE_KEY = "studyShelfGroupMode";
const WINDOW_FILTER_KEY = "studyShelfWindowFilter";
const WINDOW_NAMES_KEY = "studyShelfWindowNames";
const DEFAULT_VISIBLE_CHILDREN = 3;

const state = {
  openTabs: [],
  groupedTabs: [],
  groupedWindows: [],
  savedItems: [],
  visibleTabs: [],
  search: "",
  statusFilter: "all",
  tagFilter: "all",
  language: "en",
  groupMode: "recent",
  windowFilter: "all",
  currentWindowId: null,
  windowNames: {},
  editingWindowId: null,
  selectedTabIds: new Set(),
  selectedSavedItemIds: new Set(),
  expandedTakeaways: new Set(),
  editingTakeawayId: null,
  saveComposer: {
    isOpen: false,
    tabIds: [],
    status: "to_learn",
    tags: ""
  },
  expandedGroups: new Set(),
  renderedGroups: new Map()
};

const translations = {
  en: {
    heroTitle: "From tab clutter to learning flow.",
    heroCopy: "Study Shelf is a learning-first tab manager that turns hard-to-close tabs into a focused study list.",
    currentTabs: "Current tabs",
    byWebsite: "By website",
    byWindow: "By window",
    byRecent: "Recently viewed",
    windowFilter: "Window",
    renameWindow: "Rename",
    saveWindowName: "Save",
    cancelWindowName: "Cancel",
    windowNamePlaceholder: "Name this window",
    allWindows: "All windows",
    currentWindow: "Current window",
    browserLauncherPlaceholder: "Search or enter a URL",
    browserLauncherHint: "Use this box to search with your default search provider or open a URL in a separate tab.",
    browserLauncherSearchUnavailable: "Search is available after Study Shelf is loaded as a Chrome extension.",
    go: "Go",
    refresh: "Refresh",
    selectionHint: "Choose tabs, then save them with tags and a status.",
    selectedCount: count => `${count} selected`,
    clearSelection: "Clear",
    cancel: "Cancel",
    saveSelected: "Save selected",
    closeSelected: "Close selected",
    saveToLibrary: "Save to library",
    saveComposerSummary: count => `${count} tab${count === 1 ? "" : "s"} ready to save`,
    saveComposerTagsPlaceholder: "AI tools, Design, Research",
    saveNow: "Save now",
    learningLibrary: "Learning library",
    open: "Open",
    search: "Search",
    searchSavedPages: "Search saved pages",
    searchPlaceholder: "Title, tag, takeaway",
    savedBulkHint: "Update status or tags for selected study notes.",
    keepCurrentStatus: "Keep current",
    applyChanges: "Apply",
    status: "Status",
    all: "All",
    toLearn: "To Learn",
    learning: "Learning",
    learned: "Learned",
    tag: "Tag",
    allTags: "All tags",
    tags: "Tags",
    tagsPlaceholder: "AI, JavaScript, Essay",
    keyTakeaway: "Key takeaway",
    takeawayPlaceholder: "What clicked?",
    emptyState: "Save a page from the left side and it will show up here as a compact study card with takeaways and a quick editing panel.",
    saveGroup: "Save group",
    closeGroup: "Close group",
    save: "Save",
    saved: "Saved",
    close: "Close",
    remove: "Remove",
    showLess: "Show less",
    showMore: "Show more",
    more: count => `+${count} more`,
    openTabs: count => `${count} open tab${count === 1 ? "" : "s"}`,
    savedCount: count => `${count} saved`,
    learningCount: count => `${count} learning`,
    openTabsLabel: "open tabs",
    savedLabel: "saved",
    learningLabel: "learning",
    openPages: count => `${count} open page${count === 1 ? "" : "s"}`,
    windowLabel: index => `Window ${index}`,
    windowTabs: count => `${count} tab${count === 1 ? "" : "s"}`,
    recentTabs: "Recently viewed",
    savedOn: date => `Saved ${date}`
  },
  zh: {
    heroTitle: "从标签混乱，到学习流。",
    heroCopy: "Study Shelf 是一款以学习为先的标签页管理工具，能把那些舍不得关掉的网页整理成一份专注的学习清单。",
    currentTabs: "当前网页",
    byWebsite: "按网站",
    byWindow: "按窗口",
    byRecent: "最近查看",
    windowFilter: "窗口",
    renameWindow: "重命名",
    saveWindowName: "保存",
    cancelWindowName: "取消",
    windowNamePlaceholder: "给这个窗口命名",
    allWindows: "全部窗口",
    currentWindow: "当前窗口",
    browserLauncherPlaceholder: "搜索或输入网址",
    browserLauncherHint: "用这个输入框通过你的默认搜索引擎搜索，或在新标签中打开网址。",
    browserLauncherSearchUnavailable: "将 Study Shelf 加载为 Chrome 扩展后即可使用搜索。",
    go: "打开",
    refresh: "刷新",
    selectionHint: "选中网页后，可以一次性设置标签和状态再保存。",
    selectedCount: count => `已选 ${count} 个`,
    clearSelection: "清空",
    cancel: "取消",
    saveSelected: "保存所选",
    closeSelected: "关闭所选",
    saveToLibrary: "保存到学习清单",
    saveComposerSummary: count => `${count} 个网页准备保存`,
    saveComposerTagsPlaceholder: "AI 工具, 设计, 调研",
    saveNow: "立即保存",
    learningLibrary: "学习清单",
    open: "打开",
    search: "搜索",
    searchSavedPages: "搜索已保存网页",
    searchPlaceholder: "标题、标签、关键收获",
    savedBulkHint: "给选中的学习纸条统一修改状态或标签。",
    keepCurrentStatus: "保持原样",
    applyChanges: "应用",
    status: "状态",
    all: "全部",
    toLearn: "待学习",
    learning: "学习中",
    learned: "已学习",
    tag: "标签",
    allTags: "全部标签",
    tags: "标签",
    tagsPlaceholder: "AI, JavaScript, 写作",
    keyTakeaway: "关键收获",
    takeawayPlaceholder: "这页最值得记住什么？",
    emptyState: "从左侧保存页面后，它会作为一张轻量学习卡片出现在这里。",
    saveGroup: "保存整组",
    closeGroup: "关闭整组",
    save: "保存",
    saved: "已保存",
    close: "关闭",
    remove: "移除",
    showLess: "收起",
    showMore: "展开",
    more: count => `还有 ${count} 个`,
    openTabs: count => `${count} 个打开网页`,
    savedCount: count => `${count} 个已保存`,
    learningCount: count => `${count} 个学习中`,
    openTabsLabel: "打开网页",
    savedLabel: "已保存",
    learningLabel: "学习中",
    openPages: count => `${count} 个页面`,
    windowLabel: index => `窗口 ${index}`,
    windowTabs: count => `${count} 个标签页`,
    recentTabs: "最近查看",
    savedOn: date => `保存于 ${date}`
  }
};

const elements = {
  openTabsList: document.querySelector("#openTabsList"),
  savedList: document.querySelector("#savedList"),
  savedEmptyState: document.querySelector("#savedEmptyState"),
  searchInput: document.querySelector("#searchInput"),
  statusFilter: document.querySelector("#statusFilter"),
  tagFilter: document.querySelector("#tagFilter"),
  savedBulkEditor: document.querySelector("#savedBulkEditor"),
  savedBulkCount: document.querySelector("#savedBulkCount"),
  savedBulkStatus: document.querySelector("#savedBulkStatus"),
  savedBulkTags: document.querySelector("#savedBulkTags"),
  clearSavedSelectionButton: document.querySelector("#clearSavedSelectionButton"),
  browserLauncher: document.querySelector("#browserLauncher"),
  browserLauncherInput: document.querySelector("#browserLauncherInput"),
  groupModeToggle: document.querySelector("#groupModeToggle"),
  windowFilter: document.querySelector("#windowFilter"),
  windowFilterLabel: document.querySelector("#windowFilterLabel"),
  refreshTabsButton: document.querySelector("#refreshTabsButton"),
  selectionTray: document.querySelector("#selectionTray"),
  selectionCount: document.querySelector("#selectionCount"),
  saveSelectedButton: document.querySelector("#saveSelectedButton"),
  closeSelectedButton: document.querySelector("#closeSelectedButton"),
  clearSelectionButton: document.querySelector("#clearSelectionButton"),
  saveComposer: document.querySelector("#saveComposer"),
  saveComposerSummary: document.querySelector("#saveComposerSummary"),
  saveComposerStatus: document.querySelector("#saveComposerStatus"),
  saveComposerTagPicker: document.querySelector("#saveComposerTagPicker"),
  saveComposerTagToggle: document.querySelector("#saveComposerTagToggle"),
  saveComposerTagMenu: document.querySelector("#saveComposerTagMenu"),
  saveComposerTags: document.querySelector("#saveComposerTags"),
  cancelSaveComposerButton: document.querySelector("#cancelSaveComposerButton"),
  heroStatsLine: document.querySelector("#heroStatsLine"),
  languageToggle: document.querySelector("#languageToggle"),
  layout: document.querySelector("#layout"),
  layoutResizer: document.querySelector("#layoutResizer"),
  openTabTemplate: document.querySelector("#openTabTemplate"),
  childTabTemplate: document.querySelector("#childTabTemplate"),
  savedItemTemplate: document.querySelector("#savedItemTemplate")
};

const demoTabs = [
  {
    id: 1001,
    windowId: 1,
    lastAccessed: Date.now() - 1000 * 60 * 3,
    title: "Download LM Studio - Mac, Linux, Windows",
    url: "https://lmstudio.ai/download",
    domain: "lmstudio.ai",
    faviconUrl: getFaviconUrl("https://lmstudio.ai/download")
  },
  {
    id: 1002,
    windowId: 1,
    lastAccessed: Date.now() - 1000 * 60 * 15,
    title: "OpenAI Platform Docs",
    url: "https://platform.openai.com/docs",
    domain: "openai.com",
    faviconUrl: getFaviconUrl("https://platform.openai.com/docs")
  },
  {
    id: 1003,
    windowId: 1,
    lastAccessed: Date.now() - 1000 * 60 * 35,
    title: "Prompt engineering guide",
    url: "https://platform.openai.com/docs/guides/prompt-engineering",
    domain: "openai.com",
    faviconUrl: getFaviconUrl("https://platform.openai.com/docs/guides/prompt-engineering")
  },
  {
    id: 1004,
    windowId: 2,
    lastAccessed: Date.now() - 1000 * 60 * 6,
    title: "即梦AI - 一站式AI创作平台",
    url: "https://jimeng.jianying.com",
    domain: "jianying.com",
    faviconUrl: getFaviconUrl("https://jimeng.jianying.com")
  }
];

let refreshTabsTimer = null;

function buildDemoSavedItems() {
  return demoTabs.slice(0, 3).map((tab, index) => ({
    id: `demo-${tab.id}`,
    title: tab.title,
    url: normalizeUrl(tab.url),
    domain: tab.domain,
    savedAt: Date.now() - index * 86400000,
    tags: [tab.domain, index === 0 ? "AI tools" : "Learning"],
    takeaway: index === 0
      ? "Compare install options and decide whether this tool belongs in the local AI workflow."
      : "Save this page as a reference and return when the topic becomes useful.",
    status: index === 0 ? "learning" : "to_learn"
  }));
}

function getPreviewParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

function hasChromeApi(...keys) {
  if (typeof chrome === "undefined") return false;
  return keys.every(key => Boolean(chrome[key]));
}

async function storageGet(key) {
  if (hasChromeApi("storage") && chrome.storage?.local) {
    const result = await chrome.storage.local.get(key);
    return result[key];
  }

  try {
    const storedValue = JSON.parse(localStorage.getItem(key) || "null");
    if (storedValue) return storedValue;
  } catch {
    return null;
  }

  if (key === STORAGE_KEY && getPreviewParam("demo") === "full") {
    return buildDemoSavedItems();
  }

  return null;
}

async function storageSet(key, value) {
  if (hasChromeApi("storage") && chrome.storage?.local) {
    await chrome.storage.local.set({ [key]: value });
    return;
  }

  localStorage.setItem(key, JSON.stringify(value));
}

function t(key, ...args) {
  const value = translations[state.language][key] ?? translations.en[key] ?? key;
  return typeof value === "function" ? value(...args) : value;
}

function uniq(values) {
  return [...new Set(values)];
}

function parseTags(value) {
  return uniq(
    value
      .split(",")
      .map(tag => cleanText(tag))
      .filter(Boolean)
  );
}

function translateRoot(root) {
  root.querySelectorAll("[data-i18n]").forEach(element => {
    element.textContent = t(element.dataset.i18n);
  });
  root.querySelectorAll("[data-i18n-placeholder]").forEach(element => {
    element.placeholder = t(element.dataset.i18nPlaceholder);
  });
}

let audioContext;

function getAudioContext() {
  if (!audioContext) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return null;
    audioContext = new AudioContextClass();
  }
  return audioContext;
}

async function ensureAudioReady() {
  const context = getAudioContext();
  if (!context) return null;
  if (context.state === "suspended") {
    try {
      await context.resume();
    } catch {
      return null;
    }
  }
  return context;
}

async function playSaveSound() {
  const context = await ensureAudioReady();
  if (!context) return;

  const now = context.currentTime;
  const master = context.createGain();
  master.gain.setValueAtTime(0.0001, now);
  master.gain.exponentialRampToValueAtTime(0.025, now + 0.015);
  master.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);
  master.connect(context.destination);

  [523.25, 659.25].forEach((frequency, index) => {
    const oscillator = context.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(frequency, now + index * 0.06);
    oscillator.connect(master);
    oscillator.start(now + index * 0.045);
    oscillator.stop(now + 0.11 + index * 0.045);
  });
}

async function playCloseSound() {
  const context = await ensureAudioReady();
  if (!context) return;

  const now = context.currentTime;
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  const filter = context.createBiquadFilter();

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(260, now);
  oscillator.frequency.exponentialRampToValueAtTime(150, now + 0.12);

  filter.type = "lowpass";
  filter.frequency.setValueAtTime(640, now);
  filter.frequency.exponentialRampToValueAtTime(260, now + 0.12);

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.026, now + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);

  oscillator.connect(filter);
  filter.connect(gain);
  gain.connect(context.destination);

  oscillator.start(now);
  oscillator.stop(now + 0.16);
}

function formatDateParts(timestamp) {
  const locale = state.language === "zh" ? "zh-CN" : "en-US";
  const date = new Intl.DateTimeFormat(locale, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(timestamp));
  const time = new Intl.DateTimeFormat(locale, {
    hour: "numeric",
    minute: "2-digit"
  }).format(new Date(timestamp));
  return { date, time };
}

function formatDate(timestamp) {
  const locale = state.language === "zh" ? "zh-CN" : "en-US";
  return new Intl.DateTimeFormat(locale, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  }).format(new Date(timestamp));
}

function updateStatsLine() {
  const openCount = state.openTabs.length;
  const savedCount = state.savedItems.length;
  const learningCount = state.savedItems.filter(item => item.status === "learning").length;
  elements.heroStatsLine.innerHTML = `
    <span class="hero-stat"><strong class="hero-stat-value">${openCount}</strong><span class="hero-stat-label">${t("openTabsLabel")}</span></span>
    <span class="hero-stat-divider"></span>
    <span class="hero-stat"><strong class="hero-stat-value">${savedCount}</strong><span class="hero-stat-label">${t("savedLabel")}</span></span>
    <span class="hero-stat-divider"></span>
    <span class="hero-stat"><strong class="hero-stat-value">${learningCount}</strong><span class="hero-stat-label">${t("learningLabel")}</span></span>
  `;
}

function applyLanguage(language) {
  state.language = language;
  document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  localStorage.setItem(LANGUAGE_KEY, language);

  translateRoot(document);
  document.querySelectorAll(".language-option").forEach(button => {
    button.classList.toggle("is-active", button.dataset.lang === language);
  });

  applyGroupMode(state.groupMode);
  updateStatsLine();
}

function applyGroupMode(groupMode) {
  state.groupMode = ["recent", "website", "window"].includes(groupMode) ? groupMode : "recent";
  localStorage.setItem(GROUP_MODE_KEY, state.groupMode);

  document.querySelectorAll(".group-mode-option").forEach(button => {
    button.classList.toggle("is-active", button.dataset.groupMode === state.groupMode);
  });
}

async function loadWindowNames() {
  state.windowNames = (await storageGet(WINDOW_NAMES_KEY)) || {};
}

async function persistWindowNames() {
  await storageSet(WINDOW_NAMES_KEY, state.windowNames);
}

function initializeLanguage() {
  const urlLanguage = getPreviewParam("lang");
  const savedLanguage = localStorage.getItem(LANGUAGE_KEY);
  const browserLanguage = navigator.language?.toLowerCase().startsWith("zh") ? "zh" : "en";
  const initialLanguage =
    urlLanguage === "zh" || urlLanguage === "en"
      ? urlLanguage
      : savedLanguage === "zh" || savedLanguage === "en"
        ? savedLanguage
        : browserLanguage;
  applyLanguage(initialLanguage);
}

function initializeGroupMode() {
  const savedMode = localStorage.getItem(GROUP_MODE_KEY);
  applyGroupMode(savedMode);
  const savedWindowFilter = localStorage.getItem(WINDOW_FILTER_KEY);
  state.windowFilter = savedWindowFilter || "all";
}

function setPanelWidth(value, shouldPersist = false) {
  const clamped = Math.min(68, Math.max(30, value));
  document.documentElement.style.setProperty("--left-panel", `${clamped}%`);
  if (shouldPersist) {
    localStorage.setItem(PANEL_WIDTH_KEY, String(clamped));
  }
  return clamped;
}

function initializeResizableLayout() {
  const savedWidth = Number(localStorage.getItem(PANEL_WIDTH_KEY));
  if (Number.isFinite(savedWidth)) {
    setPanelWidth(savedWidth);
  }

  let isDragging = false;
  let pendingWidth = null;
  let frameId = null;
  let activePointerId = null;

  const commitFrame = () => {
    frameId = null;
    if (pendingWidth !== null) {
      setPanelWidth(pendingWidth);
    }
  };

  const updateFromPointer = event => {
    if (!isDragging || !elements.layout) return;
    if (activePointerId !== null && event.pointerId !== activePointerId) return;
    event.preventDefault();
    const rect = elements.layout.getBoundingClientRect();
    if (!rect.width) return;
    pendingWidth = ((event.clientX - rect.left) / rect.width) * 100;
    if (!frameId) {
      frameId = requestAnimationFrame(commitFrame);
    }
  };

  elements.layoutResizer.addEventListener("pointerdown", event => {
    if (event.button !== 0) return;
    event.preventDefault();
    isDragging = true;
    activePointerId = event.pointerId;
    elements.layout.classList.add("is-resizing");
    document.body.classList.add("is-layout-resizing");
    try {
      elements.layoutResizer.setPointerCapture(event.pointerId);
    } catch {
      // Window-level listeners below keep the drag responsive if capture is unavailable.
    }
    window.addEventListener("pointermove", updateFromPointer, { passive: false });
    window.addEventListener("pointerup", stopDragging);
    window.addEventListener("pointercancel", stopDragging);
    updateFromPointer(event);
  });

  const stopDragging = event => {
    if (!isDragging) return;
    if (activePointerId !== null && event.pointerId !== activePointerId) return;
    event.preventDefault();
    isDragging = false;
    activePointerId = null;
    elements.layout.classList.remove("is-resizing");
    document.body.classList.remove("is-layout-resizing");
    window.removeEventListener("pointermove", updateFromPointer);
    window.removeEventListener("pointerup", stopDragging);
    window.removeEventListener("pointercancel", stopDragging);
    if (frameId) {
      cancelAnimationFrame(frameId);
      frameId = null;
    }
    if (pendingWidth !== null) {
      setPanelWidth(pendingWidth, true);
      pendingWidth = null;
    }
    if (elements.layoutResizer.hasPointerCapture(event.pointerId)) {
      elements.layoutResizer.releasePointerCapture(event.pointerId);
    }
  };

  elements.layoutResizer.addEventListener("pointerup", stopDragging);
  elements.layoutResizer.addEventListener("pointercancel", stopDragging);
}

function cleanText(text) {
  return (text || "").replace(/\s+/g, " ").trim();
}

function splitSentences(text) {
  return cleanText(text)
    .split(/(?<=[.!?])\s+/)
    .map(sentence => sentence.trim())
    .filter(Boolean);
}

function normalizeUrl(url) {
  try {
    const parsed = new URL(url);
    parsed.hash = "";
    return parsed.toString();
  } catch {
    return url;
  }
}

const COMMON_SECOND_LEVEL_SUFFIXES = new Set([
  "ac", "biz", "co", "com", "edu", "gov", "info", "net", "org"
]);

const KNOWN_MULTI_PART_PUBLIC_SUFFIXES = new Set([
  "ac.cn", "ac.jp", "ac.kr", "ac.uk",
  "co.id", "co.il", "co.in", "co.jp", "co.kr", "co.nz", "co.th", "co.uk", "co.za",
  "com.ar", "com.au", "com.br", "com.cn", "com.hk", "com.mx", "com.my", "com.ph", "com.sg", "com.tr", "com.tw",
  "edu.au", "edu.cn", "edu.hk", "edu.sg", "edu.tw",
  "gov.au", "gov.cn", "gov.hk", "gov.sg", "gov.uk",
  "net.au", "net.cn", "net.hk", "net.nz", "net.sg", "net.tw",
  "org.au", "org.cn", "org.hk", "org.nz", "org.sg", "org.tw", "org.uk"
]);

function getHostname(url) {
  try {
    return new URL(url).hostname.toLowerCase().replace(/^www\./, "");
  } catch {
    return "";
  }
}

function isIpAddress(hostname) {
  return /^\d{1,3}(\.\d{1,3}){3}$/.test(hostname) || hostname.includes(":");
}

function getRegistrableDomain(hostname) {
  const cleanHostname = cleanText(hostname).toLowerCase().replace(/^www\./, "");
  if (!cleanHostname || cleanHostname === "localhost" || isIpAddress(cleanHostname)) {
    return cleanHostname;
  }

  const parts = cleanHostname.split(".").filter(Boolean);
  if (parts.length <= 2) {
    return cleanHostname;
  }

  const lastTwoParts = parts.slice(-2).join(".");
  const lastPart = parts.at(-1);
  const secondLastPart = parts.at(-2);

  if (
    KNOWN_MULTI_PART_PUBLIC_SUFFIXES.has(lastTwoParts) ||
    (lastPart.length === 2 && COMMON_SECOND_LEVEL_SUFFIXES.has(secondLastPart))
  ) {
    return parts.slice(-3).join(".");
  }

  return lastTwoParts;
}

function getDomain(url) {
  return getRegistrableDomain(getHostname(url)) || "Unknown";
}

function getSiteKey(url) {
  try {
    const parsed = new URL(url);
    if (parsed.protocol === "file:") {
      return "local-files";
    }
    return getRegistrableDomain(parsed.hostname);
  } catch {
    return "unknown";
  }
}

function getFaviconUrl(url) {
  try {
    const parsed = new URL(url);
    if (parsed.protocol === "file:") return "";
    return `https://www.google.com/s2/favicons?domain=${parsed.hostname}&sz=32`;
  } catch {
    return "";
  }
}

function isStudyTab(tab) {
  const url = tab.url || "";
  if (!url || url.startsWith("chrome://") || url.startsWith("chrome-extension://")) {
    return false;
  }
  return true;
}

function groupTabsBySite(tabs) {
  const groups = new Map();

  tabs.forEach(tab => {
    const key = tab.groupKey || getSiteKey(tab.url);
    const label = tab.groupLabel || (key === "local-files" ? "Local files" : getSiteKey(tab.url));
    if (!groups.has(key)) {
      groups.set(key, {
        key,
        label,
        tabs: []
      });
    }
    groups.get(key).tabs.push(tab);
  });

  return [...groups.values()]
    .map(group => ({
      ...group,
      tabs: group.tabs.sort((a, b) => a.title.localeCompare(b.title))
    }))
    .sort((a, b) => b.tabs.length - a.tabs.length || a.label.localeCompare(b.label));
}

function groupTabsByWindow(tabs) {
  const windows = new Map();
  const windowIndexes = getWindowIndexMap();

  tabs.forEach(tab => {
    if (!windows.has(tab.windowId)) {
      windows.set(tab.windowId, {
        id: tab.windowId,
        tabs: []
      });
    }
    windows.get(tab.windowId).tabs.push(tab);
  });

  return [...windows.values()]
    .sort((a, b) => {
      if (a.id === state.currentWindowId) return -1;
      if (b.id === state.currentWindowId) return 1;
      return (windowIndexes.get(a.id) || a.id) - (windowIndexes.get(b.id) || b.id);
    })
    .map(windowGroup => ({
      ...windowGroup,
      key: `window-${windowGroup.id}`,
      index: windowIndexes.get(windowGroup.id) || 1,
      label: getWindowLabel(windowGroup.id, windowIndexes.get(windowGroup.id) || 1),
      isCurrent: windowGroup.id === state.currentWindowId,
      tabs: windowGroup.tabs
        .slice()
        .sort((a, b) => (b.lastAccessed || 0) - (a.lastAccessed || 0) || a.title.localeCompare(b.title))
    }));
}

function getWindowIndexMap() {
  const windowIds = [...new Set(state.openTabs.map(tab => tab.windowId))]
    .filter(id => id !== undefined && id !== null)
    .sort((a, b) => a - b);
  return new Map(windowIds.map((id, index) => [id, index + 1]));
}

function getWindowLabel(windowId, index) {
  const customName = cleanText(state.windowNames[String(windowId)] || "");
  return customName || t("windowLabel", index);
}

function isTabSaved(tabOrUrl) {
  const normalizedUrl = normalizeUrl(typeof tabOrUrl === "string" ? tabOrUrl : tabOrUrl?.url || "");
  return state.savedItems.some(item => item.url === normalizedUrl);
}

function getUnsavedTabIds(tabIds) {
  return uniq(tabIds)
    .map(tabId => Number(tabId))
    .filter(tabId => {
      const tab = state.openTabs.find(entry => entry.id === tabId);
      return tab && !isTabSaved(tab);
    });
}

function syncSelectionState() {
  const validTabIds = new Set(state.openTabs.map(tab => tab.id));
  state.selectedTabIds = new Set(
    [...state.selectedTabIds].filter(tabId => validTabIds.has(tabId) && !isTabSaved(state.openTabs.find(tab => tab.id === tabId)))
  );

  state.saveComposer.tabIds = getUnsavedTabIds(state.saveComposer.tabIds);
  if (state.saveComposer.isOpen && state.saveComposer.tabIds.length === 0) {
    closeSaveComposer({ keepSelection: false });
  }
}

function getFilteredOpenTabs() {
  if (state.groupMode === "window" && state.windowFilter.startsWith("window-")) {
    const windowId = Number(state.windowFilter.replace("window-", ""));
    return state.openTabs.filter(tab => tab.windowId === windowId);
  }

  return state.openTabs.slice();
}

function getWindowOptions() {
  return state.groupedWindows.map(windowGroup => ({
    value: `window-${windowGroup.id}`,
    label: `${windowGroup.label}${windowGroup.isCurrent ? ` (${t("currentWindow")})` : ""}`
  }));
}

function startWindowRename(windowId) {
  state.editingWindowId = windowId;
  renderOpenTabs();
}

function cancelWindowRename() {
  state.editingWindowId = null;
  renderOpenTabs();
}

async function saveWindowRename(windowId, nextName) {
  const normalizedName = cleanText(nextName);
  if (normalizedName) {
    state.windowNames[String(windowId)] = normalizedName;
  } else {
    delete state.windowNames[String(windowId)];
  }
  state.editingWindowId = null;
  await persistWindowNames();
  renderOpenTabs();
}

function updateOpenTabGroups() {
  state.visibleTabs = getFilteredOpenTabs();
  state.groupedTabs = groupTabsBySite(state.visibleTabs);
  state.groupedWindows = groupTabsByWindow(state.openTabs);
  syncSelectionState();
}

function collectSuggestedTags(snapshot, domain) {
  const tags = new Set();
  const addTag = value => {
    const clean = cleanText(value);
    if (!clean || clean.length > 28) {
      return;
    }
    tags.add(clean);
  };

  addTag(domain);
  (snapshot.headings || []).slice(0, 3).forEach(heading => {
    addTag(heading.split(/\s+/).slice(0, 3).join(" "));
  });
  if (snapshot.description) {
    cleanText(snapshot.description)
      .split(/[,:|/-]/)
      .map(part => part.trim())
      .slice(0, 2)
      .forEach(addTag);
  }
  return [...tags].slice(0, 5);
}

function buildLearningFields(snapshot, domain) {
  return {
    takeaway: ""
  };
}

function getStatusLabel(status) {
  if (status === "learning") return t("learning");
  if (status === "learned") return t("learned");
  return t("toLearn");
}

function getPreviewText(text, fallback) {
  const clean = cleanText(text);
  return clean || fallback;
}

function buildBrowserQuery(value) {
  const query = cleanText(value);
  if (!query) return null;

  const hasProtocol = /^[a-z][a-z0-9+.-]*:\/\//i.test(query);
  const looksLikeDomain = /^[^\s]+\.[^\s]{2,}(\/.*)?$/i.test(query);

  if (hasProtocol) return { type: "url", value: query };
  if (looksLikeDomain) return { type: "url", value: `https://${query}` };
  return { type: "search", value: query };
}

async function openBrowserQuery(value) {
  const query = buildBrowserQuery(value);
  if (!query) return;

  if (query.type === "url") {
    if (!hasChromeApi("tabs")) {
      window.open(query.value, "_blank", "noopener");
      return;
    }

    await chrome.tabs.create({ url: query.value });
    return;
  }

  if (hasChromeApi("search") && chrome.search?.query) {
    await chrome.search.query({
      text: query.value,
      disposition: "NEW_TAB"
    });
    return;
  }

  window.alert(t("browserLauncherSearchUnavailable"));
}

async function refreshOpenTabs() {
  await loadOpenTabs();
  renderOpenTabs();
}

function scheduleOpenTabsRefresh() {
  if (!hasChromeApi("tabs")) return;
  window.clearTimeout(refreshTabsTimer);
  refreshTabsTimer = window.setTimeout(() => {
    refreshOpenTabs();
  }, 300);
}

function bindTabSyncEvents() {
  if (!hasChromeApi("tabs")) return;

  chrome.tabs.onCreated?.addListener(scheduleOpenTabsRefresh);
  chrome.tabs.onRemoved?.addListener(scheduleOpenTabsRefresh);
  chrome.tabs.onAttached?.addListener(scheduleOpenTabsRefresh);
  chrome.tabs.onDetached?.addListener(scheduleOpenTabsRefresh);
  chrome.tabs.onReplaced?.addListener(scheduleOpenTabsRefresh);
  chrome.tabs.onUpdated?.addListener((_tabId, changeInfo) => {
    if (changeInfo.status || changeInfo.title || changeInfo.url || changeInfo.favIconUrl) {
      scheduleOpenTabsRefresh();
    }
  });

  chrome.windows?.onFocusChanged?.addListener(scheduleOpenTabsRefresh);
  chrome.windows?.onCreated?.addListener(scheduleOpenTabsRefresh);
  chrome.windows?.onRemoved?.addListener(scheduleOpenTabsRefresh);
}

async function captureTabSnapshot(tabId) {
  if (!hasChromeApi("scripting")) {
    return {
      title: cleanText(document.title),
      description: "",
      headings: [],
      mainText: ""
    };
  }

  try {
    const [result] = await chrome.scripting.executeScript({
      target: { tabId },
      func: () => {
        const clean = value => (value || "").replace(/\s+/g, " ").trim();
        const description =
          document.querySelector('meta[name="description"]')?.content ||
          document.querySelector('meta[property="og:description"]')?.content ||
          "";
        const headings = [...document.querySelectorAll("main h1, main h2, article h1, article h2, h1, h2")]
          .map(node => clean(node.textContent))
          .filter(Boolean)
          .slice(0, 6);
        const paragraphs = [...document.querySelectorAll("main p, article p, p")]
          .map(node => clean(node.textContent))
          .filter(text => text.length > 50)
          .slice(0, 6);

        return {
          title: clean(document.title),
          description: clean(description),
          headings,
          mainText: paragraphs.join(" ")
        };
      }
    });

    return result?.result || null;
  } catch {
    return null;
  }
}

async function loadSavedItems() {
  const savedItems = await storageGet(STORAGE_KEY);
  state.savedItems = (savedItems || []).map(item => ({
    ...item,
    domain: getDomain(item.url || item.domain || ""),
    status:
      item.status === "unread" ? "to_learn" :
      item.status === "reading" ? "learning" :
      item.status === "done" ? "learned" :
      item.status || "to_learn",
    takeaway: item.takeaway || ""
  }));
}

async function persistSavedItems() {
  await storageSet(STORAGE_KEY, state.savedItems);
}

async function loadOpenTabs() {
  if (!hasChromeApi("tabs")) {
    state.openTabs = demoTabs.slice();
    state.currentWindowId = 1;
    updateOpenTabGroups();
    return;
  }

  if (chrome.tabs?.getCurrent) {
    try {
      const currentTab = await chrome.tabs.getCurrent();
      state.currentWindowId = currentTab?.windowId || null;
    } catch {
      state.currentWindowId = null;
    }
  }

  if (chrome.windows?.getCurrent) {
    try {
      const currentWindow = await chrome.windows.getCurrent();
      state.currentWindowId = state.currentWindowId || currentWindow?.id || null;
    } catch {
      state.currentWindowId = state.currentWindowId || null;
    }
  }

  const tabs = await chrome.tabs.query({});
  state.openTabs = tabs
    .filter(isStudyTab)
    .map(tab => ({
      id: tab.id,
      windowId: tab.windowId,
      lastAccessed: tab.lastAccessed || 0,
      title: tab.title || "Untitled page",
      url: tab.url || "",
      domain: getDomain(tab.url || ""),
      faviconUrl: getFaviconUrl(tab.url || "")
    }))
    .sort((a, b) => a.windowId - b.windowId || a.domain.localeCompare(b.domain) || a.title.localeCompare(b.title));

  updateOpenTabGroups();
}

function getFilteredSavedItems() {
  return state.savedItems.filter(item => {
    const matchesSearch = state.search
      ? [
          item.title,
          item.takeaway || "",
          item.domain,
          ...item.tags
        ].join(" ").toLowerCase().includes(state.search)
      : true;

    const matchesStatus = state.statusFilter === "all" || item.status === state.statusFilter;
    const matchesTag = state.tagFilter === "all" || item.tags.includes(state.tagFilter);

    return matchesSearch && matchesStatus && matchesTag;
  });
}

function updateTagFilterOptions() {
  const currentValue = state.tagFilter;
  const tags = getSavedTags();

  elements.tagFilter.innerHTML = "";
  const allOption = document.createElement("option");
  allOption.value = "all";
  allOption.textContent = t("allTags");
  elements.tagFilter.appendChild(allOption);

  tags.forEach(tag => {
    const option = document.createElement("option");
    option.value = tag;
    option.textContent = tag;
    elements.tagFilter.appendChild(option);
  });

  elements.tagFilter.value = tags.includes(currentValue) || currentValue === "all" ? currentValue : "all";
  state.tagFilter = elements.tagFilter.value;
}

function getSavedTags() {
  return [...new Set(state.savedItems.flatMap(item => item.tags))]
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b));
}

function setSaveComposerTagMenuOpen(isOpen) {
  const hasTags = getSavedTags().length > 0;
  const shouldOpen = Boolean(isOpen && hasTags);
  elements.saveComposerTagMenu.hidden = !shouldOpen;
  elements.saveComposerTagPicker.classList.toggle("is-open", shouldOpen);
  elements.saveComposerTagToggle.setAttribute("aria-expanded", String(shouldOpen));
}

function updateSaveComposerTagSuggestions() {
  const tags = getSavedTags();

  elements.saveComposerTagMenu.innerHTML = "";
  elements.saveComposerTagToggle.hidden = tags.length === 0;
  elements.saveComposerTagPicker.classList.toggle("has-saved-tags", tags.length > 0);

  tags.forEach(tag => {
    const option = document.createElement("button");
    option.type = "button";
    option.className = "tag-picker-option";
    option.dataset.tag = tag;
    option.textContent = tag;
    elements.saveComposerTagMenu.appendChild(option);
  });

  if (tags.length === 0) {
    setSaveComposerTagMenuOpen(false);
  }
}

function updateWindowFilterOptions() {
  const validValues = new Set(["all"]);
  elements.windowFilter.innerHTML = "";

  const allOption = document.createElement("option");
  allOption.value = "all";
  allOption.textContent = t("allWindows");
  elements.windowFilter.appendChild(allOption);

  getWindowOptions().forEach(optionData => {
    validValues.add(optionData.value);
    const option = document.createElement("option");
    option.value = optionData.value;
    option.textContent = optionData.label;
    elements.windowFilter.appendChild(option);
  });

  if (state.windowFilter === "current" && state.currentWindowId) {
    state.windowFilter = `window-${state.currentWindowId}`;
    localStorage.setItem(WINDOW_FILTER_KEY, state.windowFilter);
  }

  if (!validValues.has(state.windowFilter)) {
    state.windowFilter = "all";
  }

  elements.windowFilter.value = state.windowFilter;
  elements.windowFilterLabel.hidden = state.groupMode !== "window" || state.groupedWindows.length <= 1;
}

function renderSelectionTray() {
  const selectedCount = state.selectedTabIds.size;
  elements.selectionTray.hidden = selectedCount === 0;
  elements.selectionCount.textContent = t("selectedCount", selectedCount);
}

function renderSaveComposer() {
  elements.saveComposer.hidden = !state.saveComposer.isOpen;
  if (!state.saveComposer.isOpen) {
    return;
  }

  elements.saveComposerStatus.value = state.saveComposer.status;
  updateSaveComposerTagSuggestions();
  elements.saveComposerTags.value = state.saveComposer.tags;
  elements.saveComposerSummary.textContent = t("saveComposerSummary", state.saveComposer.tabIds.length);
}

function syncSavedSelectionState() {
  const validIds = new Set(state.savedItems.map(item => item.id));
  state.selectedSavedItemIds = new Set(
    [...state.selectedSavedItemIds].filter(itemId => validIds.has(itemId))
  );
}

function renderSavedBulkEditor() {
  syncSavedSelectionState();
  const selectedCount = state.selectedSavedItemIds.size;
  elements.savedBulkEditor.hidden = selectedCount === 0;
  elements.savedBulkCount.textContent = t("selectedCount", selectedCount);
  if (selectedCount === 0) {
    elements.savedBulkStatus.value = "";
    elements.savedBulkTags.value = "";
  }
}

function toggleSavedItemSelection(itemId) {
  if (state.selectedSavedItemIds.has(itemId)) {
    state.selectedSavedItemIds.delete(itemId);
  } else {
    state.selectedSavedItemIds.add(itemId);
  }
  renderSavedBulkEditor();
  renderSavedItems();
}

function getDefaultComposerTags(tabIds) {
  const tabs = tabIds
    .map(tabId => state.openTabs.find(tab => tab.id === tabId))
    .filter(Boolean);

  const uniqueDomains = uniq(tabs.map(tab => tab.domain).filter(Boolean));
  return uniqueDomains.length === 1 ? uniqueDomains[0] : "";
}

function openSaveComposer(tabIds) {
  const nextTabIds = getUnsavedTabIds(tabIds);
  if (nextTabIds.length === 0) {
    return false;
  }

  state.saveComposer.isOpen = true;
  state.saveComposer.tabIds = nextTabIds;
  state.saveComposer.status = "to_learn";
  state.saveComposer.tags = getDefaultComposerTags(nextTabIds);
  renderSelectionTray();
  renderSaveComposer();
  window.requestAnimationFrame(() => {
    elements.saveComposerTags.focus();
    elements.saveComposerTags.select();
  });
  return true;
}

function closeSaveComposer({ keepSelection = true } = {}) {
  state.saveComposer.isOpen = false;
  state.saveComposer.tabIds = [];
  state.saveComposer.status = "to_learn";
  state.saveComposer.tags = "";
  if (!keepSelection) {
    state.selectedTabIds.clear();
  }
  renderSelectionTray();
  renderSaveComposer();
}

function toggleTabSelection(tabId) {
  if (state.selectedTabIds.has(tabId)) {
    state.selectedTabIds.delete(tabId);
  } else {
    state.selectedTabIds.add(tabId);
  }
  renderSelectionTray();
}

function renderSiteGroup(group, container = elements.openTabsList) {
    const fragment = elements.openTabTemplate.content.cloneNode(true);
    translateRoot(fragment);
    const title = fragment.querySelector(".site-title");
    const count = fragment.querySelector(".site-count");
    const saveGroupButton = fragment.querySelector(".save-group-button");
    const closeGroupButton = fragment.querySelector(".close-group-button");
    const childrenContainer = fragment.querySelector(".site-children");
    const moreButton = fragment.querySelector(".site-more");
    const expanded = state.expandedGroups.has(group.key);
    const visibleTabs = expanded ? group.tabs : group.tabs.slice(0, DEFAULT_VISIBLE_CHILDREN);

    state.renderedGroups.set(group.key, group);
    title.textContent = group.label;
    count.textContent = t("openPages", group.tabs.length);
    saveGroupButton.dataset.groupKey = group.key;
    closeGroupButton.dataset.groupKey = group.key;
    moreButton.dataset.groupKey = group.key;

    visibleTabs.forEach(tab => {
      const childFragment = elements.childTabTemplate.content.cloneNode(true);
      translateRoot(childFragment);
      const linkButton = childFragment.querySelector(".child-tab-link");
      const favicon = childFragment.querySelector(".child-tab-favicon");
      const saveButton = childFragment.querySelector(".child-save-button");
      const closeButton = childFragment.querySelector(".child-close-button");
      const selectInput = childFragment.querySelector(".tab-select-input");
      const selectControl = childFragment.querySelector(".tab-select-control");
      const isSaved = isTabSaved(tab);

      childFragment.querySelector(".child-tab-title").textContent = tab.title;
      linkButton.dataset.tabId = String(tab.id);
      favicon.src = tab.faviconUrl || "";
      favicon.hidden = !tab.faviconUrl;
      saveButton.dataset.tabId = String(tab.id);
      closeButton.dataset.tabId = String(tab.id);
      selectInput.dataset.tabId = String(tab.id);
      selectInput.checked = state.selectedTabIds.has(tab.id);
      selectInput.disabled = isSaved;

      if (isSaved) {
        saveButton.textContent = t("saved");
        saveButton.disabled = true;
        selectControl.classList.add("is-disabled");
      }

      childrenContainer.appendChild(childFragment);
    });

    if (group.tabs.length > DEFAULT_VISIBLE_CHILDREN) {
      moreButton.hidden = false;
      moreButton.textContent = expanded
        ? t("showLess")
        : t("more", group.tabs.length - DEFAULT_VISIBLE_CHILDREN);
    }

    container.appendChild(fragment);
}

function renderWindowGroup(windowGroup) {
  const section = document.createElement("section");
  section.className = "window-group";

  const header = document.createElement("div");
  header.className = "window-group-head";
  const titleWrap = document.createElement("div");
  titleWrap.className = "window-group-title-wrap";

  const actions = document.createElement("div");
  actions.className = "window-group-actions";
  const isEditing = state.editingWindowId === windowGroup.id;

  if (isEditing) {
    const renameForm = document.createElement("form");
    renameForm.className = "window-rename-form";
    renameForm.dataset.windowId = String(windowGroup.id);

    const nameInput = document.createElement("input");
    nameInput.className = "window-rename-input";
    nameInput.type = "text";
    nameInput.name = "windowName";
    nameInput.value = cleanText(state.windowNames[String(windowGroup.id)] || "");
    nameInput.placeholder = t("windowNamePlaceholder");
    nameInput.maxLength = 32;
    renameForm.appendChild(nameInput);

    const saveRenameButton = document.createElement("button");
    saveRenameButton.className = "ghost-button window-rename-save";
    saveRenameButton.type = "submit";
    saveRenameButton.textContent = t("saveWindowName");
    renameForm.appendChild(saveRenameButton);

    const cancelRenameButton = document.createElement("button");
    cancelRenameButton.className = "link-button window-rename-cancel";
    cancelRenameButton.type = "button";
    cancelRenameButton.dataset.windowId = String(windowGroup.id);
    cancelRenameButton.textContent = t("cancelWindowName");
    renameForm.appendChild(cancelRenameButton);

    titleWrap.appendChild(renameForm);
  } else {
    const title = document.createElement("h3");
    title.className = "window-group-title";
    title.textContent = `${windowGroup.label} · ${t("windowTabs", windowGroup.tabs.length)}`;
    titleWrap.appendChild(title);

    if (windowGroup.isCurrent) {
      const badge = document.createElement("span");
      badge.className = "window-current-badge";
      badge.textContent = t("currentWindow");
      titleWrap.appendChild(badge);
    }

    const renameButton = document.createElement("button");
    renameButton.className = "link-button window-rename-trigger";
    renameButton.type = "button";
    renameButton.dataset.windowId = String(windowGroup.id);
    renameButton.textContent = t("renameWindow");
    titleWrap.appendChild(renameButton);

    const saveButton = document.createElement("button");
    saveButton.className = "ghost-button save-group-button";
    saveButton.type = "button";
    saveButton.dataset.groupKey = windowGroup.key;
    saveButton.textContent = t("saveGroup");

    const closeButton = document.createElement("button");
    closeButton.className = "ghost-button close-group-button";
    closeButton.type = "button";
    closeButton.dataset.groupKey = windowGroup.key;
    closeButton.textContent = t("closeGroup");

    actions.appendChild(saveButton);
    actions.appendChild(closeButton);
  }

  header.appendChild(titleWrap);
  if (actions.childElementCount > 0) {
    header.appendChild(actions);
  }

  section.appendChild(header);
  renderSiteGroup({
    key: windowGroup.key,
    label: windowGroup.label,
    tabs: windowGroup.tabs
  }, section);
  elements.openTabsList.appendChild(section);
}

function renderOpenTabs() {
  elements.openTabsList.innerHTML = "";
  state.renderedGroups.clear();
  updateOpenTabGroups();
  applyGroupMode(state.groupMode);
  updateWindowFilterOptions();
  updateStatsLine();
  renderSelectionTray();
  renderSaveComposer();

  if (state.groupMode === "window") {
    groupTabsByWindow(state.visibleTabs).forEach(renderWindowGroup);
    return;
  }

  if (state.groupMode === "recent") {
    renderSiteGroup({
      key: "recent-tabs",
      label: t("recentTabs"),
      tabs: state.visibleTabs.slice().sort((a, b) => (b.lastAccessed || 0) - (a.lastAccessed || 0))
    });
    return;
  }

  state.groupedTabs.forEach(group => renderSiteGroup(group));
}

function renderSavedItems() {
  const filteredItems = getFilteredSavedItems();
  elements.savedList.innerHTML = "";
  elements.savedEmptyState.hidden = filteredItems.length > 0;
  renderSavedBulkEditor();

  filteredItems
    .slice()
    .sort((a, b) => b.savedAt - a.savedAt)
    .forEach(item => {
      const fragment = elements.savedItemTemplate.content.cloneNode(true);
      translateRoot(fragment);
      const card = fragment.querySelector(".saved-card");
      const statusBadge = fragment.querySelector(".saved-status-badge");
      const titleButton = fragment.querySelector(".saved-title-button");
      const deleteButton = fragment.querySelector(".delete-link");
      const selectInput = fragment.querySelector(".saved-select-input");
      const takeawayInput = fragment.querySelector(".saved-takeaway-input");
      const takeawayText = fragment.querySelector(".saved-takeaway-text");
      const takeawayToggle = fragment.querySelector(".saved-takeaway-toggle");
      const isEditingTakeaway = state.editingTakeawayId === item.id;
      const isTakeawayExpanded = state.expandedTakeaways.has(item.id);
      const hasLongTakeaway = cleanText(item.takeaway || "").length > 110;

      card.dataset.itemId = item.id;
      card.classList.toggle("is-selected", state.selectedSavedItemIds.has(item.id));
      statusBadge.textContent = getStatusLabel(item.status);
      fragment.querySelector(".saved-title").textContent = item.title;
      const dateParts = formatDateParts(item.savedAt);
      fragment.querySelector(".saved-meta").innerHTML =
        `<span class="saved-date">${t("savedOn", dateParts.date)}</span><span class="saved-time">${dateParts.time}</span>`;
      takeawayInput.value = item.takeaway || "";
      takeawayInput.dataset.itemId = item.id;
      takeawayInput.hidden = !isEditingTakeaway;
      takeawayInput.classList.toggle("is-filled", Boolean(item.takeaway));
      takeawayText.dataset.itemId = item.id;
      takeawayText.textContent = cleanText(item.takeaway || "") || t("takeawayPlaceholder");
      takeawayText.classList.toggle("is-empty", !cleanText(item.takeaway || ""));
      takeawayText.classList.toggle("is-expanded", isTakeawayExpanded);
      takeawayText.hidden = isEditingTakeaway;
      takeawayToggle.dataset.itemId = item.id;
      takeawayToggle.hidden = isEditingTakeaway || !hasLongTakeaway;
      takeawayToggle.textContent = isTakeawayExpanded ? t("showLess") : t("showMore");

      titleButton.dataset.itemId = item.id;
      deleteButton.dataset.itemId = item.id;
      selectInput.dataset.itemId = item.id;
      selectInput.checked = state.selectedSavedItemIds.has(item.id);

      elements.savedList.appendChild(fragment);
    });

  updateStatsLine();
}

async function saveTab(tabId, options = {}) {
  const tab = state.openTabs.find(item => item.id === tabId);
  if (!tab) return false;

  const normalizedUrl = normalizeUrl(tab.url);
  if (state.savedItems.some(item => item.url === normalizedUrl)) return false;

  const snapshot = await captureTabSnapshot(tabId);
  const learningFields = buildLearningFields(snapshot || {}, tab.domain);
  const customTags = parseTags(options.tags || "");
  state.savedItems.unshift({
    id: crypto.randomUUID(),
    title: tab.title,
    url: normalizedUrl,
    domain: tab.domain,
    savedAt: Date.now(),
    tags: customTags.length ? customTags : snapshot ? collectSuggestedTags(snapshot, tab.domain) : [tab.domain],
    takeaway: learningFields.takeaway,
    status: options.status || "to_learn"
  });

  await persistSavedItems();
  if (options.playSound !== false) {
    await playSaveSound();
  }
  if (options.render !== false) {
    updateTagFilterOptions();
    renderOpenTabs();
    renderSavedItems();
  }
  return true;
}

async function saveTabsWithMetadata(tabIds, metadata = {}) {
  let savedCount = 0;
  const nextTabIds = getUnsavedTabIds(tabIds);
  if (nextTabIds.length === 0) {
    closeSaveComposer();
    renderOpenTabs();
    return;
  }

  for (const tabId of nextTabIds) {
    const saved = await saveTab(tabId, {
      status: metadata.status,
      tags: metadata.tags,
      playSound: false,
      render: false
    });
    if (saved) savedCount += 1;
  }

  if (savedCount > 0) {
    await playSaveSound();
    state.selectedTabIds = new Set(
      [...state.selectedTabIds].filter(tabId => !nextTabIds.includes(tabId))
    );
    closeSaveComposer({ keepSelection: true });
    updateTagFilterOptions();
    renderOpenTabs();
    renderSavedItems();
  }
}

async function saveGroup(groupKey) {
  const group = state.renderedGroups.get(groupKey) || state.groupedTabs.find(entry => entry.key === groupKey);
  if (!group) return;
  openSaveComposer(group.tabs.map(tab => tab.id));
}

async function updateSavedItem(itemId, updates) {
  const item = state.savedItems.find(entry => entry.id === itemId);
  if (!item) return;

  Object.assign(item, updates);
  await persistSavedItems();
  updateTagFilterOptions();
  renderSavedItems();
  renderOpenTabs();
}

async function updateSelectedSavedItems() {
  const itemIds = [...state.selectedSavedItemIds];
  if (itemIds.length === 0) return;

  const nextStatus = elements.savedBulkStatus.value;
  const nextTags = parseTags(elements.savedBulkTags.value);

  state.savedItems.forEach(item => {
    if (!state.selectedSavedItemIds.has(item.id)) return;
    if (nextStatus) {
      item.status = nextStatus;
    }
    if (nextTags.length) {
      item.tags = nextTags;
    }
  });

  await persistSavedItems();
  state.selectedSavedItemIds.clear();
  elements.savedBulkStatus.value = "";
  elements.savedBulkTags.value = "";
  updateTagFilterOptions();
  renderSavedItems();
}

async function removeSavedItem(itemId) {
  state.savedItems = state.savedItems.filter(item => item.id !== itemId);
  await persistSavedItems();
  updateTagFilterOptions();
  renderSavedItems();
  renderOpenTabs();
}

async function openSavedItem(itemId) {
  const item = state.savedItems.find(entry => entry.id === itemId);
  if (!item) return;
  if (!hasChromeApi("tabs")) {
    window.open(item.url, "_blank", "noopener");
    return;
  }
  await chrome.tabs.create({ url: item.url });
}

async function focusTab(tabId) {
  const tab = state.openTabs.find(entry => entry.id === tabId);
  if (!tab) return;
  if (!hasChromeApi("tabs") || !chrome.windows) {
    window.open(tab.url, "_blank", "noopener");
    return;
  }
  await chrome.windows.update(tab.windowId, { focused: true });
  await chrome.tabs.update(tabId, { active: true });
}

async function closeGroup(groupKey) {
  const group = state.renderedGroups.get(groupKey) || state.groupedTabs.find(entry => entry.key === groupKey);
  if (!group) return;
  if (!hasChromeApi("tabs")) {
    const tabIds = new Set(group.tabs.map(tab => tab.id));
    state.openTabs = state.openTabs.filter(tab => !tabIds.has(tab.id));
    updateOpenTabGroups();
    await playCloseSound();
    renderOpenTabs();
    return;
  }
  await chrome.tabs.remove(group.tabs.map(tab => tab.id));
  await playCloseSound();
  await loadOpenTabs();
  renderOpenTabs();
}

async function closeTab(tabId) {
  if (!hasChromeApi("tabs")) {
    state.openTabs = state.openTabs.filter(tab => tab.id !== tabId);
    updateOpenTabGroups();
    await playCloseSound();
    renderOpenTabs();
    return;
  }
  await chrome.tabs.remove(tabId);
  await playCloseSound();
  await loadOpenTabs();
  renderOpenTabs();
}

async function closeSelectedTabs() {
  const tabIds = [...state.selectedTabIds];
  if (tabIds.length === 0) return;

  closeSaveComposer({ keepSelection: false });
  state.selectedTabIds.clear();

  if (!hasChromeApi("tabs")) {
    const selectedTabIds = new Set(tabIds);
    state.openTabs = state.openTabs.filter(tab => !selectedTabIds.has(tab.id));
    updateOpenTabGroups();
    await playCloseSound();
    renderOpenTabs();
    return;
  }

  await chrome.tabs.remove(tabIds);
  await playCloseSound();
  await loadOpenTabs();
  renderOpenTabs();
}

function toggleGroupExpanded(groupKey) {
  if (state.expandedGroups.has(groupKey)) {
    state.expandedGroups.delete(groupKey);
  } else {
    state.expandedGroups.add(groupKey);
  }
  renderOpenTabs();
}

function bindEvents() {
  elements.browserLauncher.addEventListener("submit", async event => {
    event.preventDefault();
    await openBrowserQuery(elements.browserLauncherInput.value);
  });

  elements.languageToggle.addEventListener("click", event => {
    const button = event.target.closest(".language-option");
    if (!button) return;
    applyLanguage(button.dataset.lang);
    updateTagFilterOptions();
    renderOpenTabs();
    renderSavedItems();
  });

  elements.groupModeToggle.addEventListener("click", event => {
    const button = event.target.closest(".group-mode-option");
    if (!button) return;
    applyGroupMode(button.dataset.groupMode);
    renderOpenTabs();
  });

  elements.windowFilter.addEventListener("change", event => {
    state.windowFilter = event.target.value;
    localStorage.setItem(WINDOW_FILTER_KEY, state.windowFilter);
    renderOpenTabs();
  });

  elements.refreshTabsButton.addEventListener("click", async () => {
    await refreshOpenTabs();
  });

  elements.saveSelectedButton.addEventListener("click", () => {
    openSaveComposer([...state.selectedTabIds]);
  });

  elements.closeSelectedButton.addEventListener("click", async () => {
    await closeSelectedTabs();
  });

  elements.clearSelectionButton.addEventListener("click", () => {
    state.selectedTabIds.clear();
    closeSaveComposer({ keepSelection: false });
    renderOpenTabs();
  });

  elements.clearSavedSelectionButton.addEventListener("click", () => {
    state.selectedSavedItemIds.clear();
    renderSavedItems();
  });

  elements.cancelSaveComposerButton.addEventListener("click", () => {
    closeSaveComposer();
  });

  elements.saveComposerStatus.addEventListener("change", event => {
    state.saveComposer.status = event.target.value;
  });

  elements.saveComposerTagToggle.addEventListener("click", () => {
    setSaveComposerTagMenuOpen(elements.saveComposerTagMenu.hidden);
  });

  elements.saveComposerTagMenu.addEventListener("click", event => {
    const option = event.target.closest(".tag-picker-option");
    if (!option) return;
    state.saveComposer.tags = option.dataset.tag;
    elements.saveComposerTags.value = option.dataset.tag;
    setSaveComposerTagMenuOpen(false);
    elements.saveComposerTags.focus();
  });

  elements.saveComposerTags.addEventListener("input", event => {
    state.saveComposer.tags = event.target.value;
  });

  document.addEventListener("click", event => {
    if (!elements.saveComposerTagPicker.contains(event.target)) {
      setSaveComposerTagMenuOpen(false);
    }
  });

  elements.searchInput.addEventListener("input", event => {
    state.search = event.target.value.trim().toLowerCase();
    renderSavedItems();
  });

  elements.statusFilter.addEventListener("change", event => {
    state.statusFilter = event.target.value;
    renderSavedItems();
  });

  elements.tagFilter.addEventListener("change", event => {
    state.tagFilter = event.target.value;
    renderSavedItems();
  });

  elements.savedBulkEditor.addEventListener("submit", async event => {
    event.preventDefault();
    await updateSelectedSavedItems();
  });

  elements.openTabsList.addEventListener("click", async event => {
    const saveButton = event.target.closest(".child-save-button");
    const openButton = event.target.closest(".child-tab-link");
    const closeButton = event.target.closest(".child-close-button");
    const saveGroupButton = event.target.closest(".save-group-button");
    const closeGroupButton = event.target.closest(".close-group-button");
    const moreButton = event.target.closest(".site-more");
    const renameButton = event.target.closest(".window-rename-trigger");
    const cancelRenameButton = event.target.closest(".window-rename-cancel");

    if (saveButton) openSaveComposer([Number(saveButton.dataset.tabId)]);
    if (openButton) await focusTab(Number(openButton.dataset.tabId));
    if (closeButton) await closeTab(Number(closeButton.dataset.tabId));
    if (saveGroupButton) await saveGroup(saveGroupButton.dataset.groupKey);
    if (closeGroupButton) await closeGroup(closeGroupButton.dataset.groupKey);
    if (moreButton) toggleGroupExpanded(moreButton.dataset.groupKey);
    if (renameButton) startWindowRename(Number(renameButton.dataset.windowId));
    if (cancelRenameButton) cancelWindowRename();
  });

  elements.openTabsList.addEventListener("change", event => {
    const input = event.target.closest(".tab-select-input");
    if (!input) return;
    toggleTabSelection(Number(input.dataset.tabId));
  });

  elements.openTabsList.addEventListener("submit", async event => {
    const renameForm = event.target.closest(".window-rename-form");
    if (!renameForm) return;
    event.preventDefault();
    const nameInput = renameForm.querySelector(".window-rename-input");
    await saveWindowRename(Number(renameForm.dataset.windowId), nameInput?.value || "");
  });

  elements.saveComposer.addEventListener("submit", async event => {
    event.preventDefault();
    await saveTabsWithMetadata(state.saveComposer.tabIds, {
      status: state.saveComposer.status,
      tags: state.saveComposer.tags
    });
  });

  elements.savedList.addEventListener("click", async event => {
    const openButton = event.target.closest(".saved-title-button");
    const deleteButton = event.target.closest(".delete-link");
    const card = event.target.closest(".saved-card");
    const selectInput = event.target.closest(".saved-select-input");
    const takeawayInput = event.target.closest(".saved-takeaway-input");
    const takeawayText = event.target.closest(".saved-takeaway-text");
    const takeawayToggle = event.target.closest(".saved-takeaway-toggle");

    if (openButton) await openSavedItem(openButton.dataset.itemId);
    if (deleteButton) await removeSavedItem(deleteButton.dataset.itemId);
    if (takeawayText) {
      state.editingTakeawayId = takeawayText.dataset.itemId;
      renderSavedItems();
      window.requestAnimationFrame(() => {
        const input = elements.savedList.querySelector(`.saved-takeaway-input[data-item-id="${CSS.escape(state.editingTakeawayId)}"]`);
        input?.focus();
        input?.select();
      });
      return;
    }
    if (takeawayToggle) {
      const itemId = takeawayToggle.dataset.itemId;
      if (state.expandedTakeaways.has(itemId)) {
        state.expandedTakeaways.delete(itemId);
      } else {
        state.expandedTakeaways.add(itemId);
      }
      renderSavedItems();
      return;
    }
    if (selectInput) return;
    if (takeawayInput) return;
    if (card && !openButton && !deleteButton) {
      toggleSavedItemSelection(card.dataset.itemId);
    }
  });

  elements.savedList.addEventListener("change", async event => {
    const target = event.target;
    const itemId = target.dataset.itemId;
    if (!itemId) return;
    if (target.matches(".saved-select-input")) {
      toggleSavedItemSelection(itemId);
    }
  });

  elements.savedList.addEventListener("blur", async event => {
    const target = event.target;
    const itemId = target.dataset.itemId;
    if (!itemId) return;

    if (target.matches(".saved-takeaway-input")) {
      const takeaway = target.value.trim();
      target.classList.toggle("is-filled", Boolean(takeaway));
      state.editingTakeawayId = null;
      await updateSavedItem(itemId, { takeaway });
    }
  }, true);
}

async function initialize() {
  initializeLanguage();
  initializeGroupMode();
  await loadWindowNames();
  await loadSavedItems();
  await loadOpenTabs();
  updateTagFilterOptions();
  renderOpenTabs();
  renderSavedItems();
  initializeResizableLayout();
  bindEvents();
  bindTabSyncEvents();
}

initialize();
