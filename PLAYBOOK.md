# PLAYBOOK.md — Awesome-React Status Matrix

| Category | Library | Status | Notes |
|---|---|---|---|
| **Data Grids** | `@tanstack/react-table` | Adopted | Feature-complete with global filter, sorting, pagination |
| **File Ingestion** | `@rpldy/uploady` + `@rpldy/upload-drop-zone` | Adopted | Live progress bars, metadata support, batch handling |
| **React Forms** | `react-hook-form` + `zod` + `@hookform/resolvers/zod` | Trialing | Dynamic schema-driven forms being evaluated |
| **State Machines** | `xstate` v5 + `@xstate/react` | Trialing | 4-stage pipeline (Draft -> AutomatedCheck -> HumanReview -> Approved/Rejected) |
| **Diagrams** | `react-archer` | Backlog | SVG node-graph pipeline diagram wrapper planned |
| **Error Handling** | `react-error-boundary` | Adopted | SafeWidgetBoundary with retry logic and fallback UIs |
| **Maps** | `react-leaflet` | Backlog | GeoPinMap wrapper for spatial data visualization planned |

## Evaluation Rubric

### Adopted
Libraries that are production-ready, well-documented, and have stable APIs. Wrappers are drop-in ready for any project.

### Trialing
Libraries under active evaluation. Wrappers exist as prototypes and may require API adjustments for production use.

### Backlog
Libraries identified for future exploration. No wrappers built yet; placeholder entries for roadmap planning.