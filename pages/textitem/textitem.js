// pages/textitem/textitem.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '', //当前索引
    title: '',  //当前笔记标题
    isloading: true,
    content: '',  //未编译rich内容
  },
  // 初始化编辑器
  onEditorReady() {
    const that = this;
    wx.createSelectorQuery().select('#editor').context(function (res) {
      that.editorCtx = res.context;
      that.editorCtx.setContents({
        html: that.data.content.html,
        delta:that.data.content.delta,
        fail: (res) => {
          console.log(res)
        }
      })
    }).exec();
  },
  // 跳转到编辑
  toedit(){
    // 防止字符串被截取
    let content = JSON.stringify(this.data.content).replace(/\=/g,'%3D');
    wx.navigateTo({
      url: '/pages/textedit/textedit?content=' + content + ' &title=' + this.data.title + '&id=' + this.data.id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id;
    let title = options.title;
    // 设置导航栏标题
    wx.setNavigationBarTitle({
      title: title
    });
    let content =JSON.parse(options.content);
    this.setData({
      id: id,
      title: title,
      content: content,
      isloading: false
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onShow: function () {
    var that = this;
    wx.setNavigationBarTitle({
      title: this.data.title
    });
    if(this.editorCtx){
      that.editorCtx.setContents({
        html: that.data.content.html,
        delta: that.data.content.delta,
        fail: (res) => {
          console.log(res)
        }
      })
    }
  }
})