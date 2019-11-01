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
    isNull:true, //随笔是否为空
    isBtn:true,
    isLayOpen:false,
    btnColor:'#ccc',
    isOperate:false,  //是否为文件操作状态
    memoWidth:'100%',  //便签默认宽度
    isOperateGroup: false, //分组操作状态
    recently:{  //最近
        topData:[
          {
            content: {
              delta: {
                ops: [
                  { insert: "测试\r一下\r" }
                ]
              },
              html: ' < p wx: nodeid = "58" > 测试</p > <p wx: nodeid="94">一下</p>',
              text: "测试一下"
            },
            date: '10/26',
            bgColor: '#fff',
            isCheck:false
          },
        ],
        data:[
           {
             content:{
               delta:{
                 ops:[
                   { insert: "测试\r一下\r"}
                 ]
                 },
               html:' < p wx: nodeid = "58" > 测试</p > <p wx: nodeid="94">一下</p>',
               text: "测试一下"
             },
             date:'10/26',
            bgColor:'rgba(9, 185, 255,0.08)',
            isCheck: false
           },
        ]
    },
    group:{
      data:[
        {
          title:'旅游',
          createDate:'',
          bgColor:'#ffb64a',
          isCheck:false,
          childData:{
            topData:[
              {
                content: {
                  delta: {
                    ops: [
                      { insert: "测试\r一下\r" }
                    ]
                  },
                  html: ' < p wx: nodeid = "58" > 测试</p > <p wx: nodeid="94">一下</p>',
                  text: "测试一下"
                },
                date: '10/26',
                bgColor: '#fff',
                isCheck: false
              },
            ],
            normalData:[
              {
                content: {
                  delta: {
                    ops: [
                      { insert: "测试\r一下\r" }
                    ]
                  },
                  html: ' < p wx: nodeid = "58" > 测试</p > <p wx: nodeid="94">一下</p>',
                  text: "测试一下"
                },
                date: '10/26',
                bgColor: 'rgba(9, 185, 255,0.08)',
                isCheck: false
              },
            ]
          }
        },
        {
          title: '生活',
          createDate: '',
          bgColor: '#8fee71',
          isCheck: false,
          childData: {
            topData: [],
            normalData: []
          }
        }
        ,{
          title: '工作',
          createDate: '',
          bgColor: '#ff0202',
          isCheck: false,
          childData: {
            topData: [],
            normalData: []
          }
        }
        ,{
          title: '学习',
          createDate: '',
          bgColor: '#a69cff',
          isCheck: false,
          childData: {
            topData: [],
            normalData: []
          }
        }
      ]
    },
  },
  onLoad: function (options) {
    if(this.data.recently.data.length>0 || this.data.recently.topData.length>0){
      this.setData({
        isNull:false
      })
    }
  },
  //点击切换
  tabClick: function (e) {
    //  取消便签操作状态
    this.cancleOperate();
    let currIndex = parseInt(e.currentTarget.id);
    var isBtn='';
    // 添加便签按钮显示 隐藏
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
    //  取消便签操作状态
    this.cancleOperate();
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
      url: '../../pages/addmemo/addmemo?title=随笔&status=create',
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
    if(!this.groupName){
      this.setData({
        btnColor: '#ccc'
      })
    }else{
      this.setData({
        btnColor: '#62c9f8'
      })
    }
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
    if(!this.groupName){
      return;
    }
    if(!this.color){
      this.color ="#ff0202"
    }
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
  // 查看便签
  toDisplay(e){
    // type 区分随笔 置顶/普通
    let type = e.currentTarget.dataset.type;
    let idx = e.currentTarget.dataset.idx;
    // 非文件操作状态 跳转到展示页面
      if(!this.data.isOperate){
        wx.navigateTo({
          url: '../../pages/addmemo/addmemo?title=随笔&status=display&type=' + type + '&idx=' + idx,
        });
        // 文件操作状态 
      }else{
        // 根据类型修改对应的选中状态
        if(type==='normal'){
            // 文件选中或取消
          if (this.data.recently.data[idx].isCheck){
              this.data.recently.data[idx].isCheck=false 
          }else{
            this.data.recently.data[idx].isCheck = true 
          }

        }else{
          // 文件文件选中或取消
          if (this.data.recently.topData[idx].isCheck) {
            this.data.recently.topData[idx].isCheck = false
          } else {
            this.data.recently.topData[idx].isCheck = true
          }
        }
        this.setData({
          recently:this.data.recently
        })
      }
  },
  // 显示页面时调用
  onShow(){
    if (this.data.recently.data.length > 0 || this.data.recently.topData.length > 0) {
      this.setData({
        isNull: false
      })
    }
  },
  // 操作便签
  toOperate(){
    // 设置便签操作状态
    this.setData({
      isOperate: true,
      isBtn: false,
      memoWidth: '86%'
    })  
  },
  // 取消操作
  cancleOperate(){
    // 文件全选状态置空
    this.isAll = null;
    // 当前为随笔页
    // 取消便签操作状态 恢复样式
    if(this.data.activeIndex===0){
      this.setData({
        isOperate: false,
        isBtn: true,
        memoWidth: '100%'
      });
      // 清空所用选中
      this.data.recently.data.forEach(function (item, index) {
        item.isCheck = false
      });
      this.data.recently.topData.forEach(function (item, index) {
        item.isCheck = false;
      });
      this.setData({
        recently: this.data.recently
      })

      // 当前为分组页
    }else{
      // 取消分组页 分组操作状态
      this.setData({
        isOperateGroup:false
      });
      // 清空所用选中
      this.data.group.data.forEach(function (item, index) {
        item.isCheck = false
      });
      this.setData({
        group: this.data.group
      })
    }
  //  判断当前是否便签个数是否为空 展示空页样式效果
  if(this.data.recently.data.length<=0 && this.data.recently.topData.length<=0){
    this.setData({
      isNull:true
    })
  }
  },
  // 全选或取消
  toSelectAll(){
    // 随笔页
     if(this.data.activeIndex===0){
      //  选中置顶和非置顶
       if(!this.isAll){
         this.data.recently.data.forEach(function (item, index) {
           item.isCheck = true;
       })  
        this.data.recently.topData.forEach(function(item,index){
          item.isCheck = true;
        })
         this.isAll = true;
        //  取消选中置顶和非置顶
     }else{
       this.data.recently.data.forEach(function (item, index) {
         item.isCheck = false;
       })
       this.data.recently.topData.forEach(function (item, index) {
         item.isCheck = false;
       })
       this.isAll = false;
     }
     this.setData({
       recently:this.data.recently
     });
    //  分组页选中/取消
     }else{
       if (!this.isAll) {
         this.data.group.data.forEach(function (item, index) {
           item.isCheck = true;
         })
         this.isAll = true;
       } else {
         this.data.group.data.forEach(function (item, index) {
           item.isCheck = false;
         })
         this.isAll = false;
       }
       this.setData({
         group: this.data.group
       });
     }
  },
  // 点击 每个分组事件
  toMemoItem(e){
    // 分组 索引
    let idx = e.currentTarget.dataset.idx;
    // 当前分组标题
    let title = this.data.group.data[idx].title;
    // 分组操作状态 跳转到分组下的便签列表
    if (!this.data.isOperateGroup){
      wx.navigateTo({
        url: '../../pages/memoitem/memoitem?idx='+idx +'&title='+title
      })
      // 非分组操作状态 点击选中/取消
    }else{
      if (this.data.group.data[idx].isCheck){
        this.data.group.data[idx].isCheck = false;
      }else{
        this.data.group.data[idx].isCheck = true;
      }
      this.setData({
        group:this.data.group
      })
   }
  },
  // 长按转为操作分组状态
  operateGroup(e) {
    this.setData({
      isOperateGroup:true
    }) 
  },
  // 删除分组
  toDelete(){
    // 使用递归删除分组 创建两种类型的删除事件
    this.deleteMemo = {
      // 删随笔页随笔
      deleteRecently:()=>{
        this.data.recently.data.forEach( (item, index,thisArr)=>{
          if(item.isCheck){
            thisArr.splice(index, 1);
            this.setData({
              recently: this.data.recently
            })      
          this.deleteMemo.deleteRecently();
          } 
        });
        this.data.recently.topData.forEach((item, index, thisArr)=>{
          if(item.isCheck){
            thisArr.splice(index, 1);
            this.setData({
              recently: this.data.recently
            })
            this.deleteMemo.deleteRecently;
          }
        });
      },
      // 删除分组页分组
      deleteGroup:()=>{
        this.data.group.data.forEach((item, index, thisArr)=>{
          if(item.isCheck){
            thisArr.splice(index, 1);
            this.setData({
              group: this.data.group
            })
            this.deleteMemo.deleteGroup();
          }
        });
      }
    }
    if(this.data.activeIndex===0){
        this.deleteMemo.deleteRecently();
    }else{
      this.deleteMemo.deleteGroup();
    }
  }
})