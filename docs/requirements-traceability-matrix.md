# DCMS Pro — Requirements Traceability Matrix

Each row is an atomic release obligation. Module/screen and test IDs are the future implementation targets. A release is blocked if any applicable row is not PASS.

| ID | Requirement obligation | Module/screen | Verification |
|---|---|---|---|
| GEN-001 | Offline Windows 10/11 64-bit runtime | Shell | E2E-WIN-001 |
| GEN-002 | Commercial closed-source compatible dependency licenses | Build/Release | LIC-001 |
| GEN-003 | English UI with Bangla input/printing/PDF | Global/Print | LOC-001, PDF-001 |
| GEN-004 | BDT/৳ currency | Settings/Billing | BILL-001 |
| GEN-005 | Unlimited patient/visit/record/invoice/prescription/attachment count | Data layer | PERF-001 |
| GEN-006 | No telemetry/cloud/subscription/internet runtime dependency | Security | SEC-001 |
| SHELL-001 | Header contains brand, clinic identity, date/time, search, notifications, user, role, logout/lock | App shell | UI-SHELL-001 |
| SHELL-002 | Sidebar groups and required routes exactly present | Navigation | UI-SHELL-002 |
| SHELL-003 | Sidebar collapses to icon-only, tooltiped, and remembers state | Navigation | UI-SHELL-003 |
| SHELL-004 | Unauthorized modules hidden and backend denied | RBAC | RBAC-001 |
| SHELL-005 | Back button/breadcrumbs on sub-screens | Navigation | UI-SHELL-004 |
| SHELL-006 | Loading/empty/error state on every page | Global UI | UI-SHELL-005 |
| INST-001 | NSIS installer with install path and shortcuts | Installer | INST-001 |
| INST-002 | Uninstall asks keep/delete data; reinstall/upgrade preserves data when kept | Installer | INST-002 |
| ACT-001 | One-time activation mandatory | Activation | ACT-001 |
| ACT-002 | Activation secret never plaintext in repo/config/log/test/snapshot | Security | ACT-002, SECRET-SCAN |
| ACT-003 | Salted scrypt verifier, constant-time comparison, throttling | Activation | ACT-003 |
| ACT-004 | Machine-bound state survives same-PC reinstall/restore but does not transfer as activation | Activation | ACT-004 |
| ACT-005 | Honest reverse-engineering limitation documented | About/README | ACT-005 |
| SETUP-001 | First-run wizard blocks app until complete and resumes exact step | Setup | SETUP-001 |
| SETUP-002 | Clinic name/logo crop/preview/address/phone/email/hours | Setup | SETUP-002 |
| SETUP-003 | BDT locked and default printer/paper selectable | Setup | SETUP-003 |
| SETUP-004 | Multiple dentists with qualifications, schedules, footer | Setup | SETUP-004 |
| SETUP-005 | First user Owner/Admin with password strength/confirmation | Setup/Security | SETUP-005 |
| AUTH-001 | Passwords are Argon2id or scrypt hashes with unique salts | Login | AUTH-001 |
| AUTH-002 | Roles and granular permissions; backend enforced | RBAC | RBAC-002 |
| AUTH-003 | Financial data restricted by permission; reception cannot infer totals | RBAC/Finance | RBAC-003 |
| AUTH-004 | Auto-lock 5/10/15/30 min; unfinished forms preserved | Session | AUTH-002 |
| AUTH-005 | Immutable audit events for required actions | Audit | AUD-001 |
| PAT-001 | Patient master fields exactly cover clinical/contact/medical/habit data | Patients | PAT-001 |
| PAT-002 | Configurable unique patient code | Patients/Settings | PAT-002 |
| PAT-003 | Duplicate warning on same name+phone | Patients | PAT-003 |
| PAT-004 | Date filters, default today, search/sort/gender/age/overdue/CSV | Patient list | PAT-004 |
| PAT-005 | Profile tabs and warning header/quick actions | Patient profile | PAT-005 |
| PAT-006 | Historical visits immutable | Clinical | PAT-006 |
| DENT-001 | Adult 32/child 20 dental chart modes | Dental chart | DENT-001 |
| DENT-002 | FDI/Universal/Palmer numbering | Dental chart | DENT-002 |
| DENT-003 | Multi-select teeth, conditions, surfaces, notes, legend, dated history | Dental chart | DENT-003 |
| DENT-004 | Dental chart links to visits/treatments and prints | Dental chart/Print | DENT-004 |
| APP-001 | Day/week/month/list appointments with required statuses and filters | Appointments | APP-001 |
| APP-002 | Existing/quick-new patient and double-book warning | Appointment form | APP-002 |
| QUE-001 | Today queue, serials, statuses, reorder, emergency priority, dentist queues | Queue | QUE-001 |
| VIS-001 | Visits, treatments, timeline and referrals with immutable clinical history | Clinical | VIS-001 |
| TREAT-001 | Default editable dental treatment catalog with BDT prices | Treatments | TREAT-001 |
| REF-001 | Referral directory, reason and printable letter | Referrals | REF-001 |
| RX-001 | Prescription can start from patient or sidebar | Prescription | RX-001 |
| RX-002 | Dentist identity includes all designations/qualifications | Prescription | RX-002 |
| RX-003 | Clinical columns and required presets/free text English/Bangla | Prescription | RX-003 |
| RX-004 | Medication fields, reorder/edit/delete, autocomplete, personal DB, templates | Prescription | RX-004 |
| RX-005 | Footer/schedule/signature space | Prescription | RX-005 |
| RX-006 | A4/A5/A6/mini/80/58/custom, orientation, margins, page breaks, repeated headers/page number | Print | PRINT-RX-001 |
| RX-007 | Printer profiles, system printer selection, PDF export, Bangla font shaping | Print | PRINT-RX-002 |
| INV-001 | Invoice header/line items/totals/status/sequential number | Invoice | INV-001 |
| INV-002 | Adaptive A4/A5/58/80/mini/wireless/Bluetooth layout | Invoice print | PRINT-INV-001 |
| INV-003 | Edit/cancel with reason/audit; paid invoice cannot be deleted | Invoice | INV-002 |
| PAY-001 | Payment fields/methods/transaction ID/notes/partial dues | Payments | PAY-001 |
| PAY-002 | Financial totals/method breakdown restricted to financial roles | Payments | PAY-002 |
| PAY-003 | Printable receipts and date filters | Payments | PAY-003 |
| STOCK-001 | Inventory item/purchase/use/stock/min/expiry/supplier | Inventory | STOCK-001 |
| STOCK-002 | Low-stock/expiry alerts and adjustment history/reason | Inventory | STOCK-002 |
| ACC-001 | Patient payments auto-income; expenses categorized | Accounting | ACC-001 |
| ACC-002 | Daily/monthly/yearly P&L, charts, dentist income, outstanding, CSV/PDF | Accounting | ACC-002 |
| STAFF-001 | Staff profile, NID/photo/join/salary/history/login/role | Staff | STAFF-001 |
| STAFF-002 | Sensitive staff/salary fields permission-protected | Staff/RBAC | STAFF-002 |
| DASH-001 | Role-aware dashboard widgets and equal-row grid rule | Dashboard | DASH-001 |
| DASH-002 | Responsive dashboard at required resolutions | Dashboard | SCREEN-001 |
| SEARCH-001 | Ctrl+K advanced grouped global search including Bangla | Search | SEARCH-001 |
| NOTIF-001 | Required notification categories/read/unread/filter/mark all | Notifications | NOTIF-001 |
| SET-001 | Clinic/dentist/printing/numbering/code/autolock/theme/language/templates | Settings | SET-001 |
| SET-002 | Danger Zone backup + reauth + exact confirmation before destructive actions | Settings | SET-002 |
| BACK-001 | Folder picker with write/permission check | Backup | BACK-001 |
| BACK-002 | Timestamped backup with DB/attachments/logo/settings/checksum | Backup | BACK-002 |
| BACK-003 | Scheduled 7/15/30 days and catch-up after missed run | Backup | BACK-003 |
| BACK-004 | Restore verification, pre-restore backup, rollback and defined multi-backup policy | Restore | BACK-004 |
| ABOUT-001 | Name/version/build/license/third-party notices/developer/contact | About | ABOUT-001 |
| ICON-001 | Programmatic dental icon, transparent, centered, multi-resolution ICO | Branding | ICON-001 |
| UX-001 | Premium clinical visual system, glass/soft shadows, motion, skeletons | Design system | UX-001 |
| UX-002 | Reduce-motion mode and performance-safe animation | Design system | UX-002 |
| UX-003 | Automated clickable/centering/clipping/scroll/upload/back/print checks | E2E | UI-AUTO-001 |
| PERF-001 | 50k patients/200k visits stress suite and stable memory | Data/perf | PERF-001 |
| QA-001 | Unit/integration tests for accounting and permissions | Test suite | QA-001 |
| QA-002 | Full setup→patient→visit→RX→invoice→payment→backup→restore→logout E2E | E2E | E2E-001 |
| QA-003 | RBAC direct backend-call tests | Security | RBAC-004 |
| QA-004 | Print/PDF snapshots for all sizes and Bangla | Print | PRINT-003 |
| QA-005 | Crash recovery/backup roundtrip/autolock | Recovery | REC-001 |
| QA-006 | Clean-machine packaged EXE install/uninstall/smoke | Release | REL-001 |
| QA-007 | npm audit/license scan/third-party notices/TS strict/ESLint/dead deps | Build | REL-002 |
| QA-008 | Required resolution/DPI/resize/multi-monitor/window-state matrix | UI | SCREEN-001 |
| GIT-001 | Feature branch per phase and separate PR | GitHub | GIT-001 |
| GIT-002 | No automated merge; owner manually merges | GitHub | GIT-002 |
| REL-001 | NSIS EXE + checksum + GitHub Release or documented environment limitation | Release | REL-003 |
| REL-002 | README installation/activation/backup/printer/troubleshooting and English manual | Docs | DOC-001 |

Traceability convention: every implementation task references one or more IDs above; every acceptance test records IDs and evidence. New requirements discovered during implementation receive a new ID before code is written.
