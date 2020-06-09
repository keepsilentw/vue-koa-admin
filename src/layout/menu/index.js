export default [
  {
    key: '1',
    icon: 'el-icon-s-home',
    name: '首页',
    router: '/home'
  },
  {
    key: '2',
    icon: 'el-icon-document',
    name: '应用管理',
    router: '/application'
  },
  {
    key: '3',
    icon: 'el-icon-s-custom',
    name: '角色管理',
    router: '/role'
  },
  {
    key: '4',
    icon: 'el-icon-user',
    name: '用户管理',
    router: '/user',
    children: [
      {
        key: '2-1',
        name: '用户列表',
        router: '/user/list'
      },
      {
        key: '2-2',
        name: '权限列表',
        router: '/user/perm'
      }
    ]
  }
]
