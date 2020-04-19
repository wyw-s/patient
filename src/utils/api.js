/**
 * 接口封装
 */

import http from './http.js'

// 新增患者
export const addPatient = (data) => {
  return http.post('/user/patient', data)
}

// 删除患者；
export const deletePatient = (userId) => {
  return http.delete(`/user/patient/${userId}`)
}

// 查询患者列表
export const queryPatient = (params) => {
  return http({
    method: 'GET',
    url: '/user/patient',
    params
  })
}

// 更新患者信息
export const updateMessage = (data) => {
  return http.put('/user/patient', data)
}

// 新增病例；
export const postaddCase = (data) => {
  return http.post('/history/case', data)
}

// 删除病例；
export const postDeleteCase = (id) => {
  return http.delete(`/history/case/${id}`)
}

// 修改病例；
export const postEditCase = (data) => {
  return http.put(`/history/case`, data)
}

// 查看当前患者以往病例
export const getCaseHistory = (params) => {
  return http.get('/history/case', { params })
}

// 显示当年每个月的就诊人数
export const getMonthNumber = () => {
  return http.get('/report/user/month')
}

// 显示当年每个月的账单总额
export const getmonthMoney = () => {
  return http.get('/report/account/month')
}
