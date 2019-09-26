// pages/punch/punch.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["上下班打卡", "外出打卡"],
    sliderLeft: 0,  //控制导航底部样式
    activeIndex: 0,//展示选项卡页面，默认上下班打卡
    userInfo: {},  //用户登录信息
    signature:"年轻是咱们唯一有权利去编织梦想的的时光", //签名
  },
  // 页面加载
  onLoad: function (options) {
    // 设置导航栏底部滚动条
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: "10%"
        });
      }
    });
    // 获取用户信息
    if (wx.getStorageSync('userInfo')) {
      this.setData({
        userInfo: wx.getStorageSync('userInfo')
      });
    }
  },
  //点击切换选项卡
  tabClick: function (e) {
    let currIndex = parseInt(e.currentTarget.id);
    this.setData({
      sliderLeft: e.currentTarget.id * 50 + 10 + '%',
      activeIndex: e.currentTarget.id,
    });
  },
  //滑动切换选项卡
  swiperTab: function (e) {
    let currIndex = parseInt(e.detail.current);
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: currIndex * 50 + 10 + '%',
          activeIndex: currIndex
        });
      }
    });
  },
  toLocate:function(){
    wx.navigateTo({
      url: '../locate/locate',
    })
  }
})