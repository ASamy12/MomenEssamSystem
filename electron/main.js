const { app, BrowserWindow } = require("electron");
const path = require("path");

async function createWindow() {
  const isDev = await import("electron-is-dev"); // Use dynamic import for ES Module

  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadURL(
    isDev.default
      ? "http://localhost:3000" // Use the default export from the ES module
      : `file://${path.join(__dirname, "../out/index.html")}`
  );
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
