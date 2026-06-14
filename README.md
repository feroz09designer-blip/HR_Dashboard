# ACI Application Form Admin Panel

A modern, cloud-ready HR admin dashboard built with **Next.js (App Router) + React + Tailwind CSS**. The UI is fully mocked — no backend yet — but the project is structured so REST/GraphQL integration can drop in without UI rework.

## Stack

- **Next.js 14** (App Router)
- **React 18**
- **Tailwind CSS 3**
- **lucide-react** icons
- No state-management library — local component state is sufficient for the mock data layer.

## Routes

| Route | Page |
| --- | --- |
| `/` | Redirects to Employee Report |
| `/hr-form/admin/reports/employee` | Employee Report |
| `/hr-form/admin/reports/employee-profile` | Employee Profile |

## Folder Structure

```
src/
  app/
    layout.jsx                          # Root layout + Toast provider + Inter font
    globals.css                         # Tailwind layers + custom scrollbar
    page.jsx                            # Redirect to /hr-form/admin/reports/employee
    hr-form/admin/reports/
      employee/page.jsx                 # Page 1: Employee Report
      employee-profile/page.jsx         # Page 2: Employee Profile
  components/
    Layout.jsx                          # Sidebar + Topbar + Footer wrapper
    Sidebar.jsx                         # Fixed navy sidebar with menu + collapse
    Topbar.jsx                          # User chip, refresh, logout
    Footer.jsx                          # Copyright ©2026
    ui/
      Button.jsx                        # primary/success/outline/ghost/purple variants
      Checkbox.jsx                      # Custom square checkbox (supports indeterminate)
      Modal.jsx                         # ESC-closable modal with backdrop
      Toast.jsx                         # Context-based toast system (success/info/error)
      SearchDropdown.jsx                # Combobox-style search dropdown
    report/
      CategoryPills.jsx                 # Rounded category pill row
      ReportFieldCard.jsx               # Section card with scrollable checkbox list
      ReportFilters.jsx                 # Business + Department + Active status
      PreviewModal.jsx                  # Grouped preview of selected fields
    profile/
      Breadcrumb.jsx                    # Home > Employees > Employee details
      ProfileCard.jsx                   # Avatar + identity + details list
      Tabs.jsx                          # 8 horizontal tabs with active gradient pill
      InfoField.jsx                     # 58px label/value card; Active gets green pill
  data/
    reportFields.js                     # 23 sections × fields (single source of truth)
    employee.js                         # Mock employee + search options
    user.js                             # Current logged-in admin user
```

## Running locally

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>.

## Page 1 — Employee Report

- **Header** with title, subtitle, search field, Reset, Preview, and a green *Download Excel* button.
- **23 category pills** (plus *Select All*) filter the field grid. Tapping the active pill again clears the filter.
- **Filters bar** — Business dropdown, Department dropdown, Active/Inactive radio.
- **Responsive field grid** — desktop 3 columns / tablet 2 / mobile 1. Each card has:
  - Title + `selected / total` count
  - Card-level "select all" checkbox (with indeterminate state when partial)
  - Internal vertical scroll list of individual field checkboxes
- **Search Fields...** filters the visible checkboxes by name; cards with zero matches are hidden.
- **Reset** clears selections, search, category, filters.
- **Preview** opens a modal grouping selected fields by section with per-section counts.
- **Download Excel** fires a success toast: *"Excel report download started"*. If no fields are selected, an info toast nudges the user to pick at least one.

Selection keys are stored as `${sectionId}::${fieldName}` so identical labels (e.g. `Address` under both Present and Permanent Address) stay independent.

## Page 2 — Employee Profile

- **Breadcrumb** (Home > Employees > Employee details) + page title.
- **Employee search dropdown** in the top right (`Md. Salehin (21005)` by default).
- **Profile card** on the left — gradient header, circular avatar (initials fallback), name, designation, EMPLOYEE badge, and a label/value details list.
- **8 tabs** in a rounded white card. Active tab uses a blue→purple gradient pill with shadow glow.
- **Employment Related Information** content card with two-column field grid. Each `InfoField` is a 58px-tall label/value chip; the `Active` value renders as a green pill.
- Other tabs render a polished empty state until their data sources are wired up.

## Responsive behaviour

| Breakpoint | Behaviour |
| --- | --- |
| Desktop (≥ 1280px) | Full sidebar, 3-column report grid |
| Tablet (≥ 640px) | Sidebar visible, 2-column report grid, profile becomes 2 columns at lg (≥ 1024px) |
| Mobile (< 640px) | Sidebar collapsible to 72px via the bottom arrow; report cards stack 1 column; profile card stacks above details; tabs become horizontally scrollable; top-right controls wrap |

## Wiring up a real API later

All data is read from `src/data/*.js`. To add a backend:

1. Replace the static exports with `async` fetchers (or React Query / SWR hooks).
2. In `app/.../page.jsx`, convert page components to Server Components where appropriate and `await` the fetcher, or call the hook from the existing `"use client"` component.
3. The component API stays the same — `ReportFieldCard`, `ProfileCard`, `InfoField`, etc. all accept plain props.

Selection / toast / modal logic lives in the page components and does not need to change.
