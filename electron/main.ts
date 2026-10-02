import { app, BrowserWindow, ipcMain, session } from "electron";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { initializeDatabase } from "../database/database.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isDevelopment = !app.isPackaged;
const devServerUrl = process.env.VITE_DEV_SERVER_URL ?? "http://127.0.0.1:5173";

let mainWindow: BrowserWindow | null = null;
let databaseStatus = { ok: false, schemaVersion: 0 };

const configureSecurity = (): void => {
  session.defaultSession.webRequest.onBeforeRequest({ urls: ["*://*/*", "ws://*/*", "wss://*/*", "http://*/*", "https://*/*"] }, (details, callback) => {
    if (isDevelopment && details.url.startsWith(devServerUrl)) {
      callback({});
      return;
    }
    callback({ cancel: true });
  });
  session.defaultSession.setPermissionRequestHandler((_webContents, _permission, callback) => callback(false));
};

const createWindow = (): void => {
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1180,
    minHeight: 720,
    show: false,
    backgroundColor: "#F6F8FB",
    title: "DCMS Pro",
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      preload: path.join(__dirname, "preload.js")
    }
  });

  mainWindow.once("ready-to-show", () => mainWindow?.show());
  mainWindow.webContents.setWindowOpenHandler(() => ({ action: "deny" }));

  if (isDevelopment) {
    void mainWindow.loadURL(devServerUrl);
    mainWindow.webContents.openDevTools({ mode: "detach" });
  } else {
    void mainWindow.loadFile(path.join(__dirname, "../dist/index.html"));
  }

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
};

const singleInstance = app.requestSingleInstanceLock();
if (!singleInstance) {
  app.quit();
} else {
  app.on("second-instance", () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });

  app.whenReady().then(() => {
    app.setAppUserModelId("com.dcmspro.desktop");
    configureSecurity();
    databaseStatus = initializeDatabase(app.getPath("userData"), path.join(app.getAppPath(), "database", "migrations"));
    ipcMain.handle("app:get-info", () => getAppInfo());
    ipcMain.handle("db:get-status", () => getDatabaseStatus());
    createWindow();
  });

  app.on("window-all-closed", () => {
    app.quit();
  });
}

export const getAppInfo = () => ({
  name: "DCMS Pro",
  version: app.getVersion(),
  environment: isDevelopment ? "development" as const : "production" as const
});

export const getDatabaseStatus = () => databaseStatus;
