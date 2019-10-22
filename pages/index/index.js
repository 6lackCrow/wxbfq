Page({

  /**
   * 页面的初始数据
   */
  data: {
    item:0,
    tab:0,
    playlist:[
      { id: 1, title: 'Red Roses', singer: 'Lil skies', src:'http://localhost:3000/music/RedRoses.mp3',coverImgUrl:'/images/cover.jpg'},
      { id: 2, title: 'Lucid Dream', singer: 'Juice Wrld', src:'http://localhost:3000/music/LucidDream.mp3',coverImgUrl:'/images/cover.jpg'},
      { id: 3, title: 'Nowadays', singer: 'Lil Skies', src:'http://localhost:3000/music/Nowadays.mp3',coverImgUrl:'/images/cover.jpg'},
      { id: 4, title: 'History', singer: 'Rich Brain', src:'http://localhost:3000/music/History.mp3',coverImgUrl:'/images/cover.jpg'},
    ],
    state:'paused',
    playIndex:0,
    play:{
      currentTime:'00:00',
      duration:'00:00',
      percent:0,
      title:'',
      singer:'',
      coverImgUrl:'/images/cover.jpg',
    }
  },


  changeItem: function (e) {
    this.setData({
      item:e.target.dataset.item,
    })
  },

  changeTab: function (e) {
    this.setData({
      tab:e.detail.current
    })
  },

  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  audioCtx:null,
  onReady: function () {
    this.audioCtx = wx.createInnerAudioContext()
    this.setMusic(0)
    var that = this
    this.audioCtx.onError(function () {
      console.log('播放失败：' + that.audioCtx.src)
    })
    this.audioCtx.onEnded(function () {
      that.next()
    })
    this.audioCtx.onPlay(function () { })
    this.audioCtx.onTimeUpdate(function () {
      that.setData({
        'play.duration': formatTime(that.audioCtx.duration),
        'play.currentTime': formatTime(that.audioCtx.currentTime),
        'play.percent': that.audioCtx.currentTime / that.audioCtx.duration * 100
      })
    })
    function formatTime(time) {
      var minute = Math.floor(time / 60) % 60;
      var second = Math.floor(time) % 60
      return (minute < 10 ? '0' + minute : minute) + ':' + (second < 10 ? '0' + second:second)
    }
  },


  setMusic: function (index) {
    var music = this.data.playlist[index]
    this.audioCtx.src = music.src
    this.setData({
      playIndex: index,
      'play.title': music.title,
      'play.singer': music.singer,
      'play.coverImgUrl': music.coverImgUrl,
      'play.currentTime': '00:00',
      'play.duration': '00:00',
      'play.percent': 0
    })
  },

  play: function () {
    this.audioCtx.play()
    this.setData({
      state: 'running'
    })
  },

  pause: function () {
    this.audioCtx.pause()
    this.setData({
      state: 'paused'
    })
  },

  next: function () {
    var index = this.data.playIndex >= this.data.playlist.length - 1 ? 0 : this.data.playIndex + 1
    this.setMusic(index)
    if (this.data.state === 'running') {
      this.play()
    }
  },

  sliderChange: function (e) {
    var second = e.detail.value * this.audioCtx.duration / 100
    this.audioCtx.seek(second)
  },

  change: function (e) {
    this.setMusic(e.currentTarget.dataset.index)
    this.play()
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})