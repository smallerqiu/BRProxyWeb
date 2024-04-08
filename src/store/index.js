import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import getters from './getters'

import tabViews from './modules/tabViews'
export default new Vuex.Store({

  modules: {
    tabViews,
  },
  getters,
})

