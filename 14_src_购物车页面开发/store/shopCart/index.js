import { reqCheckShopCart, reqDeleteShopCar, reqShopCartList } from "@/api";
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
    let result = await reqCheckShopCart(skuId, isChecked);

    if (result.code === 200) {
      return "ok";
    } else {
      return Promise.reject("failed");
    }
  },
  async changeAllCheck({ dispatch }, { cartList, isChecked }) {
    // 通过api里的函数接口调用，向服务器发请求，获取服务器的数据
    isChecked = isChecked === false ? 0 : 1;
    let promiseAll = [];
    cartList.forEach((item) => {
      // 用上面的action，包含了对promise结果的处理，如果不处理就都算成功
      let promise = dispatch("checkShopCart", { skuId: item.skuId, isChecked });
      // ATN这里不要用await，会使被包裹的函数异步执行，外部的代码（Promise.all(promiseAll);）同步执行（捞不到异步执行后的得到的数据）
      // let promise = reqCheckShopCart(item.skuId, isChecked);

      promiseAll.push(promise);
    });
    console.log(Promise.all(promiseAll));

    // Promise.all()参数是一个数组，有rejected的就是失败的promise，全成功就是成功的promise
    return Promise.all(promiseAll);
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
