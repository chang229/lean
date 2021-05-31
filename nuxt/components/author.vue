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
	</div>
</template>
<script>
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
	},
};
</script>
