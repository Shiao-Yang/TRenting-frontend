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
          ></el-input>
        </el-form-item>
        <el-form-item class="login_btn">
          <el-button @click="login" type="success">登&nbsp;&nbsp;录</el-button>
        </el-form-item>
        <el-form-item class="register_link">
          <el-link @click="register" type="info" icon="">立即注册</el-link> &nbsp;&nbsp;| &nbsp;&nbsp;
          <el-link type="info" @click="toHome">忘记密码</el-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import qs from 'qs';
import axios from "axios";
export default {
  name: "LoginView",
  data() {
    return {
      form: {
        username: '',
        password: '',
      }
    }
  },
  methods: {
    login() {
      var formData = {
        'username': this.form.username,
        'password': this.form.password,
      };
      //console.log(formData);

      this.$axios({
        method: 'post',
        url: "http://127.0.0.1:8000/login/",
        data: qs.stringify(formData)
      })
      .then(res => {
        console.log(res)
        if(res.data.errno === 0) {
          //alert("登陆成功");
          this.$message.success("登陆成功");
          console.log(res.data);
          this.$store.dispatch('saveUserInfo', {
            user: {
              'username': this.form.username,
              'authorization': 1,
            }
          });
          //let user = localStorage.getItem('user');
          //console.log(user);
          this.$router.push('/');
        }
        else {
          this.$message.error("用户名或密码错误");
        }
      })
          .catch(function (error) {
            console.log(error);
            /*
            if (error.response) {
              // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              // 请求已经成功发起，但没有收到响应
              // `error.request` 在浏览器中是 XMLHttpRequest 的实例，
              // 而在node.js中是 http.ClientRequest 的实例
              console.log(error.request);
            } else {
              // 发送请求时出了点问题
              console.log('Error', error.message);
            }
            console.log(error.config);
            */

          });
    },
    getData() {
      this.$axios({

      })
    },
    register() {
      this.$router.push("/register");
    },
    toHome() {
      this.$router.push("/");
    },
  }
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
  height: 320px;
  padding: 20px 25px 0 25px;
  border: 0;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  line-height: 70px;
  display: inline-block;
  background-color: rgb(255, 255, 255, 0.85);
  border-radius: 20px;
  z-index: 1;
}
.title {
  font-size: 30px;
  color: rgba(85,79,63,0.82);
  text-align: center;
}

.login_btn button{
  width: 100%;
  height: 38px;
  font-size: 15px;
  vertical-align:middle;
  text-align: center;
}
.register_link {
  text-align: center;
}
.register_link link {
  font-size: 20px;
  color: #42b983;

}
</style>