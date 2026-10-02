# DCMS Pro — Screen/Button/Form/Print Acceptance Checklist

## Global shell
- [ ] Header shows required identity, clock, search, notifications, user/role, lock/logout.
- [ ] Every sidebar item opens the correct screen and active state.
- [ ] Collapsed sidebar tooltips work; state survives restart.
- [ ] Back/breadcrumb behavior returns to correct context.
- [ ] Loading/empty/error states are visible and actionable.
- [ ] No unauthorized route or backend action succeeds.

## Activation/setup/login
- [ ] Fresh install blocks at activation.
- [ ] Invalid activation is rejected without revealing secret material.
- [ ] Failure throttling works.
- [ ] Valid activation succeeds using secret supplied only through protected test environment.
- [ ] Setup wizard persists every completed step and resumes after forced restart.
- [ ] Logo crop/preview is correct and survives save/restart.
- [ ] Dentist qualification/designation/schedule/footer fields save correctly.
- [ ] Owner credentials meet strength rules; password is never recoverable as plaintext.
- [ ] Login success/failure/audit behavior is correct.
- [ ] Auto-lock preserves unfinished forms.

## Patients/profile
- [ ] Create patient validates required fields and patient-code uniqueness.
- [ ] Duplicate same-name+phone warning appears without silently merging.
- [ ] List date filters default to today and support all required ranges.
- [ ] Search, sort, gender, age range and overdue filters combine correctly.
- [ ] CSV export is permission-gated and formula-safe.
- [ ] Profile header warnings and quick actions open correct forms.
- [ ] All profile tabs load, paginate/virtualize, and preserve patient context.
- [ ] Historical visits cannot be overwritten.

## Dental chart
- [ ] Adult/child mode switches tooth set correctly.
- [ ] FDI/Universal/Palmer numbering maps correctly.
- [ ] Multi-select works with mouse and keyboard.
- [ ] Tooth condition/surface/note/history edits save transactionally.
- [ ] Legend and dated dentist history match state.
- [ ] Print preview has no clipping and correct numbering.

## Appointments/queue/clinical
- [ ] Day/week/month/list views match the same appointment data.
- [ ] Double-booking warning is shown before save.
- [ ] Status transitions are auditable and valid.
- [ ] Queue serial/reorder/emergency/dentist filters work.
- [ ] Visit creates immutable historical record.
- [ ] Treatment selection links tooth/procedure and can feed invoice.
- [ ] Referral letter content and print are correct.

## Prescription
- [ ] Prescription opens from patient and sidebar.
- [ ] Dentist identity includes all configured designations/qualifications.
- [ ] C/C, O/E, R/E, Advice presets and free text work in English/Bangla.
- [ ] Medication add/edit/reorder/delete and autocomplete work.
- [ ] Personal medication database and combo templates work.
- [ ] Footer/schedule/signature space remains present.
- [ ] A4/A5/A6/80/58/custom preview and PDF are exact and readable.
- [ ] Long content repeats header/page number on page 2+.
- [ ] Bangla text shapes correctly at high DPI.
- [ ] Printer profile saves and is reusable.

## Invoice/payments
- [ ] Invoice number is sequential and transactionally allocated.
- [ ] Line-item arithmetic is integer-poisha exact.
- [ ] Paid/partial/due status updates correctly.
- [ ] Cancel requires reason and audit; paid invoice cannot be deleted.
- [ ] Payment methods include all required options and transaction note.
- [ ] Reception can enter payment without seeing restricted aggregate totals.
- [ ] Receipt print/PDF works at required paper sizes.

## Inventory/accounting/staff
- [ ] Purchases, use, adjustments and current stock reconcile.
- [ ] Low-stock and expiry notifications use configured thresholds.
- [ ] Supplier relationships never orphan inventory records.
- [ ] Payments generate income ledger entries exactly once.
- [ ] Expense categories and custom categories work.
- [ ] Daily/monthly/yearly P&L and outstanding reports reconcile to ledger.
- [ ] Staff NID/salary data is permission-gated.

## Dashboard/search/notifications/settings
- [ ] Widgets render by role and obey equal-row grid rule.
- [ ] Ctrl+K searches all required entities and supports Bangla.
- [ ] Notifications show required categories and read/unread states.
- [ ] Settings persist and are reflected immediately or after documented restart.
- [ ] Danger Zone requires backup, reauthentication and exact confirmation.
- [ ] Keyboard shortcuts are listed and conflict-free.

## Backup/restore/about
- [ ] Native folder picker checks write access.
- [ ] Backup contains DB, attachments, logo/settings and manifest checksum.
- [ ] Scheduled backup catches up after missed run.
- [ ] Restore verifies before replacement and creates pre-restore backup.
- [ ] Failed restore leaves original data intact.
- [ ] Restore from backup does not transfer machine-bound activation state.
- [ ] About shows required metadata and third-party notices.

## Quality gates
- [ ] No TODO/FIXME/mock/dead code/placeholders in production source.
- [ ] No fake buttons or no-op controls.
- [ ] No console errors in production flows.
- [ ] No unhandled promise/repository errors.
- [ ] No FK/orphan violations.
- [ ] No PII/secrets in logs.
- [ ] Required screen sizes and DPI matrix passes or has documented environment limitation.
