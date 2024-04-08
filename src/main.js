import Vue from 'vue'
import App from './App.vue'
import kui from 'kui-vue'
import router from './router'
import 'kui-vue/dist/k-ui.css'
Vue.config.productionTip = false
Vue.use(kui)
import http from './utils/http'
Vue.prototype.$http = http

import store from './store/index'
import './assets/css/index.less'
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
