<template>
  <div style="text-align: center;">
    <router-link to="admin/user" >to admin |</router-link>
    <router-link to="worker" > to worker</router-link>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>
