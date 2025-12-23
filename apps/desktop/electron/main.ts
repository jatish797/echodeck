import { app, BrowserWindow } from "electron";
import * as path from "path";

let mainWindow: BrowserWindow | null = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
    title: "EchoDeck",
    show: false,
  });

  // Load a simple HTML page for now
  mainWindow.loadURL(
    "data:text/html;charset=utf-8," +
      encodeURIComponent(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>EchoDeck</title>
        <style>
          body {
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
          }
          .container {
            text-align: center;
          }
          h1 {
            font-size: 48px;
            margin-bottom: 20px;
            animation: fadeIn 1s ease-in;
          }
          p {
            font-size: 24px;
            opacity: 0.9;
          }
          .info {
            font-size: 16px;
            margin-top: 40px;
            padding: 20px;
            background: rgba(255,255,255,0.1);
            border-radius: 8px;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>🚀 EchoDeck</h1>
          <p>Your Desktop App is Running!</p>
          <div class="info">
            <p>Platform: ${process.platform}</p>
            <p>Electron Version: ${process.versions.electron}</p>
            <p>Node Version: ${process.versions.node}</p>
          </div>
        </div>
      </body>
    </html>
  `)
  );

  mainWindow.once("ready-to-show", () => {
    mainWindow?.show();
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
