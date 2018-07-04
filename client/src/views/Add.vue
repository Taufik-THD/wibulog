<template>
  <div class="home">
    <Header/>
    <Add/>
  </div>
</template>

<script>
// @ is an alias to /src
import Add from '@/components/Add.vue'
import Header from '@/components/Header.vue'

export default {
  name: 'home',
  components: {
    Add,
    Header
  }
}
</script>
