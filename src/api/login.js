/**
 * 用户登录;
 */

import http from '@/api/http.js'

// 登录;
export function userLogin (data) {
  return http({
    url: '/customer/user/login',
    method: 'POST',
    data
  })
}
