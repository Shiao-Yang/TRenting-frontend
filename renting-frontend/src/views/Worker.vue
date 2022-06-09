<template>
  <div class="worker">
    <div ><router-link to="/" id="quit">退出</router-link></div>
    <el-container class="operation-wrapper" style="position: relative;top: 11px">
      <el-header class="el-header" style="height: 140px; padding: 0px">
        <div id="head">
          <h1 class="title">师 &nbsp;傅 &nbsp;页 &nbsp;面</h1>
        </div>
      </el-header>
      <el-container style="margin-top: 20px">
        <el-aside class="el-aside">
          <el-row class="tac">
            <el-col :span="24">
              <el-menu
                  :default-active="activeIndex"
                  class="el-menu-vertical-demo"
                  active-text-color="#42b983"
                  @select="handleSelect">
                <el-menu-item index="1">
                  <i class="el-icon-s-custom"></i>
                  <span slot="title">个人信息</span>
                </el-menu-item>
                <el-menu-item index="2">
                  <i class="el-icon-setting"></i>
                  <span slot="title">工单处理</span>
                </el-menu-item>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
        <el-main class="el-main">
          <template>
            <el-tabs v-if="index==='1'" class="el-tabs" type="border-card" style="height: 550px">
              <div class="block" style="padding-bottom: 15px;border-bottom: solid 1px #e6e6e6">
                <el-avatar :size="80" :src="worker.photo" style="background-color: white;border: solid 1px #e6e6e6">
                </el-avatar>
                <span style="position: absolute;color: #42b983;left: 100px;top: 45px">{{worker.username}}</span>
              </div>
              <div class="block" style="padding: 30px 0px 40px 0px">
                <span style="margin-left: 85px">ID：{{worker.id}}</span>
                <span style="position: absolute;left: 420px">密码：{{worker.password}}</span>
              </div>
              <div class="block" style="padding-bottom: 24px">
                <span style="margin-left: 85px">姓名：{{worker.name}}</span>
                <span style="position: absolute;left: 420px">电话：{{worker.tel}}</span>
              </div>
              <div class="block" style="padding-bottom: 200px">
                <span style="position: absolute;left: 100px;line-height: 1.5"><p>介绍：{{worker.description}}</p></span>
              </div>
            </el-tabs>
            <el-tabs v-else class="el-tabs" type="border-card">
              <el-tab-pane label="工单查询" class="el-tab-pane">
                <el-badge :is-dot="ticket1.length!==0" style="margin-top: 5px">
                  <el-switch
                      style="display: block"
                      v-model="value"
                      active-color="#ff4949"
                      inactive-color="#13ce66"
                      active-text="待处理"
                      inactive-text="已处理">
                  </el-switch>
                </el-badge>
                <div style="margin-top: 15px;">
                  <!-- 搜索工单 -->
                  <el-input style="width: 700px" v-if="value===true" placeholder="请输入内容"
                            v-model="input1" class="input-with-select" @keyup.enter.native="search1" clearable>
                    <el-select style="width: 110px" v-model="select" slot="prepend" placeholder="请选择">
                      <el-option
                          label="工单ID" value="1">
                      </el-option>
                    </el-select>
                    <el-button slot="append" icon="el-icon-search" @click="search1"></el-button>
                  </el-input>
                  <el-input style="width: 700px" v-if="value===false" placeholder="请输入内容"
                            v-model="input2" class="input-with-select" @keyup.enter.native="search2" clearable>
                    <el-select style="width: 110px" v-model="select" slot="prepend" placeholder="请选择">
                      <el-option
                          label="工单ID" value="1">
                      </el-option>
                    </el-select>
                    <el-button slot="append" icon="el-icon-search" @click="search2"></el-button>
                  </el-input>
                </div>
                <!-- 无数据或搜索为空 -->
                <el-empty description="暂无报修" :image-size="150" v-if="ticket1.length === 0 && value===true"></el-empty>
                <el-empty description="搜索为空" :image-size="150" v-if="ticket1.length !== 0
         && this.noTicketVisible1 && value===true"></el-empty>
                <el-empty description="暂无已处理报修" :image-size="150" v-if="ticket2.length === 0 && value===false"></el-empty>
                <el-empty description="搜索为空" :image-size="150" v-if="ticket2.length !== 0
         && this.noTicketVisible2 && value===false"></el-empty>
                <el-dialog title="生成工单" :visible.sync="dialogFormVisible">
                  <el-form :model="form">
                    <el-form-item label="处理图片" :label-width="formLabelWidth" required>
                          <span slot="label">
                            <el-tooltip content="只能上传jpg/png格式图片，且不超过2M"
                                        placement="top">
                            <i class="el-icon-question"></i>
                            </el-tooltip>
                            处理图片
                          </span>
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
                      <img v-if="form.handleImage" :src="form.handleImage" width="120px" height="120px">
                    </el-form-item>
                    <el-form-item label="处理文字" :label-width="formLabelWidth" required>
                      <el-input type="textarea" v-model="form.handleText" autocomplete="off" class="input" clearable></el-input>
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false" class="cancel" style="margin-right: 10px">取 消</el-button>
                    <el-popconfirm
                        confirm-button-text='是的'
                        cancel-button-text='不是'
                        @confirm="Confirm(index)"
                        title="是否确定要处理该工单？"
                    >
                      <el-button slot="reference" type="primary"  class="confirm">确 定</el-button>
                    </el-popconfirm>
                  </div>
                </el-dialog>
                <!-- 显示待处理工单 -->
                <el-descriptions v-for='(item,index) in ticket1' v-if="item.visible && value===true" :key="index"
                                 class="margin-top" :title="'ID: '+item.id" :column="3" border >
                  <template slot="extra">
                    <!-- 生成工单 -->
                    <el-button class="button" type="primary"size="small" @click="handleTicket(index)">处理工单</el-button>
                  </template>
                  <!-- 工单项 -->
                  <el-descriptions-item label-class-name="label-uid" content-class-name="content-uid">
                    <template slot="label">
                      用户ID
                    </template>
                    {{item.uid}}
                  </el-descriptions-item>
                  <el-descriptions-item label-class-name="label-hid" content-class-name="content-hid">
                    <template slot="label">
                      房源ID
                    </template>
                    {{ item.hid }}
                  </el-descriptions-item>
                  <el-descriptions-item label-class-name="label-date">
                    <template slot="label">
                      维修日期
                    </template>
                    {{ item.date }}
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template slot="label">
                      报修图片
                    </template>
                    <el-image :src="item.pictureSrc" style="width: 100px;height: 100px"></el-image>
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template slot="label">
                      报修信息
                    </template>
                    {{ item.info }}
                  </el-descriptions-item>
                </el-descriptions>
                <!-- 显示已处理的工单 -->
                <el-descriptions v-for='(item,index) in ticket2' v-if="item.visible && value===false" :key="index"
                                 class="margin-top" :title="'ID: '+item.id" :column="3" border >
                  <template slot="extra">
                  </template>
                  <!-- 报修项 -->
                  <el-descriptions-item label-class-name="label-uid" content-class-name="content-uid">
                    <template slot="label">
                      用户ID
                    </template>
                    {{item.uid}}
                  </el-descriptions-item>
                  <el-descriptions-item label-class-name="label-hid" content-class-name="content-hid">
                    <template slot="label">
                      房源ID
                    </template>
                    {{ item.hid }}
                  </el-descriptions-item>
                  <el-descriptions-item label-class-name="label-date">
                    <template slot="label">
                      维修日期
                    </template>
                    {{ item.date }}
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template slot="label">
                      报修图片
                    </template>
                    <el-image :src="item.pictureSrc" style="width: 100px;height: 100px"></el-image>
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template slot="label">
                      报修信息
                    </template>
                    {{ item.info }}
                  </el-descriptions-item>
                  <el-descriptions-item v-if="item.status==='3'">
                    <template slot="label">
                      状态
                    </template>
                    未审核
                  </el-descriptions-item>
                  <el-descriptions-item v-if="item.status==='4'">
                    <template slot="label" >
                      状态
                    </template>
                    已审核
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template slot="label">
                      处理图片
                    </template>
                    <el-image :src="item.handleImage" style="width: 100px;height: 100px"></el-image>
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template slot="label">
                      处理信息
                    </template>
                    {{ item.handleText }}
                  </el-descriptions-item>
                </el-descriptions>
              </el-tab-pane>
            </el-tabs>
          </template>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import qs from "qs";

export default {
  created() {
    window.myData = this;
    this.get_worker_info()
    this.select_tickets()
  },
  name: "Worker",
  data() {
    return {
      activeIndex: '1',
      index: '1',
      value: false,
      input1: '',
      input2: '',
      select: '1',
      noTicketVisible1: false,
      noTicketVisible2: false,
      formLabelWidth: '120px',
      dialogFormVisible: false,
      Index: '',
      form: {
        handleImage: '',
        handleText: '',
      },
      worker: {},
      ticket1: [],
      ticket2: []
    }
  },
  methods: {
    get_worker_info() {
      let formData = {'workerid': '3'}
      this.$axios({
        method: 'post',
        url: "http://127.0.0.1:8000/worker/get_worker_info/",
        data: qs.stringify(formData)
      })
          .then(res => {
            console.log(res)
            this.worker={
              id: '3',
              username: res.data[0].username,
              password: res.data[0].password,
              name: res.data[0].name,
              tel: res.data[0].tel,
              photo: res.data[0].photo,
              description: res.data[0].description,
            }
          })
          .catch(err => {
            console.log(err)
          })
    },
    select_tickets() {
      let formData = {'workerid': '3'}
      this.$axios({
        method: 'post',
        url: "http://127.0.0.1:8000/worker/select_tickets/",
        data: qs.stringify(formData)
      })
          .then(res => {
            console.log(res)
            switch (res.data.errno) {
              case 1002:
                this.$message.warning(res.data.msg)
                break
              case 1001:
                this.$message.warning(res.data.msg)
                break
              default:
                for (let i = 0; i < res.data.length; i++) {
                  let tmp = {
                    id: '',
                    uid: '',
                    wid: '',
                    hid: '',
                    info: res.data[i].info,
                    pictureSrc: res.data[i].pictures,
                    status: '',
                    date: res.data[i].date,
                    comment: '',
                    details: res.data[i].details,
                    handleImage: res.data[i].materials_pic,
                    handleText: res.data[i].materials_text,
                    visible: true
                  }
                  if (res.data[i].id!==null) {
                    tmp.id = res.data[i].id.toString()
                  }
                  if (res.data[i].uid!==null) {
                    tmp.uid = res.data[i].uid.toString()
                  }
                  if (res.data[i].wid!==null) {
                    tmp.wid = res.data[i].wid.toString()
                  }
                  if (res.data[i].hid!==null) {
                    tmp.hid = res.data[i].hid.toString()
                  }
                  if (res.data[i].status!==null) {
                    tmp.status = res.data[i].status.toString()
                  }
                  if (res.data[i].comment!==null) {
                    tmp.comment = res.data[i].comment.toString()
                  }
                  if (tmp.status==='2') {
                    this.ticket1.push(tmp)
                  } else if (tmp.status==='3') {
                    this.ticket2.push(tmp)
                  }
                }
            }
          })
          .catch(err => {
            console.log(err)
          })
    },
    submit_materials(index) {
      let formData = {
        'ticketid': this.ticket1[this.Index].id,
        'materials_pic': this.form.handleImage,
        'materials_text': this.form.handleText
      }
      console.log(formData)
      this.$axios({
        method: 'post',
        url: "http://127.0.0.1:8000/worker/submit_materials/",
        data: qs.stringify(formData)
      })
          .then(res => {
            console.log(res)
            switch (res.data.errno) {
              case 0:
                this.$message.success(res.data.msg)
                let tmp = {
                  handleImage: this.form.handleImage,
                  handleText: this.form.handleText,
                  id: this.ticket1[this.Index].id,
                  uid: this.ticket1[this.Index].uid,
                  hid: this.ticket1[this.Index].hid,
                  wid: this.ticket1[this.Index].wid,
                  info: this.ticket1[this.Index].info,
                  pictureSrc: this.ticket1[this.Index].pictureSrc,
                  status: '3',
                  date: this.ticket1[this.Index].date,
                  comment: '',
                  details: '',
                  visible: true
                }
                this.ticket2.push(tmp);
                this.ticket1.splice(this.Index, 1);
                this.dialogFormVisible = false
                this.search1()
                this.search2()
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
            }
          })
          .catch(err => {
            console.log(err)
          })
    },
    handleSelect(index, indexPath) {
      console.log(index, indexPath);
      this.index = index;
    },
    search1() {
      let i, len = this.ticket1.length, flag = 0;
        if (this.input1 !== '') {
          for (i = 0; i < len; i++) {
            if (this.input1 !== this.ticket1[i].id) {
              this.ticket1[i].visible = false;
            } else {
              this.ticket1[i].visible = true;
              flag = 1;
            }
          }
        } else {
          for (i = 0; i < len; i++) {
            this.ticket1[i].visible = true;
          }
          flag = 1;
        }
      if (flag === 0) {
        this.noTicketVisible1 = true;
      } else {
        this.noTicketVisible1 = false;
      }
    },
    search2() {
      let i, len = this.ticket2.length, flag = 0;
      if (this.input2 !== '') {
        for (i = 0; i < len; i++) {
          if (this.input2 !== this.ticket2[i].id) {
            this.ticket2[i].visible = false;
          } else {
            this.ticket2[i].visible = true;
            flag = 1;
          }
        }
      } else {
        for (i = 0; i < len; i++) {
          this.ticket2[i].visible = true;
        }
        flag = 1;
      }
      if (flag === 0) {
        this.noTicketVisible2 = true;
      } else {
        this.noTicketVisible2 = false;
      }
    },
    handleTicket(index) {
      this.dialogFormVisible = true
      this.form.handleImage = ''
      this.form.handleText = ''
      this.Index = index
    },
    Confirm(index) {
      if (this.form.handleImage===''||this.form.handleText==='') {
        this.$message.error("请提交完整内容！")
        return
      }
      this.submit_materials(index)
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
        self.form.handleImage = reader.result
        self.$refs.upload.clearFiles()
      }
      reader.readAsDataURL(file.raw)
      console.log(this.form.handleImage)
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
.el-menu {
  background-color: #f9fafc;
  height: 580px;
  margin-left: 200px;
  border-right: none;
  border-bottom: solid 1px #e6e6e6;
}
.el-aside {
  width: 410px !important;
}
.el-menu-item:hover, .el-menu-item.is-active {
  background-color: #d7eae2;
}
.el-main {
  padding: 0px !important;
  margin-right: 160px
}
>>> .el-tabs__item.is-active{
  color: #42b983 !important;
}
>>> .el-tabs__item:hover {
  color: #7fc4a5 !important;
}
.el-select-dropdown__item.selected, .el-select-dropdown__item:hover{
   color: #42b983 !important;
 }
>>> .input-with-select > .el-input__inner:focus,>>> .input > .el-input__inner:focus,
>>> #selectDate:focus, >>> .input > .el-textarea__inner:focus{
  border-color: #42b983 !important;
}
.el-tabs {
  padding: 30px 20px 0px 20px;
}

.el-tab-pane {
  height: 481px;
  overflow-y: scroll;
}
.button, .upload{
  background-color: #42b983;
  border: none;
}
.button:hover{
  background-color: #3cad7a;
}
.margin-top {
  margin-top: 20px;
  color: #42b983;
  width: 95%;
}
>>> .el-switch__label--left.is-active {
  color: #42b983 !important;
}
>>> .el-switch__label--right.is-active {
  color: #ff4949 !important;
}
>>> .label-uid, >>> .label-hid, >>> .label-date {
  width: 100px;
}
>>> .content-uid, >>> .content-hid {
  width: 120px;
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

<style>
.confirm {
  background-color: #42b983 !important;
  border: none !important;
}
.confirm:hover {
  background-color: #3cad7a !important;
}
.cancel:hover {
  background-color: #d7eae2 !important;
  color: #42b983 !important;
  border-color: #d7eae2 !important;
}
</style>