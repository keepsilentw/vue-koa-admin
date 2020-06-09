import request from '@/utils/request'

const getApplicationList = function(params) {
  return request({
    url: '/app/list',
    method: 'get',
    params
  })
}

const getRoleList = function(params) {
  return request({
    url: '/role/list',
    method: 'get',
    params
  })
}

const getPermList = function(params) {
  return request({
    url: '/perm/list',
    method: 'get',
    params
  })
}

export {
  getApplicationList,
  getRoleList,
  getPermList
}
