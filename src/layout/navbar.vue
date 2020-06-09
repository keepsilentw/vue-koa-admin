<template>
  <el-header>
    <div class="header-left">
      <img src="@/assets/logo.png">
      ACL
    </div>
    <div class="header-right">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <el-avatar shape="square" size="small" icon="el-icon-user-solid"></el-avatar>
          {{username}}
          <i class="el-icon-caret-bottom"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="logout">Log out</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script>
import { userLogout } from '@/service/login'

export default {
  name: 'layout-header',
  data() {
    return {
      username: ''
    }
  },
  created() {
    this.username = window.$cookies.get('username') || '管理员'
  },
  methods: {
    logout() {
      userLogout().then(() => {
        this.$router.push('/login')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.header-left {
  float: left;
  width: 200px;
  padding-left: 20px;
  font-size: 18px;
  img {
    width: 30px;
    height: 30px;
    vertical-align: middle;
  }
}
.header-right {
  float: right;
  padding-right: 20px;
  .el-dropdown-link {
    cursor: pointer;
    .el-avatar {
      vertical-align: middle;
    }
  }
}
</style>
