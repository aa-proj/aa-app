
import {join} from "path";

process.env.DIST_ELECTRON = join(__dirname, '..')
process.env.DIST = join(process.env.DIST_ELECTRON, '../dist')
process.env.PUBLIC = app.isPackaged ? process.env.DIST : join(process.env.DIST_ELECTRON, '../public')

import {app, BrowserWindow} from 'electron'
import {release} from 'os'
import {autoUpdater} from "electron-updater"
import {registerUpdateEvent} from "./updater";
import {MainWindow} from "./window/mainWindow";
import {registerIpcHandler} from "./ipcHandler";
import {SplashWindow} from "./window/splash";

// Windows7はハードウェアアクセラレーションをオフにする
if (release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

let mainWindow: MainWindow | null = null
let splashWindow: SplashWindow | null = null

// ElectronがReadyの時 EntryPoint
app.on('ready', async function () {
  // IpcHandlerを登録
  registerIpcHandler()

  // 起動画面
  // splashWindow = new SplashWindow()
  splashWindow = new SplashWindow()

  registerUpdateEvent()
  if(!(await autoUpdater.checkForUpdates())) {
    setTimeout(() => {
      splashWindow.window.close()
      mainWindow = new MainWindow()
    }, 3000)
  }

});

const launchMain = () => {
  splashWindow.window.close()
  mainWindow = new MainWindow()
}

// TODO タスクトレイに入れたい
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

export {mainWindow, splashWindow, launchMain}



