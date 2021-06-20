import Vue from 'vue';
import vueRouter from 'vue-router';

Vue.use(vueRouter)

export function createRouter(){
    return new vueRouter({
        mode:'history',
        routes:[
            {
                path:'/',
                name:'home',
                component:() => import ('@/pages/home')
            },
            {
                path:'/about',
                name:'about',
                component:() => import ('@/pages/about')
            },
            {
                path:'*',
                name:'404',
                component:() => import ('@/pages/404')
            }
        ]
    })
}