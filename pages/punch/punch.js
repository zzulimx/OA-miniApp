// pages/punch/punch.js
// 获取时间
const util = require('../../utils/util.js');
const formatTime = util.formatTime;
// 引入SDK核心类
var QQMapWX = require('../../lib/qqmap-wx-jssdk.js');
var qqmapsdk;
Page({
  data: {
    tabs: ["上下班打卡", "外出打卡"],
    clock:'',  //时钟
    sliderLeft: 0,  //控制导航底部样式
    activeIndex: 0,//展示选项卡页面，默认上下班打卡
    currDate:'', //上页面获取的日期 年月日
    userInfo: {},  //用户登录信息
    signature:"年轻是咱们唯一有权利去编织梦想的的时光", //个性签名
    barHeight:'',  //时间轴高度
    status:'normal', //今日打卡状态
    ontime:'',  //上班打卡时间
    onIcon:'',//上班图标
    onLoca:'', //上班打卡位置
    offtime:'',  //下班打卡时间
    offIcon:'',//下班图标
    offLoca:'', //下班打卡位置
    onoutTime: '',//上班外出打卡时间
    onoutLoca: '',//上班外出打卡地点
    offoutTime: '',//下班外出打卡时间
    offoutLoca: '',//下班外出打卡地点
    currLoca:'',//当前位置
    latitude:'', //当前坐标纬度
    longitude:'', //当前坐标经度
    isPunch:false,//是否可以打卡
    outLoca:'',  //外出打卡定位
    degRight:'-135deg', //控制打卡时间进度
    degLeft: '-135deg', //控制打卡时间进度
    companyOntime: '09:00', //公司上班时间
    companyOfftime: '18:00',  //公司下班时间
    companyLoca:{  //公司坐标位置
      latitude: 34.74530,
      longitude: 113.62493
    },
    companyRange:300,   //允许打卡范围 单位/米
    clockBg:'#fff',
    clockStatus:'n'
  },
  // 页面加载
  onLoad: function (options) {
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: '4XNBZ-KLBKI-HX6G3-57SJX-FKD57-IEBMD'
    });
    // 获取当前位置 计算距离
    this.getLoca();
    // 设置当前上下班时间，状态
    let currData = JSON.parse(options.currData);
    this.setData({
      ontime:currData.ontime,
      onLoca:currData.onLoca,
      offtime:currData.offtime,
      offLoca:currData.offLoca,
      onoutTime:currData.onoutTime,
      onoutLoca: currData.onoutLoca,
      offoutTime: currData.offoutTime,
      offoutLoca: currData.offoutLoca,
      currDate: currData.clickDate,
      activeIndex:currData.index,
    });
    // 根据上下班状态设置样式
    this.setByStatus(this);
    // 设置导航栏底部滚动条
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: "10%"
        });
      }
    });
    // 获取用户信息
    if (wx.getStorageSync('userInfo')) {
      this.setData({
        userInfo: wx.getStorageSync('userInfo')
      });
    };
    // 时钟初始化
    var date = new Date();
    let clock = formatTime(date).split(' ')[1].split(':');
    clock = clock[0] + ':' + clock[1] + ':' + clock[2];
    this.setData({
      clock: clock
    });
    // 剩余半小时开始倒计时
    this.timeRemain();
    setInterval(()=>{
      // 设置时钟
      var date = new Date();
      let clock = formatTime(date).split(' ')[1].split(':');
      // 格式化clock 00:00:00
      clock = clock[0] + ':' + clock[1] + ':' + clock[2];
      this.setData({
        clock:clock
      });
      // 剩余半小时开始倒计时
      this.timeRemain();
    }, 1000);   
  },
  //点击切换选项卡
  tabClick: function (e) {
    let currIndex = parseInt(e.currentTarget.id);
    this.setData({
      sliderLeft: e.currentTarget.id * 50 + 10 + '%',
      activeIndex: e.currentTarget.id,
    });
  },
  //滑动切换选项卡
  swiperTab: function (e) {
    let currIndex = parseInt(e.detail.current);
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: currIndex * 50 + 10 + '%',
          activeIndex: currIndex
        });
      }
    });
  },
  // 重新定位
  toLocate:function(){
    wx.navigateTo({
      url: '../locate/locate',
    })
  },
  // 根据上下班打卡状态设置样式
  setByStatus:(that)=>{
    // 如果上班未打卡
    if (that.data.ontime === '' || that.data.ontime===undefined){
      that.setData({
        barHeight:'400rpx',
        onIcon:'icon-dot',
        offIcon:'icon-circle'
      })
    }else{
      that.setData({
        barHeight: '225rpx',
        onIcon: 'icon-dot',
        offIcon: 'icon-circle'
      })
    }  
  },
  getLoca:function(){
    var that = this;
    // 实例化map
    this.mapCtx = wx.createMapContext('myMap');
    // 获取当前位置
    wx.getLocation({
      type: 'gcj02',
      success: res => {
        this.setData({
          latitude: res.latitude,
          longitude: res.longitude
        });
        // 逆地址解析 坐标转化为地址
        qqmapsdk.reverseGeocoder({
          // get_poi: 1,  //是否返回周边POI列表：1.返回；0不返回(默认)
          // poi_options: 'policy=1;radius=300;page_size=12;page_index=1',
          location: {
            latitude: this.data.latitude,
            longitude: this.data.longitude
          },
          success: res => {//成功后的回调
          let locaData = res.result.address_reference;
            this.setData({
              outLoca: res.result.address_reference.landmark_l2.title,
              currLoca: res.result.address_reference.landmark_l2.title + '(' + res.result.address_reference.street_number.title+')'
            });
          }
          , fail: function (res) {
            wx.showToast({
              title: '位置信息获取失败，请刷新重试',
              image: '../../images/toast/warning.png'
            })
          }
        });
        // 获取当前位置与打卡位置距离
       this.getDistance();
      },
      fail(res) {
        console.log(res);
        wx.showToast({
          title: '位置信息获取失败，请刷新重试',
          image: '../../images/toast/warning.png'
        })
      }
    });
  },
  // 外出打卡
  toOutPunch:function(){
    // 封装数据
    let outData={
      punchTime:this.data.clock,
      punchLoca:this.data.outLoca
    }
    outData = JSON.stringify(outData);
    wx.navigateTo({
      url: '../outPunch/outPunch?outData='+outData,
    })
  },
  // 上班打卡
  toOnpunch: function () {
    // 获取当前位置与打卡距离
    this.getDistance();
  // 获取当前日期
    let date = formatTime(new Date());
        date = date.split(' ')[0].split('-');
        date = date[0]+'年'+date[1]+'月'+date[2]+'日';
  // 获取当前时间
     let clock = this.data.clock.substring(0,5);
    // 不在当前日期 不能打卡
       if(this.data.currDate!==date){
         wx.showToast({
           title: '日期与当前不符',
           image:'../../images/toast/warning.png'
         });
         return;
       }else if(!this.data.isPunch){
         wx.showToast({
           title: '不在考勤范围！',
           image: '../../images/toast/warning.png'
         });
         return;
       }else if(clock>this.data.companyOfftime){
         console.log(clock+'   '+this.data.companyOfftime)
         wx.showToast({
           title: '今日工作已结束！',
           image: '../../images/toast/warning.png'
         });
         return;
       }else if(clock>this.data.companyOntime){
         wx.showToast({
           title: '您迟到了！',
           image: '../../images/toast/warning.png'
         });
         this.setData({
           status:'abnormal'
         })
       }
    let pages = getCurrentPages();
    let currPage = pages[pages.length - 1]; //当前页面
    let prevPage = pages[pages.length - 2]; //上一个页面
      this.setData({
        ontime: this.data.clock.substring(0,5),
        onLoca:this.data.currLoca,
        barHeight: '225rpx',
        offIcon: 'icon-circle'
      });
      // 设置上页信息
      this.prePageSet();
  },
  // 下班打卡
  toOffpunch:function(){
    // 获取当前位置与打卡距离
    this.getDistance();
    // 获取当前日期
    let date = formatTime(new Date());
    date = date.split(' ')[0].split('-');
    date = date[0] + '年' + date[1] + '月' + date[2] + '日';
    // 获取当前时间
    let clock = this.data.clock.substring(0, 5);
    // 不在当前日期 不能打卡
    if (this.data.currDate !== date) {
      wx.showToast({
        title: '日期与当前不符',
        image: '../../images/toast/warning.png'
      });
      return;
    } else if (!this.data.isPunch) {
      wx.showToast({
        title: '不在考勤范围！',
        image: '../../images/toast/warning.png'
      });
      return;
    } else if (clock <this.data.companyOfftime) {
      wx.showModal({
        title: '提示',
        content: '未到下班时间，您确定要提前打卡吗？',
        confirmText: "确定",
        cancelText: "取消",
        success: (res)=>{
          if (res.confirm) {
            let pages = getCurrentPages();
            let currPage = pages[pages.length - 1]; //当前页面
            let prevPage = pages[pages.length - 2]; //上一个页面
            this.setData({
              offtime: this.data.clock.substring(0,5),
              offLoca:this.data.currLoca,
              barHeight: '225rpx',
              offIcon: 'icon-dot',
              status:'abnormal'
            });
            // 设置上页信息
            this.prePageSet();
          } else {
            // 取消
          }
        }
      });
    }else{
      this.setData({
        offtime: this.data.clock.substr(0,5),
        offLoca: this.data.currLoca,
        barHeight: '225rpx',
        offIcon: 'icon-dot'
      });
      // 设置上页信息
      this.prePageSet();
    }
  },
  // 获取当前位置与考勤位置的距离
  getDistance(){
    // 获取当前位置与打卡位置距离
    qqmapsdk.calculateDistance({
      mode: 'straight',
      from: {  //当前位置坐标
        latitude: this.data.latitude,
        longitude: this.data.longitude
      },
      to: [{  //公司位置坐标
        latitude: this.data.companyLoca.latitude,
        longitude: this.data.companyLoca.longitude
      }],
      success: (res) => {//成功后的回调
        if (res.result.elements[0].distance <= this.data.companyRange) {
          this.setData({
            isPunch: true
          })
        }
      },
      fail: function (error) {
        wx.showToast({
          title: '位置信息获取失败，请刷新重试',
          image: '../../images/toast/warning.png'
        })
      },
      complete: function (res) {
        console.log(res);
      }
    });
  },
  // 根据当前时间设置倒计时样式
  timeRemain(){
    var date = new Date();
    let clock = formatTime(date).split(' ')[1].split(':');
    // 从半小时开始倒计时
    //  取当前小时
    let h1 = parseInt(clock[0]);
    let h2 = parseInt(this.data.companyOntime.split(':')[0]);
     // 取当前分钟
    let m1 = parseInt(clock[1]);
    let m2 = parseInt(this.data.companyOntime.split(':')[1]);
    let remain = (h2-h1)*60+(m2-m1);
    if (remain<=30&&remain>0) {
        let s =(30-remain)* 60 +  parseInt(clock[2]);
        let deg = s * 0.2;
        if (deg < 180) {
          this.setData({
            degRight: deg - 135 + 'deg',
            degLeft: '-135deg'
          })
        } else {
          this.setData({
            degRight: '45deg',
            degLeft: (deg - 180) - 135 + 'deg'
          })
        }
     }else if(remain <0){
       this.setData({
         degRight: '-135deg',
         degLeft: '-135deg',
         clockBg:'red',
         clockStatus:'a'
       })
     }
  },
  onPullDownRefresh() {
    this.getLoca();
  },
  // 设置上一页信息
  prePageSet(){
    let pages = getCurrentPages();
    let currPage = pages[pages.length - 1]; //当前页面
    let prevPage = pages[pages.length - 2]; //上一个页面
    let x= (new Date()).getMonth();
    let y = (new Date()).getDate()-1;
    prevPage.data.punchData[x][y] = {
      date: this.data.currDate.substring(4),
      ontime: this.data.ontime,
      onLoca: this.data.onLoca,
      offtime: this.data.offtime,
      offLoca: this.data.offLoca,
      onoutTime: this.data.onoutTime,
      onoutLoca: this.data.onoutLoca,
      offoutTime: this.data.offoutTime,
      offoutLoca: this.data.offoutLoca,
      status: this.data.status,
    }
    prevPage.setData({
      punchData: prevPage.data.punchData,
      ontime: this.data.ontime,
      onLoca: this.data.onLoca,
      offtime: this.data.offtime,
      offLoca: this.data.offLoca,
      onoutTime: this.data.onoutTime,
      onoutLoca: this.data.onoutLoca,
      offoutTime: this.data.offoutTime,
      offoutLoca: this.data.offoutLoca,
    });
    // 将当前月份打卡状态合并到一个数组
    var idx = 0;
    prevPage.data.currentDayList.forEach((item, index) => {
      if (item.day !== '') {
        item.data = prevPage.data.punchData[x][idx];
        idx = idx + 1;
      }
    });
    prevPage.setData({
      currentDayList: prevPage.data.currentDayList
    });
  },
  onPullDownRefresh(){
    this.getLoca();
    setTimeout(function(){
      wx.showToast({
        title: '刷新完成',
        icon:'success',
        success:res=>{
          wx.stopPullDownRefresh();
        }
      })
    },800)
  }
})