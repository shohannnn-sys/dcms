# DCMS Pro — Phase 0 Report

## Scope
Phase 0 defines the production architecture and acceptance contract without implementing application features.

## Decisions
- Windows desktop: Electron.
- UI: React + strict TypeScript + Vite.
- Local relational storage: SQLite through better-sqlite3.
- Renderer-to-main boundary: typed preload API with backend authorization.
- Printing/PDF: Chromium HTML/CSS print pipeline.
- Testing: Vitest + Playwright + Windows packaged-machine tests.
- Packaging: electron-builder/NSIS.
- Runtime: offline and network-blocked.

Current official research used for the baseline: Node 24.21.0 is listed as LTS; React 19.3 is the current React release as of September 2026; better-sqlite3 13.0.3 is MIT; electron-builder is MIT.

## Specification deliverables
- Requirements Traceability Matrix.
- Exact UI layout specification.
- Design system.
- Database schema and relationship model.
- Permission matrix.
- Prescription/invoice print wireframes.
- Folder structure.
- Acceptance checklist.
- Test plan.
- Release plan.
- Expert additions.
- Progress tracking.

## Audit status
The documentation set is internally cross-referenced and covers the requested modules, screens, security constraints, printing sizes, backup/restore, RBAC, performance, QA, installer, release and Git workflow. Final Phase 0 PASS requires the repository content to be reviewed as a complete branch and the PR to be opened; implementation remains blocked until the owner manually merges this phase and says Continue.

## Known Phase 0 limitations
- No application code exists by design.
- Windows physical DPI and printer-driver behavior cannot be certified from documentation alone; those are Phase 9/10 execution gates.
- Exact dependency patch versions are pinned at implementation kickoff after another release-time verification; the architecture intentionally avoids premature lock-in to a stale patch version.
