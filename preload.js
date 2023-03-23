const { contextBridge, ipcRenderer } = require('electron')

function pingInvoker () {
  return ipcRenderer.invoke('ping')
}

function toggleDevToolsInvoker () {
  return ipcRenderer.invoke('toggleDevTools')
}

// ipcMain과 ipcRenderer 사이에 통신 브릿지 역할을 정의
// window.ipcAPI.{key} 형식을 통해 사용
contextBridge.exposeInMainWorld('ipcAPI', {
  ping: pingInvoker,
  toggleDevTools: toggleDevToolsInvoker,
})