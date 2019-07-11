// pages/Order/list/list.js
var wxCharts = require('../../../utils/wxcharts.js');
var global = require('../../../Model/global.js');
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  telcar: function (e) {
    console.log(e);
    var phone = e.target.dataset.phone
    wx.makePhoneCall({
      phoneNumber: phone,
    })
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
  toorderview: function (e) {
    console.log(e);
    var oid = e.currentTarget.dataset.oid;
    console.log(oid);
    wx.navigateTo({
      url: "/pages/Order/view/view"
    })
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