/// <reference types="vite/client" />

interface Window {
  dcms: {
    getAppInfo(): Promise<{ name: string; version: string; environment: "development" | "production" }>;
    getDatabaseStatus(): Promise<{ ok: boolean; schemaVersion: number }>;
  };
}
