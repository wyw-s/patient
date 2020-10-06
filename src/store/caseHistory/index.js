/**
 * 病例管理
 */
import {
  postDeleteCase,
  postEditCase,
  getCaseHistory
} from '@/api/patientManage'

const caseHistory = {
  actions: {
    postDeleteCase ({ commit }, params) {
      return new Promise((resolve, reject) => {
        postDeleteCase(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    postEditCase ({ commit }, params) {
      return new Promise((resolve, reject) => {
        postEditCase(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getCaseHistory ({ commit }, params) {
      return new Promise((resolve, reject) => {
        getCaseHistory(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default caseHistory
