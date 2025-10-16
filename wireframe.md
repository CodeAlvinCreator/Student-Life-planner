# Campus Life Planner — Simple Wireframe

## Dashboard (index.html)
```mermaid
flowchart TD
  H[Header]
  N[Nav]
  S[Stats Grid]
  P[Progress Bar]
  U[Upcoming List]
  F[Footer]

  H --> N --> S --> P --> U --> F
```

## Records (records.html)
```mermaid
flowchart TD
  H[Header]
  N[Nav]
  Fm[Add/Edit Form]
  A[Actions]
  ST[Status]
  L[Link: View Records]
  F[Footer]

  H --> N --> Fm --> A --> ST --> L --> F
```

## View Records (view-records.html)
```mermaid
flowchart TD
  H[Header]
  N[Nav]
  C[Controls]
  T[Table]
  K[Cards]
  F[Footer]

  H --> N --> C --> T
  C --> K
  T --> F
  K --> F
```

## Settings (settings.html)
```mermaid
flowchart TD
  H[Header]
  N[Nav]
  U[Units Converter]
  T[Targets (Cap)]
  AB[About Section]
  F[Footer]

  
