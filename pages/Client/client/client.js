const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    hidden: true,
    isSearch:false

  },
  onLoad() {
    var that = this;
    var data = {
      "ret": 200,
      "circuit": [],
      "data": {
        "0": [{
          "first": "H",
          "second": "A",
          "end_addr": "A哈尔滨",
          "id": "1",
          "price": null,
          "b_price": null,
          "start_lon": "125.160153",
          "start_lat": "46.563254",
          "end_lon": "126.630815",
          "end_lat": "45.760407",
          "cityid": "230600",
          "ecityid": "230100",
          "startarea": "230604",
          "endarea": "230102",
          "buget_describe": null,
          "kilometre_describe": null,
          "k_metres": "179.92km",
          "discount": 1
        }],
        "1": [{
          "first": "H",
          "second": "A",
          "end_addr": "A哈尔滨火车站",
          "id": -3,
          "price": null,
          "b_price": null,
          "start_lon": "125.1478946882",
          "start_lat": "46.5693956011",
          "end_lon": "126.6383701747",
          "end_lat": "45.767161388",
          "cityid": "230600",
          "ecityid": "230100",
          "startarea": "230603",
          "endarea": "230103",
          "buget_describe": null,
          "kilometre_describe": null,
          "k_metres": "179.71km",
          "discount": 1
        }],
        "2": [{
          "first": "H",
          "second": "B",
          "end_addr": "B哈尔滨",
          "id": "1",
          "price": null,
          "b_price": null,
          "start_lon": "125.160153",
          "start_lat": "46.563254",
          "end_lon": "126.630815",
          "end_lat": "45.760407",
          "cityid": "230600",
          "ecityid": "230100",
          "startarea": "230604",
          "endarea": "230102",
          "buget_describe": null,
          "kilometre_describe": null,
          "k_metres": "179.92km",
          "discount": 1
        }],
        "3": [{
          "first": "H",
          "second": "B",
          "end_addr": "B哈尔滨火车站",
          "id": -3,
          "price": null,
          "b_price": null,
          "start_lon": "125.1478946882",
          "start_lat": "46.5693956011",
          "end_lon": "126.6383701747",
          "end_lat": "45.767161388",
          "cityid": "230600",
          "ecityid": "230100",
          "startarea": "230603",
          "endarea": "230103",
          "buget_describe": null,
          "kilometre_describe": null,
          "k_metres": "179.71km",
          "discount": 1
        }],
        "4": [{
          "first": "H",
          "second": "C",
          "end_addr": "C哈尔滨",
          "id": "1",
          "price": null,
          "b_price": null,
          "start_lon": "125.160153",
          "start_lat": "46.563254",
          "end_lon": "126.630815",
          "end_lat": "45.760407",
          "cityid": "230600",
          "ecityid": "230100",
          "startarea": "230604",
          "endarea": "230102",
          "buget_describe": null,
          "kilometre_describe": null,
          "k_metres": "179.92km",
          "discount": 1
        }],
        "5": [{
          "first": "H",
          "second": "C",
          "end_addr": "C哈尔滨火车站",
          "id": -3,
          "price": null,
          "b_price": null,
          "start_lon": "125.1478946882",
          "start_lat": "46.5693956011",
          "end_lon": "126.6383701747",
          "end_lat": "45.767161388",
          "cityid": "230600",
          "ecityid": "230100",
          "startarea": "230603",
          "endarea": "230103",
          "buget_describe": null,
          "kilometre_describe": null,
          "k_metres": "179.71km",
          "discount": 1
        }],
        "6": [{
          "first": "H",
          "second": "D",
          "end_addr": "哈尔滨",
          "id": "1",
          "price": null,
          "b_price": null,
          "start_lon": "125.160153",
          "start_lat": "46.563254",
          "end_lon": "126.630815",
          "end_lat": "45.760407",
          "cityid": "230600",
          "ecityid": "230100",
          "startarea": "230604",
          "endarea": "230102",
          "buget_describe": null,
          "kilometre_describe": null,
          "k_metres": "179.92km",
          "discount": 1
        }],
        "7": [{
          "first": "H",
          "second": "D",
          "end_addr": "哈尔滨火车站",
          "id": -3,
          "price": null,
          "b_price": null,
          "start_lon": "125.1478946882",
          "start_lat": "46.5693956011",
          "end_lon": "126.6383701747",
          "end_lat": "45.767161388",
          "cityid": "230600",
          "ecityid": "230100",
          "startarea": "230603",
          "endarea": "230103",
          "buget_describe": null,
          "kilometre_describe": null,
          "k_metres": "179.71km",
          "discount": 1
        }],
        "8": [{
          "first": "D",
          "second": "H",
          "end_addr": "大庆",
          "id": -1,
          "price": null,
          "b_price": null,
          "start_lon": "126.630815",
          "start_lat": "45.760407",
          "end_lon": "125.160153",
          "end_lat": "46.563254",
          "cityid": "230100",
          "ecityid": "230600",
          "startarea": "230102",
          "endarea": "230604",
          "buget_describe": null,
          "kilometre_describe": null,
          "k_metres": "180.75km",
          "discount": 1
        }],
        "9": [{
          "first": "D",
          "second": "H",
          "end_addr": "大庆枢纽站",
          "id": "3",
          "price": null,
          "b_price": null,
          "start_lon": "126.6383701747",
          "start_lat": "45.767161388",
          "end_lon": "125.1478946882",
          "end_lat": "46.5693956011",
          "cityid": "230100",
          "ecityid": "230600",
          "startarea": "230103",
          "endarea": "230603",
          "buget_describe": null,
          "kilometre_describe": null,
          "k_metres": "180.90km",
          "discount": 1
        }],
        "10": [{
          "first": "D",
          "second": "H",
          "end_addr": "大庆枢纽站",
          "id": "3",
          "price": null,
          "b_price": null,
          "start_lon": "126.6383701747",
          "start_lat": "45.767161388",
          "end_lon": "125.1478946882",
          "end_lat": "46.5693956011",
          "cityid": "230100",
          "ecityid": "230600",
          "startarea": "230103",
          "endarea": "230603",
          "buget_describe": null,
          "kilometre_describe": null,
          "k_metres": "180.90km",
          "discount": 1
        }]
      },
      "msg": "获取区间成功"
    };
    console.log(data);
    var area = data.data;
    var startarr = [];
    var getstartdata = [];
    for (var key in area) {
      if (startarr[area[key][0].second]) {
        startarr[area[key][0].second].push({ start: area[key][0].end_addr, second: area[key][0].second, start_lat: area[key][0].start_lat, start_lon: area[key][0].start_lon, startarea: area[key][0].startarea });
      } else {
        startarr[area[key][0].second] = [{ start: area[key][0].end_addr, second: area[key][0].second, start_lat: area[key][0].start_lat, start_lon: area[key][0].start_lon, startarea: area[key][0].startarea }];
      }
    }

    console.log('startarr',startarr);

    for (var startkey in startarr) {
      getstartdata.push(startarr[startkey]);
    }

    let list = [];
    let searchArr = [];
    for (let lkey in startarr){
      list.push(lkey);
      for (let lkk in startarr[lkey]){
        searchArr.push(startarr[lkey][lkk]);
      }
    }
    this.setData({
      list: list,
      listCur: list[0],
      userarr: getstartdata,
      searchArr: searchArr
    })
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