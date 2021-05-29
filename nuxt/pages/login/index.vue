<template>
    <div class="auth-page">
        <div class="container page">
            <div class="row">
                <div class="col-md-6 offset-md-3 col-xs-12">
                    <h1 class="text-xs-center">{{login ? 'Sign in' : 'Sign up'}}</h1>
                    <p class="text-xs-center">
                        <nuxt-link to="/login" v-if="!login">Have an account?</nuxt-link>
                        <nuxt-link to=/register v-if="login">Get an account?</nuxt-link>
                    </p>
                    <ul class="error-messages" v-if="errMsg">
                        <li>{{ errMsg }}</li>
                    </ul>
                    <form @submit.prevent="submit">
                        <fieldset class="form-group" v-if="!login">
                            <input class="form-control form-control-lg" type="text" placeholder="Your Name" v-model="user.username">
                        </fieldset>
                        <fieldset class="form-group">
                            <input class="form-control form-control-lg" type="text" placeholder="Email" v-model="user.email">
                        </fieldset>
                        <fieldset class="form-group">
                            <input class="form-control form-control-lg" type="password" placeholder="Password" v-model="user.password">
                        </fieldset>
                        <button class="btn btn-lg btn-primary pull-xs-right">{{login ? 'Sign in' : 'Sign up'}}</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {signIn,register} from '@/utils/api.js';
const Cookie = process.client ? require('js-cookie') : undefined;

export default {
    name:'loginReagist',
    data(){
        return {
            user:{
                username:'',
                email:'',
                password:''
            },
            errMsg:'',
        }
    },
    methods:{
        submit(){
            let {username,email,password} = this.user;
            if(this.$route.name !== 'login'){
                if(!username){
                    this.errMsg = 'That username is already taken';
                    return;
                }
            }
            if(!email){
                this.errMsg = 'That email is already taken';
                return;
            }
            if(!password){
                this.errMsg = 'That password is already taken';
                return;
            }
            let reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
            if(!reg.test(email)){
                this.errMsg = 'The mailbox format is incorrect';
                return;
            }
            if(this.$route.name === 'login'){ 
                signIn({user:this.user}).then((res) => {
                    this.$store.commit('setUser',res.user);
                    Cookie.set('user', res.user);
                    this.$router.replace('/');
                }).catch((e) => {
                    this.errMsg = e;
                })
            }else{
                register({user:this.user}).then((res) => {
                    this.$store.commit('setUser',res.user);
                    Cookie.set('user', res.user);
                    this.$router.replace('/');
                }).catch((e) => {
                    this.errMsg = e;
                })
            }
        }
    },
    computed:{
        login:function(){
            return this.$route.name === 'login'
        }
    }
}
</script>