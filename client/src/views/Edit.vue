<template>
  <div class="home">
    <Edit/>
    <Sidenav/>
  </div>
</template>

<script>
// @ is an alias to /src
import Edit from '@/components/Edit.vue'
import Sidenav from '@/components/Sidenav.vue'

export default {
  name: 'home',
  components: {
    Edit,
    Sidenav
  }
}
</script>
