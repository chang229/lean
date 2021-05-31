import { Axios } from '@/plugins/http.js';

//登录
export const signIn = (params) =>
	Axios({
		url: '/api/users/login',
		data: params,
	});

// 注册
export const register = (params) =>
	Axios({
		url: '/api/users',
		data: params,
	});

// 获取文章列表
export const getArticles = (params) =>
	Axios({
		method: 'get',
		url: '/api/articles',
		params,
	});

// 获取标签列表
export const getTags = (params) =>
	Axios({
		method: 'get',
		url: '/api/tags',
		params,
	});

// 获取个人关注的文章列表
export const getFeedArticle = (params) =>
	Axios({
		method: 'get',
		url: '/api/articles/feed',
		params,
	});

// 点赞
export const addFavorite = (params) =>
	Axios({
		method: 'post',
		url: `/api/articles/${params}/favorite`,
	});

// 删除点赞
export const delFavorite = (params) =>
	Axios({
		method: 'delete',
		url: `/api/articles/${params}/favorite`,
	});

// 获取文章详情
export const getArticle = (params) =>
	Axios({
		method: 'get',
		url: `/api/articles/${params}`,
	});

//获取文章评论列表
export const getComments = (params) =>
	Axios({
		method: 'get',
		url: `/api/articles/${params}/comments`,
	});

//发表评论
export const makeComment = (params) =>
	Axios({
		method: 'post',
		url: `/api/articles/${params.article}/comments`,
		data: params.data,
	});

// 删除评论
export const delComment = (params) =>
	Axios({
		method: 'delete',
		url: `/api/articles/${params.slug}/comments/${params.id}`,
	});

// addFollow
export const addFollow = (params) =>
	Axios({
		url: `api/profiles/${params}/follow`,
	});

// delFollow
export const delFollow = (params) =>
	Axios({
		method: 'delete',
		url: `api/profiles/${params}/follow`,
	});
