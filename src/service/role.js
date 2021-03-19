import request from '@/utils/request'

const getRoleList = function(params) {
  return request({
    url: '/role/list',
    method: 'get',
    params
  })
}

const addRole = function(data) {
  return request({
    url: '/role/add',
    method: 'post',
    data
  })
}

const updateRole = function(data) {
  return request({
    url: `/role/${data._id}`,
    method: 'put',
    data
  })
}

const deleteRole = function(params) {
  return request({
    url: `/role/${params.id}`,
    method: 'delete'
  })
}

export {
  getRoleList,
  addRole,
  updateRole,
  deleteRole
}
