// pages/newnotes/newnotes.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    symbolBottom:0,
    content:'', //即时输入内容
    textValue:'',  //文本域内容设置
    notesName:''
  },
  inputFocus:function(event){
   if(event.detail.height){
     let keyboardHeight = event.detail.height;
     this.setData({
       symbolBottom: keyboardHeight + 'px'
     })
   }
  },
  inputBlur: function (event) {
    this.setData({
      symbolBottom: 0
    })
  },
  getContent:function(e){
    this.setData({
      content:e.detail.value
    })
  },
  // 底部栏添加内容
  addtitle:function(){
    
    this.setData({
      textValue: this.data.content+'#',
      content: this.data.content + '#'
    });
  },
  addlist:function(){
    this.setData({
      textValue: this.data.content + '-',
      content: this.data.content + '-'
    });
  },
  addbind:function(){
    this.setData({
      textValue: this.data.content + '*',
       content: this.data.content + '*'
    });
  },
  addlink:function(){
    this.setData({
      textValue: this.data.content + '>',
      content: this.data.content + '>'
    });
  },
  addcheck:function(){
    this.setData({
      textValue: this.data.content + '[x]',
      content: this.data.content + '[x]'
    });
  },
  // 获取新建笔记名称
  notesName:function(e){ 
      this.setData({
        notesName: e.detail.value
      })
  },
  saveNotes:function(){
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面

    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    //不需要页面更新
    if (this.data.notesName === ''){
      this.data.notesName='新建笔记.md'
      this.setData({
        notesName:this.data.notesName
      })
    }
    prevPage.data.noteslist[prevPage.data.noteslist.length] = {
      fileSize: '0KB',
      title:this.data.notesName ,
      id: 0,
      createTime: '2019-06-13 17:48',
      tag: '',
      isShow: true,
      url: ' ',
      content: this.data.content,
    }
    prevPage.setData({
      noteslist: prevPage.data.noteslist
    });
    wx.navigateBack();
    console.log(this.data.notesName);
    console.log(this.data.content);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})