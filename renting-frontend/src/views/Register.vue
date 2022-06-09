<template>
  <div class="login">
    <div class="login_frame">
      <h1 class="title">注册</h1>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="form">
        <el-form-item prop="username">
          <el-input
              placeholder="用户名"
              type="username"
              prefix-icon="el-icon-user-solid"
              v-model="ruleForm.username"
              clearable>
          </el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input
              placeholder="邮箱"
              type="email"
              v-model="ruleForm.email"
              prefix-icon="el-icon-link"
              auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input
              placeholder="姓名"
              type="name"
              v-model="ruleForm.name"
              prefix-icon="el-icon-info"
              auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item id="password" prop="password_1">
          <el-input
              placeholder="密码"
              show-password
              type="password"
              prefix-icon="el-icon-lock"
              v-model="ruleForm.password_1"
              autocomplete="off"
              @keyup.enter.native="login"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password_2">
          <el-input
              placeholder="确认密码"
              show-password
              type="password"
              prefix-icon="el-icon-lock"
              v-model="ruleForm.password_2"
              autocomplete="off"
              @keyup.enter.native="register('ruleForm')"
          ></el-input>
        </el-form-item>
        <el-form-item class="login_btn">
          <el-button type="success" @click="register">注&nbsp;&nbsp;册</el-button>
          <el-button @click="resetForm('ruleForm')">重&nbsp;&nbsp;置</el-button>
        </el-form-item>
        <el-form-item class="register_link">
          <el-link @click="login" type="info" icon="" class="login_link">已有账号？立即登录</el-link>
          <span class="division">
            &nbsp;&nbsp;| &nbsp;&nbsp;
          </span>
          <el-link type="info" class="cancel_link" @click="toHome">取消</el-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import qs from "qs";

export default {
  name: "Register",
  data() {
    var validatePass1 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.password_2 !== '') {
          this.$refs.ruleForm.validateField('password_2');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.password_1) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    var checkUserName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error("请输入用户名"));
      }
      else {
        callback();
      }
    };
    var checkEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error("请输入邮箱"));
      }
      else {
        callback();
      }
    };
    return {
      ruleForm: {
        username: '',
        email: '',
        name: '',
        password_1: '',
        password_2: '',
      },
      rules: {
        username: [
          { validator: checkUserName, trigger: 'blur'}
        ],
        email: [
          { validator: checkEmail, trigger: 'blur'}
        ],
        password_1: [
          { validator: validatePass1, trigger: 'blur' }
        ],
        password_2: [
          { validator: validatePass2, trigger: 'blur' }
        ],
      }
    };
  },
  methods: {
    register() {
      var formData = {
        'username': this.ruleForm.username,
        'email': this.ruleForm.email,
        'name': this.ruleForm.name,
        'password_1': this.ruleForm.password_1,
        'password_2': this.ruleForm.password_2,
      };
      console.log(formData);

      this.$axios({
        method: 'post',
        url: "http://127.0.0.1:8000/login_register/register/",
        data: qs.stringify(formData)
      })
      .then(res => {
        console.log(res.data);
        switch(res.data.errno) {
          case 0:
            /*
            this.$store.dispatch('saveUserInfo', {
              user: {
                'username': this.ruleForm.username,
                'authorization': 1,
              }
            });
             */
            var a = localStorage.getItem('user');
            console.log(a);
            this.$message.success('注册成功！');
            setTimeout(() => {
              this.$router.push('/login');
            },1000);
            break;
          case 1001:
            this.$message.warning("请求方式错误！");
            break;
          case 1002:
            this.$message.warning("两次输入的密码不一致！");
            break;
          case 1003:
            this.$message.warning("用户名不合法！");
            break;
          case 1004:
            this.$message.warning("用户名已存在！");
            break;
          case 1005:
            this.$message.warning("密码必须包含数字和字母！");
            break;
        }
      })
      .catch(err => {
        console.log(err);
      })

    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    login() {
      this.$router.push("/login");
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
  height: 500px;
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
.login_btn {
  text-align: center;
}
.login_btn button{
  width: 40%;
  height: 38px;
  font-size: 15px;
  vertical-align:middle;
  text-align: center;
}
.register_link {
  position: absolute;
  left: 90px;
}
.register_link link {
  font-size: 20px;
  color: #42b983;
}
/*.login_link {
  position: absolute;
  top: 0;
  left: 30px;
}
.division {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
.cancel_link {
  position: absolute;
  top: 0;
  left: 190px;
}*/
</style>