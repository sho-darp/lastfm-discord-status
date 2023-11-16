import { app, BrowserWindow, dialog, Menu, nativeImage, Tray } from "electron";
import { AddIPCMainHandle } from "./ipc";
import { RichPresenceUpdator } from "./rich-presence-updator";
import { GetUserName } from "./store";

let mainWindow: BrowserWindow;

const TITLE = "Lastfm Discord Status";

function createWindow() {
  if (process.platform === "darwin") {
    app.dock.hide();
  }

  const img = nativeImage.createFromPath(__dirname + "/assets/tray.png");
  const tray = new Tray(img);
  tray.setToolTip(TITLE);
  updateTray(tray);

  AddIPCMainHandle();

  const username = GetUserName();
  const rpu = new RichPresenceUpdator(username);

  rpu.SetNowPlayingEvent((track) => {
    updateTray(tray, track);
  });

  rpu.SetStoppedPlayingEvent((track) => {
    updateTray(tray);
  });

  new Promise(() => {
    rpu.Start();
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
});

function updateTray(tray: Tray, track?: Track) {
  const nowPlaying:
    (Electron.MenuItem | Electron.MenuItemConstructorOptions)[] = track != null
      ? [
        { label: "Now Playing", enabled: false },
        { label: `Title  : ${track.name}`, enabled: false },
        { label: `Artist : ${track.artist["#text"]}`, enabled: false },
        { label: `Album  : ${track.album["#text"]}`, enabled: false },
      ]
      : [];

  nowPlaying.push({ type: "separator" });

  tray.setContextMenu(Menu.buildFromTemplate([
    ...nowPlaying,
    {
      label: "Settings",
    },
    { type: "separator" },
    { label: "Quit", role: "quit" },
  ]));
}
