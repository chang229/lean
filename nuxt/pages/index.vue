<template>
	<div>
		<h1>hello world</h1>
		<a href="/about">about</a>
		<nuxt-link to="/about">about</nuxt-link>
		<button @click="to">about</button>
	</div>
</template>

<script>
export default {
	name: 'index',
	methods: {
		to() {
			this.$router.push('/about');
		},
	},
};
</script>
