import request from '@/utils/request'

const List = function(params) {
  return request({
    url: '/app/list',
    method: 'get',
    params
  })
}

export {
  List
}
