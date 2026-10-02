import fs from "node:fs";
import path from "node:path";

const roots = ["src", "electron", "database", "scripts", "package.json"];
const forbidden = [/TODO/i, /FIXME/i, /activation\s*code/i, /1516591935015165/, /password\s*[:=]\s*["'][^"']+["']/i];
const files = [];
const walk = (target) => {
  if (!fs.existsSync(target)) return;
  const stat = fs.statSync(target);
  if (stat.isFile()) files.push(target);
  else for (const entry of fs.readdirSync(target)) walk(path.join(target, entry));
};
roots.forEach(walk);
const failures = [];
for (const file of files) {
  const text = fs.readFileSync(file, "utf8");
  for (const rule of forbidden) if (rule.test(text)) failures.push(`${file}: matched ${rule}`);
}
if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log(`Security source scan passed for ${files.length} files.`);
