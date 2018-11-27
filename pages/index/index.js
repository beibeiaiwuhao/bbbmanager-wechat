// pages/index/index.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    panelContent:{},
    categoryContent:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getIndexData(app.globalData.baseUrl +"/api/index/panelContent");
  },

  //获取首页的数据
  getIndexData:function(url) {
    var that = this;
    wx.request({
      url: url,
      success:function(res) {
        that.handleData(res);
      }
    })
  },

  //处理首页数据
  handleData:function(res) {
    console.log(res.data.data);
    var tmpContent = res.data.data.panelContent;
    var images = tmpContent.imageUrl.split(",");
    var tmp = {
      id:tmpContent.id,
      panelId: tmpContent.panelId,
      picUrl: images,
      productId: tmpContent.productId,
      productName: tmpContent.productName,
      sortOrder: tmpContent.tmpContent
    }
    this.setData({
      panelContent: tmp,
      categoryContent: res.data.data.categoryContent
    });
    console.log(this.data.panelContent);
    console.log(this.data.categoryContent);
  },

  onItemTap:function(event) {
    var pageCode = event.currentTarget.dataset.pageCode;
    if (pageCode == 'WH001') {
      wx.navigateTo({
        url: 'consulting/consulting?gartenId='+app.globalData.gartenId,
      })
    } else if (pageCode == 'WH002') {
      wx.navigateTo({
        url: 'make-appointment/make-appointment',
      })
    }else if (pageCode == 'WH003') {
      wx.navigateTo({
        url: 'announcement/announcement',
      })
    }else if (pageCode == 'WH004') {
      wx.navigateTo({
        url: 'teachers/teachers',
      })
    } else if (pageCode == 'WH005') {
      wx.navigateTo({
        url: 'recipe/recipe',
      })
    }  else if (pageCode == 'WH006') {
      wx.navigateTo({
        url: 'classroom/classroom',
      })
    } else if (pageCode == 'WH007') {
      wx.navigateTo({
        url: 'photos/photos',
      })
    }
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