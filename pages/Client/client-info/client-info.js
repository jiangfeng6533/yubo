// pages/Client/client-info/client-info.js
const global = require('../../../Model/global.js');
const app = getApp();

Page({
  cid:null,
  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.cid = options.cid;
    console.log('cid',this.cid);
    global.http.postReq(global.Configs.getClientOneInfo, {
      m_id:wx.getStorageSync('m_id'),
      c_id:that.cid
    }, function (res) {
      console.log("登录返回", res);
      if (res.data.code == 200) {
        
        wx.showToast({
          icon: 'none',
          title: res.data.msg,
          duration: 800
        })
        that.setData(res.data.result);
      }
      if (res.data.code == 204) {
        wx.showToast({
          icon: 'none',
          title: res.data.msg,
          duration: 1000
        })
      }
    });
  },
  toorderlist:function(){
    wx.navigateTo({
      url: '/pages/Order/list/list',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
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