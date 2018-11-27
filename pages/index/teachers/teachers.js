// pages/index/teachers/teachers.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    teacherInfo:[]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTeacherListData(app.globalData.baseUrl + app.wxUrlPath.getTeacherListByGartenId);
  },

  getTeacherListData:function(url) {
    var that = this;
        wx.request({
          url: url,
          method:'post',
          data:{
            gartenId: app.globalData.gartenId
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          success:function(returnData){
            var data = returnData.data.data;
              that.setData({
                teacherInfo: data.teacherInfo
              })
          },
          fail:function(error){

          }
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