# DCMS Pro — Architecture & Stack Decision

## 1. Product boundary
DCMS Pro is a single-PC, offline-first Windows 10/11 64-bit desktop application for a dental clinic. Runtime networking is disabled. GitHub is distribution/source control only; the installed application has no cloud, telemetry, subscription, remote-content, SMS, email, online activation, updater, or analytics dependency.

## 2. Chosen stack
| Area | Decision | Rationale |
|---|---|---|
| Desktop shell | Electron | Mature Windows desktop integration, printing, native dialogs, packaging, tray, filesystem access through controlled main-process APIs. |
| UI | React 19.x | Component model and current stable release family; React 19.3 is current as of Phase 0 research. |
| Language | TypeScript strict | Strong domain typing and safer refactors. |
| Build | Vite | Fast deterministic renderer build; Electron main/preload separately bundled. |
| Database | SQLite + better-sqlite3 | Local transactional relational store, indexed queries, no server. Current package is MIT. |
| State | Zustand + local repositories | Lightweight local UI/session state; no HTTP data layer. |
| Forms/validation | React Hook Form + Zod | Typed validation and controlled form performance. |
| Routing | React Router hash routing | Works in packaged file/app protocol without a web server. |
| UI primitives | Custom design system + Radix primitives where needed | Full visual control and accessible primitives without GPL/AGPL dependencies. |
| Icons | Lucide | Consistent SVG iconography; package license must pass the release allowlist. |
| Charts | Custom SVG primitives | Avoids unnecessary chart dependency and gives predictable print/export behavior. |
| PDF/printing | Chromium print/printToPDF + HTML/CSS templates | Offline, high-quality, supports system printers and paper-specific CSS. |
| ZIP backup | Small permissive ZIP library selected during implementation after license scan | Streaming backup archive without native runtime dependency. |
| Tests | Vitest + Playwright | Unit/integration plus Windows desktop E2E. |
| Packaging | electron-builder + NSIS | Windows installer/uninstaller, shortcuts and custom uninstall prompt. electron-builder is MIT. |
| Runtime font | Noto Sans + Noto Sans Bengali | Local embedded fonts, Bangla shaping; OFL-licensed assets. |

Node build baseline: Node 24 LTS; exact patch version is pinned in repository tooling after implementation kickoff. Node 24.21.0 is listed as LTS in the current official download page. React 19.3 is current as of the September 2026 official release. 

## 3. Dependency policy
Production dependencies must be permissively licensed and compatible with closed-source commercial distribution. The release allowlist is: MIT, Apache-2.0, BSD-2-Clause, BSD-3-Clause, ISC, 0BSD, Unlicense, CC0-1.0, and OFL-1.1 for fonts. GPL/AGPL/LGPL and other copyleft/restricted licenses are rejected unless explicitly reviewed and shown compatible, with the default being rejection. Every production dependency is recorded in third-party notices.

## 4. Process architecture
Renderer -> typed preload API -> main-process application services -> repositories -> SQLite/filesystem. Renderer never receives Node.js or filesystem primitives. Authorization is checked again inside every service/repository operation; UI hiding is not a security boundary.

## 5. Runtime hardening
- contextIsolation=true.
- nodeIntegration=false.
- sandbox where compatible with required preload behavior.
- Strict CSP; no remote script/style/content sources.
- All web requests cancelled at the session boundary except approved local app protocols/resources.
- No remote URLs, OAuth, webviews, external update services, or analytics.
- Single-instance lock; second launch focuses the existing window.
- Secrets never logged.

## 6. Database durability
SQLite uses foreign_keys=ON, WAL, FULL synchronous durability, busy timeout, transactional migrations, integrity checks, and atomic write patterns. Currency is stored as integer poisha (1 BDT = 100 poisha), never binary floating-point.

## 7. Time and locale
Clinic timezone is Asia/Dhaka. Database timestamps use UTC epoch/ISO representation and UI/printing render Bangladesh local time. UI language is English; user-entered clinical/print content supports Unicode Bangla. BDT/৳ is locked as the clinic currency.

## 8. Activation architecture
The production activation verifier is generated from a secret injected only at build/setup time. Repository source contains neither the actual activation code nor a reversible copy. The verifier uses a unique salt and memory-hard KDF (scrypt) with constant-time comparison and failure throttling. Machine binding is protected by Windows OS-backed encryption (Electron safeStorage/DPAPI) rather than a fragile hardware fingerprint alone. Backup data excludes the machine-bound activation secret, so restoring business data to another PC still requires activation.

The README must explicitly state the security limitation: a static offline activation secret cannot be made permanently undiscoverable from a determined reverse engineer; the design provides a practical barrier without aggressive packing/obfuscation that could cause antivirus false positives.

## 9. Printing architecture
Print documents are rendered from deterministic React/HTML templates in a dedicated print window. CSS defines A4, A5, A6/mini, 80mm, 58mm and custom profiles. Electron uses installed Windows printers for physical printing and Chromium printToPDF for PDF export. Wireless/Bluetooth thermal printing is supported through Windows-installed printer drivers; DCMS Pro does not depend on vendor cloud services.

Physical output is accepted only against Windows-recognized printers/drivers. No desktop application can honestly guarantee identical output from every unsupported vendor driver, so driver compatibility is part of release evidence.

## 10. Data protection and recovery
Attachments live in a managed data directory with metadata, SHA-256 checksum and audit trail. Backups contain a manifest, database snapshot, attachments, logo and settings. Restore verifies the manifest before replacement, creates a pre-restore backup, uses a temporary restore area, and rolls back on failure.

## 11. Explicit non-goals
- No online account or cloud sync.
- No remote database.
- No SMS/email/WhatsApp dependency.
- No automatic updater.
- No telemetry.
- No hidden usage limits on patients, visits, invoices, prescriptions, or attachments count.
- No artificial demo/mock records in production.
