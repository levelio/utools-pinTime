let index = 0

window.services = {
  // 显示时间窗口
  showTimeWindow() {
    console.log('index:', index++)
    const fontSize = 24
    const width = fontSize * 5
    const height = fontSize * 2
    const { width: screenWidth, height: screenHeight } = window.services.getScreenSize()
    const x = (screenWidth - width) / 2
    const y = (screenHeight - height) / 2

    const timeWin = window.utools.createBrowserWindow(
      'container.html',
      {
        x,
        y,
        width,
        height,
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
        },
      },
      () => {
        // @ts-ignore
        timeWin.setAlwaysOnTop(true, 'screen-saver')
        timeWin.setVisibleOnAllWorkspaces(true, {
          visibleOnFullScreen: true,
        })
        // timeWin.webContents.openDevTools()
        // timeWin.setIgnoreMouseEvents(true)

        if (window.utools.isMacOS()) {
          timeWin.setLevel(2147483647) // 设置最高级别
        }
      },
    )
  },
  getScreenSize: () => {
    const currentWindow = window.utools.getPrimaryDisplay()
    return {
      width: currentWindow.bounds.width,
      height: currentWindow.bounds.height,
    }
  },
}
