const Config={
  //接口地址
  rootDocment: 'http://118.190.61.40:9501/api/',
  rootUrl:'http://118.190.61.40:9501/api/',
  txmapkey:"D4UBZ-EXZ65-RBCIP-QHQQZ-VRU77-42FEG",
  gdmapkey:"1f5cb96226f3db13f946b7b484178d0a",

  //获取膳食信息
  login:"manager/login",
  getClientAll:"client/getClientAll",
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
  // 还未做的
  //获取当日送机总数：
  todaySendDeviceCount:"ServiceOrder/todaySendDeviceCount",
  //获取当日取机总数
  todayTakeDeviceCount:"ServiceOrder/todayTakeDeviceCount",
  //获取当日维修营业额
  todayServiceEarnings:"ServiceOrder/todayEarnings",
  //获取当日利润
  todayServiceProfit:"ServiceOrder/todayServiceProfit",
  //未修好设备总数
  ungoodDeviceCount:"ServiceOrder/ungoodDeviceCount",
  //未取设备总数
  noTakeDeviceCount:"ServiceOrder/noTakeDeviceCount",
  //失联设备总数
  loseDeviceCount:"ServiceOrder/loseDeviceCount",
  //大客户欠单总数
  VipClientDebtCount:"ServiceOrder/VipClientDebtCount",
  //获取商品分类
  getGoodsCategory:"Goods/getGoodsCategory",
  //获取商品列表
  getGoodsAll:"Goods/getGoodsAll",
  //添加商品
  addGoodsInfo:"Goods/addGoodsInfo",
  





  
};
module.exports = {
  Config: Config
}