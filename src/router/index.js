import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login/login.vue'
import home from '../views/home/home.vue'
import CaseControl from '../views/home/CaseControl/CaseControl.vue'

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
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
