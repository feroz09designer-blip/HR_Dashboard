/* Shared logic: sidebar collapse + toast container + lucide refresh helper. */

// --- helpers ---
function $(sel, root = document) {
  return root.querySelector(sel);
}
function $$(sel, root = document) {
  return Array.from(root.querySelectorAll(sel));
}
function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "class") node.className = v;
    else if (k === "html") node.innerHTML = v;
    else if (k.startsWith("on") && typeof v === "function") {
      node.addEventListener(k.slice(2).toLowerCase(), v);
    } else if (v === true) node.setAttribute(k, "");
    else if (v != null && v !== false) node.setAttribute(k, v);
  }
  for (const c of [].concat(children)) {
    if (c == null || c === false) continue;
    node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
  }
  return node;
}

// Re-run Lucide icon hydration. Safe to call after each DOM update.
function refreshIcons() {
  if (window.lucide) window.lucide.createIcons();
}

// --- sidebar collapse ---
function initSidebar() {
  const btn = $("#sidebarCollapse");
  const app = $("#app");
  if (!btn || !app) return;
  btn.addEventListener("click", () => {
    app.classList.toggle("is-collapsed");
  });
}

// --- toast ---
function ensureToastContainer() {
  let host = $("#toasts");
  if (!host) {
    host = el("div", { id: "toasts", class: "toasts" });
    document.body.appendChild(host);
  }
  return host;
}

const TOAST_ICONS = {
  success: "check-circle-2",
  info: "info",
  error: "alert-circle",
};

function showToast({ title, description, variant = "success", duration = 3200 }) {
  const host = ensureToastContainer();
  const toast = el("div", { class: `toast toast--${variant}` }, [
    el("i", { "data-lucide": TOAST_ICONS[variant] || "info" }),
    el("div", { class: "toast__body" }, [
      el("div", { class: "toast__title" }, title),
      description ? el("div", { class: "toast__desc" }, description) : null,
    ]),
    el(
      "button",
      {
        class: "toast__close",
        "aria-label": "Dismiss",
        onClick: () => toast.remove(),
      },
      [el("i", { "data-lucide": "x" })]
    ),
  ]);
  host.appendChild(toast);
  refreshIcons();
  setTimeout(() => toast.remove(), duration);
}

// --- topbar user chip (mutates an existing slot) ---
function renderTopbarUser() {
  const slot = $("#topbarUserSlot");
  if (!slot) return;
  const initials = CURRENT_USER.name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
  slot.innerHTML = `
    <div class="topbar__avatar">
      <div class="topbar__avatar-circle">${initials}</div>
      <span class="topbar__dot" aria-hidden="true"></span>
    </div>
    <div>
      <div class="topbar__name">
        ${CURRENT_USER.name} (${CURRENT_USER.staffId})
        <span class="topbar__name-dot" aria-hidden="true"></span>
      </div>
      <div class="topbar__role">${CURRENT_USER.role}</div>
    </div>
  `;
}

// --- boot ---
document.addEventListener("DOMContentLoaded", () => {
  renderTopbarUser();
  initSidebar();
  refreshIcons();
});
