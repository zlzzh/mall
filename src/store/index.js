import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartList: []
  },
  mutations: {
    addToCart(state,payload) {
      // 1.查看是否添加过
     let oldProduct = null;
      for (const item of state.cartList) {
        if (item.iid === payload.iid) {
          oldProduct = item;
        }
      }
      //2.如果已经存在  count +1  不存在  就push进去
      if (oldProduct) {
        oldProduct.count += 1;
      } else {
        payload.count = 1;
        state.cartList.push(payload)
      }
      }
  },
  actions: {
  },
  modules: {
  }
})
