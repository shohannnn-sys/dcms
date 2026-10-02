# DCMS Pro — Test Plan

## 1. Test layers
### Unit
Domain arithmetic, age/date ranges, patient-code generation, invoice numbering, money calculations, dental numbering maps, medication dose formatting, permission predicates, backup checksums, activation verification, audit hash chain.

### Integration
SQLite repositories, transactions, FK restrictions, migrations, RBAC service guards, backup/restore, printer profile persistence, notification generation, ledger reconciliation.

### E2E
Fresh install → activation → setup → login → patient → visit → dental chart → prescription → invoice → payment → backup → restore → logout. Repeat under role variants.

### Visual/print
Playwright screenshots at 1280×720, 1366×768, 1536×864, 1920×1080, 2560×1440, 3840×2160. Use deviceScaleFactor 1/1.25/1.5/2 for automated layout coverage; final release also requires Windows DPI acceptance at 100/125/150/200% on a real/VM Windows environment. Print snapshots cover A4/A5/A6/80mm/58mm/custom and long Bangla content.

### Security
Directly call main-process service APIs using unauthorized identities and verify rejection. Attempt renderer-only bypass, route manipulation, malformed IDs, SQL-like input, path traversal, backup tampering, invalid checksums, activation brute-force, password replay, and log injection.

### Performance/stress
Generate test-only synthetic datasets of 50,000 patients and 200,000 visits. Measure indexed search/list p95, visit timeline p95, invoice/report queries, startup, memory and database size. Initial acceptance targets: common search/list p95 ≤250ms on reference hardware; complex reports p95 ≤1s; no monotonic memory growth >10% over a 30-minute representative workflow after warm-up; no UI hang >500ms for normal interaction. Any target adjustment must be documented before release.

### Recovery
Kill app during transaction, backup, restore and attachment copy. Verify database integrity, no half-written records, pre-restore recovery, and startup repair messaging.

### Installer
On clean Windows 10/11 64-bit machine/VM: install, launch, activate, setup, close, uninstall keeping data, reinstall, verify data, uninstall deleting data, verify removal. Test upgrade/reinstall of same release without data loss.

### Static/release checks
TypeScript strict, ESLint, dead dependency detection, npm audit, license allowlist, secret scan, package contents scan, no remote URL scan, no TODO/FIXME scan, third-party notices completeness, checksum generation.

## 2. Reference environments
- Windows 10 64-bit.
- Windows 11 64-bit.
- Reference hardware: 8-core modern CPU, 16GB RAM, SSD.
- Display acceptance at requested resolutions and DPI values.
- At least one A4 laser/ink printer and representative 80mm/58mm thermal printers installed through Windows drivers.

## 3. Evidence
Every release test records test ID, build version, environment, date, result, artifact/screenshot/log reference and defect ID if failed. A test is PASS only when reproducible evidence exists.
