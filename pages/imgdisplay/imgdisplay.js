// pages/imgdisplay/imgdisplay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgSrc:'',  //图片地址
    bgColor:'#fff', //背景色
    isTool:true //图片工具
  },
  // 点击屏幕效果
  imgOperate:function(){
    if (this.data.bgColor==='#fff'){
        this.setData({
          bgColor:'#000',
          isTool:false
        });
        wx.setNavigationBarColor({
          frontColor: '#000000',
          backgroundColor: '#000000',
        })
    }else{
      this.setData({
        bgColor: '#fff',
        isTool: true
      });
      wx.setNavigationBarColor({
        frontColor: '#000000',
        backgroundColor: '#ffffff',
      })
    }
  },
  // 删除图片
  deleteImg:function(){
    wx.showModal({
      title: '图片删除',
      content: '是否删除此图片?',
      confirmText: "删除",
      confirmColor:'red',
      cancelText: "取消",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          console.log('用户点击主操作')
        } else {
          console.log('用户点击辅助操作')
        }
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 设置图片url
      this.setData({
        imgSrc: options.imgSrc
      })
      // 设置导航栏标题
      wx.setNavigationBarTitle({
        title: options.navTitle,
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