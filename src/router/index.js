import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login.vue'
import Index from '../components/Index.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'Login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/index',
      name: 'index',
      children: Index
    }
  ]
})
