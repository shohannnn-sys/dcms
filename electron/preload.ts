import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("dcms", {
  getAppInfo: () => ipcRenderer.invoke("app:get-info"),
  getDatabaseStatus: () => ipcRenderer.invoke("db:get-status")
});
