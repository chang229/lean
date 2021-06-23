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
    }
}
</script>