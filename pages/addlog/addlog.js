// pages/addlog/addlog.js
const util = require('../../utils/util.js');
const formatTime = util.formatTime;
Page({
  data: {
    title:'',//导航栏标题
    type:'',//当前添加类型
    time:'',  //当前时间
    data:{
      fontSize0: '38rpx', //文本框字体大小
      fontSize1: '38rpx',
      fontSize2: '38rpx',
      fontSize3: '38rpx',
      color0:'#000',//字体颜色设置
      color1: '#000',
      color2: '#000',
      color3: '#000',
      checkIcon:'icon-unchecked', //选择图标
     },
    todayDone:'',  //今日完成工作
    todayUndone:'', //今日未完成工作
    todayCoor:'',  //今日需协调工作
    weekDone:'', //本周完成工作
    weekPlan:'', //下周工作计划
    weekSummary:'', //本周工作总结
    weekCoor:'',//需协调帮助
    monthDone:'', //本月完成工作
    monthPlan:'',//下月工作计划
    monthSummary:'', //本月工作总结
    monthCoor:'', //需协调帮助

  },
// 加载
  onLoad: function (options) {
    // 获取当前添加日志类型
   let type=options.type.toString();
   switch(type){
     case '0':
      this.setData({
        type:0,
        title:'日报'
      });
      break;
     case '1':
       this.setData({
         type: 1,
         title: '周报'
       });
      break;
     case '2':
       this.setData({
         type: 2,
         title: '月报'
       });
     break;
   };
  //  设置导航栏标题
   wx.setNavigationBarTitle({
     title: this.data.title
   });
  //  设置时间
  let time = formatTime(new Date()).split(' ')[1].split(':');
  time = time[0] + ':' + time[1];
   this.setData({
     time:time
   });
   setInterval(()=>{
     let time = formatTime(new Date()).split(' ')[1].split(':');
     time = time[0] + ':' + time[1];
     this.setData({
       time: time
     });
   },1000)
  },
  // 获取表单内容
  getContent:function(event){
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面
    let currData= event.detail.value;
    switch(this.data.type.toString()){
      case '0':
        prevPage.data.sendList.data[0].data[prevPage.data.sendList.data[0].data.length] = {
          type: this.data.type,
          content: { //内容
            todayDone: currData.todayDone, //今日完成工作
            todayUndone: currData.todayUndone, //今日未完成工作
            todayCoor: currData.todayCoor, //今日需协调工作
          },
          time: formatTime(new Date()).replace(/\-/g,'/').split(' ')[0]+' '+this.data.time, //时间
        };
        prevPage.data.sendList.total.data[0].daily +=1;
      break;
      case '1':
        prevPage.data.sendList.data[0].data[prevPage.data.sendList.data[0].data.length] = {
          type: this.data.type,
          content: { //内容
            weekDone: currData.weekDone, //本周完成工作
            weekPlan: currData.weekPlan, //下周工作计划
            weekSummary: currData.weekSummary, //本周工作总结
            weekCoor: currData.weekCoor, //需协调帮助
          },
          time: formatTime(new Date()).replace(/\-/g, '/').split(' ')[0] + ' ' + this.data.time, //时间
        };
        prevPage.data.sendList.total.data[0].weekly += 1;
      break;
      case '2':
        prevPage.data.sendList.data[0].data[prevPage.data.sendList.data[0].data.length] = {
          type: this.data.type,
          content: { //内容
            monthDone:currData.monthDone, //本月完成工作
            monthPlan: currData.monthPlan, //下月工作计划
            monthSummary: currData.monthSummary, //本月工作总结
            monthCoor: currData.monthCoor, //需协调帮助
          },
          time: formatTime(new Date()).replace(/\-/g, '/').split(' ')[0] + ' ' + this.data.time, //时间
        };
        prevPage.data.sendList.total.data[0].monthly += 1;
      break;
    }
    prevPage.setData({
      sendList: prevPage.data.sendList,
      activeIndex:1
    });
    // 返回
    wx.navigateBack();
  },
  // textarea获取焦点时设置样式
  styleSet:function(event){
    let idx=event.currentTarget.dataset.idx;
    let temp1='fontSize'+idx;
    let temp2='color'+idx;
    this.data.data[temp1]='28rpx';
    this.data.data[temp2] ='#01AAED';
    this.setData({
      data:this.data.data
    });
    // console.log( JSON.stringify(this.data.data));
  },
  // textarea失去焦点时设置样式
  styleUnset:function(event){
    let idx = event.currentTarget.dataset.idx;
    let temp1 = 'fontSize' + idx;
    let temp2 = 'color' + idx;
    if(event.detail.value===''){
      this.data.data[temp1] = '38rpx';
      this.data.data[temp2] = '#000';
    }else{
      this.data.data[temp1] = '28rpx';
      this.data.data[temp2] = 'gray';
    }
    this.setData({
      data: this.data.data
    });
    // console.log(JSON.stringify(this.data.data));
  },
  // 选择图片
  tochooseImg:function(){
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
      }
    })
  },
  // 日志转聊天
  toSwitchChat:function(){
    if (this.data.data.checkIcon ==='icon-unchecked'){
      this.data.data.checkIcon ='icon-checked';
    }else{
      this.data.data.checkIcon = 'icon-unchecked';
    }
    this.setData({
      data:this.data.data
    })
  }
})