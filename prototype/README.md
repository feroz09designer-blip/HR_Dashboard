# ACI Application Form Admin Panel — HTML/CSS Prototype

A static prototype of the HR admin dashboard. Plain **HTML + CSS + vanilla JS** — no build step, no framework. Just open the HTML files in a browser.

## Running

Double-click `index.html`, or serve the folder with any static server:

```powershell
# from the prototype folder
python -m http.server 8000
# then open http://localhost:8000
```

> Note: opening via `file://` works, but loading via a local server is recommended (some browsers restrict cross-file fetches and icon hydration runs more reliably).

## Files

```
prototype/
  index.html                 # Page 1 — Employee Report (default landing)
  employee-profile.html      # Page 2 — Employee Profile
  css/
    styles.css               # All styles (tokens, layout, components, responsive)
  js/
    data.js                  # Mock data: 23 sections, employee record, dropdowns, current user
    app.js                   # Shared: sidebar collapse, toast, lucide icon refresh
    report.js                # Report page logic: selection, search, filters, preview, download toast
    profile.js               # Profile page logic: tabs, profile card render, search dropdown
```

## Dependencies (CDN only)

- **Inter** font — Google Fonts
- **lucide-react icons** (as `lucide` web build) — `unpkg.com/lucide@latest`

No npm, no bundler, no preprocessor.

## What works

**Page 1 — Employee Report**
- 23 category pills (plus *Select All*) filter the field grid; tap the active pill again to clear.
- *Search Fields...* filters individual checkboxes; cards with zero matches are hidden.
- Each card has a title, `selected / total` counter, indeterminate parent checkbox, and an internally scrollable checkbox list.
- *Reset* clears selection, search, category, business, department, status.
- *Preview* opens a modal that groups selected fields by section with per-section counts.
- *Download Excel* fires a green success toast; if nothing is selected, an info toast nudges the user.

**Page 2 — Employee Profile**
- Breadcrumb, page title, and employee search dropdown (5 mock employees, type-to-filter, selected indicator).
- Left profile card with avatar, name, designation, EMPLOYEE badge, and 8 detail rows.
- 8 tabs in a rounded card; active tab uses the blue→purple gradient.
- *Employment Information* renders the full 2-column field grid (each 58px tall; `Active` shows as a green pill); other tabs show a polished empty state.

**Both pages**
- Fixed navy sidebar with ACI logo + 2 menu items. Active item is the bright blue pill with shadow glow.
- Bottom-of-sidebar collapse button — toggles sidebar to 72px (labels hide, links center).
- Sticky topbar with user chip (initials avatar + green online dot), refresh icon, and gradient *Logout* button.
- Centered `Copyright ©2026` footer.

## Responsive behaviour

| Width | Behaviour |
| --- | --- |
| ≥ 1280px | Sidebar visible, 3-column report grid, 2-column profile layout |
| 1024–1279px | 2-column report grid, profile layout stays 2 columns |
| 640–1023px | 2-column report grid, profile stacks (card above details) |
| < 640px | Single-column report grid, tabs horizontally scroll, top-right actions wrap; sidebar can be collapsed to 72px via the bottom arrow |

## Adding a real API later

Every page reads its data from globals defined in `js/data.js`. To wire a backend:

1. Replace each constant in `data.js` with the result of a `fetch` call (or load it asynchronously and call the page's `render*` functions once data arrives).
2. The render functions (`renderGrid`, `renderProfileCard`, `renderEmploymentInfo`, etc.) accept the same shape they do today, so no other change is needed.

The *Download Excel* button is currently a toast. Replace its click handler in `report.js` with a `fetch` that returns a Blob and trigger a download:

```js
const resp = await fetch("/api/reports/employee", {
  method: "POST",
  body: JSON.stringify([...state.selection]),
});
const blob = await resp.blob();
const url = URL.createObjectURL(blob);
const a = document.createElement("a");
a.href = url; a.download = "employee-report.xlsx"; a.click();
URL.revokeObjectURL(url);
```
