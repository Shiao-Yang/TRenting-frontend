<template>
  <div id="app">
    <router-view></router-view>
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
      },
    },
    watch: {
      '$route':'getRoute'
    },

    created() {
      // 在页面加载时读取sessionStorage里的状态信息
      if (sessionStorage.getItem('store')) {
        this.$store.replaceState(
            Object.assign(
                {},
                this.$store.state,
                JSON.parse(sessionStorage.getItem('store'))
            )
        )
      }

      // 在页面刷新时将vuex里的信息保存到sessionStorage里
      // beforeunload事件在页面刷新时先触发
      window.addEventListener('beforeunload', () => {
        sessionStorage.setItem('store', JSON.stringify(this.$store.state))
      })
    },
  }
</script>
<style>
* {
  margin: 0;
  padding: 0;
}
nav {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}

#app{
  display: block;
  font: 10px/1.5 Microsoft YaHei,Heiti SC,tahoma,arial,Hiragino Sans GB,"\5B8B\4F53",sans-serif;
  -webkit-font-smoothing: antialiased;
}
.el-dialog {
  margin-top: 80px !important;
}
</style>
