// pages/User/editpwd/editpwd.js
var global = require('../../../Model/global.js');
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
    console.log("提交");
    console.log(e.detail.value)
    var xpwd = e.detail.value.xpwd;
    var xpwd2 = e.detail.value.xpwd2;
    var pwd = e.detail.value.pwd;
    var phone = wx.getStorageSync('phone');
    if (xpwd != xpwd2){
      var title = '新密码两次输入不一致请重新确认';
    }
    if (!xpwd || !pwd || !xpwd2) {
      var title = '密码不能为空';
    }

    if(title){
      wx.showToast({
        title: title,
        icon: 'none'
      })
      return;
    }
    global.http.postReq(global.Configs.editManagerPwd, {
      phone: phone, pwd: pwd, xpwd: xpwd
    }, function (res) {
      console.log("登录返回", res);
      if (res.data.code == 200) {
        
        wx.showModal({
          title: '温馨提示',
          content: '密码修改成功啦！',
          showCancel: false,
          success(res) {
           
          }
        });
        return;
      }
      if (res.data.code == 404) {
        wx.showModal({
          title: '请求失败',
          content: res.data.msg,
          showCancel: false
        })
      }
    })
  },
})