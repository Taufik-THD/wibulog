<template>
  <div class="home">
    <HelloWorld/>
    <Sidenav/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Sidenav from '@/components/Sidenav.vue'

export default {
  name: 'home',
  components: {
    HelloWorld,
    Sidenav
  }
}
</script>
