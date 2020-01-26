/**
 * 接口封装
 */

import http from './http.js'

// 新增患者
export const addPatient = (data) => {
  return http.post('/customer/user/patient', data)
}

// 查询患者列表
export const queryPatient = (params) => {
  return http({
    method: 'GET',
    url: '/customer/user/patient',
    params
  })
}

// 更新患者信息
export const updateMessage = (data) => {
  return http.put('/customer/user/patient', data)
}

// 新增病例；
export const postaddCase = (data) => {
  return http.post('/customer/history/case', data)
}

// 查看当前患者以往病例
export const getCaseHistory = (params) => {
  return http.get('/customer/history/case', { params })
}

// 显示当年每个月的就诊人数
export const getMonthNumber = () => {
  return http.get('/customer/report/user/month')
}

// 显示当年每个月的账单总额
export const getmonthMoney = () => {
  return http.get('/customer/report/account/month')
}
