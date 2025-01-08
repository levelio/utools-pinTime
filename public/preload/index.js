const path = require('node:path')
const { ipcRenderer } = require('electron')

const idBridge = new Map()
const winMap = new WeakMap()
const timeWindownOptions = {
  resizable: false,
  hasShadow: false,
  useContentSize: true,
  skipTaskbar: true,
  minimizable: false,
  maximizable: false,
  fullscreenable: false,
  transparent: true,
  backgroundColor: '#00000000',
  frame: false,
  alwaysOnTop: false,
  webPreferences: {
    devTools: true,
    zoomFactor: 1.0,
    preload: path.join(__dirname, 'time-window.js'),
  },
}

window.services = {
  showTimeWindow() {
    const fontSize = 24
    const width = fontSize * 5
    const height = fontSize * 2
    const timeWin = window.utools.createBrowserWindow(
      'time-window.html',
      { ...timeWindownOptions, width, height },
      () => {
        timeWin.setAlwaysOnTop(true, 'screen-saver')
        timeWin.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true })
        window.utools.isMacOS() && timeWin.setLevel(2147483647)
      },
    )

    const webContentsId = timeWin.webContents.id
    const bridgeKey = {}
    idBridge.set(webContentsId, bridgeKey)
    winMap.set(bridgeKey, timeWin)
    return webContentsId
  },
  changeStyle(id, key, value) {
    console.log('change style:', id, key, value)
    if (key === 'font-size') {
      this.changeFontSize(id, value)
    }
    ipcRenderer.sendTo(id, `change-style-${key}`, value)
  },
  changeFontSize(id, value) {
    const bridge = idBridge.get(id)
    const win = winMap.get(bridge)
    if (win) {
      win.setSize(value * 5, value * 2)
    }
  },
  changeIgnoreMouseEvents(id, value) {
    const bridge = idBridge.get(id)
    const win = winMap.get(bridge)
    if (win) {
      win.setIgnoreMouseEvents(value)
    }
  },
}
