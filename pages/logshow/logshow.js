  var userInfo;
//获取应用实例
const app = getApp();
Page({
   data:{  
     senderName: '',  //日志作者
     senderAvatar:'',  //作者头像
     logType:'',   //日志类型  0日报  1周报 2月报
     sendTime:'',//时间
     todayDone: '', //今日完成工作
     todayUndone: '', //今日未完成工作
     todayCoor: '', //需协调帮助
     weekDone: '', //本周完成工作
     weekPlan: '', //下周工作计划
     weekSummary: '', //本周工作总结
     weekCoor: '', //需协调帮助
     monthDone: '', //本月完成工作
     monthPlan: '', //下月工作计划
     monthSummary: '', //本月工作总结
     monthCoor: '', //需协调帮助
   },
   onLoad:function (options){
    //  获取用户信息
     if (wx.getStorageSync('userInfo')) {
         userInfo= wx.getStorageSync('userInfo')
     };
     let currData = JSON.parse(options.currData);
     let pages = getCurrentPages();
     //  获取上一页
     let prePage = pages[pages.length-2];
     // 获取当前日志索引
        let parent = currData.parent;
        let child = currData.child; 
     let activeIndex = currData.activeIndex;
    //  日志为收到的日志
     if(activeIndex===0){
       let preRecData = prePage.data.receiveList;
       var currLog = preRecData[parent].data[child];
       this.setData({
          senderName:currLog.sender,
         senderAvatar:currLog.avatarUrl
       });
       console.log(currLog)
     }else{   //日志为发出的日志
       let preSendData = prePage.data.sendList;
       var currLog = preSendData.data[parent].data[child];
         this.setData({
           senderName: userInfo.nickName,
           senderAvatar: userInfo.avatarUrl
         })
     }
    //  判断日志类型
      switch(currLog.type){
        case 0:
           this.setData({
             logType:'日报',
             todayDone: currLog.content.todayDone,
             todayUndone: currLog.content.todayUndone,
             todayCoor: currLog.content.todayCoor
           });
           break;
        case 1: 
          this.setData({
            logType: '周报',
            weekDone: currLog.content.weekDone,
            weekPlan: currLog.content.weekPlan,
            weekSummary: currLog.content.weekSummary,
            weekCoor: currLog.content.weekCoor
          });
          break;
        case 2: this.setData({
          logType: '月报',
          monthDone: currLog.content.monthDone,
          monthPlan: currLog.content.monthPlan,
          monthSummary: currLog.content.monthSummary,
          monthCoor: currLog.content.monthCoor
        });
          break;
      }
      this.setData({
        sendTime:currLog.time
      })
   }
})