export default function (Vue) {
  let authenticatedUser = {};

  Vue.auth = {

    data(){
      return{
        authenticatedUser: {}
      }
    },
    //set token
    setToken (token, expiration) {
      localStorage.setItem('token', token)
      localStorage.setItem('expiration', expiration)
    },

    setUser: (email) => {
      localStorage.setItem('email', email)
    },

    //get token
    getToken() {
      var token = localStorage.getItem('token')
      var expiration = localStorage.getItem('expiration')

      if( !token || !expiration)
        return null
      if(Date.now() > parseInt(expiration)){
        this.destroyToken()
        return null
      }
      else{
        return token
      }
    },
    //destroy token
    destroyToken() {
      localStorage.removeItem('token')
      localStorage.removeItem('expiration')
    },
    //isAuthenticated
    isAuthenticated() {
      if(this.getToken())
        return true
      else
        return false
    },

    setAuthenticatedUser(data){
      return this.authenticatedUser = data;
    },

    getAuthenticatedUser(){
      return authenticatedUser;
    },
  }

  Object.defineProperties(Vue.prototype, {
    $auth: {
      get() {
        return Vue.auth
      }
    }
  })
}
