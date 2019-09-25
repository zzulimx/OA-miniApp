//获取应用实例
const app = getApp()
//我的信息
Page({
  data: {
    userInfo: {},
    list: []
  },

  onLoad: function() {
    if (wx.getStorageSync('userInfo')) {
      this.setData({
        userInfo: wx.getStorageSync('userInfo')
      });
    }
  },

  toMyMore: function(event) {
    let url = event.currentTarget.dataset.url
    if (url) {
      wx.navigateTo({
        url: url,
      });
    } else {
      wx.showModal({
        title: '提示',
        content: '功能还在开发中....',
      });
    }
  },

})