
/* eslint-disable */
const state = {
  cartList: []
}
const getters = {
    totalCount(state){
        return state.cartList.reduce((sum,prod) => sum + prod.count,0)
    },
    totalPrice(state){
        return state.cartList.reduce((sum,prod) => sum + prod.totalPrice,0)
    }
}
const mutations = {
    addCart(state,payload){
        let product = state.cartList.find((v) => v.id === payload.id);
        if(product){
            product.count ++;
            product.checked = true;
            product.totalPrice = product.price * product.count
        }else{
            state.cartList.push({
                ...payload,
                count:1,
                checked:true,
                totalPrice: payload.price
            })
        }
    },
    delProd(state,id){
        let index = state.cartList.findIndex((item) => item.id === id);
        index !== -1 && state.cartList.splice(index,1)
    },
    checkAllProd(state,checked){
        state.cartList.forEach((item) => item.checked = checked)
    },
    checkItem(state,{checked,id}){
        let prod = state.cartList.find((item) => item.id ===id)
        if(prod){
            prod.checked = checked
        }
    }
}
const actions = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
