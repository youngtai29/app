import { reqLogin } from "@/api";
const state = {
  token: "",
};
const mutations = {
  USERLOGIN(state, token) {
    state.token = token;
  },
};
const actions = {
  async userLogin({ commit }, data) {
    let result = await reqLogin(data);
    if (result.code === 200) {
      commit("USERLOGIN", result.data.token);

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
