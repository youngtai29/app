import { reqVerifyCode, reqRegister } from "@/api";
const state = {
  verifyCode: "",
};
const mutations = {
  GETVERIFYCODE(state, verifyCode) {
    state.verifyCode = verifyCode;
  },
};
const actions = {
  async getVerifyCode({ commit }, phoneNum) {
    let result = await reqVerifyCode(phoneNum);
    if (result.code === 200) {
      commit("GETVERIFYCODE", result.data);
    }
  },
  async register({ commit }, params) {
    console.log(params);

    let result = await reqRegister(params);
    if (result.code === 200) {
      console.log(result);

      return "ok";
    } else {
      return Promise.reject("failed");
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
