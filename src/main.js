import Vue from 'vue'
import App from './App.vue'
import Router from './routes.js'
import VueResource from 'vue-resource'
import Auth from './packages/auth/Auth'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import response from "vue-resource/src/http/response";
import * as VeeValidate from 'vee-validate';
import socket from 'socket.io-client';
socket('http://31.220.51.155/');
Vue.socket = socket;


Vue.use(BootstrapVue);
Vue.use(VueResource)
Vue.use(Auth)
Vue.use(VeeValidate)

Vue.http.options.root = 'http://localhost:8000'
Vue.http.headers.common['Authorization'] = 'Bearer ' + Vue.auth.getToken()

Vue.http.interceptors.push((request, next) => {
  if(response.status == 404)
    swal(response.status.toString(), response.body.error, 'error')
  else if(response.status == 404)
     swal(response.status.toString(), 'We are eperiencing a problem in our server')
})

Router.beforeEach(
  (to, from, next) => {
    if(to.matched.some(record => record.meta.forVisitors)) {
      if(Vue.auth.isAuthenticated()) {
        next({
          path: '/feed'
        })
      } else next()
    }

    else if(to.matched.some(record => record.meta.forAuth)) {
      if( ! Vue.auth.isAuthenticated()) {
        next({
          path: '/login'
        })
      } else next()
    }

    else next()
  }
)

new Vue({
  el: '#app',
  render: h => h(App),
  router: Router
})
