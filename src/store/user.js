import { userLogin } from '@/service/login'

export default {
  namespaced: true,
  state: {
    name: ''
  },
  mutations: {
    setName(state, name) {
      state.name = name
    }
  },
  actions: {
    login({ commit }, userInfo) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        userLogin({
          username: username.trim(),
          password: password
        }).then(res => {
          console.log(res)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
