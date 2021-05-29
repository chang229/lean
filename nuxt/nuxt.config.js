module.exports = {
    router: {
        linkActiveClass: 'active',
        extendRoutes(routes, resolve) {
            // 清除默认路由
            routes.splice(0);
            routes.push(...[{
                name: 'layout',
                path: '/',
                component: resolve(__dirname, 'pages/layout/index.vue'),
                children:[
                    {
                        name:'layoutIndex',
                        path:'',
                        component:resolve(__dirname,'pages/home/index.vue')
                    },
                    {
                        name:'login',
                        path:'/login',
                        component:resolve(__dirname,'pages/login/index.vue')
                    },
                    {
                        name:'register',
                        path:'/register',
                        component:resolve(__dirname,'pages/login/index.vue')
                    },
                    {
                        name:'profile',
                        path:'/profile/:username',
                        component:resolve(__dirname,'pages/profile/index.vue')
                    },
                    {
                        name:'settings',
                        path:'/settings',
                        component:resolve(__dirname,'pages/settings/index.vue')
                    },
                    {
                        name:'editor',
                        path:'/editor',
                        component:resolve(__dirname,'pages/editor/index.vue')
                    },
                    {
                        name:'article',
                        path:'/article/:slug',
                        component:resolve(__dirname,'pages/article/index.vue')
                    }
                ]
            }])
        }
    }
}