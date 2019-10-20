// pages/Order/add/add.js
var wxCharts = require('../../../utils/wxcharts.js');
var global = require('../../../Model/global.js');
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: null,
    imgList: [],
    clientgrade: ['零散客户', '大客户'],
    modalName: null,
    textareaAValue: '',
    textareaBValue: '',
    servicePeopleIndex:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var oid = options.oid;
    var that = this;
    that.getOrderInfo(oid);
    
    
  },
  getOrderInfo:function(oid){
    var that = this;
    global.http.postReq(global.Configs.getOneServiceOrder, { m_id: wx.getStorageSync('m_id'), order_id: oid }, function (res) {
      console.log(res);
      if (res.data.code == 200) {
        if (res.data.result.service_manger) {
          that.getServicePeopleList(res.data.result.service_manger);
        } else {
          that.getServicePeopleList('-1');
        }
        switch (res.data.result.status) {
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
        var shopdata = JSON.parse(res.data.result.goods_info);
        res.data.result.shopdata = shopdata;
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
  //获取维修师傅
  getServicePeopleList: function (service_manager){
    var that = this;
    global.http.postReq(global.Configs.getServicemanager, { m_id: wx.getStorageSync('m_id')}, function (res) {
      var servicePeople =['请选择维修师傅'];
      console.log('service_manager', service_manager);
      if (res.data.code == 200 ){
        console.log('维修师傅',res.data);
        var list = res.data.result;
        for(let l in list){
          servicePeople.push(list[l].name);
          if (service_manager == list[l].id){
            that.setData({ servicePeopleIndex:(parseInt(l)+1)});
          }
        }
        list.unshift({ id: '-1', name:'请选择维修师傅'});
        that.setData({ servicePeople: servicePeople, ServicePeopleList: list})
      }
    });
  },
  //维修师傅选择
  ChangeServicePeople:function(e){
    let servicePeopleIndex = e.detail.value;
    this.setData({
      servicePeopleIndex: servicePeopleIndex
    })
  },
  Changegrade(e) {
    console.log(e);
    let grade = e.detail.value;
    this.setData({
      grade: grade
    })
    if (grade == 1) {
      this.setData({
        cname: null,
        cphone: null,
        cid: null
      })
    }
  },
  ChooseImage() {
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    });
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    wx.showModal({
      title: '师父',
      content: '确定要删除这张留证？',
      cancelText: '再看看',
      confirmText: '再见',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },
  textareaAInput(e) {
    this.setData({
      textareaAValue: e.detail.value
    })
  },
  changeGoods(e) {
    wx.navigateTo({
      url: '/pages/Goods/select-list/select-list?shopdata=' + JSON.stringify(this.data.shopdata),
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  resshopinfo(audit) {
    console.log('add-audit', audit);
    audit.money = audit.samount
    //samount商品总金额，costamount商品成本总价
    this.setData(audit);
  },
  toadd: function () {
    wx.showModal({
      title: '提示',
      content: '添加成功',
      showCancel: false,
      success(res) {
        if (res.confirm) {
          wx.redirectTo({
            url: '../index/index',
          })
        } else if (res.cancel) {
          wx.redirectTo({
            url: '../index/index',
          })
        }
      }
    })
  },
  submit(e) {
    console.log(e);
    if(this.data.servicePeopleIndex == 0){
      wx.showToast({
        title: '请选择维修师傅',
        icon:'none'
      })
      return;
    }
    var shopdata = JSON.stringify(this.data.shopdata);
    var order_id = this.data.order_id;
    var audit = {
      order_id: order_id,
      goods_info: shopdata,
      m_id: wx.getStorageSync('m_id'),
      money: e.detail.value.money,
      marker: e.detail.value.marker,
      predict_take_time: e.detail.value.predict_take_time
    };
    if (this.data.costamount){
      audit.cost = this.data.costamount;
    }
    if (this.data.service_manger != this.data.ServicePeopleList[this.data.servicePeopleIndex].id){
      audit.service_manger = this.data.ServicePeopleList[this.data.servicePeopleIndex].id;
    }
    console.log('audit', audit);
    global.http.postReq(global.Configs.editServiceOrder, audit, function (res) {
      console.log("添加返回", res);
      if (res.data.code == 200) {
        console.log("添加成功", res);
        wx.showModal({
          title: '提示',
          content: res.data.msg,
          showCancel: false,
          success(res) {
            if (res.confirm) {
              wx.navigateBack({
                delta:1
              })
            } else if (res.cancel) {
             wx.navigateBack({
               delta:1
             })
            }
          }
        })
      }
      if(res.data.code == 204){
        wx.showToast({
          title: res.data.msg,
          icon:'none'
        })
      }
      
    })
    return;
   
  }
})