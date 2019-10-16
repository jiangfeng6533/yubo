//app.js
var global = require('/Model/global.js');
App({
  aData: {
    m_id: false,
    token: false,
    appcityid: false,
    dev: false
  },
  globalData:{

  },
  onLaunch: function() {
    var that  = this;
    // 获取系统状态栏信息
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
        if (e.platform == "ios") {
          that.aData.dev = true;
        }
      }
    })
    var m_id=wx.getStorageSync('m_id');
    var token = wx.getStorageSync('token');
    if(!m_id || !token){
      wx.reLaunch({
        url: '/pages/login/login',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    }else{
      that.aData.token = token;
      that.aData.m_id = m_id;
    }

  },
  onShow:function (option){
    var pages = getCurrentPages();
    console.log('页面实例', pages);
  },
  //普通跳转
  // app.navigateTo({
  //   url: '/pages/index/index'
  // });
  navigateTo(obj) {
    let that = this;
    if (that.aData.dev) {
      setTimeout(function () {
        wx.navigateTo(obj);
      }, 500)
    } else {
      wx.navigateTo(obj)
    }
  },
  //是否登录
  isLogin: function () {
    var that = this;
    if (that.aData.m_id && that.aData.token) {
      return true;
    } else {
      wx.navigateTo({
        url: "/pages/login/login"
      });
      return false;
    }
  },
})