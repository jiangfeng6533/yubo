// pages/index/index.js

//index.js
var wxCharts = require('../../utils/wxcharts.js');
var global = require('../../Model/global.js');
//获取应用实例
const app = getApp()

Page({

  /**3
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    PageCur: 'home'
  },
  NavChange(e) {
    this.setData({
      PageCur: e.currentTarget.dataset.cur
    })
  },
  toaddorder: function () {
    this.setData({
      goingModal: false
    });
    wx.navigateTo({
      url: '/pages/Order/add/add',
    })

  },
  toclient(){
    wx.navigateTo({
      url: '/pages/Client/client/client',
    })
  },
  tologin(){
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  going(){
    this.setData({
      goingModal:true
    });
  },
  goingModalHide(){
    this.setData({
      goingModal: false
    });
  }
  
})