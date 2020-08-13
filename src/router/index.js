import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login/login.vue'
import home from '../views/home/home.vue'
import CaseControl from '../views/home/CaseControl/CaseControl.vue'
import CaseHistory from '../views/home/CaseHistory/CaseHistory.vue'
import statistics from '../views/home/statistics/statistics.vue'
import NProgress from 'nprogress'
import { getToken } from '../utils/storage.js'

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
        name: 'CaseHistory',
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

router.beforeEach((to, from, next) => {
  // 开启进度条；
  NProgress.start()
  if (to.path === '/login') {
    next()
  } else if (getToken()) {
    next()
  } else {
    next('/login')
  }
})

/*
* 路由导航后置钩子函数，
* 路由导航结束后，关闭进度条 */
router.afterEach(() => {
  NProgress.done()
})
export default router
