<template>
    <div>
        <label>{{label}}</label>
        <div>
            <slot></slot>
            <p v-if="errMsg">{{errMsg}}</p>
        </div>
    </div>
</template>
<script>
import asyncValidator from 'async-validator';
export default {
    name:'lgFormItem',
    inject:['form'],
    props:{
        label:{
            type:String
        },
        prop:{
            type:String
        }
    },
    data(){
        return {
            errMsg:''
        }
    },
    methods:{
        validate(){
            if (!this.prop) return;
            const value = this.form.model[this.prop]
            const rules = this.form.rules[this.prop]
            const descriptor = { [this.prop]: rules }
            const validator = new AsyncValidator(descriptor)
            return validator.validate({ [this.prop]: value }, errors => {
                if (errors) {
                    this.errMessage = errors[0].message
                } else {
                    this.errMessage = ''
                }
            })
        }
    }
}
</script>