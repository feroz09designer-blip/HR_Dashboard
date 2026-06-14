# ACI Application Form — Admin Panel (Prototype)

A single self-contained HTML prototype. **No folder structure, no build step** — all
markup, CSS, and JavaScript live inside one file: [`index.html`](index.html).

## Views

The sidebar switches between two views (in-page, no page reload):

- **Employee Report** — field selection, category pills, filters, search, preview modal, Excel download toast.
- **Employee Profile** — profile card, tabbed details, employee search dropdown.

## Run locally

Just open `index.html` in a browser (double-click it), or:

```bash
# from this folder
start index.html      # Windows
```

## Deploy to Vercel

Since it is a static single file, no configuration is needed:

1. Go to https://vercel.com/new and import this Git repository.
2. Framework Preset: **Other** (static). Leave build & output empty.
3. **Deploy** — Vercel serves `index.html` at the root URL.

> External dependencies are loaded from CDNs at runtime: Google Fonts (Inter),
> Lucide icons, and the logo/photo images. An internet connection is required for
> the full styled experience.
