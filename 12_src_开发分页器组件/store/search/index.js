import { reqGetSearchInfo } from "@/api";
const state = {
  searchInfo: {},
};
const mutations = {
  GETSEARCHLIST(state, searchInfo) {
    state.searchInfo = searchInfo;
  },
};
const actions = {
  async getSearchList({ commit }, params = {}) {
    // 通过api里的函数接口调用，向服务器发请求，获取服务器的数据
    let result = await reqGetSearchInfo(params);
    // console.log(result);
    if (result.code === 200) {
      commit("GETSEARCHLIST", result.data);
    }
  },
};
// getters可以把将来在组件中的数据简化以下【将来获取数据就更方便】
const getters = {
  goodsList(state) {
    // 问题？请求数据没回来时，计算属性是undefined
    // 使用 ?? 时，只有One为 null 或者 undefined 时才会返回 two;
    return state.searchInfo.goodsList ?? [];
    // console.log(state);//state是当前仓库（search）的state
  },
  trademarkList(state) {
    return state.searchInfo.trademarkList ?? [];
  },
  attrsList(state) {
    return state.searchInfo.attrsList ?? [];
  },
};
export default {
  state,
  mutations,
  actions,
  getters,
};
