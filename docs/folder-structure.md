# DCMS Pro — Folder Structure

```
dcms/
├─ .github/
│  └─ workflows/                 # Windows CI/build/license/test workflows
├─ docs/
│  ├─ architecture-and-stack-decision.md
│  ├─ requirements-traceability-matrix.md
│  ├─ ui-layout-specification.md
│  ├─ design-system.md
│  ├─ database-schema.md
│  ├─ permission-matrix.md
│  ├─ print-wireframes.md
│  ├─ acceptance-test-checklist.md
│  ├─ test-plan.md
│  ├─ release-plan.md
│  ├─ additional-product-requirements.md
│  └─ phase-0-report.md
├─ electron/
│  ├─ main/                       # main-process bootstrap/services
│  ├─ preload/                    # minimal typed bridge
│  └─ security/
├─ src/
│  ├─ app/                        # routing/session/shell
│  ├─ components/                 # reusable design-system components
│  ├─ features/                   # patients, clinical, billing, inventory, etc.
│  ├─ pages/                      # route-level screens
│  ├─ print/                      # print templates/preview
│  ├─ stores/                     # local UI/session stores
│  ├─ styles/                     # tokens/global styles
│  ├─ types/
│  └─ utils/
├─ database/
│  ├─ migrations/                 # numbered forward-only SQL migrations
│  ├─ seeds/                      # development/test-only, never production demo data
│  └─ schema/
├─ tests/
│  ├─ unit/
│  ├─ integration/
│  ├─ e2e/
│  ├─ print/
│  ├─ performance/
│  ├─ fixtures/                   # generated synthetic test data only
│  └─ snapshots/
├─ scripts/
│  ├─ activation/                 # secret-injected verifier generation; never stores secret
│  ├─ icon/
│  ├─ license/
│  ├─ release/
│  └─ test-data/
├─ assets/
│  ├─ fonts/
│  ├─ icons/
│  └─ print/
├─ data/                           # ignored local dev runtime data
├─ dist/                           # ignored build output except release artifacts as needed
├─ package.json
├─ package-lock.json
├─ tsconfig.json
├─ vite.config.ts
├─ electron-builder.yml
├─ eslint.config.js
├─ vitest.config.ts
├─ playwright.config.ts
├─ README.md
└─ PROGRESS.md
```

Production runtime data is stored under the Windows application-data location, not beside the installed executable. Test fixtures and development seeds are excluded from packaged builds.
