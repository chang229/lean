<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/> -->
    <h1>vuex msg</h1>
    <div>count:{{$store.state.count}}</div>
    <div>msg:{{$store.state.msg}}</div>
    <!-- <div>count:{{count}}</div>
    <div>msg:{{msg}}</div> -->
    <!-- <div>count:{{num}}</div>
    <div>msg:{{message}}</div> -->
    <h1>getters</h1>
    <div>getters:{{$store.getters.reverseMsg}}</div>
    <!-- <div>getters:{{downMsg}}</div> -->
    <h1>Mutations</h1>
    <button @click="$store.commit('addCount',2)">mutation</button>
    <!-- <button @click="addCount(3)">mutation</button> -->
    <h1>Action</h1>
    <button @click="$store.dispatch('fetchCount',5)">action</button>
    <!-- <button @click="fetchCount(10)">action</button> -->
    <!-- <h1>Modules</h1> -->
    <!-- <div>products:{{$store.state.products.products}}</div>
    <button @click="$store.commit('changeProducts',[])">product</button> -->
    <!-- <div>products:{{products}}</div> -->
    <!-- <button @click="changeProducts([])">product</button> -->
    <!-- <h1>strict</h1> -->
    <!-- <button @click="$store.state.msg = 'ceshi'">strict</button> -->
  </div>
</template>
<script>
// import {mapActions, mapGetters, mapMutations, mapState} from 'vuex'
export default {
    computed:{
        // ...mapState(['count','msg'])
        // ...mapState({num:'count',message:'msg'}),
        // ...mapGetters(['reverseMsg'])
        // ...mapGetters({downMsg:'reverseMsg'}),
        // ...mapState('products',['products'])
    },
    methods:{
        // ...mapMutations(['addCount']),
        // ...mapActions(['fetchCount']),
        // ...mapMutations('products',['changeProducts'])
    }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
