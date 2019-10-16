const global = require('../../../Model/global.js');
const app = getApp();

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    hidden: true,
    isSearch:false

  },
  onLoad() {
    //getClientAll
    var that = this;
    global.http.postReq(global.Configs.getClientAll, {m_id:wx.getStorageSync('m_id')}, function (res) {
      console.log("登录返回", res);
      if (res.data.code == 200) {
        var area = res.data.result.list;
        var startarr = [];
        var getstartdata = [];
        for (var key in area) {
          if (startarr[area[key].second]) {
            startarr[area[key].second].push({ start: area[key].user_name, second: area[key].second, id: area[key].id, phone: area[key].phone, com_name: area[key].com_name });
          } else {
            startarr[area[key].second] = [{ start: area[key].user_name, second: area[key].second, id: area[key].id, phone: area[key].phone, com_name: area[key].com_name }];
          }
        }
        console.log('startarr', startarr);
        for (var startkey in startarr) {
          getstartdata.push(startarr[startkey]);
        }
        let list = [];
        let searchArr = [];
        for (let lkey in startarr) {
          list.push(lkey);
          for (let lkk in startarr[lkey]) {
            searchArr.push(startarr[lkey][lkk]);
          }
        }
        that.setData({
          list: list,
          listCur: list[0],
          userarr: getstartdata,
          searchArr: searchArr
        })
      }
    })
    return;
    
  },
  onReady() {
    let that = this;
    wx.createSelectorQuery().select('.indexBar-box').boundingClientRect(function (res) {
      that.setData({
        boxTop: res.top
      })
    }).exec();
    wx.createSelectorQuery().select('.indexes').boundingClientRect(function (res) {
      that.setData({
        barTop: res.top
      })
    }).exec()
  },
  //获取文字信息
  getCur(e) {
    this.setData({
      hidden: false,
      listCur: this.data.list[e.target.id],
    })
  },

  setCur(e) {
    this.setData({
      hidden: true,
      listCur: this.data.listCur
    })
  },
  //滑动选择Item
  tMove(e) {
    let y = e.touches[0].clientY,
      offsettop = this.data.boxTop,
      that = this;
    //判断选择区域,只有在选择区才会生效
    if (y > offsettop) {
      let num = parseInt((y - offsettop) / 20);
      this.setData({
        listCur: that.data.list[num]
      })
    };
  },

  //触发全部开始选择
  tStart() {
    this.setData({
      hidden: false
    })
  },

  //触发结束选择
  tEnd() {
    this.setData({
      hidden: true,
      listCurID: this.data.listCur
    })
  },
  indexSelect(e) {
    let that = this;
    let barHeight = this.data.barHeight;
    let list = this.data.list;
    let scrollY = Math.ceil(list.length * e.detail.y / barHeight);
    for (let i = 0; i < list.length; i++) {
      if (scrollY < i + 1) {
        that.setData({
          listCur: list[i],
          movableY: i * 20
        })
        return false
      }
    }
  },
  changeClient(e){
    console.log('changeuser',e);
    var cid = e.currentTarget.dataset.cid;
    var name = e.currentTarget.dataset.name;
    var phone = e.currentTarget.dataset.phone;
    wx.navigateTo({
      url: '/pages/Client/client-info/client-info',
    })
  },
  // input监听搜索
  getclientsearch(e){
    var that = this;
    var key = e.detail.value;
    console.log('key',key);
    if(key){
      console.log("有数据");
      that.setData({isSearch:true});
      let searchRes = [];
      let searchArr = that.data.searchArr;
      for (let k in searchArr){
        if(searchArr[k].start.search(key) > -1){
          searchRes.push(searchArr[k]);
        }
      }
      that.setData({ searchRes: searchRes});
    }else{
      that.setData({ isSearch: false });
      console.log('没有内容')
    }
  },
  addclient(e) {
    var that = this;
    console.log('选择商品', e);
    that.setData({
      addclientmodal: true
    })
  },
  addclienthideModal(e) {
    this.setData({
      addclientmodal: false
    })
  },

});