<template>
  <div class="login">
    <el-form
      ref="form"
      class="login-form"
      :model="form"
      label-position="top"
      label-width="80px"
      :rules="rules"
    >
        <el-form-item label="手机号码" prop="phone">
            <el-input v-model="form.phone" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-button class="login-btn" type="primary" @click="onSubmit" :loading="loginLoading">立即创建</el-button>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { login } from '@/services/user'
import { Form } from 'element-ui'

export default Vue.extend({
  name: 'LoginIndex',
  data () {
    return {
      loginLoading: false,
      form: {
        phone: '18201288771',
        password: '111111'
      },
      rules: {
        phone: [
          { required: true, message: '请输入手机号码', trigger: 'change' },
          { pattern: /^1\d{10}$/, message: '请输入正确的手机号码', trigger: 'change' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' },
          { min: 6, max: 18, message: '密码长度在 6 到 18 个字符', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    onSubmit () {
      (this.$refs.form as Form).validate((vaild: boolean) => {
        if (vaild) {
          this.loginLoading = true
          login(this.form).then((res: any) => {
            this.loginLoading = false
            if (res.state === 1) {
              this.$message.success('登录成功')
              this.$router.push('/')
            } else {
              this.$message.error(res.message)
            }
          })
        }
      })
    }
  }
})
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-form {
    width: 300px;
    background: #fff;
    padding: 20px;
    border-radius: 5px;
  }
  .login-btn {
    width: 100%;
  }
}
</style>
