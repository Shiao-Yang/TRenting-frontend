<template>
  <div className="adminUser">
    <template>
      <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="用户管理" name="first">
          <div style="margin-top: 15px;">
            <el-input style="width: 850px" placeholder="请输入内容" v-model="input1" class="input-with-select" clearable>
              <el-select style="width: 110px" v-model="select1" slot="prepend" placeholder="请选择">
                <el-option label="用户ID" value="1"></el-option>
                <el-option label="用户姓名" value="2"></el-option>
              </el-select>
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
          <el-container>

          </el-container>
        </el-tab-pane>
        <el-tab-pane label="师傅管理" name="second">
          <div style="margin-top: 15px;">
            <el-input style="width: 850px" placeholder="请输入内容" v-model="input2" class="input-with-select" clearable>
              <el-select style="width: 110px" v-model="select2" slot="prepend" placeholder="请选择">
                <el-option label="师傅ID" value="1"></el-option>
                <el-option label="师傅姓名" value="2"></el-option>
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
    this.$emit('active',1);
  },
  name: "AdminUser",
  data() {
    return {
      activeName: 'first',
      input1: '',
      input2: '',
      select1: '1',
      select2: '1',
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
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