/**
 * 登录接口
 */
import { userLogin } from '@/api/login'

const login = {
  actions: {
    userLogin ({ commit }, params) {
      return new Promise((resolve, reject) => {
        userLogin(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default login
