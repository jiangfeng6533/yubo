// pages/Goods/goods-list/goods-list.js
var global = require('../../../Model/global.js');
//获取应用实例
const app = getApp()
Page({
  audit:null,
  page:1,
  /**
   * 页面的初始数据
   */
  data: {
    setgoodsmodal:false,
    addgoodsmodal:false,
    goodstype:["全部类别"],
    goodstypeindex:0,
    typeindex:0,
    animationData:{},
    state: false,
    first_click: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.audit = { m_id: wx.getStorageSync('m_id'), page: that.page, pageSize: 200, cate: null };
    that.getGoodsAll();
    that.getCate();
  },
  getCate:function(){
    var that =this;
    global.http.postReq(global.Configs.getGoodsCategory, { m_id: wx.getStorageSync('m_id') }, function (res) {
      console.log(res);
      if (res.data.code == 200) {
        var goodstype = that.data.goodstype;
        for (let k in res.data.result){
          goodstype.push(res.data.result[k].cat_name);
        }
        that.setData({ cate: res.data.result, goodstype: goodstype})
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
  setgoods(e){
    console.log('选择商品',e);
    
    var that = this;
    var gid = e.currentTarget.dataset.gid;
    var selectname = '离心开关1';
    var selectgid = 123;
    var selectgoodsprice = 15;
    that.setData({
      setgoodsmodal:true,
      selectname: selectname,
      selectgid: selectgid,
      selectgoodsprice: selectgoodsprice
    })
  },
  setgoodshideModal(e) {
    this.setData({
      setgoodsmodal: false,
      selectname:null,
      selectgid:null,
      selectgoodsprice:null
    })
  },
  addgoods(e) {
    var that = this;
    console.log('选择商品', e);
    var goodstypeindex = this.data.goodstypeindex;
    that.setData({
      addgoodsmodal: true,
      goodstypeindex:0
    })
  },
  addgoodshideModal(e) {
    this.setData({
      addgoodsmodal: false
    })
  },

  Changetype(e) {
    var that = this;
    console.log(e);
    let typeindex = e.detail.value;
    if (typeindex != 0){
      that.audit.cate = that.data.cate[typeindex - 1].category_id;
      that.page = 1;
      that.getGoodsAll();
    }else{
      that.audit.cate = null;
      that.page = 1;
      that.getGoodsAll();
    }
    this.setData({
      typeindex: typeindex
    })
    
  },
  //添加商品时选中类别
  addgoodsType:function (e){
    var that = this;
    console.log(e);
    let goodstypeindex = e.detail.value;

    if (goodstypeindex == 0){
      wx.showToast({
        title: '请选择类别',
      })
      return;
    }
    this.setData({
      goodstypeindex: goodstypeindex
    })
      
  },
  addGoodsForm:function (e){
    console.log('form提交数据',e);
    var that = this;
    var audit = e.detail.value;
    audit.m_id = wx.getStorageSync('m_id');
    var goodstypeindex = this.data.goodstypeindex;
    if (goodstypeindex==0){
      wx.showToast({
        title: '请选择类别',
      })
      return
    };
    audit.category_id = this.data.cate[goodstypeindex - 1].category_id;
    global.http.postReq(global.Configs.addGoodsInfo,audit,function(res){
      console.log('添加商品返回',res);
      if(res.data.code == 200){
        wx.showToast({
          title: res.data.msg,
          duration:500
        })
        that.page = 1;
        that.audit = { m_id: wx.getStorageSync('m_id'), page: 1, pageSize: 200, cate: null };
        that.getGoodsAll();
        that.setData({
          addgoodsmodal: false
        })
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
  //暂时没用
  clickmenu(){
    // var animation= wx.createAnimation({
    //   duration:1000,
    //   timingFunction: 'ease-in-out',
    //   delay:0
    // })
    // animation.translateY(-50).step();
    // this.setData({
    //   animationData: animation.export()
    // })
  },
  toggle: function () {
    var list_state = this.data.state,
      first_state = this.data.first_click;
    if (!first_state) {
      this.setData({
        first_click: true
      });
    }else{
      this.setData({
        first_click: false
      });
    }
    if (list_state) {
      this.setData({
        state: false
      });
    } else {
      this.setData({
        state: true
      });
    }
  },
  delshop:function(e){
    var that = this;
    console.log('删除商品',e);
    var gid = e.currentTarget.dataset.gid;
    console.log('gid',gid);
    wx.showModal({
      title: '提示',
      content: '亲，确定要删除该商品么？',
      success(res) {
        if (res.confirm) {
          global.http.postReq(global.Configs.deleteGoods, 
          { m_id: wx.getStorageSync('m_id'), goods_id: gid }, 
          (res) => {
            console.log('删除商品', res);
            if (res.data.code == 200) {
              that.page = 1;
              that.audit = { m_id: wx.getStorageSync('m_id'), page: that.page, pageSize: 200, cate: null };
              that.getGoodsAll();
            }
            if (res.data.code == 204) {
              wx.showToast({
                title: '删除失败',
                icon: 'none'
              })
            }
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    
  },
  tocategory(){
    // wx.showToast({
    //   icon:'none',
    //   title: '暂未开通',
    // })
    wx.redirectTo({
      url: '/pages/Goods/category-list/category-list',
    })
  }
})