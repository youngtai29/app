import { reqCategoryList, reqGetBannerList, reqGetFloorList } from "@/api";

const state = {
  // 设置初始数据，初识默认值的数据类型与服务器返回的数据类型相同
  categoryList: [],
  bannerList: [],
  floorList: [],
};
const mutations = {
  CATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList;
  },
  GETBANNERLIST(state, bannerList) {
    state.bannerList = bannerList;
  },
  GETFLOORLIST(state, floorList) {
    state.floorList = floorList;
  },
};
const actions = {
  async categoryList({ commit }) {
    // 通过api里的函数接口调用，向服务器发请求，获取服务器的数据
    let result = await reqCategoryList();
    // console.log(result);
    if (result.code === 200) {
      commit("CATEGORYLIST", result.data);
    }
  },
  async bannerList({ commit }) {
    // 通过api里的函数接口调用，向服务器发请求，获取服务器的数据
    let result = await reqGetBannerList();
    // console.log(result);
    if (result.code === 200) {
      commit("GETBANNERLIST", result.data);
    }
  },
  async floorList({ commit }) {
    // 通过api里的函数接口调用，向服务器发请求，获取服务器的数据
    let result = await reqGetFloorList();
    // console.log(result);
    if (result.code === 200) {
      commit("GETFLOORLIST", result.data);
    }
  },
};
const getters = {};
export default {
  state,
  mutations,
  actions,
  getters,
};
