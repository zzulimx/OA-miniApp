//获取应用实例
const app = getApp();
//我的消息
Page({
  data: {
    agentList: [{
      type: '0',
      name: '消息',
      num: 8
    }, {
      type: '1',
      name: '邮件',
      num: 8
    }, {
      type: '2',
      name: '通知',
      num: 8
    }],
    ismsgNum:true,  //消息是否查看
    msglist:[
      {
        msgSender:'像风向自由',
        msgContent:'你好，我是李四！',
        msgTime:'下午7:22',
        isMsgNum:false,
        msgNum:8,
        avatar:'../../images/avatar/avatar.jpg'
      },
      {
        msgSender: '翰墨',
        msgContent: '想问一下，有南校区的选北校区的英语课要换的吗',
        msgTime: '下午7:22',
        isMsgNum: true,
        msgNum: 33,
        avatar:'../../images/avatar/avatar3.jpg'
      },
      {
        msgSender: 'Oliver',
        msgContent: '你好，我是Oliver！',
        msgTime: '下午7:22',
        isMsgNum: true,
        msgNum: 12,
        avatar: '../../images/avatar/avatar2.jpg'
      }
    ]
  },
  onLoad: function() {
    // 实例化 画布
    this.ctx = wx.createCanvasContext('myCanvas');
    this.radius = 10;
    // 手势坐标
    this.x = 300;
    this.y = 300;
    // 控制点坐标
    this.anchorX = 200;
    this.anchorY = 300;
    // 起点坐标
    this.startX = 100;
    this.startY = 100;
    // 判断是否使用曲线
    this.lock = false;  
    //判断是否显示消息提示
    this.show=true;
    // 判断当前消息索引
    this.id='';
    // 消息提示数量
    this.content='';
    // 获取用户信息
    if (wx.getStorageSync('userInfo')) {
      this.setData({
        userInfo: wx.getStorageSync('userInfo')
      })
    }
    // 初次打开 导航栏加载 
    wx.showNavigationBarLoading() 
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

  //我的代办
  myAgent: function(e) {
    wx.navigateTo({
      url: '../myagent/myagent',
    });
  },

  //根据类型查询我的代办
  myAgentByType: function(e) {
    wx.navigateTo({
      url: '../myagent/myagent?type=' + e.currentTarget.dataset.type,
    });
  },
  // 点击用户聊天
  toChat: function (event) {
    wx.navigateTo({
      url: '../chat/chat',
    });
    var that=this;
    // 消息状态变为已查看
    setTimeout(function(){
      let idx = event.currentTarget.dataset.id;
      let temp = 'msglist[' + idx + '].isMsgNum';  // msglist[idx].ismsgNum
      that.setData({
        [temp]: true
      })
    },1000)
   
  },
//  下拉事件
  onPullDownRefresh: function () {
    var that = this;
    wx.showNavigationBarLoading() //在标题栏中显示加载
    //模拟加载
    setTimeout(function () {
     
    // 测试代码
    let newlist=[...that.data.msglist];
      that.setData({
        msglist:that.data.msglist.concat(newlist)
      })
      // 加载完成
      wx.showToast({
        title: '刷新完成',
        icon: 'success',
        duration: 1000
      });
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
       
    }, 1000);
  },
// 监听页面初次渲染完成
  onReady: function () {
    // 渲染完成 停止加载
    setTimeout(function(){
      wx.hideNavigationBarLoading() 
    },1000)
  },
  onDrow: function () {
    console.log(this.ctx.measureText(33).width)
    var distance = Math.sqrt(Math.pow(this.y - this.startY, 2) + Math.pow(this.x - this.startX, 2));
    this.radius = -distance / 15 + 10;
    // 当气泡拉到一定程度，断开链条且链条消失
    if (this.radius < 7) {
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, 10, 0, 2 * Math.PI);
      this.ctx.setFillStyle('red');
      this.ctx.fill();

      this.ctx.beginPath();
      this.ctx.setFontSize(15)
      this.ctx.setFillStyle('white');
      this.ctx.fillText(this.content, this.x - 10, this.y + 6);
      this.ctx.fill();
      // 消息提示不再显示
      this.show=false;
    } else {
      // 链条还没断开时候的状态
      var offsetX = this.radius * Math.sin(Math.atan((this.y - this.startY) / (this.x - this.startX)));
      var offsetY = this.radius * Math.cos(Math.atan((this.y - this.startY) / (this.x - this.startX)));

      var x1 = this.startX - offsetX;
      var y1 = this.startY + offsetY;

      var x2 = this.x - offsetX;
      var y2 = this.y + offsetY;

      var x3 = this.x + offsetX;
      var y3 = this.y - offsetY;

      var x4 = this.startX + offsetX;
      var y4 = this.startY - offsetY;
      // 画贝塞尔曲线
      this.ctx.beginPath();
      this.ctx.moveTo(x1, y1);
      this.ctx.quadraticCurveTo(this.anchorX, this.anchorY, x2, y2);
      this.ctx.lineTo(x3, y3);
      this.ctx.quadraticCurveTo(this.anchorX, this.anchorY, x4, y4);
      this.ctx.lineTo(x1, y1);
      this.ctx.setFillStyle('red');
      this.ctx.fill();
      // 画圆圈
      this.ctx.beginPath();
      this.ctx.arc(this.startX, this.startY, this.radius, 0, 2 * Math.PI)
      this.ctx.arc(this.x, this.y, 10, 0, 2 * Math.PI)
      this.ctx.setFillStyle('red');
      this.ctx.fill();
      // 写字    如何让文字居中，暂时还没想到办法？？
      this.ctx.beginPath();
      this.ctx.setFontSize(15)
      this.ctx.setFillStyle('white');
      this.ctx.fillText(this.content, this.x - 10, this.y + 6);
      this.ctx.fill();
    }
    this.ctx.draw();
  },
  touchmove: function (e) {
    if(this.lock){
      this.x = e.changedTouches[0].x;
      this.y = e.changedTouches[0].y;
      // 控制点
      this.anchorX = (e.changedTouches[0].x + this.startX) / 2;
      this.anchorY = (e.changedTouches[0].y + this.startY) / 2;
      this.onDrow();
    } 
  },
  touchend: function (e) {
    if(this.lock){
      this.ctx.setFillStyle('transparent');
      this.ctx.draw();
      this.lock = false;
      if (this.show) {
        this.data.msglist[this.id].isMsgNum = true;
        this.setData({
          msglist: this.data.msglist
        })
      }
    }
  },
  // 贝塞尔曲线
  tobazier(e){
    this.lock=true;
    this.startX=e.changedTouches[0].clientX;
    this.startY=e.changedTouches[0].clientY; 
    // 获取idx
    let idx = e.currentTarget.dataset.id;
    // 获取索引
    this.id=idx;
    // 获取内容
    this.content = this.data.msglist[idx].msgNum;
    this.data.msglist[idx].isMsgNum=false;
    this.setData({
      msglist:this.data.msglist
    })
  }
})