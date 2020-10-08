/**
 * 患者管理
 */

import http from '@/api/http.js'

// 新增患者
export function addPatient (data) {
  return http({
    url: '/customer/user/patient',
    method: 'POST',
    data
  })
}

// 删除患者；
export function deletePatient (userId) {
  return http({
    url: `/customer/user/patient/${userId}`,
    method: 'DELETE'
  })
}

// 查询患者列表
export function queryPatient (params) {
  return http({
    method: 'GET',
    url: '/customer/user/patient',
    params
  })
}

// 更新患者信息
export function updateMessage (data) {
  return http({
    url: '/customer/user/patient',
    method: 'PUT',
    data
  })
}

// 新增病例；
export function postaddCase (data) {
  return http({
    url: '/customer/history/case',
    method: 'POST',
    data
  })
}

// 删除病例；
export function postDeleteCase (id) {
  return http({
    url: `/customer/history/case/${id}`,
    method: 'DELETE'
  })
}

// 修改病例；
export function postEditCase (data) {
  return http({
    url: '/customer/history/case',
    method: 'PUT',
    data
  })
}

// 查看当前患者以往病例
export function getCaseHistory (params) {
  return http({
    url: '/customer/history/case',
    method: 'GET',
    params
  })
}

// 显示当年每个月的就诊人数
export function getMonthNumber () {
  return http({
    url: '/customer/report/user/month',
    method: 'GET'
  })
}

// 显示当年每个月的账单总额
export function getmonthMoney () {
  return http({
    url: '/customer/report/account/month',
    method: 'GET'
  })
}
