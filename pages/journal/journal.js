//获取应用实例
const app = getApp();
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
//工作日志
Page({
  data: {
    tabs: ["我收到的", "我发出的", "日志统计"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    addGroupHeight:0, //添加日志按钮栏高度
    layAddHeight:0, //添加日志背景高度
    rotateDeg:0,  //添加栏按钮旋转角度
    list: [{
      type:0,  //日志类型 0日报 1周报 2月报
      sender:'张三', //发送者
      avatarUrl:'../../images/avatar/avatar.jpg',  //头像
      content: {//内容
        todayDone: '测试',  //今日完成工作
        todayUndone: '测试', //今日未完成工作
        todayCoor: '测试',  //今日需协调工作
      }, 
      time:'2019/10/3 15:37',  //时间
    }],
  },
// 加载
  onLoad: function() {
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
 //tab切换   
  tabClick: function(e) {
    if (this.data.activeIndex === e.currentTarget.id) {
      return false;
    }else{
      this.setData({
        sliderOffset: e.currentTarget.offsetLeft,
        activeIndex: e.currentTarget.id
      });
    }
  },
  //滑动切换
  swiperTab: function (e) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * e.detail.current,
          activeIndex: e.detail.current
        });
      }
    });
  },
// 下拉刷新
  onPullDownRefresh: function(e) {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    wx.showLoading({
      title: '玩命加载中',
    });
    var tabIndex = this.data.activeIndex.toString();
    switch (tabIndex){
      case '0'://看日志
        this.pullDownRefreshReceiveJourmal();
        break;
      case '1'://我发出的
        this.pullDownRefreshSendJourmal();
        break;
      case '2'://写日志
        break;
    }
  },
//  刷新我收到的日志
  pullDownRefreshReceiveJourmal: function(){
    console.log(0);
    // 隐藏导航栏加载框  
    wx.hideNavigationBarLoading();
    // 停止下拉动作  
    wx.stopPullDownRefresh();
  },
//  刷新发出日志
  pullDownRefreshSendJourmal: function () {
      console.log(1);
      // 隐藏导航栏加载框  
      wx.hideNavigationBarLoading();
      // 停止下拉动作  
      wx.stopPullDownRefresh();
      // 隐藏加载框  
      wx.hideLoading();
  },
  // 添加日志栏打开/关闭 按钮
  toAdd:function(){
    if(this.data.addGroupHeight===0){
      this.setData({
        addGroupHeight:'70%',
        layAddHeight:'100vh',
        rotateDeg:'495deg'
      })
    }else{
      this.setData({
        addGroupHeight:0,
        layAddHeight: 0,
        rotateDeg:0
      })
    }
  },
  // 添加日报
  toaddDay:function(){
    this.toAdd();
    wx.navigateTo({
      url: '../addlog/addlog?type=0',
    })
  },
  //添加周报
  toaddWeek:function(){
    this.toAdd();
    wx.navigateTo({
      url: '../addlog/addlog?type=1',
    })
  },
  // 添加月报
  toaddMonth:function(){
    this.toAdd();
    wx.navigateTo({
      url: '../addlog/addlog?type=2',
    })
  }
})