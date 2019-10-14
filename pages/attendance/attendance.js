// pages/attendance/attendance.js
Page({
  data: {
    currentDate: "", //当前日期 年月
    currentDayList: '', //当前月天数布局数组
    currentObj: '', //当前日期（未格式化）
    currentDay: '', //当前具体几号
    currentClickKey: '', //当点击的key
    clickDate:'', //当前点击下的具体日期 年月日
    ontime: '', //当前日期下的上班时间
    offtime: '', //下班时间
    onoutTime: '',//上班外出打卡时间
    onoutLoca: '',//上班外出打卡地点
    offoutTime: '',//下班外出打卡时间
    offoutLoca: '',//下班外出打卡地点
    companyOntime:'09:00', //公司上班时间
    companyOfftime:'18:00',  //公司下班时间
    punchData: [ //打卡数据 
      [], //1月
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [  //10月
        {
          date: '10月1日', //日期
          ontime: '08：56', //上班时间
          onLoca: '郑州轻工业大学', //上班打卡的位置
          offtime: '18：05', //下班时间
          offLoca: '', //下班打卡的位置
          onoutTime: '', //上班外出打卡的时间
          onoutLoca: '',  //上班外出打卡的位置
          offoutTime: '',  //下班外出打卡的时间
          offoutLoca: '郑州轻工业大学', //下班外出打卡的位置
          status: 'normal',//状态  正常/不正常
        }, {
          date: '10月2日',
          ontime: '08：56',
          onLoca: '郑州轻工业大学',
          offtime: '16：05',
          offLoca: '',
          onoutTime: '',
          onoutLoca: '',
          offoutTime: '',
          offoutLoca: '郑州轻工业大学',
          status: 'abnormal',
        }, {
          date: '10月3日',
          ontime: '',
          onLoca: '郑州轻工业大学',
          offtime: '',
          offLoca: '',
          onoutTime: '08:56',
          onoutLoca: '郑州轻工业大学',
          offoutTime: '18:20',
          offoutLoca: '郑州轻工业大学',
          status: 'normal',
        }, {
          date: '10月4日',
          ontime: '08：56',
          onLoca: '郑州轻工业大学',
          offtime: '18：05',
          offLoca: '',
          onoutTime: '',
          onoutLoca: '',
          offoutTime: '',
          offoutLoca: '郑州轻工业大学',
          status: 'normal',
        }, {
          date: '10月5日',
          ontime: '08：56',
          onLoca: '郑州轻工业大学',
          offtime: '18：05',
          offLoca: '',
          onoutTime: '',
          onoutLoca: '',
          offoutTime: '',
          offoutLoca: '郑州轻工业大学',
          status: 'normal',
        }, {
          date: '10月6日',
          ontime: '08：56',
          onLoca: '郑州轻工业大学',
          offtime: '18：05',
          offLoca: '',
          onoutTime: '',
          onoutLoca: '',
          offoutTime: '',
          offoutLoca: '郑州轻工业大学',
          status: 'normal',
        }, {
          date: '10月7日',
          ontime: '08：56',
          onLoca: '郑州轻工业大学',
          offtime: '18：05',
          offLoca: '',
          onoutTime: '',
          onoutLoca: '',
          offoutTime: '',
          offoutLoca: '郑州轻工业大学',
          status: 'normal',
        }, {
          date: '10月8日',
          ontime: '08：56',
          onLoca: '郑州轻工业大学',
          offtime: '18：05',
          offLoca: '',
          onoutTime: '',
          onoutLoca: '',
          offoutTime: '',
          offoutLoca: '郑州轻工业大学',
          status: 'normal',
        }, {
          date: '10月10日', //日期
          ontime: '08：56',
          onLoca: '郑州轻工业大学',
          offtime: '18：05',
          offLoca: '',
          onoutTime: '',
          onoutLoca: '',
          offoutTime: '',
          offoutLoca: '郑州轻工业大学',
          status: 'normal',
        }, {
          date: '10月10日',
          ontime: '08：56',
          onLoca: '郑州轻工业大学',
          offtime: '18：05',
          offLoca: '',
          onoutTime: '',
          onoutLoca: '',
          offoutTime: '',
          offoutLoca: '郑州轻工业大学',
          status: 'normal',
        }, {
          date: '10月11日',
          ontime: '08：56',
          onLoca: '郑州轻工业大学',
          offtime: '18：05',
          offLoca: '',
          onoutTime: '',
          onoutLoca: '',
          offoutTime: '',
          offoutLoca: '郑州轻工业大学',
          status: 'normal',
        }, {
          date: '10月12日',
          ontime: '08:56',
          onLoca: '郑州轻工业大学',
          offtime: '',
          offLoca: '',
          onoutTime: '',
          onoutLoca: '',
          offoutTime: '',
          offoutLoca: '',
          status: 'normal',
        }, {
          date: '10月13日', //日期
          ontime: '',
          onLoca: '',
          offtime: '',
          offLoca: '',
          onoutTime: '',
          onoutLoca: '',
          offoutTime: '',
          offoutLoca: '',
          status: 'normal',
        }, {
          date: '10月14日',
          ontime: '',
          onLoca: '',
          offtime: '',
          offLoca: '',
          onoutTime: '',
          onoutLoca: '',
          offoutTime: '',
          offoutLoca: '',
          status: 'normal',
        }, {
          date: '10月15日',
          ontime: '',
          onLoca: '',
          offtime: '',
          offLoca: '',
          onoutTime: '',
          onoutLoca: '',
          offoutTime: '',
          offoutLoca: '',
          status: 'normal',
        }, {
          date: '',
          ontime: '',
          onLoca: '',
          offtime: '',
          offLoca: '',
          onoutTime: '',
          onoutLoca: '',
          offoutTime: '',
          offoutLoca: '',
          status: 'normal',
        }, {
          date: '10月17日', //日期
          ontime: '',
          onLoca: '',
          offtime: '',
          offLoca: '',
          onoutTime: '',
          onoutLoca: '',
          offoutTime: '',
          offoutLoca: '',
          status: 'normal',
        }, {
          date: '10月18日',
          ontime: '',
          onLoca: '',
          offtime: '',
          offLoca: '',
          onoutTime: '',
          onoutLoca: '',
          offoutTime: '',
          offoutLoca: '',
          status: 'normal',
        }, {
          date: '10月110日',
          ontime: '',
          onLoca: '',
          offtime: '',
          offLoca: '',
          onoutTime: '',
          onoutLoca: '',
          offoutTime: '',
          offoutLoca: '',
          status: 'normal',
        }, {
          date: '10月20日',
          ontime: '',
          onLoca: '',
          offtime: '',
          offLoca: '',
          onoutTime: '',
          onoutLoca: '',
          offoutTime: '',
          offoutLoca: '',
          status: 'normal',
        }, {
          date: '10月21日',
          ontime: '',
          onLoca: '',
          offtime: '',
          offLoca: '',
          onoutTime: '',
          onoutLoca: '',
          offoutTime: '',
          offoutLoca: '',
          status: 'normal',
        }, {
          date: '10月22日',
          ontime: '',
          onLoca: '',
          offtime: '',
          offLoca: '',
          onoutTime: '',
          onoutLoca: '',
          offoutTime: '',
          offoutLoca: '',
          status: 'normal',
        }, {
          date: '10月23日',
          ontime: '',
          onLoca: '',
          offtime: '',
          offLoca: '',
          onoutTime: '',
          onoutLoca: '',
          offoutTime: '',
          offoutLoca: '',
          status: 'normal',
        }, {
          date: '10月24日',
          ontime: '',
          onLoca: '',
          offtime: '',
          offLoca: '',
          onoutTime: '',
          onoutLoca: '',
          offoutTime: '',
          offoutLoca: '',
          status: 'normal',
        }, {
          date: '10月25日',
          ontime: '',
          onLoca: '',
          offtime: '',
          offLoca: '',
          onoutTime: '',
          onoutLoca: '',
          offoutTime: '',
          offoutLoca: '',
          status: 'normal',
        }, {
          date: '10月26日',
          ontime: '',
          onLoca: '',
          offtime: '',
          offLoca: '',
          onoutTime: '',
          onoutLoca: '',
          offoutTime: '',
          offoutLoca: '',
          status: 'normal',
        }, {
          date: '10月27日',
          ontime: '',
          onLoca: '',
          offtime: '',
          offLoca: '',
          onoutTime: '',
          onoutLoca: '',
          offoutTime: '',
          offoutLoca: '',
          status: 'normal',
        }, {
          date: '10月28日',
          ontime: '',
          onLoca: '',
          offtime: '',
          offLoca: '',
          onoutTime: '',
          onoutLoca: '',
          offoutTime: '',
          offoutLoca: '',
          status: 'normal',
        }, {
          date: '10月29日',
          ontime: '',
          onLoca: '',
          offtime: '',
          offLoca: '',
          onoutTime: '',
          onoutLoca: '',
          offoutTime: '',
          offoutLoca: '',
          status: 'normal',
        }
      ],
      [],
      []
    ]
  },
  onLoad: function(options) {
    var currentObj = this.getCurrentDayString();
    this.setData({
      currentDate: currentObj.getFullYear() + '年' + (currentObj.getMonth() + 1) + '月',
      currentDay: currentObj.getDate(),
      currentObj: currentObj,
      clickDate: currentObj.getFullYear() + '年' + (currentObj.getMonth() + 1) + '月' + currentObj.getDate()+'日'
    });
    // 设置当前日期下的状态
    var x = this.data.currentObj.getMonth();
    var y = this.data.currentDay - 1;
    this.setStatus(x,y);
    // 设置当前月份日期布局
    this.setSchedule(currentObj);
  },
  // 日期切换
  doDay: function(e) {
    var that = this
    var currentObj = that.data.currentObj
    var Y = currentObj.getFullYear();
    var m = currentObj.getMonth() + 1;
    var d = currentObj.getDate();
    var str = ''
    if (e.currentTarget.dataset.key == 'left') {
      m -= 1
      if (m <= 0) {
        str = (Y - 1) + '/' + 12 + '/' + d
      } else {
        str = Y + '/' + m + '/' + d
      }
    } else {
      m += 1
      if (m <= 12) {
        str = Y + '/' + m + '/' + d
      } else {
        str = (Y + 1) + '/' + 1 + '/' + d
      }
    }
    currentObj = new Date(str)
    this.setData({
      currentDate: currentObj.getFullYear() + '年' + (currentObj.getMonth() + 1) + '月',
      currentObj: currentObj
    })
     // 设置当前月份日期布局
    this.setSchedule(currentObj);
    // 设置翻页后的打卡状态
    var x = this.data.currentObj.getMonth();
    var y = this.data.currentDay - 1;
    this.setStatus(x,y);
    //设置当前按钮下的年月日
    this.setData({
      clickDate: currentObj.getFullYear() + '年' + (currentObj.getMonth() + 1) + '月' + currentObj.getDate() + '日'
    })
  },
  // 格式化当前日期
  getCurrentDayString: function() {
    var objDate = this.data.currentObj
    if (objDate != '') {
      return objDate
    } else {
      var c_obj = new Date()
      var a = c_obj.getFullYear() + '/' + (c_obj.getMonth() + 1) + '/' + c_obj.getDate()
      return new Date(a)
    }
  },
  // 设置当前月份下的日期数组（当前月天数，从哪儿开始）
  setSchedule: function(currentObj) {
    var that = this
    var m = currentObj.getMonth() + 1
    var Y = currentObj.getFullYear()
    var d = currentObj.getDate();
    var dayString = Y + '/' + m + '/' + currentObj.getDate()
    var currentDayNum = new Date(Y, m, 0).getDate();
    var currentDayWeek = currentObj.getUTCDay() + 1;
    var result = currentDayWeek - (d % 7 - 1);
    var firstKey = result <= 0 ? 7 + result : result;
    var currentDayList = []
    var f = 0
    for (var i = 0; i < 42; i++) {
      let data = []
      if (i < firstKey - 1) {
        currentDayList[i] = {
          day: ''
        }
      } else {
        if (f < currentDayNum) {
          currentDayList[i] = {
            day: f + 1
          };
          f = currentDayList[i].day
        } else if (f >= currentDayNum) {
          currentDayList[i] = {
            day: ''
          }
        }
      }
    };
    // 将当前月份打卡状态合并到一个数组
    var idx = 0;
    currentDayList.forEach((item, index) => {
      if (item.day !== '') {
        item.data = this.data.punchData[m - 1][idx];
        idx = idx + 1;
      }
    })
    that.setData({
      currentDayList: currentDayList
    });
  },

  // 设置日期点击事件
  onClickItem: function(e) {
    let idx = e.currentTarget.id;
    this.setData({
      currentClickKey: e.currentTarget.id
    });
    let day = this.data.currentDayList[idx].day;
    this.setData({
      clickDate:this.data.currentDate+day+'日'
    });
  // 动态设置选择日期上班状态
    let x=parseInt(this.data.currentDate.split('年')[1])-1;
    let y =parseInt(day)-1;
    this.setStatus(x,y);
  },
  // 去打卡
  topunch: function(e) {
    // 设置下一页索引
    let n = e.currentTarget.dataset.index;
    // 获取今日数据
    let currData = {
      ontime: this.data.ontime,
      onLoca:this.data.onLoca,
      offtime: this.data.offtime,
      offLoca:this.data.offLoca,
      onoutTime: this.data.onoutTime,
      onoutLoca: this.data.onoutLoca,
      offoutTime: this.data.offoutTime,
      offoutLoca: this.data.offoutLoca,
      clickDate:this.data.clickDate,
      index: n
    }
    currData = JSON.stringify(currData)
    wx.navigateTo({
      url: '../punch/punch?currData=' + currData,
    })
  },
  // 设置当前日期下的状态  x:当前月份 y:当前日期
  setStatus(x,y){
    if (this.data.punchData[x][y] === '' || this.data.punchData[x][y] === undefined) {
      this.setData({
        ontime: '',
        offtime: '',
      })
    } else {
      this.setData({
        ontime: this.data.punchData[x][y].ontime, 
        onLoca: this.data.punchData[x][y].onLoca,
        offtime: this.data.punchData[x][y].offtime,
        offLoca: this.data.punchData[x][y].offLoca,
        onoutTime: this.data.punchData[x][y].onoutTime,
        onoutLoca: this.data.punchData[x][y].onoutLoca,
        offoutTime: this.data.punchData[x][y].offoutTime,
        offoutLoca: this.data.punchData[x][y].offoutLoca
      });
    }
  }
})