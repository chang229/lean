<template>
    <div>
        <h1>{{article.title}}</h1>
        <div>{{article.body}}</div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    async asyncData({params}) {
        let res = await axios({
            methohds:"get",
            url:'http://localhost:3000/data.json'
        })
        let posts = res.data.posts;
        return {
            article:posts.find(item => item.id === params.id * 1)
        }
    },
}
</script>