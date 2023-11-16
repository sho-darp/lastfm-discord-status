import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
  Sample: async (value: string) => await ipcRenderer.invoke("Sample", value),
});
