// pages/chat/chat.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    waitSend:false,
    voiceBtn:true,
    inp_width:'64%',
    icon_width: '20%',
    voiceText:"按住 说话",
    voiceBg:"#fff",
    currtime:"9月2号 下午3:00"
    // keyboardHeight:0
  },
  // 切换按钮
  // 发送
  inputTyping:function(event){
    
    if (event.detail.value.length!==0){
         this.setData({
           waitSend:true,
           inp_width: '58%',
           icon_width: '25%'
         })
     }
     if(event.detail.value.length === 0){
      this.setData({
        waitSend: false,
         inp_width: '64%',
        icon_width: '20%'
      })
     }
  },
  // 语音
  switchVoice:function(){
     if(this.data.voiceBtn){
       this.setData({
         voiceBtn: false
       })
     }else{
       this.setData({
         voiceBtn: true
       })
     }
  },
  // 表情
  emojiBtn:function(){
    // wx.onKeyboardHeightChange(res => {
    //   this.setData({
    //     keyboardHeight:res.height
    //   })
    //   console.log(res.height)
    // })
  },
  // 按住说话
  holdVoice:function(){
      this.setData({
        voiceText: "松开 结束",
        voiceBg:"#ddd"
      })
  },
  // 松开结束
  releaseVoice:function(){
    this.setData({
      voiceText: "按住 说话",
      voiceBg:"#FFF"
    })
  },
  // 个人信息
  touserinfo:function(){
    wx.navigateTo({
      url: '../userinfo/userinfo',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      // 动态设置导航栏标题
      // let name = options.name;
      let name = "小明"
      wx.setNavigationBarTitle({
        title:name,
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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