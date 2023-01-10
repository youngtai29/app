import { reqGetgoodsInfo } from "@/api";
const state = {
  goodsInfo: {},
};
const mutations = {
  GETGOODSINFO(state, goodsInfo) {
    state.goodsInfo = goodsInfo;
  },
};
const actions = {
  async getGoodsInfo({ commit }, id) {
    // 通过api里的函数接口调用，向服务器发请求，获取服务器的数据
    let result = await reqGetgoodsInfo(id);
    // console.log(result);
    if (result.code === 200) {
      commit("GETGOODSINFO", result.data);
    }
  },
};
// getters可以把将来在组件中的数据简化以下【将来获取数据就更方便】
const getters = {
  categoryView() {
    // 解决数据没回来之前的报错，properties of undefined
    return state.goodsInfo.categoryView || {};
  },
  skuInfo() {
    // 解决数据没回来之前的报错，properties of undefined
    return state.goodsInfo.skuInfo || {};
  },
};
export default {
  state,
  mutations,
  actions,
  getters,
};
