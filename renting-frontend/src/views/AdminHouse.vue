<template>
 <div class="adminHouse">
   <template>
     <el-tabs type="border-card" v-model="activeName">
       <el-tab-pane label="房源管理" name="first">
         <div style="margin-top: 15px;">
           <el-input style="width: 850px" placeholder="请输入内容" v-model="input" class="input-with-select" clearable>
             <el-select style="width: 110px" v-model="select" slot="prepend" placeholder="请选择">
               <el-option label="房源ID" value="1"></el-option>
             </el-select>
             <el-button slot="append" icon="el-icon-search"></el-button>
           </el-input>
           <el-button type="primary" id="upload" style="background-color: #4a5c70;border: none;margin-left: 20px;">
             导入<i class="el-icon-upload el-icon--right"></i>
           </el-button>
         </div>
         <el-container>

         </el-container>
       </el-tab-pane>
     </el-tabs>
   </template>
 </div>
</template>

<script>
export default {
  created() {
    this.$emit('active',3);
  },
  name: "AdminHouse",
  data() {
    return {
      activeName: 'first',
      input: '',
      select: '1',
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
  >>> .el-input-group__prepend + .el-input__inner:focus{
    border-color: #42b983 !important;
  }
  #upload:hover {
    background-color: #364354 !important;
  }
</style>