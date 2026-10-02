# DCMS Pro — Exact UI Layout Specification

## Global shell
Window minimum 1180×720 logical px; preferred 1440×900. At smaller usable work areas, content scrolls rather than clips. Sidebar expanded 248px, collapsed 72px. Header 68px high. Main content uses 24px outer padding, 16px panel gaps, 12px control gaps. Sidebar and header remain fixed; page content is the only primary scroll region.

Header: left brand block, clinic identity; center/right date-time and global search trigger; right notification button with unread badge, user avatar/name/role, lock and logout. Header never contains destructive actions.

Sidebar: grouped headings Practice/Clinical/Billing/Administration. Each item is icon 20px + label. Active item has filled/soft accent background and 3px leading indicator. Collapsed mode centers icons and provides tooltips. State persists locally.

Sub-pages show breadcrumb + back action immediately below header. Back returns to the previous logical list/context, not blindly to dashboard. Unsaved forms invoke a discard/save dialog.

All screens implement four states: loading skeleton, populated, empty guidance, and recoverable error with retry.

## Screens and routes
1. Activation: centered 460px card; product mark, activation field, reveal/hide, status, retry throttle, support note. No access to business data.
2. Setup wizard: 760px centered card with left 220px step rail and right form pane; footer Back/Continue/Save & Exit. Exact resume point persisted.
3. Login: centered 420px card, username/password, show password, sign in, lockout message. Background uses local branding only.
4. Locked session: clinic mark, current user, password field, unlock/switch user; unfinished forms remain in memory.
5. Dashboard: responsive balanced CSS grid. Widget count determines column count that divides the visible widget count; no ragged final row. Six widgets may be 3+3; four may be 2+2 or 4+0; five uses a divisor-safe layout rather than 3+2 or 4+1. Role-sensitive cards are removed before grid calculation.
6. Patients list: toolbar filters/search/new/export; filter strip; paginated/virtual table; row click to profile. Default date filter today. Sticky table header.
7. Patient create/edit: two-column form on desktop; sections Identity, Contact, Emergency, Clinical, Medical, Habits, Notes. Save bar sticky bottom.
8. Patient profile: summary header with avatar/code/warnings; quick actions; tab strip Overview/Clinical Timeline/Dental Chart/Prescriptions/Billing/Referrals/Appointments/Attachments; tab content scrolls independently when dense.
9. Dental chart: toolbar child/adult, numbering system, multi-select, legend; central SVG chart; right inspector for tooth/surface/condition/note/history; print action.
10. Appointments: calendar day/week/month toggle plus list mode; left filters/dentist/date; central schedule; right selected appointment drawer. Create/edit modal uses existing/quick-new patient.
11. Queue: top date/dentist selector; serial cards in main list; right action rail for check-in, in-treatment, complete, no-show, emergency, reorder.
12. Visits: patient context header; visit date/status; complaint/exam/diagnosis/treatment/referral sections; tooth/procedure selector; save-as-new historical record only.
13. Treatments: catalog table with search/category/status/price; edit drawer; visit use action.
14. Referrals: directory table + create/edit drawer; referral letter preview/print.
15. Prescriptions: three-column desktop layout: left clinical inputs, center medication builder, right live compact preview/summary; top patient/dentist/date context; bottom Save/Preview/Print/PDF. On narrow widths columns stack in clinical→medication→preview order.
16. Prescription print preview: paper canvas centered, printer/paper/orientation/profile controls in right rail, page thumbnails when >1 page.
17. Invoice: header patient/invoice context; line-item grid; totals summary right; payment actions; audit/cancel drawer.
18. Invoice print preview: paper canvas + same print controls; adaptive thermal layout.
19. Payments: filter/date toolbar; permitted totals header; payment table; receipt drawer.
20. Inventory: stock KPI row for authorized roles; searchable item table; item/purchase/adjustment drawers; supplier selector.
21. Accounting: period selector; income/expense/P&L panels; category chart; dentist income; outstanding; export actions.
22. Staff & Users: tabs Staff/Users/Roles/Permissions; staff table and profile drawer; sensitive fields permission-gated; salary history.
23. Backup & Restore: destination picker/status; manual backup; schedule; backup table with verification state; restore confirmation flow.
24. Settings: left section nav; right form pane. Sections Clinic, Dentists, Printing, Numbering, Patient Codes, Security/Autolock, Theme, Templates, Shortcuts, Danger Zone.
25. About: product mark, version/build/license state, notices/licenses, developer/contact.
26. Search overlay: Ctrl+K modal, search field, grouped result sections, keyboard navigation, direct-open action.
27. Notifications: filter tabs All/Unread/System/Clinical/Financial/Inventory; mark read/all.
28. Audit log: admin-only table, date/action/user/entity filters, detail drawer, export.

## Responsive behavior
Desktop breakpoints: 1280, 1366, 1536, 1920, 2560, 3840 widths. Content panels use min-width constraints and horizontal scroll only for genuinely wide data grids. Forms collapse to one column below 1180px usable width. No text or icon is allowed outside its component bounds.

## Interaction states
Buttons: default, hover, focus-visible, pressed, disabled, loading, success, destructive-confirmed. Inputs: default, hover, focus, filled, invalid, disabled, read-only. Tabs: inactive, hover, active, focus. Tables: loading, empty, selected, keyboard focus, error. Modals: opening/closing with reduced-motion fallback. Uploads: idle, drag-over, validating, uploading/local-copying, success, failure, retry.

## Keyboard/navigation
Ctrl+K search; Ctrl+N context-aware create; Ctrl+S save; Ctrl+P print; Esc close modal/drawer; Alt+Left back; F6 cycle major regions. Tab order follows visual order. Every icon-only control has an accessible name and tooltip.
