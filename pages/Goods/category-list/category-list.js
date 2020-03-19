// pages/Goods/category-list/category-list.js
var global = require('../../../Model/global.js');
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    catemodal:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.getcatelist();
  },
  getcatelist(){
    var that = this;
    global.http.postReq(global.Configs.getGoodsCategory, { m_id: wx.getStorageSync('m_id') }, function (res) {
      console.log(res);
      if (res.data.code == 200) {
        that.setData({ cate: res.data.result })
        return;
      }
      if (res.data.code == 204) {
        wx.showModal({
          title: '提示',
          content: res.data.msg,
          showCancel: false
        })
        return;
      }
    });
  },
  cateclosemodal:function(){
    var that = this;
    that.setData({ catemodal:false })
  },

  cateeditsubmit:function(e){
    console.log('submit',e);
    var catename = e.detail.value.catename;
    console.log('catename', catename);

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

})