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
  }

})