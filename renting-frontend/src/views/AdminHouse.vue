<template>
 <div class="adminHouse">
   <template>
     <el-tabs type="border-card" v-model="activeName">
       <el-tab-pane label="房源管理" name="first">
         <div style="margin-top: 15px;">
           <el-input style="width: 850px" placeholder="请输入内容" v-model="input"
                     class="input-with-select" @keyup.enter.native="search()" clearable>
             <el-select style="width: 110px" v-model="select" slot="prepend" placeholder="请选择">
               <el-option label="房源ID" value="1"></el-option>
             </el-select>
             <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
           </el-input>
           <!-- 导入房源 -->
           <el-button type="primary" id="upload" style="background-color: #4a5c70;border: none;margin-left: 20px;" @click="upload()">
             导入<i class="el-icon-upload el-icon--right"></i>
           </el-button>
           <el-dialog title="导入房源" :visible.sync="dialogFormVisible">
             <el-form :model="form">
               <el-form-item label="位置" :label-width="formLabelWidth">
                 <el-input v-model="form.location" autocomplete="off" class="input" clearable></el-input>
               </el-form-item>
               <el-form-item label="面积" :label-width="formLabelWidth">
                 <el-input v-model="form.area" autocomplete="off" class="input" clearable></el-input>
               </el-form-item>
               <el-form-item label="类型" :label-width="formLabelWidth">
                 <el-select id="selectType" v-model="form.type" placeholder="请选择" clearable>
                   <el-option value="短租"></el-option>
                   <el-option value="长租"></el-option>
                 </el-select>
               </el-form-item>
               <el-form-item label="短租价格" :label-width="formLabelWidth">
                 <el-input v-model="form.short_price" autocomplete="off" class="input" clearable></el-input>
               </el-form-item>
               <el-form-item label="长租价格" :label-width="formLabelWidth">
                 <el-input v-model="form.long_price" autocomplete="off" class="input" clearable></el-input>
               </el-form-item>
               <el-form-item label="户型图" :label-width="formLabelWidth">
                 <span slot="label">
                   <el-tooltip content="只能上传jpg/png格式图片，且不超过2M"
                               placement="top">
                     <i class="el-icon-question"></i>
                   </el-tooltip>
                   户型图
                 </span>
                 <el-upload
                     class="upload-demo"
                     action="#"
                     ref="upload1"
                     :auto-upload="false"
                     :on-change="onChangeUpload1"
                     :show-file-list="false"
                     accept=".jpg,.jpeg,.png,.JPG,.JPEG"
                     :limit="1">
                   <el-button size="small" type="primary" class="upload">点击上传</el-button>
                 </el-upload>
                 <img v-if="form.floor_plan" :src="form.floor_plan" width="120px" height="120px">
               </el-form-item>
               <el-form-item label="实拍图" :label-width="formLabelWidth">
                 <span slot="label">
                   <el-tooltip content="只能上传jpg/png格式图片，且不超过2M"
                               placement="top">
                     <i class="el-icon-question"></i>
                   </el-tooltip>
                   实拍图
                 </span>
                 <el-upload
                     class="upload-demo"
                     action="#"
                     ref="upload2"
                     :auto-upload="false"
                     :on-change="onChangeUpload2"
                     :show-file-list="false"
                     accept=".jpg,.jpeg,.png,.JPG,.JPEG"
                     :limit="1">
                   <el-button size="small" type="primary" class="upload">点击上传</el-button>
                 </el-upload>
                 <img v-if="form.pictures" :src="form.pictures" width="120px" height="120px">
               </el-form-item>
               <el-form-item label="描述" :label-width="formLabelWidth">
                 <el-input type="textarea" v-model="form.details" autocomplete="off" class="input" clearable></el-input>
               </el-form-item>
             </el-form>
             <div slot="footer" class="dialog-footer">
               <el-button @click="dialogFormVisible = false" class="cancel" style="margin-right: 10px">取 消</el-button>
               <el-popconfirm
                   confirm-button-text='是的'
                   cancel-button-text='不是'
                   @confirm="importHouse()"
                   title="是否确定导入信息？"
               >
                 <el-button slot="reference" type="primary"  class="confirm">确 定</el-button>
               </el-popconfirm>
             </div>
           </el-dialog>
         </div>
         <el-empty description="暂无房源" :image-size="200" v-if="house.length === 0"></el-empty>
         <el-empty description="搜索为空" :image-size="200" v-if="house.length !== 0 && this.noHouseVisible"></el-empty>
         <!-- 显示房源 -->
         <el-descriptions v-for='(item,index) in house' v-if="item.visible" :key="index"
                          class="margin-top" :title="'ID: '+item.id" :column="3" border >
           <template slot="extra">
             <!-- 帮助租房 -->
             <el-button class="button" v-if="item.available==='1'" type="primary"
                        id="delete" size="small" @click="help()"
                        style="margin-right: 10px">
               帮租
             </el-button>
             <el-dialog title="帮助租房" :visible.sync="dialogFormVisible2">
               <el-form :model="form2">
                 <el-form-item label="用户ID" :label-width="formLabelWidth">
                   <el-input v-model="form2.uid" autocomplete="off" class="input" clearable></el-input>
                 </el-form-item>
                 <el-form-item label="房源ID" :label-width="formLabelWidth">
                   <el-input v-model="form2.hid" autocomplete="off" class="input" clearable></el-input>
                 </el-form-item>
                 <el-form-item label="类型" :label-width="formLabelWidth">
                   <el-select id="selectType" v-model="form2.type" placeholder="请选择" clearable>
                     <el-option value="短租"></el-option>
                     <el-option value="长租"></el-option>
                   </el-select>
                 </el-form-item>
                 <el-form-item v-if="form2.type==='短租'" label="租借时长" :label-width="formLabelWidth">
                   <el-input v-model="form2.duration" autocomplete="off" class="input" placeholder="day" clearable></el-input>
                 </el-form-item>
                 <el-form-item v-else-if="form2.type==='长租'" label="租借时长" :label-width="formLabelWidth">
                   <el-input v-model="form2.duration" autocomplete="off" class="input" placeholder="month" clearable></el-input>
                 </el-form-item>
                 <el-form-item v-else label="租借时长" :label-width="formLabelWidth">
                   <el-input v-model="form2.duration" autocomplete="off" class="input" :disabled="true" placeholder="请选择类型"></el-input>
                 </el-form-item>
                 <el-form-item label="交易额" :label-width="formLabelWidth">
                   <el-input v-model="form2.amount" autocomplete="off" class="input" clearable></el-input>
                 </el-form-item>
                 <el-form-item label="备注" :label-width="formLabelWidth">
                   <el-input type="textarea" v-model="form2.details" autocomplete="off" class="input" placeholder="可为空" clearable></el-input>
                 </el-form-item>
               </el-form>
               <div slot="footer" class="dialog-footer">
                 <el-button @click="dialogFormVisible2 = false" class="cancel" style="margin-right: 10px">取 消</el-button>
                 <el-popconfirm
                     confirm-button-text='是的'
                     cancel-button-text='不是'
                     @confirm="Confirm()"
                     title="是否确定要提交帮助租房？"
                 >
                   <el-button slot="reference" type="primary"  class="confirm">确 定</el-button>
                 </el-popconfirm>
               </div>
             </el-dialog>
             <!-- 暂停出租 -->
             <el-button class="button" v-if="item.available==='1'" type="primary" id="delete" size="small" @click="open2(index)">停租</el-button>
             <!-- 删除房源 -->
             <el-button class="button" type="primary" id="delete" size="small" @click="open(index)">删除</el-button>
           </template>
           <!-- 房源项 -->
           <el-descriptions-item label-class-name="label-area" content-class-name="content-area">
             <template slot="label">
               面积
             </template>
             {{ item.area }}
           </el-descriptions-item>
           <el-descriptions-item v-if="item.available==='1'" label-class-name="label-available" content-class-name="content-available">
             <template slot="label">
               状态
             </template>
             可出租
           </el-descriptions-item>
           <el-descriptions-item v-else label-class-name="label-available" content-class-name="content-available">
             <template slot="label">
               状态
             </template>
             不可出租
           </el-descriptions-item>
           <el-descriptions-item label-class-name="label-location">
             <template slot="label">
               位置
             </template>
             {{item.location}}
           </el-descriptions-item>
           <el-descriptions-item v-if="item.type==='1'">
             <template slot="label">
               类型
             </template>
             单人间
           </el-descriptions-item>
           <el-descriptions-item v-else-if="item.type==='2'">
             <template slot="label">
               类型
             </template>
             双人间
           </el-descriptions-item>
           <el-descriptions-item v-else>
             <template slot="label">
               类型
             </template>
             四人间
           </el-descriptions-item>
           <el-descriptions-item>
             <template slot="label">
               短租价格
             </template>
             {{ item.short_price }}
           </el-descriptions-item>
           <el-descriptions-item>
             <template slot="label">
               长租价格
             </template>
             {{ item.long_price }}
           </el-descriptions-item>
           <el-descriptions-item>
             <template slot="label">
               户型图
             </template>
             <el-image :src="item.floor_planSrc" style="width: 130px;height: 130px"></el-image>
           </el-descriptions-item>
           <el-descriptions-item>
             <template slot="label">
               实拍图
             </template>
             <el-image :src="item.picturesSrc" style="width: 130px;height: 130px"></el-image>
           </el-descriptions-item>
           <el-descriptions-item>
             <template slot="label">
               描述
             </template>
             {{ item.details }}
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
    this.$emit('active',3);
    window.myData = this;
  },
  name: "AdminHouse",
  data() {
    return {
      activeName: 'first',
      input: '',
      select: '1',
      dialogFormVisible: false,
      dialogFormVisible2: false,
      noHouseVisible: false,
      formLabelWidth: '120px',
      form2: {
        uid: '',
        hid: '',
        type: '',
        order_time: '',
        duration: '',
        amount: '',
        details: ''
      },
      form: {
        location: '',
        area: '',
        type: '',
        short_price: '',
        long_price: '',
        floor_plan: '',
        pictures: '',
        details: ''
      },
      house: [{
        id: '1',
        short_price: '300/day',
        long_price: '3000/month',
        location: '北京海淀',
        area: '90m2',
        available: '1',
        type: '2',
        // 待修改：后面要换成base64
        floor_planSrc: require('../assets/logo.png'),
        picturesSrc: require('../assets/logo.png'),
        details: '',
        visible: true
      }, {
        id: '2',
        short_price: '500/day',
        long_price: '7000/month',
        location: '北京朝阳',
        area: '110m2',
        available: '0',
        type: '3',
        // 待修改：后面要换成base64
        floor_planSrc: require('../assets/logo.png'),
        picturesSrc: require('../assets/logo.png'),
        details: '',
        visible: true
      }, {
        id: '3',
        short_price: '250/day',
        long_price: '3000/month',
        location: '北京朝阳',
        area: '88m2',
        available: '1',
        type: '1',
        // 待修改：后面要换成base64
        floor_planSrc: require('../assets/logo.png'),
        picturesSrc: require('../assets/logo.png'),
        details: '',
        visible: true
      }],
    }
  },
  methods: {
    search() {
      let i, len = this.house.length, flag = 0;
      if (this.input !== '') {
        for (i = 0; i < len; i++) {
          if (this.input !== this.house[i].id) {
            this.house[i].visible = false;
          } else {
            this.house[i].visible = true;
            flag = 1;
          }
        }
      } else {
        for (i = 0; i < len; i++) {
          this.house[i].visible = true;
        }
        flag = 1;
      }
      if (flag === 0) {
        this.noHouseVisible = true;
      } else {
        this.noHouseVisible = false;
      }
    },
    open(index) {
      this.$confirm('此操作将永久删除该房源, 是否继续?', '提示', {
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
      this.house.splice(index, 1);
    },
    open2(index) {
      this.$confirm('此操作将暂停出租该房源, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        confirmButtonClass: 'confirm',
        cancelButtonClass: 'cancel',
        type: 'warning'
      }).then(() => {
        this.house[index].available = '0';
        // 调用后端接口

        this.$message({
          type: 'success',
          message: '暂停出租成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消停租'
        });
      });
    },
    help() {
      this.dialogFormVisible2 = true;
      this.form2.uid = '';
      this.form2.hid = '';
      this.form2.type = '';
      this.form2.duration = '';
      this.form2.amount = '';
      this.form2.details = '';
    },
    upload() {
      this.dialogFormVisible = true;
      this.form.location = '';
      this.form.area = '';
      this.form.type = '';
      this.form.short_price = '';
      this.form.long_price = '';
      this.form.floor_plan = '';
      this.form.pictures = '';
      this.form.details = '';
    },
    onChangeUpload1(file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
        return
      }
      const self = this
      const reader = new FileReader()
      reader.onload = function (e) {
        self.form.floor_plan = reader.result
        self.$refs.upload1.clearFiles()
      }
      reader.readAsDataURL(file.raw)
      console.log(this.form.floor_plan)
    },
    onChangeUpload2(file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
        return
      }
      const self = this
      const reader = new FileReader()
      reader.onload = function (e) {
        self.form.pictures = reader.result
        self.$refs.upload2.clearFiles()
      }
      reader.readAsDataURL(file.raw)
      console.log(this.form.pictures)
    },
    importHouse() {

    },
    Confirm() {

    }
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
  >>> .input-with-select > .el-input__inner:focus,>>> .input > .el-input__inner:focus,
  >>> .input > .el-textarea__inner:focus, >>> #selectType:focus{
    border-color: #42b983 !important;
  }
  #upload:hover {
    background-color: #364354 !important;
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
  >>> .label-location, >>> .label-area, >>> .label-available {
    width: 130px;
  }
  >>> .content-available, >>> .content-area {
    width: 160px;
  }
  .button, .upload{
    background-color: #42b983;
    border: none;
  }
  .button:hover, .upload:hover{
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