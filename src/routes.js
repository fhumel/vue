import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: "/login",
      component: require('./components/authentication/Login.vue').default,
      meta: {
        forVisitors: true
      }
    },
    {
      path: "/register" ,
      component: require('./components/authentication/Register').default,
      meta: {
        forVisitors: true
      }
    },
    {
      path: "/chat",
      component: require('./components/Chat').default,
      meta: {
        forVisitors: true
      }
    },
    {
      path: "/chatPrivado",
      component: require('./components/ChatPrivado').default,
      meta: {
        forVisitors: true
      }
    },
    {
      path: "/feed",
      component: require('./components/Feed').default,
      meta: {
        forAuth: true
      }
    },
    {
      path: "/products/create",
      component: require('./components/product/Create').default,
      meta: {
        forAuth: true
      }
    },
    {
      path: "/products/:product/edit",
      component: require('./components/product/Edit').default,
      meta: {
        forAuth: true
      }
    },
  ],

  linkActiveClass:'active',

  mode: 'history'
})

export default router


