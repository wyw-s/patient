import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'

const originVueRouter = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originVueRouter.call(this, location).catch(error => error)
}

Vue.use(VueRouter)

const routes = [
  // 用户登录
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/',
    component: () => import('@/views/layout'),
    redirect: 'statistics',
    children: [
      {
        path: 'statistics',
        name: 'statistics',
        component: () => import('@/views/statistics')
      },
      {
        path: 'caseManage',
        name: 'caseManage',
        component: () => import('@/views/caseManage')
      },
      {
        path: 'userCase',
        name: 'userCase',
        component: () => import('@/components/caseManage/userCase')
      },
      {
        path: 'caseHistory',
        name: 'CaseHistory',
        component: () => import('@/views/caseHistory')
      },
      {
        path: 'dictionaries',
        name: 'dictionaries',
        component: () => import('@/views/dictionaries')
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
  if (to.name !== 'login' && !window.sessionStorage.getItem('Token')) {
    next('/login')
    NProgress.done()
  } else next()
})

/*
* 路由导航后置钩子函数，
* 路由导航结束后，关闭进度条 */
router.afterEach(() => {
  NProgress.done()
})
export default router
