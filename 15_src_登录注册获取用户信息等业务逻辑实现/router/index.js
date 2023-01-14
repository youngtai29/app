import VueRouter from "vue-router";
import Vue from "vue";
import routes from "./routes";
import store from "@/store";

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
let router = new VueRouter({
  // 配置路由
  mode: "history",
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { y: 0 }; //y(垂直的属性):（数字默认单位px？）
  },
});
//beforeEach(guard)配置全局守卫,next()直接放行/next("/login")放行到指定的路由
// next（false）中断当前导航----从哪儿来，就回到哪儿去
router.beforeEach(async (to, from, next) => {
  // next("/login");//报错，每次跳转到"/login"之前又执行beforeEach，无限循环
  // 可以加上判断，写成
  // if (to.path !== "/login") {
  //   next("/login");
  // } else {
  //   next();
  // }
  // next(false);//浏览器的url发生变化时，url地址重置到from
  // ---------------------------*
  // 业务逻辑：登录后不能再去到/login
  let token = store.state.login.token;
  let userName = store.state.login.userInfo.name;
  if (token) {
    // 在已经登录的情况下，如果去登录路由页面，返回到首页
    if (to.path === "/login") {
      next("/");
      // console.log(from);

      // next(false);
    } else {
      // console.log(from, to);
      // 完成userInfo的保存
      if (userName) {
        // 当获取到用户信息时，可以跳转[home,search,detail,shopcart]，否则就获取用户信息
        next();
      } else {
        try {
          await store.dispatch("getUserInfo");
          next();
        } catch (error) {
          // console.log(error.message);

          alert("登录失效，请重新登录");
          // 有token却捞不到用户信息：服务器问题或者【token失效】---重新登录（先清除本地TOKEN）
          try {
            await store.dispatch("userLogout");
            next("/login");
          } catch (error) {
            alert(error.message);
          }
        }
      }
    }
  } else {
    if (to.path === "/shopcart") {
      next("/login");
    } else {
      next();
    }
  }
});
export default router;
