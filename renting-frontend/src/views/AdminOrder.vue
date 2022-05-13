<template>
  <div class="adminOrder">
    <template>
      <el-tabs type="border-card" v-model="activeName">
        <el-tab-pane label="订单查询" name="first">
          <div style="margin-top: 15px;">
            <el-input style="width: 850px" placeholder="请输入内容" v-model="input1" class="input-with-select" clearable>
              <el-select style="width: 110px" v-model="select1" slot="prepend" placeholder="请选择">
                <el-option
                  v-for="item in options1"
                  :key="item.select1"
                  :label="item.label"
                  :value="item.select1">
                </el-option>
              </el-select>
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
          <el-container>

          </el-container>
        </el-tab-pane>
        <el-tab-pane label="订单审核" name="second">
          <div style="margin-top: 15px;">
            <el-input style="width: 850px" placeholder="请输入内容" v-model="input2" class="input-with-select" clearable>
              <el-select style="width: 110px" v-model="select2" slot="prepend" placeholder="请选择">
                <el-option
                    v-for="item in options2"
                    :key="item.select2"
                    :label="item.label"
                    :value="item.select2">
                </el-option>
              </el-select>
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
        </el-tab-pane>
      </el-tabs>
    </template>
  </div>
</template>

<script>
export default {
  created() {
    this.$emit('active',2);
  },
  name: "AdminOrder",
  data() {
    return {
      activeName: "first",
      input1: '',
      input2: '',
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
      select1: '1',
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
      select2: '1'
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
</style>