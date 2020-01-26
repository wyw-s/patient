/**
 * 存储token值
 */

// 设置token
export const setToken = (val) => {
  window.sessionStorage.setItem('Token', val)
}

// 获取token
export const getToken = () => {
  return window.sessionStorage.getItem('Token')
}

// 删除token
export const remTOken = () => {
  window.sessionStorage.removeItem('Token')
}
