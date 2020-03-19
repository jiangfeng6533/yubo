// pages/login/comlogin.js
var global = require('../../Model/global.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  submit: function (e) {
    console.log(e.detail.value)
    var phone = e.detail.value.phone;
    var pwd = e.detail.value.pwd;
    wx.showModal({
      title: '温馨提示',
      content: '后台暂时未开放，敬请期待',
    })
    return;

    global.http.postReq(global.Configs.comlogin, {
      phone: phone, pwd: pwd
    }, function (res) {
      console.log("登录返回", res);
      if (res.data.code == 200) {
        wx.setStorageSync('token', res.data.result.token);
        wx.setStorageSync('userInfo', res.data.result.userInfo);
        wx.setStorageSync('phone', res.data.result.userInfo.phone);
        wx.setStorageSync('m_id', res.data.result.userInfo.id);
        wx.setStorageSync('com_id', res.data.result.userInfo.com_id);
        wx.setStorageSync('accountType', 2);
        wx.showModal({
          title: '登录成功',
          content: '亲，等您好久啦！',
          showCancel: false,
          success(res) {
            wx.redirectTo({
              url: '/pages/Company/home/home',
            })
          }
        });
        return;
      }
      if (res.data.code == 404) {
        wx.showModal({
          title: '亲请重新登录',
          content: res.data.msg,
          showCancel: false
        })
      }
    })
  },
  toShopLogin() {
    wx.redirectTo({
      url: '/pages/login/login',
    })
  },
  tocom(){
    wx.navigateTo({
      url: '/pages/Company/home/home',
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
})