const { v4: uuidv4 } = require('uuid')
const Role = require('../model/role')
const { resHandler } = require('../utils')

/*
 * 查询所有角色
 */
const getAllRoles = async(ctx) => {
  const pageNum = +ctx.query.pageIndex
  const pageSize = +ctx.query.pageSize
  const name = ctx.query.name
  const queryParams = {}
  if (name) queryParams.name = name
  const count = await Role.countDocuments(queryParams)
  const roles = await Role.find(queryParams)
    .skip((pageNum - 1) * pageSize)
    .limit(pageSize)
    .sort({ update_time: -1 })
  if (roles) {
    ctx.body = resHandler({
      totalCount: count,
      data: roles
    })
  } else {
    ctx.body = resHandler([])
  }
}

/*
 * 根据角色id查询角色
 */
const getRoleById = async(ctx) => {
  const roleid = ctx.params.id
  if (!roleid) {
    ctx.status = 400
    ctx.body = 'Bad Request, roleid can not be null'
  }
  const role = await Role.findOne({ id: roleid })
  if (role) {
    ctx.body = resHandler(role)
  }
}

/*
 * 添加角色
 */
const addRole = async(ctx) => {
  const obj = { ...ctx.request.body }

  const role = new Role({
    id: uuidv4(),
    name: obj.name
  })

  const result = await role.save()

  if (result) {
    ctx.body = resHandler(true)
  } else {
    ctx.body = resHandler(null, 'create role failed!')
  }
}

/*
 * 更新角色
 */
const updateRole = async(ctx, next) => {
  const _id = ctx.params.id

  if (!_id) {
    ctx.status = 400
    ctx.body = 'Bad Request, _id can not be null'
    return
  }

  const role = await Role.findOne({ _id: _id })
  if (!role) {
    ctx.body = resHandler(null, 'params _id is not existed')
    return
  }

  const obj = { ...ctx.request.body }

  await Role.updateOne({ _id: _id }, {
    name: obj.name,
    update_time: Date.now()
  }, function(err) {
    if (err) {
      ctx.body = resHandler(null, 'update role failed!')
    } else {
      ctx.body = resHandler(true)
    }
  })
}

/*
 * 删除用户
 */
const deleteRole = async(ctx) => {
  const roleid = ctx.params.id
  if (!roleid) {
    ctx.status = 400
    ctx.body = 'Bad Request, roleid can not be null'
  }
  await Role.deleteOne({ id: roleid }, function(err) {
    if (err) {
      ctx.body = resHandler(null, 'delete role failed!')
    } else {
      ctx.body = resHandler(true)
    }
  })
}

module.exports = {
  getAllRoles,
  getRoleById,
  addRole,
  updateRole,
  deleteRole
}
