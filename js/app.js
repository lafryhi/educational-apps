const apps = [
  {
    title: "تقويم الأفعال الفرنسية",
    description: "نشاط تفاعلي سريع لتدريب التلاميذ على مطابقة الفعل الفرنسي بمعناه العربي والعكس.",
    path: "./apps/verbes/",
    tag: "فرنسية",
    status: "جاهز للتشغيل"
  }
];

const appsGrid = document.getElementById("appsGrid");

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

if (appsGrid) {
  apps.forEach((app) => {
    const card = document.createElement("article");
    card.className = "app-card";

    const top = document.createElement("div");
    top.className = "card-top";

    const tag = document.createElement("span");
    tag.className = "card-tag";
    tag.textContent = app.tag;

    const status = document.createElement("span");
    status.className = "card-status";
    status.textContent = app.status;

    top.append(tag, status);

    const title = document.createElement("h3");
    title.textContent = app.title;

    const description = document.createElement("p");
    description.className = "card-text";
    description.textContent = app.description;

    const actions = document.createElement("div");
    actions.className = "card-actions";

    const launch = document.createElement("a");
    launch.className = "primary-button";
    launch.href = app.path;
    launch.textContent = "تشغيل التطبيق";

    const note = document.createElement("span");
    note.className = "secondary-note";
    note.textContent = "واجهة مستقلة قابلة للتطوير لاحقًا";

    actions.append(launch, note);
    card.append(top, title, description, actions);
    appsGrid.append(card);
  });
}

registerServiceWorker();
