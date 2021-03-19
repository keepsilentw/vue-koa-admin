const { v4: uuidv4 } = require('uuid')
const App = require('../model/application')
const { resHandler } = require('../utils')

/*
 * 查询所有应用
 */
const getAllApps = async (ctx, next) => {
  const pageNum = +ctx.query.pageIndex
  const pageSize = +ctx.query.pageSize
  const name = ctx.query.name
  const queryParams = {}
  if (name) queryParams.name = name
  const count = await App.countDocuments(queryParams)
  const apps = await App.find(queryParams)
    .skip((pageNum - 1) * pageSize)
    .limit(pageSize)
    .sort({ update_time: -1 })
  if (apps) {
    ctx.body = resHandler({
      totalCount: count,
      data: apps
    })
  } else {
    ctx.body = resHandler([])
  }
}

/*
 * 根据应用id查询应用
 */
const getAppById = async(ctx) => {
  const appid = ctx.params.id
  if (!appid) {
    ctx.status = 400
    ctx.body = 'Bad Request, appid can not be null'
  }
  const app = await App.findOne({ id: appid })
  if (app) {
    ctx.body = resHandler(app)
  }
}

/*
 * 添加应用
 */
const addApp = async(ctx) => {
  const obj = { ...ctx.request.body }

  const app = new App({
    id: uuidv4(),
    name: obj.name
  })

  const result = await app.save()

  if (result) {
    ctx.body = resHandler(true)
  } else {
    ctx.body = resHandler(null, 'create app failed!')
  }
}

/*
 * 更新应用
 */
const updateApp = async(ctx, next) => {
  const _id = ctx.params.id

  if (!_id) {
    ctx.status = 400
    ctx.body = 'Bad Request, _id can not be null'
    return
  }

  const app = await App.findOne({ _id: _id })
  if (!app) {
    ctx.body = resHandler(null, 'params _id is not existed')
    return
  }

  const obj = { ...ctx.request.body }

  await App.updateOne({ _id: _id }, {
    name: obj.name,
    update_time: Date.now()
  }, function(err) {
    if (err) {
      ctx.body = resHandler(null, 'update app failed!')
    } else {
      ctx.body = resHandler(true)
    }
  })
}

/*
 * 删除用户
 */
const deleteApp = async(ctx) => {
  const appid = ctx.params.id
  if (!appid) {
    ctx.status = 400
    ctx.body = 'Bad Request, appid can not be null'
  }
  await App.deleteOne({ id: appid }, function(err) {
    if (err) {
      ctx.body = resHandler(null, 'delete app failed!')
    } else {
      ctx.body = resHandler(true)
    }
  })
}

module.exports = {
  getAllApps,
  getAppById,
  addApp,
  updateApp,
  deleteApp
}
