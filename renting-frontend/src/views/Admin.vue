<template>
  <div class="adminUser">
    <el-container class="operation-wrapper">
      <el-header class="el-header">
        <h1 class="head">客服管理页面</h1>
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
            <router-link to="/admin/workOrder">
              <el-menu-item index="4">
                <i class="el-icon-files"></i>
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
    }
  }
}
</script>

<style scoped>

  .head {
    text-align: center;
    margin: 0px;
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
</style>