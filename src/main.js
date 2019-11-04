// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import VueResource from 'vue-resource'
import Login from './components/Login'
import Router from 'vue-router'
Vue.use(VueResource)
Vue.use(Router)
Vue.config.productionTip = false

const originalPush = Router.prototype.push

Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {Login}
})
