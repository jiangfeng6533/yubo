// pages/User/user/user.js
var wxCharts = require('../../../utils/wxcharts.js');
var global = require('../../../Model/global.js');
//获取应用实例
const app = getApp()
Component({
  options: {
    addGlobalClass: true,
  },
  /**
   * 页面的初始数据
   */
  data: {
    visitTotal: 123,
    starCount: 9600,
    forksCount: 3200
  },

  methods: {
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
  logout:function(){
    wx.clearStorageSync();
    delete app.aData.p_id;
    delete app.aData.token;
    wx.reLaunch({
      url: '/pages/login/login',
    })
  }
  }
})