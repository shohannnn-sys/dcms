import Database from "better-sqlite3";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

type DatabaseStatus = { ok: boolean; schemaVersion: number };

type Migration = { version: number; sql: string; checksum: string };

const loadMigrations = (migrationDirectory: string): Migration[] => fs.readdirSync(migrationDirectory)
  .filter((name) => /^\d+_.+\.sql$/.test(name))
  .sort()
  .map((name) => {
    const sql = fs.readFileSync(path.join(migrationDirectory, name), "utf8");
    const version = Number(name.match(/^\d+/)?.[0]);
    return { version, sql, checksum: crypto.createHash("sha256").update(sql, "utf8").digest("hex") };
  });

export const initializeDatabase = (userDataPath: string, migrationDirectory: string): DatabaseStatus => {
  const dataPath = path.join(userDataPath, "data");
  fs.mkdirSync(dataPath, { recursive: true });
  const db = new Database(path.join(dataPath, "dcms.db"));
  try {
    db.pragma("foreign_keys = ON");
    db.pragma("journal_mode = WAL");
    db.pragma("synchronous = FULL");
    db.pragma("busy_timeout = 5000");
    db.exec("CREATE TABLE IF NOT EXISTS migration_history (version INTEGER PRIMARY KEY, applied_at TEXT NOT NULL, checksum TEXT NOT NULL)");
    const getVersion = db.prepare("SELECT COALESCE(MAX(version), 0) AS version FROM migration_history");
    const getChecksum = db.prepare("SELECT checksum FROM migration_history WHERE version = ?");
    const insertMigration = db.prepare("INSERT INTO migration_history(version, applied_at, checksum) VALUES (?, ?, ?)");

    for (const migration of loadMigrations(migrationDirectory)) {
      const current = Number((getVersion.get() as { version: number }).version);
      if (migration.version <= current) {
        const stored = getChecksum.get(migration.version) as { checksum: string } | undefined;
        if (stored?.checksum !== migration.checksum) throw new Error(`Migration checksum mismatch for version ${migration.version}`);
        continue;
      }
      db.transaction(() => {
        db.exec(migration.sql);
        insertMigration.run(migration.version, new Date().toISOString(), migration.checksum);
      })();
    }

    const result = String(db.pragma("quick_check", { simple: true }));
    const version = Number((getVersion.get() as { version: number }).version);
    return { ok: result === "ok", schemaVersion: version };
  } finally {
    db.close();
  }
};
