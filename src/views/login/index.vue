<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" class="login-form" auto-complete="on" label-position="left">
      <div class="login-title">Login</div>
      <el-form-item prop="username"
        :rules = "[
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ]"
      >
        <span class="icon-wrapper"><i class="el-icon-user-solid"></i></span>
        <el-input ref="username" v-model="loginForm.username" placeholder="Username" name="username" type="text" tabindex="1" auto-complete="on" />
      </el-form-item>
      <el-form-item prop="password"
        :rules = "[
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]"
      >
        <span class="icon-wrapper"><i class="el-icon-lock"></i></span>
        <el-input :key="passwordType" ref="password" v-model="loginForm.password" :type="passwordType" placeholder="Password" name="password" tabindex="2" auto-complete="on" @keyup.enter.native="handleLogin" />
      </el-form-item>
      <el-button :loading="loading" type="primary" @click.native.prevent="handleLogin">Login</el-button>
    </el-form>
  </div>
</template>

<script>
import { userLogin } from '@/service/login'

export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: '111111'
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          userLogin(this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          this.$message.warning('请检查输入！')
          return false
        }
      })
    }
  }
}
</script>

<style lang="less">
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100%;
  width: 100%;
  background-color: #2d3a4b;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;

    .login-title {
      font-size: 26px;
      color: #eee;
      margin-bottom: 40px;
      text-align: center;
      font-weight: bold;
    }

    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      .icon-wrapper {
        padding: 6px 5px 6px 15px;
        display: inline-block;
        color: #889aa4;
      }
    }

    .el-button {
      width: 100%;
    }
  }

  .el-input {
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      border-radius: 0px;
      color: #fff;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px #283443 inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
}
</style>
