// pages/index/consulting/consulting.js

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    gartenInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var gartenId = options.gartenId;
    this.getGartenInfoData(app.globalData.baseUrl +"/api/getGartenInfoByGartenId?gartenId="+gartenId);
  },

  getGartenInfoData:function (url) {
    var that = this;
      wx.request({
        url: url,
        success:function(res) {
          console.log(res.data.data);
          that.setData({
            gartenInfo: res.data.data.gartenInfo
          })
        }
      })
  },

  //拨打电话
  makeCall:function(event){
    var phone = event.currentTarget.dataset.gartenphone;
    wx.makePhoneCall({
      phoneNumber: phone,
      success:function(res){
        console.log("拨打电话成功");
      },
      fail:function(){
        console.log("拨打电话失败");
      }
    })
  },


  //显示地图
  showMap: function () {
    var that = this;
    this.getLonLat(function (lon, lat, speed) {
      wx.openLocation({
        latitude: lat,
        longitude: lon,
        scale: 25,
        name: "上海点贸信息技术有限公司",
        address: "邯郸路无锡大厦",
        fail: function (e) {
          wx.showToast({
            title: '地图打开失败',
            duration: 1000,
            icon: "cancel"
          })
        }

      })
    })
  },

  //获取当前位置经纬度与当前速度
  getLonLat: function (callback) {
    var that = this;
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        callback(res.longitude, res.latitude, res.speed);
      },
    })
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