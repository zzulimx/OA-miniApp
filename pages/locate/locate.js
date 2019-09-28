// pages/locate/locate.js
// 引入SDK核心类
var QQMapWX = require('../../lib/qqmap-wx-jssdk.js');
var qqmapsdk;
Page({
  data: {
    latitude: 23.099994,  
    longitude: 113.324520,
    nearLoca:'',  //附近位置
    currLoca:'', //当前位置
  },
  onLoad:function(){
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: '4XNBZ-KLBKI-HX6G3-57SJX-FKD57-IEBMD'
    });
  },
  onShow: function () {
      // 实例化map
    this.mapCtx = wx.createMapContext('myMap');
    // 获取当前位置
    wx.getLocation({
      type: 'gcj02',
      success: res => {
        this.setData({
          latitude: res.latitude,
          longitude: res.longitude
        });
        qqmapsdk.reverseGeocoder({
          get_poi: 1,  //是否返回周边POI列表：1.返回；0不返回(默认)
          poi_options: 'policy=1;radius=300;page_size=12;page_index=1',
          location: {
            latitude: this.data.latitude,
            longitude: this.data.longitude
          },
          success:res=>{//成功后的回调
            console.log(res);
             this.setData({
               nearLoca:res.result.pois,
               currLoca:res.result.pois[0].title
             })
          }
          ,fail:function(res){
            console.log(res);
          }
        })
      },
      fail(res) {
        console.log(res);
      }
    })
  },
  // 定位当前位置
  tolocate:function(){
    // 获取当前位置
    wx.getLocation({
      type: 'gcj02',
      success: res => {
        this.setData({
          latitude: res.latitude,
          longitude: res.longitude
        });
        qqmapsdk.reverseGeocoder({
          get_poi: 1,  //是否返回周边POI列表：1.返回；0不返回(默认)
          poi_options: 'policy=1;radius=300;page_size=12;page_index=1',
          location: {
            latitude: this.data.latitude,
            longitude: this.data.longitude
          },
          success: res => {//成功后的回调
            // console.log(res);
            this.setData({
              nearLoca: res.result.pois,
              currLoca: res.result.pois[0].title
            })
          }
          , fail: function (res) {
            console.log(res);
          }
        })
      },
      fail(res) {
        console.log(res);
      }
    })
  },
  // 选择位置
  chooseLoca:function(event){
    let id = event.currentTarget.dataset.index;
    this.setData({
      currLoca:this.data.nearLoca[id].title
    })
  }
})