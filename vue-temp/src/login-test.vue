<template>
  <lg-form class="form" ref="form" :model="user" :rules="rules">
    <lg-form-item label="用户名" prop="username">
      <lg-input :value="user.username" @input="user.username = $event" type="text" placeholder="请输入用户名"></lg-input>
    </lg-form-item>
    <lg-form-item label="密码" prop="password">
      <lg-input type="password" v-model="user.password" placeholder="请输入用户密码"></lg-input>
    </lg-form-item>
    <lg-form-item>
      <lg-button type="primary" @click="login">登 录</lg-button>
    </lg-form-item>
  </lg-form>
</template>

<script>
import lgForm from './form/form.vue';
import lgFormItem from './form/formItem.vue';
import lgInput from './form/input.vue';
import lgButton from './form/button.vue';
export default {
  name: 'Login',
  data () {
    return {
      user: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          {
            required: true,
            message: '请输入用户名'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码'
          },
          {
            min: 6,
            max: 12,
            message: '请输入6-12位密码'
          }
        ]
      }
    }
  },
  methods: {
    login () {
      console.log('button')
      return false
      // this.$refs.form.validate(valid => {
      //   if (valid) {
      //     alert('验证成功')
      //   } else {
      //     alert('验证失败')
      //     return false
      //   }
      // })
    }
  },
  components:{
      lgForm,
      lgFormItem,
      lgInput,
      lgButton
  }
}
</script>

<style>
  .form {
    width: 30%;
    margin: 150px auto;
  }
</style>
