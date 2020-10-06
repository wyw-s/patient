
/**
 * 患者管理接口
 */
import {
  addPatient,
  deletePatient,
  queryPatient,
  updateMessage,
  postaddCase
} from '@/api/patientManage'

const patientManage = {
  actions: {
    // 新增患者
    addPatient ({ commit }, params) {
      return new Promise((resolve, reject) => {
        addPatient(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 删除患者；
    deletePatient ({ commit }, params) {
      return new Promise((resolve, reject) => {
        deletePatient(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 查询患者列表
    queryPatient ({ commit }, params) {
      return new Promise((resolve, reject) => {
        queryPatient(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 更新患者信息
    updateMessage ({ commit }, params) {
      return new Promise((resolve, reject) => {
        updateMessage(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 新增病例；
    postaddCase ({ commit }, params) {
      return new Promise((resolve, reject) => {
        postaddCase(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default patientManage
