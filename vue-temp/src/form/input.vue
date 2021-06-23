<template>
    <div>
        <input v-bind="$attrs" :type="type" :value="value" @input="handelIpt">
    </div>
</template>
<script>
export default {
    name:'lgInput',
    inheritAttrs:false,
    props:{
        type:{
            type:String,
            default:'string'
        },
        value:{
            type:String
        }
    },
    methods:{
        handelIpt(event){
            this.$emit('input',event.target.value)
        }
    }
}
</script>