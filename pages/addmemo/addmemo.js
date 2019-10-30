// pages/addmemo/addmemo.js
var formatTime = require('../../utils/util.js').formatTime;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status:'', //edit编辑 | display预览  
    scrollLeft:0,  //滚动条距离
    lockLeft:false,  //滚动条左侧按钮控制
    lockRight: true, //滚动条右侧按钮控制
    content:'', //当前便签内容
    isTop:false, //是否置顶
    isGroup:false,
    groupId:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 判断当前页是否来自分组 / 随笔
   if(options.isGroup){
     this.setData({
       isGroup:true
     })
   };
  //  获取当前分组id
   if(options.groupId){
     this.setData({
       groupId: options.groupId
     })
   }
  //  获取当前导航栏标题
    let title = options.title;
    // 获取标签状态 置顶/普通便签
    let status = options.status;
      wx.setNavigationBarTitle({
        title: title
      });
    this.setData({
      status:status
    });
    let pages = getCurrentPages();
    let prePage = pages[pages.length - 2];
    // 跟据状态设置标签来源
    if(options.status === 'display'){
      // 获取标签id
      let idx = options.idx;
      let type = options.type;
      var currData = '';
      var isTop='';
      // 如果来自分组下的便签
      if (!options.groupDis){
        if (type === 'normal') {
          currData = prePage.data.recently.data[idx];
          isTop = false;
        } else {
          currData = prePage.data.recently.topData[idx];
          isTop = true;
        };
      }else{  //来自随笔
        if (type === 'normal') {
          currData = prePage.data.normalData[idx];
          isTop = false;
        } else {
          currData = prePage.data.topData[idx];
          isTop = true;
        };
      }
     
      this.setData({
        content:currData.content,
        isTop:isTop
      });
    };
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

        },
        success(){
          // console.log(that.data.content)
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
  // 向左滑动
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
  // 向右滑动
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
  // 滑动到左边
  getLeft(){
    this.setData({
       lockLeft:false
    });
  },
  // 滑动到右边
  getRight(){
    this.setData({
      lockRight: false,
    });
  },
  // 滚动条滚动事件
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
      isTop:e.detail.value
    })
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
    // 获取上一个页面
    let pages = getCurrentPages();
    let prePage = pages[pages.length - 2];
    let preAgin = pages[pages.length - 3];
    this.setData({
      status:'display'
    });
    let createTime = formatTime(new Date()); 
    if (!this.color){
      this.color = '#fff';
    }
    // 添加到上层页面数据中    //页面来自随笔
    if(!this.data.isGroup){
      if (this.data.isTop) {
        prePage.data.recently.topData.unshift({
          content: this.data.content,
          date: createTime,
          bgColor: this.color,
          isCheck: false
        })
      } else {
        prePage.data.recently.data.unshift({
          content: this.data.content,
          date: createTime,
          bgColor: this.color,
          isCheck: false
        })
      }
      prePage.setData({
        recently: prePage.data.recently
      });
    }else{
      if (this.data.isTop) {
        preAgin.data.group.data[parseInt(this.data.groupId)].childData.topData.unshift({
          content: this.data.content,
          date: createTime,
          bgColor: this.color,
          isCheck: false
        })
      } else {
        // prePage.data.normalData.unshift({
        //   content: this.data.content,
        //   date: createTime,
        //   bgColor: this.color,
        //   isCheck: false
        // })
        preAgin.data.group.data[parseInt(this.data.groupId)].childData.normalData.unshift({
          content: this.data.content,
          date: createTime,
          bgColor: this.color,
          isCheck: false
        })
    }
      prePage.setData({
        normalData: prePage.data.normalData,
        topData:prePage.data.topData
      });

       preAgin.setData({
         group:preAgin.data.group
       })
    }
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