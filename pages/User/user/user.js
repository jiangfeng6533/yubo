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
    visitTotal: 0,
    starCount: 0,
    forksCount: 0
  },
  lifetimes: {
    attached() {
      var that = this;
      console.log("CompontcomData");
      console.log("我是User组件");
      var userinfo = wx.getStorageSync('userInfo');
      this.setData({
        name: userinfo.name
      })
    },
    ready() {
      console.log("User/ready")
    }

  },

  methods: {
  
    getData:function(){
      console.log("aaa123");
      var that = this;
      global.http.postReq(global.Configs.getManagerServiceCount, {m_id:wx.getStorageSync('m_id')}, function (res) {
        console.log('data', res);
        if (res.data.code == 200) {
          that.setData({ visitTotal: res.data.result.serviceCount})
        }
      });
    },
    logout:function(){
      wx.clearStorageSync();
      delete app.aData.m_id;
      delete app.aData.token;
      delete app.aData.accountType;
      
      wx.reLaunch({
        url: '/pages/login/login',
      })
    },
    toServiceOrderList: function () {
      // console.log('type:', e);
      var type = 'managerlist';
      var param = {
        type: type
      }
      wx.navigateTo({
        url: '/pages/Order/list/list?search=' + JSON.stringify(param),
      })
    },
    editpwd(){
      wx.navigateTo({
        url: '/pages/User/editpwd/editpwd',
      })
    }
  }
})