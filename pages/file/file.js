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
    filelist:[      //文件管理 文件列表
      {
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
            },
              {
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
            ,{
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
          , {
            fileSize: '6.64KB',
            name: 'avatar2.jpg',
            createTime: '2019-06-13 17:48',
            icon: '../../images/avatar/avatar2.jpg',
            pid: '0',
            id: '0',
            fileType: 'image',
            isShow: true,
            url: '/pages/fileitem/fileitem',
            data: []
          }
        ]
      }
      , {     
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
      ,{
        fileSize: '3KB',
        name: 'vocabav.bat',
        createTime: '2019/06/13 17:48',
        icon: '../../images/file/icon_weizhi.png',
        pid: '0',
        id: '0',
        fileType: 'unkown',
        isShow: true,
        url: '/pages/fileitem/fileitem',
        data: []
      }
      ,{
        fileSize: '4.2MB',
        name: 'We Are The Brave',
        createTime: '2019/06/13 17:48',
        icon: '../../images/file/file_music.png',
        pid: '0',
        id: '0',
        fileType: 'music',
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
      //  获取当前文件名
      let navTitle= this.data.filelist[id].name;
      // 判断文件类型
      if(type === 'folder'){
        let filelist = JSON.stringify(this.data.filelist[id].data);
        let currName = this.data.filelist[id].name;
        wx.navigateTo({
          url: '/pages/fileitem/fileitem?filelist=' + filelist + '&navTitle=' + navTitle,
        })
      }else if(type === 'image'){
        let imgSrc= this.data.filelist[id].icon;
        wx.navigateTo({
          url: '/pages/imgdisplay/imgdisplay?imgSrc=' + imgSrc + '&navTitle=' + navTitle
        })
      }else if(type==='unkown'){
        wx.showToast({
          title: '未知文件',
          image: '../../images/tree-round-未知.png',
          duration: 1000
        });
      }else if(type === 'music'){
          wx.navigateTo({
            url: '/pages/music/music',
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