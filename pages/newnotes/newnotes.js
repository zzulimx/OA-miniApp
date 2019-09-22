// pages/newnotes/newnotes.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    content:'', //即时输入内容
    notesName:'',
    infoHeight:'90px' //标题栏高度
  },
  // 标题框聚焦
  infoSet:function(){
    if(this.timer){
      clearTimeout(this.timer)
    }
    this.setData({
      infoHeight: '90px'
    })
  },
  // 标题框失去焦点
  infocancel:function(){
    this.timer=setTimeout(()=>{
       this.setData({
         infoHeight:0
       })
    },2000)
  },
  // 点击设置标题
  setInfo:function(){
    clearTimeout(this.timer);
    if(this.data.infoHeight=== 0){
      this.setData({
        infoHeight: '90px'
      });
      this.infocancel();
    }else{
      this.setData({
        infoHeight: 0
      })
    }
  },
  // 初始化editor
  onEditorReady() {
    const that = this
    wx.createSelectorQuery().select('#editor').context(function (res) {
      that.editorCtx = res.context
    }).exec()
  },
  // 获取输入内容
  getContent:function(e){
    // 拼接输入内容
    var currContent='';
    e.detail.delta.ops.forEach((item,index)=>{
      if(item.insert.image){
        currContent += '![]('+item.insert.image+')';
      }else{
        currContent += item.insert;
      }    
    })
    this.setData({
      content:currContent
    })
  },
  // 撤销
  undo: function () {
    this.editorCtx.undo();
  },
  // 恢复
  redo: function () {
    this.editorCtx.redo();
  },
  // 插入图片
  insertImg:function(){
    wx.chooseImage({
      count:1,
      sourceType: ['album', 'camera'],
      success:(res)=> {
        this.editorCtx.insertImage({
          src: res.tempFilePaths[0]
        });
      },
    });
   
  },
  // 获取新建笔记名称
  notesName:function(e){ 
      this.setData({
        notesName: e.detail.value
      })
  },
  // 保存笔记
  saveNotes:function(){
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面

    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    //不需要页面更新
    if (this.data.notesName === ''){
      this.data.notesName='新建笔记'
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
  }
})