//获取应用实例
const app = getApp();
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
const util = require('../../utils/util.js');
const formatTime = util.formatTime;
// 路径是wxCharts文件相对于本文件的相对路径
var wxCharts = require('../../utils/wxcharts.js');
var pieChart = null;
//工作日志
Page({
  data: {
    tabs: ["我收到的", "我发出的", "日志统计"],
    isaddFile: true, //添加文件按钮显示/隐藏
    addbgHeight: 0, //添加文件时背景显示
    addwrapper: 0, //添加文件操作框高度
    transdeg: 0, //添加文件按钮显示
    overflow: 'none', //添加文件栏溢出
    top: '',
    left: '',
    right: '30px',
    bottom: '30px',
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    userInfo: '',
    isOperate:false, //操作日志
    receiveList: [
      {
      type: 0, //日志类型 0日报 1周报 2月报
      sender: '张三', //发送者
      avatarUrl: '../../images/avatar/avatar.jpg', //头像
      content: { //内容
        todayDone: '测试', //今日完成工作
        todayUndone: '测试', //今日未完成工作
        todayCoor: '测试', //今日需协调工作
      },
      time: '2019/10/3 15:37', //时间
    }, {
      type: 1,
      sender: '张三',
      avatarUrl: '../../images/avatar/avatar.jpg',
      content: { //内容
        weekDone: '测试', //本周完成工作
        weekPlan: '测试', //下周工作计划
        weekSummary: '测试', //本周工作总结
        weekCoor: '测试', //需协调帮助
      },
      time: '2019/10/3 15:37', //时间
    }, {
      type: 2,
      sender: '张三',
      avatarUrl: '../../images/avatar/avatar.jpg',
      content: { //内容
        monthDone: '测试', //本月完成工作
        monthPlan: '测试', //下月工作计划
        monthSummary: '测试', //本月工作总结
        monthCoor: '测试', //需协调帮助
      },
      time: '2019/10/3 15:37', //时间
    }, {
      type: 2,
      sender: '张三',
      avatarUrl: '../../images/avatar/avatar.jpg',
      content: { //内容
        monthDone: '测试', //本月完成工作
        monthPlan: '测试', //下月工作计划
        monthSummary: '测试', //本月工作总结
        monthCoor: '测试', //需协调帮助
      },
      time: '2019/10/3 15:37', //时间
    }],
    sendList: [
      {
      type: 2, //0日报 1周报 2月报
      content: { //内容
        monthDone: '测试', //本月完成工作
        monthPlan: '测试', //下月工作计划
        monthSummary: '测试', //本月工作总结
        monthCoor: '测试', //需协调帮助
      },
      time: '2019/10/3 15:37', //时间
    },
      {
        type: 2,
        content: { //内容
          monthDone: '测试', //本月完成工作
          monthPlan: '测试', //下月工作计划
          monthSummary: '测试', //本月工作总结
          monthCoor: '测试', //需协调帮助
        },
        time: '2019/10/3 15:37', //时间
      },
      {
        type: 2,
        content: { //内容
          monthDone: '测试', //本月完成工作
          monthPlan: '测试', //下月工作计划
          monthSummary: '测试', //本月工作总结
          monthCoor: '测试', //需协调帮助
        },
        time: '2019/10/3 15:37', //时间
      },

      {
        type: 2,
        content: { //内容
          monthDone: '测试', //本月完成工作
          monthPlan: '测试', //下月工作计划
          monthSummary: '测试', //本月工作总结
          monthCoor: '测试', //需协调帮助
        },
        time: '2019/10/3 15:37', //时间
      },

      {
        type: 2,
        content: { //内容
          monthDone: '测试', //本月完成工作
          monthPlan: '测试', //下月工作计划
          monthSummary: '测试', //本月工作总结
          monthCoor: '测试', //需协调帮助
        },
        time: '2019/10/3 15:37', //时间
      },
      {
        type: 0,
        content: { //内容
          monthDone: '测试', //本月完成工作
          monthPlan: '测试', //下月工作计划
          monthSummary: '测试', //本月工作总结
          monthCoor: '测试', //需协调帮助
        },
        time: '2019/10/3 15:37', //时间
      },
      {
        type: 0,
        content: { //内容
          monthDone: '测试', //本月完成工作
          monthPlan: '测试', //下月工作计划
          monthSummary: '测试', //本月工作总结
          monthCoor: '测试', //需协调帮助
        },
        time: '2019/10/3 15:37', //时间
      }, {
        type: 0,
        content: { //内容
          monthDone: '测试', //本月完成工作
          monthPlan: '测试', //下月工作计划
          monthSummary: '测试', //本月工作总结
          monthCoor: '测试', //需协调帮助
        },
        time: '2019/10/3 15:37', //时间
      }, {
        type: 0,
        content: { //内容
          monthDone: '测试', //本月完成工作
          monthPlan: '测试', //下月工作计划
          monthSummary: '测试', //本月工作总结
          monthCoor: '测试', //需协调帮助
        },
        time: '2019/10/3 15:37', //时间
      }, {
        type: 0,
        content: { //内容
          monthDone: '测试', //本月完成工作
          monthPlan: '测试', //下月工作计划
          monthSummary: '测试', //本月工作总结
          monthCoor: '测试', //需协调帮助
        },
        time: '2019/10/3 15:37', //时间
      }, {
        type: 0,
        content: { //内容
          monthDone: '测试', //本月完成工作
          monthPlan: '测试', //下月工作计划
          monthSummary: '测试', //本月工作总结
          monthCoor: '测试', //需协调帮助
        },
        time: '2019/10/3 15:37', //时间
      }, {
        type: 0,
        content: { //内容
          monthDone: '测试', //本月完成工作
          monthPlan: '测试', //下月工作计划
          monthSummary: '测试', //本月工作总结
          monthCoor: '测试', //需协调帮助
        },
        time: '2019/10/3 15:37', //时间
      }, {
        type: 0,
        content: { //内容
          monthDone: '测试', //本月完成工作
          monthPlan: '测试', //下月工作计划
          monthSummary: '测试', //本月工作总结
          monthCoor: '测试', //需协调帮助
        },
        time: '2019/10/3 15:37', //时间
      }, {
        type: 0,
        content: { //内容
          monthDone: '测试', //本月完成工作
          monthPlan: '测试', //下月工作计划
          monthSummary: '测试', //本月工作总结
          monthCoor: '测试', //需协调帮助
        },
        time: '2019/10/3 15:37', //时间
      }, {
        type: 1,
        content: { //内容
          monthDone: '测试', //本月完成工作
          monthPlan: '测试', //下月工作计划
          monthSummary: '测试', //本月工作总结
          monthCoor: '测试', //需协调帮助
        },
        time: '2019/10/3 15:37', //时间
      },
      {
        type: 1,
        content: { //内容
          monthDone: '测试', //本月完成工作
          monthPlan: '测试', //下月工作计划
          monthSummary: '测试', //本月工作总结
          monthCoor: '测试', //需协调帮助
        },
        time: '2019/10/3 15:37', //时间
      }, {
        type: 1,
        content: { //内容
          monthDone: '测试', //本月完成工作
          monthPlan: '测试', //下月工作计划
          monthSummary: '测试', //本月工作总结
          monthCoor: '测试', //需协调帮助
        },
        time: '2019/10/3 15:37', //时间
      }, {
        type: 1,
        content: { //内容
          monthDone: '测试', //本月完成工作
          monthPlan: '测试', //下月工作计划
          monthSummary: '测试', //本月工作总结
          monthCoor: '测试', //需协调帮助
        },
        time: '2019/10/3 15:37', //时间
      }, {
        type: 1,
        content: { //内容
          monthDone: '测试', //本月完成工作
          monthPlan: '测试', //下月工作计划
          monthSummary: '测试', //本月工作总结
          monthCoor: '测试', //需协调帮助
        },
        time: '2019/10/3 15:37', //时间
      }, {
        type: 1,
        content: { //内容
          monthDone: '测试', //本月完成工作
          monthPlan: '测试', //下月工作计划
          monthSummary: '测试', //本月工作总结
          monthCoor: '测试', //需协调帮助
        },
        time: '2019/10/3 15:37', //时间
      }, {
        type: 1,
        content: { //内容
          monthDone: '测试', //本月完成工作
          monthPlan: '测试', //下月工作计划
          monthSummary: '测试', //本月工作总结
          monthCoor: '测试', //需协调帮助
        },
        time: '2019/10/3 15:37', //时间
      }, {
        type: 1,
        content: { //内容
          monthDone: '测试', //本月完成工作
          monthPlan: '测试', //下月工作计划
          monthSummary: '测试', //本月工作总结
          monthCoor: '测试', //需协调帮助
        },
        time: '2019/10/3 15:37', //时间
      }, {
        type: 1,
        content: { //内容
          monthDone: '测试', //本月完成工作
          monthPlan: '测试', //下月工作计划
          monthSummary: '测试', //本月工作总结
          monthCoor: '测试', //需协调帮助
        },
        time: '2019/10/3 15:37', //时间
      }, {
        type: 1,
        content: { //内容
          monthDone: '测试', //本月完成工作
          monthPlan: '测试', //下月工作计划
          monthSummary: '测试', //本月工作总结
          monthCoor: '测试', //需协调帮助
        },
        time: '2019/10/3 15:37', //时间
      }, {
        type: 1,
        content: { //内容
          monthDone: '测试', //本月完成工作
          monthPlan: '测试', //下月工作计划
          monthSummary: '测试', //本月工作总结
          monthCoor: '测试', //需协调帮助
        },
        time: '2019/10/3 15:37', //时间
      }, {
        type: 1,
        content: { //内容
          monthDone: '测试', //本月完成工作
          monthPlan: '测试', //下月工作计划
          monthSummary: '测试', //本月工作总结
          monthCoor: '测试', //需协调帮助
        },
        time: '2019/10/3 15:37', //时间
      }
    ]
  },
  // 加载
  onLoad: function() {
    // 手动滑动按钮 允许
    this.lock = true;
    // 获取用户信息
    if (wx.getStorageSync('userInfo')) {
      this.setData({
        userInfo: wx.getStorageSync('userInfo')
      });
    };
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },
  // 图表索引
  toRefresh: function (e) {
    this.chartSet();
  },   
  //tab切换   
  tabClick: function(e) {
    if (this.data.activeIndex === e.currentTarget.id) {
      return false;
    } else {
      this.setData({
        sliderOffset: e.currentTarget.offsetLeft,
        activeIndex: e.currentTarget.id
      });
    }
    if(this.data.activeIndex===2){
      this.chartSet();
    }
  },
  //滑动切换
  swiperTab: function(e) {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * e.detail.current,
          activeIndex: e.detail.current
        });
      }
    });
    if (this.data.activeIndex === 2) {
      this.chartSet();
    }
  },
  // 下拉刷新
  onPullDownRefresh: function(e) {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    wx.showLoading({
      title: '玩命加载中',
    });
    var tabIndex = this.data.activeIndex.toString();
    switch (tabIndex) {
      case '0': //看日志
        this.pullDownRefreshReceiveJourmal();
        break;
      case '1': //我发出的
        this.pullDownRefreshSendJourmal();
        break;
      case '2': //写日志
        break;
    }
  },
  //  刷新我收到的日志
  pullDownRefreshReceiveJourmal: function() {
    console.log(0);
    // 隐藏导航栏加载框  
    wx.hideNavigationBarLoading();
    // 停止下拉动作  
    wx.stopPullDownRefresh();
  },
  //  刷新发出日志
  pullDownRefreshSendJourmal: function() {
    // 隐藏导航栏加载框  
    wx.hideNavigationBarLoading();
    // 停止下拉动作  
    wx.stopPullDownRefresh();
    // 隐藏加载框  
    wx.hideLoading();
  },
  // 添加日报
  toaddDay: function() {
    wx.navigateTo({
      url: '../addlog/addlog?type=0',
    })
  },
  //添加周报
  toaddWeek: function() {
    wx.navigateTo({
      url: '../addlog/addlog?type=1',
    })
  },
  // 添加月报
  toaddMonth: function() {
    wx.navigateTo({
      url: '../addlog/addlog?type=2',
    })
  },
  tapMove(e) {
    if (this.lock) {
      let clientX = e.touches[0].clientX;
      let clienty = e.touches[0].clientY;
      this.setData({
        left: clientX - 25 + 'px',
        top: clienty - 35 + 'px',
        bottom: '',
        right: ''
      });
    }
  },
  tapEnd(e) {
    this.setData({
      left: '',
      top: '',
      bottom: '30px',
      right: '30px'
    })
    this.addFile();
  },
  // 添加文件工具栏
  addFile: function() {
    if (this.data.addbgHeight === '100%') {
      // 手动滑动按钮 允许
      this.lock = true;
      this.setData({
        addbgHeight: 0,
        addwrapper: 0,
        transdeg: 0
      })
      var that = this;
      setTimeout(function() {
        that.setData({
          overflow: 'none'
        })
      }, 200)
    } else {
      // 手动滑动按钮 禁止
      this.lock = false;
      this.setData({
        addbgHeight: '100%',
        addwrapper: '175px',
        transdeg: '495deg',
        overflow: 'block'
      })
    }
  },
  // 点击空白处关闭添加窗口
  hideadd: function() {
    if (this.data.addbgHeight === '100%') {
      this.setData({
        addbgHeight: 0,
        addwrapper: 0,
        transdeg: 0,
      });
      var that = this;
      setTimeout(function() {
        that.setData({
          overflow: 'none'
        })
      }, 200)
    }
  },
  // 操作日志
  toOperate(e){
    this.setData({
      isOperate:true
    });
    this.index = e.currentTarget.dataset.idx;
  },
  // 关闭操作日志栏
  toCancel(){
    this.setData({
      isOperate: false
    });
  },
  toViewAll(){
    this.toCancel();
     this.setData({
       activeIndex:1
     })
  },
  toDelte(){
    this.toCancel();
    wx.showModal({
      title: '提示',
      content: '您确定要删除当前日志吗？',
      confirmText: "确定",
      cancelText: "取消",
      success: res => {
        if (res.confirm) {
          if (this.data.activeIndex === 0) {
            this.data.receiveList.splice(this.index, 1);
            this.setData({
              receiveList: this.data.receiveList
            })
          } else {
            this.data.sendList.splice(this.index, 1);
            this.setData({
              sendList: this.data.sendList
            });
           
          }
        }
      }
    })
  },
  toWithDrow(){
    this.toCancel();
    let currDate =formatTime(new Date()).replace(/\-/g,'/').substring(0,16);
    let logDate = this.data.sendList[this.index].time;  
    let logtime = logDate.split(' ')[1];
    let m1 = currDate.split(' ')[0].split('/')[1];
    let m2 = logDate.split(' ')[0].split('/')[1];
    let d1 = currDate.split(' ')[0].split('/')[2];
    let d2 = logDate.split(' ')[0].split('/')[2];
    let h1 = (new Date).getHours();
    let h2 = logtime.split(':')[0];
    if(m1!==m2 || d1!== d2){
      wx.showToast({
        title: '发送超过两小时',
        image:'../../images/toast/warning.png'
      });
      return;
    }else if(parseInt(h2)-parseInt(h1)>2){
      wx.showToast({
        title: '发送超过两小时',
        image: '../../images/toast/warning.png'
      });
      return;
    }
    wx.showModal({
      title: '提示',
      content: '撤回后所有人都无法查看这篇日志',
      confirmText:'确定',
      cancelText:'取消',
      success:res=>{
        if(res.confirm){
          this.data.sendList.splice(this.index, 1);
          this.setData({
            sendList: this.data.sendList
          })
        }
      }
    })
  },
  // 图表显示
  chartSet(){
    var daily=0;
    var weekly=0;
    var monthly=0;
    this.data.sendList.forEach((item,index)=>{
       if(item.type==0){
         daily+=1;
       }else if(item.type==1){
        weekly+=1;
       }else{
         monthly+=1;
       }
    })
    // 扇形图
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }
    pieChart = new wxCharts({
      animation: true,
      canvasId: 'pieCanvas',
      type: 'pie',
      series: [{
        name: '日报',
        data: daily,
        color:'#62c9f8'
      }, {
        name: '周报',
        data: weekly,
        color:'#009688'
      }, {
        name: '月报',
        data: monthly,
          color:'#ef7c3a'
      }],
      width: windowWidth*0.9,
      height: 300,
      dataLabel: true,
    });
  },
  onPullDownRefresh(){
    if(this.data.activeIndex===2){
      this.chartSet();
    }
    else{
      this.onLoad();
    }
    setTimeout(function(){
      wx.showToast({
        title: '刷新完成',
        icon:'success',
        success:function(){
          wx.stopPullDownRefresh();
        }
      })
    },800)
  }
})