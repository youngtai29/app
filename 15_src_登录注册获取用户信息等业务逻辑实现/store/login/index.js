import { reqLogin, reqUserInfo, reqUserLogout } from "@/api";
import {
  setToken,
  getToken,
  // getUserInfo,
  // setUserInfo,
  removeToken,
} from "@/store/user/user";
const state = {
  token: getToken(),
  userInfo: {},
};
const mutations = {
  USERLOGIN(state, token) {
    state.token = token;
  },
  USERINFO(state, userInfo) {
    state.userInfo = userInfo;
  },
  // 退出登录清除本地数据
  CLEAR() {
    state.userInfo = {};
    state.token = "";
    removeToken();
  },
};
const actions = {
  async userLogin({ commit }, data) {
    let result = await reqLogin(data);
    if (result.code === 200) {
      commit("USERLOGIN", result.data.token);
      // 点击登录（一次行为）之后获取到token，存到浏览器存储中
      setToken(result.data.token);

      return "ok";
    } else {
      return Promise.reject(new Error("failedUserLogin"));
    }
  },
  async getUserInfo({ commit }) {
    let result = await reqUserInfo();
    console.log(result);

    if (result.code === 200) {
      commit("USERINFO", result.data);

      return "ok";
    } else {
      return Promise.reject(new Error("failedUserInfo"));
    }
  },
  async userLogout({ commit }) {
    let result = await reqUserLogout();

    if (result.code === 200) {
      commit("CLEAR");
      return "ok";
    } else {
      return Promise.reject(new Error("failed1Logout"));
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
