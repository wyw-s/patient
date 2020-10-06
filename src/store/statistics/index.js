
/**
 * 数据view接口
 */
import {
  getMonthNumber,
  getmonthMoney
} from '@/api/patientManage'

const statistics = {
  actions: {
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

export default statistics
