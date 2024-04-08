import Vue from "vue"
import VueRouter from "vue-router"
Vue.use(VueRouter)
import Layout from './components/system/layout'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
import { Home, Tv, Globe,StatsChart, Timer, People, DocumentText, Hammer,Link } from 'kui-icons'

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Layout,
      meta: { title: '首页', icon: '' },
      children: [
        {
          path: '/',
          name: 'Home',
          meta: { title: '盘仪表', icon: Home },
          component: () => import(/*webpackChunkName:'Home'*/'./pages/home')
        }
      ]
    },
  ]
})


export default router