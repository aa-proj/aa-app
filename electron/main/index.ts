import {registerIpcHandler} from "./ipcHandler";

process.env.DIST_ELECTRON = join(__dirname, '..')
process.env.DIST = join(process.env.DIST_ELECTRON, '../dist')
process.env.PUBLIC = app.isPackaged ? process.env.DIST : join(process.env.DIST_ELECTRON, '../public')

import {app, BrowserWindow, shell, ipcMain, dialog} from 'electron'
import {release} from 'os'
import {join} from 'path'
import {autoUpdater} from "electron-updater"
import {registerUpdateEvent} from "./updater";
import {MainWindow} from "./mainWindow";

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

let mainWindow: MainWindow | null = null

ipcMain.handle("test", (event, args) => {
app.on('ready', async function () {
  // IpcHandlerを登録
  registerIpcHandler()

  mainWindow = new MainWindow()

  setTimeout(() => {
    registerUpdateEvent()
    autoUpdater.checkForUpdates();
    mainWindow.log("AutoUpdater Initialized")
  }, 5000)

});

app.on('window-all-closed', () => {
  mainWindow.window = null
  if (process.platform !== 'darwin') app.quit()
})

app.on('second-instance', () => {
  if (mainWindow.window) {
    // Focus on the main window if the user tried to open another
    if (mainWindow.window.isMinimized()) mainWindow.window.restore()
    mainWindow.window.focus()
  }
})

app.on('activate', () => {
  // Mac用
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length) {
    allWindows[0].focus()
  } else {
    mainWindow = new MainWindow()
  }
})

// New window example arg: new windows url
// ipcMain.handle('open-win', (event, arg) => {
//   const childWindow = new BrowserWindow({
//     webPreferences: {
//       preload,
//       nodeIntegration: true,
//       contextIsolation: false,
//     },
//   })
//
//   if (process.env.VITE_DEV_SERVER_URL) {
//     childWindow.loadURL(`${url}#${arg}`)
//   } else {
//     childWindow.loadFile(indexHtml, { hash: arg })
//   }
// })




