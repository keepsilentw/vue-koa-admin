const Router = require('koa-router')

const AppController = require('../controller/appController')
const UserController = require('../controller/userController')
const RoleController = require('../controller/roleController')
const PermController = require('../controller/permController')
const LoginController = require('../controller/loginController')

const router = new Router()

router.prefix('/acl-api')

// router.use('/', (ctx, next) => {
// 	let username = ctx.session.username || ''
// 	console.log(username)
// 	next()
// })

router
	.get('/app/list', AppController.getAllApps)
	.get('/user/list', UserController.getAllUsers)
	.get('/user/:id', UserController.getUserById)
	.post('/user/add', UserController.addUser)
	.put('/user/:id', UserController.updateUser)
	.del('/user/:id', UserController.deleteUser)
	.get('/role/list', RoleController.getAllRoles)
	.get('/perm/list', PermController.getAllPerms)
	.post('/user/login', LoginController.userLogin)
	.post('/user/logout', LoginController.userLogout)

module.exports = router
