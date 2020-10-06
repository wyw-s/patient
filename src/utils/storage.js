/**
 * 本地存储 sessionStorage
 */

// 设置
export const setLocal = (key, val) => {
  if (typeof val === 'string') {
    window.localStorage.setItem(key, val)
  } else {
    window.localStorage.setItem(key, JSON.stringify(val))
  }
}

// 获取
export const getLocal = (key) => {
  return window.localStorage.getItem(key) || null
}

// 删除
export const remLocal = (key) => {
  window.localStorage.removeItem(key)
}
