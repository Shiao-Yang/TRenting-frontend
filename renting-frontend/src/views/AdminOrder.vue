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
            <el-descriptions-item v-if="item.verify==='0'" label-class-name="label-verify" content-class-name="content-verify">
              <template slot="label">
                审核状态
              </template>
              未审核
            </el-descriptions-item>
            <el-descriptions-item v-else label-class-name="label-verify" content-class-name="content-verify">
              <template slot="label">
                审核状态
              </template>
              已审核
            </el-descriptions-item>
            <el-descriptions-item label-class-name="label-order_time" content-class-name="content-order_time">
              <template slot="label">
                交易时间
              </template>
              {{item.order_time}}
            </el-descriptions-item>
            <el-descriptions-item label-class-name="label-duration" content-class-name="content-duration">
              <template slot="label">
                租借时长
              </template>
              {{item.duration}}
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
              <el-button type="primary" class="button" size="small" @click="check(index)">审核</el-button>
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
            <el-descriptions-item v-if="item.check==='0'" label-class-name="label-verify" content-class-name="content-verify">
              <template slot="label">
                审核状态
              </template>
              未审核
            </el-descriptions-item>
            <el-descriptions-item v-else label-class-name="label-verify" content-class-name="content-verify">
              <template slot="label">
                审核状态
              </template>
              已审核
            </el-descriptions-item>
            <el-descriptions-item label-class-name="label-order_time" content-class-name="content-order_time">
              <template slot="label">
                交易时间
              </template>
              {{item.order_time}}
            </el-descriptions-item>
            <el-descriptions-item label-class-name="label-duration" content-class-name="content-duration">
              <template slot="label">
                租借时长
              </template>
              {{item.duration}}
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
export default {
  created() {
    this.$emit('active',2);
    window.myData = this;
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
      order: [{
        id: '2',
        uid: '3',
        hid: '4',
        type: '0',
        paid: '1',
        check: '1',
        order_time: '2022/1/12',
        duration: '200',
        amount: '50000',
        details: '',
        visible: true
      }],
      order2: [{
        id: '1',
        uid: '2',
        hid: '3',
        type: '1',
        paid: '0',
        check: '0',
        order_time: '2022/1/22',
        duration: '300',
        amount: '70000',
        details: '',
        visible: true
      }, {
        id: '3',
        uid: '4',
        hid: '5',
        type: '0',
        paid: '0',
        check: '0',
        order_time: '2022/3/12',
        duration: '100',
        amount: '30000',
        details: '',
        visible: true
      }]
    }
  },
  methods: {
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
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    Delete(index) {
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
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    Delete2(index) {
      this.order2.splice(index, 1);
    },
    check(index) {
      this.$confirm('此操作将审核通过该订单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        confirmButtonClass: 'confirm',
        cancelButtonClass: 'cancel',
        type: 'warning'
      }).then(() => {
        // 调用接口
        let tmp = {
          id: this.order2[index].id,
          uid: this.order2[index].uid,
          hid: this.order2[index].hid,
          type: this.order2[index].type,
          paid: this.order2[index].paid,
          check: '1',
          order_time: this.order2[index].order_time,
          duration: this.order2[index].duration,
          amount: this.order2[index].amount,
          details: this.order2[index].details,
          visible: true
        }
        this.order.push(tmp);
        this.order2.splice(index, 1)
        this.searchOrder1();
        this.searchOrder2();
        this.$message({
          type: 'success',
          message: '审核成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消审核'
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
  >>> .content-uid, >>> .content-hid {
    width: 180px;
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