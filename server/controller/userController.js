const { v4: uuidv4 } = require('uuid')
const User = require('../model/user')
const { resHandler } = require('../utils')

/*
 * 查询所有用户
 */
const getAllUsers = async(ctx) => {
	let pageNum = +ctx.query.pageIndex
	let pageSize = +ctx.query.pageSize
	let name = ctx.query.name
	let queryParams = {}
	if (name) queryParams.name = name
	const count = await User.count(queryParams)
	const users = await User.find(queryParams).skip((pageNum - 1) * pageSize).limit(pageSize).sort({updateTime: -1})
	if (users) {
		ctx.body = resHandler({
			totalCount: count,
			data: users
		})
	} else {
		ctx.body = resHandler([])
	}
}

/*
 * 根据用户id查询用户
 */
const getUserById = async(ctx) => {
	let userid = ctx.params.id
	if (!userid) {
		ctx.status = 400
		ctx.body = 'Bad Request, userid can not be null'
	}
	const user = await User.findOne({id: userid})
	if (user) {
		ctx.body = resHandler(user)
	}
}

/*
 * 添加用户
 */
const addUser = async(ctx) => {
	let name = ctx.request.body.name
	let email = ctx.request.body.email
	let department = ctx.request.body.department

	const user = new User({
		id: uuidv4(),
		name: name,
		email: email,
		department: department
	})

	const result = await user.save()

	if (result) {
		ctx.body = resHandler(true)
	} else {
		ctx.body = resHandler(null, 'create user failed!')
	}
}

/*
 * 更新用户
 */
const updateUser = async(ctx, next) => {
	let _id = ctx.params.id

	if (!_id) {
		ctx.status = 400
		ctx.body = 'Bad Request, _id can not be null'
		return
	}

	const user = await User.findOne({_id: _id})
	if (!user) {
		ctx.body = resHandler(null, 'params _id is not existed')
		return
	}

	let name = ctx.request.body.name
	let email = ctx.request.body.email
	let department = ctx.request.body.department

	await User.updateOne({ _id: _id }, {
		name: name,
		email: email,
		department: department,
		updateTime: Date.now()
	}, function(err) {
		if (err) {
			ctx.body = resHandler(null, 'update user failed!')
		} else {
			ctx.body = resHandler(true)
		}
	})
}

/*
 * 删除用户
 */
const deleteUser = async(ctx) => {
	let userid = ctx.params.id
	if (!userid) {
		ctx.status = 400
		ctx.body = 'Bad Request, userid can not be null'
	}
	await User.remove({id: userid}, {justOne: true}, function(err) {
		if (err) {
			ctx.body = resHandler(null, 'delete user failed!')
		} else {
			ctx.body = resHandler(true)
		}
	})
}

module.exports = {
	getAllUsers,
	getUserById,
	addUser,
	updateUser,
	deleteUser
}
