import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartList: []
  },
  mutations: {
      //1.数量+1
      addProductCount(state,payLoad) {
        payLoad.count += 1
      },
      //2.种类++
      addProductKind(state,payLoad) {
        state.cartList.push(payLoad)
      }
  },
  actions: {
    addToCart(context,payload) {
      return new Promise((resolve, reject) => {
        // 1.查看是否添加过
        let oldProduct = null;
        for (const item of context.state.cartList) {
          if (item.iid === payload.iid) {
            oldProduct = item;
          }
        }
        //2.如果已经存在  count +1  不存在  就push进去
        if (oldProduct) {
          //oldProduct.count += 1;
          context.commit('addProductCount',oldProduct)
          resolve('商品数量+1')
        } else {
          payload.count = 1;
          // context.state.cartList.push(payload)
          context.commit('addProductKind',payload)
          resolve('添加商品成功')
        }
      })
    }
  },
  modules: {
  }
})
