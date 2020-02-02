import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: login
  }, {
    path: '/',
    // name: 'tab-bar',
    component: () => import('@/views/tab-bar'),
    children: [{
      path: '',
      name: 'home',
      component: () => import('@/views/home')

    }, {
      path: 'qs',
      name: 'qs',
      component: () => import('@/views/qs')
    }, {
      path: 'videos',
      name: 'videos',
      component: () => import('@/views/videos')
    }, {
      path: 'mine',
      name: 'mine',
      component: () => import('@/views/mine')
    }]

  }, {
    path: '/user/:userId',
    name: 'user',
    component: () => import('@/views/user')
  }, {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search')
  }

]

const router = new VueRouter({
  routes
})

export default router
