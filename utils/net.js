var requestHandler = {
  params: {},
  API_URL: '',
  token: '',
  success: function(res) {
    // success  
  },
  fail: function() {
    // fail  
  },
}

//GET请求  
function GET(requestHandler) {
  request('GET', requestHandler)
}
//POST请求  
function POST(requestHandler) {
  request('POST', requestHandler)
}

function request(method, requestHandler) {
  //注意：可以对params加密等处理  
  var API_URL = requestHandler.API_URL;
  if (API_URL != '' && API_URL != null && API_URL != 'undefined'){
    var params = requestHandler.params || {};
    var userToken = wx.getStorageSync('userToken');
    wx.request({
      url: `http://localhost:8888/${API_URL}`,
      data: params,
      method: method,
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'userToken': userToken
      }, // 设置请求的 header  
      success: function (res) {
        var SESSIONSTATUS = res.header.SESSIONSTATUS;
        if (SESSIONSTATUS != '' && SESSIONSTATUS != null && SESSIONSTATUS != 'undefined') {
          if (SESSIONSTATUS == "TIMEOUT") { //超时跳转
            wx.showToast({
              title: 'session失效，请重新授权。',
              icon: 'loading',
              duration: 2000
            });
            var i = setInterval(
              function () {
                wx.reLaunch({
                  url: '/pages/login/login',
                })
                clearInterval(i);
              }, 2000);
          } else if (sessionstatus == "NOAUTHPOINT") {
            wx.showToast({
              title: '您不具备该权限。',
              icon: 'loading',
              duration: 2000
            });
          }
        }else{
          //注意：可以对参数解密等处理  
          requestHandler.success(res.data)
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '请求失败',
          icon: 'loading',
          duration: 2000
        });
      },
      complete: function () { }
    })
  }
}

module.exports = {
  GET: GET,
  POST: POST
}