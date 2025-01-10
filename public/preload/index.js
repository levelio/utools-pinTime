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
  openTimeWindow(type, opt) {
    const fontSize = opt.fontSize || 24
    const width = fontSize * 6
    const height = fontSize * 2
    const timeWin = window.utools.createBrowserWindow(
      getWindowUrl(type, opt),
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
    if (key === 'font-size') {
      this.changeFontSize(id, value)
    }
    ipcRenderer.sendTo(id, `change-style-${key}`, value)
  },
  changeFontSize(id, value) {
    const win = getWindow(id)
    if (win) {
      win.setSize(value * 5, value * 2)
    }
  },
  changeIgnoreMouseEvents(id, value) {
    const win = getWindow(id)
    if (win) {
      win.setIgnoreMouseEvents(value)
    }
  },
  changeIgnoreAllWindowMouseEvents(value) {
    const bridgeKeys = idBridge.values()
    for (const bridgeKey of bridgeKeys) {
      const win = winMap.get(bridgeKey)
      if (win && !win.isDestroyed()) {
        win.setIgnoreMouseEvents(value)
      }
    }
  },
  closeWindow(id) {
    const win = getWindow(id)
    if (win) {
      win.close()
    }
  },
  closeAllWindows() {
    const bridgeKeys = idBridge.values()
    for (const bridgeKey of bridgeKeys) {
      const win = winMap.get(bridgeKey)
      if (win && !win.isDestroyed()) {
        win.close()
      }
    }
  },
}

function getWindowUrl(type, opt) {
  const color = encodeURIComponent(opt.fontColor || 'red')
  const size = `${opt.fontSize || 24}px`
  const WINDOW_URL_MAP = {
    timing: `timing.html?c=${color}&s=${size}`,
    countdown: `countdown.html?c=${color}&v=${opt.countdown}&s=${size}`,
    date: `date.html?c=${color}&s=${size}`,
  }
  return WINDOW_URL_MAP[type]
}

function getWindow(id) {
  const win = winMap.get(idBridge.get(id))
  if (win && !win.isDestroyed()) {
    return win
  }
  return null
}
