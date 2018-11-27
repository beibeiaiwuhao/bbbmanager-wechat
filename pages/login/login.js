// pages/login/login.js

var app = getApp();
var feedbackApi = require('../component/showToast');//引入消息提醒暴露的接口

var countdown = 60;
var settime = function(that) {
  if (countdown == 0) {
    that.setData({
      is_show:true
    })
    countdown = 60;
    return;
  }else {
    that.setData({
      is_show:false,
      last_time:countdown
    })
    countdown--;
  }
  //每秒重新掉一次，直到countdown==0，return出去
  setTimeout(function(){
    settime(that)
  },1000)
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    last_time:'',
    is_show:true,
    mobile:'',
    code:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  //获取验证码
  getCode:function(){
    if (this.data.mobile.length == 0) {
      feedbackApi.showToast({ title: '手机号不能为空' });
      return;
    }
    //使用正则判断手机号是否有误
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if(!myreg.test(this.data.mobile)) {
      feedbackApi.showToast({ title: '手机号非法输入'});
      return;
    }

    wx.request({
      url: app.globalData.baseUrl + app.wxUrlPath.sendMsgCode,
      method:'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data:{
        mobile:this.data.mobile
      },
      success:function(returnData) {
        console.log(returnData);
        feedbackApi.showToast({ title: '验证码发送成功' });
      },
      fail:function(error){
      }
    })
    
      var that = this;
      this.setData({
        is_show:(!that.data.is_show)
      })
    console.log(that.data.is_show);
    settime(that);
  },
  
  //登录
  login:function(){
    if (this.data.mobile.length == 0) {
      feedbackApi.showToast({ title: '手机号不能为空' });
      return;
    }
    //使用正则判断手机号是否有误
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!myreg.test(this.data.mobile)) {
      feedbackApi.showToast({ title: '手机号非法输入' });
      return;
    }

    if (this.data.code.length == 0) {
      feedbackApi.showToast({ title: '验证码不能为空' });
      return;
    }
    var that = this;

    wx.request({
      url: app.globalData.baseUrl + app.wxUrlPath.wxUserLogin,
      method:'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data:{
        mobile:this.data.mobile,
        code:this.data.code
      },
      success:function(returnData) {
        console.log(returnData);
        if (returnData.statusCode == 200) {
          wx.setStorageSync("userLoginInfo", returnData.data.data.userInfo);
          wx.navigateBack();
        }else {
          feedbackApi.showToast({ title: "手机号或验证码不正确" });
        }
      },
      fail:function(error) {
        feedbackApi.showToast({ title:"手机号或验证码不正确" });
      }
    })



  },

  //当前验证码的输入
  codeInput:function(e) {
    this.setData({
      code:e.detail.value
    })
  },
  
  //手机号的输入
  mobilePhoneInput:function(e) {
    this.setData({
      mobile:e.detail.value
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