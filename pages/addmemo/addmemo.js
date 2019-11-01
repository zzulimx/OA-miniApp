// pages/addmemo/addmemo.js
var formatTime = require('../../utils/util.js').formatTime;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status:'', //create新建 | display预览  |edit编辑
    scrollLeft:0,  //编辑便签工具栏左侧滚动条距离
    lockLeft:false,  //滚动条左侧按钮控制
    lockRight: true, //滚动条右侧按钮控制
    content:'', //当前便签内容
    isTop:false, //是否置顶
    memoId:0 ,// 标签索引
    isChange: false, //判断isTop最终是否改变
  },
// 页面加载
  onLoad: function (options) {
  //  设置当前导航栏标题
      wx.setNavigationBarTitle({
        title: options.title
      });
      // 获取当前状态
    this.setData({
      status:options.status
    });
    // 获取上一页
    let pages = getCurrentPages();
    let prePage = pages[pages.length - 2];
    // 跟据状态设置标签来源
    if(options.status === 'display'){
      // 获取标签id 类型
      this.setData({
        memoId: parseInt(options.idx),
        type: options.type
      });
      var currData = '';
      var isTop='';
        if (options.type === 'normal') {
          currData = prePage.data.recently.data[this.data.memoId];
          isTop = false;
        } else {
          currData = prePage.data.recently.topData[this.data.memoId];
          isTop = true;
        };
      this.setData({
        content: currData.content,
        isTop: isTop
      });
    } else if (options.status === 'create'){

    }
  },
  // 初始化editor
  onEditorReady() {
    const that = this;
    wx.createSelectorQuery().select('#editor').context(function (res) {
      that.editorCtx = res.context
    }).exec()
  },
  // 初始化编辑器预览
  onDisplayReady(){
    const that = this
    wx.createSelectorQuery().select('#editorDis').context(function (res) {
      that.editorDis = res.context;
      that.editorDis.setContents({
        html: that.data.content.html,
        delta: that.data.content.delta,
        fail(){

        }
      })
    }).exec();
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
  // 添加便签工具栏向左滑动按钮
  toLeft(){
    if(this.data.lockLeft){
      let dis = this.scrollDis ? this.scrollDis : parseInt(this.data.scrollLeft);
      dis = dis - 150 + 'px';
      this.setData({
        scrollLeft: dis,
        lockRight:true
      })
    }
  },
  // 便签工具栏向右滑动按钮
  toRight(){
    if(this.data.lockRight){
      let dis = this.scrollDis? this.scrollDis : parseInt(this.data.scrollLeft);
      dis = dis + 150 + 'px';
      this.setData({
        scrollLeft: dis,
        lockLeft: true
      });
    }
  },
  // 便签工具栏滑动到左边触发事件
  getLeft(){
    this.setData({
       lockLeft:false
    });
  },
  //  便签工具栏滑动到右边边触发事件
  getRight(){
    this.setData({
      lockRight: false,
    });
  },
  // 滚动条滚动触发事件
  scrollBar(e){
    let scrollDis = e.detail.scrollLeft;
    this.scrollDis = scrollDis;
    if(this.scrollDis>0){
      this.setData({
        lockLeft:true
      })
    }
  },
  // 获取选择的颜色
  getColor(e) {
    let idx = e.currentTarget.dataset.idx;
    let color = e.currentTarget.dataset.color;
    let bgcolor =color.split(',');
        bgcolor = bgcolor[0] + ',' + bgcolor[1] + ',' + bgcolor[2]+')';
    if (this.color === color){  
      var bg = 'background' + idx;
      this.setData({
        [bg]: '#fff'
      });
      this.color=null;
      this.bgcolor=null;
      return;
    }
    var bg = '';
    // 清除其他颜色背景
    for (let k = 1; k <= 5; k++) {
      bg = 'background' + k;
      this.setData({
        [bg]: '#fff'
      });
    }
    // 设置当前选中背景
    bg = 'background' + idx;
    this.setData({
      [bg]: bgcolor
    });
    this.color = color;
  },
  // 设置置顶
  topSet(e){
    this.setData({
      isTop: e.detail.value
    });
    this.setData({
      isChange: !this.data.isChange
    })
    console.log(this.data.isChange)
  },
  // 获取输入内容
  getContent(e){
    this.setData({
      content:{
        delta: e.detail.delta,
        html: e.detail.html,
        text: e.detail.text.split(/\n/)[0]
      }
    });
  },
  // 保存
  saveMemo(){
    console.log(this.data.status);
    console.log(this.data.memoId)
    // 获取上一个页面
    let pages = getCurrentPages();
    let prePage = pages[pages.length - 2];
    let createTime = formatTime(new Date()); 
    if (!this.color){
      this.color = '#fff';
    }
    // 获取当前页面数据
    let thisData = {
      content: this.data.content,
      date: createTime,
      bgColor: this.color,
      isCheck: false
    }
    // 根据不同的状态创建或更改便签  
    // 当前为创建便签
    if (this.data.status === 'create') {
      // 保存后将页面设置为展示状态
      this.setData({
        status: 'display'
      });
      // 保存到上页数据
      if(this.data.isTop){
        prePage.data.recently.topData.unshift(thisData);
      }else{
        prePage.data.recently.data.unshift(thisData);
      }
       this.setData({
         memoId:0
       });
    } else if (this.data.status === 'edit') {
      // 保存后将页面设置为展示状态
      this.setData({
        status: 'display'
      });
      // 如果置顶改变
      if (this.data.isChange) {
        // 改变后为置顶便签
        if (this.data.isTop) {
          //  先添加到置顶便签 再删除原来
          console.log(this.data.isTop)
          prePage.data.recently.topData.unshift(thisData);
          prePage.data.recently.data.splice(this.data.memoId,1);

        } else {  //改变后为普通便签
          console.log(this.data.isTop)
          prePage.data.recently.data.unshift(thisData);
          prePage.data.recently.topData.splice(this.data.memoId, 1);
        }
        // 如果置顶未改变
      } else {

        if (this.data.isTop) {  //置顶便签
          prePage.data.recently.topData[this.data.memoId] = thisData;
        } else {  //普通便签
          prePage.data.recently.data[this.data.memoId] = thisData;
        }

      }
    }
    // 保存
    prePage.setData({
      recently: prePage.data.recently
    })
  },
  // 编辑
  toEdit(){
    this.setData({
       status:'edit'
    });
    const that = this;
    wx.createSelectorQuery().select('#editor').context(function (res) {
      that.editorCtx = res.context;
      that.editorCtx.setContents({
        delta: that.data.content.delta,
        html:that.data.content.html
      })
    }).exec()
  },
 
})