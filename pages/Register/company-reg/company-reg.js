// pages/Register/company-reg/company-reg.js
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
    imglistUrl: [],
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  ChooseImage() {
    var that = this;
    var imglistUrl = this.data.imglistUrl;
    var imgList = this.data.imgList;
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], //从相册选择
      success: (res) => {
        console.log('选择相册图片', res);
        for (let k in res.tempFilePaths) {
          wx.uploadFile({
            url: global.Configs.rootDocment + global.Configs.comUpload,
            filePath: res.tempFilePaths[k],
            name: 'file',
            success: (upres) => {
              var resdata = JSON.parse(upres.data)
              if (resdata.code == 200) {
                wx.showToast({
                  title: '上传成功',
                  icon: 'none'
                })
                console.log('上传成功', resdata);
                imgList.push(res.tempFilePaths[k])
                imglistUrl.push(resdata.result.fileUrl)
                that.setData({
                  imgList: imgList,
                  imglistUrl: imglistUrl
                })
              }
            },
            fail: () => {
              console.log("上传失败");
            }
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
          this.data.imglistUrl.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList,
            imglistUrl: this.data.imglistUrl
          })
        }
      }
    })
  },
  submit(e) {
    console.log(e);
    var imglistUrl = this.data.imglistUrl;
    if (imglistUrl.length == 0) {
      var title = '请上传营业照片';
    }
    var phone = e.detail.value.phone;
    var company = e.detail.value.company;
    var license = e.detail.value.license;
    var pwd = e.detail.value.pwd;
    var leader = e.detail.value.leader;
    var leader_idcard = e.detail.value.leader_idcard;
    let phonereg = /^1[1|2|3|4|5|6|7|8|9][0-9]{9}$/;
    if (!phone || !phonereg.test(phone)) {
      var title = '请输入正确手机号';
    }
    if (!company) {
      var title = '请输入公司名称';
    }
    if (!license) {
      var title = '请输入营业执照编号';
    }
    if (!leader) {
      var title = '请输入负责人姓名';
    }
    if (!leader_idcard) {
      var title = '请输入负责人身份证编号';
    }
    if (!pwd) {
      var title = '请输入公司密码';
    }
    if (title) {
      wx.showToast({
        title: title,
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    var audit = {
      company: e.detail.value.company,
      phone: e.detail.value.phone,
      license: e.detail.value.license,
      pwd: e.detail.value.pwd,
      license_img : JSON.stringify(imglistUrl),
      leader: leader,
      leader_idcard: leader_idcard
    };
    console.log('audit', audit);
    // return;
    global.http.postReq(global.Configs.addCompanyInfo, audit, function (res) {
      console.log("添加返回", res);
      if (res.data.code == 200) {
        console.log("添加成功", res);
        wx.showModal({
          title: '提示',
          content: '提交成功请等待审核',
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

      if (res.data.code == 204) {
        wx.showToast({
          title: res.data.msg,
        })
      }
    })
    return;

  }

  
})