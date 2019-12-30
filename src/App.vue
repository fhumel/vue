<template>
  <div class="container" id="app">
    <navbar></navbar>
    <router-view></router-view>
  </div>
</template>

<script>
  import Navbar from './components/Navbar.vue'
  import Login from './components/authentication/Login'
  import Register from './components/authentication/Register'

  export default {
    components: {
        'navbar': Navbar,
        'login': Login,
        'resgister': Register
    }
  }
</script>

<style>

</style>
