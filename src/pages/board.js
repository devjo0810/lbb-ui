window.addEventListener('DOMContentLoaded', () => {
  const CONFIG = {
    DETAIL_DISPLAY_COUNT: 5, // 상세 지사 화면 갯수
  }
  let state = {
    totalDuration: 0,
    detailDuration: 0,
    regionItems: []
  }
  let showId = 0
  // showId: dom에서 보여줄 id값, duration: 보여줄 시간값
  let durationList = []

  const lbbBoardApp = $('#lbb_board_app')

  function getShowId() {
    return showId++
  }
  
  function addDuration(duration) {
    durationList.push({
      showId: getShowId(),
      duration
    })
  }

  function addTotalDisplay() {
    $(lbbBoardApp).append(`
      <div>Total Display</div>
    `)
    addDuration(state.totalDuration)
  }

  function addDetailDisplay(items) {
    let detailDisplayItems = '';
    for (let item of items) {
      detailDisplayItems = detailDisplayItems + `
        <div id="${item.value}">${item.name}</div>
      `
    }
    $(lbbBoardApp).append(`
      <div>
        <h3>Detail Display</h3>
        ${detailDisplayItems}
      </div>
    `)
    addDuration(state.detailDuration)
  }

  function initHandler(stateVal) {
    state = stateVal

    addTotalDisplay()
    const regionItems = state.regionItems
    for (let i=0; i<regionItems.length; i = i + CONFIG.DETAIL_DISPLAY_COUNT) {
      const items = regionItems.slice(i,  i + CONFIG.DETAIL_DISPLAY_COUNT)
      addDetailDisplay(items)
    }
    console.log(durationList)
  }
  
  function receiveMessage(e) {
    const message = e.data.message
    switch (message) {
      case 'init': {
        initHandler(e.data.data)
        break
      }
    }
  }
  
  window.addEventListener('message', receiveMessage, false)
  window.opener.postMessage({ message: 'init' })
})