// pages/Goods/goods-list/goods-list.js
Page({

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
    var that = this;
    var shopdata = [];
    var goodsdata = [];
    goodsdata.push({ goods_name: '离心开关', price: 5.05, mount: 6, goods_id: 1233, goods_img: null, unit: '个' }, { goods_name: '电焊条', price: 30.00, mount: 35.00, goods_id: 1233, goods_img: null ,unit:'盒'})
    shopdata.push(
      { com_name: "宇博机电", checked: '', data: [{ goods_name: '这是一个商dddddd品名称', price: 30, num: 1, mount: 30, checked: 'checked', cost: 15, goods_id: 6666 }, { goods_name: '这是一个ddddddddd商品名称', price: 30, num: 1, mount: 40, checked: '', cost: 15, goods_id: 6661 }] },
    );
    console.log(shopdata)
    that.countnum(shopdata);
    that.setData({ shopdata: shopdata, goodsNum: shopdata[0].data.length, goodsdata: goodsdata })
    //wx.setStorageSync('cartlist', shopdata);
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
    shopdata[comkey].data[shopkey].mount = shopdata[comkey].data[shopkey].num * shopdata[comkey].data[shopkey].price;
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
      shopdata[comkey].data[shopkey].mount = shopdata[comkey].data[shopkey].num * shopdata[comkey].data[shopkey].price
    }
    this.countnum(shopdata);
    this.setData({ shopdata: shopdata })
    //wx.setStorageSync('cartlist', shopdata);
  },
  //计算总价公共函数
  countnum: function (shopdata) {
    let paymentMount = 0;
    for (let v in shopdata) {
      for (let vv in shopdata[v].data) {
        if (shopdata[v].data[vv].checked == 'checked'){
          paymentMount += shopdata[v].data[vv].mount;
        }
      }
    }
    this.setData({ paymentMount: paymentMount })
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
    var selectname = '离心开关1';
    var selectgid = 123;
    var selectgoodsprice = 15;
    var setgoodsData = {};
    setgoodsData.goods_name = e.currentTarget.dataset.name;
    setgoodsData.goods_id = e.currentTarget.dataset.gid;
    setgoodsData.mount = e.currentTarget.dataset.mount;
    setgoodsData.price = e.currentTarget.dataset.price;
    setgoodsData.num = 1;
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
      { goods_name: setgoodsData.goods_name, price: setgoodsData.mount, num: setgoodsData.num, mount: setgoodsData.mount * setgoodsData.num, checked: 'checked', cost: setgoodsData.price, goods_id: setgoodsData.goods_id }
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
    var shopdata = this.data.shopdata;
    var audit = shopdata[0].data; 
    var pages = getCurrentPages();
    console.log('page', pages);
    var beforePage = pages[pages.length - 2];
    wx.navigateBack({
      delta: 1
    })
    beforePage.resshopinfo(audit);
  },
 
})