// pages/fileitem/fileitem.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     filelist:'' //文件列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 子文件
    let filelist =JSON.parse(options.filelist);
    // 父文件名
    let navTitle = options.navTitle;
          // 设置导航栏名
    wx.setNavigationBarTitle({
      title: navTitle,
    });
    // 设置当前文件
    if(filelist.length<=0){
      this.setData({
        filelist:[]
      })
    }else{
      this.setData({
        filelist: filelist
      })
    }
  },
  // 打开子文件
  fileitemTo:function(event){
    // 获取当前索引
    let idx = event.currentTarget.dataset.idx;
    // 获取当前文件名字
    let currName = this.data.filelist[idx].name;
    // 先判断文件类型
    let type = event.currentTarget.dataset.type;
    if(type === 'folder'){
      // 获取当前文件夹子文件
      let newlist = JSON.stringify(this.data.filelist[idx].data); 
      wx.navigateTo({
        url: '/pages/fileitem/fileitem?filelist=' + newlist + '&navTitle=' + currName,
      })
    }else if(type === 'image'){
      let imgSrc = this.data.filelist[idx].icon;
      wx.navigateTo({
        url: '/pages/imgdisplay/imgdisplay?imgSrc=' + imgSrc + '&navTitle=' + currName
      })
    }
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