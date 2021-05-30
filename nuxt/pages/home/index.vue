<template>
    <div class="home-page">
        <!-- banner -->
        <div class="banner">
            <div class="container">
                <h1 class="logo-font">conduit</h1>
                <p>A place to share your knowledge.</p>
            </div>
        </div>
        <!-- container -->
        <div class="container page">
            <div class="row">
                <div class="col-md-9">
                    <div class="feed-toggle">
                        <ul class="nav nav-pills outline-active">
                            <li class="nav-item" v-if="user">
                                <nuxt-link class="nav-link" :class="{active:tab === 'your_feed'}" :to="{name:'home',query:{tab:'your_feed'}}" exact>Your Feed</nuxt-link>
                            </li>
                            <li class="nav-item">
                                <nuxt-link class="nav-link" :class="{active:tab === 'global_feed'}" :to="{name:'home',query:{tab:'global_feed'}}" exact>Global Feed</nuxt-link>
                            </li>
                            <li class="nav-item" v-if="tag">
                                <nuxt-link class="nav-link" :class="{active:tab === 'tab'}" :to="{name:'home',query:{tab:'tab'}}" exact>#{{tag}}</nuxt-link>
                            </li>
                        </ul>
                    </div>
                    <div class="article-preview" v-for="item in articles" :key="item.slug">
                        <div class="article-meta">
                            <nuxt-link :to="{name:'profile',params:{username:item.author.username}}">
                                <img :src="item.author.image" />
                            </nuxt-link>
                            <div class="info">
                                <nuxt-link :to="{name:'profile',params:{username:item.author.username}}" class="author">{{item.author.username}}</nuxt-link>
                                <span class="date">{{item.createdAt | dateFormat('MMM DD,YYYY')}}</span>
                            </div>
                            <button 
                                class="btn btn-outline-primary btn-sm pull-xs-right" 
                                :class="{
                                    active:item.favorited
                                }"
                                @click="favorite(item)"
                                :disabled="item.favoriteAbled"
                            >
                                <i class="ion-heart"></i> {{item.favoritesCount}}
                            </button>
                        </div>
                        <nuxt-link :to="{name:'article',params:{slug:item.slug}}" class="preview-link">
                            <h1>{{item.title}}</h1>
                            <p>{{item.description}}</p>
                            <span>Read more...</span>
                        </nuxt-link>
                    </div>
                    <nav>
                        <ul class="pagination">
                            <li class="page-item" :class="{active:item === page}" v-for="item in totalPage" :key="item">
                                <nuxt-link :to="{name:'home',query:{page:item,tag:$route.query.tag}}" class="page-link">{{ item }}</nuxt-link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div class="col-md-3">
                    <div class="sidebar">
                    <p>Popular Tags</p>
                    <div class="tag-list">
                        <nuxt-link :to="{name:'home',query:{tag:item,tab:'tab'}}" class="tag-pill tag-default" v-for="item in tags" :key="item">{{item}}</nuxt-link>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { getArticles, getTags, getFeedArticle, addFavorite, delFavorite } from '@/utils/api.js';
import { mapState } from 'vuex';
export default {
    name:'home',
    async asyncData({query,store}){
        const page = Number.parseInt(query.page || 1);
        const limit = 20;
        const tab = query.tab || 'global_feed';
        let fetchArticles = store.state.user && tab === 'your_feed' ? getFeedArticle : getArticles;
        let res = await fetchArticles({
            limit,
            offset:(page - 1) * limit,
            tag:query.tag
        });
        let tags = await getTags();
        // let res = await Promise.all([fetchArticles({
        //     limit,
        //     offset:(page - 1) * limit,
        //     tag:query.tag
        // }),getTags()])
        res.articles.forEach((v) => {
            v.favoriteAbled = false;
        })
        return {...res, limit, page, ...tags, tag:query.tag, tab};
    },
    watchQuery: ['page','tag','tab'],
    methods:{
        favorite(item){
            item.favoriteAbled = true;
            if(item.favorited){
                delFavorite(item.slug).then(() => {
                    item.favorited = false;
                    item.favoritesCount -= 1;
                    item.favoriteAbled = false;
                })
            }else{
                addFavorite(item.slug).then(() => {
                    item.favorited = true;
                    item.favoritesCount += 1;
                    item.favoriteAbled = false;
                })
            }
        }
    },
    computed:{
        ...mapState(['user']),
        totalPage(){
            return Math.ceil(this.articlesCount / this.limit)
        }
    }
}
</script>