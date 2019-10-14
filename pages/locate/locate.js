// pages/locate/locate.js
// 引入SDK核心类
var QQMapWX = require('../../lib/qqmap-wx-jssdk.js');
var qqmapsdk;
Page({
  data: {
    latitude:'',  //当前纬度
    longitude: '',  //当前经度
    nearLoca:'',  //附近位置
    currLoca:'', //当前位置
    companyLoca: {  //公司坐标位置
      latitude: 34.74530,
      longitude: 113.62493
    },
    markers:[
      {
        iconPath: '../../images/locate/locate_1f.png',
        id: 0,
        latitude: 34.74530,
        longitude: 113.62493,
        width: 40,
        height: 40
      }
    ],
    circles:[
      {
        latitude: 34.74530,
        longitude: 113.62493,
        color: '#FF0000DD',
        fillColor: '#7cb5ec88',
        radius: 300,
        strokeWidth: 1
      }
    ]
  },
  onLoad:function(){
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: '4XNBZ-KLBKI-HX6G3-57SJX-FKD57-IEBMD'
    });
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
        // 逆地址解析
        qqmapsdk.reverseGeocoder({
          get_poi: 1,  //是否返回周边POI列表：1.返回；0不返回(默认)
          poi_options: 'policy=1;radius=300;page_size=12;page_index=1',
          location: {
            latitude: this.data.latitude,
            longitude: this.data.longitude
          },
          success: res => {//成功后的回调
            this.setData({
              nearLoca: res.result.pois,
              currLoca: res.result.pois[0].title
            });
          }
          , fail: function (res) {
            wx.showToast({
              title: '位置信息获取失败，请刷新重试',
              image: '../../images/toast/prompt.png'
            })
          }
        })
      },
      fail(res) {
        console.log(res);
        wx.showToast({
          title: '位置信息获取失败，请刷新重试',
          image: '../../images/toast/prompt.png'
        });
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
      currLoca:this.data.nearLoca[id].title,
      latitude:this.data.nearLoca[id].location.lat,
      longitude:this.data.nearLoca[id].location.lng
    });
    // 获取上个页面，设置回返地址
    let pages = getCurrentPages();
    let preAgain = pages[pages.length-2];
    preAgain.setData({
      currLoca: this.data.nearLoca[id].title,
      latitude:this.data.latitude,
      longitude:this.data.longitude,
    });
    wx.navigateBack();
  },
onPullDownRefresh(){
  this.tolocate();
  setTimeout(function () {
    wx.showToast({
      title: '刷新完成',
      icon: 'success',
      success: res => {
        wx.stopPullDownRefresh();
      }
    })
  }, 800)
}
})