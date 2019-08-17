//获取应用实例
const app = getApp()
//我的信息
Page({
  data: {
    userInfo: {},
    list: [{
        img: '../../images/icon_journal.png',
        title: '工作日志',
        url: '../../pages/journal/journal'
      },
      {
        img: '../../images/icon_holiday.png',
        title: '节假日',
        url: ''
      },
      {
        img: '../../images/icon_attendance.png',
        title: '考勤',
        url: ''
      },
      {
        img: '../../images/icon_note.png',
        title: '便签',
        url: ''
      },
      {
        img: '../../images/icon_holiday.png',
        title: '日程安排',
        url: ''
      },
      {
        img: '../../images/icon_notes.png',
        title: '笔记',
        url: ''
      }
    ]
  },

  onLoad: function() {
    if (wx.getStorageSync('userInfo')) {
      this.setData({
        userInfo: wx.getStorageSync('userInfo')
      })
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