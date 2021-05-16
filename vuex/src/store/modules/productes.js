const state = {
    products:[
        {id:1,name:'iphone 10'},
        {id:2,name:'iphone 11'}
    ]
};

const getters = {};

const mutations = {
    changeProducts(state,payload){
        state.products = payload
    }
}

const actions = {}

export default{
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}