import { reqGetgoodsInfo, reqAddOrUpdateShopCart } from "@/api";
import { getUUID } from "@/utils/uuid_token";
const state = {
  goodsInfo: {},
  // state仓库创建时（vm生成的时候执行）为浏览器生成一个uuid作为用户标识
  uuid_token: getUUID(),
};
const mutations = {
  GETGOODSINFO(state, goodsInfo) {
    state.goodsInfo = goodsInfo;
  },
  // 加入购物车服务器不返回数据（需要返回的数据在状态码（是否200）即可体现，因此不需要mutation操作对应state数据）
  // ADDORUPDATESHOPCART(state, shopCartInfo) {},
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
  async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
    // 通过api里的函数接口调用，向服务器发请求，获取服务器的数据
    let result = await reqAddOrUpdateShopCart(skuId, skuNum);
    // console.log(skuId, skuNum);

    // console.log(result);

    if (result.code === 200) {
      // commit("ADDORUPDATESHOPCART", result.data);
      return "ok";
    } else {
      return Promise.reject(new Error("failed"));
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
