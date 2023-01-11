import Vue from "vue";
import Vuex from "vuex";
import home from "./home";
import search from "./search";
import detail from "./detail";
import shopCart from "./shopCart";
import register from "./register";
import login from "./login";
//vuex实现模块式存储
Vue.use(Vuex);
// 对外暴露Store类的一个实例
// const state = {
//   count: 1,
// };
// const actions = {
//   add({ commit }) {
//     commit("ADD");
//   },
// };
// const mutations = {
//   ADD(state) {
//     state.count += 1;
//   },
// };
// // getters理解为计算属性，用于简化仓库属性，让组件获取仓库数据更方便
// const getters = {};
export default new Vuex.Store({
  modules: { home, search, detail, shopCart, register, login },
  // state,
  // actions,
  // mutations,
  // getters,
});
