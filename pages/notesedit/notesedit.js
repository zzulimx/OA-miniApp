// pages/newnotes/newnotes.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id:'', //当前索引
    textHeight:'100%', 
    symbolBottom: 0,
    infoHeight:'90px',
    content: '', //即时输入内容
    textValue: '',  //文本域内容设置
    notesName: '',
  },
  // 初始化编辑器
  onEditorReady() {
    const that = this
    wx.createSelectorQuery().select('#editor').context(function (res) {
      that.editorCtx = res.context;
      that.editorCtx.setContents({
        html: that.data.textValue
      })
    }).exec();
  },
  // 撤销
  undo:function(){
    this.editorCtx.undo();
  },
  // 恢复
  redo:function(){
    this.editorCtx.redo();
  },
  // 插入图片
  insertImg: function () {
    wx.chooseImage({
      count: 1,
      sourceType: ['album', 'camera'],
      success: (res) => {
        this.editorCtx.insertImage({
          src: res.tempFilePaths[0]
        });
      },
    });

  },
  // 获取输入内容
  getContent: function (e) {
    // 拼接输入内容
    var currContent = '';
    e.detail.delta.ops.forEach((item, index) => {
      if (item.insert.image) {
        currContent += '![](' + item.insert.image + ')';
      } else {
        currContent += item.insert;
      }
    })
    this.setData({
      content: currContent
    })
  },
  // 获取新建笔记名称
  notesName: function (e) {
    this.setData({
      notesName: e.detail.value
    })
    console.log(this.data.notesName);
  },
  saveNotes: function () {
    // 点击保存需要修改两层页面 上一层和上上层
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面
    var prevaginPage = pages[pages.length - 3];  //上一个页面

    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    //不需要页面更新
    // 设置上一个也页面
    let articleData = app.towxml.toJson(this.data.content, 'markdown');
    prevPage.setData({
      title: this.data.notesName,
      article: articleData,
      content: this.data.content,
    });
    // 设置上上个页面
    prevaginPage.data.noteslist[this.data.id] = {
      fileSize: '0KB',
      title: this.data.notesName,
      id: 0,
      createTime: '2019-06-13 17:48',
      tag: '',
      isShow: true,
      url: ' ',
      content: this.data.content,
    }
    prevaginPage.setData({
      noteslist:prevaginPage.data.noteslist
    })
    wx.navigateBack();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取索引，标题，内容
    this.setData({
       id:options.id,
       notesName:options.title,
       textValue:options.content
    });
  }
})