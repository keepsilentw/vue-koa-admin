const { v4: uuidv4 } = require('uuid')
const Perm = require('../model/perm')
const { resHandler } = require('../utils')

/*
 * 查询所有权限
 */
const getAllPerms = async(ctx) => {
  const pageNum = +ctx.query.pageIndex
  const pageSize = +ctx.query.pageSize
  const name = ctx.query.name
  const queryParams = {}
  if (name) queryParams.name = name
  const count = await Perm.countDocuments(queryParams)
  const perms = await Perm.find(queryParams)
    .skip((pageNum - 1) * pageSize)
    .limit(pageSize)
    .sort({ update_time: -1 })
  if (perms) {
    ctx.body = resHandler({
      totalCount: count,
      data: perms
    })
  } else {
    ctx.body = resHandler([])
  }
}

/*
 * 根据权限id查询权限
 */
const getPermById = async(ctx) => {
  const permid = ctx.params.id
  if (!permid) {
    ctx.status = 400
    ctx.body = 'Bad Request, permid can not be null'
  }
  const perm = await Perm.findOne({ id: permid })
  if (perm) {
    ctx.body = resHandler(perm)
  }
}

/*
 * 添加权限
 */
const addPerm = async(ctx) => {
  const obj = { ...ctx.request.body }

  const perm = new Perm({
    id: uuidv4(),
    name: obj.name,
    perm_code: obj.perm_code
  })

  const result = await perm.save()

  if (result) {
    ctx.body = resHandler(true)
  } else {
    ctx.body = resHandler(null, 'create perm failed!')
  }
}

/*
 * 更新权限
 */
const updatePerm = async(ctx, next) => {
  const _id = ctx.params.id

  if (!_id) {
    ctx.status = 400
    ctx.body = 'Bad Request, _id can not be null'
    return
  }

  const perm = await Perm.findOne({ _id: _id })
  if (!perm) {
    ctx.body = resHandler(null, 'params _id is not existed')
    return
  }

  const obj = { ...ctx.request.body }

  await Perm.updateOne({ _id: _id }, {
    name: obj.name,
    perm_code: obj.perm_code,
    update_time: Date.now()
  }, function(err) {
    if (err) {
      ctx.body = resHandler(null, 'update perm failed!')
    } else {
      ctx.body = resHandler(true)
    }
  })
}

/*
 * 删除权限
 */
const deletePerm = async(ctx) => {
  const permid = ctx.params.id
  if (!permid) {
    ctx.status = 400
    ctx.body = 'Bad Request, permid can not be null'
  }
  await Perm.deleteOne({ id: permid }, function(err) {
    if (err) {
      ctx.body = resHandler(null, 'delete perm failed!')
    } else {
      ctx.body = resHandler(true)
    }
  })
}

module.exports = {
  getAllPerms,
  getPermById,
  addPerm,
  updatePerm,
  deletePerm
}
