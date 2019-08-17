//app.js
var network = require("utils/net.js");
App({
  globalData: {
    appid: 'wxd92f240a055ca992', //appid需自己提供
    secret: 'c592080d3ada93d7979006af3d3c9129', //secret需自己提供
    token: 'weixinCourse'
  },
  onLaunch: function() {
    var that = this;
    var userInfo = wx.getStorageSync('userInfo') || {};
    if (!userInfo.nickName) {
      wx.reLaunch({
        url: "pages/authorization/authorization"
      });
    }
    var user = wx.getStorageSync('user') || {};
    if ((!user.openid || (user.expires_in || Date.now()) < (Date.now() + 600))) {
      wx.login({
        success: function(res) {
          if (res.code) {
            var d = that.globalData; //这里存储了appid、secret、token串
            var l = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + d.appid + '&secret=' + d.secret + '&js_code=' + res.code + '&grant_type=authorization_code';
            wx.request({
              url: l,
              data: {},
              method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
              // header: {}, // 设置请求的 header  
              success: function(mation) {
                var obj = {};
                obj.openid = mation.data.openid;
                obj.expires_in = Date.now() + mation.data.expires_in;
                wx.setStorageSync('user', obj); //存储openid  
                that.judgeUser();
              }
            });
          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }
        }
      });
    }
  },
  judgeUser: function () {
    var openId = wx.getStorageSync('user').openid;
    network.POST({
      params: { openId: openId },
      API_URL: "wxsmallprousermation001",
      success: (res) => {
        console.log(res)
      }
    })
  },
  //静态资源访问路径
  appStaticUrl: 'http://192.168.0.113:8085/'
})