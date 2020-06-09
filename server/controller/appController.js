const Application = require('../model/application')
const { resHandler } = require('../utils')

/*
 * 查询所有应用
 */
const getAllApps = async (ctx, next) => {
	let pageNum = +ctx.query.pageIndex
	let pageSize = +ctx.query.pageSize
	let name = ctx.query.name
	let queryParams = {}
	if (name) queryParams.name = name
	const count = await Application.count(queryParams)
	const apps = await Application.find(queryParams).skip((pageNum - 1) * pageSize).limit(pageSize).sort({updateTime: -1})
	if (apps) {
		ctx.body = resHandler({
			totalCount: count,
			data: apps
		})
	} else {
		ctx.body = resHandler([])
	}
}

module.exports = {
	getAllApps
}
