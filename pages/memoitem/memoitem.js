// pages/memoitem/memoitem.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topData:'',  //置顶便签
    normalData:'', //普通便签
    Mleft: '',  //拖拽位置
    Mright: '40px',
    Mtop: '',
    Mbottom: '40px',
    isNull: false, //随笔是否为空
    isBtn: true,
    isLayOpen: false,
    btnColor: '#ccc',
    selectIcon: 'icon-weixuanzhong', //选择图标
    isOperate: false,  //是否为文件操作状态
    memoWidth: '100%',  //便签默认宽度
    groupId:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let idx = options.idx;
    let pages = getCurrentPages();
    let prePage = pages[pages.length-2];
    let currData = prePage.data.group.data[parseInt(options.idx)].childData;
    let normalData = currData.normalData;
    let topData = currData.topData;
    if(normalData.length<=0 && topData.length<=0){
      this.setData({
       isNull:true
      })
    };
    this.setData({
      normalData:normalData,
      topData:topData,
      groupId:idx
    });
    let title = options.title;
    wx.setNavigationBarTitle({
      title: title,
    })
  },

  // 拖拽开始
  startMove() {
    this.lock = true;
  },
  // 拖拽中
  moving(e) {
    if (this.lock) {
      this.setData({
        Mleft: e.touches[0].pageX - 30 + 'px',
        Mright: '',
        Mtop: e.touches[0].pageY - 30 + 'px',
        Mbottom: ''
      })
      //  console.log(this.data.Mleft)
    }
  },
  // 拖拽结束
  endMove() {
    this.lock = false;
    this.setData({
      Mleft: '',
      Mright: '40px',
      Mtop: '',
      Mbottom: '40px',
    });
    let idx= this.data.groupId;
    wx.navigateTo({
      url: '../../pages/addmemo/addmemo?isGroup=true&title=便签&status=edit&groupId='+idx,
    })
  },
  // 去展示
  toDisplay(e){
    let type = e.currentTarget.dataset.type;
    let idx = e.currentTarget.dataset.idx;
    wx.navigateTo({
      url: '../../pages/addmemo/addmemo?title=便签&groupDis=true&status=display&type=' + type + '&idx=' + idx,
    })
  }
})