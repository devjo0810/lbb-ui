window.addEventListener('DOMContentLoaded', () => {
  const CONFIG = {
    OPTION_DEFAULT_VALUE: 1,
    TOTAL_DURATION: 5,          // 통합화면에 표시될 숫자 갯수
    TOTAL_DURATION_DEFAULT: 3,  // 통합화면에 기본 적용할 값
    DETAIL_DURATION: 10,        // 세부화면에 표시될 숫자 갯수
    DETAIL_DURATION_DEFAULT: 10,// 세부화면에 기본 적용할 값
    REGION_DISPLAY: 'name',     // 지사명 표시 키값
    REGION_VALUE: 'key',       // 지사 고유 key값
    BOARD_WINDOW_NAME: 'board', // 전광판 window명
  }

  let boardWin;
  let regionItems;

  // region checkbox body element`
  const regionSelectBody = $('#region_select_body')

  // select elements
  const totalDurationSel = $('#total_duration')
  const detailDurationSel = $('#detail_duration')

  // button elements
  const allSelectBtn = $('#all_select')
  const allSelectCancelBtn = $('#all_select_cancel')
  const billboardLaunchBtn = $('#billboard_launch')
  const quitBtn = $('#quit')

  const getOptionsByNum = (num, defaultValue = CONFIG.OPTION_DEFAULT_VALUE) => {
    let optionList = ''
    for (let i = 1; i<= num; i++) {
      optionList = optionList + `
        <option value=${i}${defaultValue === i ? ' selected' : ''}>${i}</option>
      `
    }
    return optionList
  }

  const getRegionBodyItems = (list, display = CONFIG.REGION_DISPLAY, value = CONFIG.REGION_VALUE) => {
    let items = ''
    for (let obj of list) {
      items = items + `
        <div class="region_select_body_item">
          <div class="flex">
            <input type="checkbox" class="region_checkbox" name="region_${obj[value]}" id="region_${obj[value]}">
          </div>
          <div class="flex"><span>${obj[display]}</span></div>
        </div>
      `
    }
    return items
  }

  const openBoardWindow = (boardWindowName = CONFIG.BOARD_WINDOW_NAME) => {
    const { width, height } = screen
    // const win = window.open('./board.html', boardWindowName, `width=${width}, height=${height}, fullscreen=yes`)
    const win = window.open('./board.html', boardWindowName, `width=${width}, height=${height}`)
    return win
  }

  const sendBoardInit = async () => {
    const state = await ipcAPI.getBoardState()
    boardWin.postMessage({ message: 'init', data: state }, '*')
  }

  const receiveMessage = (e) => {
    const message = e.data.message
    switch (message) {
      case 'init': {
        sendBoardInit()
        break
      }
    }
  }

  // 전체선택 버튼 클릭
  $(allSelectBtn).on('click', () => {
    $('.region_checkbox').prop('checked', true)
  })
  
  // 전체선택 취소 버튼 클릭
  $(allSelectCancelBtn).on('click', () => {
    $('.region_checkbox').prop('checked', false)
  })

  // 전광판 실행 버튼 클릭
  $(billboardLaunchBtn).on('click', () => {
    const checkedItems = $('.region_checkbox:checked')
    const totalDuration = Number($(totalDurationSel).val())
    const detailDuration = Number($(detailDurationSel).val())

    // checkedItems 값이 jquery 객체로 되있어서 map함수가 jquery의 map 함수가 적용되버림
    // 따라서 순수 자바스크립트 배열의 map 을 call 로 구현
    const idList = [].map.call(checkedItems, item => item.id.replace('region_', ''))
    const items = regionItems.filter(item => idList.includes(item[CONFIG.REGION_VALUE]))

    if(!items.length) {
      alert('선택된 지사가 없습니다.')
      return
    }

    ipcAPI.setBoardState('totalDuration', totalDuration)
    ipcAPI.setBoardState('detailDuration', detailDuration)
    ipcAPI.setBoardState('regionItems', items)

    boardWin = openBoardWindow()
  })

  // 종료 버튼 클릭
  $(quitBtn).on('click', () => {
    const isQuit = window.confirm('전광판을 종료하시겠습니까?')
    if (isQuit) {
      window.ipcAPI.quit()
    }
  })

  // window popup간 메세지 통신용
  window.addEventListener('message', receiveMessage, false)

  const sampleBodyItems = [
    { key: 'a1', name: '서울' },
    { key: 'a2', name: '부산' },
    { key: 'a3', name: '인천' },
    { key: 'a4', name: '안양' },
    { key: 'a5', name: '부천' },
    { key: 'a6', name: '포천' },
    { key: 'a7', name: '과천' },
    { key: 'a8', name: '시흥' },
    { key: 'a9', name: '수원' },
    { key: 'a10', name: '평택' },
    { key: 'a11', name: '천안시' },
    { key: 'a12', name: '아산' },
    { key: 'a13', name: '광주' },
    { key: 'a14', name: '포항' },
    { key: 'a15', name: '가평' },
    { key: 'a16', name: '하남' },
    { key: 'a17', name: '성남' },
    { key: 'a18', name: '강릉' },
    { key: 'a19', name: '제주' },
    { key: 'a20', name: '이천' },
    { key: 'a21', name: '여수' },
    { key: 'a22', name: '판교' },
  ]
  regionItems = sampleBodyItems

  $(regionSelectBody).append(getRegionBodyItems(regionItems))
  $(totalDurationSel).append(getOptionsByNum(CONFIG.TOTAL_DURATION, CONFIG.TOTAL_DURATION_DEFAULT))
  $(detailDurationSel).append(getOptionsByNum(CONFIG.DETAIL_DURATION, CONFIG.DETAIL_DURATION_DEFAULT))

})