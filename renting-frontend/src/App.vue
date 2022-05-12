<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/admin/user" id="admin" ref="admin">Admin</router-link>
    </nav>
    <router-view/>
  </div>
</template>
<script>
  export default {
    methods: {
      getRoute() {
        let path = this.$route.path;
        // console.log("path为"+path);
        if (path ==="/admin/user"||path ==="/admin/order"||path ==="/admin/house"||path ==="/admin/workOrder"||path==="/admin/contract") {
          this.$refs.admin.$el.style.color = '#42b983';
          // console.log("color为"+link.style.color);
        } else {
          this.$refs.admin.$el.style.color = '#2c3e50';
          // console.log("color为"+link.style.color);
        }
      }
    },
    watch: {
      '$route':'getRoute'
    }
  }
</script>
<style>
nav {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
