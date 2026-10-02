import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";

type DatabaseStatus = { ok: boolean; schemaVersion: number };

const migrations = [
  {
    version: 1,
    sql: fs.readFileSync(path.join(process.cwd(), "database/migrations/001_initial.sql"), "utf8")
  }
];

export const initializeDatabase = (userDataPath: string): DatabaseStatus => {
  const dataPath = path.join(userDataPath, "data");
  fs.mkdirSync(dataPath, { recursive: true });
  const db = new Database(path.join(dataPath, "dcms.db"));
  db.pragma("foreign_keys = ON");
  db.pragma("journal_mode = WAL");
  db.pragma("synchronous = FULL");
  db.pragma("busy_timeout = 5000");
  db.exec("CREATE TABLE IF NOT EXISTS migration_history (version INTEGER PRIMARY KEY, applied_at TEXT NOT NULL, checksum TEXT NOT NULL)");
  const getVersion = db.prepare("SELECT COALESCE(MAX(version), 0) AS version FROM migration_history");
  const insertMigration = db.prepare("INSERT INTO migration_history(version, applied_at, checksum) VALUES (?, ?, ?)");
  const sha256 = (value: string): string => {
    const crypto = require("node:crypto") as typeof import("node:crypto");
    return crypto.createHash("sha256").update(value, "utf8").digest("hex");
  };

  for (const migration of migrations) {
    const current = Number((getVersion.get() as { version: number }).version);
    if (migration.version <= current) continue;
    const checksum = sha256(migration.sql);
    db.transaction(() => {
      db.exec(migration.sql);
      insertMigration.run(migration.version, new Date().toISOString(), checksum);
    })();
  }

  const result = db.pragma("quick_check", { simple: true }) as string;
  const version = Number((getVersion.get() as { version: number }).version);
  db.close();
  return { ok: result === "ok", schemaVersion: version };
};
