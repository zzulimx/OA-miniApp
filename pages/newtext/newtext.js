// pages/richtext/richtext.js
Page({
  data: {
    formats: {},
    bottom: 0,
    readOnly: false,
    placeholder: '开始输入...',
    _focus: false,
    infoHeight: '90px', //标题栏高度
    toolHeight:0,
    editorTop:'50px', //editor的top值
    notesName: '',
    content:'' //输入内容
  },
  onLoad() {
    wx.loadFontFace({
      family: 'Pacifico',
      source: 'url("https://sungd.github.io/Pacifico.ttf")',
      success: console.log
    })
  },
  // 获取输入内容
  getContent:function(event){
    this.setData({
      content: event.detail
    })
  },
  // 标题框聚焦
  infoSet: function () {
    if (this.timer) {
      clearTimeout(this.timer)
    }
    this.setData({
      infoHeight: '90px',
      editorTop:'150px'
    })
  },
  // 标题框失去焦点
  infocancel: function () {
    this.timer = setTimeout(() => {
      this.setData({
        infoHeight: 0,
        editorTop:'50px'
      })
    }, 2000)
  },
  // 点击设置标题
  setInfo: function () {
    if (this.data.toolHeight === 0) {
      clearTimeout(this.timer);
      if (this.data.infoHeight === 0) {
        this.setData({
          infoHeight: '90px',
          editorTop:'140px'
        });
        this.infocancel();
      } else {
        this.setData({
          infoHeight: 0,
          editorTop:'50px'
        })
      }
    }
  },
  // 打开文本编辑操作栏
  operateTool:function(){
     if(this.data.infoHeight!==0){
       this.setData({
         toolHeight:0,
       })
     }else if(this.data.toolHeight===0){
       this.setData({
         toolHeight: '160px',
         editorTop:'210px'
       })
     }else if(this.data.toolHeight!==0){
       this.setData({
         toolHeight: 0,
         editorTop:'50px'
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
  //撤销
  undo() {
    this.editorCtx.undo()
  },
  // 恢复
  redo() {
    this.editorCtx.redo()
  },
  format(e) {
    let { name, value } = e.target.dataset
    if (!name) return
    // console.log('format', name, value)
    this.editorCtx.format(name, value)

  },
  onStatusChange(e) {
    const formats = e.detail
    this.setData({ formats })
  },
  insertDivider() {
    this.editorCtx.insertDivider({
      success: function () {
        console.log('insert divider success')
      }
    })
  },
  // 清空
  clear() {
    this.editorCtx.clear({
      success: function (res) {
        console.log("clear success")
      }
    })
  },
  removeFormat() {
    this.editorCtx.removeFormat()
  },
  // 插入日期
  insertDate() {
    const date = new Date()
    const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    this.editorCtx.insertText({
      text: formatDate
    })
  },
  // 插入图片
  insertImage() {
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
  // 获取新建笔记名称
  notesName: function (e) {
    this.setData({
      notesName: e.detail.value
    })
  },
  // 保存笔记
  saveNotes: function () {
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面

    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    //不需要页面更新
    if (this.data.notesName === '') {
      this.data.notesName = '新建笔记'
      this.setData({
        notesName: this.data.notesName
      })
    }
    prevPage.data.noteslist[prevPage.data.noteslist.length] = {
      fileSize: '0KB',
      fileType:'text',
      title: this.data.notesName,
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
    // console.log(this.data.content)
    wx.navigateBack();
  }
})
