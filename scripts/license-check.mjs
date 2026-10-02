import fs from "node:fs";
const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
const allowed = new Set(["MIT","Apache-2.0","BSD-2-Clause","BSD-3-Clause","ISC","0BSD","Unlicense","CC0-1.0","OFL-1.1"]);
const manifest = { directDependencies: { ...pkg.dependencies, ...pkg.devDependencies }, allowlist: [...allowed] };
fs.mkdirSync("third-party", { recursive: true });
fs.writeFileSync("third-party/direct-dependency-policy.json", JSON.stringify(manifest, null, 2) + "\n");
console.log("Direct dependency policy written. Full transitive license scan runs in CI after npm install.");
