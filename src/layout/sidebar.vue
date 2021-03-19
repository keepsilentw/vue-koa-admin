<template>
  <el-aside width="200px">
    <el-scrollbar class="sidebar-container">
      <el-menu class="sidebar-menu" :default-active="$route.path" router
        background-color="#304156"
        text-color="#fff"
        active-text-color="#409EFF">
        <div class="menu-item" :key="index" v-for="(item, index) in menuList">
          <el-submenu :index="item.key" v-if="item.children && item.children.length > 0">
            <template slot="title"><i :class="item.icon"></i>{{item.name}}</template>
            <el-menu-item :index="child.router" :key="ind" v-for="(child, ind) in item.children">
              {{child.name}}
            </el-menu-item>
          </el-submenu>
          <el-menu-item v-else :index="item.router">
            <i :class="item.icon"></i>
            <span slot="title">{{item.name}}</span>
          </el-menu-item>
        </div>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<script>
import menuList from './menu'
export default {
  name: 'layout-aside',
  data() {
    return {
      defaultActive: '',
      menuList: []
    }
  },
  created() {
    this.menuList = menuList
  }
}
</script>

<style lang="less">
.sidebar-container {
  height: 100%;
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
  .sidebar-menu {
    border-right: none;
    .el-menu-item, .el-submenu__title {
      font-size: 12px;
      height: 46px;
      line-height: 46px;
    }
  }
}
</style>
