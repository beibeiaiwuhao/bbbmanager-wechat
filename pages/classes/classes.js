// pages/classes/classes.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var userLoginInfo = wx.getStorageSync('userLoginInfo');
    this.loadClassData(app.globalData.baseUrl + app.wxUrlPath.getTeacherListByUserId+"?userId="+userLoginInfo.userId);
  },

  //显示模态窗口
  showModal:function(title,content,callback){
    wx.showModal({
      title: title,
      cancelText:'随便逛逛',
      content: content,
      confirmColor: '#3CB371',
      cancelColor:'#2a2a2a',
      success:function(res) {
        if (res.confirm) {
          callback && callback()
        }else {
          wx.switchTab({
            url: '/pages/index/index',
          })
        }
      }
    })
  },

  //点击更多的班级情况
  onMoreTap:function(event) {
    var classId = event.currentTarget.dataset.classid;
    console.log(classId);
    wx.navigateTo({
      url: 'classDetail/classDetail?classId='+classId,
    })
  },

  loadClassData:function(url){
    var that = this;
      wx.request({
        url: url,
        method:'GET',
        success:function(returnData) {
          that.handleClassData(returnData);
        },
        fail:function(error) {

        },
        complete:function(){

        }
      })
  },

  //处理请求班级列表的数据
  handleClassData:function(returnData){
    console.log("开始处理班级数据");
    console.log(returnData.data.data);
    
      this.setData({
        classList:returnData.data.data
      })
    console.log(this.data.classList);
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
    var userLoginInfo = wx.getStorageSync('userLoginInfo');
    console.log(userLoginInfo);
    if (!userLoginInfo) {
      this.showModal('友情提示', '需要登陆才能访问', function () {
        wx.navigateTo({
          url: '../login/login',
        })
      });
    }
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