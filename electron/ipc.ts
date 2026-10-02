import { ipcMain } from "electron";
import { getAppInfo, getDatabaseStatus } from "./main.js";

export const registerIpc = (): void => {
  ipcMain.handle("app:get-info", () => getAppInfo());
  ipcMain.handle("db:get-status", () => getDatabaseStatus());
};
