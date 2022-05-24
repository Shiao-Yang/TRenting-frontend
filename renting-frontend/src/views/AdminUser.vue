<template>
  <div className="adminUser">
    <template>
      <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane class="el-tab-pane" label="用户管理" name="first">
          <div style="margin-top: 15px;">
            <el-input style="width: 850px" placeholder="请输入内容" v-model="input1" class="input-with-select" clearable>
              <el-select style="width: 110px" v-model="select1" slot="prepend" placeholder="请选择">
                <el-option label="用户ID" value="1"></el-option>
                <el-option label="用户姓名" value="2"></el-option>
              </el-select>
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
            <el-descriptions v-for='item in user' class="margin-top" title="用户" :column="3" border >
              <template slot="extra">
                <el-button type="primary" id="modify" size="small">修改</el-button>
                <el-button type="primary" id="delete" size="small">删除</el-button>
              </template>
              <el-descriptions-item label-class-name="label-userid" content-class-name="content-userid">
                <template slot="label">
                  用户ID
                </template>
                {{item.userid}}
              </el-descriptions-item>
              <el-descriptions-item label-class-name="label-phoneNum" content-class-name="content-phoneNum">
                <template slot="label">
                  手机号
                </template>
                {{ item.phoneNum }}
              </el-descriptions-item>
              <el-descriptions-item label-class-name="label-email">
                <template slot="label">
                  邮箱
                </template>
                {{ item.email }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  姓名
                </template>
                {{ item.name }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  年龄
                </template>
                {{ item.age }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  性别
                </template>
                {{ item.sex }}
              </el-descriptions-item>
            </el-descriptions>

        </el-tab-pane>
        <el-tab-pane class="el-tab-pane" label="师傅管理" name="second">
          <div style="margin-top: 15px;">
            <el-input style="width: 850px" placeholder="请输入内容" v-model="input2" class="input-with-select" clearable>
              <el-select style="width: 110px" v-model="select2" slot="prepend" placeholder="请选择">
                <el-option label="师傅ID" value="1"></el-option>
                <el-option label="师傅姓名" value="2"></el-option>
              </el-select>
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
            <el-button type="primary" id="upload">
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
      user: [{
        userid: '111111',
        phoneNum: '111111111111',
        email: '88888888@qq.com',
        name: '111',
        age: '18',
        sex: '男'
      }, {
        userid: '14',
        phoneNum: '123451512',
        email: '833388888@qq.com',
        name: '2',
        age: '12',
        sex: '女'
      }, {
        userid: '1123',
        phoneNum: '123451512',
        email: '833382188@qq.com',
        name: '1',
        age: '11',
        sex: '女'
      }, {
        userid: '12223',
        phoneNum: '123451512',
        email: '833388338@qq.com',
        name: '21',
        age: '14',
        sex: '女'
      }]
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
  #upload {
    background-color: #4a5c70;
    border: none;
    margin-left: 20px;
  }
  #upload:hover {
    background-color: #364354 !important;
  }
  .margin-top {
    margin-top: 20px;
    width: 1050px;
    color: #42b983;
  }
  #modify:hover, #delete:hover {
    background-color: #3cad7a;
  }
  >>> #modify, #delete {
    background-color: #42b983;
    border: none;
  }
  .el-tab-pane {
    height: 525px;
    overflow-y: scroll;
  }
  >>> .label-userid, >>> .label-phoneNum {
    width: 130px;
  }
  >>> .content-userid {
    width: 140px;
  }
  >>> .content-phoneNum {
    width: 240px;
  }
  >>> .label-email {
    width: 100px;
  }
</style>