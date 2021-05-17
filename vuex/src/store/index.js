import Vue from 'vue'
import Vuex from 'vuex'
import products from './modules/productes'
import cart from './modules/cart'

Vue.use(Vuex)

export default new Vuex.Store({
  strict:process.env.NODE_ENV !== 'production',
  state: {
      count:0,
      msg:'hello world'
  },
  getters:{
      reverseMsg(state){
          return state.msg.split('').reverse().join('')
      }
  },
  mutations: {
      addCount(state,payload){
          state.count += payload
      }
  },
  actions: {
      fetchCount(context,payload){
          setTimeout(() => {
            context.commit('addCount',payload)
          },2000)
      }
  },
  modules: {
      products,
      cart
  }
})
