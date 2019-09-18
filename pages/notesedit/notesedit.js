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
  inputFocus: function (event) {
    if (event.detail.height) {
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
  getContent: function (e) {
    this.setData({
      content: e.detail.value
    })
  },
  // 底部栏添加内容
  addtitle: function () {

    this.setData({
      textValue: this.data.content + '#',
      content: this.data.content + '#'
    });
  },
  addlist: function () {
    this.setData({
      textValue: this.data.content + '-',
      content: this.data.content + '-'
    });
  },
  addbind: function () {
    this.setData({
      textValue: this.data.content + '**',
      content: this.data.content + '**'
    });
  },
  addlink: function () {
    this.setData({
      textValue: this.data.content + '>',
      content: this.data.content + ''
    });
  },
  addcheck: function () {
    this.setData({
      textValue: this.data.content + '- [x] ',
      content: this.data.content + '- [x] '
    });
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
    this.getScrollHeight();
  },
  // 封装函数获取ID为box的元素实际高度 
  getScrollHeight: function () {
    wx.createSelectorQuery().select('#box').boundingClientRect((rect) => {
      this.setData({
        scrollHeight: rect.height
      })
      // console.log(this.data.scrollHeight)
    }).exec()
  },
    //监听用户滑动页面事件
  onPageScroll: function (e) {
    if (e.scrollTop <= 0) {
      // 滚动到最顶部
      e.scrollTop = 0;
    } else if (e.scrollTop > this.data.scrollHeight) {
      // 滚动到最底部
      e.scrollTop = this.data.scrollHeight;
    }
    if (e.scrollTop > this.data.scrollTop || e.scrollTop >= this.data.scrollHeight) {
      //向下滚动 
      // console.log('向下 ', this.data.scrollHeight)
      this.setData({
        infoHeight: '90px'
      })
      
    } else {
      //向上滚动 
      // console.log('向上滚动 ', this.data.scrollHeight)
       this.setData({
          infoHeight: 0
        })
    }
    //给scrollTop重新赋值 
    this.setData({
      scrollTop: e.scrollTop
    })
  }
})