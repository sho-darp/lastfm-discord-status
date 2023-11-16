import { ipcMain } from "electron";

export function Sample(event: Electron.IpcMainInvokeEvent, value: string) {
  console.log(value);
  return "World!";
}

export function AddIPCMainHandle() {
  ipcMain.handle("Sample", Sample);
}
