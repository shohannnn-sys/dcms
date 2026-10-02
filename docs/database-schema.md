# DCMS Pro — Database Schema & Relationships

## Conventions
SQLite INTEGER primary keys; public UUID text keys where stable external identity is needed. Money is INTEGER poisha. Dates are UTC ISO/epoch values rendered in Asia/Dhaka. `created_at`, `updated_at` and `deleted_at` exist where applicable. Clinical/financial historical rows are append-only or voided, not destructively edited. Foreign keys are enabled on every connection.

## Core tables
- `app_meta`: singleton application state, schema version, clinic timezone, setup state.
- `activation_state`: salted verifier metadata and OS-protected machine binding; never stores the activation secret.
- `users`: login identity, password hash, salt, status, lock counters, last login.
- `roles`, `permissions`, `role_permissions`, `user_roles`: RBAC.
- `audit_log`: immutable event, actor, action, entity type/id, timestamp, metadata JSON, previous hash, event hash.
- `clinic`, `clinic_hours`, `clinic_settings`: clinic identity and settings.
- `dentists`, `dentist_designations`, `dentist_certifications`, `dentist_schedules`.

## Patient/clinical tables
- `patients`: unique patient code, identity, demographics, contact, emergency, medical/habit fields, notes, status.
- `patient_search`: FTS5/search index or normalized searchable projection plus fallback indexed columns.
- `patient_attachments`: metadata, path, MIME, byte size, SHA-256, uploaded_by.
- `visits`: immutable encounter header and clinical context.
- `visit_notes`: complaint, O/E, assessment, advice and structured/free text.
- `clinical_events`: timeline events linked to visit/user/dentist.
- `dental_charts`: patient chart version/state.
- `dental_tooth_states`: tooth, dentition, numbering system, condition, surface, note, date, dentist, visit.
- `treatments`: catalog.
- `visit_treatments`: treatment performed, tooth/surface, quantity, unit price, discount, status; feeds invoice line items by explicit transaction.
- `referrals`, `referral_events`.

## Appointment/queue tables
- `appointments`: patient, dentist, start/end, status, source, notes, conflict metadata.
- `appointment_reminders`: local reminder schedule/status.
- `queue_days`, `queue_entries`: serial, dentist, status, priority, ordering.

## Prescription tables
- `prescriptions`: patient, visit, dentist, date, footer/advice, status.
- `prescription_clinical_items`: section, preset/free text, language.
- `medications`: personal medication catalog.
- `prescription_medications`: medication, type, strength, dose by time-of-day, food relation, duration, instructions, order.
- `prescription_templates`, `prescription_template_items`.
- `prescription_print_profiles`: paper, orientation, margins, scale, printer.

## Billing/accounting tables
- `invoices`: sequential invoice number, patient, dates, subtotal, discount, total, paid, due, status, cancellation reason.
- `invoice_items`: treatment/tooth/qty/unit/discount/total.
- `payments`: invoice/patient, amount, method, transaction ID, note, date, status.
- `payment_reversals`: append-only reversal/refund record.
- `receipt_prints`: optional print audit reference.
- `accounts`: income/expense categories.
- `ledger_entries`: immutable financial source entry.
- `expenses`: category, amount, supplier, date, inventory link where applicable.
- `expense_attachments`.

## Inventory tables
- `inventory_items`: item/category/unit/current/min stock, expiry policy.
- `suppliers`.
- `inventory_purchases`, `inventory_purchase_items`.
- `inventory_movements`: purchase/use/adjustment/return with reason and source.
- `inventory_adjustments`.

## Staff tables
- `staff`: personal/position/join/salary fields and optional user link.
- `salary_payments`: amount/date/method/note.
- `staff_attachments`.

## System tables
- `notifications`: category, title/body, severity, read state, entity link.
- `printer_profiles`: printer identity, paper size, margins, font scale and custom settings.
- `number_sequences`: atomic counters for patient/invoice/etc.
- `document_templates`: prescription/referral/receipt/footer templates.
- `backup_records`: path, size, created time, checksum, verification state.
- `migration_history`: migration ID, checksum, applied timestamp.
- `app_shortcuts`: configurable shortcut mapping.

## Key relationships
Clinic 1—N Dentists; Dentist 1—N Users/Staff/Schedules; Patient 1—N Visits/Appointments/Prescriptions/Invoices/Payments/Attachments/Dental states/Referrals; Visit 1—N Visit Treatments/Clinical Events/Prescriptions; Prescription 1—N Prescription Clinical Items/Prescription Medications; Invoice 1—N Invoice Items/Payments; Treatment 1—N Visit Treatments; Inventory Item 1—N Purchase Items/Movements; Supplier 1—N Purchases/Expenses; User 1—N Audit/Clinical/Financial actions; Role N—N Permission; User N—N Role.

## Constraints/indexes
- Unique patient code, invoice number, username, supplier/item identifiers where configured.
- Duplicate-warning index on normalized patient name + normalized phone.
- Index all foreign keys and date/status filter columns.
- Composite indexes for patient/date, dentist/date, invoice/status/date, payment/date/method, inventory/expiry/current stock.
- Check constraints for nonnegative monetary amounts, valid status enums and quantity > 0.
- Cascades are limited: attachment metadata may cascade with a permanently deleted parent only during controlled full-data reset; clinical/financial history uses RESTRICT/soft-void semantics. No accidental orphaning is permitted.
- SQLite triggers prevent UPDATE/DELETE on audit and immutable historical tables except controlled reset migrations.

## Migration policy
Migrations are numbered, checksum-verified, transactional, forward-only and applied before normal app startup. Failed migration blocks normal access and offers verified restore/recovery instructions. Downgrading the application against a newer database is explicitly unsupported; reinstalling the same release preserves compatible data.
