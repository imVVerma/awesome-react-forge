# AGENTS.md — AI Agent Architecture & Extraction Protocol

## Purpose of This Repository
This repository (`react-ecosystem-lab`) is an active component sandbox modeled on `enaqx/awesome-react`. Every component inside `src/wrappers/` is a self-contained, production-hardened wrapper around a best-in-class React ecosystem library.

## Visual & UI Design Mandate
All components and fixtures MUST adhere to the **Clean Light Flat Theme**:
- **Surfaces:** Crisp white cards (`bg-white`), light slate backgrounds (`bg-slate-50`), subtle 1px borders (`border-slate-200`), and minimal elevation (`shadow-xs`).
- **Accents:** Royal Blue (`#1d4ed8` / `blue-700`) for primary actions and active states; Teal (`#0d9488` / `teal-600`) for secondary badges, progress indicators, and focus rings.
- **Typography & Spacing:** High-contrast slate text (`text-slate-900` primary, `text-slate-500` muted), structured padding (`p-5`), and clean rounded corners (`rounded-xl`).

## Rules for Creating New Sandbox Experiments
1. **Zero Business Logic Coupling:** Wrappers in `src/wrappers/` must accept generic TypeScript interfaces/props. Never hardcode project-specific API URLs inside a wrapper.
2. **Co-located Fixtures:** Every `ComponentName.tsx` MUST have a companion `ComponentName.fixture.tsx` in the same folder demonstrating at least 2 states (e.g., Default & Edge-Case/Error) for React Cosmos.
3. **Resilience First:** All complex widgets must compose cleanly inside `SafeWidgetBoundary.tsx`.

## How to Export a Component to Another Project
When asked to port a component from this repo into a target project:
1. Copy the single `.tsx` file from `src/wrappers/<category>/`.
2. Check the top JSDoc `@dependencies` tag in that file and run `npm install` for only those specific packages in the target project.
3. Map any custom theme variables to the target project's Tailwind config.

---

## Component Registry Table

| Wrapper Path | Purpose | npm install Command |
|---|---|---|
| `src/wrappers/01-resilience/SafeWidgetBoundary.tsx` | Wraps `react-error-boundary` for clean error recovery cards | `npm install react-error-boundary lucide-react` |
| `src/wrappers/02-tables-and-grids/SmartDataGrid.tsx` | Wraps `@tanstack/react-table` with global filter, sorting, pagination | `npm install @tanstack/react-table lucide-react` |
| `src/wrappers/03-file-ingestion/ProofDropzone.tsx` | Wraps `@rpldy/uploady` + `@rpldy/upload-drop-zone` with live progress bars | `npm install @rpldy/uploady @rpldy/upload-drop-zone lucide-react` |
| `src/wrappers/04-forms-and-schemas/SchemaFormBuilder.tsx` | Dynamic form wrapper using `react-hook-form` + `zod` + `@hookform/resolvers/zod` | `npm install react-hook-form @hookform/resolvers zod lucide-react` |
| `src/wrappers/05-state-machines/RubricFlowMachine.tsx` | Deterministic multi-step workflow stepper using `xstate` v5 | `npm install xstate @xstate/react lucide-react` |
| `src/wrappers/06-spatial-and-diagrams/NodeArcherCanvas.tsx` | Interactive node-graph / pipeline diagram using `react-archer` | `npm install react-archer lucide-react` |

## Agent Extraction Workflow
1. Read `AGENTS.md` to understand the repository structure and visual design mandate.
2. Locate the target wrapper file in `src/wrappers/<category>/`.
3. Copy the `.tsx` file directly into your target project.
4. Run the corresponding `npm install` command from the registry table.
5. Apply the target project's Tailwind theme variables to map `blue-700` and `teal-600` accents.

## Component Integration Quick Start
```bash
# Example: Add the SmartDataGrid to your project
git clone <this-repo>
cd react-ecosystem-lab
npm install @tanstack/react-table lucide-react

# Copy the wrapper:
cp src/wrappers/02-tables-and-grids/SmartDataGrid.tsx ./my-project/src/

# Use it:
import { SmartDataGrid } from './SmartDataGrid';

<SmartDataGrid
  title="My Table"
  data={myData}
  columns={myColumns}
/>
```