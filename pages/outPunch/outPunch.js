// pages/outPunch/outPunch.js
// 获取时间
const util = require('../../utils/util.js');
const formatTime = util.formatTime;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    punchTime:'', //打卡时间
    punchLoca:'', //打卡地点
    description:'', //描述
    imgSrc:'', //图片地址
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let outData = JSON.parse(options.outData);
    this.setData({
      punchTime:outData.punchTime,
      punchLoca:outData.punchLoca
    });
    setInterval(()=>{
      let clock = formatTime(new Date()).split(' ')[1];
      this.setData({
        punchTime: clock
      })
    },1000)
  },
  // 获取描述
  getContent:function(res){
    this.setData({
      description:res.detail.value
    })
  },
  // 选择图片
  toChooseImg:function(){
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success:res=>{
        this.setData({
          imgSrc: res.tempFilePaths
        })
      }
    })
  },
  // 提交信息
  toSubmit:function(){
    wx.showToast({
      title: '打卡成功',
      icon:'success',
      duration:1000
    })
  }
})