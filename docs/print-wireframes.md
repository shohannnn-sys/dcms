# DCMS Pro — Print & PDF Wireframes

## Shared print contract
All documents render on a white paper canvas with zero app chrome. Header/footer positions are fixed by template, not screen layout. Fonts are embedded locally. No element may overlap, clip, or extend beyond printable bounds. Long content flows to a second page; page 2+ repeats the required header and shows page number. Signature space is reserved where specified.

## Prescription A4
Margins 12mm top/12mm sides/14mm bottom. Header: clinic logo left, clinic identity center-left, dentist identity right. Patient/date strip below. Body is a two-column grid: left clinical C/C, O/E, R/E, Advice; right medication table. Footer: clinic footer message, dentist schedule, signature line with blank vertical area. Page number bottom-right. On overflow, page 2 repeats clinic/dentist header and medication table headings.

## Prescription A5/A6/mini
Same hierarchy with reduced spacing and font scale selected by profile. At narrow widths, clinical and medication columns become sequential blocks; never shrink text below legibility threshold. Signature block remains intact and is moved as a whole to the next page if needed.

## Prescription 80mm/58mm
Single-column thermal flow. Clinic/dentist header centered. Patient/date line, clinical sections, medicines, advice, footer and signature. Tables become stacked label/value rows. Long medicine instructions wrap naturally. No horizontal scrolling in print output.

## Invoice A4/A5
Header contains clinic name/logo/address/phone only. No signature/footer. Patient and invoice metadata row, line-item table with treatment/tooth/qty/unit/discount/total, then subtotal/discount/total/paid/due and status. Payment history can be a compact optional block when selected.

## Invoice 80mm/58mm/mini
Clinic header centered, invoice number/date, patient, stacked line items, totals block, payment method/transaction summary. No footer/signature. Long names wrap without changing paper width.

## Custom paper
User selects width/height within safe printer limits and stores a printer profile. Layout engine uses CSS custom page size and profile margins/font scale. Preview displays exact dimensions.

## Print controls
Paper size, orientation, printer profile, system printer, margins, font scale, copies, color mode where supported, preview zoom, Print, Save as PDF, Export PDF. Print operation records audit event; PDF export records export event.

## Acceptance snapshots
Every print template is snapshotted at A4/A5/A6/80mm/58mm/custom, portrait and any supported landscape mode. Tests include short content, long Bangla content, many medications/line items, page overflow, missing optional fields, long patient names, and mixed English/Bangla. Expected invariants: no clipping, no overlap, stable header repetition, stable signature space, correct totals, correct invoice/prescription identifiers.
