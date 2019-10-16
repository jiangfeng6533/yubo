// pages/index/index.js
var global  = require('../../Model/global.js');
const utils = require('../../utils/util.js');
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
  onLoad: function (options) {
    this.setData({
      today: utils.formatTime(new Date())
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
  },
  togoodslist(){
    wx.navigateTo({
      url: '/pages/Goods/goods-list/goods-list',
    })
  },
  butest(){
    global.http.postReq(
      'ServiceOrder/getOrderAll', '', function (res) {
        console.log(res);
        console.log("datat", res.data);
      }
    )
  }
  
})