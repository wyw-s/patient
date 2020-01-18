/**
 * 存储token值
 */

// 设置token
export const setToken = (val) => {
  window.localStorage.setItem('Token', JSON.stringify(val))
}

// 获取token
export const getToken = () => {
  return window.localStorage.getItem('Token')
}

// 删除token
export const remTOken = () => {
  window.localStorage.removeItem('Token')
}
