// pages/attendance/attendance.js
Page({
  data: {
    currentDate: "",  //当前日期 年月日
    dayList: '',  
    currentDayList: '',   //当前月天数布局数组
    currentObj: '',   //当前日期（未格式化）
    currentDay: '',     //当前具体几号
    currentClickKey: '',  //当点击的key
    ontime: '',   //上班时间
    onstatus: '',  //上班状态  正常/迟到
    offtime: '',   //下班时间
    offstatus: '',  //下班状态 正常/提前
    punchData:[   //打卡数据 
    [],   //1月
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [                 //9月
        {
          date: '9月1日',  //日期
          status: 'normal', //当日上班状态  正常/异常
          ontime: '08：56',   //上班时间
          onstatus: '正常打卡',  //上班状态  正常/迟到
          offtime: '18：05',   //下班时间
          offstatus: '正常打卡',  //下班状态 正常/提前
        }
        , {
          date: '9月2日',
          status: 'normal', 
          ontime: '08：56',  
          onstatus: '正常打卡',  
          offtime: '18：05',   
          offstatus: '正常打卡',  
        }
        , {
          date: '9月3日',
          status: 'normal', 
          ontime: '08：56',
          onstatus: '正常打卡',
          offtime: '18：05',
          offstatus: '正常打卡', 
        }
        , {
          date: '9月4日',
          status: 'normal',
          ontime: '08：56',
          onstatus: '正常打卡',
          offtime: '18：05',
          offstatus: '正常打卡', 
        }
        ,{
        date: '9月5日',  
          status: 'abnormal',
          ontime: '09：56',
          onstatus: '迟到打卡',
          offtime: '18：05',
          offstatus: '正常打卡', 
      }
      , {
        date: '9月6日',
        status: 'normal',
        ontime: '08：56',
        onstatus: '正常打卡',
        offtime: '18：05',
        offstatus: '正常打卡', 
      }
      , {
        date: '9月7日',
        status: 'normal',
        ontime: '08：56',
        onstatus: '正常打卡',
        offtime: '18：05',
        offstatus: '正常打卡',
      }
      , {
        date: '9月8日',
        status: 'normal',
        ontime: '08：56',
        onstatus: '正常打卡',
        offtime: '18：05',
        offstatus: '正常打卡',
      } 
      ,{
        date: '9月9日',  //日期
        status: 'normal',
        ontime: '08：56',
        onstatus: '正常打卡',
        offtime: '18：05',
        offstatus: '正常打卡',
      }
      , {
        date: '9月10日',
        status: 'normal',
        ontime: '08：56',
        onstatus: '正常打卡',
        offtime: '18：05',
        offstatus: '正常打卡',
      }
      , {
        date: '9月11日',
        status: 'normal',
        ontime: '08：56',
        onstatus: '正常打卡',
        offtime: '18：05',
        offstatus: '正常打卡',
      }
      , {
        date: '9月12日',
        status: 'normal',
        ontime: '08：56',
        onstatus: '正常打卡',
        offtime: '18：05',
        offstatus: '正常打卡',
      }
      , {
        date: '9月13日',  //日期
        status: 'normal',
        ontime: '08：56',
        onstatus: '正常打卡',
        offtime: '18：05',
        offstatus: '正常打卡',
      }
      , {
        date: '9月14日',
        status: 'normal',
        ontime: '08：56',
        onstatus: '正常打卡',
        offtime: '18：05',
        offstatus: '正常打卡',
      }
      , {
        date: '9月15日',
        status: 'normal',
        ontime: '08：56',
        onstatus: '正常打卡',
        offtime: '18：05',
        offstatus: '正常打卡',
      }
      , {
        date: '9月16日',
        status: 'normal',
        ontime: '08：56',
        onstatus: '正常打卡',
        offtime: '18：05',
        offstatus: '正常打卡',
      }     
      , {
        date: '9月17日',  //日期
        status: 'normal',
        ontime: '08：56',
        onstatus: '正常打卡',
        offtime: '18：05',
        offstatus: '正常打卡',
      }
      , {
        date: '9月18日',
        status: 'normal',
        ontime: '08：56',
        onstatus: '正常打卡',
        offtime: '18：05',
        offstatus: '正常打卡',
      }
      , {
        date: '9月19日',
        status: 'normal',
        ontime: '08：56',
        onstatus: '正常打卡',
        offtime: '18：05',
        offstatus: '正常打卡',
      }
      , {
        date: '9月20日',
        status: 'normal',
        ontime: '08：56',
        onstatus: '正常打卡',
        offtime: '18：05',
        offstatus: '正常打卡',
      }     
      , {
        date: '9月21日',  //日期
        status: 'normal',
        ontime: '08：56',
        onstatus: '正常打卡',
        offtime: '18：05',
        offstatus: '正常打卡',
      }
      , {
        date: '9月22日',
        status: 'normal',
        ontime: '08：56',
        onstatus: '正常打卡',
        offtime: '18：05',
        offstatus: '正常打卡',
      }
      , {
        date: '9月23日',
        status: 'normal',
        ontime: '08：56',
        onstatus: '正常打卡',
        offtime: '18：05',
        offstatus: '正常打卡',
      }
      , {
        date: '9月24日',
        status: 'normal',
        ontime: '08：56',
        onstatus: '正常打卡',
        offtime: '18：05',
        offstatus: '正常打卡',
      }
      , {
        date: '9月25日',
        status: 'normal',
        ontime: '08：56',
        onstatus: '正常打卡',
        offtime: '18：05',
        offstatus: '正常打卡',
      }
      , {
        date: '9月26日',
        status: 'normal',
        ontime: '08：56',
        onstatus: '正常打卡',
        offtime: '18：05',
        offstatus: '正常打卡',
      }
      , {
        date: '9月27日',
        status: 'normal',
        ontime: '08：56',
        onstatus: '正常打卡',
        offtime: '18：05',
        offstatus: '正常打卡',
      }
      , {
        date: '9月28日',
        status: 'normal',
        ontime: '08：56',
        onstatus: '正常打卡',
        offtime: '18：05',
        offstatus: '正常打卡',
      }
      , {
        date: '9月29日',
        status: 'normal',
        ontime: '08：56',
        onstatus: '正常打卡',
        offtime: '',
        offstatus: '',
      }                  
    ],
    [],
    [],
    []
    ]
  },
  onLoad: function (options) {
    var currentObj = this.getCurrentDayString()
    this.setData({
      currentDate: currentObj.getFullYear() + '年' + (currentObj.getMonth() + 1) + '月',
      currentDay: currentObj.getDate(),
      currentObj: currentObj
    })
    this.setSchedule(currentObj);
    // 设置当前日期下的状态
    var x = currentObj.getMonth();
    var y = this.data.currentDay - 1;
    if(this.data.punchData[x][y]==='' || this.data.punchData[x][y] === undefined){
      this.setData({
        ontime: '',
        onstatus: '',
        offtime: '',
        offstatus: '',
      })
    }else{
     this.setData({
        ontime:this.data.punchData[x][y].ontime,
        onstatus: this.data.punchData[x][y].onstatus,
        offtime: this.data.punchData[x][y].offtime,
        offstatus: this.data.punchData[x][y].offstatus
      });
    }
  },
  // 日期切换
  doDay: function (e) {
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
    this.setSchedule(currentObj);
  },
  // 获取当前日期
  getCurrentDayString: function () {
    var objDate = this.data.currentObj
    if (objDate != '') {
      return objDate
    } else {
      var c_obj = new Date()
      var a = c_obj.getFullYear() + '/' + (c_obj.getMonth() + 1) + '/' + c_obj.getDate()
      return new Date(a)
    }
  },
  // 获取当前月份天数 布局详情
  setSchedule: function (currentObj) {
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
          day:''
        }
      } else {
        if (f < currentDayNum) {
          currentDayList[i] = {
            day:f + 1
          };
          f = currentDayList[i].day
        } else if (f >= currentDayNum) {
          currentDayList[i] = {
            day:''
          }
        }
      }
    };
    // 封装每一个日期内容
    var idx = 0;
    currentDayList.forEach((item,index)=>{
      if(item.day !==''){
         item.data=this.data.punchData[m-1][idx];
         idx= idx+1;
      }
    })
    that.setData({
      currentDayList: currentDayList
    });
  },

  // 设置点击事件
  onClickItem: function (e) {
    let idx = e.currentTarget.id;
    this.setData({
      currentClickKey: e.currentTarget.id
    });
    // 动态设置选择日期上班状态
    if(this.data.currentDayList[idx].data===undefined){
      this.setData({
        ontime:'',
        onstatus: '',
        offtime: '',
        offstatus: '', 
      })
    }else{
      this.setData({
        ontime: this.data.currentDayList[idx].data.ontime,
        onstatus: this.data.currentDayList[idx].data.onstatus,
        offtime: this.data.currentDayList[idx].data.offtime,
        offstatus: this.data.currentDayList[idx].data.offstatus
      })
    }
  },
  // 去打卡
  topunch: function () {
    // 获取今日数据
    let currData={
      ontime:this.data.ontime,
      onstatus:this.data.onstatus,
      offtime:this.data.offtime,
      offstatus:this.data.offstatus
    }
    currData = JSON.stringify(currData)
    wx.navigateTo({
      url: '../punch/punch?currData='+currData,
    })
  },
})