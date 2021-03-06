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
    var that = this;
    this.setData({
      today: utils.formatTime(new Date())
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
    console.log("onReady一下")
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (!app.isLogin()){
      return;
    }
    this.home = this.selectComponent("#home");
    if (this.data.PageCur == 'home'){
      
      this.home.getComData(global.Configs.comData)
    }
    console.log("show一下")
  },
  NavChange(e) {
    this.setData({
      PageCur: e.currentTarget.dataset.cur
    })
    if (e.currentTarget.dataset.cur == "home"){
      this.home = this.selectComponent("#home");
      this.home.getComData(global.Configs.comData)
    }
    if (e.currentTarget.dataset.cur == "user") {
      this.home = this.selectComponent("#user");
      this.home.getData()
    }

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
  },
  toshop(){
    wx.navigateTo({
      url: '/pages/Goods/select-shop/select-shop',
    })
  }
  
})