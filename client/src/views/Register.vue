<template>
  <div class="home">
    <Register/>
    <!-- <Sidenav/> -->
  </div>
</template>

<script>
// @ is an alias to /src
import Register from '@/components/Register.vue'
// import Sidenav from '@/components/Sidenav.vue'

export default {
  name: 'home',
  components: {
    Register,
    // Sidenav
  }
}
</script>

<style media="screen">
</style>
