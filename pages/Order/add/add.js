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
    grade:0,
    modalName: null,
    textareaAValue: '',
    textareaBValue: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  Changegrade(e) {
    console.log(e);
    let grade = e.detail.value;
    this.setData({
      grade: grade
    })

      this.setData({
        cname:null,
        cphone:null,
        cid:null
      })
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
  selectclient(){
    if (this.data.grade >0){
      wx.navigateTo({
        url: '../select-client/client',
      })
    }else{

    }
  },
  resclientinfo(audit){
    console.log('add-audit',audit);
    this.setData({
      cname: audit.name,
      cphone: audit.phone,
      cid: audit.cid
    })
  },
  submit(e){
    console.log(e);
    var phone = e.detail.value.client_phone;
    var name = e.detail.value.client_name;
    var device_unit = e.detail.value.device_unit;
    var device_name = e.detail.value.device_name;
    let phonereg = /^1[1|2|3|4|5|6|7|8|9][0-9]{9}$/;
    if (!phone || !phonereg.test(phone)) {
      var title = '请输入正确手机号';
    }
    if (!name) {
      var title = '请输入用户姓名';
    }
    if (!device_unit) {
      var title = '请输入设备型号';
    }
    if (!device_name) {
      var title = '请输入设备名称';
    }
    if (title) {
      wx.showToast({
        title: title,
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    var userInfo = wx.getStorageSync('userInfo');
    var grade = this.data.grade;
    var audit = {
      client_name: e.detail.value.client_name,
      client_phone: e.detail.value.client_phone,
      device_name: e.detail.value.device_name,
      device_unit: e.detail.value.device_unit,
      marker: e.detail.value.marker,
      order_img: this.data.imgList,
      client_level:grade,
      m_id:wx.getStorageSync('m_id')
    };
    if(grade == 1){
      audit.client_id = this.data.cid;
    }
    console.log('audit',audit);
    global.http.postReq(global.Configs.addServiceOrder, audit, function (res) {
      console.log("添加返回", res);
      if (res.data.code == 200) {
        console.log("添加成功",res);
        wx.showModal({
          title: '提示',
          content: '添加成功',
          showCancel: false,
          success(res) {
            if (res.confirm) {
              wx.navigateBack({
                delta: 1
              })
            } else if (res.cancel) {
              wx.navigateBack({
                delta: 1
              })
            }
          }
        })
      }

      if(res.data.code == 204){
        wx.showToast({
          title: res.data.msg,
        })
      }
    })
    return;
    
  }
})