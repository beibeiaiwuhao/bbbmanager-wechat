
App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    
   
  },
  
  // 
  
  globalData: {
    // doubanBase:"http://t.yushu.im",
    // g_userInfo:null,
    baseUrl:"http://192.168.38.45:8082",
    gartenId:39
  },
  
  // wxUrlPath.getPhotolistByGartenId
  wxUrlPath:{
    decodeUser:"/api/decodeUser",//解码用户信息
    initOnlineBookClass:"/api/initOnlineBookClass",//初始化预约课程接口
    saveOnlineBookClass:"/api/saveOnlineBookClass",//保存预约课程接口
    checkUserHasBook:"/api/checkUserHasBook",//查询用户是否已经预约
    getGartenNoticeByGartenId:"/api/getGartenNoticeByGartenId",//获取指定园所通知公告的接口
    getTeacherListByGartenId:"/api/getTeacherListByGartenId",//根据gartenId 获取教师列表
    getGartenRecipeByGartenId:"/api/getGartenRecipeByGartenId",//校园食谱表 参数：gartenId weekType 0是本周 1是下一周 -1是上一周
    getGartenVideoListWithGartenId:"/api/getGartenVideoListWithGartenId",//获取宝贝视频接口
    getPhotolistByGartenId:"/api/getPhotolistByGartenId",//获取班级相册信息
    sendMsgCode:"/api/sendMsgCode",//发送验证码
    wxUserLogin:"/api/wxUserLogin",//用户登录
    getTeacherListByUserId:"/api/getTeacherListByUserId",//获取班级列表
    getStudentListByClassId:"/api/getStudentListByClassId",//获取班级学生列表
  },
  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    
  }
  
})

