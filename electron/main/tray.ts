import {app, Tray, Menu} from 'electron'
import {createMain, launchMain, mainWindow} from "./index";

const imageFilePath = './public/favicon.ico'

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
