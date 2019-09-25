// pages/fileitem/fileitem.js
const util = require('../../utils/util.js');
const formatTime = util.formatTime;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeIndex: 0,//展示类型，默认我的消息
    isaddFile: true,   //添加文件按钮显示/隐藏
    overflow: 'none', //添加文件栏溢出 
    addbgHeight: 0,  //添加文件时背景显示
    addwrapper: 0,   //添加文件操作框高度
    transdeg: 0,     //添加文件按钮显示
    opaHeight: 0,  //文件操作栏高度
    islayOpen: false, //新建文件夹弹出层
    arrowIcon: 'icon-arrow5',
    isLongtap: false, //判断是否长按
    selectIndex: [],  //选中文件索引
    hasSelect: 'icon-checked1',  //选中文件图标
    noSelect: 'icon-unchecked1', //未选中文件图标
    filelist:'' //文件列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 子文件
    let filelist =JSON.parse(options.filelist);
    // 父文件名
    let navTitle = options.navTitle;
          // 设置导航栏名
    wx.setNavigationBarTitle({
      title: navTitle,
    });
    // 设置当前文件
    if(filelist.length<=0){
      this.setData({
        filelist:[]
      })
    }else{
      this.setData({
        filelist: filelist
      })
    }
 
   var that=this;
    //  设置文件选中索引
    this.data.filelist.forEach(function (item, index) {
      that.data.selectIndex[index] = { sureId: false };
      that.setData({
        selectIndex: that.data.selectIndex
      });
    })
  },
  // 打开子文件
  fileitemTo:function(event){
    // 获取当前索引
    let idx = event.currentTarget.dataset.idx;
    // 获取当前文件名字
    let currName = this.data.filelist[idx].name;
    // 先判断文件类型
    let type = event.currentTarget.dataset.type;
    if(type === 'folder'){
      // 获取当前文件夹子文件
      let newlist = JSON.stringify(this.data.filelist[idx].data); 
      wx.navigateTo({
        url: '/pages/fileitem/fileitem?filelist=' + newlist + '&navTitle=' + currName,
      })
    }else if(type === 'image'){
      let imgSrc = this.data.filelist[idx].icon;
      wx.navigateTo({
        url: '/pages/imgdisplay/imgdisplay?imgSrc=' + imgSrc + '&navTitle=' + currName
      })
    }
  },
  // 点击空白处关闭添加窗口
  hideadd: function () {
    if (this.data.addbgHeight === '100%') {
      this.setData({
        addbgHeight: 0,
        addwrapper: 0,
        transdeg: 0,
      });
      var that = this;
      setTimeout(function () {
        that.setData({
          overflow: 'none'
        })
      }, 200)
    }
  },
  // 打开文件重命名弹出层
  reNameBtn: function () {

    // 判断当前选中文件个数
    let len = 0;
    this.data.selectIndex.forEach(function (item, index) {
      if (item.sureId) {
        len += 1;
      }
    })
    if (len > 1) {
      return;
    } else {

      this.setData({
        isreName: true
      });
      var that = this;
      // 先给newName赋值
      this.data.selectIndex.forEach(function (item, index) {
        if (item.sureId) {
          that.setData({
            currName: that.data.filelist[index].name,
            newName: that.data.filelist[index].name
          })
        }
      })
    }

  },
  // 重命名的值
  filereName: function (event) {
    this.setData({
      newName: event.detail.value
    })
  },
  // 文件重命名
  reName: function () {
    var that = this;
    if (this.data.newName === '') {
      wx.showToast({
        title: '文件名不能为空',
        image: '../../images/file/cancel.png',
        duration: 1000
      });
      console.log(this.data.currName);
    } else {
      this.data.selectIndex.forEach(function (item, index) {
        if (item.sureId) {
          that.data.filelist[index].name = that.data.newName;
          that.setData({
            filelist: that.data.filelist
          })
        }
      });
      //  清空newName
      this.setData({
        isreName: false,
        newName: ''
      });
      this.cancelSelect();
    }
  },
  // 取消文件重命名
  cancelreName: function () {
    //  清空newName
    this.setData({
      isreName: false,
      newName: ''
    });
    this.cancelSelect();
  },
  // 新建文件夹窗口弹窗
  fileCreate: function () {
    this.setData({
      islayOpen: true,
      addbgHeight: 0,
      addwrapper: 0,
      transdeg: 0,
    })
  },
  // 获取新建的文件夹名称
  fileName: function (e) {
    this.setData({
      fileName: e.detail.value
    })
  },
  // 取消创建文件夹
  cancel: function () {
    this.setData({
      islayOpen: false
    })
  },
  // 确认创建文件夹
  create: function (event) {
    if (this.data.fileName === '' || this.data.fileName === undefined) {
      this.data.filelist[this.data.filelist.length] = {
        fileSize: '0KB',
        name: '新建文件夹',
        createTime: formatTime(new Date()),
        icon: '../../images/file/folder.png',
        pid: '0',
        id: '0',
        fileType: 'folder',
        isShow: true,
        url: '/pages/fileitem/fileitem',
        data: []
      }
    } else {
      this.data.filelist[this.data.filelist.length] = {
        fileSize: '0KB',
        name: this.data.fileName,
        createTime: formatTime(new Date()),
        icon: '../../images/file/folder.png',
        pid: '0',
        id: '0',
        fileType: 'folder',
        isShow: true,
        url: '/pages/fileitem/fileitem',
        data: []
      }
    }

    // 添加文件索引,更新文件列表，清除文件名
    this.data.selectIndex[this.data.selectIndex.length] = { sureId: false };
    this.setData({
      islayOpen: false,
      filelist: this.data.filelist,
      fileName: '',
      selectIndex: this.data.selectIndex
    })
  },
  // 添加文件工具栏
  addFile: function () {
    if (this.data.addbgHeight === '100%') {
      this.setData({
        addbgHeight: 0,
        addwrapper: 0,
        transdeg: 0,
      });
      var that = this;
      setTimeout(function () {
        that.setData({
          overflow: 'none'
        })
      }, 200)
    } else {
      this.setData({
        addbgHeight: '100%',
        addwrapper: '115px',
        transdeg: '495deg',
        overflow:'block'
      })
    }
  },
  // 判断长按操作
  bindTouchStart: function (e) {
    this.startTime = e.timeStamp;
  },
  bindTouchEnd: function (e) {
    this.endTime = e.timeStamp;
  },
  // 打开文件夹/选择文件夹
  tofileitem: function (event) {
    //  非文件操作状态，并且短按点击时
    if (!this.data.isLongtap && this.endTime - this.startTime < 350) {
      // 获取当前索引
      let id = event.currentTarget.dataset.idx;
      // 获取当前文件类型
      let type = event.currentTarget.dataset.type;
      //  获取当前文件名
      let navTitle = this.data.filelist[id].name;
      // 判断文件类型
      if (type === 'folder') {
        let filelist = JSON.stringify(this.data.filelist[id].data);
        let currName = this.data.filelist[id].name;
        wx.navigateTo({
          url: '/pages/fileitem/fileitem?filelist=' + filelist + '&navTitle=' + navTitle,
        })
      } else if (type === 'image') {
        let imgSrc = this.data.filelist[id].icon;
        wx.navigateTo({
          url: '/pages/imgdisplay/imgdisplay?imgSrc=' + imgSrc + '&navTitle=' + navTitle
        })
      } else if (type === 'unkown') {
        wx.showToast({
          title: '未知文件',
          image: '../../images/tree-round-未知.png',
          duration: 1000
        });
      } else if (type === 'music') {
        wx.navigateTo({
          url: '/pages/music/music',
        })
      }
    }
    // 文件操作状态，短按点击时
    if (this.data.isLongtap && this.endTime - this.startTime < 350) {
      // 获取当前索引
      let id = event.currentTarget.dataset.idx;
      // 选中/反选
      if (this.data.selectIndex[id].sureId) {
        this.data.selectIndex[id].sureId = false;
        this.setData({
          selectIndex: this.data.selectIndex
        })
      } else {
        this.data.selectIndex[id].sureId = true;
        this.setData({
          selectIndex: this.data.selectIndex
        })
      }

      // 判断当前被选中个数为0则取消操作
      let len = 0;
      this.data.selectIndex.forEach(function (item, index) {
        if (item.sureId) {
          len += 1;
        }
      })
      if (len <= 0) {
        this.setData({
          isLongtap: false,
          opaHeight: 0,
          isaddFile: true
        })
      }
    }
  },
  // 删除文件
  deletefile: function () {
    var that = this;
    wx.showModal({
      title: '文件删除',
      content: '是否删除选中文件?',
      confirmText: "删除",
      confirmColor: 'red',
      cancelText: "取消",
      success: function (res) {
        if (res.confirm) {
          //  利用递归删除
          let deletef = function () {
            that.data.filelist.forEach(function (item, index) {
              if (that.data.selectIndex[index].sureId) {
                that.data.filelist.splice(index, 1);
                that.data.selectIndex.splice(index, 1);
                deletef();
              }
            });
          };
          deletef();
          that.setData({
            filelist: that.data.filelist,
            selectIndex: that.data.selectIndex
          });
          that.cancelSelect();
        } else {

        }
      }
    });
  },
  // 文件操作
  fileOperate: function (e) {
    // 获取当前索引
    let idx = parseInt(e.currentTarget.dataset.idx);
    this.data.selectIndex[idx].sureId = true;
    //长按
    this.setData({
      opaHeight: '55px',
      isLongtap: true,
      selectIndex: this.data.selectIndex,
      isaddFile: false
    })
  },
  // 全选
  selectAll: function () {
    var that = this;
    //  设置文件选中索引全为false
    this.data.filelist.forEach(function (item, index) {
      that.data.selectIndex[index] = { sureId: true };
      that.setData({
        selectIndex: that.data.selectIndex
      });
    })
  },
  // 取消文件操作状态
  cancelSelect: function () {
    this.setData({
      isLongtap: false,
      opaHeight: 0,
      isaddFile: true
    });
    var that = this;
    //  设置文件选中索引全为false
    this.data.filelist.forEach(function (item, index) {
      that.data.selectIndex[index] = { sureId: false };
      that.setData({
        selectIndex: that.data.selectIndex
      });
    })
  }
})