<template>
	<div>
		<h1>user:{{ $route.params.id }}</h1>
	</div>
</template>

<script>
export default {
	created() {
		console.log(this.$route.params.id);
	},
};
</script>
