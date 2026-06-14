/* Employee Report page logic — selection, filters, search, preview, download toast. */

const state = {
  // selection keys: `${sectionId}::${field}`
  selection: new Set(),
  search: "",
  activeCategory: null,
  business: "All",
  department: "All",
  status: "active",
};

const totalFields = REPORT_SECTIONS.reduce((acc, s) => acc + s.fields.length, 0);
const key = (sectionId, field) => `${sectionId}::${field}`;

// ============================================================
// Render: category pills
// ============================================================
function renderPills() {
  const row = $("#pillRow");
  if (!row) return;
  row.innerHTML = "";

  const allActive = state.selection.size === totalFields && totalFields > 0;
  row.appendChild(
    el(
      "button",
      {
        class: `pill pill--select-all ${allActive ? "is-active" : ""}`,
        onClick: () => toggleSelectAll(),
      },
      "Select All"
    )
  );

  for (const section of REPORT_SECTIONS) {
    const isActive = state.activeCategory === section.id;
    row.appendChild(
      el(
        "button",
        {
          class: `pill ${isActive ? "is-active" : ""}`,
          onClick: () => {
            state.activeCategory = isActive ? null : section.id;
            renderPills();
            renderGrid();
          },
        },
        section.title
      )
    );
  }
}

// ============================================================
// Render: report cards grid
// ============================================================
function renderGrid() {
  const grid = $("#reportGrid");
  if (!grid) return;
  grid.innerHTML = "";

  const visible = state.activeCategory
    ? REPORT_SECTIONS.filter((s) => s.id === state.activeCategory)
    : REPORT_SECTIONS;

  let renderedAny = false;
  for (const section of visible) {
    const card = renderCard(section);
    if (card) {
      grid.appendChild(card);
      renderedAny = true;
    }
  }

  if (!renderedAny) {
    grid.appendChild(
      el(
        "div",
        { class: "preview-empty", style: "grid-column: 1 / -1;" },
        `No fields match "${state.search}".`
      )
    );
  }

  refreshIcons();
}

function renderCard(section) {
  const q = state.search.trim().toLowerCase();
  const visibleFields = q
    ? section.fields.filter((f) => f.toLowerCase().includes(q))
    : section.fields;
  if (q && visibleFields.length === 0) return null;

  const selectedCount = section.fields.filter((f) =>
    state.selection.has(key(section.id, f))
  ).length;
  const total = section.fields.length;
  const allSelected = selectedCount === total && total > 0;
  const some = selectedCount > 0 && !allSelected;

  return el("article", { class: "report-card" }, [
    el("header", { class: "report-card__head" }, [
      el("div", {}, [
        el("h3", { class: "report-card__title" }, section.title),
        el(
          "div",
          {
            class: "report-card__count",
            html: `<strong>${selectedCount}</strong> / ${total} selected`,
          }
        ),
      ]),
      renderCheck({
        checked: allSelected,
        indeterminate: some,
        onChange: () => toggleAllInSection(section, !allSelected),
      }),
    ]),
    el(
      "ul",
      { class: "report-card__list custom-scroll" },
      visibleFields.map((f) =>
        el("li", {}, [
          renderCheck({
            checked: state.selection.has(key(section.id, f)),
            label: f,
            onChange: () => toggleField(section, f),
          }),
        ])
      )
    ),
  ]);
}

// Custom checkbox builder (returns a <label class="check">).
function renderCheck({ checked, indeterminate, label, onChange }) {
  const labelEl = el(
    "label",
    {
      class: `check ${indeterminate ? "is-indeterminate" : ""}`,
    },
    [
      (() => {
        const input = el("input", {
          type: "checkbox",
          onChange: (e) => onChange && onChange(e.target.checked),
        });
        if (checked) input.checked = true;
        return input;
      })(),
      el("span", { class: "check__box" }),
      label ? el("span", { class: "check__label" }, label) : null,
    ]
  );
  return labelEl;
}

// ============================================================
// Selection mutations
// ============================================================
function toggleField(section, field) {
  const k = key(section.id, field);
  state.selection.has(k) ? state.selection.delete(k) : state.selection.add(k);
  renderPills();
  renderGrid();
}

function toggleAllInSection(section, shouldSelect) {
  for (const f of section.fields) {
    const k = key(section.id, f);
    shouldSelect ? state.selection.add(k) : state.selection.delete(k);
  }
  renderPills();
  renderGrid();
}

function toggleSelectAll() {
  if (state.selection.size === totalFields) {
    state.selection.clear();
  } else {
    state.selection = new Set();
    for (const s of REPORT_SECTIONS) {
      for (const f of s.fields) state.selection.add(key(s.id, f));
    }
  }
  renderPills();
  renderGrid();
}

function reset() {
  state.selection.clear();
  state.search = "";
  state.activeCategory = null;
  state.business = "All";
  state.department = "All";
  state.status = "active";
  $("#searchInput").value = "";
  $("#businessSelect").value = "All";
  $("#departmentSelect").value = "All";
  $("#statusActive").checked = true;
  renderPills();
  renderGrid();
}

// ============================================================
// Filters init
// ============================================================
function initFilters() {
  const businessSelect = $("#businessSelect");
  const departmentSelect = $("#departmentSelect");
  for (const opt of BUSINESS_OPTIONS) {
    businessSelect.appendChild(el("option", { value: opt }, opt));
  }
  for (const opt of DEPARTMENT_OPTIONS) {
    departmentSelect.appendChild(el("option", { value: opt }, opt));
  }
  businessSelect.addEventListener(
    "change",
    (e) => (state.business = e.target.value)
  );
  departmentSelect.addEventListener(
    "change",
    (e) => (state.department = e.target.value)
  );
  $$("input[name='status']").forEach((r) =>
    r.addEventListener("change", (e) => (state.status = e.target.value))
  );
}

// ============================================================
// Search, Reset, Preview, Download
// ============================================================
function initHeaderActions() {
  $("#searchInput").addEventListener("input", (e) => {
    state.search = e.target.value;
    renderGrid();
  });
  $("#resetBtn").addEventListener("click", reset);
  $("#previewBtn").addEventListener("click", openPreview);
  $("#downloadBtn").addEventListener("click", () => {
    if (state.selection.size === 0) {
      showToast({
        variant: "info",
        title: "Pick at least one field",
        description:
          "Select fields from the cards below to generate a report.",
      });
      return;
    }
    showToast({
      variant: "success",
      title: "Excel report download started",
      description: `${state.selection.size} field${
        state.selection.size === 1 ? "" : "s"
      } included.`,
    });
  });
}

// ============================================================
// Preview modal
// ============================================================
function openPreview() {
  const modal = $("#previewModal");
  const body = $("#previewBody");
  const subtitle = $("#previewSubtitle");

  const grouped = REPORT_SECTIONS.map((s) => ({
    title: s.title,
    fields: s.fields.filter((f) => state.selection.has(key(s.id, f))),
  })).filter((s) => s.fields.length > 0);

  const total = grouped.reduce((a, s) => a + s.fields.length, 0);
  subtitle.textContent = total
    ? `${total} field${total === 1 ? "" : "s"} selected across ${
        grouped.length
      } section${grouped.length === 1 ? "" : "s"}.`
    : "Nothing selected yet.";

  body.innerHTML = "";
  if (grouped.length === 0) {
    body.appendChild(
      el(
        "div",
        { class: "preview-empty" },
        "No fields selected yet. Pick some from the report grid."
      )
    );
  } else {
    const grid = el("div", { class: "preview-grid" });
    for (const s of grouped) {
      grid.appendChild(
        el("div", { class: "preview-section" }, [
          el("div", { class: "preview-section__head" }, [
            el("h4", { class: "preview-section__title" }, s.title),
            el("span", { class: "preview-section__count" }, String(s.fields.length)),
          ]),
          el(
            "ul",
            { class: "preview-section__list" },
            s.fields.map((f) => el("li", {}, f))
          ),
        ])
      );
    }
    body.appendChild(grid);
  }

  modal.classList.remove("is-hidden");
}
function closePreview() {
  $("#previewModal").classList.add("is-hidden");
}
function initModal() {
  $("#previewClose").addEventListener("click", closePreview);
  $("#previewBackdrop").addEventListener("click", closePreview);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closePreview();
  });
}

// ============================================================
// Boot
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
  initFilters();
  initHeaderActions();
  initModal();
  renderPills();
  renderGrid();
});
