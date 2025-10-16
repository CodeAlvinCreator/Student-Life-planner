# Campus Life Planner

A vanilla HTML/CSS/JS Student Campus Life Planner with tasks/events, durations, tags, sorting, regex search, and localStorage persistence.

## Chosen Theme
- Student Campus Life Planner

## Pages
- Dashboard: `index.html` (welcome, quick stats, weekly trend, upcoming tasks, FAB to add)
- Records: `records.html` (search/filter/sort, table/cards, add/edit modal)
- Settings + About: `settings.html` (profile, cap, converter, about/contact)

## Features
- Semantic landmarks: `header`, `nav`, `main`, `section`, `footer`
- Mobile-first responsive UI (360/768/1024 breakpoints)
- Visible focus styles, skip link, ARIA live regions
- Regex validation (4+ rules, incl. back-reference) and error UI
- Render as table (desktop) or cards (mobile)
- Sorting by due date, title, duration
- Live regex search with case-insensitive toggle and `<mark>` highlighting
- Stats: total records, total duration, top tag, last-7-days trend
- Weekly cap/target with polite/assertive live messages
- localStorage auto-save
- JSON import/export with schema validation

## Regex Catalog
- No edge spaces: `/^\S(?:.*\S)?$/`
- Duplicate word (advanced back-reference): `/\b(\w+)\s+\1\b/i`
- Numeric duration: `/^(0|[1-9]\d*)(\.\d{1,2})?$/`
- Date: `/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/`
- Tag: `/^[A-Za-z]+(?:[ -][A-Za-z]+)*$/`

## Keyboard Map
- Skip link: jump to `main`
- Tab/Shift+Tab to traverse inputs and actions
- Sort direction button toggles focusable control
- FAB `+` on Dashboard and Records for quick add

## A11y Notes
- High contrast theme, visible focus (`outline`), ARIA live updates for cap status and errors
- Table wrapped in focusable container for keyboard scroll

## Run Locally
- Open `index.html` in a browser (no build tools required).
- Optional: open `tests.html` to see regex validation checks.

## Deploy (GitHub Pages)
- Commit to a GitHub repo and enable Pages on the `main` branch (root).

## Import/Export
- Export: in devtools, run `clpExport()`.
- Import: create a file input and call `clpImport(file)` or add a small UI.

## Seed Data
- `seed.json` includes ≥10 diverse records.

## Code Structure
- CSS: `styles/main.css`
- Core modules: `scripts/storage.js`, `scripts/state.js`, `scripts/validators.js`, `scripts/search.js`
- Page scripts: `scripts/dashboard.js`, `scripts/records.js`, `scripts/settings.js`

