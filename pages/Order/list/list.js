// pages/Order/list/list.js
var wxCharts = require('../../../utils/wxcharts.js');
var global = require('../../../Model/global.js');
//获取应用实例
const app = getApp()

Page({
  page:1,
  listaudit:null,
  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    lefeModal:false,
    payType:['请选择收款类型','现金','支付宝','微信','银行卡(企)'],
    paydefIndex:0,
    imgPublic: global.Configs.imgurl,
    imgModal:false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.search) {
      console.log('options', JSON.parse(options.search));
      this.searchdata = JSON.parse(options.search);
    } else {
      this.searchdata = { type: 'def' }
    }
    var that = this;
    that.search(this.searchdata);
  },
  onShow: function (options) {
    var that = this;
    // if (this.listaudit){
    //   that.search(that.searchdata);
    // }
    that.getOrderAll(this.listaudit);
  },
  //搜索订单
  search: function (search){
    var that = this;
    this.listaudit = {
      m_id: wx.getStorageSync('m_id')
    }
    switch (search.type){
      case 'comData':
        this.listaudit.searchData = search.data;
        that.getOrderAll(this.listaudit);
      break;
      case 'client':
        if (search.data ==1){ //用户总数据
          this.listaudit.c_id = search.c_id;
          that.getOrderAll(this.listaudit);
        }
        if (search.data == 2) { //未结算
          this.listaudit.pay_status = 0;
          this.listaudit.c_id = search.c_id;
          that.getOrderAll(this.listaudit);
        }
        if (search.data == 3) { //已结算金额
          this.listaudit.pay_status = 1;
          this.listaudit.c_id = search.c_id;
          that.getOrderAll(this.listaudit);
        }

      break;
      case 'managerlist':
        this.listaudit.service_manger = wx.getStorageSync('m_id');
        that.getOrderAll(this.listaudit);
      break;
      default:
        that.getOrderAll(this.listaudit);
      break;
    }
    
  },
  //获取订单
  getOrderAll: function (listaudit){
    var that = this;
    global.http.postReq(global.Configs.getServiceOrder, listaudit, function (res) {
      console.log(res);
      if (res.data.code == 200) {
        for (let v in res.data.result.list) {
          if (res.data.result.list[v].payment == 1) res.data.result.list[v].payment='现金';
          if (res.data.result.list[v].payment == 2) res.data.result.list[v].payment = '支付宝';
          if (res.data.result.list[v].payment == 3) res.data.result.list[v].payment = '微信';
          if (res.data.result.list[v].payment == 4) res.data.result.list[v].payment = '银行卡(企)';
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
  telcar: function (e) {
    console.log(e);
    var phone = e.target.dataset.phone
    wx.makePhoneCall({
      phoneNumber: phone,
    })
    return false;
  },
  toback: function () {
    console.log("return index....")

    wx.redirectTo({
      url: '/pages/index/index',
    })
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
          that.getOrderAll(that.listaudit);
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
      cacheoid: null,
      paydefIndex:0
    })
  },
  setAmount:function(e){
    console.log(e);
    var amount = e.detail.value;
    this.setData({
      cacheAmount: amount
    })
  },
  ChangePayType:function(e){
    var paydefIndex = e.detail.value;
    this.setData({
      paydefIndex: paydefIndex
    })
  },
  pay:function(){
    var that = this;
    var url = global.Configs.payServiceOrder;
    var cacheAmount = that.data.cacheAmount;
    var cacheoid = that.data.cacheoid;
    var paydefIndex = that.data.paydefIndex;
    if (paydefIndex == 0){
      wx.showToast({
        title: '请选择收款类型',
        icon:'none'
      })
      return;
    }
    var audit = { m_id: wx.getStorageSync('m_id'), order_id: cacheoid, amount: cacheAmount, payment: paydefIndex };
    wx.showModal({
      title: '提示',
      content: '亲，确认收到客户付款了么？',
      success(res) {
        if (res.confirm) {
          that.typePost(url, audit);
          that.setData({
            PayModal: false,
            cacheAmount: null,
            cacheoid: null,
            paydefIndex:0
          })
        } else if (res.cancel) {
          that.setData({
            PayModal: false,
            cacheAmount: null,
            cacheoid: null,
            paydefIndex:0
          })
        }
      }
    })
  },
  //侧边抽屉
  hideLeftModal(e) {
    this.setData({
      lefeModal: false
    })
  },
  showLeftModal(){
    this.setData({ lefeModal: true})
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var that = this;
    console.log('下拉');
    // var carpool = that.data.carpool;
    // var audit = { p_id: wx.getStorageSync('p_id') };
    // if (carpool == 1) {
    //   audit.carpool = 1;
    // }
    // global.http.postReq(
    //   'Sectionpa/index/triplists/page/0',
    //   audit,
    //   function (data) {
    //     if (data.data.ret == 200) {
    //       that.setData({
    //         order: data.data.data
    //       });
    //     }
    //     console.log(data.data.data);
    //   }
    // )

    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    that.page = that.page + 1;
    console.log(that.page);
    console.log('上拉');

    // var orderlist = that.data.order.concat(data.data.data);
    that.listaudit.page = that.page;
    global.http.postReq(global.Configs.getServiceOrder, that.listaudit, function (res) {
      console.log(res);
      if (res.data.code == 200) {
        for (let v in res.data.result.list) {
          if (res.data.result.list[v].payment == 1) res.data.result.list[v].payment = '现金';
          if (res.data.result.list[v].payment == 2) res.data.result.list[v].payment = '支付宝';
          if (res.data.result.list[v].payment == 3) res.data.result.list[v].payment = '微信';
          res.data.result.list[v].join_time = res.data.result.list[v].join_time.substring(0, 10);
        }
        res.data.result.list = that.data.list.concat(res.data.result.list);
        that.setData(res.data.result);
        return;
      }
    });
    
  },
  getsearch(e){
    var val = e.detail.value;
    console.log(val);
    this.setData({
      searchval: val
    });
  },
  osearch(){
    var that = this;
    var searchval = that.data.searchval;
    if (searchval && searchval != '' && searchval != 'undefined'){
      this.listaudit = {
        m_id: wx.getStorageSync('m_id'),
         phone: searchval
      }
      that.getOrderAll(this.listaudit);
    }else{
      this.listaudit = {
        m_id: wx.getStorageSync('m_id'),
      }
      that.getOrderAll(this.listaudit);
    }
  },
  closeimgview(){
    
    this.setData({
      imgModal:false
    })
  },
  showimg(e){
    console.log(e);
    var imgurl = e.target.dataset.imgurl
    this.setData({
      showimgval: imgurl,
      imgModal: true
    })
  }
})