<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less">
* {
  box-sizing: border-box;
}
html {
  height: 100%;
}
body {
  margin: 0;
  height: 100%;
}
#app {
  height: 100%;
}
.align-center {
  text-align: center;
}
/* fix table misplace */
.el-table th.gutter{
  display: table-cell !important;
}
</style>
