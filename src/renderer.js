window.addEventListener('DOMContentLoaded', () => {

  const KEY_CODE = {
    F12: 'F12',
  }
  
  document.addEventListener('keydown', (e) => {
    let key = e.key
    
    if (key === KEY_CODE.F12) {
      window.ipcAPI.toggleDevTools()
    }
  })

  const ipcPingTest = async () => {
    const response = await window.ipcAPI.ping()
    console.log('ipcAPI ping : ' + response) // prints out 'pong'
  }
  
  const _common = {}
  window._common = _common

  ipcPingTest()
})
