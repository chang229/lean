<template>
    <div>
        <slot></slot>
    </div>
</template>
<script>
export default {
    name:'lgForm',
    provide(){
        return {
            form:this
        }
    },
    props:{
        model:{
            type:Object
        },
        rules:{
            type:Object
        }
    },
    methods:{
        validate(cb){
            const tasks = this.$children.filter(item => item.prop).map(item => item.validate());
            Promise.all(tasks).then(() => cb(true),() => cb(false)).catch(() => cb(false))
        }
    }
}
</script>