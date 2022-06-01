<template>
  <div class="adminContract">
    <template>
      <el-tabs type="border-card" v-model="activeName">
        <el-tab-pane label="合同管理" name="first">
          <div style="margin-top: 15px;">
            <!-- 搜素合同 -->
            <el-input style="width: 850px" placeholder="请输入内容" v-model="input"
                      class="input-with-select" @keyup.enter.native="search" clearable>
              <el-select style="width: 110px" v-model="select" slot="prepend" placeholder="请选择">
                <el-option
                    v-for="item in options"
                    :key="item.select"
                    :label="item.label"
                    :value="item.select">
                </el-option>
              </el-select>
              <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
            </el-input>
          </div>
          <el-empty description="暂无用户" :image-size="200" v-if="contract.length === 0"></el-empty>
          <el-empty description="搜索为空" :image-size="200" v-if="contract.length !== 0 && this.noContractVisible"></el-empty>
          <!-- 显示合同 -->
          <el-descriptions v-for='(item,index) in contract' v-if="item.visible" :key="index"
                           class="margin-top" :title="'ID: '+item.id" :column="3" border >
            <template slot="extra">
              <!-- 查看合同 -->
              <el-button type="primary" class="button" size="small" @click="check(index)">查看</el-button>
              <el-dialog title="查看合同" :visible.sync="dialogFormVisible">
                <div class="text">甲方ID(出租方): <span class="box">{{form.hid}}</span></div>
                <div class="text">乙方ID(承租方): <span class="box">{{form.uid}}</span></div>
                <div class="text">经双方协商甲方将位于 <u>{{form.location}}</u> 房屋出租给乙方居住使用。</div>
                <div class="text">一、租房从 <u>{{form.order_time}}</u> 起持续 <u>{{form.duration}}</u> 月为止。</div>
                <div class="text">二、总租金为 <u>{{form.amount}}</u> 元，缴租为每月支付一次。</div>
                <div class="text">三、约定事项</div>
                <div class="text">1、乙方入住时，应即使更换门锁若发生意外与甲方无关。因不慎或使用不当引起火灾、电、气灾害等非自然灾害所造成损失由乙方负责。</div>
                <div class="text">2、乙方无权转租、转借、转卖该房屋，及屋内家具家电，不得擅自改动房屋结构，爱护屋内设施，如有人为原因造成破损丢失应维修完好，
                否则照价赔偿。并做好防火，防盗，防漏水，和阳台摆放、花盆的安全工作，若造成损失责任自负。</div>
                <div class="text">3、乙方必须按时缴纳房租，否则视为乙方违约。协议终止。</div>
                <div class="text">4、乙方应遵守居住区内各项规章制度，按时缴纳水、电、气、光纤、电话、物业管理等费用。</div>
                <div class="text">5、甲方保证该房屋无产权纠纷。如遇拆迁，乙方无条件搬出，已交租金甲方按未满天数退还。</div>
                <div class="text">6、备注：</div>
                <div class="text">四、本合同一式两份，自双方签字之日起生效。</div>
                <div class="text">甲方签章(出租方) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;乙方签章(承租方)</div><br/>
                <div class="text">电话：</div>
                <div class="text">日期： &nbsp;&nbsp;&nbsp;&nbsp;年 &nbsp;&nbsp;月 &nbsp;&nbsp;日</div>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible = false" class="cancel" style="margin-right: 10px">关 闭</el-button>
                </div>
              </el-dialog>
            </template>
            <!-- 合同项 -->
            <el-descriptions-item label-class-name="label-hid" content-class-name="content-hid">
              <template slot="label">
                甲方ID
              </template>
              {{item.hid}}
            </el-descriptions-item>
            <el-descriptions-item label-class-name="label-uid" content-class-name="content-uid">
              <template slot="label">
                乙方ID
              </template>
              {{ item.uid }}
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
    this.$emit('active',5);
    window.myData = this;
  },
  name: "AdminContract",
  data() {
    return {
      activeName: 'first',
      input: '',
      select: '1',
      noContractVisible: false,
      dialogFormVisible: false,
      form: {
        hid: '',
        uid: '',
        location: '',
        order_time: '',
        duration: '',
        amount: ''
      },
      options: [{
        select: '1',
        label: '合同ID'
      }, {
        select: '2',
        label: '用户ID'
      }],
      contract: [{
        id: '1',
        uid: '2',
        hid: '3',
        order_time: '2022/1/11',
        duration: '10',
        amount: '30000',
        location: '北京海淀', // 要让后端返回
        visible: true
      }, {
        id: '2',
        uid: '3',
        hid: '4',
        order_time: '2022/2/12',
        duration: '8',
        amount: '24000',
        location: '北京海淀区学院路37号', // 要让后端返回
        visible: true
      }]
    }
  },
  methods: {
    check(index) {
      this.dialogFormVisible = true;
      this.form.uid = this.contract[index].uid;
      this.form.hid = this.contract[index].hid;
      this.form.location = this.contract[index].location;
      this.form.order_time = this.contract[index].order_time;
      this.form.duration = this.contract[index].duration;
      this.form.amount = this.contract[index].amount;
    },
    search() {
      let i, len = this.contract.length, flag = 0;
      if (this.select === '1') {
        if (this.input !== '') {
          for (i = 0; i < len; i++) {
            if (this.input !== this.contract[i].id) {
              this.contract[i].visible = false;
            } else {
              this.contract[i].visible = true;
              flag = 1;
            }
          }
        } else {
          for (i = 0; i < len; i++) {
            this.contract[i].visible = true;
          }
          flag = 1;
        }
      } else {
        if (this.input !== '') {
          for (i = 0; i < len; i++) {
            if (this.input !== this.contract[i].uid) {
              this.contract[i].visible = false;
            } else {
              this.contract[i].visible = true;
              flag = 1;
            }
          }
        } else {
          for (i = 0; i < len; i++) {
            this.contract[i].visible = true;
          }
          flag = 1;
        }
      }
      if (flag === 0) {
        this.noContractVisible = true;
      } else {
        this.noContractVisible = false;
      }
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
  >>> .input-with-select > .el-input__inner:focus,>>> .input > .el-input__inner:focus{
    border-color: #42b983 !important;
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
  .button {
    background-color: #42b983;
    border: none;
  }
  .button:hover {
    background-color: #3cad7a;
  }
  >>> .label-hid, >>> .label-uid {
    width: 200px;
  }
  >>> .content-hid {
    width: 324px;
  }
  .box {
    border-bottom:2px solid grey;
    width:100px ;
    display: inline-block;
    text-align: center;
  }
  .text {
    padding-bottom: 20px;
  }
</style>

<style>
.cancel:hover {
  background-color: #d7eae2 !important;
  color: #42b983 !important;
  border-color: #d7eae2 !important;
}
</style>