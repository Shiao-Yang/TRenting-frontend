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
        <el-form-item id="password" prop="pass">
          <el-input
              placeholder="密码"
              show-password
              type="password"
              prefix-icon="el-icon-lock"
              v-model="ruleForm.pass"
              autocomplete="off"
              @keyup.enter.native="login"
          ></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input
              placeholder="确认密码"
              show-password
              type="password"
              prefix-icon="el-icon-lock"
              v-model="ruleForm.checkPass"
              autocomplete="off"
              @keyup.enter.native="register('ruleForm')"
          ></el-input>
        </el-form-item>
        <el-form-item class="login_btn">
          <el-button type="success" @click="submitForm('ruleForm')">注&nbsp;&nbsp;册</el-button>
          <el-button @click="resetForm('ruleForm')">重&nbsp;&nbsp;置</el-button>
        </el-form-item>
        <el-form-item class="register_link">
          <el-link type="info" icon="" class="login_link">已有账号？立即登录</el-link>
          <span class="division">
            &nbsp;&nbsp;| &nbsp;&nbsp;
          </span>
          <el-link type="info" class="cancel_link">取消</el-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
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
        pass: '',
        checkPass: '',
      },
      rules: {
        username: [
          { validator: checkUserName, trigger: 'blur'}
        ],
        email: [
          { validator: checkEmail, trigger: 'blur'}
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
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
  height: 450px;
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
  width: 40%;
  height: 38px;
  font-size: 15px;
  vertical-align:middle;
  text-align: center;
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