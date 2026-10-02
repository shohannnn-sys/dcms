# DCMS Pro — Permission Matrix

Actions: V=view, C=create, E=edit, D=delete/void where allowed, P=print, X=export. Additional S=sensitive data, M=manage permissions/settings.

| Module | Owner/Admin | Dentist | Receptionist | Finance | Inventory | Custom role |
|---|---|---|---|---|---|---|
| Dashboard | V/S | V clinical | V nonfinancial | V financial | V stock | configured |
| Patients | V/C/E/D/P/X/S | V/C/E/P | V/C/E/P | V as authorized | V as authorized | configured |
| Dental chart | V/C/E/P | V/C/E/P | V as authorized | V as authorized | V as authorized | configured |
| Appointments | V/C/E/D/P/X | V/C/E/P | V/C/E/P | V | V | configured |
| Queue | V/C/E/D | V/C/E | V/C/E | V | V | configured |
| Visits/Treatments | V/C/E/P | V/C/E/P | V/C/E/P | V as authorized | V | configured |
| Prescriptions | V/C/E/P/X | V/C/E/P/X | V/C/E/P if granted | V | V | configured |
| Invoices | V/C/E/D/P/X | V/C/E/P if granted | V/C/E/P/C if granted | V/C/E/D/P/X | V if granted | configured |
| Payments | V/C/E/P/X/S | C/P if granted, no totals by default | C/P, no totals | V/C/E/D/P/X/S | V if granted | configured |
| Inventory | V/C/E/D/P/X | V | V | V | V/C/E/D/P/X | configured |
| Accounting | V/C/E/P/X/S | no by default | no totals | V/C/E/D/P/X/S | V as granted | configured |
| Staff | V/C/E/D/P/X/S | V limited | V limited | V limited | V limited | configured |
| Users/Roles/Permissions | M/V | no | no | no | no | only explicitly granted |
| Backup/Restore | M/V/P/X | no by default | no | no | no | explicit |
| Settings | M/V/E | limited | limited | limited finance settings | limited stock settings | configured |
| Audit log | V/X/S | no by default | no | no | no | explicit |
| About | V | V | V | V | V | V |

## Enforcement rules
1. Renderer navigation is convenience only; every command crosses an authorization guard in the main process.
2. Financial totals, P&L, income breakdowns and outstanding totals require explicit financial permission. Reception can enter a payment without being able to view aggregate totals.
3. NID, salary, audit detail, activation state and other sensitive fields require separate sensitive-data permissions where appropriate.
4. Owner account cannot be removed without an ownership-transfer flow that leaves at least one Owner/Admin.
5. Paid invoices are never hard-deleted; they can only be voided/cancelled with reason and audit event.
6. Clinical history is append-only; corrections create an amendment event rather than overwriting historical content.
7. Custom roles are deny-by-default and receive only explicitly assigned permissions.
