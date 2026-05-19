const apps = [
  {
    id: "verbes",
    title: "تقويم الأفعال الفرنسية",
    description: "نشاط تفاعلي سريع لتدريب التلاميذ على مطابقة الفعل الفرنسي بمعناه العربي والعكس.",
    category: "Français",
    path: "./apps/verbes/",
    status: "متاح الآن",
    icon: "FR",
    audience: "الهاتف والحاسوب",
    note: "واجهة مستقلة مناسبة للحصص السريعة."
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
  return value.trim().toLowerCase();
}

function getFilteredApps() {
  const term = normalizeText(state.searchTerm);

  return apps.filter((app) => {
    const matchesCategory = state.activeCategory === "الكل" || app.category === state.activeCategory;
    const haystack = normalizeText([app.title, app.description, app.category, app.status].join(" "));
    const matchesSearch = term === "" || haystack.includes(term);

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

function createAppCard(app) {
  const card = document.createElement("article");
  card.className = "app-card";

  const cover = document.createElement("div");
  cover.className = "card-cover";

  const icon = document.createElement("div");
  icon.className = "card-icon";
  icon.setAttribute("aria-hidden", "true");
  icon.textContent = app.icon;
  cover.append(icon);

  const body = document.createElement("div");
  body.className = "card-body";

  const top = document.createElement("div");
  top.className = "card-top";

  const category = document.createElement("span");
  category.className = "card-category";
  category.textContent = app.category;

  const status = document.createElement("span");
  status.className = "card-status";
  status.textContent = app.status;

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
  appType.textContent = "تطبيق تعليمي";

  meta.append(audience, appType);

  const actions = document.createElement("div");
  actions.className = "card-actions";

  const launch = document.createElement("a");
  launch.className = "primary-button";
  launch.href = app.path;
  launch.textContent = "تشغيل التطبيق";

  const note = document.createElement("span");
  note.className = "card-note";
  note.textContent = app.note;

  actions.append(launch, note);
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
