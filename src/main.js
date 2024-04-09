import Vue from 'vue'
import App from './App.vue'
import kui from 'kui-vue'
import router from './router'
import 'kui-vue/dist/k-ui.css'
import VueI18n from 'vue-i18n'
import http from './utils/http'
import store from './store/index'
import './assets/css/index.less'

import en from 'kui-vue/dist/locale/en'
import zh from 'kui-vue/dist/locale/zhCN'

Vue.config.productionTip = false


Vue.use(VueI18n)
Vue.use(kui)
Vue.prototype.$http = http

// import sys_zh from './lang/zh.js'
// import sys_en from './lang/en.js'


const i18n = new VueI18n({
  locale: 'en', // set default locale
  messages: { en, zh }, // set locale messages
})

Vue.use(kui, {
  i18n: (key, value) => i18n.t(key, value)
})

new Vue({
  i18n,
  router,
  store,
  render: h => h(App),
}).$mount('#app')
