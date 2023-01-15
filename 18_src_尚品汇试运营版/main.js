import Vue from "vue";
import App from "./App.vue";
import router from "@/router";
// import { reqCategoryList, reqGetSearchInfo } from "@/assets/api";
import store from "./store";
import TypeNav from "@/components/TypeNav";
import Carousel from "@/components/Carousel";
import Pagination from "@/components/Pagination";
// 引入mockServer.js(没有暴露，引入让其执行一次)
import "@/mock/mockServer";
// 引入swiper样式
import "swiper/css/swiper.css";
// reqCategoryList();

//统一接收接口api文件夹里的全部请求函数
import * as API from "@/api";
//Module {reqAddOrUpdateShopCart: （…）…}
// 按需加载element-ui
import { Button, MessageBox } from "element-ui";
import VueLazyload from "vue-lazyload";
import loadingImg from "@/assets/images/1.gif";
import myPlugins from "@/plugins/myPlugins";
// 引入验证插件(无暴露，引入只为了执行内部代码)
import validate from "@/plugins/validate";
Vue.use(VueLazyload, {
  loading: loadingImg,
});
Vue.use(myPlugins, { name: "upper" });
Vue.config.productionTip = false;
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carousel.name, Carousel);
Vue.component(Pagination.name, Pagination);

// Vue.component(ListContainer.name, ListContainer);
// Vue.component(Recommend.name, Recommend);
// Vue.component(Rank.name, Rank);
// Vue.component(Like.name, Like);
new Vue({
  render: (h) => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this;
    // 把接口的api方法放在vm原型上面，所有子组件都可以用到,从而可以通过this.$API.reqxxx调用
    Vue.prototype.$API = API;
    // element-ui注册组件的时候还有一种写法，挂载原型上（对于方法的封装）
    Vue.prototype.$msgbox = MessageBox;
    Vue.prototype.$alert = MessageBox.alert;
  },
  router,
  // 注册仓库，组件实例上会多一个属性$store
  store,
}).$mount("#app");
