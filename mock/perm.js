const Mock = require('mockjs')

const data = Mock.mock({
  'items|30': [{
    id: '@id',
    name: '@ctitle(5)',
    'permCode|1': ['1001', '10001', '10010', '100100', '100101'],
    updatedAt: '@datetime'
  }]
})

module.exports = [
  {
    url: '/acl-api/perm/list',
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
