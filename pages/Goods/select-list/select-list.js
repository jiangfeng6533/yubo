// pages/Goods/goods-list/goods-list.js
//页面说明，接口数据与页面匹配数据有些区别  如：接口cost对应data-price 、price对应data-mount
var global = require('../../../Model/global.js');
//获取应用实例
const app = getApp()
Page({
  audit: null,
  page: 1,
  /**
   * 页面的初始数据
   */
  data: {
    setgoodsmodal: false,
    goodstype: ["全部类别", "机电维修", "配件", "普通商品"],
    typeindex: 0,
    animationData: {},
    optionstatus: false,
    isgoodshow:true
  },

  onLoad: function (options) {
    var puldata = JSON.parse(options.shopdata);
    if (puldata == null) puldata=[];
    var that = this;
    //更新购物车
    var shopdata = [];
    shopdata.push(
      { com_name: "宇博机电", checked: '', data: puldata }
      //{ goods_name: '这是一个商dddddd品名称', price: 30, num: 1, mount: 30, checked: 'checked', cost: 15, goods_id: 6666 }, { goods_name: '这是一个ddddddddd商品名称', price: 30, num: 1, mount: 40, checked: '', cost: 15, goods_id: 6661 }
    );
    that.countnum(shopdata);
    that.setData({ shopdata: shopdata, goodsNum: shopdata[0].data.length})
    //更新商品和类别
    that.audit = { m_id: wx.getStorageSync('m_id'), page: that.page, pageSize: 200, cate: null };
    that.getGoodsAll();
    that.getCate();
  },
  getCate: function () {
    var that = this;
    global.http.postReq(global.Configs.getGoodsCategory, { m_id: wx.getStorageSync('m_id') }, function (res) {
      console.log(res);
      if (res.data.code == 200) {
        var goodstype = that.data.goodstype;
        for (let k in res.data.result) {
          goodstype.push(res.data.result[k].cat_name);
        }
        that.setData({ cate: res.data.result, goodstype: goodstype })
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

  getGoodsAll: function () {
    var that = this;
    global.http.postReq(global.Configs.getGoodsAll, that.audit, function (res) {
      console.log(res);
      if (res.data.code == 200) {
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
  submit: function () {
    wx.navigateTo({
      url: '/pages/scar/order/index'
    })
  },
  numadd: function (e) {
    console.log(e);
    var comkey = e.currentTarget.dataset.comkey;
    var shopkey = e.currentTarget.dataset.shopkey;
    var shopdata = this.data.shopdata;
    shopdata[comkey].data[shopkey].num = shopdata[comkey].data[shopkey].num + 1;
    shopdata[comkey].data[shopkey].mount = parseInt((shopdata[comkey].data[shopkey].num * shopdata[comkey].data[shopkey].price).toFixed(2));
    shopdata[comkey].data[shopkey].costmount = parseInt((shopdata[comkey].data[shopkey].num * shopdata[comkey].data[shopkey].cost).toFixed(2));
    this.countnum(shopdata);
    this.setData({ shopdata: shopdata })
    //wx.setStorageSync('cartlist', shopdata);
  },
  numdel: function (e) {
    console.log(e);
    var comkey = e.currentTarget.dataset.comkey;
    var shopkey = e.currentTarget.dataset.shopkey;
    var shopdata = this.data.shopdata;
    if (shopdata[comkey].data[shopkey].num != 1 && shopdata[comkey].data[shopkey].num > 0) {
      shopdata[comkey].data[shopkey].num = shopdata[comkey].data[shopkey].num - 1;
      shopdata[comkey].data[shopkey].mount = parseInt((shopdata[comkey].data[shopkey].num * shopdata[comkey].data[shopkey].price).toFixed(2));
      shopdata[comkey].data[shopkey].costmount = parseInt((shopdata[comkey].data[shopkey].num * shopdata[comkey].data[shopkey].cost).toFixed(2));
    }
    this.countnum(shopdata);
    this.setData({ shopdata: shopdata })
    //wx.setStorageSync('cartlist', shopdata);
  },
  //计算总价公共函数
  countnum: function (shopdata) {
    let paymentMount = 0;
    let costamount = 0;
    for (let v in shopdata) {
      for (let vv in shopdata[v].data) {
        if (shopdata[v].data[vv].checked == 'checked'){
          paymentMount = parseInt((paymentMount + shopdata[v].data[vv].mount).toFixed(2));
          costamount = parseInt((costamount + shopdata[v].data[vv].costmount).toFixed(2));
        }
      }
    }
    this.setData({ paymentMount: paymentMount, costamount: costamount })
  },
  //购物车删除已选商品
  delshop(e){
    console.log(e);
    var comkey = e.currentTarget.dataset.comkey;
    var shopkey = e.currentTarget.dataset.shopkey;
    var shopdata = this.data.shopdata;
    shopdata[comkey].data.splice(shopkey,1);
    console.log(shopdata,"daa");
    this.countnum(shopdata);
    this.setData({ shopdata: shopdata });

  },
  optionall: function (e) {
    var that = this;
    console.log(e);
    var shopdata = this.data.shopdata;
    var optionstatus = e.currentTarget.dataset.optionstatus;
    if (this.data.optionstatus) {
      for (let k in shopdata) {
        shopdata[k].checked = '';
        for (let kk in shopdata[k].data) {
          shopdata[k].data[kk].checked = '';
        }
      }
      this.setData({ optionstatus: false, shopdata: shopdata })
    } else {
      for (let k in shopdata) {
        shopdata[k].checked = 'checked';
        for (let kk in shopdata[k].data) {
          shopdata[k].data[kk].checked = 'checked';
        }
      }
     // wx.setStorageSync('cartlist', shopdata);
      this.setData({ optionstatus: true, shopdata: shopdata })
    }
    that.countnum(shopdata);
  },
  checkboxChange: function (e) {
    var that = this;
    console.log(e)
    var comkey = e.currentTarget.dataset.comkey;
    var shopkey = e.currentTarget.dataset.shopkey;
    var shopdata = this.data.shopdata;
    if (e.currentTarget.dataset.com) {
      if (shopdata[comkey].checked == 'checked') {
        shopdata[comkey].checked = '';
        for (let kk in shopdata[comkey].data) {
          shopdata[comkey].data[kk].checked = '';
        }
      } else {
        shopdata[comkey].checked = 'checked';
        for (let kk in shopdata[comkey].data) {
          shopdata[comkey].data[kk].checked = 'checked';
        }
      }
    } else {
      if (shopdata[comkey].data[shopkey].checked == 'checked') {
        shopdata[comkey].data[shopkey].checked = '';
      } else {
        shopdata[comkey].data[shopkey].checked = 'checked';
      }
    }
    //wx.setStorageSync('cartlist', shopdata);
    that.countnum(shopdata);
    this.setData({ shopdata: shopdata });
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
  setgoods(e) {
    console.log('选择商品', e);
    var that = this;
    var gid = e.currentTarget.dataset.gid;
    var setgoodsData = {};
    setgoodsData.goods_name = e.currentTarget.dataset.name;
    setgoodsData.goods_id = e.currentTarget.dataset.gid;
    setgoodsData.mount = e.currentTarget.dataset.mount;
    setgoodsData.price = e.currentTarget.dataset.price;
    setgoodsData.num = 1;
    setgoodsData.unit = e.currentTarget.dataset.unit;
    that.setData({
      setgoodsmodal: true,
      setgoodsData: setgoodsData
    })
  },
  setgoodshideModal(e) {
    this.setData({
      setgoodsmodal: false,
      setgoodsData:{}
    })
  },
  setGoodsDataNum(e){
    var setgoodsData = this.data.setgoodsData;
    setgoodsData.num = e.detail.value
    this.setData({
      setgoodsData: setgoodsData
    })
  },
  //选择商品
  choosegoods(){
    var that = this;
    var setgoodsData = this.data.setgoodsData;
    var shopdata = this.data.shopdata;
    shopdata[0].data.push(
      { goods_name: setgoodsData.goods_name, price: setgoodsData.mount, num: setgoodsData.num, mount: parseInt((setgoodsData.mount * setgoodsData.num).toFixed(2)), checked: 'checked', cost: setgoodsData.price, costmount: parseInt((setgoodsData.price * setgoodsData.num).toFixed(2)), goods_id: setgoodsData.goods_id, unit: setgoodsData.unit}
    );
    var goodsNum = shopdata[0].data.length;
    this.setData({
      shopdata: shopdata,
      setgoodsData: {},
      setgoodsmodal: false,
      goodsNum: goodsNum
    })
    that.countnum(shopdata);
  },
  //选择商品类别
  selecttype(e) {
    var that = this;
    that.setData({
      typemodal: true
    })
  },
  Changetype(e) {
    console.log(e);
    let typeindex = e.detail.value;
    this.setData({
      typeindex: typeindex
    })
  },
  
  shoppingCart:function(){
    var shopdata = this.data.shopdata;
    var isgoodshow = !this.data.isgoodshow;
    var goodsNum = shopdata[0].data.length;
    this.setData({
      isgoodshow: isgoodshow,
      goodsNum: goodsNum
    })
  },
  // input监听搜索
  getclientsearch(e) {
    var that = this;
    var key = e.detail.value;
    console.log('key', key);
    if (key) {
      console.log("有数据");
      that.setData({ isSearch: true });
      let searchRes = [];
      let searchArr = that.data.searchArr;
      for (let k in searchArr) {
        if (searchArr[k].start.search(key) > -1) {
          searchRes.push(searchArr[k]);
        }
      }
      that.setData({ searchRes: searchRes });
    } else {
      that.setData({ isSearch: false });
      console.log('没有内容')
    }
  },
  selectFinish(e) {
    console.log('changeuser', e);
    var shopdata = this.data.shopdata[0].data;
    for (let v in shopdata){
      if (shopdata[v].checked != 'checked'){
        shopdata.splice(v, 1);
      }
    }
    var audit = { shopdata: shopdata, samount: this.data.paymentMount, costamount: this.data.costamount}; 
    var pages = getCurrentPages();
    console.log('page', pages);
    var beforePage = pages[pages.length - 2];
    wx.navigateBack({
      delta: 1
    })
    beforePage.resshopinfo(audit);
  },
 
})