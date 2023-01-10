import Vue from "vue";
import App from "./App.vue";
import router from "@/router";
import { reqCategoryList } from "./api";
import store from "./store";
// reqCategoryList();
Vue.config.productionTip = false;
// Vue.component(TypeNav.name, TypeNav);
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
