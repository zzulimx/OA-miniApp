//获取应用实例
const app = getApp();
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
//工作日志
Page({
  data: {
    tabs: ["看日志", "我发出的", "写日志"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    list: [{
      img: '../../images/icon_journal.png',
      title: '工作日志',
      url: '../../pages/journal/journal'
    }],
    seeWorkLogList: [{
      id: '123',
      title: 'wqewqe',
      data: '11111',
      sendId: '张三',
      content: 'wqewqewqewqewqewqeqw'
    }, {
        id: '123',
        title: 'wqewqe',
        data: '11111',
        sendId: '张三',
        content: 'wqewqewqewqewqewqeqw'
      }]
  },

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

  /**
   * tab切换
   */
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

  /**
   * 下拉刷新
   */
  onPullDownRefresh: function(e) {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    wx.showLoading({
      title: '玩命加载中',
    });
    var tabIndex = this.data.activeIndex.toString();
    switch (tabIndex){
      case '0'://看日志
        this.pullDownRefreshSeeJourmal();
        break;
      case '1'://我发出的
        this.pullDownRefreshSendJourmal();
        break;
      case '2'://写日志

        break;
    }
  },

  /**
   * 上拉加载
   */
  onReachBottom: function () {
    console.log(1);
    // 显示加载图标  
    wx.showLoading({
      title: '玩命加载中',
    });
    var tabIndex = this.data.activeIndex.toString();
    switch (tabIndex) {
      case '0'://看日志
        this.loadMoreSeeJourmal();
        break;
      case '1'://我发出的
        this.loadMoreSendJourmal();
        break;
      case '2'://写日志

        break;
    }
  },

  /**
   * 刷新我看的
   */
  pullDownRefreshSeeJourmal: function(){
    console.log(1);
    // 隐藏导航栏加载框  
    wx.hideNavigationBarLoading();
    // 停止下拉动作  
    wx.stopPullDownRefresh();
  },

  /**
   * 刷新我发出的
   */
  pullDownRefreshSendJourmal: function () {
    setTimeout(function () {
      console.log(2);
      // 隐藏导航栏加载框  
      wx.hideNavigationBarLoading();
      // 停止下拉动作  
      wx.stopPullDownRefresh();
      // 隐藏加载框  
      wx.hideLoading();
    }, 3000);
  },

  /**
   * 加载看日志
   */
  loadMoreSeeJourmal: function(){
    var that = this;
    setTimeout(function () {
      console.log(123);
      // 隐藏加载框  
      wx.hideLoading();
    }, 3000);
  },

  /**
   * 加载我发出的
   */
  loadMoreSendJourmal: function () {
    console.log(456);
  },

  /**
   * 查看我收到的日志的详情
   */
  showSeeWorkLogDetail: function (e){
    console.log(e.currentTarget.dataset.id);
  }

})