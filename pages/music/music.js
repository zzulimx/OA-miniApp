// pages/music/music.js
Page({
  onReady: function (e) {
    const audioItem = wx.createInnerAudioContext()  //初始化createInnerAudioContext接口
    //设置播放地址
    audioItem.src = "http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46";

    //音频进入可以播放状态，但不保证后面可以流畅播放
    audioItem.onCanplay(() => {
      audioItem.duration //类似初始化-必须触发-不触发此函数延时也获取不到
      setTimeout(function () {
        //在这里就可以获取到大家梦寐以求的时长了
        console.log(audioItem.duration);//延时获取长度 单位：秒
      }, 1000)  //这里设置延时1秒获取
    })
    audioItem.play()
  },
  data: {
    playIcon: 'icon-pause',  //播放暂停图标icon-icon_video
  },

  audioPause: function () {
    this.audioCtx.pause()
  },
  audio14: function () {
    this.audioCtx.seek(14)
  },
  audioStart: function () {
    this.audioCtx.seek(0)
  },
  palyPause:function(){
    if (this.data.playIcon ==='icon-pause'){
      this.setData({
        playIcon:'icon-icon_video'
      })
      this.audioCtx.pause();
    }else{
      this.setData({
        playIcon: 'icon-pause'
      })
      this.audioCtx.play();
      
    }
  }
  , onLoad: function (options) {
    
  },

})