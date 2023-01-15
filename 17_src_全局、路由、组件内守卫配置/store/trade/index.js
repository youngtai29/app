import { reqOrderInfo, reqUserAddress } from "@/api";

const state = {
  userAddress: [],
  orderInfo: {},
};
const mutations = {
  GETUSERADDRESS(state, address) {
    state.userAddress = address;
  },
  GETORDERINFO(state, orderInfo) {
    state.orderInfo = orderInfo;
  },
};
const actions = {
  async getUserAddress({ commit }) {
    let result = await reqUserAddress();

    if (result.code === 200) {
      commit("GETUSERADDRESS", result.data);
      return "ok";
    } else {
      return Promise.reject(new Error("failedgetUserAddress"));
    }
  },
  async getOrderInfo({ commit }) {
    let result = await reqOrderInfo();

    if (result.code === 200) {
      commit("GETORDERINFO", result.data);
      return "ok";
    } else {
      return Promise.reject(new Error("failedgetOrderInfo"));
    }
  },
};
// getters可以把将来在组件中的数据简化以下【将来获取数据就更方便】
const getters = {};
export default {
  state,
  mutations,
  actions,
  getters,
};
