// pages/textedit/textedit.js
Page({
  data: {
    formats: {},
    bottom: 0,
    readOnly: false,
    placeholder: '开始输入...',
    _focus: false,
    infoHeight: '90px', //标题栏高度
    toolHeight: 0,
    editorTop: '140px', //editor的top值
    id:'',
    notesName: '',
    content: '' //输入内容
  },
  onLoad(options) {
    let content = JSON.parse(options.content);
    this.setData({
      id:options.id,
      content:content,
      notesName:options.title
    }); 
  },
  // 获取输入内容
  getContent: function (event) {
    this.setData({
      content: event.detail
    })
  },
  // 初始化editor
  onEditorReady() {
    const that = this;
    wx.createSelectorQuery().select('#editor').context(function (res) {
      that.editorCtx = res.context;
      // 设置内容
      that.editorCtx.setContents({
        html: that.data.content.html,
        delta: that.data.content.delta,
        fail: (res) => {
          console.log(res)
          console.log(that.data.content)
        }
      })
    }).exec()
  },
  // 点击设置标题
  setInfo: function () {
    if (this.data.toolHeight === 0) {
      if (this.data.infoHeight === 0) {
        this.setData({
          infoHeight: '90px',
          editorTop: '140px'
        });
      } else {
        this.setData({
          infoHeight: 0,
          editorTop: '50px'
        })
      }
    }
  },
  // 打开文本编辑操作栏
  operateTool: function () {
    if (this.data.infoHeight !== 0) {
      this.setData({
        toolHeight: 0,
      })
    } else if (this.data.toolHeight === 0) {
      this.setData({
        toolHeight: '160px',
        editorTop: '210px'
      })
    } else if (this.data.toolHeight !== 0) {
      this.setData({
        toolHeight: 0,
        editorTop: '50px'
      })
    }
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
    // 点击保存需要修改两层页面 上一层和上上层
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];  //上一个页面
    var prevaginPage = pages[pages.length - 3];  //上一个页面

    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    //不需要页面更新
    // 设置上一个也页面
    prevPage.setData({
      title: this.data.notesName,
      content: this.data.content,
    });
    // 设置上上个页面
    prevaginPage.data.noteslist[this.data.id] = {
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
    prevaginPage.setData({
      noteslist: prevaginPage.data.noteslist
    })
    wx.navigateBack();
  }
})
