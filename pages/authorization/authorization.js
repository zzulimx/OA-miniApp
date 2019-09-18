//index.js
//获取应用实例
const app = getApp();
//授权页面
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  onLoad: function () {
    console.log(app)
  },

  getUserInfo: function (e) {
    var that = this;
    wx.getUserInfo({
      success: function (resUser) {
        var objz = {};
        objz.avatarUrl = resUser.userInfo.avatarUrl;
        objz.nickName = resUser.userInfo.nickName;
        wx.setStorageSync('userInfo', objz); //存储userInfo
        wx.reLaunch({
          url: "../../pages/index/index"
        });
      }
    });
  }

})