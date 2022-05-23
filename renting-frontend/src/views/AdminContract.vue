<template>
  <div class="adminContract">
    <template>
      <el-tabs type="border-card" v-model="activeName">
        <el-tab-pane label="合同管理" name="first">
          <div style="margin-top: 15px;">
            <el-input style="width: 850px" placeholder="请输入内容" v-model="input" class="input-with-select" clearable>
              <el-select style="width: 110px" v-model="select" slot="prepend" placeholder="请选择">
                <el-option
                    v-for="item in options"
                    :key="item.select"
                    :label="item.label"
                    :value="item.select">
                </el-option>
              </el-select>
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
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
    this.$emit('active',5);
  },
  name: "AdminContract",
  data() {
    return {
      activeName: 'first',
      input: '',
      select: '1',
      options: [{
        select: '1',
        label: '合同ID'
      }, {
        select: '2',
        label: '用户ID'
      }]
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