// pages/index/announcement/announcement.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    notifyInfo: [],
    ellipsis: [], // 文字是否收起，默认收起
  },

  /**
* 收起/展开按钮点击事件
*/
  ellipsis: function (event) {
    
    var value = event.currentTarget.dataset.index;
    var tmpArr = this.data.ellipsis;
    if (tmpArr[value] == 0) {
      tmpArr[value] = 1;
    } else {
      tmpArr[value] = 0;
    }
    this.setData({
      ellipsis: tmpArr
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGartenNoticeInfoData(app.globalData.baseUrl + app.wxUrlPath.getGartenNoticeByGartenId + "?gartenId=" + app.globalData.gartenId);
  },



  getGartenNoticeInfoData:function(url){
    var that = this;
    wx.request({
        url: url,
        success:function(returnData){
          var useData = returnData.data;
          var tmpArr = new Array();
          if (useData.code == 200)
            for (var i = 0; i < useData.data.noticeInfo.length; i++) {
              tmpArr[i] = 0;
            }
            that.setData({
              notifyInfo: useData.data.noticeInfo,
              ellipsis:tmpArr
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