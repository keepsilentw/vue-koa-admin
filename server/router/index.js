const Router = require('koa-router')

const user = require('./user')
const perm = require('./perm')
const application = require('./application')
const role = require('./role')

const LoginController = require('../controller/loginController')

const router = new Router({
  prefix: '/acl-api'
})

router
  .use('/user', user.routes(), user.allowedMethods())
  .use('/perm', perm.routes(), perm.allowedMethods())
  .use('/app', application.routes(), application.allowedMethods())
  .use('/role', role.routes(), role.allowedMethods())
  .post('/user/login', LoginController.userLogin)
  .post('/user/logout', LoginController.userLogout)

module.exports = router
