// pages/index/photos/photos.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    photosInfo:{},
    imgUrls: [
      "http://pcvfcha51.bkt.clouddn.com/photos-test1.png",
      "http://pcvfcha51.bkt.clouddn.com/photos-test2.jpg",
      "http://pcvfcha51.bkt.clouddn.com/photos-test3.jpg",
      "http://pcvfcha51.bkt.clouddn.com/photos-test4.jpg",
      "http://pcvfcha51.bkt.clouddn.com/photos-test5.jpg",
      "http://pcvfcha51.bkt.clouddn.com/photos-test6.jpg",
    ],
    scrollIndex:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getPhotosInfo(app.globalData.baseUrl + app.wxUrlPath.getPhotolistByGartenId + '?gartenId=' + app.globalData.gartenId);

  },

  //上面照片列表更新的时候照片
  getScrollViewWidth:function(event){
    var index = event.detail.scrollLeft/90;
    console.log(event.detail.scrollLeft);
    console.log(Math.ceil(index));
    
    this.setData({
      scrollIndex: Math.ceil(index)
    })
  },

  //查看照片
  showCastImg: function(event) {
    var src = event.currentTarget.dataset.src;
    console.log(src);
    wx.previewImage({
      urls: [src]
    })
  },

  //查看班级相册
  showClassPhotos:function(){
      wx.navigateTo({
        url: 'photoClass/photoClass',
        
      })
  },

  /**
   * 获取首页信息
   */
  getPhotosInfo:function(url) {
    var that = this;
    wx.request({
      url: url,
      method:'get',
      success:function(returnData){
        console.log(returnData);
        that.setData({
          photosInfo:returnData.data.data
        })
      },
      fail:function(error){

      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})