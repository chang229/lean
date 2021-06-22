<template>
    <div>
        <step :count="count" :active="active"></step>
        <button @click="next">下一步</button>
    </div>
</template>
<script>
import step from './step.vue'
export default {
    name:'stepTest',
    data(){
        return {
            count:4,
            active:0
        }
    },
    methods:{
        next(){
            this.active++;
        }
    },
    components:{
        step,
    }
}
</script>