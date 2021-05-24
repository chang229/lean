<template>
    <div>
        <h1>hello world</h1>
        <a href="/about">about</a>
        <NuxtLink to="/about">about</NuxtLink>
        <button @click="to">about</button>
    </div>
</template>

<script>
export default {
    name:"index",
    methods:{
        to(){
            this.$router.push('/about')
        }
    }
}
</script>