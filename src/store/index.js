import Vue from 'vue'
import Vuex from 'vuex'

import login from '@/store/login'
import patientManage from '@/store/patientManage'
import caseHistory from '@/store/caseHistory'
import statistics from '@/store/statistics'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    login,
    patientManage,
    caseHistory,
    statistics
  }
})
