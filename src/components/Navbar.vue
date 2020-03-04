<template>
  <div class="header clearfix">
    <b-navbar toggleable="md" >
      <b-navbar-brand href="#">NavBar</b-navbar-brand>

      <!-- Put the toggle here after the brand -->
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-collapse is-nav id="nav_collapse">

        <b-navbar-nav>
          <router-link class="nav-link" tag="a" active-class="active" to="/login"  v-if=" ! isAuth">Login</router-link>
          <router-link class="nav-link" tag="a" active-class="active" to="/register"  v-if=" ! isAuth">Register</router-link>
          <router-link class="nav-link" tag="a" active-class="active" to="/feed"  v-if=" isAuth">Feed</router-link>
          <router-link class="nav-link" tag="a" active-class="active" to="/products/create"  v-if=" isAuth">Create</router-link>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <router-link class="nav-link" tag="a" active-class="active" to="/logout"  v-on:click.native="logout()" v-if=" isAuth">Logout</router-link>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

  </div>

</template>

<script>
  export default {
    data () {
      return {
        isAuth: null
      }
    },
    computed: {
      authenticatedUser () {
        return this.getAuthenticatedUser()
      }
    },

    created() {
      this.isAuth = this.$auth.isAuthenticated()
      this.setAuthenticatedUser()
    },
    methods: {
      setAuthenticatedUser () {
        this.$http.get('api/user')
                .then( response => {
                  this.$auth.setAuthenticatedUser(response.data)

                })
      },
      getAuthenticatedUser(){
        return this.$auth.getAuthenticatedUser()
      },
      logout() {
        this.isAuth = false;
      }
    }
  }

</script>

<style>
</style>
