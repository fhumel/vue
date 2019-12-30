import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: "/login",
      component: require('./components/authentication/Login'),
      meta: {
        forVisitors: true
      }
    },
    {
      path: "/register" ,
      component: require('./components/authentication/Register'),
      meta: {
        forVisitors: true
      }
    },
    {
      path: "/chat",
      component: require('./components/Chat'),
      meta: {
        forVisitors: true
      }
    },
    {
      path: "/chatPrivado",
      component: require('./components/ChatPrivado'),
      meta: {
        forVisitors: true
      }
    },
    {
      path: "/feed",
      component: require('./components/Feed'),
      meta: {
        forAuth: true
      }
    },
    {
      path: "/products/create",
      component: require('./components/product/Create'),
      meta: {
        forAuth: true
      }
    },
    {
      path: "/products/:product/edit",
      component: require('./components/product/Edit'),
      meta: {
        forAuth: true
      }
    },
  ],

  linkActiveClass:'active',

  mode: 'history'
})

export default router


