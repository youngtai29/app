import { reqCheckShopCar, reqDeleteShopCar, reqShopCartList } from "@/api";
const state = {
  shopCartList: [],
};
const mutations = {
  GETSHOPCARTLIST(state, shopCartList) {
    state.shopCartList = shopCartList;
  },
};
const actions = {
  async getShopCartList({ commit }) {
    // 通过api里的函数接口调用，向服务器发请求，获取服务器的数据
    let result = await reqShopCartList();
    if (result.code === 200) {
      commit("GETSHOPCARTLIST", result.data);
    }
  },
  async deleteShopCart({ commit }, skuId) {
    // 通过api里的函数接口调用，向服务器发请求，获取服务器的数据
    let result = await reqDeleteShopCar(skuId);
    if (result.code === 200) {
      return "ok";
    } else {
      return Promise.reject("failed");
    }
  },
  async checkShopCart({ commit }, { skuId, isChecked }) {
    // 通过api里的函数接口调用，向服务器发请求，获取服务器的数据
    let result = await reqCheckShopCar(skuId, isChecked);

    if (result.code === 200) {
      return "ok";
    } else {
      return Promise.reject("failed");
    }
  },
};
// getters可以把将来在组件中的数据简化以下【将来获取数据就更方便】
const getters = {
  cartList(state) {
    return state.shopCartList[0] || {};
  },
};
export default {
  state,
  mutations,
  actions,
  getters,
};
