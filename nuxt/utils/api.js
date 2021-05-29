import Axios from '@/utils/http.js';

//登录
export const signIn = (params) => Axios({
    url:'/api/users/login',
    data:params
})

// 注册
export const register = (params) => Axios({
    url:'/api/users',
    data:params
})