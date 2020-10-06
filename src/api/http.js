import axios from 'axios'
import router from '@/router'
import { tooltip } from '@/utils/globalMeth'

const http = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL
})

// 添加请求拦截器
http.interceptors.request.use(function (config) {
  // 判断token是否存在
  if (window.sessionStorage.getItem('Token') && !config.url.startsWith('/user/login')) {
    // 添加认证信息
    config.headers['Authorization'] = window.sessionStorage.getItem('Token')
  }
  // 在发送请求之前做些什么
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
http.interceptors.response.use(function (response) {
  if (!response.data.success && response.data.errorMessage.code === 403) {
    tooltip(`${response.data.errorMessage.message},即将跳转到登陆页面...`, 'warning')
    window.setTimeout(() => {
      router.push('/login')
    }, 2000)
    return
  }
  return response.data
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default http
