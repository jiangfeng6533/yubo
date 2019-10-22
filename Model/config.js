const Config={
  //接口地址
  rootDocment: 'https://jdshop.adyy.net/api/',
  rootUrl:'https://jdshop.adyy.net/api/',
  imgurl: 'https://jdshop.adyy.net/',
  // rootDocment: 'http://118.190.61.40:9501/api/',
  // rootUrl:'http://118.190.61.40:9501/api/',
  txmapkey:"D4UBZ-EXZ65-RBCIP-QHQQZ-VRU77-42FEG",
  gdmapkey:"1f5cb96226f3db13f946b7b484178d0a",

  //获取膳食信息
  login:"manager/login",
  //获取用户列表
  getClientAll:"client/getClientAll",
  //添加用户信息
  addClientInfo:"client/addClientInfo",
  //获取单个用户信息
  getClientOneInfo:"client/getClientOneInfo",
  //维修开单
  addServiceOrder:"ServiceOrder/addServiceOrder",
  //修改维修订单
  editServiceOrder:"ServiceOrder/editServiceOrder",
  //获取服务总订单
  getServiceOrder:"ServiceOrder/getServiceOrder",
  //维修支付
  payServiceOrder:"ServiceOrder/payServiceOrder",
  //取消维修订单
  cancelServiceOrder:"ServiceOrder/cancelServiceOrder",
  //开始维修
  startService:"ServiceOrder/startService",
  //维修完成
  serviceFinish:"ServiceOrder/serviceFinish",
  //通知客户维修完成
  cutomers:"ServiceOrder/cutomers",
  //客户取机
  takes:"ServiceOrder/takes",
  //维修订单完成
  serviceOrderFinish:"ServiceOrder/serviceOrderFinish",
  //获取服务订单单条数据
  getOneServiceOrder:"ServiceOrder/getOneServiceOrder",
  //获取首页数据comData
  comData:"ServiceOrder/comData",
  //获取商品分类
  getGoodsCategory:"Goods/getGoodsCategory",
  //获取商品列表
  getGoodsAll:"Goods/getGoodsAll",
  //添加商品
  addGoodsInfo:"Goods/addGoodsInfo",
  //删除商品
  deleteGoods:"Goods/deleteGoods",
  //获取服务人员
  getServicemanager:"manager/getServicemanager",
  //测试图片上传
  test:"upload/test",
  
  





  
};
module.exports = {
  Config: Config
}