import { contextBridge } from "electron";

// Expose safe APIs to the renderer process
contextBridge.exposeInMainWorld("electronAPI", {
  platform: process.platform,
  versions: {
    node: process.versions.node,
    chrome: process.versions.chrome,
    electron: process.versions.electron,
  },
});

// TypeScript types for the exposed API
export interface ElectronAPI {
  platform: string;
  versions: {
    node: string;
    chrome: string;
    electron: string;
  };
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
