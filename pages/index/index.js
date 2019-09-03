//获取应用实例
const app = getApp();
//我的消息
Page({
  data: {
    agentList: [{
      type: '0',
      name: '消息',
      num: 8
    }, {
      type: '1',
      name: '邮件',
      num: 8
    }, {
      type: '2',
      name: '通知',
      num: 8
    }]
  },

  onLoad: function() {
    if (wx.getStorageSync('userInfo')) {
      this.setData({
        userInfo: wx.getStorageSync('userInfo')
      })
    }
  },

  //搜索
  searchMation: function(e) {
    wx.showToast({
      title: '搜索',
      icon: 'succes',
      duration: 1000,
      mask: true
    });
  },

  //我的代办
  myAgent: function(e) {
    wx.navigateTo({
      url: '../myagent/myagent',
    });
  },

  //根据类型查询我的代办
  myAgentByType: function(e) {
    wx.navigateTo({
      url: '../myagent/myagent?type=' + e.currentTarget.dataset.type,
    });
  },
  // 点击用户聊天
  toChat: function () {
    wx.navigateTo({
      url: '../chat/chat',
    })
  }

})