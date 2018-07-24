<template>
  <div class="home">
    <Profile />
    <Sidenav />
  </div>
</template>

<script>
// @ is an alias to /src
import Profile from '@/components/Profile.vue'
import Sidenav from '@/components/Sidenav.vue'

export default {
  name: 'home',
  components: {
    Profile,
    Sidenav
  }
}
</script>
