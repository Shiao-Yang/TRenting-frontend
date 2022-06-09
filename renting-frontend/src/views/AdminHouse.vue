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
           <el-dialog title="导入房源" :visible.sync="dialogFormVisible" v-if="dialogFormVisible">
             <el-form :model="form" :rules="rules" ref="ruleForm">
               <el-form-item label="位置" :label-width="formLabelWidth" prop="location">
                 <el-input v-model="form.location" autocomplete="off" class="input" clearable></el-input>
               </el-form-item>
               <el-form-item label="面积" :label-width="formLabelWidth" prop="area">
                 <el-input v-model="form.area" autocomplete="off" class="input" placeholder="/m2" clearable></el-input>
               </el-form-item>
               <el-form-item label="类型" :label-width="formLabelWidth" required>
                 <el-select id="selectType" v-model="form.type" placeholder="请选择" clearable>
                   <el-option value="单人间"></el-option>
                   <el-option value="双人间"></el-option>
                   <el-option value="四人间"></el-option>
                 </el-select>
               </el-form-item>
               <el-form-item label="短租价格" :label-width="formLabelWidth" prop="short_price">
                 <el-input v-model="form.short_price" autocomplete="off" class="input" placeholder="/day" clearable></el-input>
               </el-form-item>
               <el-form-item label="长租价格" :label-width="formLabelWidth" prop="long_price">
                 <el-input v-model="form.long_price" autocomplete="off" class="input" placeholder="/month" clearable></el-input>
               </el-form-item>
               <el-form-item label="户型图" :label-width="formLabelWidth" required>
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
               <el-form-item label="实拍图" :label-width="formLabelWidth" required>
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
               <el-form-item label="具体地址" :label-width="formLabelWidth" prop="details">
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
                        id="delete" size="small" @click="help()">
               帮租
             </el-button>
             <!-- 暂停出租 -->
             <el-button class="button" v-if="item.available==='1'" type="primary" id="delete" size="small" @click="open2(index)">停租</el-button>
             <!-- 删除房源 -->
             <el-button class="button" type="primary" id="delete" size="small" @click="open(index)">删除</el-button>
             <el-dialog title="帮助租房" :visible.sync="dialogFormVisible2" v-if="dialogFormVisible2">
               <el-form :model="form2" :rules="rules2">
                 <el-form-item label="用户ID" :label-width="formLabelWidth" prop="uid">
                   <el-input v-model="form2.uid" autocomplete="off" class="input" clearable></el-input>
                 </el-form-item>
                 <el-form-item label="开始时间" :label-width="formLabelWidth" required>
                   <el-date-picker
                       id="selectDate"
                       v-model="form2.start_time"
                       type="datetime"
                       placeholder="选择日期时间">
                   </el-date-picker>
                 </el-form-item>
                 <el-form-item label="租借类型" :label-width="formLabelWidth" required>
                   <el-select id="selectType" v-model="form2.type" placeholder="请选择" clearable>
                     <el-option value="短租">短租 /天</el-option>
                     <el-option value="长租">长租 /月</el-option>
                   </el-select>
                 </el-form-item>
                 <el-form-item label="租借时长" :label-width="formLabelWidth" prop="duration">
                   <el-input v-model="form2.duration" autocomplete="off" class="input" placeholder="短租：/天  长租：/月" clearable></el-input>
                 </el-form-item>
                 <el-form-item label="交易额" :label-width="formLabelWidth" prop="amount">
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
                     @confirm="Confirm(index)"
                     title="是否确定要提交帮助租房？"
                 >
                   <el-button slot="reference" type="primary"  class="confirm">确 定</el-button>
                 </el-popconfirm>
               </div>
             </el-dialog>
           </template>
           <!-- 房源项 -->
           <el-descriptions-item label-class-name="label-area" content-class-name="content-area">
             <template slot="label">
               面积
             </template>
             {{ item.area }}m2
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
             {{ item.short_price }}/day
           </el-descriptions-item>
           <el-descriptions-item>
             <template slot="label">
               长租价格
             </template>
             {{ item.long_price }}/month
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
               具体地址
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
import qs from "qs";

export default {
  created() {
    this.$emit('active',3);
    window.myData = this;
    this.get_house_info();
  },
  name: "AdminHouse",
  data() {
    var checkFloat = (rule, value, callback) => {
      if (value !== '') {
        let floatReg = /^\d+(\.\d+)?$/
        console.log(value)
        if (floatReg.test(value)) {
          callback();
        } else {
          callback(new Error('请输入浮点数'));
        }
      }
    };
    var checkInt = (rule, value, callback) => {
      if (value !== '') {
        let intReg = /^\d+$/
        console.log(value)
        if (intReg.test(value)) {
          callback();
        } else {
          callback(new Error('请输入整数'))
        }
      }
    }
    return {
      activeName: 'first',
      input: '',
      select: '1',
      dialogFormVisible: false,
      dialogFormVisible2: false,
      noHouseVisible: false,
      formLabelWidth: '120px',
      rules: {
        location: [
          { required: true, message: "请输入位置", trigger: 'blur' },
        ],
        area: [
          { required: true, message: "请输入面积", trigger: 'blur' },
          { validator: checkFloat, trigger: 'blur'}
        ],
        short_price: [
          { required: true, message: "请输入短租价格", trigger: 'blur' },
          {validator: checkFloat, trigger: 'blur'}
        ],
        long_price: [
          { required: true, message: "请输入长租价格", trigger: 'blur' },
          {validator: checkFloat, trigger: 'blur'}
        ],
        details: [
          { required: true, message: "请输入具体地址", trigger: 'blur' }
        ]
      },
      rules2: {
        uid: [
          { required: true, message: "请输入用户id", trigger: 'blur' },
          { validator: checkInt, trigger: 'blur'}
        ],
        duration: [
          { required: true, message: "请输入租借时长", trigger: 'blur' },
          { validator: checkInt, trigger: 'blur'}
        ],
        amount: [
          { required: true, message: "请输入交易额", trigger: 'blur' },
          { validator: checkFloat, trigger: 'blur'}
        ]
      },
      form2: {
        uid: '',
        hid: '',
        type: '',
        start_time: '',
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
      house: [],
    }
  },
  methods: {
    get_house_info() {
      this.$axios({
        method: 'get',
        url: "http://127.0.0.1:8000/house_ctrl/get_house_info/"
      })
          .then(res => {
            console.log(res)
            for (let i = 0; i < res.data.length; i++) {
              let tmp = {
                id: res.data[i].id.toString(),
                short_price: res.data[i].short_price.toString(),
                long_price: res.data[i].long_price.toString(),
                location: res.data[i].location,
                area: res.data[i].area.toString(),
                available: res.data[i].available.toString(),
                type: res.data[i].type.toString(),
                floor_planSrc: res.data[i].floor_plan,
                picturesSrc: res.data[i].pictures,
                details: res.data[i].details,
                visible: true
              }
              this.house.push(tmp)
            }
          })
          .catch(err => {
            console.log(err)
          })
    },
    add_house() {
      let formData = {
        location: this.form.location,
        area: this.form.area,
        type: '',
        short_price: this.form.short_price,
        long_price: this.form.long_price,
        floor_plan: this.form.floor_plan,
        pictures: this.form.pictures,
        details: this.form.details
      }
      if (this.form.type==='单人间') {
        formData.type = '1'
      } else if (this.form.type==='双人间') {
        formData.type = '2'
      } else if (this.form.type==='四人间') {
        formData.type = '3'
      }
      console.log(formData)

      this.$axios({
        method: 'post',
        url: "http://127.0.0.1:8000/house_ctrl/add_house/",
        data: qs.stringify(formData)
      })
          .then(res => {
            console.log(res)
            switch (res.data.errno) {
              case 0:
                this.$message.success(res.data.msg)
                this.dialogFormVisible = false
                this.house = []
                this.get_house_info()
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
    dateZero(time) {
      if (time < 10) {
        time = "" + "0" + time;
      }
      return time;
    },
    rent_house(index) {
      let formData = {
        'uid': this.form2.uid,
        'hid': this.house[index].id,
        'start_time': '',
        'type': '',
        'duration': this.form2.duration,
        'amount': this.form2.amount,
        'details': this.form2.details
      }
      let time = this.form2.start_time
      formData.start_time = this.dateZero(time.getFullYear())+'-'+this.dateZero(time.getMonth()+1)
          +'-'+this.dateZero(time.getDate())+' '+this.dateZero(time.getHours())+':'+
          this.dateZero(time.getMinutes())+':'+this.dateZero(time.getSeconds())
      if (this.form2.type==='短租') {
        formData.type='0'
      } else if (this.form2.type==='长租') {
        formData.type='1'
      }
      console.log(formData)
      this.$axios({
        method: 'post',
        url: "http://127.0.0.1:8000/house_ctrl/rent_house/",
        data: qs.stringify(formData)
      })
          .then(res => {
            console.log(res)
            switch (res.data.errno) {
              case 0:
                this.$message.success(res.data.msg)
                this.house = []
                this.get_house_info()
                this.dialogFormVisible2 = false
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
            }
          })
          .catch(err => {
            console.log(err)
          })
    },
    stop_renting(index) {
      const formData = {'houseid': this.house[index].id}

      this.$axios({
        method: 'post',
        url: "http://127.0.0.1:8000/house_ctrl/stop_renting/",
        data: qs.stringify(formData)
      })
          .then(res => {
            console.log(res)
            switch (res.data.errno) {
              case 0:
                this.$message.success(res.data.msg)
                this.house = []
                this.get_house_info()
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
    del_house(index) {
      const formData = {'houseid': this.house[index].id}

      this.$axios({
        method: 'post',
        url: "http://127.0.0.1:8000/house_ctrl/del_house/",
        data: qs.stringify(formData)
      })
          .then(res => {
            console.log(res)
            switch (res.data.errno) {
              case 0:
                this.Delete(index)
                this.$message.success(res.data.msg)
                break
              case 1002:
                this.$message.warning(res.data.msg)
                break
              case 1001:
                this.$message.warning(res.data.msg)
                break
              case 1004:
                this.$message.warning(res.data.msg)
                break
            }
          })
          .catch(err => {
            console.log(err)
          })
    },
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
        this.del_house(index)
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
        // 调用后端接口
        this.stop_renting(index)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消停租'
        });
      });
    },
    help() {
      this.dialogFormVisible2 = true;
      this.form2.start_time = '';
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
      if (this.form.location===''||this.form.area===''||this.form.type==='' ||this.form.short_price===''
          ||this.form.long_price===''||this.form.floor_plan===''||this.form.pictures===''||this.form.details==='') {
        this.$message.warning('请填写完整信息！')
        return
      }
      this.add_house();
      this.search();
    },
    Confirm(index) {
      if (this.form2.start_time===''||this.form2.type===''||this.form2.uid===''||this.form2.amount===''||this.form2.duration===''){
        this.$message.warning('请填写完整信息！')
        return
      }
      this.rent_house(index)
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
  >>> #selectDate:focus, >>> .input > .el-textarea__inner:focus, >>> #selectType:focus{
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