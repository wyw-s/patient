import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login/login.vue'
import home from '../views/home/home.vue'
import CaseControl from '../views/home/CaseControl/CaseControl.vue'
import CaseHistory from '../views/home/CaseHistory/CaseHistory.vue'
import statistics from '../views/home/statistics/statistics.vue'

Vue.use(VueRouter)

const routes = [
  // 用户登录
  {
    path: '/login',
    component: login
  },
  {
    path: '/',
    component: home,
    children: [
      {
        // 默认路由
        path: '',
        component: CaseControl
      },
      {
        path: '/CaseHistory',
        component: CaseHistory
      },
      {
        path: '/statistics',
        component: statistics
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
