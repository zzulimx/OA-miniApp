// pages/addmemo/addmemo.js
var formatTime = require('../../utils/util.js').formatTime;
Page({
  data: {
    status: '', //edit编辑 | display预览  | create创建
    content: '', //当前便签内容
    isTop: false, //是否置顶
    groupId: '', //便签所在分组索引
    memoId:0,  //便签索引
    scrollLeft: 0,  //编辑便签工具栏左侧滚动条距离
    lockLeft: false,  //滚动条左侧按钮控制
    lockRight: true, //滚动条右侧按钮控制
    isChange:false, //判断isTop最终是否改变
  },
//  页面加载
  onLoad: function (options) {
    // 获取当前状态 创建/展示 当前分组id
      this.setData({
        groupId: parseInt(options.groupId),
        status:options.status
      })
      // 获取上一页
    let pages = getCurrentPages();
    let prePage = pages[pages.length - 2];
    // 跟据状态 设置样式
    // 展示页面 
    if (options.status === 'display') {
      // 获取标签id 标签类型
       this.setData({
         memoId:parseInt(options.idx),
         type:options.type
       })
      var currData = '';
      var isTop = '';
      if (options.type === 'normal') {  //非置顶便签
        currData = prePage.data.normalData[this.data.memoId];
          isTop = false;
      } else {
        currData = prePage.data.topData[this.data.memoId];
          isTop = true;
        };
      this.setData({
        content: currData.content,
        isTop: isTop
      });
    }else if(options.status==='create'){  //便签编辑
        
    }
  },
  // 初始化editor 创建
  onEditorReady() {
    const that = this;
    wx.createSelectorQuery().select('#editor').context(function (res) {
      that.editorCtx = res.context
    }).exec()
  },
  // 初始化编辑器  展示
  onDisplayReady() {  
    const that = this
    wx.createSelectorQuery().select('#editorDis').context(function (res) {
      that.editorDis = res.context;
      that.editorDis.setContents({
        html: that.data.content.html,
        delta: that.data.content.delta,
        fail() {
        }, 
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
  toLeft() {
    if (this.data.lockLeft) {
      let dis = this.scrollDis ? this.scrollDis : parseInt(this.data.scrollLeft);
      dis = dis - 150 + 'px';
      this.setData({
        scrollLeft: dis,
        lockRight: true
      })
    }
  },
  // 向右滑动
  toRight() {
    if (this.data.lockRight) {
      let dis = this.scrollDis ? this.scrollDis : parseInt(this.data.scrollLeft);
      dis = dis + 150 + 'px';
      this.setData({
        scrollLeft: dis,
        lockLeft: true
      });
    }
  },
  // // 编辑便签工具栏滚动条滚动到最左侧触发事件
  getLeft() {
    // 锁定向左滚动事件
    this.setData({
      lockLeft: false
    });
  },
  // 编辑便签工具栏滚动条滚动到最右侧触发事件
  getRight() {
    // 锁定向右滚动事件
    this.setData({
      lockRight: false,
    });
  },
  // 编辑便签工具栏滚动条滚动触发事件
  scrollBar(e) {
    // 设置当前的scrollLeft值 
    this.scrollDis = e.detail.scrollLeft;
    // 当滚动条距离左侧距离大于0时，解锁向左滚动事件
    if (this.scrollDis > 0) {
      this.setData({
        lockLeft: true
      })
    }
  },
  // 获取选择的颜色
  getColor(e) {
    let idx = e.currentTarget.dataset.idx;
    let color = e.currentTarget.dataset.color;
    let bgcolor = color.split(',');
    bgcolor = bgcolor[0] + ',' + bgcolor[1] + ',' + bgcolor[2] + ')';
    if (this.color === color) {
      var bg = 'background' + idx;
      this.setData({
        [bg]: '#fff'
      });
      this.color = null;
      this.bgcolor = null;
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
  topSet(e) {
    this.setData({
      isTop: e.detail.value
    });
    this.setData({
      isChange:!this.data.isChange
    })
  },
  // 获取输入内容
  getContent(e) {
    this.setData({
      content: {
        delta: e.detail.delta,
        html: e.detail.html,
        text: e.detail.text.split(/\n/)[0]
      }
    });
  },
  // 保存
  saveMemo() {
    // 获取上一个页面 上上个页面
    let pages = getCurrentPages();
    let prePage = pages[pages.length - 2];
    let preAgin = pages[pages.length - 3];
    // 获取当前时间
    let createTime = formatTime(new Date());
    // 获取当前选中背景色
    if (!this.color) {
      this.color = '#fff';
    }
    let thisData = {
      content: this.data.content,
      date: createTime,
      bgColor: this.color,
      isCheck: false
    }
    
    // 根据不同的状态保存或更改便签
    if(this.data.status === 'create'){
      // 保存后将页面设置为展示状态
      this.setData({
        status: 'display'
      });
    // 根据便签类型 添加到上上层页面数据中 
      if (this.data.isTop) {  //置顶便签
        preAgin.data.group.data[this.data.groupId].childData.topData.unshift(thisData);
      } else {  //普通便签
        preAgin.data.group.data[this.data.groupId].childData.normalData.unshift(thisData)
      }
      // 保存
      preAgin.setData({
        group: preAgin.data.group
      });
      prePage.setData({
        topData:prePage.data.topData,
        normalData:prePage.data.normalData
      })
    }else if(this.data.status==='edit'){
      // 保存后将页面设置为展示状态
      this.setData({
        status: 'display'
      });
      // 如果置顶改变
      if(this.data.isChange){
        // 改变后为置顶便签
        if (this.data.isTop){
          // 添加到置顶便签中
          preAgin.data.group.data[this.data.groupId].childData.topData.unshift(thisData);
          // 删除原来
          preAgin.data.group.data[this.data.groupId].childData.normalData.splice(this.data.memoId,1);
          // 设置当前的便签id
          this.setData({
            memoId:0
          })
        }else{
            // 添加到置顶便签中
            preAgin.data.group.data[this.data.groupId].childData.normalData.unshift(thisData);
            // 删除原来
            preAgin.data.group.data[this.data.groupId].childData.topData.splice(this.data.memoId, 1);
            // 设置当前的便签id
            this.setData({
              memoId: 0
            })
      }
      // 如果置顶未改变
    }else{
        if (this.data.isTop) {  //置顶便签
          preAgin.data.group.data[this.data.groupId].childData.topData[this.data.memoId] = thisData;
        } else {  //普通便签
          preAgin.data.group.data[this.data.groupId].childData.normalData[this.data.memoId] = thisData;
        }
    }
      // 保存
      preAgin.setData({
        group: preAgin.data.group
      });
      prePage.setData({
        topData: prePage.data.topData,
        normalData: prePage.data.normalData
      })
    }
    
  
  },
  // 编辑
  toEdit() {
    this.setData({
      status: 'edit'
    });
    const that = this;
    wx.createSelectorQuery().select('#editor').context(function (res) {
      that.editorCtx = res.context;
      that.editorCtx.setContents({
        delta: that.data.content.delta,
        html: that.data.content.html
      })
    }).exec()
  }
})