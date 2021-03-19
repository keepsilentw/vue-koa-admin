const Router = require('koa-router')
const RoleController = require('../controller/roleController')

const router = new Router()

router
  .get('/list', RoleController.getAllRoles)
  .get('/:id', RoleController.getRoleById)
  .post('/add', RoleController.addRole)
  .put('/:id', RoleController.updateRole)
  .del('/:id', RoleController.deleteRole)

module.exports = router
