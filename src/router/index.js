import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

import routes from './routes'

NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false }) // NProgress Configuration

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: '/acl',
  routes
})

router.beforeEach((to, from, next) => {
  // start progress bar
  NProgress.start()

  const user = window.$cookies.get('username')

  if (user) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      next()
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }

  // set page title
  const prevTitle = document.title
  document.title = to.meta && to.meta.title ? to.meta.title : prevTitle

  next()
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})

export default router
