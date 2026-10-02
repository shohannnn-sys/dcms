# DCMS Pro — Design System

## Visual direction
Premium clinical technology: warm-clean light surfaces, deep teal/royal-blue identity, restrained glassmorphism, soft shadows, crisp typography, generous whitespace. No excessive gradients, neon effects, or decorative noise.

## Tokens
- Primary deep teal: #0F766E
- Primary blue: #2563EB
- Ink: #0B1F33
- Muted text: #64748B
- Page background: #F6F8FB
- Panel: #FFFFFF
- Border: #E2E8F0
- Success: #15803D
- Warning: #B45309
- Danger: #B91C1C
- Focus ring: 2px high-contrast ring around the active control.
- Radius: 10px controls, 14px cards, 18px large surfaces.
- Shadows: low-elevation 0 2px 10px rgba(11,31,51,.06); elevated 0 12px 32px rgba(11,31,51,.10). Print output uses no shadows.
- Spacing base 4px; common values 4/8/12/16/20/24/32/40.
- Control heights: 36 compact, 40 default, 48 prominent.
- Body font: Noto Sans; Bangla fallback/local font: Noto Sans Bengali. Headings use the same family with weight variation for reliable embedding.

## Typography
12px metadata, 13px compact labels, 14px body, 15px default body/forms, 16px section heading, 20px card heading, 28px page heading, 36px dashboard metric. Line height 1.35–1.6. Numeric financial values use tabular numerals.

## Glass surfaces
Glass is limited to header/sidebar overlays and selected hero cards: translucent panel, local blur where supported, solid fallback under reduced-motion/low-power mode. Critical clinical/financial tables remain opaque for readability.

## Motion
150ms micro-interactions, 220ms panels, 280ms page transitions. Only transform/opacity are animated where possible. Reduced-motion disables nonessential animation. No infinite animation except an unobtrusive progress indicator during an active operation.

## Components
Button, IconButton, Input, PasswordInput, TextArea, Select, Combobox, DatePicker, TimePicker, DateRange, Checkbox, Radio, Switch, Tabs, Breadcrumb, Tooltip, Modal, Drawer, ConfirmDialog, Toast, Alert, Badge, Avatar, Card, MetricCard, DataTable, Pagination, EmptyState, Skeleton, ErrorState, FileDropzone, Timeline, DentalTooth, Chart, PrintPaper, Stepper, SearchCommand, NotificationItem.

## State rules
Every interactive component has default/hover/focus/pressed/disabled/loading states. Validation errors are adjacent to the field and summarized at form top when submission fails. Destructive actions always use a confirmation surface and explicit consequence text.

## Accessibility
Target WCAG 2.2 AA-style contrast and keyboard operability. Focus is always visible. Color is never the only status indicator. Tables expose headers and row focus. Form controls have labels. Tooltips supplement but never replace accessible names.

## Theme
Light is the default. Dark theme is supported as a complete token set, not a simple inversion: surfaces, borders, text, focus, chart strokes and print-preview canvas are independently defined. Printed documents always use the document print palette regardless of app theme.
