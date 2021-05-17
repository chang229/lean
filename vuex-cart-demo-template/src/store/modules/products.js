
/* eslint-disable */
import axios from 'axios'

const state = {
  products: []
}
const getters = {}
const mutations = {
  changeProducts (state,payload){
    state.products = payload
  }
}
const actions = {
  fetchProduct({commit}){
    axios({
      method:'GET',
      url:'http://127.0.0.1:3000/products'
    }).then((res) => {
        commit('changeProducts',res.data)
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
