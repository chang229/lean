<template>
	<div class="article-meta">
		<nuxt-link
			:to="{
				name: 'profile',
				params: { username: articleInfo.author.username },
			}"
		>
			<img :src="articleInfo.author.image"
		/></nuxt-link>
		<div class="info">
			<nuxt-link
				:to="{
					name: 'profile',
					params: { username: articleInfo.author.username },
				}"
				class="author"
			>
				{{ articleInfo.author.username }}
			</nuxt-link>
			<span class="date">{{
				articleInfo.createdAt | dateFormat('MMM DD,YYYY')
			}}</span>
		</div>
        <template v-if="articleInfo.author.username === user.username">
            <nuxt-link class="btn btn-outline-secondary btn-sm"  :to="{name:'editor',params:{slug:articleInfo.slug}}">
                <i class="ion-edit"></i> Edit Article
            </nuxt-link>
            <button class="btn btn-outline-danger btn-sm" @click="deleteArticle">
                <i class="ion-trash-a"></i> Delete Article
            </button>
        </template>
        <template v-else>
            <button
                class="btn btn-sm btn-outline-secondary"
                :class="{ active: articleInfo.author.following }"
                @click="follow"
            >
                <i class="ion-plus-round"></i>&nbsp;{{
                    articleInfo.author.following ? 'Unfollow' : 'Follow'
                }}
                {{ articleInfo.author.username }}
                <!-- <span class="counter" v-if="articleInfo.author.following"
                    >(10)</span
                > -->
            </button>
		    &nbsp;&nbsp;
            <button
                class="btn btn-sm btn-outline-primary"
                :class="{ active: articleInfo.favorited }"
                @click="favorite"
            >
                <i class="ion-heart"></i>&nbsp;Favorite Post
                <span class="counter">({{ articleInfo.favoritesCount }})</span>
            </button>
        </template>
	</div>
</template>
<script>
import {delArticle} from '@/utils/api.js';
export default {
	name: 'author',
	data() {
		return {
			pendding: false,
		};
	},
	props: {
		articleInfo: {
			type: Object,
			default: () => {},
		},
		user: {
			type: Object,
			default: () => {},
		},
	},
	methods: {
		// 点赞
		favorite() {
			if (this.articleInfo.favoritedabled) return;
			this.isLogin();
			this.$emit('favoriteHandel');
		},
		// Follow
		follow() {
			if (this.articleInfo.followabled) return;
			this.isLogin();
			this.$emit('followHandel');
		},
		// 判断是否登录
		isLogin() {
			let { user } = this;
			if (!user || !user.token) {
				this.$router.push('/login');
				return;
			}
		},
        // 删除文章
        deleteArticle(){
            if(this.pendding) return;
            this.pendding = true;
            delArticle(this.articleInfo.slug).then(() => {
                this.pendding = false;
                this.$router.replace('/')
            }).catch(() => {
                this.pendding = false;
            })
        }
	},
};
</script>
