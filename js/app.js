const apps = [
  {
    id: "verbes",
    title: "تقويم الأفعال الفرنسية",
    description: "نشاط تفاعلي سريع لتدريب التلاميذ على مطابقة الفعل الفرنسي بمعناه العربي والعكس.",
    category: "Français",
    path: "./apps/verbes/",
    statusLabel: "متاح الآن",
    statusType: "available",
    icon: "./assets/icons/app-verbes.svg",
    audience: "الهاتف والحاسوب",
    note: "مناسب للتدريب السريع داخل الحصة أو للدعم المنزلي.",
    keywords: ["verbes", "francais", "french", "langue", "book"]
  },
  {
    id: "numbers",
    title: "بناء الأعداد من 0 إلى 99",
    description: "تطبيق تفاعلي لبناء الأعداد باستعمال الوحدات والعشرات بطريقة بصرية مناسبة للمستوى الأول.",
    category: "Mathématiques",
    path: "/apps/numbers/",
    statusLabel: "متاح الآن",
    statusType: "available",
    icon: "./assets/icons/app-numbers.svg",
    audience: "الهاتف والحاسوب",
    note: "يعرض مفهوم العشرات والوحدات بأسلوب بصري بسيط وواضح.",
    keywords: ["numbers", "count", "math", "digits", "tens", "units", "0-99"]
  },
  {
    id: "lettres-francaises",
    title: "الحروف الفرنسية",
    description: "بطاقات وتمارين سريعة للتعرف على الحروف والأصوات الفرنسية بشكل تفاعلي.",
    category: "Français",
    path: "",
    statusLabel: "قريبًا",
    statusType: "coming-soon",
    icon: "./assets/icons/app-letters.svg",
    audience: "الهاتف والحاسوب",
    note: "مخصص لبدايات تعلم اللغة الفرنسية.",
    keywords: ["letters", "alphabet", "francais", "phonics"]
  },
  {
    id: "mathematiques",
    title: "الرياضيات",
    description: "تطبيقات قصيرة للعمليات والحساب الذهني والتمارين الصفية اليومية.",
    category: "Mathématiques",
    path: "",
    statusLabel: "قريبًا",
    statusType: "coming-soon",
    icon: "./assets/icons/app-math.svg",
    audience: "الهاتف والحاسوب",
    note: "أنشطة سريعة لدعم الحساب الذهني والتدريب اليومي.",
    keywords: ["mathematiques", "operations", "math", "calcul"]
  },
  {
    id: "imlae",
    title: "الإملاء",
    description: "أنشطة لغوية تركّز على الاستماع والتمييز والكتابة التدريجية بطريقة واضحة.",
    category: "Arabe",
    path: "",
    statusLabel: "قريبًا",
    statusType: "coming-soon",
    icon: "./assets/icons/app-spelling.svg",
    audience: "الهاتف والحاسوب",
    note: "أنشطة مبسطة لترسيخ السمع والكتابة والتمييز اللغوي.",
    keywords: ["spelling", "dictation", "arabe", "ecriture"]
  },
  {
    id: "lecture",
    title: "القراءة",
    description: "أنشطة للقراءة والفهم وتمييز الكلمات والجمل في واجهة تعليمية هادئة.",
    category: "Jeux éducatifs",
    path: "",
    statusLabel: "قريبًا",
    statusType: "coming-soon",
    icon: "./assets/icons/app-reading.svg",
    audience: "الهاتف والحاسوب",
    note: "مناسب لتدريب القراءة والفهم بشكل تدريجي وواضح.",
    keywords: ["reading", "lecture", "story", "comprehension"]
  }
];

const categories = [
  "الكل",
  "Français",
  "Mathématiques",
  "Arabe",
  "Évaluation",
  "Jeux éducatifs"
];

const state = {
  activeCategory: "الكل",
  searchTerm: ""
};

const appsGrid = document.getElementById("appsGrid");
const filtersContainer = document.getElementById("categoryFilters");
const searchInput = document.getElementById("searchInput");
const emptyState = document.getElementById("emptyState");
const resultsNote = document.getElementById("resultsNote");

function registerServiceWorker() {
  const supportsServiceWorker = "serviceWorker" in navigator;
  const isSupportedProtocol = window.location.protocol === "https:" || window.location.protocol === "http:";

  if (!supportsServiceWorker || !isSupportedProtocol) {
    return;
  }

  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {
      // Ignore registration failures to keep local development and static hosting simple.
    });
  });
}

function normalizeText(value) {
  return String(value).trim().toLowerCase();
}

function getSearchableText(app) {
  return normalizeText([
    app.title,
    app.description,
    app.category,
    app.statusLabel,
    app.audience,
    app.note,
    ...(app.keywords || [])
  ].join(" "));
}

function getFilteredApps() {
  const term = normalizeText(state.searchTerm);

  return apps.filter((app) => {
    const matchesCategory = state.activeCategory === "الكل" || app.category === state.activeCategory;
    const matchesSearch = term === "" || getSearchableText(app).includes(term);

    return matchesCategory && matchesSearch;
  });
}

function updateResultsNote(count) {
  if (!resultsNote) {
    return;
  }

  if (count === 0) {
    resultsNote.textContent = "لا توجد نتائج مطابقة حاليًا.";
    return;
  }

  const categoryLabel = state.activeCategory === "الكل" ? "كل التصنيفات" : state.activeCategory;
  const searchLabel = state.searchTerm.trim() ? ` مع البحث: ${state.searchTerm.trim()}` : "";
  resultsNote.textContent = `عرض ${count} تطبيق${count > 1 ? "ات" : ""} ضمن ${categoryLabel}${searchLabel}.`;
}

function createActionButton(app) {
  if (app.statusType === "available") {
    const launch = document.createElement("a");
    launch.className = "primary-button";
    launch.href = app.path;
    launch.textContent = "تشغيل التطبيق";
    return launch;
  }

  const comingSoon = document.createElement("button");
  comingSoon.type = "button";
  comingSoon.className = "secondary-button";
  comingSoon.disabled = true;
  comingSoon.textContent = "قريبًا";
  return comingSoon;
}

function createAppCard(app) {
  const card = document.createElement("article");
  card.className = `app-card ${app.statusType}`;

  const cover = document.createElement("div");
  cover.className = "card-cover";

  const icon = document.createElement("img");
  icon.src = app.icon;
  icon.alt = `أيقونة ${app.title}`;
  icon.loading = "lazy";
  icon.decoding = "async";
  cover.append(icon);

  const body = document.createElement("div");
  body.className = "card-body";

  const top = document.createElement("div");
  top.className = "card-top";

  const category = document.createElement("span");
  category.className = "card-category";
  category.textContent = app.category;

  const status = document.createElement("span");
  status.className = `card-status ${app.statusType}`;
  status.textContent = app.statusLabel;

  top.append(category, status);

  const title = document.createElement("h3");
  title.className = "card-title";
  title.textContent = app.title;

  const description = document.createElement("p");
  description.className = "card-description";
  description.textContent = app.description;

  const meta = document.createElement("div");
  meta.className = "card-meta";

  const audience = document.createElement("span");
  audience.className = "meta-chip";
  audience.textContent = app.audience;

  const appType = document.createElement("span");
  appType.className = "meta-chip";
  appType.textContent = app.statusType === "available" ? "جاهز الآن" : "قريبًا";

  meta.append(audience, appType);

  const actions = document.createElement("div");
  actions.className = "card-actions";
  actions.append(createActionButton(app));

  const note = document.createElement("span");
  note.className = "card-note";
  note.textContent = app.note;
  actions.append(note);

  body.append(top, title, description, meta, actions);
  card.append(cover, body);

  return card;
}

function renderApps() {
  if (!appsGrid || !emptyState) {
    return;
  }

  const filteredApps = getFilteredApps();
  appsGrid.replaceChildren(...filteredApps.map(createAppCard));
  emptyState.hidden = filteredApps.length > 0;
  updateResultsNote(filteredApps.length);
}

function renderFilters() {
  if (!filtersContainer) {
    return;
  }

  const fragment = document.createDocumentFragment();

  categories.forEach((categoryName) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "filter-chip";
    button.textContent = categoryName;

    if (categoryName === state.activeCategory) {
      button.classList.add("active");
    }

    button.addEventListener("click", () => {
      state.activeCategory = categoryName;
      renderFilters();
      renderApps();
    });

    fragment.append(button);
  });

  filtersContainer.replaceChildren(fragment);
}

function setupSearch() {
  if (!searchInput) {
    return;
  }

  searchInput.addEventListener("input", (event) => {
    state.searchTerm = event.target.value;
    renderApps();
  });
}

renderFilters();
setupSearch();
renderApps();
registerServiceWorker();
