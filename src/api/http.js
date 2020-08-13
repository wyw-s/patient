import axios from 'axios'
import { getToken } from '@/utils/storage.js'

const http = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL
})

// 添加请求拦截器
http.interceptors.request.use(function (config) {
  // 判断token是否存在
  if (getToken() && !config.url.startsWith('/user/login')) {
    // 添加认证信息
    config.headers['Authorization'] = getToken()
  }
  // 在发送请求之前做些什么
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
http.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  if (!response.data.success && response.data.errorMessage.code === 403) {
    window.vm.$notify({
      title: '提示',
      message: `${response.data.errorMessage.message},即将跳转到登陆页面...`,
      duration: 2000,
      type: 'warning'
    })
    window.setTimeout(() => {
      window.vm.$router.push('/login')
    }, 2000)
  }
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default http
