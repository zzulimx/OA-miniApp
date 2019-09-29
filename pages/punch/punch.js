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
    userInfo: {},  //用户登录信息
    signature:"年轻是咱们唯一有权利去编织梦想的的时光", //签名
    barHeight:'',  //时间轴高度
    ontime:'',  //上班打卡时间
    onstatus:'',  //上班打卡状态
    onIcon:'',//上班图标
    offtime:'',  //下班打卡时间
    offstatus:'', //下班打卡状态
    offIcon:'',//下班图标
    currLoca:'',//当前位置
    isPunch:'',//是否可以打卡
    outLoca:'',  //外出打卡定位
  },
  // 页面加载
  onLoad: function (options) {
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: '4XNBZ-KLBKI-HX6G3-57SJX-FKD57-IEBMD'
    });
    // 设置当前上下班时间，状态
    let currData = JSON.parse(options.currData);
    this.setData({
       ontime:currData.ontime,
       onstatus:currData.onstatus,
       offtime:currData.offtime,
       offstatus:currData.offstatus
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
    clock = clock[0] + ':' + clock[1];
    this.setData({
      clock: clock
    });
    setInterval(()=>{
      // 设置时钟
      var date = new Date();
      let clock = formatTime(date).split(' ')[1].split(':');
      clock = clock[0] + ':' + clock[1];
      this.setData({
        clock:clock
      })
    },1000)
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
  }
  // 打卡
  ,toPunch:function(){
      if(this.data.status === 'on'){
        
      }else{

      }
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
        offIcon: 'icon-dot'
      })
    }  
  },
  onShow:function(){
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
        qqmapsdk.reverseGeocoder({
          // get_poi: 1,  //是否返回周边POI列表：1.返回；0不返回(默认)
          // poi_options: 'policy=1;radius=300;page_size=12;page_index=1',
          location: {
            latitude: this.data.latitude,
            longitude: this.data.longitude
          },
          success: res => {//成功后的回调
            console.log(res);
            this.setData({
              outLoca: res.result.address_reference.landmark_l2.title
            })
          }
          , fail: function (res) {
            console.log(res);
          }
        })
      },
      fail(res) {
        console.log(res);
      }
    })
  },
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
  }
})