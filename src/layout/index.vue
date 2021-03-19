<template>
  <el-container class="app-layout">
    <app-navbar class="app-navbar"></app-navbar>
    <el-container class="app-container">
      <app-sidebar class="app-sidebar"></app-sidebar>
      <el-scrollbar class="view-container">
        <!-- <transition name="fade" mode="out-in" appear> -->
          <router-view></router-view>
        <!-- </transition> -->
      </el-scrollbar>
    </el-container>
  </el-container>
</template>

<script>
import AppNavbar from './navbar'
import AppSidebar from './sidebar'

export default {
  name: 'layout',
  components: {
    AppNavbar,
    AppSidebar
  }
}
</script>

<style lang="less">
.app-layout {
  height: 100%;
  .app-navbar {
    position: absolute;
    z-index: 100;
    width: 100%;
    height: 54px !important;
    line-height: 54px;
    padding: 0;
    box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
  }
  .app-container {
    padding-top: 54px;
    height: 100%;
  }
  .app-sidebar {
    background: #304156;
  }
  .view-container {
    flex: 1;
    .el-scrollbar__wrap {
      padding: 20px;
      overflow-x: hidden;
    }
  }
}

.page-container {
  margin-top: 15px;
  text-align: right;
}
</style>
