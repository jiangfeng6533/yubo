// pages/welcome/index.js
const app = getApp();
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
    app.isLogin();
  },
  toindex(){
    if (!app.aData.accountType){
      wx.showToast({
        title: '请关闭应用重新进入。',
      })
      return
    }
    if (app.aData.accountType == 1) {
      wx.redirectTo({
        url: '/pages/index/index',
      })
      return
    }
    if (app.aData.accountType == 2) {
      wx.redirectTo({
        url: '/pages/Company/home/home',
      })
      return
    }
    
  }
})