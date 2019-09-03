//获取应用实例
const app = getApp();
//通讯录
Page({
  data: {
    isHiddenToast: true,
    messages: [{
        id: '1',
        groupName: "我的好友",
        icon: "/images/close.png",
        number: "41/53",
        showList: 0,
      },
      {
        id: '2',
        groupName: "三年情",
        icon: "/images/close.png",
        number: "4/10",
        showList: 0,
      },
      {
        id: '3',
        groupName: "十年友",
        icon: "/images/close.png",
        number: "10/20",
        showList: 0,
      },
      {
        id: '4',
        groupName: "前端开发组",
        icon: "/images/close.png",
        number: "10/22",
        showList: 0,
      },
      {
        id: '5',
        groupName: "后台开发组",
        icon: "/images/close.png",
        number: "4/9",
        showList: 0,
      },
      {
        id: '6',
        groupName: "微信小程序",
        icon: "/images/close.png",
        number: "12/13",
        showList: 0,
      },
      {
        id: '7',
        groupName: "滥人情",
        icon: "/images/close.png",
        number: "3/8",
        showList: 0,
      },
      {
        id: '8',
        groupName: "娇人笑",
        icon: "/images/close.png",
        number: "4/9",
        showList: 0,
      },
      {
        id: '9',
        groupName: "奈何桥",
        icon: "/images/close.png",
        number: "6/13",
        showList: 0,
      },
      {
        id: '10',
        groupName: "乱人心",
        icon: "/images/close.png",
        number: "1/3",
        showList: 0,
      },
      {
        id: '11',
        groupName: "惹人爱",
        icon: "/images/close.png",
        number: "9/12",
        showList: 0,
      },
      {
        id: '12',
        groupName: "惹人醉",
        icon: "/images/close.png",
        number: "10/21",
        showList: 0,
      }
    ]
  },

  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
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

  //组点击
  groupClick: function(e) {
    var index = e.currentTarget.dataset.index;
    var showListItem = this.data.messages[index].showList;
    var cw = "messages[" + index + "].showList";
    var cwIcon = "messages[" + index + "].icon";
    if (showListItem == 1){
      this.setData({
        [cw]: 0,
        [cwIcon]: "/images/close.png"
      });
    }else{
      this.setData({
        [cw]: 1,
        [cwIcon]: "/images/open.png"
      });
    }
  },

  // 点击用户聊天
  toChat:function(){
    wx.navigateTo({
      url: '../chat/chat',
    })
  },
  // 监听用户下拉动作
  onPullDownRefresh: function () {
    var that = this;
    wx.showNavigationBarLoading() //在标题栏中显示加载

    //模拟加载
    setTimeout(function () {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
      let newlist = [{
        id: that.data.messages.length+1,
        groupName: "三年情" + that.data.messages.length +1,
        icon: "/images/close.png",
        number: "0/10",
        showList: 0,
      }];
         that.setData({
           messages:that.data.messages.concat(newlist)
         })
      wx.showToast({
        title: '加载完成',
        icon: 'success',
        duration: 1500
      });
    }, 1000);
  },
  
  /**
     * 生命周期函数--监听页面初次渲染完成
     */
  onReady: function () {
    // 渲染完成 停止加载
    setTimeout(function () {
      wx.hideNavigationBarLoading()
    }, 1000)
  } 
})