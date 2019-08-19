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
    //判断用户是否授权，从缓存中获取微信用户信息
    var userInfo = wx.getStorageSync(that.userInfoKey) || {};
    if (!userInfo.nickName) {
      wx.reLaunch({
        url: "pages/authorization/authorization"
      });
      return;
    }
    //获取微信用户在缓存中存储的openid信息，判断是否正确的获取微信用户的信息
    var user = wx.getStorageSync(that.userKey) || {};
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
              success: function(mation) {
                var obj = {};
                obj.openid = mation.data.openid;
                obj.expires_in = Date.now() + mation.data.expires_in;
                wx.setStorageSync(that.userKey, obj); //存储openid  
                // that.judgeUser();
              }
            });
          } else {
            wx.showToast({
              title: '提示',
              content: '授权失败，请重新授权.',
            });
            wx.reLaunch({
              url: "pages/authorization/authorization"
            });
          }
        }
      });
    }else{

    }
  },
  judgeUser: function () {
    var _thar = this;
    var consoleUser = wx.getStorageSync(_thar.consoleUserKey);
    if (consoleUser == ''){
      //缓存中未存储微信用户与后台用户的绑定信息
      //根据openId判断用户是否绑定后台用户
      var openId = wx.getStorageSync('user').openid;
      network.POST({
        params: { openId: openId },
        API_URL: "/wechat/post/WxSmallProUserMationController/queryUserMationByOpenId",
        success: (res) => {
          if (res.returnCode == 0) {
            wx.setStorageSync(_thar.consoleUserKey, res.bean); //存储openid  
            if (res.bean.userId) {
              //已绑定
            } else {
              //未绑定
              wx.showToast({
                title: '提示',
                content: '您还未绑定用户，请进行绑定.',
              });
              wx.reLaunch({
                url: "../../pages/binglogin/binglogin"
              });
            }
          } else {
            wx.showToast({
              title: '提示',
              content: res.returnMessage,
            });
          }
        }
      })
    }else{
      //缓存中存储了微信用户与后台用户的绑定信息
      if (consoleUser.userId) {
        //已绑定
      } else {
        //未绑定
        wx.showToast({
          title: '提示',
          content: '您还未绑定用户，请进行绑定.',
        });
        wx.reLaunch({
          url: "../../pages/binglogin/binglogin"
        });
      }
    }
  },
  //静态资源访问路径
  appStaticUrl: 'http://192.168.0.113:8085/',
  //微信用户授权后的信息在缓存中存储的key
  userInfoKey: "userInfo",
  //根据code获取的微信用户的信息在缓存中存储的key
  userKey: "user",
  //微信用户的绑定信息在缓存中存储的key
  consoleUserKey: "consoleUser"
})