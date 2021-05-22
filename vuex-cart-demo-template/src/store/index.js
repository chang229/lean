import Vue from 'vue'
import Vuex from 'vuex'
import products from './modules/products'
import cart from './modules/cart'

Vue.use(Vuex)

const myPlugin = store => {
    store.subscribe((mutation,state) => {
        if(mutation.type.startsWith('cart/')){
            localStorage.setItem('cart',JSON.stringify(state.cart.cartList))
        }
    })
}

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    products,
    cart
  },
  plugins:[myPlugin]
})
