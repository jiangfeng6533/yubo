// pages/Order/view/view.js
var global = require('../../../Model/global.js');
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var oid = options.oid;
    var that = this;
    this.setData({docurl:global.Configs.imgurl,order_id:oid});
    global.http.postReq(global.Configs.getOneServiceOrder, { m_id: wx.getStorageSync('m_id'), order_id: oid}, function (res) {
      console.log(res);
      if (res.data.code == 200) {
        // wx.showToast({
        //   title: res.data.msg,
        //   icon: 'loading',
        //   duration: 500
        // })
        // res.data.result.order_img = JSON.parse(res.data.result.order_img);
        if (res.data.result.order_img != ''){
          var order_img = JSON.parse(res.data.result.order_img);
          res.data.result.order_img = [];
          for (let kk in order_img) {
            res.data.result.order_img[kk] = global.Configs.imgurl + order_img[kk];
          }
        }
        
        switch (res.data.result.status){
          case -1:
            res.data.result.status = "取消";
            break;
          case 1:
            res.data.result.status = "检查中";
            break;
          case 2:
            res.data.result.status = "维修中";
            break;
          case 3:
            res.data.result.status = "维修完成";
            break;
          case 4:
            res.data.result.status = "通知";
            break;
          case 5:
            res.data.result.status = "取机";
            break;
          case 6:
            res.data.result.status = "完成";
            break;
        }
        that.setData(res.data.result)
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
  telcar: function (e) {
    console.log(e);
    var phone = e.target.dataset.phone
    wx.makePhoneCall({
      phoneNumber: phone,
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
  toeditorder(){
    var oid = this.data.order_id;
    wx.redirectTo({
      url: '/pages/Order/edit/edit?oid='+oid,
    })
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.order_img,
      current: this.data.order_img[e.currentTarget.dataset.url]
    });
  },

  
})