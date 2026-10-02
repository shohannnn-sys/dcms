import fs from "node:fs";
for (const path of ["dist", "dist-electron"]) fs.rmSync(path, { recursive: true, force: true });
