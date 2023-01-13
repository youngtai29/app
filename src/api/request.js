// 对axios进行二次封装
import axios from "axios";
// 引入进度条插件
import nProgress from "nprogress";
// 引入进度条的样式(可以改样式（在该文件中）)
import "nprogress/nprogress.css";
// 利用axios对象的方法create，创建一个axios实例，并且配置
// baseUrl配置基础路径，路径中自动加
// 在当前模块中引入store
import store from "@/store";

const requests = axios.create({ baseURL: "/api", timeout: 5000 });

// 请求拦截器：在发请求之前，处理
requests.interceptors.request.use((config) => {
  // config配置对象，包含一个属性很重要：header请求头
  // 进度条开始

  if (store.state.detail.uuid_token) {
    // 拿到uuid，配置请求头(userTempId)(后台有对应配置)信息

    config.headers.userTempId = store.state.detail.uuid_token;
  }
  if (store.state.login.token) {
    config.headers.token = store.state.login.token;
  }
  nProgress.start();
  return config;
});
// 响应拦截器设置
requests.interceptors.response.use(
  (response) => {
    // 进度条结束

    nProgress.done();

    return response.data;
  },
  (error) => {
    // 终止promise链
    nProgress.done();

    return Promise.reject(new Error("failed"));
  }
);
export default requests;
