# Phase 1 Implementation Notes

## Version baseline
At kickoff, the repository uses Electron 44.5.1, React 19.3.0, TypeScript 7.0.2, Vite 8.3.2, better-sqlite3 13.0.3, Vitest 5.0.3, Playwright 1.63.0, electron-builder 26.17.0, @electron/rebuild 4.2.0, React Router 7.18.4, Zustand 5.0.15, Zod 4.6.5, React Hook Form 7.89.0, Noto Sans 5.3.0 and Noto Sans Bengali 5.3.0.

## Verified design/security decisions
- Renderer has contextIsolation and no Node integration.
- Preload exposes only two read-only bootstrap calls.
- Runtime HTTP/HTTPS/WebSocket requests are blocked except the local development Vite server.
- Browser windows cannot open external URLs.
- A single Electron instance owns the local SQLite database.
- SQLite uses foreign keys, WAL, FULL synchronous durability, busy timeout and migration checksums.
- Money is integer poisha.
- Fonts are bundled through permissively licensed OFL-1.1 Fontsource packages.

## Honest verification boundary
GitHub connector access can create source and workflows but does not execute Windows commands inside this development session. Therefore Phase 1 is not declared PASS until the Windows CI workflow provides actual typecheck/test/build evidence. No fabricated test output is recorded.
