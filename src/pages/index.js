window.addEventListener('DOMContentLoaded', () => {
  const CONFIG = {
    OPTION_DEFAULT_VALUE: 1,
    TOTAL_DURATION: 5,          // 통합화면에 표시될 숫자 갯수
    TOTAL_DURATION_DEFAULT: 3,  // 통합화면에 기본 적용할 값
    DETAIL_DURATION: 10,        // 세부화면에 표시될 숫자 갯수
    DETAIL_DURATION_DEFAULT: 10,// 세부화면에 기본 적용할 값
    REGION_DISPLAY: 'name',     // 지사명 표시 키값
    REGION_VALUE: 'name',       // 지사 고유 key값
    BOARD_WINDOW_NAME: 'board', // 전광판 window명
  }

  let boardWin;

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
          <div class="flex"><input type="checkbox" class="region_checkbox" name="region_${obj[value]}" id="region_${obj[value]}"></div>
          <div class="flex"><span>${obj[display]}</span></div>
        </div>
      `
    }
    return items
  }

  const openBoardWindow = (boardWindowName = CONFIG.BOARD_WINDOW_NAME) => {
    const { width, height } = screen
    return window.open('./board.html', boardWindowName, `width=${width}, height=${height}, fullscreen=yes`)
  }

  // 전체선택 버튼 클릭
  $(allSelectBtn).on('click', () => {
    console.log('allSelectBtn click')
    $('.region_checkbox').prop('checked', true)
  })
  
  // 전체선택 취소 버튼 클릭
  $(allSelectCancelBtn).on('click', () => {
    console.log('allSelectCancelBtn click')
    $('.region_checkbox').prop('checked', false)
  })

  // 전광판 실행 버튼 클릭
  $(billboardLaunchBtn).on('click', () => {
    const checkedItems = $('.region_checkbox:checked')
    const totalDuration = $(totalDurationSel).val()
    const detailDuration = $(detailDurationSel).val()

    boardWin = openBoardWindow()

    console.log('체크항목 :', checkedItems)
    console.log('통합화면 :', totalDuration)
    console.log('세부화면 :', detailDuration)
  })

  // 종료 버튼 클릭
  $(quitBtn).on('click', () => {
    const isQuit = window.confirm('전광판을 종료하시겠습니까?')
    if (isQuit) {
      window.ipcAPI.quit()
    }
  })

  const sampleBodyItems = [
    { name: '서울' },
    { name: '부산' },
    { name: '인천' },
    { name: '안양' },
    { name: '부천' },
    { name: '포천' },
    { name: '과천' },
    { name: '시흥' },
    { name: '수원' },
    { name: '평택' },
    { name: '천안시' },
    { name: '아산' },
    { name: '광주' },
    { name: '포항' },
    { name: '가평' },
    { name: '하남' },
    { name: '성남' },
    { name: '강릉' },
    { name: '제주' },
    { name: '이천' },
    { name: '여수' },
    { name: '판교' },
  ]

  $(regionSelectBody).append(getRegionBodyItems(sampleBodyItems))
  $(totalDurationSel).append(getOptionsByNum(CONFIG.TOTAL_DURATION, CONFIG.TOTAL_DURATION_DEFAULT))
  $(detailDurationSel).append(getOptionsByNum(CONFIG.DETAIL_DURATION, CONFIG.DETAIL_DURATION_DEFAULT))

})