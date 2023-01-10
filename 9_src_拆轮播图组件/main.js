import Vue from "vue";
import App from "./App.vue";
import router from "@/router";
// import { reqCategoryList } from "./api";
import store from "./store";
import TypeNav from "@/components/TypeNav";
import Carousel from "@/components/Carousel";
// 引入mockServer.js(没有暴露，引入让其执行一次)
import "@/mock/mockServer";
// 引入swiper样式
import "swiper/css/swiper.css";
// reqCategoryList();
Vue.config.productionTip = false;
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carousel.name, Carousel);
// Vue.component(ListContainer.name, ListContainer);
// Vue.component(Recommend.name, Recommend);
// Vue.component(Rank.name, Rank);
// Vue.component(Like.name, Like);
new Vue({
  render: (h) => h(App),
  router,
  // 注册仓库，组件实例上会多一个属性$store
  store,
}).$mount("#app");
