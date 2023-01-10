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
