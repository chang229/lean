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
            this.$emit('input',event.target.value);
            let parent = this.findParent(this.$parent);
            if(parent){
                parent.$emit('validate')
            }
        },
        findParent(parent){
            while(parent){
                if(parent.$options.name === 'lgFormItem'){
                    break;
                }else{
                    parent = parent.$parent;
                }
            }
            return parent;
        }
    }
}
</script>