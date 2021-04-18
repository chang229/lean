let _Vue = null;

class VueRouter {
    constructor(options){
        this.options = options;
        this.routerMap = {};
        this.data = _Vue.observable({
            current:'/'
        })
    }

    //静态方法install接收两个参数:vue的构造函数和options
    static install(Vue){
        // 判断当前插件是否已安装
        // 在静态方法install对象上添加一个installed属性，用于判断VueRouter是否被安装了
        if(VueRouter.install.installed){
            return;
        }
        VueRouter.install.installed = true
        // 把vue构造函数记录到全局变量
        _Vue = Vue;
        // 把创建vue实例的时候传入的router对象注入到vue实例上
        // 使用混入mixin
        _Vue.mixin({
            beforeCreate() {
                if(this.$options.router){
                    _Vue.prototype.$router = this.$options.router;
                    this.$options.router.init();
                }
            },
        })
    }

    init(){
        this.createRouterMap();
        this.initComponents(_Vue);
        this.initEvent();
    }


    createRouterMap(){
        // 遍历所有的路由规则，把路由规则解析成键值对的形式存入routerMap
        this.options.routes.forEach((router) => {
            this.routerMap[router.path] = router.component;
        })
    }

    initComponents(Vue){
        const _this = this;
        Vue.component('router-link',{
            props:{
                to:String
            },
            render(h){
                return h('a',{
                    attrs:{
                        href:this.to
                    },
                    on:{
                        click:this.methods.handleClick
                    }
                },[this.$slots.default])
            },
            methods:{
                handleClick(e){
                    this.$router.data.current = this.to;
                    e.preventDefault();
                }
            }
            // template:'<a :href="to"><slot></slot></a>'
        })

        Vue.component('router-view',{
            render(h){
                let component = _this.routerMap[_this.data.current];
                return h(component)
            }
        })
    }

    initEvent(){
        window.addEventListener('popstate',() => {
            this.data.current = window.location.pathname;
        })
    }
}

export default VueRouter;