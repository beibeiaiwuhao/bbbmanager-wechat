// pages/index/make-appointment/make-appointment.js
var app = getApp();
var feedbackApi = require('../../component/showToast');//引入消息提醒暴露的接口
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isExpand:false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userInfo: {},//微信授权后返回的用户微信信息
    courseInfo:[],//课程信息
    hasBook:0,//是否已经预约
    appointmentInfo:{},//如果已经预约，这个是预约的信息
    choseDate:"",
    choseCourse:"",
    contactName:"",
    contactPhone:""
      },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.checkUserAuthorizes();
    this.initOnlineBookClass();
  },

/**
 * 检测用户是否授权
 */
checkUserAuthorizes:function() {
  var that = this;
  wx.getSetting({
    fail: function (res) {
      console.log(res);
    },
    success: function (res) {
      if (res.authSetting['scope.userInfo']) {
        //已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
        that.getUserLoginInfo();
      } else {
        console.log(res);
        that.showDialog();
      }
    }
  })

},

/**
 * 获取联系人数值
 */
  contactNameInput:function(e) {
    this.setData({
      contactName:e.detail.value
    })
  },


/**
 * 获取联系电话
 */
contactPhoneInput:function(e){
  this.setData({
    contactPhone: e.detail.value
  })
},


/**
 * 日期选择
 */
  bindDateChange:function(event){
    this.setData({
      choseDate: event.detail.value
    })
  },

  /**
   * 选择咨询课程
   */
  selectedClass:function(){
    this.setData({
      isExpand: !this.data.isExpand
    })
  },
  selectedCourse:function(course){
    this.setData({
      choseCourse: course.currentTarget.dataset.course,
      isExpand:false
    })
  },

  /**
   * 初始化课程
   */

  initOnlineBookClass:function() {
    var that = this;
    wx.request({
      url: app.globalData.baseUrl + app.wxUrlPath.initOnlineBookClass,
      method: 'post',
      success:function(data){
        // console.log(data);
        that.setData({
          courseInfo:data.data.data.courseInfo
        })
      }
    })
  },
  makeAppointmentAction:function(){
   var that = this;
  if (this.data.contactName == null || this.data.contactName.length == 0) {
      feedbackApi.showToast({ title: '联系人姓名不能为空' })
      return;
  } else if (this.data.contactPhone == null || this.data.contactPhone.length == 0) {
    feedbackApi.showToast({ title: '联系人电话不能为空' })
    return;
  } else if (this.data.choseDate == null || this.data.choseDate.length == 0) {
    feedbackApi.showToast({ title: '预约时间不能为空' })
    return;
  } else if (this.data.choseCourse == null || this.data.choseCourse.length == 0) {
      feedbackApi.showToast({ title: '咨询课程不能为空' })
    return;
  }
  var params = {
    mobile: this.data.contactPhone,
    userName: this.data.contactName,
    apponitmentTime: this.data.choseDate,
    apponitmentClasses: this.data.choseCourse,
    address: this.data.userInfo.country + this.data.userInfo.province + this.data.userInfo.city,
    avatarImgUrl: this.data.userInfo.avatarUrl,
    sex: this.data.userInfo.gender,
    openId:this.data.userInfo.openId,
    wechat:this.data.userInfo.nickName
  };
  wx.request({
    url: app.globalData.baseUrl + app.wxUrlPath.saveOnlineBookClass,
    method:"post",
    data:params,
    header: {
      'content-type': 'application/x-www-form-urlencoded' // 默认值
    },
    success:function(returnData){
      feedbackApi.showToast({ title: '预约信息保存成功' })
      that.onLoad();
    },
    fail:function(error){

    }

  })



  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.dialog = this.selectComponent("#dialog");
  },

  showDialog: function () {
    this.dialog.showDialog();
  },

  confirmEvent: function () {
    this.dialog.hideDialog();
  },

  bindGetUserInfo: function () {
    //已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    this.getUserLoginInfo();
  },

  /**
   * 如果是已经授权的用户，直接获取用户信息
   */
  getUserLoginInfo:function() {
    var that = this;
    wx.login({
      success: function (res) {
        var code = res.code;//登录凭证
        if (code) {
          //2.调用获取用户信息接口
          wx.getUserInfo({
            success: function (userRes) {
              wx.request({
                url: app.globalData.baseUrl + app.wxUrlPath.decodeUser,
                method: 'post',
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                data: {
                  encryptedData: userRes.encryptedData,
                  iv: userRes.iv,
                  code: code
                },
                success: function (data) {
                  //4.解密成功后 获取自己服务器返回的结果
                  if (data.data.data.status == 1) {
                    var userInfo_ = data.data.data.userInfo;
                    that.setData({
                      userInfo:userInfo_
                    })
                    that.checkUserHasBook(data.data.data.userInfo.openId);
                  } else {
                    console.log('解密失败')
                  }
                },
                fail: function (res) {
                  console.log("系统错误");
                }
              })
            },
            fail: function () {
              console.log("获取用户信息失败");
            }
          })
        } else {
          console.log("获取用户登录失败")
        }
      }
    })
  },

  /**
   * 检测该微信用户是否填写过预约课程，每个用户只能填写一次
   */
  checkUserHasBook:function(openId) {
    var that = this;

      wx.request({
        url: app.globalData.baseUrl + app.wxUrlPath.checkUserHasBook,
        method:'post',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data:{
          openId:openId
        },
        success:function(returnData){
          var useData = returnData.data.data;
            that.setData({
              hasBook: useData.status,
              appointmentInfo: useData.appointmentInfo
            })
        },
        fail:function(error) {

        }
      })
  },

  /**
   * 封装弹框提示
   */
  showSelfToast:function(title,duration){
    wx.showToast({
      title: title,
      icon:'',
      duration:duration
    })
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