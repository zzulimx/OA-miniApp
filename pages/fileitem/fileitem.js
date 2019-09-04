// pages/fileitem/fileitem.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     filelist:'', //文件列表
    accessPath:[],  //访问路径
    temp:[]  //测试使用 访问历史文件
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 子文件
    let filelist =JSON.parse(options.filelist);
    // 父文件名
    let ParentName = options.currName;
    // 来源
    let resource = options.navTitle; 
          // 设置导航栏名
    wx.setNavigationBarTitle({
       title: resource,
    });


    let pathArr=[{order:'',name:resource},{order:0,name:ParentName}];
    // 设置当前页文件,访问路径
    this.setData({
      filelist:filelist,
      accessPath: pathArr
    })
     
  },
// 根据路径跳转
  accessTo:function(event){
    // 获取索引
    let idx = event.currentTarget.dataset.idx;
    if(idx<=0){
      wx.navigateBack();
    }else{
      // 截取路径数组到该位
      this.setData({
        accessPath:this.data.accessPath.slice(0,idx+1)
      });
      // 跳转到索引位置
      let order = this.data.accessPath[idx].order;
       if(order===this.data.temp.length){

       }else{

         //  从历史纪录中取数据
         this.setData({
           filelist: this.data.temp[order]
         });
         // 删除当前文件之后文件记录
         this.setData({
           temp: this.data.temp.slice(0, order)
         })
         
       }
    }
  },
  // 打开子文件
  fileitemTo:function(event){
    // 先判断文件类型
    let type = event.currentTarget.dataset.type;
    if(type === 'folder'){
      //  当前为第几层
      let order = event.currentTarget.dataset.order;
      let id = event.currentTarget.dataset.idx;
      // 设置路径
      let currPath = {
        name:this.data.filelist[id].name,  
        order:order  //第几层
      }
      let cheese = 'accessPath['+this.data.accessPath.length+']';
      this.setData({
        [cheese]:currPath
      })
      // 保存打开之前的文件
        let demp = 'temp['+this.data.temp.length+ ']';
      this.setData({
        [demp]:this.data.filelist
      })
      // 更新filelist,先判断文件夹下是否为空
      if (this.data.filelist[id].data.length>0){
         this.setData({
           filelist: this.data.filelist[id].data
         })
      }else{
        this.setData({
          filelist:[]
        })
      }
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})