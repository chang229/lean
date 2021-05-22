let _vue = null;

class Store{
    constructor(options){
        const {
            state = {},
            getters = {},
            mutations = {},
            actions = {}
        } = options;
        this.state = _vue.observable(state);
        this.getters = Object.create(null);
        Object.keys(getters).forEach(key => {
            Object.defineProperty(this.getters,key,{
                get:() => getters[key](state)
            })
        })
        this.mutations = mutations;
        this.actions = actions;
    }

    commit(type,payload){
        this.mutations[type](this.state,payload)
    }

    dispatch(type,payload){
        this.actions[type](this,payload)
    }
}

function install(vue){
    _vue = vue;
    _vue.mixin({
        beforeCreate() {
            if(this.$options.store){
                _vue.prototype.$store = this.$options.store
            }
        },
    })
}

export default {
    Store,
    install
}