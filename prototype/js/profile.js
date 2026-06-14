/* Employee Profile page logic — tab switching, profile card render, search dropdown. */

let activeTab = PROFILE_TABS[0];
let selectedEmployeeId = EMPLOYEE.staffId;

// ============================================================
// Profile card (left)
// ============================================================
function renderProfileCard() {
  const wrap = $("#profileCard");
  if (!wrap) return;

  const initials = EMPLOYEE.name
    .replace(/[^A-Za-z\s]/g, "")
    .split(" ")
    .filter(Boolean)
    .map((p) => p[0])
    .slice(0, 2)
    .join("");

  const detailsHtml = EMPLOYEE.details
    .map(([k, v, kind]) => {
      const icon = kind === "mail" ? '<i data-lucide="mail"></i>' : kind === "phone" ? '<i data-lucide="phone"></i>' : "";
      return `
        <div class="profile-card__row">
          <span class="profile-card__key">${k}</span>
          <span class="profile-card__value">${icon}${v}</span>
        </div>`;
    })
    .join("");

  const avatarInner = EMPLOYEE.photo
    ? `<img class="profile-card__photo" src="${EMPLOYEE.photo}" alt="${EMPLOYEE.name}"
         onerror="this.parentElement.classList.add('is-fallback'); this.remove();" />`
    : "";

  wrap.innerHTML = `
    <div class="profile-card__cover">
      <div class="profile-card__avatar-wrap">
        <div class="profile-card__avatar ${EMPLOYEE.photo ? "" : "is-fallback"}" data-initials="${initials}">${avatarInner}</div>
      </div>
    </div>
    <div class="profile-card__identity">
      <h2 class="profile-card__name">${EMPLOYEE.name}</h2>
      <p class="profile-card__role">${EMPLOYEE.designation}</p>
      <span class="profile-card__badge">${EMPLOYEE.badge}</span>
    </div>
    <div class="profile-card__details">${detailsHtml}</div>
  `;
  refreshIcons();
}

// ============================================================
// Tabs
// ============================================================
function renderTabs() {
  const strip = $("#tabsStrip");
  if (!strip) return;
  strip.innerHTML = "";
  for (const tab of PROFILE_TABS) {
    strip.appendChild(
      el(
        "button",
        {
          class: `tab ${tab === activeTab ? "is-active" : ""}`,
          onClick: () => {
            activeTab = tab;
            renderTabs();
            renderTabContent();
          },
        },
        tab
      )
    );
  }
}

// ============================================================
// Tab content
// ============================================================
function renderTabContent() {
  const host = $("#tabContent");
  if (!host) return;
  host.innerHTML = "";

  if (activeTab === "Employment Information") {
    host.appendChild(renderEmploymentInfo());
  } else {
    host.appendChild(renderEmptyTab(activeTab));
  }
  refreshIcons();
}

function renderEmploymentInfo() {
  const makeField = ([label, value]) => {
    if (value === "Active") {
      return el("div", { class: "info-field" }, [
        el("span", { class: "info-field__label" }, label),
        el("span", { class: "info-field__pill" }, "Active"),
      ]);
    }
    const hasValue = value && value !== "—";
    return el("div", { class: "info-field" }, [
      el("span", { class: "info-field__label" }, label),
      el(
        "span",
        { class: `info-field__value ${hasValue ? "has-value" : ""}` },
        value || "—"
      ),
    ]);
  };

  return el("section", { class: "section-card" }, [
    el("div", { class: "section-card__head" }, [
      el("span", { class: "section-card__icon" }, [
        el("i", { "data-lucide": "briefcase" }),
      ]),
      el("div", {}, [
        el(
          "h3",
          { class: "section-card__title" },
          "Employment Related Information"
        ),
        el(
          "p",
          { class: "section-card__subtitle" },
          "Read-only details synced from the HR master record."
        ),
      ]),
    ]),
    el("div", { class: "info-grid" }, [
      el("div", { class: "info-col" }, EMPLOYEE.employment.left.map(makeField)),
      el("div", { class: "info-col" }, EMPLOYEE.employment.right.map(makeField)),
    ]),
  ]);
}

function renderEmptyTab(tab) {
  return el("section", { class: "section-card" }, [
    el("div", { class: "empty-tab" }, [
      el("div", {}, [
        el("div", { class: "empty-tab__icon" }, [
          el("i", { "data-lucide": "briefcase" }),
        ]),
        el("h4", { class: "empty-tab__title" }, tab),
        el(
          "p",
          { class: "empty-tab__desc" },
          `This section will load once the ${tab.toLowerCase()} API is wired up.`
        ),
      ]),
    ]),
  ]);
}

// ============================================================
// Search dropdown (top-right of profile page)
// ============================================================
function initSearchDropdown() {
  const trigger = $("#searchDdTrigger");
  const triggerLabel = $("#searchDdLabel");
  const panel = $("#searchDdPanel");
  const list = $("#searchDdList");
  const input = $("#searchDdInput");

  const setLabel = () => {
    const sel = EMPLOYEE_SEARCH_OPTIONS.find((o) => o.id === selectedEmployeeId);
    triggerLabel.textContent = sel ? sel.label : "Search employee...";
  };
  setLabel();

  const drawList = (query = "") => {
    list.innerHTML = "";
    const filtered = EMPLOYEE_SEARCH_OPTIONS.filter((o) =>
      o.label.toLowerCase().includes(query.toLowerCase())
    );
    if (filtered.length === 0) {
      list.appendChild(
        el("div", { class: "search-dd__empty" }, "No matches")
      );
      return;
    }
    for (const o of filtered) {
      list.appendChild(
        el(
          "button",
          {
            class: `search-dd__item ${
              o.id === selectedEmployeeId ? "is-selected" : ""
            }`,
            onClick: () => {
              selectedEmployeeId = o.id;
              setLabel();
              panel.classList.add("is-hidden");
              input.value = "";
              drawList();
            },
          },
          [el("span", {}, o.label)]
        )
      );
    }
  };

  trigger.addEventListener("click", () => {
    panel.classList.toggle("is-hidden");
    if (!panel.classList.contains("is-hidden")) {
      drawList(input.value);
      input.focus();
    }
  });
  input.addEventListener("input", (e) => drawList(e.target.value));

  document.addEventListener("mousedown", (e) => {
    if (!panel.contains(e.target) && !trigger.contains(e.target)) {
      panel.classList.add("is-hidden");
    }
  });

  drawList();
}

// ============================================================
// Boot
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
  renderProfileCard();
  renderTabs();
  renderTabContent();
  initSearchDropdown();
});
