// pages/notes/notes.js
// pages/file/file.js
const util = require('../../utils/util.js');
const formatTime = util.formatTime;
//获取应用实例
const app = getApp();
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
//我的代办
Page({
  data: {
    tabs: ["最近笔记", "我的笔记"],
    activeIndex: 0,//展示类型，默认我的消息
    isaddFile: true,   //添加文件按钮显示/隐藏
    addbgHeight: 0,  //添加文件时背景显示
    addwrapper: 0,   //添加文件操作框高度
    transdeg: 0,     //添加文件按钮显示
    sliderLeft: 0,  //控制导航底部样式
    opaHeight: 0,  //文件操作栏高度
    islayOpen: false, //新建文件夹弹出层
    arrowIcon: 'icon-arrow5',
    isLongtap: false, //判断是否长按
    selectIndex: [],  //选中文件索引
    hasSelect: 'icon-checked1',  //选中文件图标
    noSelect: 'icon-unchecked1', //未选中文件图标
    nodelist: [      //文件管理 文件列表
      {
        fileSize: '0KB',
        title: '合同',
        createTime: '2019-06-13 17:48',
        type: '0',
        fileType: '',
        isShow: true,
        url: ' ',
        content:''
          }
    ]
  },
  // 点击空白处关闭添加窗口
  hideadd:function(){
    this.addFile();
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
      this.data.nodelist[this.data.nodelist.length] = {
        fileSize: '0KB',
          title: '新建文件夹',
            createTime: '2019-06-13 17:48',
              type: '0',
                fileType: '',
                  isShow: true,
                    url: ' ',
                    content:''     
      }
    } else {
      this.data.nodelist[this.data.nodelist.length] = {
        fileSize: '0KB',
        title: this.data.fileName,
        createTime: '2019-06-13 17:48',
        type: '0',
        fileType: '',
        isShow: true,
        url: ' ',
        content:''
      }
    }

    // 添加文件索引,更新文件列表，清除文件名
    this.data.selectIndex[this.data.selectIndex.length] = { sureId: false };
    this.setData({
      islayOpen: false,
      nodelist: this.data.nodelist,
      fileName: '',
      selectIndex: this.data.selectIndex
    })
  },
  // 添加 工具栏
  addFile: function () {
    if (this.data.addbgHeight === '100%') {
      this.setData({
        addbgHeight: 0,
        addwrapper: 0,
        transdeg: 0,
      })
    } else {
      this.setData({
        addbgHeight: '100%',
        addwrapper: '180px',
        transdeg: '495deg',
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
  // 测试代码（打开文件夹/选择文件夹）
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
  onLoad: function (options) {
    //如果上一个页面传递有参数，则根据参数展示
    if (options.type) {
      this.setData({
        activeIndex: options.type
      });
    }
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: "10%"
        });
      }
    });
    //  设置文件选中索引
    this.data.nodelist.forEach(function (item, index) {
      that.data.selectIndex[index] = { sureId: false };
      that.setData({
        selectIndex: that.data.selectIndex
      });
    })
  },

  //点击切换
  tabClick: function (e) {
    let currIndex = parseInt(e.currentTarget.id);
    this.setData({
      sliderLeft: e.currentTarget.id * 50 + 10 + '%',
      activeIndex: e.currentTarget.id,
      addbgHeight: 0,
      addwrapper: 0,
      transdeg: 0,
    });

  },

  // //滑动切换
  swiperTab: function (e) {
    // console.log(e.detail)
    let currIndex = parseInt(e.detail.current);
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: currIndex * 50 + 10 + '%',
          activeIndex: currIndex,
          addbgHeight: 0,
          addwrapper: 0,
          transdeg: 0,
        });
      }
    });
  },

  /**
   * 下拉刷新
   */
  onPullDownRefresh: function (e) {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    wx.showLoading({
      title: '玩命加载中',
    });
    var tabIndex = this.data.activeIndex.toString();
    switch (tabIndex) {
      case '0'://我的收藏
        this.loadMoreMessage();
        break;
      case '1'://我的文件

        break;
      case '2'://企业网盘

        break;
    }
  },

  /**
   * 上拉加载
   */
  onReachBottom: function () {
    // console.log(1);
    // 显示加载图标  
    wx.showLoading({
      title: '玩命加载中',
    });
    var tabIndex = this.data.activeIndex.toString();
    switch (tabIndex) {
      case '0'://最近笔记
        this.loadMoreMessage();
        break;
      case '1'://我的笔记

        break;
    }
  },

  /**
   * 刷新消息
   */
  pullDownRefreshMessage: function () {
    setTimeout(function () {
      console.log(2);
      // 隐藏导航栏加载框  
      wx.hideNavigationBarLoading();
      // 停止下拉动作  
      wx.stopPullDownRefresh();
      // 隐藏加载框  
      wx.hideLoading();
    }, 3000);
  },

  /**
     * 加载消息
     */
  loadMoreMessage: function () {
    var that = this;
    setTimeout(function () {
      // console.log(123);
      // 隐藏加载框  
      wx.hideLoading();
    }, 3000);
  },

})