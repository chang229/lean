<template>
    <div>
        <button @click="btnClick">
            <slot></slot>
        </button>
    </div>
</template>
<script>
export default {
    name:'lgButton',
    methods:{
        btnClick(){
            this.$emit('click')
        }
    }
}
</script>