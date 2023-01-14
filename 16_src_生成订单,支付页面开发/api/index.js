// 当前模块：对API进行统一管理
import requests from "./request";
import mockRequests from "./ajaxMock";
// 三级联动的接口
export const reqCategoryList = () => {
  // 发请求:axios发请求的结果是promise对象
  return requests({ url: "/product/getBaseCategoryList", method: "get" });
};
export const reqGetBannerList = () => {
  return mockRequests.get("/banner");
};
export const reqGetFloorList = () => {
  return mockRequests.get("/floor");
};
// 搜索商品的api接口是post请求，需要带参数,params参数至少是一个空对象{}
/* 
例子{
  "category3Id": "61",
  "categoryName": "手机",
  "keyword": "小米",
  "order": "1:desc", 
  "pageNo": 1,
  "pageSize": 10,
  "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
  "trademark": "4:小米"
}
 */
// ATNaxios.post写法不是对象形式，简写形式（axios.post不能这么写），完整写法可以（去掉post）
export const reqGetSearchInfo = (params) => {
  return requests.post("/list", params);
};
// 商品详情的请求
export const reqGetgoodsInfo = (id) => {
  return requests.get(`/item/${id}`);
};
// 点击加入购物车之后的请求
export const reqAddOrUpdateShopCart = (skuId, skuNum) => {
  return requests.post(`/cart/addToCart/${skuId}/${skuNum}`);
};
// 获取购物车信息的请求
export const reqShopCartList = () => {
  return requests.get(`/cart/cartList`);
};
// 删除购物车商品的请求
export const reqDeleteShopCar = (skuId) => {
  return requests.delete(`/cart/deleteCart/${skuId}`);
};
// 切换购物车的商品选中状态的请求
export const reqCheckShopCart = (skuId, isChecked) => {
  return requests.get(`/cart/checkCart/${skuId}/${isChecked}`);
};
// 用户注册的请求
export const reqRegister = (data) => {
  return requests.post(`/user/passport/register`, data);
};
// 用户请求验证码的请求
export const reqVerifyCode = (phoneNum) => {
  return requests.get(`/user/passport/sendCode/${phoneNum}`);
};
// 用户点击登录的请求
export const reqLogin = (data) => {
  return requests.post(`/user/passport/login`, data);
};
//获取用户的信息，需要带着用户的token(在请求头中设置)
export const reqUserInfo = () => {
  return requests.get(`/user/passport/auth/getUserInfo`);
};
// 退出登录的请求
export const reqUserLogout = () => {
  return requests.get(`/user/passport/logout`);
};
// 获取用户的地址的请求((接口坏了，用模拟数据))
// export const reqUserAddress = () => {
//   return requests.get(`/user/userAddress/auth/findUserAddressList`);
// };
export const reqUserAddress = () => {
  return mockRequests.get(`/user/userAddress/auth/findUserAddressList`);
};
// 获取商品清单的请求(接口坏了，用模拟数据)
// export const reqOrderInfo = () => {
//   return requests.get(`/order/auth/trade`);
// };

export const reqOrderInfo = () => {
  return mockRequests.get("/order/auth/trade");
};
// 提交订单的请求
export const reqSubmitOrder = (tradeNo, data) => {
  return requests.post(`/order/auth/submitOrder?tradeNo=${tradeNo}`, data);
};
// 获取支付创建的订单信息
export const reqPayInfo = (orderId) => {
  return requests.get(`/payment/weixin/createNative/${orderId}`);
};
// 获取支付状态的信息
export const reqPayStatus = (orderId) => {
  return requests.get(`/payment/weixin/queryPayStatus/${orderId}`);
};
