<template>
	<div class="profile-page">
		<div class="user-info">
			<div class="container">
				<div class="row">
					<div class="col-xs-12 col-md-10 offset-md-1">
						<img :src="profile.image" class="user-img" />
						<h4>{{ profile.username }}</h4>
						<p>{{ profile.bio }}</p>
						<button
							v-if="profile.username !== user.username"
							class="btn btn-sm btn-outline-secondary action-btn"
                            :disabled="followabled"
                            @click="followHandel"
						>
							<i class="ion-plus-round"></i>&nbsp;{{profile.following ? 'Unfollow' : 'Follow'}} {{profile.username}}
						</button>
						<nuxt-link
							v-if="profile.username === user.username"
							class="btn btn-sm btn-outline-secondary action-btn"
							to="/settings"
						>
							<i class="ion-gear-a"></i> Edit Profile Settings
						</nuxt-link>
					</div>
				</div>
			</div>
		</div>
		<div class="container">
			<div class="row">
				<div class="col-xs-12 col-md-10 offset-md-1">
					<div class="articles-toggle">
						<ul class="nav nav-pills outline-active">
							<li class="nav-item">
								<div class="nav-link" :class="{active:tab ==='my'}" style="cursor:pointer" @click="fetchArticles('my')"
									>My Articles</div
								>
							</li>
							<li class="nav-item">
								<div class="nav-link" :class="{active:tab ==='favorited'}" style="cursor:pointer" @click="fetchArticles('favorited')"
									>Favorited Articles</div
								>
							</li>
						</ul>
					</div>
					<div
						class="article-preview"
						v-for="item in articles"
						:key="item.slug"
					>
						<div class="article-meta">
							<nuxt-link :to="{name:'profile',params:{username:item.author.username}}"
								><img :src="item.author.image"
							/></nuxt-link>
							<div class="info">
								<nuxt-link :to="{name:'profile',params:{username:item.author.username}}" class="author">{{item.author.username}}</nuxt-link>
								<span class="date">{{item.createdAt | dateFormat('MMM DD,YYYY')}}</span>
							</div>
							<button
								class="btn btn-outline-primary btn-sm pull-xs-right"
                                :class="{active:item.favorited}" 
                                :disabled="item.favoriteAbled"
                                @click="favorite(item)"
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
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { getUserInfo, getArticles,delFavorite,addFavorite,delFollow,addFollow } from '@/utils/api.js';
import { mapState } from 'vuex';
export default {
	middleware: 'authenticated',
	name: 'profile',
	async asyncData({ params }) {
		let res = await getUserInfo(params.username);
		return { ...res };
	},
	data() {
		return {
			articles: [],
            tab:'my',
            pending:false,
            followabled:false,
		};
	},
	mounted() {
		this.fetchArticles(this.tab);
	},
	methods: {
		// 获取文章列表
		fetchArticles(type) {
            if(this.pending) return;
            this.pending = true;
            this.articles = [];
            this.tab = type;
            let params = {
                limit: 5,
				offset: 0,
            }
            if(type === 'my'){
				params.author = this.profile.username;
            }
            if(type === 'favorited'){
                params.favorited = this.profile.username;
            }
			getArticles(params).then((res) => {
                res.articles.forEach((v) => {
                    v.favoriteAbled = false;
                })
                this.articles = res.articles;
                this.pending = false;
			}).catch(() => {
                this.pending = false;
            })
		},
        // 点赞
        favorite(item) {
			item.favoriteAbled = true;
			if (item.favorited) {
				delFavorite(item.slug).then(() => {
					item.favorited = false;
					item.favoritesCount -= 1;
					item.favoriteAbled = false;
				});
			} else {
				addFavorite(item.slug).then(() => {
					item.favorited = true;
					item.favoritesCount += 1;
					item.favoriteAbled = false;
				});
			}
		},
        //follow事件
		followHandel() {
			let { profile } = this;
			this.followabled = true;
			if (profile.following) {
				delFollow(profile.username).then(() => {
					profile.following = false;
					this.followabled = false;
				});
			} else {
				addFollow(profile.username).then(() => {
					profile.following = true;
					this.followabled = false;
				});
			}
		},
	},
	computed: {
		...mapState(['user']),
	},
};
</script>
