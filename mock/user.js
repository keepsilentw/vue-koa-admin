const Mock = require('mockjs')

const data = Mock.mock({
  'items|40': [{
    guid: '@guid',
    name: '@cname(8)',
    email: '@email',
    'department|1': ['研发部', '市场部', '行政部'],
    'role|1': ['超级管理员', '应用管理员', '开发者', '测试'],
    'status|1': ['enabled', 'disabled'],
    createdAt: '@datetime'
  }]
})

module.exports = [
  {
    url: '/acl-api/user/list',
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
