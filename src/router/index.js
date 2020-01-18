import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login/login.vue'
// import home from '../views/home/home.vue'

Vue.use(VueRouter)

const routes = [
  // 用户登录
  {
    path: '/login',
    component: login
  }
]

const router = new VueRouter({
  routes
})

export default router
