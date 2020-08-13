import Vue from 'vue'
import Vuex from 'vuex'

import patientManage from '@/store/patientManage'
import login from '@/store/login'

Vue(Vuex)
export default new Vuex.Store({
  modules: {
    patientManage,
    login
  }
})
