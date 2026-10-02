# DCMS Pro — Release Plan

## Phase gates
Phase 0: documentation only. Create feature branch, commit specification, audit, open PR, stop.

Phase 1: scaffold, CI, design system, app shell, routing, DB schema/migrations, icons/fonts.
Phase 2: installer, activation, setup, login, hashing, RBAC, autolock, audit.
Phase 3: patients, profiles, dental chart, attachments.
Phase 4: appointments, queue, visits, treatments, timeline, referrals.
Phase 5: prescriptions, print preview, printer profiles, PDF.
Phase 6: invoices, payments, financial history.
Phase 7: inventory, accounting, staff/users.
Phase 8: dashboard, global search, notifications, settings, backup/restore, About, shortcuts.
Phase 9: full audit, stress, screen/DPI, clean-machine, licensing and packaged tests.
Phase 10: final NSIS build, checksum, installer validation, GitHub Release.

A new phase may be inserted only when a newly discovered requirement cannot be safely accommodated in the current phase; it must be documented in PROGRESS.md and communicated before implementation continues.

## Branch/PR policy
- Branch name: feature/phase-N-name.
- One PR per phase targeting main.
- No direct main changes after initialization.
- Never merge automatically; owner reviews and merges.
- Each PR description includes requirements covered, tests run, known limitations, dependency/license scan result, and data-migration impact.

## Final release checklist
1. All traceability rows PASS.
2. Full automated suite PASS.
3. Manual Windows/DPI/printer matrix PASS or documented limitations.
4. No open release-blocking defects.
5. No forbidden licenses/dependencies.
6. Secret scan clean; activation secret never committed.
7. Package content contains no test fixtures/mock data/source maps that expose secrets.
8. NSIS installer install/upgrade/uninstall tested.
9. SHA-256 checksum generated for installer.
10. README/manual complete.
11. Third-party notices complete.
12. GitHub Release created with installer/checksum and release notes.

Unsigned-build warning: if no trusted Windows code-signing certificate is supplied, README will explain that SmartScreen may display an unknown-publisher warning. The installer will not weaken Windows security controls.
