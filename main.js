const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const { SERVER, WINDOW } = require('./config')

let win

function createWindow () {
  const browserWindow = new BrowserWindow({
    // browser config
    width: WINDOW.WIDTH,
    minWidth: WINDOW.MIN_WIDTH,
    height: WINDOW.HEIGHT,
    minHeight: WINDOW.MIN_HEIGHT,
    center: WINDOW.CENTER,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  browserWindow.loadFile(path.join(__dirname, SERVER.INDEX_PATH))

  // Open the DevTools.
  // browserWindow.webContents.openDevTools()

  return browserWindow
}

const boardState = {
  totalDuration: 0,
  detailDuration: 0,
  regionItems: []
}

function pingHandler () {
  return 'pong'
}

function toggleDevToolsHandler () {
  win.webContents.toggleDevTools()
}

function quitHandler () {
  app.quit()
}

function setBoardStateHandler (_, key, value) {
  boardState[key] = value
}

function getBoardStateHandler () {
  return boardState
}

app.whenReady().then(() => {
  win = createWindow()

  // ipcMain event handler mapping
  ipcMain.handle('ping', pingHandler)
  ipcMain.handle('toggleDevTools', toggleDevToolsHandler)
  ipcMain.handle('quit', quitHandler)
  ipcMain.handle('setBoardState', setBoardStateHandler)
  ipcMain.handle('getBoardState', getBoardStateHandler)

  app.on('activate', function () {
    // macOS 처리용
    if (BrowserWindow.getAllWindows().length === 0) {
      win = createWindow()
    }
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
