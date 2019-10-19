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
    return false;
  },
  toback: function (){
    console.log("return index....")

    wx.redirectTo({
      url: '/pages/index/index',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.getOrderAll();
  },
  
  getOrderAll:function(){
    var that = this;
    global.http.postReq(global.Configs.getServiceOrder, {}, function (res) {
      console.log(res);
      if (res.data.code == 200) {
        for (let v in res.data.result.list) {
          res.data.result.list[v].join_time = res.data.result.list[v].join_time.substring(0, 10);
        }
        that.setData(res.data.result);
        return;
      }
    });
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
      url: "/pages/Order/view/view?oid=" + oid
    })
  },
  clickType:function (e){
    console.info('操作',e);
    var that = this;
    var type = parseInt(e.target.dataset.type);
    var order_id  = parseInt(e.target.dataset.oid);
    switch (type) {
      case -1:
        var url = global.Configs.cancelServiceOrder;
        var audit = { m_id: wx.getStorageSync('m_id'), order_id: order_id };
        wx.showModal({
          title: '提示',
          content: '亲，是否要取消该订单呀？',
          success(res) {
            if (res.confirm) {
              that.typePost(url, audit);
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
        break;
      case 2:
        var url = global.Configs.startService
        var audit = { m_id: wx.getStorageSync('m_id'), order_id: order_id };
        wx.showModal({
          title: '提示',
          content: '亲，是否要开始维修啦？',
          success(res) {
            if (res.confirm) {
              that.typePost(url, audit);
              wx.navigateTo({
                url: '/pages/Order/edit/edit?oid=' + order_id,
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
        break;
      case 3:
        var url = global.Configs.serviceFinish
        var audit = { m_id: wx.getStorageSync('m_id'), order_id: order_id };
        wx.showModal({
          title: '提示',
          content: '亲，您已经确认已经修好了么？',
          success(res) {
            if (res.confirm) {
              that.typePost(url, audit);
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
        break;
      case 4:
        var url = global.Configs.cutomers
        var audit = { m_id: wx.getStorageSync('m_id'), order_id: order_id };
        wx.showModal({
          title: '提示',
          content: '亲，您已经跟客户沟通成功了么？',
          success(res) {
            if (res.confirm) {
              that.typePost(url, audit);
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
        break;
      case 5:
        var url = global.Configs.takes
        var audit = { m_id: wx.getStorageSync('m_id'), order_id: order_id };
        wx.showModal({
          title: '提示',
          content: '亲，客户已经把机器取走了么？',
          success(res) {
            if (res.confirm) {
              that.typePost(url, audit);
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
        break;
      case 6:
        var url = global.Configs.serviceOrderFinish
        var audit = { m_id: wx.getStorageSync('m_id'), order_id: order_id };
        that.typePost(url, audit);
        break;
      default:
        console.log('操作错误');
    }

  },
  typePost: function (url,audit){
    var that = this;
    global.http.postReq(url, audit, function (res) {
      console.log(res);
      if (res.data.code == 200) {
        wx.showToast({
          title: res.data.msg,
          icon: 'success',
          duration: 2000
        })
        setTimeout(function () {
          that.getOrderAll();
        }, 1000)
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
  PayModal(e) {
    var that = this;
    var cacheAmount = e.target.dataset.amount;
    if (!cacheAmount){
      wx.showToast({
        title: '暂无金额',
        icon: 'none',
        duration: 1200
      })
      return;
    }
    var cacheoid = parseInt(e.target.dataset.oid);
    console.log('选择商品', e);
    that.setData({
      PayModal: true,
      cacheAmount: cacheAmount,
      cacheoid: cacheoid
    })
  },
  cancelPayModal(e) {
    this.setData({
      PayModal: false,
      cacheAmount: null,
      cacheoid: null
    })
  },
  pay:function(){
    var that = this;
    var url = global.Configs.payServiceOrder;
    var cacheAmount = that.data.cacheAmount;
    var cacheoid = that.data.cacheoid;
    var audit = { m_id: wx.getStorageSync('m_id'), order_id: cacheoid, amount: cacheAmount };
    wx.showModal({
      title: '提示',
      content: '亲，确认收到客户付款了么？',
      success(res) {
        if (res.confirm) {
          that.typePost(url, audit);
          that.setData({
            PayModal: false,
            cacheAmount: null,
            cacheoid: null
          })
        } else if (res.cancel) {
          that.setData({
            PayModal: false,
            cacheAmount: null,
            cacheoid: null
          })
        }
      }
    })
  }
})