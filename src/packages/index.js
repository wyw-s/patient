import Vue from 'vue'

import WTag from './w-tag/index.js'

const components = [
  WTag
]

const install = function (Vue) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

Vue.use({
  install
})
