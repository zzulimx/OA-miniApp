//获取应用实例
const app = getApp();
var network = require("../../utils/net.js");
//工作台
Page({
  data: {
    menuList: [{
        name: '我的服务',
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
            title: '会议室',
            url: '../../pages/conference/conference'
          },
          {
            img: '../../images/icon_notes.png',
            title: '笔记',
            url: '../../pages/notes/notes'
          },
          {
            img: '../../images/icon_file.png',
            title: '文件管理',
            url: '../../pages/file/file'
          }
        ],
      },
      {
        name: '人事管理',
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
        ],
      },
      {
        name: '人事管理',
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
        ],
      },
      {
        name: '人事管理',
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
        ],
      }
    ]
  },

  onLoad: function() {
    network.POST({
      params: {},
      API_URL: "appsysuser004",
      success: (res) => {
        console.log(res)
      }
    });
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