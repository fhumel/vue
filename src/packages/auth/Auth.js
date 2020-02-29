export default function (Vue) {

  let authenticatedUser = {};

  Vue.auth = {
    setToken: (token, expiration) => {
      localStorage.setItem('token', token)
      localStorage.setItem('expiration', expiration)
    },

    setUser: (email) => {
      localStorage.setItem('email', email)
    },

    getUser: () => {
      email = localStorage.getItem('email')
      return email;
    },

    getToken () {
      var token = localStorage.getItem('token')
      var expiration = localStorage.getItem('expiration')

      if(! token || ! expiration)
        return null

      if (Date.now() > parseInt(expiration)) {
        this.destroyToken()
        return null
      } else {
        return token
      }
    },

    destroyToken () {
      localStorage.removeItem('token')
      localStorage.removeItem('expiration')
    },

    isAuthenticated () {
      if(this.getToken())
        return true
      else
        return false
    },

    setAuthenticatedUser (data) {
      authenticatedUser = data
    },

    getAuthenticatedUSer () {
      return authenticatedUser
    }

  }

  Object.defineProperties(Vue.prototype, {
    $auth: {
      get () {
        return Vue.auth
      }
    }
  })
}
