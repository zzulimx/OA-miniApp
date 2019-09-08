// pages/notesitem/notesitem.js
//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isloading: true,
    article: {},
    timer: undefined
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let articleData = app.towxml.toJson(options.content, 'markdown');
    this.setData({
          article: articleData,
          isloading: false
        });
        console.log(options);
    // const _ts = this;

    // wx.getFileSystemManager().readFile({  //读取文件
    //   filePath: '/pages/notesitem/demo.md',
    //   encoding: 'utf-8',
    //   success: res => {
    //     let articleData = app.towxml.toJson(res.data, 'markdown');
    //     _ts.setData({
    //       article: articleData,
    //       isloading: false
    //     });
    //   },
    //   fail: console.error
    // });
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