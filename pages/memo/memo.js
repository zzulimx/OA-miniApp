// pages/memo/memo.js
Page({
  data: {
    tabs: ["随笔", "分组"],
    activeIndex: 0,//展示页面 默认展示
    sliderLeft: '10%',  //控制导航底部样式
    Mleft:'',  //拖拽位置
    Mright:'40px',
    Mtop:'',
    Mbottom:'40px',
    isNull:true,
    isBtn:true,
    isLayOpen:false,
    recently:{  //最近

    },
    group:{
      data:[
        {
          title:'旅游',
          createDate:'',
          bgColor:'#ffb64a'
        },
        {
          title: '个人',
          createDate: '',
          bgColor: '#09b9ff'
        },
        {
          title: '生活',
          createDate: '',
          bgColor: '#8fee71'
        }
        ,{
          title: '工作',
          createDate: '',
          bgColor: '#ff0202'
        }
        ,{
          title: '学习',
          createDate: '',
          bgColor: '#a69cff'
        }
      ]
    }
  },
  onLoad: function (options) {
    if(Object.keys(this.data.recently).length>0){
      this.setData({
        isNull:false
      })
    }
  },
  //点击切换
  tabClick: function (e) {
    let currIndex = parseInt(e.detail.current);
    var isBtn='';
    if(currIndex === 0){
      isBtn = true;
    }else{
      isBtn = false;
    };
    this.setData({
      sliderLeft: e.currentTarget.id * 50 + 10 + '%',
      activeIndex: e.currentTarget.id,
      isBtn:isBtn
    });
  },
  // //滑动切换
  swiperTab: function (e) {
    let currIndex = parseInt(e.detail.current);
    var isBtn = '';
    if (currIndex === 0) {
      isBtn = true;
    } else {
      isBtn = false;
    };
        this.setData({
          sliderLeft: currIndex * 50 + 10 + '%',
          activeIndex: currIndex,
          isBtn: isBtn
        });
  },
  // 拖拽开始
  startMove(){
    this.lock=true;
  },
  // 拖拽中
  moving(e){
   if(this.lock){
    this.setData({
      Mleft:e.touches[0].pageX-30 + 'px',
      Mright:'',
      Mtop: e.touches[0].pageY-30 + 'px',
      Mbottom:''
    }) 
    //  console.log(this.data.Mleft)
   }
  },
  // 拖拽结束
  endMove(){
    this.lock=false;
    this.setData({
      Mleft:'',
      Mright: '40px',
      Mtop: '',
      Mbottom: '40px',
    });
    wx.navigateTo({
      url: '../../pages/addmemo/addmemo?title=随笔',
    })
  },
  // 新建分组
  newGroup(){
    this.setData({
      isLayOpen: true
    })
  },
  //获取文件名 
  getGroupName(e){
    this.groupName = e.detail.value;
  },
  // 获取选择的颜色
  getColor(e){
    let idx = e.currentTarget.dataset.idx;
    let color = e.currentTarget.dataset.color;
    var bg = '';
    // 清除其他颜色背景
    for(let k =1;k<=10;k++){
      bg = 'background' + k; 
      this.setData({
        [bg]: '#fff'
      });
    }
    // 设置当前选中背景
    bg = 'background' + idx;
    this.setData({
      [bg]:color
    });
    this.color = color;
  },
  // 取消创建分组
  cancelNew(){
    this.setData({
       isLayOpen:false
    });
    this.color='';
    this.groupName='';
  },
  //创建分组
  createNew(){
    let newGroup={
      title: this.groupName,
      createDate: '',
      bgColor: this.color
    }
     this.data.group.data.unshift(newGroup);
     this.setData({
       group:this.data.group,
       isLayOpen:false
     });
    this.color = '';
    this.groupName = '';
  },
//  下拉事件
  onPullDownRefresh: function () {

  },
})