const Mock = require('mockjs')

const data = Mock.mock({
  'items|20': [{
    id: '@id',
    name: '@word(6)',
    'status|1': ['disabled', 'enabled', 'beforeEnabled'],
    author: '@cname',
    updatedAt: '@datetime',
    url: '@url',
    server: '@ip'
  }]
})

module.exports = [
  {
    url: '/acl-api/app/list',
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
