// pages/index/recipe/recipe.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recipeInfo:[],
    ellipsis: [], // 食谱列表是否收起，默认收起
    segIndex:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRecipeInfoData(app.globalData.gartenId,0);
  },

  /**
   * 点击展开食谱的详细
   */
  showDetailRecipe:function(event){
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
   * 食谱详细的请求
   */
  getRecipeInfoData: function (gartenId, weekType) {
    var that = this;
    wx.request({
      url: app.globalData.baseUrl + app.wxUrlPath.getGartenRecipeByGartenId,
      method:'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data:{
        gartenId:gartenId,
        weekType:weekType
      },
      success:function(returnData) {
        that.handleRecipeReturnData(returnData);
      },
      fail:function(error) {
        
      }
    })
  },

  handleRecipeReturnData:function(returnData){
    console.log(returnData);
    var tmpArr = new Array();
    if (returnData.data.code == 200)
      for (var i = 0; i < returnData.data.data.recipeInfo.length; i++) {
        tmpArr[i] = 0;
      }
    this.setData({
      recipeInfo: returnData.data.data.recipeInfo,
      ellipsis: tmpArr
    })
  },

  /**
   * 切换星期的时候的食谱变换
   */
  weekTap:function(event) {
    var value = event.currentTarget.dataset.segindex;
    this.setData({
      segIndex:value
    })
    this.getRecipeInfoData(app.globalData.gartenId,value);
    
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