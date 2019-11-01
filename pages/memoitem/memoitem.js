// pages/memoitem/memoitem.js
Page({
  data: {
    topData:'',  //置顶便签
    normalData:'', //普通便签
    Mleft: '',  //拖拽位置
    Mright: '40px',
    Mtop: '',
    Mbottom: '40px',
    isBtn:true, //添加便签按钮显示隐藏
    isNull: false, //随笔是否为空
    selectIcon: 'icon-weixuanzhong', //选择图标
    isOperate: false,  //是否为便签操作状态
    memoWidth: '100%',  //便签默认宽度
    groupId:'',  //当前分组索引
  },
//页面加载时执行 
  onLoad: function (options) {
  // 获取上一页
    let pages = getCurrentPages();
    let prePage = pages[pages.length-2];
    // 获取当前分组下的数据
    let currData = prePage.data.group.data[parseInt(options.idx)].childData;
    let normalData = currData.normalData;
    let topData = currData.topData;
    // 判断当前分组下是否为空
    if(normalData.length<=0 && topData.length<=0){
      this.setData({
       isNull:true
      })
    };
    this.setData({
      normalData:normalData,
      topData:topData,
      groupId: parseInt(options.idx)  // 分组索引
    });
    // 设置导航栏标题
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
// 跳转到新建便签页
// status 新建和便签展示在同一页 status区分新建或展示
    wx.navigateTo({
      url: '../../pages/addgroupmemo/addgroupmemo?status=create&groupId=' + this.data.groupId,
    })
  },
  // 去展示
  toDisplay(e){
    // type标记当前便签类型 置顶/非置顶
    let type = e.currentTarget.dataset.type;
    let idx = e.currentTarget.dataset.idx;  //当前便签索引
    // status 编辑和展示在同一页面 staatus区分展示display和编辑edit状态
    if (!this.data.isOperate) {
      wx.navigateTo({
        url: '../../pages/addgroupmemo/addgroupmemo?status=display&type=' + type + '&idx=' + idx + '&groupId=' + this.data.groupId
      })
      // 文件操作状态 
    } else {
      // 根据类型修改对应的选中状态
      if (type === 'normal') {
        // 文件选中或取消
        this.data.normalData[idx].isCheck = !this.data.normalData[idx].isCheck;
      } else {
        this.data.topData[idx].isCheck = !this.data.topData[idx].isCheck; 
      }
      this.setData({
        normalData: this.data.normalData,
        topData: this.data.topData
      })
    }
  },
  // 操作便签
  toOperate() {
    // 设置便签操作状态
    this.setData({
      isOperate: true,
      isBtn: false,
      memoWidth: '86%'
    })
  },
  // 取消操作
  cancleOperate() {
    // 文件全选状态置空
    this.isAll = null;
    // 取消便签操作状态 恢复样式
      this.setData({
        isOperate: false,
        isBtn: true,
        memoWidth: '100%'
      });
      // 清空所用选中
      this.data.normalData.forEach(function (item, index) {
        item.isCheck = false
      });
      this.data.topData.forEach(function (item, index) {
        item.isCheck = false;
      });

      this.setData({
        normalData: this.data.normalData,
        topData: this.data.topData
      })    
  },
  // 全选或取消
  toSelectAll() {
      //  选中置顶和非置顶
      if (!this.isAll) {
        this.data.normalData.forEach(function (item, index) {
          item.isCheck = true;
        })
        this.data.topData.forEach(function (item, index) {
          item.isCheck = true;
        })
        this.isAll = true;
        //  取消选中置顶和非置顶
      } else {
        this.data.normalData.forEach(function (item, index) {
          item.isCheck = false;
        })
        this.data.topData.forEach(function (item, index) {
          item.isCheck = false;
        })
        this.isAll = false;
      }
    this.setData({
      normalData: this.data.normalData,
      topData: this.data.topData
    }) 
  },
  // 删除分组
  toDelete() {
    // 使用递归删除分组 创建两种类型的删除事件
    this.deleteMemo = {
      // 删便签
      deleteRecently: () => {
        this.data.normalData.forEach((item, index, thisArr) => {
          if (item.isCheck) {
            thisArr.splice(index, 1);
            this.setData({
              normalData: this.data.normalData
            })
            this.deleteMemo.deleteRecently();
          }
        });
        this.data.topData.forEach((item, index, thisArr) => {
          if (item.isCheck) {
            thisArr.splice(index, 1);
            this.setData({
              topData: this.data.topData
            })
            this.deleteMemo.deleteRecently;
          }
        });
      }
    }
  this.deleteMemo.deleteRecently();
  }
})