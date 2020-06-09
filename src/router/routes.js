import Layout from '@/layout/index'

export default [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'home',
      meta: { title: '首页' },
      component: () => import(/* webpackChunkName: "home" */ '@/views/home/')
    }]
  },
  {
    path: '/application',
    component: Layout,
    children: [{
      path: '/',
      name: 'application',
      meta: { title: '应用管理' },
      component: () => import(/* webpackChunkName: "application" */ '@/views/application/')
    }]
  },
  {
    path: '/role',
    component: Layout,
    children: [{
      path: '/',
      name: 'role',
      meta: { title: '角色管理' },
      component: () => import(/* webpackChunkName: "role" */ '@/views/role/')
    }]
  },
  {
    path: '/user',
    component: Layout,
    children: [{
      path: 'list',
      name: 'user-list',
      meta: { title: '用户列表' },
      component: () => import(/* webpackChunkName: "user-list" */ '@/views/user/list')
    }, {
      path: 'perm',
      name: 'user-perm',
      meta: { title: '权限列表' },
      component: () => import(/* webpackChunkName: "user-perm" */ '@/views/user/perm')
    }]
  }
]
