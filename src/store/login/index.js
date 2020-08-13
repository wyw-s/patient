/**
 * 登录接口
 */
import {
  addPatient,
  deletePatient,
  queryPatient,
  updateMessage,
  postaddCase,
  postDeleteCase,
  postEditCase,
  getCaseHistory,
  getMonthNumber,
  getmonthMoney
} from '@/api/patientManage'

const patientManage = {
  action: {
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
    },

    // 删除病例；
    postDeleteCase ({ commit }, params) {
      return new Promise((resolve, reject) => {
        postDeleteCase(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 修改病例；
    postEditCase ({ commit }, params) {
      return new Promise((resolve, reject) => {
        postEditCase(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 查看当前患者以往病例
    getCaseHistory ({ commit }, params) {
      return new Promise((resolve, reject) => {
        getCaseHistory(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 显示当年每个月的就诊人数
    getMonthNumber () {
      return new Promise((resolve, reject) => {
        getMonthNumber().then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 显示当年每个月的账单总额
    getmonthMoney () {
      return new Promise((resolve, reject) => {
        getmonthMoney().then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default patientManage
