# Campus Life Planner – Wireframe

## Overview
High-level wireframes capturing pages, navigation, core UI blocks, and key flows.

## Sitemap
```mermaid
flowchart TD
  A[Dashboard (index.html)] --> B[Records (records.html)]
  A --> C[View Records (view-records.html)]
  A --> D[Settings (settings.html)]
  A --> E[About (about.html)]
  B --> C
  D --> E
```

## Primary User Flows
- **Add Task -> See It Listed**
  1. Open `records.html`.
  2. Fill form: `Task Name`, `Category`, `Due date`, `Duration`, `Status`.
  3. Submit -> saves via `scripts/storage.js` (`clp:data:v1`) -> redirect to `view-records.html`.
  4. `view-records.html` loads and displays saved record(s).

- **Delete/Edit Task**
  1. On `view-records.html`, click Delete -> remove and persist.
  2. Click Edit -> navigates to `records.html` with record prefilled (via query params).

## Page Wireframes (Blocks)

### Dashboard (`index.html`)
- Header: Title + Nav (Dashboard, Records, View Records, Settings, About)
- Main: Stats/Overview (from `scripts/dashboard.js`), quick links
- Footer: year

```mermaid
flowchart LR
  H[Header]
  N[Primary Nav]
  S[Stats/Overview]
  F[Footer]
  H --> N --> S --> F
```

### Records (`records.html`)
- Form (Add/Edit):
  - Inputs: `Task Name`, `Category`, `Due date`, `Duration`, `Status`
  - Actions: `Save`, `Reset`
  - Status message area
- Link: Go to View Records

```mermaid
flowchart TD
  F1[Form: Add/Edit]
  F1 --> I1[Task Name]
  F1 --> I2[Category]
  F1 --> I3[Due date]
  F1 --> I4[Duration]
  F1 --> I5[Status]
  F1 --> A1[Save / Reset]
  F1 --> ST[Save Status]
  F1 --> L1[Link: View Records]
```

### View Records (`view-records.html`)
- Controls:
  - Search (regex, case-insensitive toggle)
  - Filter by Category
  - Sort (by Due date/Title/Duration) + direction toggle
- Records list:
  - Table view (`#records-tbody`)
  - Cards view (`#records-cards`)
  - Each item: Title, Category, Due, Duration, Status, Actions (Edit/Delete)

```mermaid
flowchart TD
  C1[Search & Sort Controls]
  C1 --> S1[Regex input]
  C1 --> S2[Case-insensitive]
  C1 --> S3[Filter Category]
  C1 --> S4[Sort By]
  C1 --> S5[Sort Dir]
  L1[Records List]
  L1 --> T1[Table Body]
  L1 --> K1[Cards]
  T1 --> R[Row: Title/Category/Due/Duration/Status/Actions]
  K1 --> RC[Card: same fields + actions]
```

### Settings (`settings.html`)
- Units Converter: Minutes -> Hours (live update)
- Targets: Weekly duration cap (save to settings)
- About: Brief text + contact links

```mermaid
flowchart TD
  U[Units Converter]
  U --> M[Minutes input]
  U --> O[Hours output]
  T[Targets]
  T --> C[Cap input]
  T --> SA[Save Settings]
  AB[About + Contacts]
```

### About (`about.html`)
- Purpose blurb
- Contact links: Gmail and GitHub

```mermaid
flowchart TD
  P[Purpose]
  CO[Contacts]
```

## Key Data
- Records stored in localStorage under `clp:data:v1` via `scripts/storage.js`.
- Settings stored in localStorage under `clp:settings:v1`.

## Components / IDs of Interest
- Records form IDs: `#record-form-inline`, `#i-title`, `#i-tag`, `#i-dueDate`, `#i-duration`, `#i-status`, `#save-status`.
- View Records controls: `#search-input`, `#search-ci`, `#filter-cat`, `#sort-by`, `#sort-dir`, `#records-tbody`, `#records-cards`.
- Settings: `#conv-min`, `#conv-hr`, `#cap`, `#settings-form`.

## Notes
- Regex search: compiled in `scripts/search.js`; highlighting applied when regex valid.
- Edit navigates with query params to `records.html` to prefill.
- Deletion persists immediately using `save()` from `scripts/storage.js`.
