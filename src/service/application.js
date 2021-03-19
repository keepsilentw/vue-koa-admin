import request from '@/utils/request'

const getAppList = function(params) {
  return request({
    url: '/app/list',
    method: 'get',
    params
  })
}

const addApp = function(data) {
  return request({
    url: '/app/add',
    method: 'post',
    data
  })
}

const updateApp = function(data) {
  return request({
    url: `/app/${data._id}`,
    method: 'put',
    data
  })
}

const deleteApp = function(params) {
  return request({
    url: `/app/${params.id}`,
    method: 'delete'
  })
}

export {
  getAppList,
  addApp,
  updateApp,
  deleteApp
}
