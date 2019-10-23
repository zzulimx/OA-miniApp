// pages/memo/memo.js
Page({
  data: {
    tabs: ["最近", "分组"],
    activeIndex: 0,//展示页面 默认展示
    sliderLeft: '10%',  //控制导航底部样式
    Mleft:'',  //拖拽位置
    Mright:'40px',
    Mtop:'',
    Mbottom:'40px',
    isNull:true,
    recently:{  //最近

    },
    group:{
      
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
    this.setData({
      sliderLeft: e.currentTarget.id * 50 + 10 + '%',
      activeIndex: e.currentTarget.id,
    });
  },
  // //滑动切换
  swiperTab: function (e) {
    // console.log(e.detail)
    let currIndex = parseInt(e.detail.current);
        this.setData({
          sliderLeft: currIndex * 50 + 10 + '%',
          activeIndex: currIndex,
          addbgHeight: 0,
          addwrapper: 0,
          transdeg: 0,
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
      Mbottom: '40px'
    }) 
  },
//  下拉事件
  onPullDownRefresh: function () {

  },
})