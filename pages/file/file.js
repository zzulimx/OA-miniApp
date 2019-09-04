// pages/file/file.js
//获取应用实例
const app = getApp();
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
//我的代办
Page({
  data: {
    tabs: ["我的收藏", "我的文件", "企业网盘"],
    activeIndex: 0,//展示类型，默认我的消息
    sliderOffset: 0,
    sliderLeft: 0,
    isImg:false,  //图片展示
    imgSrc:'',
    filelist:[      //文件管理 文件列表
      {
        isParent:1,
        order:0,     //文件层级 第一层
        fileSize:'0KB',
        name:'合同',
        createTime: '2019/06/13 17:48',
        icon:'../../images/file/folder.png' ,
        pid:'0',
        id:'0',
        fileType:'folder',
        isShow:true,
        url:'/pages/fileitem/fileitem',
        data:[
          {
            isParent: 0,
            order:1,  // 文件层级 第二层
            fileSize: '0KB',
            name: '简历1',
            createTime: '2019/06/13 17:48',
            icon: '../../images/file/folder.png',
            pid: '0',
            id: '0',
            fileType: 'folder',
            isShow: true,
            url: '/pages/fileitem/fileitem',
            data:[
              {
              isParent: 1,
              order:2,
              fileSize: '0KB',
              name: 'test',
              createTime: '2019/06/13 17:48',
              icon: '../../images/file/folder.png',
              pid: '0',
              id: '0',
              fileType: 'folder',
              isShow: true,
              url: '/pages/fileitem/fileitem',
              data: []
            }
            ,{
              isParent: 1,
              order: 2,
              fileSize: '0KB',
              name: '工作流',
              createTime: '2019/06/13 17:48',
              icon: '../../images/file/folder.png',
              pid: '0',
              id: '0',
              fileType: 'folder',
              isShow: true,
              url: '/pages/fileitem/fileitem',
              data:[
                {
                  isParent: 1,
                  order: 3,
                  fileSize: '0KB',
                  name: 'last3',
                  createTime: '2019/06/13 17:48',
                  icon: '../../images/file/folder.png',
                  pid: '0',
                  id: '0',
                  fileType: 'folder',
                  isShow: true,
                  url: '/pages/fileitem/fileitem',
                  data:[
                    {
                      isParent: 1,
                      order: 4,
                      fileSize: '0KB',
                      name: 'last2',
                      createTime: '2019/06/13 17:48',
                      icon: '../../images/file/folder.png',
                      pid: '0',
                      id: '0',
                      fileType: 'folder',
                      isShow: true,
                      url: '/pages/fileitem/fileitem',
                      data: [
                        {
                          isParent: 1,
                          order: 5,
                          fileSize: '0KB',
                          name: 'last1',
                          createTime: '2019/06/13 17:48',
                          icon: '../../images/file/folder.png',
                          pid: '0',
                          id: '0',
                          fileType: 'folder',
                          isShow: true,
                          url: '/pages/fileitem/fileitem',
                          data: [
                            {
                              isParent: 1,
                              order: 6,
                              fileSize: '0KB',
                              name: 'last',
                              createTime: '2019/06/13 17:48',
                              icon: '../../images/file/folder.png',
                              pid: '0',
                              id: '0',
                              fileType: 'folder',
                              isShow: true,
                              url: '/pages/fileitem/fileitem',
                              data: []
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
            ]
          },{
            isParent: 0,
            order:2,
            fileSize: '0KB',
            name: '简历2',
            createTime: '2019/06/13 17:48',
            icon: '../../images/file/folder.png',
            pid: '0',
            id: '0',
            fileType: 'folder',
            isShow: true,
            url: '/pages/fileitem/fileitem',
            data:[]
          }
        ]        
      }
      ,{
        isParent: 1,
        order:0,
        fileSize: '0KB',
        name: '工作流',
        createTime: '2019/06/13 17:48',
        icon: '../../images/file/folder.png',
        pid: '0',
        id: '0',
        fileType: 'folder',
        isShow: true,
        url: '/pages/fileitem/fileitem',
        data: [
          {
            isParent: 0,
            order:1,
            fileSize: '0KB',
            name: 'demo1',
            createTime: '2019/06/13 17:48',
            icon: '../../images/file/folder.png',
            pid: '0',
            id: '0',
            fileType: 'folder',
            isShow: true,
            url: '/pages/fileitem/fileitem',
            data: []
          }, {
            isParent: 0,
            order:1,
            fileSize: '0KB',
            name: 'demo2',
            createTime: '2019/06/13 17:48',
            icon: '../../images/file/folder.png',
            pid: '0',
            id: '0',
            fileType: 'folder',
            isShow: true,
            url: '/pages/fileitem/fileitem',
            data:[]
          }
        ]
      }
      , {
        isParent: 1,
        order:0,
        parent: 'filelist',
        fileSize: '6.64KB',
        name: 'avatar.jpg',
        createTime: '2019-06-13 17:48',
        icon: '../../images/avatar/avatar.jpg',
        pid: '0',
        id: '0',
        fileType: 'image',
        isShow: true,
        url: '/pages/fileitem/fileitem',
        data: []
      }
      , {
        isParent: 1,
        fileSize: '0KB',
        name: '城市天际线',
        createTime: '2019/06/13 17:48',
        icon: '../../images/file/folder.png',
        pid: '0',
        id: '0',
        fileType: 'folder',
        isShow: true,
        url: '/pages/fileitem/fileitem',
        data: []
      }
    ]
  },

  // 测试代码
  tofileitem:function(event){
    // 获取当前索引
      let id = event.currentTarget.dataset.idx;
      // 获取当前文件类型
      let type = event.currentTarget.dataset.type;
      // 判断文件类型
      if(type === 'folder'){
        let filelist = JSON.stringify(this.data.filelist[id].data);
        let currName = this.data.filelist[id].name;
        wx.navigateTo({
          url: '/pages/fileitem/fileitem?filelist=' + filelist + '&currName=' + currName + '&navTitle=' + '我的收藏',
        })
      }else if(type === 'image'){
          this.setData({
            isImg:true,
            imgSrc:this.data.filelist[id].icon
          })
      }
   
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
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },

  //点击切换
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },

  //滑动切换
  swiperTab: function (e) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * e.detail.current,
          activeIndex: e.detail.current
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