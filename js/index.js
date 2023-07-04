;(function () {
  // 从服务器获取的抽奖信息
  var data = {
    raffleTimes: 5,
    prizes: [
      { name: 'IphoneX', img: './img/prize_1.png' },
      { name: '现金50元', img: './img/prize_2.png' },
      { name: 'HUAWEI', img: './img/prize_3.png' },
      { name: '现金10元', img: './img/prize_4.png' },
      { name: '谢谢参与', img: './img/prize_5.png' },
      { name: '手机优惠券', img: './img/prize_6.png' },
      { name: '电脑优惠券', img: './img/prize_7.png' },
      { name: 'U盘', img: './img/prize_8.png' }
    ]
  }
  // 获取需要操作的DOM元素
  var prizeContainer = document.querySelector('.prize-container')
  var numberTxt = document.querySelector('.number-txt')
  var controllerRight = document.querySelector('.controller-right')
  var maskerDialog = document.querySelector('.masker-dialog')
  var content = maskerDialog.querySelector('.content')
  var confirmBtn = maskerDialog.querySelector('.confirm-btn')
  var close = maskerDialog.querySelector('.close')
  // 定义初始化函数
  var init = function () {
    // 创建奖品列表
    for (var i = 0; i < data.prizes.length; i++) {
      var prize = document.createElement('div')
      var img = document.createElement('img')
      var span = document.createElement('span')
      prize.className = 'prize-list'
      img.src = data.prizes[i].img
      span.innerHTML = data.prizes[i].name
      prize.append(img, span)
      prizeContainer.append(prize)
    }
    // 初始化可抽奖次数
    numberTxt.innerHTML = data.raffleTimes
    // 初始化事件注册
    initRegistEvents()
  }
  // 事件处理函数
  var eventHandlers = {
    // 开始抽奖按钮事件
    startRaffle(e) {
      raffle()
    },
    // 遮罩层X按钮事件
    closeMasker() {
      maskerDialog.style.display = 'none'
    },
    // 遮罩层再来一次按钮事件
    raffleAgain() {
      raffle()
      maskerDialog.style.display = 'none'
    }
  }
  // 初始化事件注册函数
  function initRegistEvents() {
    controllerRight.addEventListener('click', eventHandlers.startRaffle)
    close.addEventListener('click', eventHandlers.closeMasker)
    confirmBtn.addEventListener('click', eventHandlers.raffleAgain)
  }
  // 随机数函数
  function getRadom(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
  }
  // 抽奖动画函数
  var _timer
  function _raffleAnimation(index) {
    if (_timer) {
      return
    }
    // 随机轮转次数
    var times = getRadom(1, 6) * data.prizes.length + index + 1
    // 当前轮转索引
    var curIndex = 0
    _timer = setInterval(function () {
      if (times <= 0) {
        clearInterval(_timer)
        _timer = null
        if (data.prizes[index].name === '谢谢参与') {
          content.innerHTML = '很遗憾，你没能中奖！'
        } else {
          content.innerHTML = '恭喜你！你抽中了' + data.prizes[index].name
        }
        confirmBtn.innerHTML = data.raffleTimes <= 0 ? '确定' : '再来一次'
        maskerDialog.style.display = 'block'
        return
      }
      times--
      for (var i = 0; i < prizeContainer.children.length; i++) {
        prizeContainer.children[i].classList.remove('active')
      }
      prizeContainer.children[curIndex].classList.add('active')
      curIndex++
      if (curIndex >= data.prizes.length) {
        curIndex = 0
      }
    }, 50)
  }
  // 抽奖函数
  function raffle() {
    if (data.raffleTimes <= 0) {
      return
    }
    // 抽奖动画未结束不能再次抽奖
    if (_timer) {
      return
    }
    data.raffleTimes--
    numberTxt.innerHTML = data.raffleTimes
    // 从服务器获得奖品
    var index = getRadom(0, data.prizes.length)
    _raffleAnimation(index)
  }
  init()
})()
