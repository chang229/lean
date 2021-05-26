<template>
	<div>
		<h1>{{ title }}</h1>
        <ul>
            <li v-for="item in posts" :key="item.id">
                <nuxt-link :to="'/article/' + item.id">{{item.title}}</nuxt-link>
            </li>
        </ul>
	</div>
</template>

<script>
import axios from 'axios';
export default {
	name: 'index',
	async asyncData() {
        let res = await axios({
            methods:'get',
            url:'http://localhost:3000/data.json'
        })
        return res.data
    },
};
</script>
