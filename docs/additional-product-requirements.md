# DCMS Pro — Expert Additions Not Explicitly Stated

These additions are included because they materially improve reliability/security without changing the requested product boundary.

1. Single-instance enforcement to prevent concurrent SQLite writes from multiple app instances.
2. Append-only amendment model for clinical history so corrections never erase historical truth.
3. Integer-poisha money model to eliminate floating-point billing errors.
4. Audit hash chain using previous event hash and current event hash to make silent event tampering detectable.
5. Atomic migration and restore transactions with pre-restore backup and rollback.
6. SQLite integrity check at startup after abnormal termination, with safe recovery messaging.
7. Local diagnostic bundle with PII/secrets redacted; no telemetry upload.
8. CSV formula-injection protection for exported user-controlled text.
9. File checksum validation for every managed attachment and backup member.
10. Controlled destructive-action policy: automatic backup, admin reauthentication, exact confirmation and audit event.
11. Data export and portability for authorized roles, while keeping activation machine-bound.
12. Least-privilege filesystem policy and OS-protected secret storage.
13. Input normalization for phone/name/code search and Bangla/Unicode-safe comparison.
14. Accessible keyboard navigation/focus management and high-contrast-safe status indicators.
15. Deterministic print templates independent of current screen theme/layout.
16. Local-only notification scheduler with no SMS/email/network dependency.
17. Printer-driver compatibility matrix because Windows physical printing depends on installed drivers.
18. Package-content allowlist so development fixtures, source secrets and test assets cannot ship accidentally.
19. Deterministic synthetic stress-data generator that is test-only and excluded from production.
20. Backup retention controls to prevent a small disk from being silently exhausted by automatic backups.
21. Log rotation and redaction to keep diagnostics useful without retaining unnecessary patient/credential data.
22. Owner-account continuity rule ensuring an installation cannot accidentally lose its only administrator.
23. No in-app auto-update to preserve the requested frozen/offline product model.
24. Explicit restore semantics: a single selected backup replaces current business state after safety backup; sequential restores are supported only as explicit repeated operations, never as an implicit merge. No automatic record-level merge is attempted.
25. Reference-hardware performance budgets recorded before Phase 9 so performance claims are measurable rather than subjective.
