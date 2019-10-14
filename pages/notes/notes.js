// pages/notes/notes.js
const util = require('../../utils/util.js');
const formatTime = util.formatTime;
//获取应用实例
const app = getApp();
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
//我的代办
Page({
  data: {
    tabs: ["最近笔记", "我的笔记"],
    overflow:'none', //添加文件工具栏隐藏
    activeIndex: 0,//展示页面，默认我的收藏
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
    isreName: false,
    currName: '',
    newName: '',
    top: '',
    left: '',
    right: '30px',
    bottom: '30px',
    noteslist: [      //文件管理 文件列表
      {
        fileSize: '0KB',
        fileType:'md',
        title: '边城',
        createTime: '2019-06-13 17:48',
        tag: '',
        isShow: true,
        url: ' ',
        content: '## 图文排列 \r **边城`沈从文`著——中篇小说** \r > 在川湘交界的茶峒附近，小溪白塔旁边，住着主人公翠翠和她爷爷老船夫。茶峒城里有个船总叫顺顺，他有两个儿子，老大叫天保，老二叫傩送。 ![凤凰古城](https://www.vvadd.com/wxml_demo/img.jpg) \r 端午节翠翠去看[龙舟赛](http://link)，偶然相遇相貌英俊的青年水手傩（nuó）送，傩送在翠翠的心里留下了深刻的印象。同时，傩送的兄长天保也喜欢上了翠翠，并提前托媒人提了亲。天保告诉傩送一年前他就爱上了翠翠，而傩送告诉天保他两年前就爱上了翠翠，天保听了后也吃了一惊。然而此时，当地的团总以新磨坊为陪嫁，想把女儿许配给傩送。而傩送宁肯继承一条破船也要与翠翠成婚',
          }
          ,{
        fileSize: '0KB',
        fileType:'md',
        title: '边城',
        createTime: '2019-06-13 17:48',
        tag: '',
        isShow: true,
        url: ' ',
        content: '## 图文排列 '
          }
          ,{
            fileSize: '0KB',
            fileType: 'text',
            title: '富文本笔记',
            createTime: '2019-06-13 17:48',
            tag: '',
            isShow: true,
            url: ' ',
            content: {
              delta: {
                ops: [{
                  attributes: { bold: "strong" },
                  insert: "测试文本"
                  }] 
                  },
              html: "<p wx:nodeid="/77/"><strong>测试文本</strong></p>",
              text: "测试文本"
               }
          },
      {
        fileSize: '0KB',
        fileType: 'md',
        title: '边城',
        createTime: '2019-06-13 17:48',
        tag: '',
        isShow: true,
        url: ' ',
        content: '## 图文排列 '
      }
      , {
        fileSize: '0KB',
        fileType: 'text',
        title: '富文本笔记',
        createTime: '2019-06-13 17:48',
        tag: '',
        isShow: true,
        url: ' ',
        content: {
          delta: {
            ops: [{
              attributes: { bold: "strong" },
              insert: "测试文本"
            }]
          },
          html: "<p wx:nodeid=" / 77 / "><strong>测试文本</strong></p>",
          text: "测试文本"
        }
      },
      {
        fileSize: '0KB',
        fileType: 'md',
        title: '边城',
        createTime: '2019-06-13 17:48',
        tag: '',
        isShow: true,
        url: ' ',
        content: '## 图文排列 '
      }
      , {
        fileSize: '0KB',
        fileType: 'text',
        title: '富文本笔记',
        createTime: '2019-06-13 17:48',
        tag: '',
        isShow: true,
        url: ' ',
        content: {
          delta: {
            ops: [{
              attributes: { bold: "strong" },
              insert: "测试文本"
            }]
          },
          html: "<p wx:nodeid=" / 77 / "><strong>测试文本</strong></p>",
          text: "测试文本"
        }
      },
      {
        fileSize: '0KB',
        fileType: 'md',
        title: '边城',
        createTime: '2019-06-13 17:48',
        tag: '',
        isShow: true,
        url: ' ',
        content: '## 图文排列 '
      }
      , {
        fileSize: '0KB',
        fileType: 'text',
        title: '富文本笔记',
        createTime: '2019-06-13 17:48',
        tag: '',
        isShow: true,
        url: ' ',
        content: {
          delta: {
            ops: [{
              attributes: { bold: "strong" },
              insert: "测试文本"
            }]
          },
          html: "<p wx:nodeid=" / 77 / "><strong>测试文本</strong></p>",
          text: "测试文本"
        }
      },
      {
        fileSize: '0KB',
        fileType: 'md',
        title: '边城',
        createTime: '2019-06-13 17:48',
        tag: '',
        isShow: true,
        url: ' ',
        content: '## 图文排列 '
      }
      , {
        fileSize: '0KB',
        fileType: 'text',
        title: '富文本笔记',
        createTime: '2019-06-13 17:48',
        tag: '',
        isShow: true,
        url: ' ',
        content: {
          delta: {
            ops: [{
              attributes: { bold: "strong" },
              insert: "测试文本"
            }]
          },
          html: "<p wx:nodeid=" / 77 / "><strong>测试文本</strong></p>",
          text: "测试文本"
        }
      }, {
        fileSize: '0KB',
        fileType: 'md',
        title: '边城',
        createTime: '2019-06-13 17:48',
        tag: '',
        isShow: true,
        url: ' ',
        content: '## 图文排列 '
      }
      , {
        fileSize: '0KB',
        fileType: 'text',
        title: '富文本笔记',
        createTime: '2019-06-13 17:48',
        tag: '',
        isShow: true,
        url: ' ',
        content: {
          delta: {
            ops: [{
              attributes: { bold: "strong" },
              insert: "测试文本"
            }]
          },
          html: "<p wx:nodeid=" / 77 / "><strong>测试文本</strong></p>",
          text: "测试文本"
        }
      },
      {
        fileSize: '0KB',
        fileType: 'md',
        title: '边城',
        createTime: '2019-06-13 17:48',
        tag: '',
        isShow: true,
        url: ' ',
        content: '## 图文排列 '
      }
      , {
        fileSize: '0KB',
        fileType: 'text',
        title: '富文本笔记',
        createTime: '2019-06-13 17:48',
        tag: '',
        isShow: true,
        url: ' ',
        content: {
          delta: {
            ops: [{
              attributes: { bold: "strong" },
              insert: "测试文本"
            }]
          },
          html: "<p wx:nodeid=" / 77 / "><strong>测试文本</strong></p>",
          text: "测试文本"
        }
      }
    ]
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
            currName: that.data.noteslist[index].title,
            newName: that.data.noteslist[index].title
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
     
    } else {
      this.data.selectIndex.forEach(function (item, index) {
        if (item.sureId) {
          that.data.noteslist[index].title = that.data.newName;
          that.setData({
            noteslist: that.data.noteslist
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
  // 全选
  selectAll: function () {
    var that = this;
    //  设置文件选中索引全为false
    this.data.noteslist.forEach(function (item, index) {
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
    this.data.noteslist.forEach(function (item, index) {
      that.data.selectIndex[index] = { sureId: false };
      that.setData({
        selectIndex: that.data.selectIndex
      });
    })
  },
  // 删除文件
  deletefile: function () {
    var that = this;
    wx.showModal({
      title: '删除笔记',
      content: '是否删除选中笔记?',
      confirmText: "删除",
      confirmColor: 'red',
      cancelText: "取消",
      success: function (res) {
        if (res.confirm) {
          //  利用递归删除
          let deletef = function () {
            that.data.noteslist.forEach(function (item, index) {
              if (that.data.selectIndex[index].sureId) {
                that.data.noteslist.splice(index, 1);
                that.data.selectIndex.splice(index, 1);
                deletef();
              }
            });
          };
          deletef();
          that.setData({
            noteslist: that.data.noteslist,
            selectIndex: that.data.selectIndex
          });
          that.cancelSelect();
        } else {

        }
      }
    });
  },
  // 创建新的笔记
  newnotes:function(){
    // 关闭添加操作栏
    this.setData({
      addbgHeight: 0,
      addwrapper: 0,
      transdeg: 0,
    })
    var that = this;
    setTimeout(function(){
      that.setData({
        overflow:'none'
      })
    },200);
    // 跳转
    wx.navigateTo({
      url: '/pages/newnotes/newnotes',
    })
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
    });
    var that = this;
    setTimeout(function () {
      that.setData({
        overflow: 'none'
      })
    }, 200)
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
      this.data.noteslist[this.data.noteslist.length] = {
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
      this.data.noteslist[this.data.noteslist.length] = {
        fileSize: '0KB',
        title: this.data.fileName,
        createTime: '2019-06-13 17:48',
        type: '0',
        fileType: '',
        isShow: true,
        url: ' ',
        content:'## notes'
      }
    }

    // 添加文件索引,更新文件列表，清除文件名
    this.data.selectIndex[this.data.selectIndex.length] = { sureId: false };
    this.setData({
      islayOpen: false,
      noteslist: this.data.noteslist,
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
      });
      // 手动滑动按钮允许
      this.lock=true;
      var that = this;
      setTimeout(function () {
        that.setData({
          overflow: 'none'
        })
      }, 200);

    } else {
      // 手动滑动按钮禁止
      this.lock=false;
      this.setData({
        addbgHeight: '100%',
        addwrapper: '180px',
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

  // （打开文件/选择文件）
  tonotesitem: function (event) {
    //  非文件操作状态，并且短按点击时
    if (!this.data.isLongtap && this.endTime - this.startTime < 350) {
      // 获取当前索引
      let id = event.currentTarget.dataset.idx;
      // 获取当前文件类型
      let type = event.currentTarget.dataset.type;
      let title = this.data.noteslist[id].title;
      // 设置url
      var tourl='';
      // 设置内容
      var content='';
      if(type === 'md'){
        tourl ='/pages/notesitem/notesitem';
        //  获取当前内容
         content = this.data.noteslist[id].content;
      }else{
        tourl ='/pages/textitem/textitem'
        //  获取当前内容
        // 防止字符串被截取
        content = JSON.stringify(this.data.noteslist[id].content).replace(/\=/g, "%3D");
      }
      wx.navigateTo({
        url: tourl+'?content='+content+'&title='+title+'&id='+id,
      });
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
    // 手动滑动按钮
    this.lock=true;
    //如果上一个页面传递有参数，则根据参数展示
    // console.log(options);
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: "10%"
        });
      }
    });
    //  设置文件选中索引
    this.data.noteslist.forEach(function (item, index) {
      that.data.selectIndex[index] = { sureId: false };
      that.setData({
        selectIndex: that.data.selectIndex
      });
    })
  },
  // 创建新的富文本
  torichtext:function(){
    // 关闭添加操作栏
    this.setData({
      addbgHeight: 0,
      addwrapper: 0,
      transdeg: 0,
    })
    var that = this;
    setTimeout(function () {
      that.setData({
        overflow: 'none'
      })
    }, 200);
     wx.navigateTo({
       url: '../newtext/newtext',
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
    var that = this;
    setTimeout(function () {
      that.setData({
        overflow: 'none'
      })
    }, 200)

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
        setTimeout(function () {
          that.setData({
            overflow: 'none'
          })
        }, 200)
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
  tapMove(e) {
    if(this.lock){
      let clientX = e.touches[0].clientX;
      let clienty = e.touches[0].clientY;
      this.setData({
        left: clientX - 25 + 'px',
        top: clienty - 35 + 'px',
        bottom: '',
        right: ''
      });
    }
  },
  tapEnd(e) {
    this.setData({
      left: '',
      top: '',
      bottom: '30px',
      right: '30px'
    })
    this.addFile();
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
  onPageScroll: function (e) {
    console.log(e.scrollTop) //这个就是滚动到的位置,可以用这个位置来写判断
  }
})