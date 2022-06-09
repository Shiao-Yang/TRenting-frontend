<template>
  <div class="adminUser">
    <div ><router-link to="/" id="quit" @click.native="quit">退出</router-link></div>
    <el-container class="operation-wrapper" style="position: relative;top: 11px">
      <el-header class="el-header" style="height: 140px; padding: 0px">
        <div id="head">
          <h1 class="title">客 服 管 理 页 面</h1>
        </div>
      </el-header>
      <el-container>
        <el-aside class="el-aside">
          <el-menu
              :default-active="activeIndex"
              class="el-menu-vertical-demo"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#42b983">
            <router-link to="/admin/user">
              <el-menu-item index="1">
                <i class="el-icon-user"></i>
                <span slot="title">用户管理</span>
              </el-menu-item>
            </router-link>
            <router-link to="/admin/order">
              <el-menu-item index="2">
                <i class="el-icon-s-order"></i>
                <span slot="title">订单管理</span>
              </el-menu-item>
            </router-link>
            <router-link to="/admin/house">
              <el-menu-item index="3">
                <i class="el-icon-house"></i>
                <span slot="title">房源管理</span>
              </el-menu-item>
            </router-link>
            <router-link to="/admin/ticket">
              <el-menu-item index="4">
                <i class="el-icon-tickets"></i>
                <span slot="title">工单管理</span>
              </el-menu-item>
            </router-link>
            <router-link to="/admin/contract">
              <el-menu-item index="5">
                <i class="el-icon-connection"></i>
                <span slot="title">合同管理</span>
              </el-menu-item>
            </router-link>
          </el-menu>
        </el-aside>
        <el-main class="el-main">
          <router-view @active="active"/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "AdminUser",
  data() {
    return {
      activeIndex: ''
    }
  },
  methods: {
    active(num) {
      this.activeIndex = num;
    },
    quit() {
      this.$store.state.userInfo.id = ''
    }
  }
}
</script>

<style scoped>
  #head {
    height: 140px;
    width: 100%;
    background-image: url(../assets/AdminBackground.jpg);
    background-size: 100% 140px;
  }
  .title {
    text-align: center;
    margin: 0px;
    padding-top: 40px;
    font-size: 40px;
    font-family: MicrosoftYahei-regular,Arial,Helvetica,sans-serif;
    color: rgba(255, 255, 255, 0.85);
  }
  a {
    text-decoration: none;
  }
  a.router-link-exact-active {
    text-decoration: none;
  }
  .el-menu {
    height: 600px;
  }
  #quit {
    position: absolute;
    top: 0px;
    right: 20px;
    color: #6d6d73;
  }
  #quit:hover {
    color: #38383b;
  }
</style>