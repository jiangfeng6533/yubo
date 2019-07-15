// pages/Goods/goods-list/goods-list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    setgoodsmodal:false,
    addgoodsmodal:false,
    goodstype:["全部类别","机电维修","配件","普通商品"],
    typeindex:0,
    animationData:{},
    state: false,
    first_click: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    that.setData({
      addgoodsmodal: true
    })
  },
  addgoodshideModal(e) {
    this.setData({
      addgoodsmodal: false
    })
  },
  //选择商品类别
  selecttype(e){
    var that = this;
    that.setData({
      typemodal:true
    })
  },
  Changetype(e) {
    console.log(e);
    let typeindex = e.detail.value;
    this.setData({
      typeindex: typeindex
    })
    
  },
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})