const Router = require('koa-router')
const UserController = require('../controller/userController')

const router = new Router()

router
  .get('/list', UserController.getAllUsers)
  .get('/:id', UserController.getUserById)
  .post('/add', UserController.addUser)
  .put('/:id', UserController.updateUser)
  .del('/:id', UserController.deleteUser)

module.exports = router
