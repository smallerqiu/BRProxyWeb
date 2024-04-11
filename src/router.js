import Vue from "vue"
import VueRouter from "vue-router"
Vue.use(VueRouter)
import Layout from './components/system/layout'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
import { Home, Tv, Globe, StatsChart, Timer, People, DocumentText, Hammer, Link, Key } from 'kui-icons'

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/login',
      meta: { title: 'Login', icon: '' },
      component: () => import(/*webpackChunkName:'login'*/'./pages/login'),
      hidden: true,
    },
    {
      path: '/',
      component: Layout,
      meta: { title: 'Home', icon: '' },
      children: [
        {
          path: '/',
          name: 'Home',
          meta: { title: '盘仪表', icon: Home },
          component: () => import(/*webpackChunkName:'Home'*/'./pages/home')
        }
      ]
    },
    {
      path: '/admin',
      component: Layout,
      meta: { title: 'Admin', icon: Hammer },
      hidden: (localStorage.getItem('role') != 'admin'),
      // hidden: (localStorage.getItem('role') == 'admin'),
      children: [
        {
          path: '/admin/keys',
          name: 'Admin',
          meta: { title: 'API Keys', icon: Key },
          component: () => import(/*webpackChunkName:'Home'*/'./pages/keys')
        },
        {
          path: '/admin/sessions',
          name: 'huati',
          meta: { title: '话题列表', icon: Hammer },
          component: () => import(/*webpackChunkName:'Home'*/'./pages/huati'),
          hidden: true,
        }
      ]
    },
  ]
})


export default router