const Router = require('koa-router')
const AppController = require('../controller/appController')

const router = new Router()

router
  .get('/list', AppController.getAllApps)
  .get('/:id', AppController.getAppById)
  .post('/add', AppController.addApp)
  .put('/:id', AppController.updateApp)
  .del('/:id', AppController.deleteApp)

module.exports = router
