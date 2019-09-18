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
    }],
    ismsgNum:true,  //消息是否查看
    msglist:[
      {
        msgSender:'像风向自由',
        msgContent:'你好，我是李四！',
        msgTime:'下午7:22',
        isMsgNum:true,
        msgNum:8,
        avatar:'../../images/avatar/avatar.jpg'
      },
      {
        msgSender: '翰墨',
        msgContent: '想问一下，有南校区的选北校区的英语课要换的吗',
        msgTime: '下午7:22',
        isMsgNum: false,
        msgNum: 3,
        avatar:'../../images/avatar/avatar3.jpg'
      },
      {
        msgSender: 'Oliver',
        msgContent: '你好，我是Oliver！',
        msgTime: '下午7:22',
        isMsgNum: false,
        msgNum: 1,
        avatar: '../../images/avatar/avatar2.jpg'
      }
    ]
  },

  onLoad: function() {
    if (wx.getStorageSync('userInfo')) {
      this.setData({
        userInfo: wx.getStorageSync('userInfo')
      })
    }
    // 初次打开 导航栏加载 
    wx.showNavigationBarLoading() 
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
  toChat: function (event) {
    wx.navigateTo({
      url: '../chat/chat',
    });
    var that=this;
    // 消息状态变为已查看
    setTimeout(function(){
      let idx = event.currentTarget.dataset.id;
      let temp = 'msglist[' + idx + '].isMsgNum';  // msglist[idx].ismsgNum
      that.setData({
        [temp]: true
      })
    },1000)
   
  },
  /**
 * 页面相关事件处理函数--监听用户下拉动作
 */
  onPullDownRefresh: function () {
    var that = this;
    wx.showNavigationBarLoading() //在标题栏中显示加载
    //模拟加载
    setTimeout(function () {
     
    // 测试代码
    let newlist=[...that.data.msglist];
      that.setData({
        msglist:that.data.msglist.concat(newlist)
      })
      // 加载完成
      wx.showToast({
        title: '刷新完成',
        icon: 'success',
        duration: 1000
      });
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
       
    }, 1000);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },


/**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 渲染完成 停止加载
    setTimeout(function(){
      wx.hideNavigationBarLoading() 
    },1000)
  } 
})