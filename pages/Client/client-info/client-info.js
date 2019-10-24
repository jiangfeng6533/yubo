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
  toorderlist:function(e){
    var type = e.currentTarget.dataset.type;
    var param = {
      type: 'client',
      data: type,
      c_id:this.data.id
    }
    wx.navigateTo({
      url: '/pages/Order/list/list?search=' + JSON.stringify(param),
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  telcar: function (e) {
    console.log(e);
    var phone = e.target.dataset.phone
    wx.makePhoneCall({
      phoneNumber: phone,
    })
  },
})