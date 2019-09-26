// pages/locate/locate.js
Page({
  data: {
    latitude: 23.099994,
    longitude: 113.324520,
  },
  // 实例化map
  onReady: function (e) {
    this.mapCtx = wx.createMapContext('myMap');
    wx.getLocation({
      type: 'gcj02',
      success:res=>{
        this.setData({
          latitude:res.latitude,
          longitude:res.longitude
        })
      },
      fail(res){
        console.log(res);
      }
    })
  },
})