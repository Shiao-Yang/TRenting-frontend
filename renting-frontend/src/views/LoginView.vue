<template>
  <div class="login">
    <div class="login_frame">
      <h1 class="title">登录</h1>
      <el-form ref="form" :model="form" class="form">
        <el-form-item prop="username">
          <el-input
              placeholder="用户名或邮箱"
              type="username"
              prefix-icon="el-icon-user-solid"
              v-model="form.username"
              clearable>
          </el-input>
        </el-form-item>
        <el-form-item id="password" prop="password">
          <el-input
              placeholder="密码"
              show-password
              type="password"
              prefix-icon="el-icon-lock"
              v-model="form.password"
              autocomplete="off"
              @keyup.enter.native="login"
          ></el-input>
        </el-form-item>
        <el-form-item class="login_btn">
          <el-button type="success">登&nbsp;&nbsp;录</el-button>
        </el-form-item>
        <el-form-item class="register_link">
          <el-link type="info" icon="">立即注册</el-link> &nbsp;&nbsp;| &nbsp;&nbsp;
          <el-link type="info">忘记密码</el-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginView",
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },

}

</script>

<style scoped>
.login {
  width: 100%;
  height: 100%;
  background: url("../assets/login_background_2.jfif") no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -10;
}
.login_frame {
  width: 350px;
  height: 330px;
  padding: 20px 25px 0 25px;
  border: 0;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  line-height: 40px;
  display: inline-block;
  background-color: rgb(255, 255, 255, 0.85);
  border-radius: 20px;
  z-index: 1;
}
.title {
  color: rgba(85,79,63,0.82)
}
.login_btn button{
  width: 100%;
  height: 38px;
  font-size: 15px;
  vertical-align:middle;
  text-align: center;
}
.register_link link {
  font-size: 20px;
  color: #42b983;
}
</style>