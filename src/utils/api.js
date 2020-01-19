
/**
 * 接口封装
 */

import http from './http.js'

// 新增患者
export const addPatient = (data) => {
  return http.post('/customer/user/patient', data)
}

// 查询患者列表
export const queryPatient = (data) => {
  return http({
    method: 'GET',
    url: '/customer/user/patient',
    params: data
  })
}

// 更新患者信息
export const updateMessage = (data) => {
  return http.put('/customer/user/patient', data)
}
