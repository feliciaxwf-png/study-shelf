const STORAGE_KEY = "studyShelfItems";
const PANEL_WIDTH_KEY = "studyShelfLeftPanel";
const LANGUAGE_KEY = "studyShelfLanguage";
const DEFAULT_VISIBLE_CHILDREN = 3;

const state = {
  openTabs: [],
  groupedTabs: [],
  savedItems: [],
  search: "",
  statusFilter: "all",
  tagFilter: "all",
  language: "en",
  expandedGroups: new Set()
};

const translations = {
  en: {
    heroTitle: "Turn open tabs into a study system.",
    heroCopy: "Save useful pages with quick takeaways, then come back to them by topic instead of memory.",
    currentTabs: "Current tabs",
    groupedByWebsite: "Grouped by website",
    saveAllVisible: "Save all tabs",
    refresh: "Refresh",
    learningLibrary: "Learning library",
    savedPagesContext: "Saved pages with context",
    search: "Search",
    searchPlaceholder: "Title, takeaway, tag, domain",
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
    more: count => `+${count} more`,
    openTabs: count => `${count} open tab${count === 1 ? "" : "s"}`,
    savedCount: count => `${count} saved`,
    learningCount: count => `${count} learning`,
    openTabsLabel: "open tabs",
    savedLabel: "saved",
    learningLabel: "learning",
    openPages: count => `${count} open page${count === 1 ? "" : "s"}`,
    savedOn: date => `Saved ${date}`
  },
  zh: {
    heroTitle: "把打开的网页变成学习清单。",
    heroCopy: "先保存值得看的页面，补一句关键收获，之后按主题回来继续学。",
    currentTabs: "当前网页",
    groupedByWebsite: "按网站整理",
    saveAllVisible: "保存当前全部",
    refresh: "刷新",
    learningLibrary: "学习清单",
    savedPagesContext: "已保存的学习页面",
    search: "搜索",
    searchPlaceholder: "标题、收获、标签、网站",
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
    more: count => `还有 ${count} 个`,
    openTabs: count => `${count} 个打开网页`,
    savedCount: count => `${count} 个已保存`,
    learningCount: count => `${count} 个学习中`,
    openTabsLabel: "打开网页",
    savedLabel: "已保存",
    learningLabel: "学习中",
    openPages: count => `${count} 个页面`,
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
  refreshTabsButton: document.querySelector("#refreshTabsButton"),
  saveAllTabsButton: document.querySelector("#saveAllTabsButton"),
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
    title: "Download LM Studio - Mac, Linux, Windows",
    url: "https://lmstudio.ai/download",
    domain: "lmstudio.ai",
    faviconUrl: getFaviconUrl("https://lmstudio.ai/download")
  },
  {
    id: 1002,
    windowId: 1,
    title: "OpenAI Platform Docs",
    url: "https://platform.openai.com/docs",
    domain: "platform.openai.com",
    faviconUrl: getFaviconUrl("https://platform.openai.com/docs")
  },
  {
    id: 1003,
    windowId: 1,
    title: "Prompt engineering guide",
    url: "https://platform.openai.com/docs/guides/prompt-engineering",
    domain: "platform.openai.com",
    faviconUrl: getFaviconUrl("https://platform.openai.com/docs/guides/prompt-engineering")
  },
  {
    id: 1004,
    windowId: 1,
    title: "即梦AI - 一站式AI创作平台",
    url: "https://jimeng.jianying.com",
    domain: "jimeng.jianying.com",
    faviconUrl: getFaviconUrl("https://jimeng.jianying.com")
  }
];

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

  updateStatsLine();
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

  const commitFrame = () => {
    frameId = null;
    if (pendingWidth !== null) {
      setPanelWidth(pendingWidth);
    }
  };

  const updateFromPointer = event => {
    if (!isDragging || !elements.layout) return;
    const rect = elements.layout.getBoundingClientRect();
    pendingWidth = ((event.clientX - rect.left) / rect.width) * 100;
    if (!frameId) {
      frameId = requestAnimationFrame(commitFrame);
    }
  };

  elements.layoutResizer.addEventListener("pointerdown", event => {
    isDragging = true;
    elements.layout.classList.add("is-resizing");
    elements.layoutResizer.setPointerCapture(event.pointerId);
    updateFromPointer(event);
  });

  elements.layoutResizer.addEventListener("pointermove", updateFromPointer);

  const stopDragging = event => {
    if (!isDragging) return;
    isDragging = false;
    elements.layout.classList.remove("is-resizing");
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

function getDomain(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "Unknown";
  }
}

function getSiteKey(url) {
  try {
    const parsed = new URL(url);
    if (parsed.protocol === "file:") {
      return "local-files";
    }
    return parsed.hostname.replace(/^www\./, "");
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
    const key = getSiteKey(tab.url);
    if (!groups.has(key)) {
      groups.set(key, {
        key,
        label: key === "local-files" ? "Local files" : key,
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
    state.groupedTabs = groupTabsBySite(state.openTabs);
    return;
  }

  const tabs = await chrome.tabs.query({});
  state.openTabs = tabs
    .filter(isStudyTab)
    .map(tab => ({
      id: tab.id,
      windowId: tab.windowId,
      title: tab.title || "Untitled page",
      url: tab.url || "",
      domain: getDomain(tab.url || ""),
      faviconUrl: getFaviconUrl(tab.url || "")
    }))
    .sort((a, b) => a.domain.localeCompare(b.domain) || a.title.localeCompare(b.title));

  state.groupedTabs = groupTabsBySite(state.openTabs);
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
  const tags = [...new Set(state.savedItems.flatMap(item => item.tags))].sort((a, b) => a.localeCompare(b));

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

function renderOpenTabs() {
  elements.openTabsList.innerHTML = "";
  updateStatsLine();

  state.groupedTabs.forEach(group => {
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

      childFragment.querySelector(".child-tab-title").textContent = tab.title;
      linkButton.dataset.tabId = String(tab.id);
      favicon.src = tab.faviconUrl || "";
      favicon.hidden = !tab.faviconUrl;
      saveButton.dataset.tabId = String(tab.id);
      closeButton.dataset.tabId = String(tab.id);

      if (state.savedItems.some(item => item.url === normalizeUrl(tab.url))) {
        saveButton.textContent = t("saved");
      }

      childrenContainer.appendChild(childFragment);
    });

    if (group.tabs.length > DEFAULT_VISIBLE_CHILDREN) {
      moreButton.hidden = false;
      moreButton.textContent = expanded
        ? t("showLess")
        : t("more", group.tabs.length - DEFAULT_VISIBLE_CHILDREN);
    }

    elements.openTabsList.appendChild(fragment);
  });
}

function renderSavedItems() {
  const filteredItems = getFilteredSavedItems();
  elements.savedList.innerHTML = "";
  elements.savedEmptyState.hidden = filteredItems.length > 0;

  filteredItems
    .slice()
    .sort((a, b) => b.savedAt - a.savedAt)
    .forEach(item => {
      const fragment = elements.savedItemTemplate.content.cloneNode(true);
      translateRoot(fragment);
      const card = fragment.querySelector(".saved-card");
      const form = fragment.querySelector(".saved-form");
      const statusSelect = fragment.querySelector(".saved-status");
      const tagsInput = fragment.querySelector(".saved-tags");
      const takeawayInput = fragment.querySelector(".saved-takeaway");
      const sourceButton = fragment.querySelector(".saved-open-link");
      const titleButton = fragment.querySelector(".saved-title-button");
      const deleteButton = fragment.querySelector(".delete-link");

      card.dataset.itemId = item.id;
      sourceButton.textContent = item.domain;
      fragment.querySelector(".saved-status-badge").textContent = getStatusLabel(item.status);
      fragment.querySelector(".saved-title").textContent = item.title;
      const dateParts = formatDateParts(item.savedAt);
      fragment.querySelector(".saved-meta").innerHTML =
        `<span class="saved-date">${t("savedOn", dateParts.date)}</span><span class="saved-time">${dateParts.time}</span>`;
      fragment.querySelector(".saved-takeaway-preview").textContent = item.takeaway || "";

      statusSelect.value = item.status;
      tagsInput.value = item.tags.join(", ");
      takeawayInput.value = item.takeaway || "";

      sourceButton.dataset.itemId = item.id;
      titleButton.dataset.itemId = item.id;
      deleteButton.dataset.itemId = item.id;
      statusSelect.dataset.itemId = item.id;
      tagsInput.dataset.itemId = item.id;
      takeawayInput.dataset.itemId = item.id;

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
  state.savedItems.unshift({
    id: crypto.randomUUID(),
    title: tab.title,
    url: normalizedUrl,
    domain: tab.domain,
    savedAt: Date.now(),
    tags: snapshot ? collectSuggestedTags(snapshot, tab.domain) : [tab.domain],
    takeaway: learningFields.takeaway,
    status: "to_learn"
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

async function saveGroup(groupKey) {
  const group = state.groupedTabs.find(entry => entry.key === groupKey);
  if (!group) return;
  let savedCount = 0;
  for (const tab of group.tabs) {
    const saved = await saveTab(tab.id, { playSound: false, render: false });
    if (saved) savedCount += 1;
  }
  if (savedCount > 0) {
    await playSaveSound();
    updateTagFilterOptions();
    renderOpenTabs();
    renderSavedItems();
  }
}

async function saveAllVisibleTabs() {
  let savedCount = 0;
  for (const group of state.groupedTabs) {
    for (const tab of group.tabs) {
      const saved = await saveTab(tab.id, { playSound: false, render: false });
      if (saved) savedCount += 1;
    }
  }
  if (savedCount > 0) {
    await playSaveSound();
    updateTagFilterOptions();
    renderOpenTabs();
    renderSavedItems();
  }
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
  const group = state.groupedTabs.find(entry => entry.key === groupKey);
  if (!group) return;
  if (!hasChromeApi("tabs")) {
    const tabIds = new Set(group.tabs.map(tab => tab.id));
    state.openTabs = state.openTabs.filter(tab => !tabIds.has(tab.id));
    state.groupedTabs = groupTabsBySite(state.openTabs);
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
    state.groupedTabs = groupTabsBySite(state.openTabs);
    await playCloseSound();
    renderOpenTabs();
    return;
  }
  await chrome.tabs.remove(tabId);
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
  elements.languageToggle.addEventListener("click", event => {
    const button = event.target.closest(".language-option");
    if (!button) return;
    applyLanguage(button.dataset.lang);
    updateTagFilterOptions();
    renderOpenTabs();
    renderSavedItems();
  });

  elements.refreshTabsButton.addEventListener("click", async () => {
    await loadOpenTabs();
    renderOpenTabs();
  });

  elements.saveAllTabsButton.addEventListener("click", async () => {
    await saveAllVisibleTabs();
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

  elements.openTabsList.addEventListener("click", async event => {
    const saveButton = event.target.closest(".child-save-button");
    const openButton = event.target.closest(".child-tab-link");
    const closeButton = event.target.closest(".child-close-button");
    const saveGroupButton = event.target.closest(".save-group-button");
    const closeGroupButton = event.target.closest(".close-group-button");
    const moreButton = event.target.closest(".site-more");

    if (saveButton) await saveTab(Number(saveButton.dataset.tabId));
    if (openButton) await focusTab(Number(openButton.dataset.tabId));
    if (closeButton) await closeTab(Number(closeButton.dataset.tabId));
    if (saveGroupButton) await saveGroup(saveGroupButton.dataset.groupKey);
    if (closeGroupButton) await closeGroup(closeGroupButton.dataset.groupKey);
    if (moreButton) toggleGroupExpanded(moreButton.dataset.groupKey);
  });

  elements.savedList.addEventListener("click", async event => {
    const openButton = event.target.closest(".saved-title-button, .saved-open-link");
    const deleteButton = event.target.closest(".delete-link");

    if (openButton) await openSavedItem(openButton.dataset.itemId);
    if (deleteButton) await removeSavedItem(deleteButton.dataset.itemId);
  });

  elements.savedList.addEventListener("change", async event => {
    const target = event.target;
    const itemId = target.dataset.itemId;
    if (!itemId) return;

    if (target.matches(".saved-status")) {
      await updateSavedItem(itemId, { status: target.value });
    }

    if (target.matches(".saved-tags")) {
      const tags = target.value.split(",").map(tag => tag.trim()).filter(Boolean);
      await updateSavedItem(itemId, { tags });
    }
  });

  elements.savedList.addEventListener("blur", async event => {
    const target = event.target;
    const itemId = target.dataset.itemId;
    if (!itemId) return;

    if (target.matches(".saved-takeaway")) {
      await updateSavedItem(itemId, { takeaway: target.value.trim() });
    }
  }, true);
}

async function initialize() {
  initializeLanguage();
  await loadSavedItems();
  await loadOpenTabs();
  updateTagFilterOptions();
  renderOpenTabs();
  renderSavedItems();
  initializeResizableLayout();
  bindEvents();
}

initialize();
