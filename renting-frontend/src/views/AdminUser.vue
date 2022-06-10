<template>
  <div className="adminUser">
    <template>
      <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
        <!-- 用户管理 -->
        <el-tab-pane class="el-tab-pane" label="用户管理" name="first">
          <div style="margin-top: 15px;">
            <!-- 搜索用户 -->
            <el-input style="width: 850px" placeholder="请输入内容" v-model="input1"
                      class="input-with-select" @keyup.enter.native="searchUser()" clearable>
              <el-select style="width: 110px" v-model="select1" slot="prepend" placeholder="请选择">
                <el-option label="用户ID" value="1"></el-option>
                <el-option label="用户姓名" value="2"></el-option>
              </el-select>
              <el-button slot="append" icon="el-icon-search" @click="searchUser()" ></el-button>
            </el-input>
          </div>
          <el-empty description="暂无用户" :image-size="200" v-if="user.length === 0"></el-empty>
          <el-empty description="搜索为空" :image-size="200" v-if="user.length !== 0 && this.noUserVisible"></el-empty>
          <!-- 显示用户 -->
            <el-descriptions v-for='(item,index) in user' v-if="item.visible" :key="index"
                             class="margin-top" :title="'ID: '+item.userid" :column="3" border >
              <template slot="extra">
                <!-- 修改用户信息 -->
                <el-button type="primary" id="modify" size="small" @click="modify(index)">修改</el-button>
                  <el-dialog title="修改信息" :visible.sync="dialogFormVisible1">
                   <el-form :model="form">
                     <el-form-item label="用户名" :label-width="formLabelWidth" required>
                       <el-input v-model="form.username" autocomplete="off" class="input" placeholder="仅由字母数字下划线组成" clearable></el-input>
                     </el-form-item>
                     <el-form-item label="手机号" :label-width="formLabelWidth" required>
                       <el-input v-model="form.phoneNum" autocomplete="off" class="input" placeholder="11位数字" clearable></el-input>
                     </el-form-item>
                     <el-form-item label="邮箱" :label-width="formLabelWidth" required>
                       <el-input v-model="form.email" autocomplete="off" class="input" clearable></el-input>
                     </el-form-item>
                     <el-form-item label="年龄" :label-width="formLabelWidth" required>
                       <el-input v-model="form.age" autocomplete="off" class="input" clearable></el-input>
                     </el-form-item>
                     <el-form-item label="性别" :label-width="formLabelWidth" required>
                       <el-radio v-model="form.sex" label="1">男</el-radio>
                       <el-radio v-model="form.sex" label="0">女</el-radio>
                     </el-form-item>
                   </el-form>
                    <div slot="footer" class="dialog-footer">
                      <el-button @click="dialogFormVisible1 = false" class="cancel" style="margin-right: 10px">取 消</el-button>
                      <el-popconfirm
                          confirm-button-text='是的'
                          cancel-button-text='不是'
                          @confirm="Confirm()"
                          title="是否确定要提交修改？"
                      >
                        <el-button slot="reference" type="primary"  class="confirm">确 定</el-button>
                      </el-popconfirm>
                    </div>
                  </el-dialog>
                <!-- 删除用户 -->
                <el-button type="primary" id="delete" size="small" @click="open(index)">删除</el-button>
              </template>
              <!-- 用户项 -->
              <el-descriptions-item label-class-name="label-userid" content-class-name="content-userid">
                <template slot="label">
                  用户名
                </template>
                {{item.username}}
              </el-descriptions-item>
              <el-descriptions-item label-class-name="label-phoneNum" content-class-name="content-phoneNum">
                <template slot="label">
                  手机号
                </template>
                {{ item.phoneNum }}
              </el-descriptions-item>
              <el-descriptions-item label-class-name="label-email">
                <template slot="label">
                  邮箱
                </template>
                {{ item.email }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  姓名
                </template>
                {{ item.name }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  年龄
                </template>
                {{ item.age }}
              </el-descriptions-item>
              <el-descriptions-item v-if="item.sex==='1'">
                <template slot="label">
                  性别
                </template>
                男
              </el-descriptions-item>
              <el-descriptions-item v-else-if="item.sex==='0'">
                <template slot="label">
                  性别
                </template>
                女
              </el-descriptions-item>
              <el-descriptions-item v-else>
                <template slot="label">
                  性别
                </template>
              </el-descriptions-item>
            </el-descriptions>

        </el-tab-pane>
        <el-tab-pane class="el-tab-pane" label="师傅管理" name="second">
          <!-- 师傅管理 -->
          <div style="margin-top: 15px;">
            <!-- 搜索师傅 -->
            <el-input style="width: 850px" placeholder="请输入内容" v-model="input2"
                      class="input-with-select" @keyup.enter.native="searchWorker" clearable>
              <el-select style="width: 110px" v-model="select2" slot="prepend" placeholder="请选择">
                <el-option label="师傅ID" value="1"></el-option>
                <el-option label="师傅姓名" value="2"></el-option>
              </el-select>
              <el-button slot="append" icon="el-icon-search" @click="searchWorker"></el-button>
            </el-input>
            <!-- 导入师傅 -->
            <el-button type="primary" id="upload" @click="upload">
              导入<i class="el-icon-upload el-icon--right"></i>
            </el-button>
              <el-dialog title="导入师傅" :visible.sync="dialogFormVisible2" v-if="dialogFormVisible2">
                <el-form :model="form2" :rules="rules">
                  <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
                    <el-input v-model="form2.username" autocomplete="off" class="input" placeholder="'#'加字母或数字或下划线" clearable></el-input>
                  </el-form-item>
                  <el-form-item label="密码" :label-width="formLabelWidth" prop="pwd">
                    <el-input v-model="form2.pwd" autocomplete="off" class="input" placeholder="必须包含字母和数字，长度8-16" clearable></el-input>
                  </el-form-item>
                  <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
                    <el-input v-model="form2.name" autocomplete="off" class="input" clearable></el-input>
                  </el-form-item>
                  <el-form-item label="手机号" :label-width="formLabelWidth" prop="tel">
                    <el-input v-model="form2.phoneNum" autocomplete="off" class="input" required placeholder="11位数字" clearable></el-input>
                  </el-form-item>
                  <el-form-item label="照片" :label-width="formLabelWidth" required>
                    <el-upload
                        class="upload-demo"
                        action="#"
                        ref="upload"
                        :auto-upload="false"
                        :on-change="onChangeUpload"
                        :show-file-list="false"
                        accept=".jpg,.jpeg,.png,.JPG,.JPEG"
                        :limit="1">
                      <el-button size="small" type="primary" class="upload">点击上传</el-button>
                    </el-upload>
                    <img v-if="form2.photo" :src="form2.photo" width="120px" height="120px">
                  </el-form-item>
                  <el-form-item label="信息" :label-width="formLabelWidth">
                    <el-input type="textarea" v-model="form2.description" autocomplete="off" class="input" clearable></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible2 = false" class="cancel" style="margin-right: 10px">取 消</el-button>
                  <el-popconfirm
                      confirm-button-text='是的'
                      cancel-button-text='不是'
                      @confirm="importWorker()"
                      title="是否确定导入信息？"
                  >
                    <el-button slot="reference" type="primary"  class="confirm">确 定</el-button>
                  </el-popconfirm>
                </div>
              </el-dialog>
          </div>
          <el-empty description="暂无师傅" :image-size="200" v-if="worker.length === 0"></el-empty>
          <el-empty description="搜索为空" :image-size="200" v-if="worker.length !== 0 && this.noWorkerVisible"></el-empty>
          <!-- 显示师傅 -->
          <el-descriptions v-for='(item,index) in worker' v-if="item.visible" class="margin-top" :key="index"
                           :title="'ID: '+item.workerid" :column="3" border >
            <template slot="extra">
              <!-- 删除师傅 -->
              <el-button type="primary" id="delete" size="small" @click="open2(index)">删除</el-button>
            </template>
            <!-- 师傅项 -->
            <el-descriptions-item label-class-name="label-userid" content-class-name="content-userid">
              <template slot="label">
                用户名
              </template>
              {{item.username}}
            </el-descriptions-item>
            <el-descriptions-item label-class-name="label-name" content-class-name="content-name">
              <template slot="label">
                姓名
              </template>
              {{ item.name }}
            </el-descriptions-item>
            <el-descriptions-item label-class-name="label-workerTel">
              <template slot="label">
                手机号
              </template>
              {{ item.phoneNum }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                照片
              </template>
              <el-image :src="item.photoSrc" style="width: 130px;height: 130px"></el-image>
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                介绍
              </template>
              {{ item.description }}
            </el-descriptions-item>
          </el-descriptions>
        </el-tab-pane>
      </el-tabs>
    </template>
  </div>
</template>

<script>
import qs from "qs";

export default {
  created() {
    this.$emit('active',1);
    window.myData = this;
    this.get_users_info();
    this.get_workers_info();
  },
  name: "AdminUser",
  data() {
    return {
      activeName: 'first',
      input1: '',
      input2: '',
      select1: '1',
      select2: '1',
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      formLabelWidth: '120px',
      Index : '0',
      noUserVisible : false,
      noWorkerVisible: false,
      rules: {
        username: [
          { required: true, message: "请输入昵称", trigger: "blur" },
        ],
        pwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
        ],
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
        ],
        tel: [
          { required: true, message: "请输入手机号", trigger: "blur" }
        ]
      },
      form: {
        id: '',
        username: '',
        phoneNum: '',
        email: '',
        age: '',
        sex: '',
      },
      form2: {
        username: '',
        pwd: '',
        name: '',
        phoneNum: '',
        photo: '',
        description: ''
      },
      user: [],
      worker: [],
    };
  },
  methods: {
    get_users_info() {

      this.$axios({
        method: 'get',
        url: "http://127.0.0.1:8000/user_ctrl/get_users_info/"
      })
          .then(res => {
            console.log(res)
            for (let i = 0; i < res.data.length; i++) {
              let tmp = {
                userid: res.data[i].id.toString(),
                username: res.data[i].username,
                phoneNum: res.data[i].tel,
                email: res.data[i].email,
                name: res.data[i].name,
                age: '',
                sex: '',
                visible: true
              }
              if (res.data[i].age!==null) {
                tmp.age = res.data[i].age.toString()
              }
              if (res.data[i].sex!==null) {
                tmp.sex = res.data[i].sex.toString()
              }
              this.user.push(tmp)
            }
          })
          .catch(err => {
            console.log(err)
          })
    },
    get_workers_info() {
      this.$axios({
        method: 'get',
        url: "http://127.0.0.1:8000/user_ctrl/get_workers_info/"
      })
          .then(res => {
            console.log(res)
            for (let i = 0; i < res.data.length; i++) {
              let tmp = {
                photoSrc: res.data[i].photo,
                workerid: res.data[i].id.toString(),
                username: res.data[i].username,
                phoneNum: res.data[i].tel,
                name: res.data[i].name,
                description: res.data[i].description,
                visible: true
              }
              this.worker.push(tmp)
            }
          })
          .catch(err => {
            console.log(err)
          })
    },
    add_worker() {
      const formData = {
        'username': this.form2.username,
        'pwd': this.form2.pwd,
        'name': this.form2.name,
        'phoneNum': this.form2.phoneNum,
        'photo': this.form2.photo,
        'description': this.form2.description
      }
      console.log(formData)

      this.$axios({
        method: 'post',
        url: "http://127.0.0.1:8000/user_ctrl/add_worker/",
        data: qs.stringify(formData)
      })
          .then(res => {
            console.log(res)
            switch (res.data.errno) {
              case 0:
                this.$message.success(res.data.msg)
                this.dialogFormVisible2 = false;
                this.worker = [];
                this.get_workers_info()
                break
              case 1003:
                this.$message.warning(res.data.msg)
                break
              case 1002:
                this.$message.warning(res.data.msg)
                break
              case 1009:
                this.$message.warning(res.data.msg)
                break
              case 1008:
                this.$message.warning(res.data.msg)
                break
            }
          })
          .catch(err => {
            console.log(err)
          })
    },
    update_info() {
      const formData = {
        'userid': this.form.id,
        'username': this.form.username,
        'phoneNum': this.form.phoneNum,
        'email': this.form.email,
        'age': this.form.age,
        'sex': this.form.sex
      };
      console.log(formData)

      this.$axios({
        method: 'post',
        url: "http://127.0.0.1:8000/user_ctrl/update_info/",
        data: qs.stringify(formData)
      })
          .then(res => {
            console.log(res)
            switch (res.data.errno) {
              case 0:
                this.$message.success(res.data.msg)
                this.dialogFormVisible1 = false;
                this.user[this.Index].username = this.form.username;
                this.user[this.Index].phoneNum = this.form.phoneNum;
                this.user[this.Index].email = this.form.email;
                this.user[this.Index].age = this.form.age;
                this.user[this.Index].sex = this.form.sex;
                break
              case 1001:
                this.$message.warning(res.data.msg)
                break
              case 1002:
                this.$message.warning(res.data.msg)
                break
              case 1003:
                this.$message.warning(res.data.msg)
                break
              case 1004:
                this.$message.warning(res.data.msg)
                break
              case 1005:
                this.$message.warning(res.data.msg)
                break
              case 1006:
                this.$message.warning(res.data.msg)
                break
              case 1007:
                this.$message.warning(res.data.msg)
                break
              case 1010:
                this.$message.warning(res.data.msg)
                break
            }
          })
          .catch(err => {
            console.log(err)
          })
    },
    del_user(index) {
      const formData = {'userid': this.user[index].userid}

      console.log(formData)

      this.$axios({
        method: 'post',
        url: "http://127.0.0.1:8000/user_ctrl/del_user/",
        data: qs.stringify(formData)
      })
          .then(res => {
            switch (res.data.errno) {
              case 0:
                this.$message.success(res.data.msg)
                this.user.splice(index, 1);
                break
              case 1001:
                this.$message.warning(res.data.msg)
                break
              case 1007:
                this.$message.warning(res.data.msg)
                break
            }
          })
          .catch(err => {
            console.log(err)
          })
    },
    del_worker(index) {
      const formData = {'workerid': this.worker[index].workerid}

      console.log(formData)

      this.$axios({
        method: 'post',
        url: "http://127.0.0.1:8000/user_ctrl/del_worker/",
        data: qs.stringify(formData)
      })
          .then(res => {
            switch (res.data.errno) {
              case 0:
                this.$message.success(res.data.msg)
                this.worker.splice(index, 1);
                break
              case 1001:
                this.$message.warning(res.data.msg)
                break
              case 1007:
                this.$message.warning(res.data.msg)
                break
            }
          })
          .catch(err => {
            console.log(err)
          })
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    searchUser() {
      let i, len = this.user.length, flag = 0;
      if (this.select1 === '1') {
        if (this.input1 !== '') {
          for (i = 0; i < len; i++) {
            if (this.input1 !== this.user[i].userid) {
              this.user[i].visible = false;
            } else {
              this.user[i].visible = true;
              flag = 1;
            }
          }
        } else {
          for (i = 0; i < len; i++) {
            this.user[i].visible = true;
          }
          flag = 1;
        }
      } else {
        if (this.input1 !== '') {
          for (i = 0; i < len; i++) {
            if (this.input1 !== this.user[i].name) {
              this.user[i].visible = false;
            } else {
              this.user[i].visible = true;
              flag = 1;
            }
          }
        } else {
          for (i = 0; i < len; i++) {
            this.user[i].visible = true;
          }
          flag = 1;
        }
      }
      if (flag === 0) {
        this.noUserVisible = true;
      } else {
        this.noUserVisible = false;
      }
    },
    searchWorker() {
      let i, len = this.worker.length, flag = 0;
      if (this.select2 === '1') {
        if (this.input2 !== '') {
          for (i = 0; i < len; i++) {
            if (this.input2 !== this.worker[i].workerid) {
              this.worker[i].visible = false;
            } else {
              this.worker[i].visible = true;
              flag = 1;
            }
          }
        } else {
          for (i = 0; i < len; i++) {
            this.worker[i].visible = true;
          }
          flag = 1;
        }
      } else {
        if (this.input2 !== '') {
          for (i = 0; i < len; i++) {
            if (this.input2 !== this.worker[i].name) {
              this.worker[i].visible = false;
            } else {
              this.worker[i].visible = true;
              flag = 1;
            }
          }
        } else {
          for (i = 0; i < len; i++) {
            this.worker[i].visible = true;
          }
          flag = 1;
        }
      }
      if (flag === 0) {
        this.noWorkerVisible = true;
      } else {
        this.noWorkerVisible = false;
      }
    },
    importWorker() {
      let tmp = {
        username: this.form2.username,
        pwd: this.form2.pwd,
        name: this.form2.name,
        phoneNum: this.form2.phoneNum,
        photoSrc: this.form2.photo,
        description: this.form2.description,
        visible: true
      }
      if (tmp.username===''||tmp.name===''||tmp.phoneNum===''||tmp.photoSrc===''||tmp.pwd==='') {
        this.$message.warning('请填写完整信息！')
        return
      }
      this.add_worker()
      this.searchWorker();
    },
    modify(index) {
      console.log(index)
      this.Index = index;
      this.dialogFormVisible1 = true;
      this.form.id = this.user[index].userid;
      this.form.username = this.user[index].username;
      this.form.phoneNum = this.user[index].phoneNum;
      this.form.email = this.user[index].email;
      this.form.age = this.user[index].age;
      this.form.sex = this.user[index].sex;
    },
    Confirm() {
      this.update_info()
    },
    Delete(index) {
      this.del_user(index)
    },
    Delete2(index) {
      this.del_worker(index)
    },
    open(index) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        confirmButtonClass: 'confirm',
        cancelButtonClass: 'cancel',
        type: 'warning'
      }).then(() => {
        this.Delete(index)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    open2(index) {
      this.$confirm('此操作将永久删除该师傅, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        confirmButtonClass: 'confirm',
        cancelButtonClass: 'cancel',
        type: 'warning'
      }).then(() => {
        this.Delete2(index)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    upload() {
      this.dialogFormVisible2 = true;
      this.form2.photo = '';
      this.form2.description = '';
      this.form2.name = '';
      this.form2.pwd = '';
      this.form2.username = '';
      this.form2.phoneNum = '';
    },
    onChangeUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
        return
      }
      const self = this
      const reader = new FileReader()
      reader.onload = function (e) {
        self.form2.photo = reader.result
        self.$refs.upload.clearFiles()
      }
      reader.readAsDataURL(file.raw)
      console.log(this.form2.photo)
    },

  }
}
</script>

<style scoped>
  >>> .el-tabs__item.is-active {
    color: #42b983 !important;
  }
  >>> .el-tabs__item:hover {
    color: #7fc4a5 !important;
  }
  .el-select-dropdown__item.selected, .el-select-dropdown__item:hover{
    color: #42b983 !important;
  }
  >>> .input-with-select > .el-input__inner:focus,
  >>> .input > .el-input__inner:focus, >>> .input > .el-textarea__inner:focus{
    border-color: #42b983 !important;
  }
  #upload {
    background-color: #4a5c70;
    border: none;
    margin-left: 20px;
  }
  #upload:hover {
    background-color: #364354 !important;
  }
  .margin-top {
    margin-top: 20px;
    width: 1050px;
    color: #42b983;
  }
  #modify:hover, #delete:hover, .confirm:hover, .upload:hover {
    background-color: #3cad7a;
  }
  #delete {
    margin-left: 10px;
  }
  #modify, #delete, .confirm, .upload {
    background-color: #42b983;
    border: none;
  }
  .el-tab-pane {
    height: 520px;
    overflow-y: scroll;
  }
  >>> .label-userid, >>> .label-phoneNum, >>> .label-name, >>> .label-workerTel {
    width: 130px;
  }
  >>> .content-userid {
    width: 140px;
  }
  >>> .content-phoneNum, >>> .content-name {
    width: 240px;
  }
  >>> .label-email {
    width: 100px;
  }
</style>

<style>
.dialog-footer .confirm, .el-message-box__btns .confirm {
  background-color: #42b983 !important;
  border: none !important;
}
.dialog-footer .confirm:hover, .el-message-box__btns .confirm:hover {
  background-color: #3cad7a !important;
}
.dialog-footer .cancel:hover, .el-message-box__btns .cancel:hover  {
  background-color: #d7eae2 !important;
  color: #42b983 !important;
  border-color: #d7eae2 !important;
}
</style>