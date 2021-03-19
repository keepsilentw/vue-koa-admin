import request from '@/utils/request'

const getPermList = function(params) {
  return request({
    url: '/perm/list',
    method: 'get',
    params
  })
}

const addPerm = function(data) {
  return request({
    url: '/perm/add',
    method: 'post',
    data
  })
}

const updatePerm = function(data) {
  return request({
    url: `/perm/${data._id}`,
    method: 'put',
    data
  })
}

const deletePerm = function(params) {
  return request({
    url: `/perm/${params.id}`,
    method: 'delete'
  })
}

export {
  getPermList,
  addPerm,
  updatePerm,
  deletePerm
}
