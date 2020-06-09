const Mock = require('mockjs')

const data = Mock.mock({
  'items|10': [{
    id: '@id',
    'name|1': ['超级管理员', '应用管理员', '开发者', '测试'],
    'status|1': ['enabled', 'disabled'],
    createdAt: '@datetime'
  }]
})

module.exports = [
  {
    url: '/acl-api/role/list',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 200,
        data: {
          total: items.length,
          items: items
        },
        msg: 'success'
      }
    }
  }
]
