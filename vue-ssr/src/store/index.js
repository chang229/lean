import Vue from 'vue';
import vuex from 'vuex';
import axios from 'axios';

Vue.use(vues);

export function createStore(){
    return new vuex.Store({
        state:{
            posts:[]
        },
        mutations:{
            setPosts(state,data){
                state.posts = data;
            }
        },
        actions:{
            async getPosts({commit}){
                let { data } = await axios.get('https://cnodejs.org/api/v1/topics');
                commit('setPosts',data.data)
            }
        }
    })
}