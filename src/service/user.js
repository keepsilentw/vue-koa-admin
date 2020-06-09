import request from '@/utils/request'

const getUserList = function(params) {
  return request({
    url: '/user/list',
    method: 'get',
    params
  })
}

const addUser = function(data) {
  return request({
    url: '/user/add',
    method: 'post',
    data
  })
}

const updateUser = function(data) {
  return request({
    url: `/user/${data._id}`,
    method: 'put',
    data
  })
}

const deleteUser = function(params) {
  return request({
    url: `/user/${params.id}`,
    method: 'delete'
  })
}

export {
  getUserList,
  addUser,
  updateUser,
  deleteUser
}
