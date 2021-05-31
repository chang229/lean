<template>
	<div class="article-page">
		<div class="banner">
			<div class="container">
				<h1>{{ article.title }}</h1>
				<author
					:article-info="article"
					:user="user"
					@favoriteHandel="favoriteHandel"
					@followHandel="followHandel"
				></author>
			</div>
		</div>
		<div class="container page">
			<div class="row article-content">
				<div class="col-md-12" v-html="article.body"></div>
				<ul class="tag-list">
					<!-- ngRepeat: tag in ::$ctrl.article.tagList -->
					<li
						class="tag-default tag-pill tag-outline"
						v-for="item in article.tagList"
						:key="item"
					>
						{{ item }}
					</li>
				</ul>
			</div>
			<hr />
			<div class="article-actions">
				<author
					:article-info="article"
					:user="user"
					@favoriteHandel="favoriteHandel"
					@followHandel="followHandel"
				></author>
			</div>
			<div class="row">
				<div class="col-xs-12 col-md-8 offset-md-2">
					<form class="card comment-form">
						<div class="card-block">
							<textarea
								class="form-control"
								placeholder="Write a comment..."
								rows="3"
								v-model="commentText"
							></textarea>
						</div>
						<div class="card-footer">
							<img
								:src="user.image"
								class="comment-author-img"
							/>
							<button
								class="btn btn-sm btn-primary"
								:disabled="!commentText"
								@click.prevent="comment"
							>
								Post Comment
							</button>
						</div>
					</form>
					<div class="card" v-for="item in comments" :key="item.id">
						<div class="card-block">
							<p class="card-text">{{ item.body }}</p>
						</div>
						<div class="card-footer">
							<nuxt-link
								:to="{
									name: 'profile',
									params: {
										username: item.author.username,
									},
								}"
								class="comment-author"
							>
								<img
									:src="item.author.image"
									class="comment-author-img"
								/>
							</nuxt-link>
							&nbsp;
							<nuxt-link
								:to="{
									name: 'profile',
									params: {
										username: item.author.username,
									},
								}"
								class="comment-author"
							>
								{{ item.author.username }}
							</nuxt-link>
							<span class="date-posted">{{
								item.createdAt | dateFormat('MMM DD,YYYY')
							}}</span>
							<span class="mod-options">
								<!-- <i class="ion-edit"></i> -->
								<i
									class="ion-trash-a"
									@click="deleteComment(item.id)"
									v-if="
										user &&
											item.author.username ===
												user.username
									"
								></i>
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import {
	getArticle,
	getComments,
	addFavorite,
	delFavorite,
	addFollow,
	delFollow,
	makeComment,
	delComment,
} from '@/utils/api.js';
import author from '@/components/author.vue';
import markdownIt from 'markdown-it';
export default {
	name: 'article',
	async asyncData({ params, store }) {
		let res = await getArticle(params.slug);
		let md = new markdownIt();
		res.article.body = md.render(res.article.body);
		let comments = await getComments(params.slug);
		res.article.favoritedabled = false;
		res.article.followabled = false;
		return { ...res, ...comments, user: store.state.user };
	},
	data() {
		return {
			commentText: '', //评论内容
		};
	},
	methods: {
		// 处理点赞事件
		favoriteHandel() {
			let { article } = this;
			article.favoritedabled = true;
			if (article.favorited) {
				delFavorite(article.slug).then(() => {
					article.favorited = false;
					article.favoritesCount -= 1;
					article.favoritedabled = false;
				});
			} else {
				addFavorite(article.slug).then(() => {
					article.favorited = true;
					article.favoritesCount += 1;
					article.favoritedabled = false;
				});
			}
		},
		//follow事件
		followHandel() {
			let { article } = this;
			article.followabled = true;
			if (article.author.following) {
				delFollow(article.author.username).then(() => {
					article.author.following = false;
					article.followabled = false;
				});
			} else {
				addFollow(article.author.username).then(() => {
					article.author.following = true;
					article.followabled = false;
				});
			}
		},
		// 发表评论
		comment() {
			let { article, commentText } = this;
			makeComment({
				article: article.slug,
				data: {
					comment: {
						body: commentText,
					},
				},
			}).then((res) => {
				this.comments.unshift(res.comment);
			});
		},
		// 删除评论
		deleteComment(id) {
			let { article } = this;
			delComment({
				slug: article.slug,
				id,
			}).then(() => {
				this.comments.forEach((v, i) => {
					if (v.id === id) {
						this.comments.splice(i, 1);
					}
				});
			});
		},
	},
    head() {
      return {
        title: `${this.article.title} - realworld`,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: this.article.description
          }
        ]
      }
    },
	components: {
		author,
	},
};
</script>
