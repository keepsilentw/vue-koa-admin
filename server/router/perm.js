const Router = require('koa-router')
const PermController = require('../controller/permController')

const router = new Router()

router
  .get('/list', PermController.getAllPerms)
  .get('/:id', PermController.getPermById)
  .post('/add', PermController.addPerm)
  .put('/:id', PermController.updatePerm)
  .del('/:id', PermController.deletePerm)

module.exports = router
