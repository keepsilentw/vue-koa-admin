const Perm = require('../model/perm')
const { resHandler } = require('../utils')

/*
 * 查询所有权限
 */
const getAllPerms = async(ctx) => {
	let pageNum = +ctx.query.pageIndex
	let pageSize = +ctx.query.pageSize
	let name = ctx.query.name
	let queryParams = {}
	if (name) queryParams.name = name
	const count = await Perm.count(queryParams)
	const perms = await Perm.find(queryParams).skip((pageNum - 1) * pageSize).limit(pageSize).sort({updateTime: -1})
	if (perms) {
		ctx.body = resHandler({
			totalCount: count,
			data: perms
		})
	} else {
		ctx.body = resHandler([])
	}
}

module.exports = {
	getAllPerms
}
