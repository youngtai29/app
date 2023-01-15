import Mock from "mockjs";
import banner from "./banner.json";
import floor from "./floor.json";
import tradeInfo from "./tradeInfo.json";
import userAddress from "./userAddress.json";
// mock数据:第一个参数（请求地址），第二个请求的数据
Mock.mock("/mock/banner", { code: 200, data: banner });
Mock.mock("/mock/floor", { code: 200, data: floor });
Mock.mock("/mock/order/auth/trade", { code: 200, data: tradeInfo });
Mock.mock("/mock/user/userAddress/auth/findUserAddressList", {
  code: 200,
  data: userAddress,
});
