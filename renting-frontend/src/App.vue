<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
  export default {
    methods: {
      getRoute() {
        let path = this.$route.path;
        // console.log("path为"+path);
        if (path ==="/admin/user"||path ==="/admin/order"||path ==="/admin/house"||path ==="/admin/ticket"||path==="/admin/contract") {
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
.el-dialog {
  margin-top: 80px !important;
}
</style>
