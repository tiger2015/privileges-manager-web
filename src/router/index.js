import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login.vue'
import Index from '../components/Index.vue'
import AccountManager from '../components/account/AccountManager'
import QueryAccount from '../components/account/QueryAccount'
import RoleManager from '../components/role/RoleManager'
import PermissionManager from '../components/permission/PermissionManager'
import QueryPermission from '../components/permission/QueryPermission'

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
          path: 'accountManager',
          name: 'accountManager',
          component: AccountManager,
          children: [
            {
              path: 'queryAccount',
              name: 'queryAccount',
              component: QueryAccount
            }
          ]
        },
        {
          path: 'roleManager',
          name: 'roleManager',
          component: RoleManager
        },
        {
          path: 'permissionManager',
          name: 'permissionManager',
          component: PermissionManager,
          children: [
            {
              path: 'queryPermission',
              name: 'queryPermission',
              component: QueryPermission
            }
          ]
        }
      ]
    }
  ]
})
