PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS app_meta (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  schema_version INTEGER NOT NULL DEFAULT 1,
  timezone TEXT NOT NULL DEFAULT 'Asia/Dhaka',
  currency_code TEXT NOT NULL DEFAULT 'BDT',
  currency_symbol TEXT NOT NULL DEFAULT '৳',
  setup_complete INTEGER NOT NULL DEFAULT 0 CHECK (setup_complete IN (0,1)),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS clinic (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  name TEXT NOT NULL DEFAULT '',
  logo_path TEXT,
  address TEXT NOT NULL DEFAULT '',
  phone TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '',
  opening_hours_json TEXT NOT NULL DEFAULT '{}',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY,
  public_id TEXT NOT NULL UNIQUE,
  username TEXT NOT NULL UNIQUE COLLATE NOCASE,
  display_name TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  password_salt TEXT NOT NULL,
  is_active INTEGER NOT NULL DEFAULT 1 CHECK (is_active IN (0,1)),
  failed_login_count INTEGER NOT NULL DEFAULT 0,
  locked_until TEXT,
  last_login_at TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS roles (
  id INTEGER PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL UNIQUE,
  is_system INTEGER NOT NULL DEFAULT 0 CHECK (is_system IN (0,1)),
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS permissions (
  id INTEGER PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS user_roles (
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  role_id INTEGER NOT NULL REFERENCES roles(id) ON DELETE RESTRICT,
  PRIMARY KEY (user_id, role_id)
);

CREATE TABLE IF NOT EXISTS role_permissions (
  role_id INTEGER NOT NULL REFERENCES roles(id) ON DELETE RESTRICT,
  permission_id INTEGER NOT NULL REFERENCES permissions(id) ON DELETE RESTRICT,
  PRIMARY KEY (role_id, permission_id)
);

CREATE TABLE IF NOT EXISTS dentists (
  id INTEGER PRIMARY KEY,
  public_id TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  phone TEXT NOT NULL DEFAULT '',
  bdmc_registration TEXT,
  footer_message TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS dentist_designations (
  id INTEGER PRIMARY KEY,
  dentist_id INTEGER NOT NULL REFERENCES dentists(id) ON DELETE RESTRICT,
  value TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS dentist_certifications (
  id INTEGER PRIMARY KEY,
  dentist_id INTEGER NOT NULL REFERENCES dentists(id) ON DELETE RESTRICT,
  value TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS dentist_schedules (
  id INTEGER PRIMARY KEY,
  dentist_id INTEGER NOT NULL REFERENCES dentists(id) ON DELETE RESTRICT,
  weekday INTEGER NOT NULL CHECK (weekday BETWEEN 0 AND 6),
  start_time TEXT NOT NULL,
  end_time TEXT NOT NULL,
  is_active INTEGER NOT NULL DEFAULT 1 CHECK (is_active IN (0,1))
);

CREATE TABLE IF NOT EXISTS patients (
  id INTEGER PRIMARY KEY,
  public_id TEXT NOT NULL UNIQUE,
  patient_code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  date_of_birth TEXT,
  age_override INTEGER CHECK (age_override IS NULL OR age_override >= 0),
  gender TEXT,
  blood_group TEXT,
  address TEXT,
  phone TEXT,
  emergency_contact_name TEXT,
  emergency_contact_phone TEXT,
  chief_complaint TEXT,
  past_problems TEXT,
  treatment_history TEXT,
  allergies TEXT,
  current_medications TEXT,
  medical_conditions TEXT,
  pregnancy TEXT,
  smoking TEXT,
  pan_zarda_habits TEXT,
  notes TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  deleted_at TEXT
);
CREATE INDEX IF NOT EXISTS idx_patients_phone ON patients(phone);
CREATE INDEX IF NOT EXISTS idx_patients_created_at ON patients(created_at);
CREATE INDEX IF NOT EXISTS idx_patients_name_phone ON patients(name COLLATE NOCASE, phone);

CREATE TABLE IF NOT EXISTS patient_attachments (
  id INTEGER PRIMARY KEY,
  patient_id INTEGER NOT NULL REFERENCES patients(id) ON DELETE RESTRICT,
  original_name TEXT NOT NULL,
  stored_path TEXT NOT NULL UNIQUE,
  mime_type TEXT NOT NULL,
  byte_size INTEGER NOT NULL CHECK (byte_size >= 0),
  sha256 TEXT NOT NULL,
  created_by INTEGER NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS visits (
  id INTEGER PRIMARY KEY,
  public_id TEXT NOT NULL UNIQUE,
  patient_id INTEGER NOT NULL REFERENCES patients(id) ON DELETE RESTRICT,
  dentist_id INTEGER REFERENCES dentists(id) ON DELETE RESTRICT,
  visit_at TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('open','completed','amended','voided')),
  created_by INTEGER NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_visits_patient_date ON visits(patient_id, visit_at DESC);

CREATE TABLE IF NOT EXISTS visit_notes (
  id INTEGER PRIMARY KEY,
  visit_id INTEGER NOT NULL UNIQUE REFERENCES visits(id) ON DELETE RESTRICT,
  chief_complaint TEXT NOT NULL DEFAULT '',
  oe TEXT NOT NULL DEFAULT '',
  assessment TEXT NOT NULL DEFAULT '',
  advice TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS treatments (
  id INTEGER PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  default_price_poisha INTEGER NOT NULL CHECK (default_price_poisha >= 0),
  is_active INTEGER NOT NULL DEFAULT 1 CHECK (is_active IN (0,1)),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS visit_treatments (
  id INTEGER PRIMARY KEY,
  visit_id INTEGER NOT NULL REFERENCES visits(id) ON DELETE RESTRICT,
  treatment_id INTEGER NOT NULL REFERENCES treatments(id) ON DELETE RESTRICT,
  tooth_code TEXT,
  surface TEXT,
  quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
  unit_price_poisha INTEGER NOT NULL CHECK (unit_price_poisha >= 0),
  discount_poisha INTEGER NOT NULL DEFAULT 0 CHECK (discount_poisha >= 0),
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS appointments (
  id INTEGER PRIMARY KEY,
  public_id TEXT NOT NULL UNIQUE,
  patient_id INTEGER NOT NULL REFERENCES patients(id) ON DELETE RESTRICT,
  dentist_id INTEGER REFERENCES dentists(id) ON DELETE RESTRICT,
  starts_at TEXT NOT NULL,
  ends_at TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('future','checked_in','completed','no_show','cancelled','rescheduled')),
  notes TEXT NOT NULL DEFAULT '',
  created_by INTEGER REFERENCES users(id) ON DELETE RESTRICT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_appointments_date_dentist ON appointments(starts_at, dentist_id);

CREATE TABLE IF NOT EXISTS prescriptions (
  id INTEGER PRIMARY KEY,
  public_id TEXT NOT NULL UNIQUE,
  patient_id INTEGER NOT NULL REFERENCES patients(id) ON DELETE RESTRICT,
  visit_id INTEGER REFERENCES visits(id) ON DELETE RESTRICT,
  dentist_id INTEGER REFERENCES dentists(id) ON DELETE RESTRICT,
  prescribed_at TEXT NOT NULL,
  footer_message TEXT NOT NULL DEFAULT '',
  created_by INTEGER NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS medications (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  strength TEXT NOT NULL DEFAULT '',
  is_active INTEGER NOT NULL DEFAULT 1 CHECK (is_active IN (0,1)),
  created_at TEXT NOT NULL,
  UNIQUE(name COLLATE NOCASE, type, strength)
);

CREATE TABLE IF NOT EXISTS prescription_medications (
  id INTEGER PRIMARY KEY,
  prescription_id INTEGER NOT NULL REFERENCES prescriptions(id) ON DELETE RESTRICT,
  medication_id INTEGER REFERENCES medications(id) ON DELETE RESTRICT,
  name_snapshot TEXT NOT NULL,
  type_snapshot TEXT NOT NULL,
  strength_snapshot TEXT NOT NULL,
  morning_dose TEXT NOT NULL DEFAULT '',
  noon_dose TEXT NOT NULL DEFAULT '',
  night_dose TEXT NOT NULL DEFAULT '',
  food_relation TEXT NOT NULL DEFAULT '',
  duration TEXT NOT NULL DEFAULT '',
  extra_instructions TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS invoices (
  id INTEGER PRIMARY KEY,
  public_id TEXT NOT NULL UNIQUE,
  invoice_number TEXT NOT NULL UNIQUE,
  patient_id INTEGER NOT NULL REFERENCES patients(id) ON DELETE RESTRICT,
  subtotal_poisha INTEGER NOT NULL CHECK (subtotal_poisha >= 0),
  discount_poisha INTEGER NOT NULL DEFAULT 0 CHECK (discount_poisha >= 0),
  total_poisha INTEGER NOT NULL CHECK (total_poisha >= 0),
  paid_poisha INTEGER NOT NULL DEFAULT 0 CHECK (paid_poisha >= 0),
  due_poisha INTEGER NOT NULL CHECK (due_poisha >= 0),
  status TEXT NOT NULL CHECK (status IN ('due','partial','paid','cancelled')),
  cancellation_reason TEXT,
  issued_at TEXT NOT NULL,
  created_by INTEGER NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_invoices_patient_date ON invoices(patient_id, issued_at DESC);

CREATE TABLE IF NOT EXISTS invoice_items (
  id INTEGER PRIMARY KEY,
  invoice_id INTEGER NOT NULL REFERENCES invoices(id) ON DELETE RESTRICT,
  treatment_id INTEGER REFERENCES treatments(id) ON DELETE RESTRICT,
  treatment_name_snapshot TEXT NOT NULL,
  tooth_code TEXT,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit_price_poisha INTEGER NOT NULL CHECK (unit_price_poisha >= 0),
  discount_poisha INTEGER NOT NULL DEFAULT 0 CHECK (discount_poisha >= 0),
  total_poisha INTEGER NOT NULL CHECK (total_poisha >= 0)
);

CREATE TABLE IF NOT EXISTS payments (
  id INTEGER PRIMARY KEY,
  public_id TEXT NOT NULL UNIQUE,
  invoice_id INTEGER REFERENCES invoices(id) ON DELETE RESTRICT,
  patient_id INTEGER NOT NULL REFERENCES patients(id) ON DELETE RESTRICT,
  amount_poisha INTEGER NOT NULL CHECK (amount_poisha > 0),
  method TEXT NOT NULL CHECK (method IN ('cash','bank','card','bkash','nagad','rocket','upay','other')),
  transaction_id TEXT,
  note TEXT NOT NULL DEFAULT '',
  paid_at TEXT NOT NULL,
  created_by INTEGER NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_payments_date ON payments(paid_at);

CREATE TABLE IF NOT EXISTS inventory_items (
  id INTEGER PRIMARY KEY,
  public_id TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  unit TEXT NOT NULL,
  current_stock REAL NOT NULL DEFAULT 0 CHECK (current_stock >= 0),
  min_stock REAL NOT NULL DEFAULT 0 CHECK (min_stock >= 0),
  expiry_date TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS suppliers (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL UNIQUE COLLATE NOCASE,
  phone TEXT NOT NULL DEFAULT '',
  address TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS inventory_movements (
  id INTEGER PRIMARY KEY,
  inventory_item_id INTEGER NOT NULL REFERENCES inventory_items(id) ON DELETE RESTRICT,
  movement_type TEXT NOT NULL CHECK (movement_type IN ('purchase','use','adjustment','return')),
  quantity REAL NOT NULL CHECK (quantity > 0),
  unit_cost_poisha INTEGER CHECK (unit_cost_poisha IS NULL OR unit_cost_poisha >= 0),
  reason TEXT NOT NULL DEFAULT '',
  source_entity_type TEXT,
  source_entity_id INTEGER,
  created_by INTEGER NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS staff (
  id INTEGER PRIMARY KEY,
  public_id TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  section TEXT NOT NULL DEFAULT '',
  position TEXT NOT NULL DEFAULT '',
  age INTEGER CHECK (age IS NULL OR age >= 0),
  address TEXT NOT NULL DEFAULT '',
  phone TEXT NOT NULL DEFAULT '',
  blood_group TEXT,
  nid TEXT,
  photo_path TEXT,
  join_date TEXT,
  salary_poisha INTEGER CHECK (salary_poisha IS NULL OR salary_poisha >= 0),
  user_id INTEGER REFERENCES users(id) ON DELETE RESTRICT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS salary_payments (
  id INTEGER PRIMARY KEY,
  staff_id INTEGER NOT NULL REFERENCES staff(id) ON DELETE RESTRICT,
  amount_poisha INTEGER NOT NULL CHECK (amount_poisha > 0),
  paid_at TEXT NOT NULL,
  note TEXT NOT NULL DEFAULT '',
  created_by INTEGER NOT NULL REFERENCES users(id) ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS audit_log (
  id INTEGER PRIMARY KEY,
  actor_user_id INTEGER REFERENCES users(id) ON DELETE RESTRICT,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id INTEGER,
  occurred_at TEXT NOT NULL,
  metadata_json TEXT NOT NULL DEFAULT '{}',
  previous_hash TEXT,
  event_hash TEXT NOT NULL UNIQUE
);
CREATE INDEX IF NOT EXISTS idx_audit_time ON audit_log(occurred_at DESC);

CREATE TABLE IF NOT EXISTS notifications (
  id INTEGER PRIMARY KEY,
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  severity TEXT NOT NULL CHECK (severity IN ('info','success','warning','danger')),
  entity_type TEXT,
  entity_id INTEGER,
  is_read INTEGER NOT NULL DEFAULT 0 CHECK (is_read IN (0,1)),
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS number_sequences (
  code TEXT PRIMARY KEY,
  next_value INTEGER NOT NULL CHECK (next_value > 0)
);

CREATE INDEX IF NOT EXISTS idx_inventory_stock ON inventory_items(current_stock, min_stock);
CREATE INDEX IF NOT EXISTS idx_inventory_expiry ON inventory_items(expiry_date);
CREATE INDEX IF NOT EXISTS idx_notifications_unread ON notifications(is_read, created_at DESC);

INSERT OR IGNORE INTO app_meta(id, created_at, updated_at) VALUES (1, datetime('now'), datetime('now'));
INSERT OR IGNORE INTO clinic(id, created_at, updated_at) VALUES (1, datetime('now'), datetime('now'));
INSERT OR IGNORE INTO number_sequences(code, next_value) VALUES ('patient', 1), ('invoice', 1);
