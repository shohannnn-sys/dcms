import { spawn } from "node:child_process";

const vite = spawn("npx", ["vite", "--host", "127.0.0.1", "--port", "5173"], { stdio: "inherit", shell: true, env: { ...process.env } });
let started = false;

const timer = setInterval(async () => {
  try {
    const response = await fetch("http://127.0.0.1:5173");
    if (!response.ok || started) return;
    started = true;
    clearInterval(timer);
    const electron = spawn("npx", ["electron", "."], {
      stdio: "inherit",
      shell: true,
      env: { ...process.env, VITE_DEV_SERVER_URL: "http://127.0.0.1:5173" }
    });
    electron.on("exit", (code) => {
      vite.kill();
      process.exit(code ?? 0);
    });
  } catch {}
}, 250);

process.on("SIGINT", () => { vite.kill(); process.exit(0); });
