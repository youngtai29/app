import VueRouter from "vue-router";
import Vue from "vue";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Search from "@/pages/Search";
import Register from "@/pages/Register";
// 使用插件
Vue.use(VueRouter);
//ATN暴露的是VueRouter，不是vue
const originalPush = VueRouter.prototype.push;
const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.push = function (location, okCallback, errCallback) {
  // 若使用push时没有传递回调
  if (okCallback && errCallback) {
    return originalPush.call(this, location, okCallback, errCallback);
  } else {
    originalPush.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};
VueRouter.prototype.replace = function (location, okCallback, errCallback) {
  // 若使用push时没有传递回调
  if (okCallback && errCallback) {
    return originalReplace.call(this, location, okCallback, errCallback);
  } else {
    originalReplace.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};
export default new VueRouter({
  // 配置路由
  mode: "history",
  routes: [
    { path: "/home", component: Home, meta: { showFooter: true } },
    {
      name: "search",
      // path: "/search",
      path: "/search/:keyword?",
      component: Search,
      meta: { showFooter: true },
      // 路由组件传参方式---布尔值(只能传params参数)
      // props: true,
      // 对象写法---额外给路由传一些参数
      // props:{a:21,b:12}
      // 常用--函数写法
      // props: ($route) => {
      //   return { keyword: $route.params.keyword, k: $route.query.k };
      // },
    },
    { path: "/login", component: Login, meta: { showFooter: false } },
    { path: "/register", component: Register, meta: { showFooter: false } },
    // 重定向默认定向到首页
    { path: "/", redirect: "/home" },
  ],
});
