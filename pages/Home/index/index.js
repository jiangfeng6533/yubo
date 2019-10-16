
// pages/Home/index.js
const global = require('../../../Model/global.js');
const app = getApp();
Component({
  properties: {
    today: String, //接收从父组件传来的值
  },
  options: {
    addGlobalClass: true,
  },
  /**
   * 页面的初始数据
   */
  data: {
    
  },
  methods: {
    /**
     * 生命周期函数--监听页面加载
     */
    toorderlist: function () {
      wx.navigateTo({
        url: '/pages/Order/list/list',
      })
    },
    toUser: function () {
      wx.reLaunch({
        url: '/pages/User/user',
      })
    },
  }
})
