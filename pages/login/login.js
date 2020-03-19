// pages/login/login.js
var global = require('../../Model/global.js');
var app =getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  onShow: function () {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
      },
      fail(err) {
        console.log(err);
      }
    })
    
    // if (wx.getStorageSync("p_id")) {
    //   wx.showModal({
    //     title: '已登录',
    //     content: '您的账号已经登录',
    //     showCancel: false,
    //     success(res) {
    //       if (res.confirm) {
    //         wx.navigateTo({
    //           url: '../index/index',
    //         })
    //       }
    //     }
    //   });
    //   return;
    // }
    // wx.hideLoading();
    

  },
  
  //暂时不用
  getPhoneNumber(e) {
    console.log('getuser')
    var that = this;
    console.log(that.data.latitude);
    console.log(that.data.longitude);
    if (wx.getStorageSync("p_id")) {
      wx.showModal({
        title: '已登录',
        content: '您的账号已经登录',
        showCancel: false,
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../index/index',
            })
          }
        }
      });
      return;
    }
    if (that.data.latitude && that.data.longitude) {

    } else {
      wx.showModal({
        title: '亲请重新获取',
        content: '请先获取地理位置',
        showCancel: false
      })
      console.log('请先获取地理位置');
      return
    }
    wx.login({
      success: function (res) {
        var code = res.code;
        global.http.postReq(
          global.Configs.login,
          {
            code: code,
            iv: e.detail.iv,
            encryptedData: e.detail.encryptedData,
            long: that.data.longitude,
            lat: that.data.latitude
          },
          function (val) {
            var data = val.data;
            console.log(data);
            if (data.code == 404) {
              wx.showModal({
                title: '亲请重新登录',
                content: data.msg,
                showCancel: false
              })
            }
            
            if (data.code == 200) {
              console.log('成功');
              that.setData({
                openid: data.openid,
                sessionKey: data.session_key,
                number: data.phoneNumber
              });
              if (data.p_id == 0 && data.p_id == '0'){
                wx.showModal({
                  title: '登录失败',
                  content: '账号异常请联系管理员！',
                  showCancel: false,
                  success(res) {
                    
                  }
                });
                return;
              }
              wx.setStorageSync('openid', data.openid);
              wx.setStorageSync('phone', data.phoneNumber);
              wx.setStorageSync('token', data.token);
              wx.setStorageSync('user_info', data.user_info);
              wx.setStorageSync('accountType', 1);
              
              if (wx.getStorageSync("token")) {
                wx.showModal({
                  title: '登录成功',
                  content: '亲，等您好久啦！',
                  showCancel: false,
                  success(res) {
                    app.setPidToken(data.p_id, data.token);
                    wx.navigateBack({
                      delta: -1
                    });
                  }
                });
                return;
              }
            }
          }
        )
      }
    })

  },
  submit:function (e){
    console.log("提交");
    console.log(e.detail.value)
    console.log(e.detail.value.phone)
    var phone = e.detail.value.phone;
    var pwd = e.detail.value.pwd;
    if(!pwd || !phone){
      wx.showToast({
        title: '手机号与密码不得为空',
        icon:'none'
      })
      return;
    }
    global.http.postReq(global.Configs.login,{
      phone:phone,pwd:pwd
    },function(res){
      console.log("登录返回",res);
      if(res.data.code == 200){
        wx.setStorageSync('token', res.data.result.token);
        wx.setStorageSync('userInfo', res.data.result.userInfo);
        wx.setStorageSync('phone', res.data.result.userInfo.phone);
        wx.setStorageSync('m_id', res.data.result.userInfo.id);
        wx.setStorageSync('com_id', res.data.result.userInfo.com_id);
        wx.setStorageSync('accountType', 1);
        app.aData.accountType = 1;
        app.aData.m_id = res.data.result.userInfo.id;
        app.aData.token = res.data.result.token;
        wx.showModal({
          title: '登录成功',
          content: '亲，等您好久啦！',
          showCancel: false,
          success(res) {
            wx.redirectTo({
              url: '/pages/index/index',
            })
          }
        });
        return;
      }
      if (res.data.code == 404) {
        wx.showModal({
          title: '亲请重新登录',
          content: res.data.msg,
          showCancel: false
        })
      }
    })
  },
  test(){
    global.http.postReq(
      'manager/getUserInfo', '', function (res) {
        console.log(res);
        console.log("datat", res.data);
      }
    )
  },
  reg(){
   
    // wx.showModal({
    //   title: '温馨提示',
    //   content: '暂时关闭自动注册界面，新用户请联系管理员或在微信群中联系管理员，管理员微信：13284950004',
    // })
    wx.navigateTo({
      url: '/pages/Register/company-reg/company-reg',
    })
  },
  forgetpwd(){
    wx.showModal({
      title: '温馨提示',
      content: '请联系管理员或在微信群中联系管理员进行密码重置，管理员微信：13284950004',
    })
  },
  toComLogin(){
    wx.redirectTo({
      url: '/pages/login/comlogin',
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

})