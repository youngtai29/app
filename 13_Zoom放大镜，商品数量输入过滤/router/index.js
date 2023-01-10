import VueRouter from "vue-router";
import Vue from "vue";
import routes from "./routes";

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
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { y: 200 }; //y(垂直的属性):（数字默认单位px？）
  },
});
