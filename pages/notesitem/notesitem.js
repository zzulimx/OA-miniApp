// pages/notesitem/notesitem.js
//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'', //当前索引
    title:'',  //当前笔记标题
    isloading: true,
    article: {},  //当前笔记编译后日容
    content:'',  //未编译md内容
    timer: undefined
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id;
    let title = options.title;
    wx.setNavigationBarTitle({
      title: title
    })
    let articleData = app.towxml.toJson(options.content, 'markdown');
    this.setData({
          id:id,
          title:title,
          article: articleData,
          content:options.content,
          isloading: false
        });
  },
  toedit:function(){
    // /pages/notesedit / notesedit & content='+this.data.content+' & title='+this.data.title,
   wx.navigateTo({
     url: '/pages/notesedit/notesedit?content=' + this.data.content + ' &title=' + this.data.title+'&id='+this.data.id
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
    wx.setNavigationBarTitle({
      title:this.data.title
    })
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