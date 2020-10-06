import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import 'element-ui/lib/theme-chalk/index.css'
import '@/packages/index.js'
import '@/assets/styles/index.less'
import '@/assets/icon/iconfont.css'
import 'nprogress/nprogress.css'
import { setLocal, getLocal, remLocal } from '@/utils/storage'
import { tooltip } from '@/utils/globalMeth'

Vue.config.productionTip = false

Vue.prototype.$setLocal = setLocal
Vue.prototype.$getLocal = getLocal
Vue.prototype.$remLocal = remLocal
Vue.prototype.$tooltip = tooltip

window.vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
