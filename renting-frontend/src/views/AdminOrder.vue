<template>
  <div class="adminOrder">
    <template>
      <el-tabs type="border-card" v-model="activeName">
        <el-tab-pane label="订单管理" name="first">
          <el-badge :is-dot="order2.length!==0" style="margin-top: 5px">
            <el-switch
                style="display: block"
                v-model="value"
                active-color="#ff4949"
                inactive-color="#13ce66"
                active-text="待审核"
                inactive-text="已审核">
            </el-switch>
          </el-badge>
          <div style="margin-top: 15px;">
            <!-- 搜索订单 -->
            <el-input style="width: 850px" placeholder="请输入内容" v-model="input1" v-if="value===false"
                      class="input-with-select" @keyup.enter.native="searchOrder1()" clearable>
              <el-select style="width: 110px" v-model="select1" slot="prepend" placeholder="请选择">
                <el-option
                  v-for="item in options1"
                  :key="item.select1"
                  :label="item.label"
                  :value="item.select1">
                </el-option>
              </el-select>
              <el-button slot="append" icon="el-icon-search" @click="searchOrder1()"></el-button>
            </el-input>
          </div>
          <el-empty description="暂无订单" :image-size="200" v-if="order.length === 0&&value===false"></el-empty>
          <el-empty description="搜索为空" :image-size="200" v-if="order.length !== 0 && this.noOrderVisible1&&value===false"></el-empty>
          <!-- 显示订单 -->
          <el-descriptions v-for='(item,index) in order' v-if="item.visible && value===false":key="index"
                           class="margin-top" :title="'ID: '+item.id" :column="3" border >
            <template slot="extra">
              <el-button type="primary" class="button" size="small" v-if="item.paid==='0'" @click="sendEmail(index)">邮件提醒</el-button>
              <!-- 删除订单 -->
              <el-button type="primary" class="button" size="small" @click="open(index)">删除</el-button>
            </template>
            <!-- 订单项 -->
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
              {{item.hid}}
            </el-descriptions-item>
            <el-descriptions-item v-if="item.type==='0'" label-class-name="label-type" content-class-name="content-type">
              <template slot="label">
                类型
              </template>
              短租
            </el-descriptions-item>
            <el-descriptions-item v-else label-class-name="label-type" content-class-name="content-type">
              <template slot="label">
                类型
              </template>
              长租
            </el-descriptions-item>
            <el-descriptions-item v-if="item.paid==='0'" label-class-name="label-paid" content-class-name="content-paid">
              <template slot="label">
                支付状态
              </template>
              未支付
            </el-descriptions-item>
            <el-descriptions-item v-else label-class-name="label-paid" content-class-name="content-paid">
              <template slot="label">
                支付状态
              </template>
              已支付
            </el-descriptions-item>
            <el-descriptions-item label-class-name="label-order_time" content-class-name="content-order_time">
              <template slot="label">
                交易时间
              </template>
              {{item.order_time}}
            </el-descriptions-item>
            <el-descriptions-item label-class-name="label-start_time" content-class-name="content-order_time">
              <template slot="label">
                开始时间
              </template>
              {{item.start_time}}
            </el-descriptions-item>
            <el-descriptions-item v-if="item.type==='0'" label-class-name="label-duration" content-class-name="content-duration">
              <template slot="label">
                租借时长
              </template>
              {{item.duration}}天
            </el-descriptions-item>
            <el-descriptions-item v-else label-class-name="label-duration" content-class-name="content-duration">
              <template slot="label">
                租借时长
              </template>
              {{item.duration}}月
            </el-descriptions-item>
            <el-descriptions-item label-class-name="label-amount" content-class-name="content-amount">
              <template slot="label">
                交易额
              </template>
              {{item.amount}}
            </el-descriptions-item>
            <el-descriptions-item label-class-name="label-details" content-class-name="content-details">
              <template slot="label">
                备注
              </template>
              {{item.details}}
            </el-descriptions-item>
          </el-descriptions>

            <!-- 搜索待审核订单 -->
          <el-input style="width: 850px" placeholder="请输入内容" v-model="input2" v-if="value===true"
                    class="input-with-select" @keyup.enter.native="searchOrder2" clearable>
            <el-select style="width: 110px" v-model="select2" slot="prepend" placeholder="请选择">
              <el-option
                  v-for="item in options2"
                  :key="item.select2"
                  :label="item.label"
                  :value="item.select2">
              </el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="searchOrder2"></el-button>
          </el-input>
          <el-empty description="暂无订单" :image-size="200" v-if="order2.length === 0&&value===true"></el-empty>
          <el-empty description="搜索为空" :image-size="200" v-if="order2.length !== 0 && this.noOrderVisible2&&value===true"></el-empty>
          <!-- 显示待审核订单 -->
          <el-descriptions v-for='(item,index) in order2' v-if="item.visible&&value===true" :key="index"
                           class="margin-top" :title="'ID: '+item.id" :column="3" border >
            <template slot="extra">
              <!-- 审核订单 -->
              <el-button type="primary" class="button" size="small" @click="check1(index)">通过</el-button>
              <el-button type="primary" class="button" size="small" @click="check2(index)">驳回</el-button>
              <!-- 删除订单 -->
              <el-button type="primary" class="button" size="small" @click="open2(index)">删除</el-button>
            </template>
            <!-- 订单项 -->
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
              {{item.hid}}
            </el-descriptions-item>
            <el-descriptions-item v-if="item.type==='0'" label-class-name="label-type" content-class-name="content-type">
              <template slot="label">
                类型
              </template>
              短租
            </el-descriptions-item>
            <el-descriptions-item v-else label-class-name="label-type" content-class-name="content-type">
              <template slot="label">
                类型
              </template>
              长租
            </el-descriptions-item>
            <el-descriptions-item v-if="item.paid==='0'" label-class-name="label-paid" content-class-name="content-paid">
              <template slot="label">
                支付状态
              </template>
              未支付
            </el-descriptions-item>
            <el-descriptions-item v-else label-class-name="label-paid" content-class-name="content-paid">
              <template slot="label">
                支付状态
              </template>
              已支付
            </el-descriptions-item>
            <el-descriptions-item label-class-name="label-order_time" content-class-name="content-order_time">
              <template slot="label">
                交易时间
              </template>
              {{item.order_time}}
            </el-descriptions-item>
            <el-descriptions-item label-class-name="label-start_time" content-class-name="content-order_time">
              <template slot="label">
                开始时间
              </template>
              {{item.start_time}}
            </el-descriptions-item>
            <el-descriptions-item v-if="item.type==='0'" label-class-name="label-duration" content-class-name="content-duration">
              <template slot="label">
                租借时长
              </template>
              {{item.duration}}天
            </el-descriptions-item>
            <el-descriptions-item v-else label-class-name="label-duration" content-class-name="content-duration">
              <template slot="label">
                租借时长
              </template>
              {{item.duration}}月
            </el-descriptions-item>
            <el-descriptions-item label-class-name="label-amount" content-class-name="content-amount">
              <template slot="label">
                交易额
              </template>
              {{item.amount}}
            </el-descriptions-item>
            <el-descriptions-item label-class-name="label-details" content-class-name="content-details">
              <template slot="label">
                备注
              </template>
              {{item.details}}
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
    this.$emit('active',2);
    window.myData = this;
    this.get_order_info();
  },
  name: "AdminOrder",
  data() {
    return {
      activeName: "first",
      input1: '',
      input2: '',
      select1: '1',
      select2: '1',
      noOrderVisible1: false,
      noOrderVisible2: false,
      value: false,
      options1: [{
        select1: '1',
        label: '订单ID'
      }, {
        select1: '2',
        label: '用户ID'
      }, {
        select1: '3',
        label: '房源ID'
      }],
      options2: [{
        select2: '1',
        label: '订单ID'
      }, {
        select2: '2',
        label: '用户ID'
      }, {
        select2: '3',
        label: '房源ID'
      }],
      order: [],
      order2: []
    }
  },
  methods: {
    sendEmail(index) {
      let formData={'uid': this.order[index].uid}
      this.$axios({
        method: 'post',
        url: "http://127.0.0.1:8000/order/send_alone_email/",
        data: qs.stringify(formData)
      })
          .then(res => {
            console.log(res)
            switch (res.data.error) {
              case 1:
                this.$message.warning(res.data.msg)
                    break
              case 0:
                this.$message.success(res.data.msg)
                    break
            }
          })
          .catch(err => {
            console.log(err)
          })
    },
    get_order_info() {
      this.$axios({
        method: 'get',
        url: "http://127.0.0.1:8000/order_ctrl/get_order_info/"
      })
          .then(res => {
            console.log(res)
            for (let i = 0; i < res.data.length; i++) {
              let tmp = {
                id: res.data[i].oid.toString(),
                uid: res.data[i].uid.toString(),
                hid: res.data[i].hid.toString(),
                type: '',
                paid: '',
                check: res.data[i].status.toString(),
                order_time: res.data[i].order_time,
                start_time: res.data[i].start_time,
                duration: res.data[i].duration.toString(),
                amount: res.data[i].amount.toString(),
                details: res.data[i].details,
                visible: true
              }
              if (res.data[i].type!==null) {
                tmp.type = res.data[i].type.toString()
              }
              if (res.data[i].paid!==null) {
                tmp.paid = res.data[i].paid.toString()
              }
              tmp.order_time = tmp.order_time.replace('T',' ')
              tmp.start_time = tmp.start_time.replace('T',' ')
              tmp.order_time = tmp.order_time.substring(0, 19)
              tmp.start_time = tmp.start_time.substring(0, 19)
              console.log(tmp)
              if (tmp.check === '1') {
                this.order.push(tmp)
              } else if (tmp.check === '0') {
                this.order2.push(tmp)
              }
            }
          })
          .catch(err => {
            console.log(err)
          })
    },
    del_order(index, which) {
      let formData
      if (which === 1) {
        formData = {'orderid': this.order[index].id}
      } else {
        formData = {'orderid': this.order2[index].id}
      }
      console.log(formData)
      this.$axios({
        method: 'post',
        url: "http://127.0.0.1:8000/order_ctrl/del_order/",
        data: qs.stringify(formData)
      })
          .then(res => {
            console.log(res)
            switch (res.data.errno) {
              case 0:
                this.$message.success(res.data.msg)
                break
              case 1002:
                this.$message.warning(res.data.msg)
                break
              case 1001:
                this.$message.warning(res.data.msg)
                break
            }
          })
          .catch(err => {
            console.log(err)
          })
    },
    approved(index) {
      const formData = {'orderid': this.order2[index].id}
      console.log(formData)
      this.$axios({
        method: 'post',
        url: "http://127.0.0.1:8000/order_ctrl/approved/",
        data: qs.stringify(formData)
      })
          .then(res => {
            console.log(res)
            switch (res.data.errno) {
              case 0:
                this.$message.success(res.data.msg)
                break
              case 1002:
                this.$message.warning(res.data.msg)
                break
              case 1003:
                this.$message.warning(res.data.msg)
                break
              case 1001:
                this.$message.warning(res.data.msg)
                break
            }
          })
          .catch(err => {
            console.log(err)
          })
    },
    disapproved(index) {
      const formData = {'orderid': this.order2[index].id}
      console.log(formData)
      this.$axios({
        method: 'post',
        url: "http://127.0.0.1:8000/order_ctrl/disapproved/",
        data: qs.stringify(formData)
      })
          .then(res => {
            console.log(res)
            switch (res.data.errno) {
              case 0:
                this.$message.success('驳回成功')
                break
              case 1002:
                this.$message.warning(res.data.msg)
                break
              case 1003:
                this.$message.warning(res.data.msg)
                break
              case 1001:
                this.$message.warning(res.data.msg)
                break
            }
          })
          .catch(err => {
            console.log(err)
          })
    },
    searchOrder1() {
      let i, len = this.order.length, flag = 0;
      if (this.select1 === '1') {
        if (this.input1 !== '') {
          for (i = 0; i < len; i++) {
            if (this.input1 !== this.order[i].id) {
              this.order[i].visible = false;
            } else {
              this.order[i].visible = true;
              flag = 1;
            }
          }
        } else {
          for (i = 0; i < len; i++) {
            this.order[i].visible = true;
          }
          flag = 1;
        }
      } else if (this.select1 === '2') {
        if (this.input1 !== '') {
          for (i = 0; i < len; i++) {
            if (this.input1 !== this.order[i].uid) {
              this.order[i].visible = false;
            } else {
              this.order[i].visible = true;
              flag = 1;
            }
          }
        } else {
          for (i = 0; i < len; i++) {
            this.order[i].visible = true;
          }
          flag = 1;
        }
      } else {
        if (this.input1 !== '') {
          for (i = 0; i < len; i++) {
            if (this.input1 !== this.order[i].hid) {
              this.order[i].visible = false;
            } else {
              this.order[i].visible = true;
              flag = 1;
            }
          }
        } else {
          for (i = 0; i < len; i++) {
            this.order[i].visible = true;
          }
          flag = 1;
        }
      }
      if (flag === 0) {
        this.noOrderVisible1 = true;
      } else {
        this.noOrderVisible1 = false;
      }
    },
    searchOrder2() {
      let i, len = this.order2.length, flag = 0;
      if (this.select2 === '1') {
        if (this.input2 !== '') {
          for (i = 0; i < len; i++) {
            if (this.input2 !== this.order2[i].id) {
              this.order2[i].visible = false;
            } else {
              this.order2[i].visible = true;
              flag = 1;
            }
          }
        } else {
          for (i = 0; i < len; i++) {
            this.order2[i].visible = true;
          }
          flag = 1;
        }
      } else if (this.select2 === '2') {
        if (this.input2 !== '') {
          for (i = 0; i < len; i++) {
            if (this.input2 !== this.order2[i].uid) {
              this.order2[i].visible = false;
            } else {
              this.order2[i].visible = true;
              flag = 1;
            }
          }
        } else {
          for (i = 0; i < len; i++) {
            this.order2[i].visible = true;
          }
          flag = 1;
        }
      } else {
        if (this.input2 !== '') {
          for (i = 0; i < len; i++) {
            if (this.input2 !== this.order2[i].hid) {
              this.order2[i].visible = false;
            } else {
              this.order2[i].visible = true;
              flag = 1;
            }
          }
        } else {
          for (i = 0; i < len; i++) {
            this.order2[i].visible = true;
          }
          flag = 1;
        }
      }
      if (flag === 0) {
        this.noOrderVisible2 = true;
      } else {
        this.noOrderVisible2 = false;
      }
    },
    open(index) {
      this.$confirm('此操作将永久删除该订单, 是否继续?', '提示', {
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
    Delete(index) {
      this.del_order(index, 1)
      this.order.splice(index, 1);
    },
    open2(index) {
      this.$confirm('此操作将永久删除该订单, 是否继续?', '提示', {
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
    Delete2(index) {
      this.del_order(index, 2)
      this.order2.splice(index, 1);
    },
    check1(index) {
      this.$confirm('此操作将审核通过该订单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        confirmButtonClass: 'confirm',
        cancelButtonClass: 'cancel',
        type: 'warning'
      }).then(() => {
        // 调用接口
        this.approved(index)
        let tmp = {
          id: this.order2[index].id,
          uid: this.order2[index].uid,
          hid: this.order2[index].hid,
          type: this.order2[index].type,
          paid: this.order2[index].paid,
          check: '1',
          order_time: this.order2[index].order_time,
          start_time: this.order2[index].start_time,
          duration: this.order2[index].duration,
          amount: this.order2[index].amount,
          details: this.order2[index].details,
          visible: true
        }
        this.order.push(tmp);
        this.order2.splice(index, 1)
        this.searchOrder1();
        this.searchOrder2();
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消通过'
        });
      });
    },
    check2(index) {
      this.$confirm('此操作将审核驳回该订单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        confirmButtonClass: 'confirm',
        cancelButtonClass: 'cancel',
        type: 'warning'
      }).then(() => {
        // 调用接口
        this.disapproved(index)

        this.order2.splice(index, 1)
        this.searchOrder1();
        this.searchOrder2();
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消驳回'
        });
      });
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
  >>> .el-input-group__prepend + .el-input__inner:focus{
    border-color: #42b983 !important;
  }
  >>> .el-switch__label--left.is-active {
    color: #42b983 !important;
  }
  >>> .el-switch__label--right.is-active {
    color: #ff4949 !important;
  }
  .el-tab-pane {
    height: 520px;
    overflow-y: scroll;
  }
  .margin-top {
    margin-top: 20px;
    width: 1050px;
    color: #42b983;
  }
  .button{
    background-color: #42b983;
    border: none;
  }
  .button:hover{
    background-color: #3cad7a;
  }
  >>> .label-uid, >>> .label-hid, >>> .label-type {
    width: 130px;
  }
  >>> .content-uid  {
    width: 180px;
  }
  >>> .content-hid {
    width: 240px;
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