# DCMS Pro Progress

## Phase 1 — Scaffold, CI, Design System, App Shell & Database
Status: IN PROGRESS
Branch: feature/phase-1-scaffold

### Implemented
- Electron 44.5.1 x64 Windows scaffold.
- React 19.3 + strict TypeScript 7 + Vite 8.3.
- Secure preload boundary: context isolation, no Node integration, sandbox, restrictive CSP, blocked runtime network requests.
- Single-instance desktop window.
- SQLite/better-sqlite3 initialization with WAL/FULL durability, migration history, migration checksums and integrity check.
- Initial relational schema migration covering core future modules.
- Premium app shell, sidebar, header, navigation contract, responsive tokens and reduced-motion handling.
- Bundled Noto Sans/Noto Sans Bengali assets through OFL-compatible Fontsource packages.
- Unit tests for integer-poisha money and balanced dashboard rows.
- Windows CI workflow.
- Programmatic SVG dental icon source.

### Important scope boundary
Phase 1 does not claim patients, appointments, prescriptions, billing, inventory, accounting, staff, backup, activation, or other future modules are implemented. Their navigation routes are deliberately non-functional until their specified phases; the scaffold labels those routes instead of presenting fake feature controls.

### Remaining Phase 1 gate
- CI must pass on Windows.
- Typecheck, unit tests, license/security checks and renderer/main builds must pass.
- Packaged Windows smoke/build validation must be performed where the connected environment permits.
- Icon binary/multi-resolution packaging remains a release artifact task; SVG source is committed now and no unverified ICO is claimed.
- Audit Phase 1 traceability evidence and open the Phase 1 PR.

### Next phase gate
Owner manually reviews/merges Phase 1. Phase 2 starts only after the owner says **Continue**.
