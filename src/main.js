import Vue from 'vue'
import App from './App.vue'
import VueCookies from 'vue-cookies'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/zh-CN'
import 'element-ui/lib/theme-chalk/index.css'

import router from './router'
import store from './store'

import { dateFormat } from './utils'

Vue.use(VueCookies)
Vue.use(ElementUI, { locale, size: 'small' })

Vue.filter('dateFormat', dateFormat)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
