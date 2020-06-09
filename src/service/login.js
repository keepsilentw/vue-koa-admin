import request from '@/utils/request'

const userLogin = function(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

const userLogout = function() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export {
  userLogin,
  userLogout
}
