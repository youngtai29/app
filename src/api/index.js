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
  return requests.post("/list", { data: params });
};
// 商品详情的请求
export const reqGetgoodsInfo = (id) => {
  return requests.get(`/item/${id}`);
};
