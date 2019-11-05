import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login.vue'
import Index from '../components/Index.vue'
import AccountManager from '../components/AccountManager'
import RoleManager from '../components/RoleManager'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      children: [
        {
          path: '/accountManager',
          name: 'accountManager',
          component: AccountManager
        },
        {
          path: '/roleManager',
          name: 'roleManager',
          component: RoleManager
        }
      ]
    }
  ]
})
