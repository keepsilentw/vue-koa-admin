const Role = require('../model/role')
const { resHandler } = require('../utils')

/*
 * 查询所有角色
 */
const getAllRoles = async(ctx) => {
	let pageNum = +ctx.query.pageIndex
	let pageSize = +ctx.query.pageSize
	let name = ctx.query.name
	let queryParams = {}
	if (name) queryParams.name = name
	const count = await Role.count(queryParams)
	const roles = await Role.find(queryParams).skip((pageNum - 1) * pageSize).limit(pageSize).sort({updateTime: -1})
	if (roles) {
		ctx.body = resHandler({
			totalCount: count,
			data: roles
		})
	} else {
		ctx.body = resHandler([])
	}
}

module.exports = {
	getAllRoles
}
