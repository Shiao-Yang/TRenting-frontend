<template>
 <div class="adminTicket">
   <template>
     <el-tabs type="border-card" v-model="activeName">
       <el-tab-pane label="报修查询" name="first">
         <el-badge :is-dot="ticket1.length!==0" style="margin-top: 5px">
           <el-switch
               style="display: block"
               v-model="value1"
               active-color="#ff4949"
               inactive-color="#13ce66"
               active-text="待处理"
               inactive-text="已处理">
           </el-switch>
         </el-badge>
         <div style="margin-top: 15px;">
           <!-- 搜索报修 -->
           <el-input style="width: 850px" v-if="value1===true" placeholder="请输入内容"
                     v-model="input1" class="input-with-select" @keyup.enter.native="search1" clearable>
             <el-select style="width: 110px" v-model="select1" slot="prepend" placeholder="请选择">
               <el-option
                   v-for="item in options1"
                   :key="item.select1"
                   :label="item.label"
                   :value="item.select1">
               </el-option>
             </el-select>
             <el-button slot="append" icon="el-icon-search" @click="search1"></el-button>
           </el-input>
           <el-input style="width: 850px" v-if="value1===false" placeholder="请输入内容"
                     v-model="input2" class="input-with-select" @keyup.enter.native="search2" clearable>
             <el-select style="width: 110px" v-model="select1" slot="prepend" placeholder="请选择">
               <el-option
                   v-for="item in options1"
                   :key="item.select1"
                   :label="item.label"
                   :value="item.select1">
               </el-option>
             </el-select>
             <el-button slot="append" icon="el-icon-search" @click="search2"></el-button>
           </el-input>
         </div>
         <!-- 无数据或搜索为空 -->
         <el-empty description="暂无报修" :image-size="200" v-if="ticket1.length === 0 && value1===true"></el-empty>
         <el-empty description="搜索为空" :image-size="200" v-if="ticket1.length !== 0
         && this.noTicketVisible1 && value1===true"></el-empty>
         <el-empty description="暂无已处理报修" :image-size="200" v-if="ticket2.length === 0 && value1===false"></el-empty>
         <el-empty description="搜索为空" :image-size="200" v-if="ticket2.length !== 0
         && this.noTicketVisible2 && value1===false"></el-empty>
         <!-- 显示待处理报修 -->
         <el-descriptions v-for='(item,index) in ticket1' v-if="item.visible && value1===true" :key="index"
                          class="margin-top" :title="'ID: '+item.id" :column="2" border >
           <template slot="extra">
             <!-- 生成工单 -->
             <el-button class="button" type="primary" id="modify" size="small" @click="makeTicket">生成工单</el-button>
             <el-dialog title="生成工单" :visible.sync="dialogFormVisible1">
               <el-form :model="form1">
                 <el-form-item label="师傅ID" :label-width="formLabelWidth" required>
                   <el-input v-model="form1.wid" autocomplete="off" class="input" clearable></el-input>
                 </el-form-item>
                 <el-form-item label="维修日期" :label-width="formLabelWidth" required>
                   <el-date-picker type="date" placeholder="选择日期" v-model="form1.date"
                                   style="width: 100%;" clearable id="selectDate">

                   </el-date-picker>
                 </el-form-item>
               </el-form>
               <div slot="footer" class="dialog-footer">
                 <el-button @click="dialogFormVisible1 = false" class="cancel" style="margin-right: 10px">取 消</el-button>
                 <el-popconfirm
                     confirm-button-text='是的'
                     cancel-button-text='不是'
                     @confirm="Confirm1(index)"
                     title="是否确定要生成该工单？"
                 >
                   <el-button slot="reference" type="primary"  class="confirm">确 定</el-button>
                 </el-popconfirm>
               </div>
             </el-dialog>
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
         <!-- 显示已生成的订单 -->
         <el-descriptions v-for='(item,index) in ticket2' v-if="item.visible && value1===false" :key="index"
                          class="margin-top" :title="'ID: '+item.id" :column="3" border >
           <template slot="extra">
           </template>
           <!-- 报修项 -->
           <el-descriptions-item label-class-name="label-uid2" content-class-name="content-uid2">
             <template slot="label">
               用户ID
             </template>
             {{item.uid}}
           </el-descriptions-item>
           <el-descriptions-item label-class-name="label-hid2" content-class-name="content-hid2">
             <template slot="label">
               房源ID
             </template>
             {{ item.hid }}
           </el-descriptions-item>
           <el-descriptions-item label-class-name="label-wid2">
             <template slot="label">
               师傅ID
             </template>
             {{ item.wid }}
           </el-descriptions-item>
           <el-descriptions-item>
             <template slot="label">
               报修图片
             </template>
             <el-image :src="item.pictureSrc" style="width: 100px;height: 100px"></el-image>
           </el-descriptions-item>
           <el-descriptions-item>
             <template slot="label">
               维修日期
             </template>
             {{ item.date}}
           </el-descriptions-item>
           <el-descriptions-item>
             <template slot="label">
               报修信息
             </template>
             {{ item.info }}
           </el-descriptions-item>
         </el-descriptions>
       </el-tab-pane>
       <el-tab-pane label="投诉查询" name="second">
         <el-badge :is-dot="complaint1.length!==0" style="margin-top: 5px">
           <el-switch
               style="display: block"
               v-model="value2"
               active-color="#ff4949"
               inactive-color="#13ce66"
               active-text="待处理"
               inactive-text="已处理">
           </el-switch>
         </el-badge>
         <div style="margin-top: 15px;">
           <el-input v-if="value2===true" style="width: 850px" placeholder="请输入内容" v-model="input3"
                     @keyup.enter.native="search3" class="input-with-select" clearable>
             <el-select style="width: 110px" v-model="select2" slot="prepend" placeholder="请选择">
               <el-option
                   v-for="item in options2"
                   :key="item.select2"
                   :label="item.label"
                   :value="item.select2">
               </el-option>
             </el-select>
             <el-button slot="append" icon="el-icon-search" @click="search3"></el-button>
           </el-input>
           <el-input v-if="value2===false" style="width: 850px" placeholder="请输入内容" v-model="input4"
                     @keyup.enter.native="search4" class="input-with-select" clearable>
             <el-select style="width: 110px" v-model="select2" slot="prepend" placeholder="请选择">
               <el-option
                   v-for="item in options2"
                   :key="item.select2"
                   :label="item.label"
                   :value="item.select2">
               </el-option>
             </el-select>
             <el-button slot="append" icon="el-icon-search" @click="search4"></el-button>
           </el-input>
         </div>
         <!-- 无数据或搜索为空 -->
         <el-empty description="暂无投诉" :image-size="200" v-if="complaint1.length === 0 && value2===true"></el-empty>
         <el-empty description="搜索为空" :image-size="200" v-if="complaint1.length !== 0
         && this.noComplaintVisible1 && value2===true"></el-empty>
         <el-empty description="暂无已处理投诉" :image-size="200" v-if="complaint2.length === 0 && value2===false"></el-empty>
         <el-empty description="搜索为空" :image-size="200" v-if="complaint2.length !== 0
         && this.noComplaintVisible2 && value2===false"></el-empty>
         <!-- 显示待处理投诉 -->
         <el-descriptions v-for='(item,index) in complaint1' v-if="item.visible && value2===true" :key="index"
                          class="margin-top" :title="'ID: '+item.id" :column="2" border >
           <template slot="extra">
             <!-- 处理投诉 -->
             <el-button class="button" type="primary" id="modify" size="small" @click="handleComplaint">处理</el-button>
             <el-dialog title="处理投诉" :visible.sync="dialogFormVisible2">
               <el-form :model="reply">
                 <el-form-item label="回复信息" :label-width="formLabelWidth" required>
                   <el-input type="textarea" v-model="reply" autocomplete="off"
                             :autosize="{minRows: 5}" class="input" clearable></el-input>
                 </el-form-item>
               </el-form>
               <div slot="footer" class="dialog-footer">
                 <el-button @click="dialogFormVisible2 = false" class="cancel" style="margin-right: 10px">取 消</el-button>
                 <el-popconfirm
                     confirm-button-text='是的'
                     cancel-button-text='不是'
                     @confirm="Confirm2(index)"
                     title="是否确定要回复该投诉？"
                 >
                   <el-button slot="reference" type="primary"  class="confirm">确 定</el-button>
                 </el-popconfirm>
               </div>
             </el-dialog>
           </template>
           <!-- 投诉项 -->
           <el-descriptions-item label-class-name="label-uid3" content-class-name="content-uid3">
             <template slot="label">
               用户ID
             </template>
             {{item.uid}}
           </el-descriptions-item>
           <el-descriptions-item label-class-name="label-tid3" content-class-name="content-tid3">
             <template slot="label">
               工单ID
             </template>
             {{ item.tid }}
           </el-descriptions-item>
           <el-descriptions-item>
             <template slot="label">
               投诉图片
             </template>
             <el-image :src="item.pictureSrc" style="width: 100px;height: 100px"></el-image>
           </el-descriptions-item>
           <el-descriptions-item>
             <template slot="label">
               投诉内容
             </template>
             {{ item.contents }}
           </el-descriptions-item>
         </el-descriptions>
         <!-- 显示已处理的投诉 -->
         <el-descriptions v-for='(item,index) in complaint2' v-if="item.visible && value2===false" :key="index"
                          class="margin-top" :title="'ID: '+item.id" :column="3" border >
           <template slot="extra">
           </template>
           <!-- 投诉项 -->
           <el-descriptions-item label-class-name="label-uid4" content-class-name="content-uid4">
             <template slot="label">
               用户ID
             </template>
             {{item.uid}}
           </el-descriptions-item>
           <el-descriptions-item label-class-name="label-tid4" content-class-name="content-tid4">
             <template slot="label">
               工单ID
             </template>
             {{ item.tid }}
           </el-descriptions-item>
           <el-descriptions-item label-class-name="label-contents4">
             <template slot="label">
               投诉内容
             </template>
             {{ item.contents }}
           </el-descriptions-item>
           <el-descriptions-item>
             <template slot="label">
               投诉图片
             </template>
             <el-image :src="item.pictureSrc" style="width: 100px;height: 100px"></el-image>
           </el-descriptions-item>
           <el-descriptions-item>
             <template slot="label">
               客服回复
             </template>
             {{ item.reply }}
           </el-descriptions-item>
         </el-descriptions>
       </el-tab-pane>

       <el-tab-pane label="工单审核" name="third">
         <el-badge :is-dot="ticket3.length!==0" style="margin-top: 5px">
           <el-switch
               style="display: block"
               v-model="value3"
               active-color="#ff4949"
               inactive-color="#13ce66"
               active-text="待审核"
               inactive-text="已审核">
           </el-switch>
         </el-badge>
         <div style="margin-top: 15px;">
           <!-- 搜索待审核工单 -->
           <el-input style="width: 850px" v-if="value3===true" placeholder="请输入内容" v-model="input5"
                     class="input-with-select" @keyup.enter.native="search5" clearable>
             <el-select style="width: 110px" v-model="select3" slot="prepend" placeholder="请选择">
               <el-option
                   v-for="item in options3"
                   :key="item.select3"
                   :label="item.label"
                   :value="item.select3">
               </el-option>
             </el-select>
             <el-button slot="append" icon="el-icon-search" @click="search5"></el-button>
           </el-input>
           <!-- 搜素已完成工单 -->
           <el-input style="width: 850px" v-if="value3===false" placeholder="请输入内容" v-model="input6"
                     class="input-with-select" @keyup.enter.native="search6" clearable>
             <el-select style="width: 110px" v-model="select3" slot="prepend" placeholder="请选择">
               <el-option
                   v-for="item in options3"
                   :key="item.select3"
                   :label="item.label"
                   :value="item.select3">
               </el-option>
             </el-select>
             <el-button slot="append" icon="el-icon-search" @click="search6"></el-button>
           </el-input>
         </div>
         <!-- 无数据或搜索为空 -->
         <el-empty description="暂无待审核工单" :image-size="200" v-if="ticket3.length === 0 && value3===true"></el-empty>
         <el-empty description="搜索为空" :image-size="200" v-if="ticket3.length !== 0
         && this.noTicketVisible3 && value3===true"></el-empty>
         <el-empty description="暂无已完成工单" :image-size="200" v-if="ticket4.length === 0 && value3===false"></el-empty>
         <el-empty description="搜索为空" :image-size="200" v-if="ticket4.length !== 0
         && this.noTicketVisible4 && value3===false"></el-empty>
         <!-- 显示待审核工单 -->
         <el-descriptions v-for='(item,index) in ticket3' v-if="item.visible&&value3===true" :key="index"
                          class="margin-top" :title="'ID: '+item.id" :column="3" border >
           <template slot="extra">
             <!-- 审核工单 -->
             <el-button type="primary" class="button" size="small" @click="check(index)">审核</el-button>
           </template>
           <!-- 工单项 -->
           <el-descriptions-item label-class-name="label-uid5" content-class-name="content-uid5">
             <template slot="label">
               用户ID
             </template>
             {{item.uid}}
           </el-descriptions-item>
           <el-descriptions-item label-class-name="label-hid5" content-class-name="content-hid5">
             <template slot="label">
               房源ID
             </template>
             {{item.hid}}
           </el-descriptions-item>
           <el-descriptions-item label-class-name="label-wid5" content-class-name="content-wid5">
             <template slot="label">
               师傅ID
             </template>
             {{item.wid}}
           </el-descriptions-item>
           <el-descriptions-item>
             <template slot="label">
               审核状态
             </template>
             待审核
           </el-descriptions-item>
           <el-descriptions-item>
             <template slot="label">
               维修日期
             </template>
             {{item.date}}
           </el-descriptions-item>
           <el-descriptions-item>
             <template slot="label">
               报修信息
             </template>
             {{item.info}}
           </el-descriptions-item>
           <el-descriptions-item>
             <template slot="label">
               报修图片
             </template>
             <el-image :src="item.pictureSrc" style="width: 100px;height: 100px"></el-image>
           </el-descriptions-item>
           <el-descriptions-item>
             <template slot="label">
               处理图片
             </template>
             <el-image :src="item.handleImage" style="width: 100px;height: 100px"></el-image>
           </el-descriptions-item>
           <el-descriptions-item>
             <template slot="label">
               处理文字
             </template>
             {{item.handleText}}
           </el-descriptions-item>
         </el-descriptions>
         <!-- 显示已审核工单 -->
         <el-descriptions v-for='(item,index) in ticket4' v-if="item.visible&&value3===false" :key="index"
                          class="margin-top" :title="'ID: '+item.id" :column="3" border >
           <!-- 工单项 -->
           <el-descriptions-item label-class-name="label-uid5" content-class-name="content-uid5">
             <template slot="label">
               用户ID
             </template>
             {{item.uid}}
           </el-descriptions-item>
           <el-descriptions-item label-class-name="label-hid5" content-class-name="content-hid5">
             <template slot="label">
               房源ID
             </template>
             {{item.hid}}
           </el-descriptions-item>
           <el-descriptions-item label-class-name="label-wid5" content-class-name="content-wid5">
             <template slot="label">
               师傅ID
             </template>
             {{item.wid}}
           </el-descriptions-item>
           <el-descriptions-item>
             <template slot="label">
               审核状态
             </template>
             已审核
           </el-descriptions-item>
           <el-descriptions-item>
             <template slot="label">
               维修日期
             </template>
             {{item.date}}
           </el-descriptions-item>
           <el-descriptions-item>
             <template slot="label">
               报修信息
             </template>
             {{item.info}}
           </el-descriptions-item>
           <el-descriptions-item>
             <template slot="label">
               报修图片
             </template>
             <el-image :src="item.pictureSrc" style="width: 100px;height: 100px"></el-image>
           </el-descriptions-item>
           <el-descriptions-item>
             <template slot="label">
               处理图片
             </template>
             <el-image :src="item.handleImage" style="width: 100px;height: 100px"></el-image>
           </el-descriptions-item>
           <el-descriptions-item>
             <template slot="label">
               处理文字
             </template>
             {{item.handleText}}
           </el-descriptions-item>
           <el-descriptions-item>
             <template slot="label">
               用户评分
             </template>
             {{item.comment}}
           </el-descriptions-item>
           <el-descriptions-item>
             <template slot="label">
               用户备注
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
    this.$emit('active',4);
    window.myData = this;
  },
  name: "AdminTicket",
  data() {
    return {
      value1: false,
      value2: false,
      value3: false,
      activeName: "first",
      input1: '',
      input2: '',
      input3: '',
      input4: '',
      input5: '',
      input6: '',
      noTicketVisible1: false,
      noTicketVisible2: false,
      noTicketVisible3: false,
      noTicketVisible4: false,
      noComplaintVisible1: false,
      noComplaintVisible2: false,
      formLabelWidth: '120px',
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      reply: '',
      form1: {
        wid: '',
        date: ''
      },
      options1: [{
        select1: '1',
        label: '报修ID'
      }, {
        select1: '2',
        label: '用户ID'
      }],
      select1: '1',
      options2: [{
        select2: '1',
        label: '投诉ID'
      }, {
        select2: '2',
        label: '用户ID'
      }],
      select2: '1',
      options3: [{
        select3: '1',
        label: '工单ID'
      }, {
        select3: '2',
        label: '用户ID'
      }],
      select3: '1',
      ticket1: [{
        id: '1',
        uid: '2',
        hid: '3',
        wid: '',
        info: '水管坏了',
        // 测试用的本地图片
        pictureSrc: require('../assets/logo.png'),
        status: '1',
        date: '',
        comment: '',
        details: '',
        visible: true
      }, {
        id: '2',
        uid: '1',
        hid: '4',
        wid: '',
        info: '空调坏了',
        // 测试用的本地图片
        pictureSrc: require('../assets/logo.png'),
        status: '1',
        date: '',
        comment: '',
        details: '',
        visible: true
      }],
      ticket2: [],
      ticket3: [{
        id: '3',
        uid: '2',
        hid: '5',
        wid: '2',
        info: '电视机坏了',
        // 测试用的本地图片
        pictureSrc: require('../assets/logo.png'),
        status: '3',
        date: '2022/3/12',
        comment: '',
        details: '',
        handleImage: require('../assets/logo.png'),
        handleText: '11111',
        visible: true
      }],
      ticket4: [],
      complaint1: [{
        id: '1',
        contents: '212321312',
        pictureSrc: require('../assets/logo.png'),
        tid: '1',
        uid: '2',
        visible: true
      }],
      complaint2: [
        {
          id: '2',
          contents: '212321312',
          pictureSrc: require('../assets/logo.png'),
          tid: '2',
          uid: '3',
          reply: '1111',
          visible: true
        }
      ]
    }
  },
  methods: {
    makeTicket() {
      this.form1.wid = '';
      this.form1.date = '';
      this.dialogFormVisible1 = true;
    },
    Confirm1(index) {
      if (this.form1.wid===''||this.form1.date==='') {
        this.$message.error('请填写完整内容!')
      } else {
        let tmp = {
          id: this.ticket1[index].id,
          uid: this.ticket1[index].uid,
          hid: this.ticket1[index].hid,
          wid: this.form1.wid,
          info: this.ticket1[index].info,
          pictureSrc: this.ticket1[index].pictureSrc,
          status: '2',
          date: this.form1.date.getFullYear()+'/'+(this.form1.date.getMonth()+1)+'/'+this.form1.date.getDate(),
          comment: '',
          details: '',
          visible: true
        }
        this.ticket2.push(tmp);
        this.ticket1.splice(index, 1);
        this.dialogFormVisible1 = false;
        this.search1();
        this.search2();
      }
    },
    Confirm2(index) {
      if (this.reply==='') {
        this.$message.error('请填写回复内容！')
      } else {
        let tmp = {
          id: this.complaint1[index].id,
          contents: this.complaint1[index].contents,
          pictureSrc: this.complaint1[index].pictureSrc,
          tid: this.complaint1[index].tid,
          uid: this.complaint1[index].uid,
          reply: this.reply,
          visible: true
        }
        this.complaint2.push(tmp);
        this.complaint1.splice(index, 1);
        this.dialogFormVisible2 = false;
        this.search3();
        this.search4();
      }
    },
    search1() {
      let i, len = this.ticket1.length, flag = 0;
      if (this.select1 === '1') {
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
      } else {
        if (this.input1 !== '') {
          for (i = 0; i < len; i++) {
            if (this.input1 !== this.ticket1[i].uid) {
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
      }
      if (flag === 0) {
        this.noTicketVisible1 = true;
      } else {
        this.noTicketVisible1 = false;
      }
    },
    search2() {
      let i, len = this.ticket2.length, flag = 0;
      if (this.select1 === '1') {
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
      } else {
        if (this.input2 !== '') {
          for (i = 0; i < len; i++) {
            if (this.input2 !== this.ticket2[i].uid) {
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
      }
      if (flag === 0) {
        this.noTicketVisible2 = true;
      } else {
        this.noTicketVisible2 = false;
      }
    },
    search3() {
      let i, len = this.complaint1.length, flag = 0;
      if (this.select2 === '1') {
        if (this.input3 !== '') {
          for (i = 0; i < len; i++) {
            if (this.input3 !== this.complaint1[i].id) {
              this.complaint1[i].visible = false;
            } else {
              this.complaint1[i].visible = true;
              flag = 1;
            }
          }
        } else {
          for (i = 0; i < len; i++) {
            this.complaint1[i].visible = true;
          }
          flag = 1;
        }
      } else {
        if (this.input3 !== '') {
          for (i = 0; i < len; i++) {
            if (this.input3 !== this.complaint1[i].uid) {
              this.complaint1[i].visible = false;
            } else {
              this.complaint1[i].visible = true;
              flag = 1;
            }
          }
        } else {
          for (i = 0; i < len; i++) {
            this.complaint1[i].visible = true;
          }
          flag = 1;
        }
      }
      if (flag === 0) {
        this.noComplaintVisible1 = true;
      } else {
        this.noComplaintVisible1 = false;
      }
    },
    search4() {
      let i, len = this.complaint2.length, flag = 0;
      if (this.select2 === '1') {
        if (this.input4 !== '') {
          for (i = 0; i < len; i++) {
            if (this.input4 !== this.complaint2[i].id) {
              this.complaint2[i].visible = false;
            } else {
              this.complaint2[i].visible = true;
              flag = 1;
            }
          }
        } else {
          for (i = 0; i < len; i++) {
            this.complaint2[i].visible = true;
          }
          flag = 1;
        }
      } else {
        if (this.input4 !== '') {
          for (i = 0; i < len; i++) {
            if (this.input4 !== this.complaint2[i].uid) {
              this.complaint2[i].visible = false;
            } else {
              this.complaint2[i].visible = true;
              flag = 1;
            }
          }
        } else {
          for (i = 0; i < len; i++) {
            this.complaint2[i].visible = true;
          }
          flag = 1;
        }
      }
      if (flag === 0) {
        this.noComplaintVisible2 = true;
      } else {
        this.noComplaintVisible2 = false;
      }
    },
    search5() {
      let i, len = this.ticket3.length, flag = 0;
      if (this.select3 === '1') {
        if (this.input5 !== '') {
          for (i = 0; i < len; i++) {
            if (this.input5 !== this.ticket3[i].id) {
              this.ticket3[i].visible = false;
            } else {
              this.ticket3[i].visible = true;
              flag = 1;
            }
          }
        } else {
          for (i = 0; i < len; i++) {
            this.ticket3[i].visible = true;
          }
          flag = 1;
        }
      } else {
        if (this.input5 !== '') {
          for (i = 0; i < len; i++) {
            if (this.input5 !== this.ticket3[i].uid) {
              this.ticket3[i].visible = false;
            } else {
              this.ticket3[i].visible = true;
              flag = 1;
            }
          }
        } else {
          for (i = 0; i < len; i++) {
            this.ticket3[i].visible = true;
          }
          flag = 1;
        }
      }
      if (flag === 0) {
        this.noTicketVisible3 = true;
      } else {
        this.noTicketVisible3 = false;
      }
    },
    search6() {
      let i, len = this.ticket4.length, flag = 0;
      if (this.select3 === '1') {
        if (this.input6 !== '') {
          for (i = 0; i < len; i++) {
            if (this.input6 !== this.ticket4[i].id) {
              this.ticket4[i].visible = false;
            } else {
              this.ticket4[i].visible = true;
              flag = 1;
            }
          }
        } else {
          for (i = 0; i < len; i++) {
            this.ticket4[i].visible = true;
          }
          flag = 1;
        }
      } else {
        if (this.input6 !== '') {
          for (i = 0; i < len; i++) {
            if (this.input6 !== this.ticket4[i].uid) {
              this.ticket4[i].visible = false;
            } else {
              this.ticket4[i].visible = true;
              flag = 1;
            }
          }
        } else {
          for (i = 0; i < len; i++) {
            this.ticket4[i].visible = true;
          }
          flag = 1;
        }
      }
      if (flag === 0) {
        this.noTicketVisible4 = true;
      } else {
        this.noTicketVisible4 = false;
      }
    },
    handleComplaint() {
      this.dialogFormVisible2 = true;
      this.reply = '';
    },
    check(index) {
      this.$confirm('此操作将审核通过该工单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        confirmButtonClass: 'confirm',
        cancelButtonClass: 'cancel',
        type: 'warning'
      }).then(() => {
        // 调用接口

        let tmp = {
          id: this.ticket3[index].id,
          uid: this.ticket3[index].uid,
          hid: this.ticket3[index].hid,
          wid: this.ticket3[index].wid,
          info: this.ticket3[index].info,
          // 测试用的本地图片
          pictureSrc: this.ticket3[index].pictureSrc,
          status: '4',
          date: this.ticket3[index].date,
          comment: '',
          details: '',
          handleImage: this.ticket3[index].handleImage,
          handleText: this.ticket3[index].handleText,
          visible: true
        }
        this.ticket4.push(tmp);
        this.ticket3.splice(index, 1);
        this.search5();
        this.search6();
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
  >>> .label-uid, >>> .label-hid, >>> .label-hid2, >>> .label-uid2, >>> .label-wid2,
  >>> .label-uid3, >>> .label-tid3, >>> .label-uid4, >>> .label-tid4, >>> .label-contents4,
  >>> .label-uid5, >>> .label-hid5, >>> .label-wid5{
    width: 130px;
  }
  >>> .content-hid2, >>> .content-uid2, >>> .content-uid4, >>> .content-tid4,
  >>> .content-uid5, >>> .content-hid5{
    width: 160px;
  }
  >>> .content-uid, >>> .content-uid3 {
    width: 250px;
  }
  .button{
    background-color: #42b983;
    border: none;
  }
  .button:hover{
    background-color: #3cad7a;
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