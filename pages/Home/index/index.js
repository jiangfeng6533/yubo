
// pages/Home/index.js
const global = require('../../../Model/global.js');
const app = getApp();
Component({
  properties: {
    today: String, //接收从父组件传来的值
  },
  options: {
    addGlobalClass: true,
  },
  /**
   * 页面的初始数据
   */
  data: {
    
  },
  lifetimes:{
    attached(){
      var that = this;
      console.log("CompontcomData", this.data.comData);
      console.log("我是Home组件");
    },
    ready(){
      console.log("Home/ready")
    }

  },
  methods: {
    
    /**
     * 生命周期函数--监听页面加载
     */
    getComData(url, audit = { m_id: wx.getStorageSync('m_id') }) {
      var that = this;
      global.http.postReq(url, audit, function (res) {
        console.log('comData', res);
        if (res.data.code == 200) {
          that.setData({ comData: res.data.result });
        }
      });
    },
    toorderlist: function () {
      wx.navigateTo({
        url: '/pages/Order/list/list',
      })
    },
    toOrderList:function(e){
      console.log('type:',e);
      var type = e.currentTarget.dataset.type;
      console.log('typedata:', type);
      var param = {
        type: 'comData',
        data: type
      }
      wx.navigateTo({
        url: '/pages/Order/list/list?search=' + JSON.stringify(param),
      })
    },
    toDailyTurnover:function(){
      wx.navigateTo({
        url: '/pages/Home/daily-turnover/index',
      })
    }
  }
})
