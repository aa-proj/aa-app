import {app, Tray, Menu} from 'electron'
import {createMain, launchMain, mainWindow} from "./index";

const imageFilePath = process.platform === 'win32' ? './public/favicon.ico' : './public/favicon.png'

export class TaskTray {
  tray: Tray
  constructor() {
    this.tray = new Tray(imageFilePath)
    this.tray.setToolTip(app.name)
    this.tray.on("double-click", () => {
      createMain()
    })
    const contextMenu = Menu.buildFromTemplate([
      { label: '終了', role: 'quit' }
    ]);
    this.tray.setContextMenu(contextMenu)
  }
}
