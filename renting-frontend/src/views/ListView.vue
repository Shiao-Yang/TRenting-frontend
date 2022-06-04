<template>
  <div class="list">
    <div id = "f-shortcut" class = "f-shortcut" v-show="needFixed" style="position: fixed;top:0;">
      <div class="f-header" aria-label="顶部浮动导航栏" style="position: fixed;top:0;">
        <div class="f-shortcut-content">
          <div class="f-shortcut-link">
            <ul class="f-shortcut-ul">
              <li class="f-shortcut-item">
                <span>
                  <router-link to="/" class="link">
                    <img class="f-shortcut-logo" src="../assets/logo.png">
                    首页
                  </router-link>
                </span>
              </li>
              <li class="f-shortcut-item">
                <router-link to="/about" class="link">联系我们</router-link>
              </li>
            </ul>
          </div>
          <div class="f-shortcut-search-box">
            <div class="f-shortcut-search">
              <div class="box" style="display: flex;flex-direction: row;justify-content: flex-start;height: 32px; padding: 0">
                <input type="text" placeholder="请输入区域、商圈或小区名开始找房" style="background-color: #f4f4f4; width:450px;height: 32px;padding: 2px 15px 2px 15px">
                <input type="button" value="开始找房" style="height: 36px;width: 100px">
              </div>
            </div>
          </div>
          <div class="f-shortcut-user">
            <ul class="f-shortcut-ul">
              <li class="f-shortcut-item">
                <span>
                  <router-link to="/" class="link">
                    <img class="f-shortcut-logo" src="../assets/traveller.png" style="width: 32px;">
                    <span style="color: #e1251b">
                      登录
                    </span>
                  </router-link>
                </span>
              </li>
              <li class="f-shortcut-item">
                <router-link to="/" class="link">我的订单</router-link>
              </li>
              <li class="f-shortcut-item">
                <router-link to="/">我的报修</router-link>
              </li>
              <li class="f-shortcut-item">
                <router-link to="/">
                  购物车
                  <img src="../assets/cart.png" style="width:20px; height: 20px; margin-left: 12px;">
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div id="shortcut">
      <div class="w" aria-label="顶部导航栏">
        <ul class="top-left">
          <li>
            <div class="dt">
              <router-link to="/">首页</router-link>
            </div>
          </li>
          <li>
            <div class="dt">
              <router-link to="/about">联系我们</router-link>
            </div>
          </li>
        </ul>
        <ul class="top-right">
          <li id="login-button" class="shortcut_btn">
            <div v-if = !$store.state.isLogin>
              <router-link to="/login">登录</router-link>
              &nbsp;&nbsp;
              <router-link to="/login" style="color:#f10215;">免费注册</router-link>
            </div>
            <div v-else>

            </div>
          </li>
          <li>
            <div class="dt">
              <router-link to="/">我的订单</router-link>
            </div>
          </li>
          <li>
            <div class="dt">
              <router-link to="/">我的报修</router-link>
            </div>
          </li>
          <li>
            <div class="dt">
              <router-link to="/">购物车</router-link>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class= "search-area">
      <div class="search-nav">
        <router-link to="/list" class="logo">
          <img class="logo" src="../assets/logo.png">
        </router-link>
        <ul>
          <li>
            <router-link to="/list">
              <span style="color: #00ae66" v-if="this.$route.path === '/list'">首页</span>
              <span v-else>首页</span>
            </router-link>
          </li>
          <li>
            <router-link to="/list/short">
              <span style="color: #00ae66" v-if="this.$route.params.type === 'short'">短租</span>
              <span v-else>短租</span>
            </router-link>
          </li>
          <li>
            <router-link to="/list/long">
              <span style="color: #00ae66" v-if="this.$route.params.type === 'long'">长租</span>
              <span v-else>长租</span>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="list-search">
        <div class="search-box">
          <el-input v-model="input" placeholder="请输入内容" class="search-input" clearable><el-button slot="suffix" icon="el-icon-search"></el-button></el-input>
        </div>
      </div>

    </div>
    <div class="container">
      <div class="filter">
        <div class="filter_wr">
          <ul>
            <li class="filter_item filter_item_aside">
              <router-link to="/list">区域</router-link>
            </li>
            <li class="filter_item strong">
              <router-link to="/list">不限</router-link>
            </li>
            <li class="filter_item">
              <router-link to="/list">海淀</router-link>
            </li>
            <li class="filter_item">
              <router-link to="/list">朝阳</router-link>
            </li>
            <li class="filter_item">
              <router-link to="/list">顺义</router-link>
            </li>
            <li class="filter_item">
              <router-link to="/list">大兴</router-link>
            </li>
            <li class="filter_item">
              <router-link to="/list">丰台</router-link>
            </li>
            <li class="filter_item">
              <router-link to="/list">昌平</router-link>
            </li>
          </ul>
          <ul>
            <li class="filter_item filter_item_aside">
              <router-link to="/list">方式</router-link>
            </li>
            <li class="filter_item strong">
              <router-link to="/list">不限</router-link>
            </li>
            <li class="filter_item">
              <router-link to="/list">长租</router-link>
            </li>
            <li class="filter_item">
              <router-link to="/list">短租</router-link>
            </li>
          </ul>
          <ul>
            <li class="filter_item_aside filter_item">
              <router-link to="/list">租金</router-link>
            </li>
            <li class="filter_item">
              <el-checkbox label="≤1000元"></el-checkbox>
            </li>
            <li>
              <el-checkbox label="1000~1500元"></el-checkbox>
            </li>
            <li>
              <el-checkbox label="1500~2000元"></el-checkbox>
            </li>
            <li>
              <el-checkbox label="2000~2500元"></el-checkbox>
            </li>
            <li>
              <el-checkbox label="2500~5000元"></el-checkbox>
            </li>
            <li>
              <el-checkbox label=">5000元"></el-checkbox>
            </li>
          </ul>
          <ul>
            <li class="filter_item_aside filter_item">
              <router-link to="/list">户型</router-link>
            </li>
            <li class="filter_item">
              <el-checkbox label="一居"></el-checkbox>
            </li>
            <li>
              <el-checkbox label="两居"></el-checkbox>
            </li>
            <li>
              <el-checkbox label="三居"></el-checkbox>
            </li>
            <li>
              <el-checkbox label="四居+"></el-checkbox>
            </li>
          </ul>
        </div>
      </div>
      <div class="content">
        <div class="content_main">
          <p class="content_title">
            已为您找到<span style="color:#00ae66;margin: auto 5px;">1</span>套北京房源
          </p>
          <ul class="content_filter">
            <li>
              <router-link to="/list">最新上架</router-link>
            </li>
            <li class="selected">
              <router-link to="/list">价格</router-link>
            </li>
            <li>
              <router-link to="/list">面积</router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="content_list">
        <div class="content_list_item">
          <router-link to="/list" class="link"></router-link>
          <router-link to="/list" class="content_list_item_aside">
            <img src="../assets/logo.png">
          </router-link>
          <div class="content_list_item_main">
            <p class="title">
              <router-link to="/list">
                <span>长租·北航校内20公寓 1室无厅</span>
              </router-link>
            </p>
            <p class="des">
              <router-link to="/list">海淀·五道口·花园路街道</router-link>
              <i>/</i>
              20㎡
              <i>/</i>
              1室0厅0卫
            </p>
            <span class="price">
              <em>150</em>
              元/月
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListView",
  data() {
    return {
      needFixed: false,
      input: ''
    }
  },

  methods : {
    handleScroll()
    {
      let self = this
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop > 186) {
        self.needFixed = true;
        document.getElementById('f-shortcut').style.height = "56px"
      } else {
        self.needFixed = false;
        document.getElementById('f-shortcut').style.height = "0px";
      }
    },
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  }
}
</script>

<style scoped>
@import url("../assets/css/shortcut.css");

.search-area {
  position: absolute;
  left: 0;
  top: 31px;
  width: 100%;
  height: 155px;
  padding: 25px 0;
  background-color: #fff;
  box-sizing: border-box;
}

.search-nav {
  width: 1190px;
  height: 30px;
  margin: 0 auto 20px;
  position: relative;
  display: flex;
}

.search-nav .logo {
  width: 88px;
  height: 30px;
  margin-right: 25px;
}

.search-nav ul {
  line-height: 30px;
  font-size: 20px;
  font-weight: 600;
  color: #000;
  position: relative;
  display: inline-block;
  vertical-align: bottom;
}

.search-nav li {
  border: none;
  margin-right: 20px;
}

.list-search {
  margin: auto;
  position: relative;
  height: 50px;
  width: 1190px;
}

.search-box {
  float: left;
  box-shadow: 2px 4px 4px 4px rgb(0 0 0 / 10%);
  width: 710px;
  height: 48px;
  display: inline-block;
  line-height: 46px;
  font-size: 14px;
  border-radius: 4px;
  background-color: #ffffff;
}

.search-input {
  width: 668px;
  box-sizing: border-box;
  padding-top: 8px;
  border-width: 0;
  font-size: 14px;
  background-color: #fff;
}

.container {
  width: 100%;
  margin: auto;
  background-color: #f4f4f4;
  min-height: 1000px;
  position: absolute;
  top: 186px;
  left: 0;
}

.filter {
  padding-top: 15px;
  position: relative;
}

.filter_wr {
  width: 1190px;
  border-bottom: 1px solid #eee;
  padding-bottom: 20px;
  margin: auto;
}

.filter ul {
  overflow: hidden;
  margin-top: 3px;
  margin-bottom: 3px;
  position: relative;
  padding-left: 60px;
  min-height: 35px;
  line-height: 30px;
  font-size: 14px;
}

.filter_item {
  margin-right: 24px;
}

.filter_item_aside {
  font-weight: 700;
  position: absolute;
  left: 0;
}

.filter li {
  border: none;
  float: left;
  margin-top: 9px;
  margin-right: 30px;
  margin-bottom: 9px;
}

.filter .strong a {
  color: #00ae66;
  font-weight: 700;
}

.content {
  overflow: hidden;
  width: 1190px;
  margin: auto;
}

.content_main {
  float: left;
}

.content_title {
  border: none;
  font-size: 16px;
  color: #101d37;
  float: left;
  margin-top: 30px;
  margin-bottom: 14px;
  font-weight: 700;
}

.content_filter {
  display: inline-block;
  width: 100%;
  border-bottom: 1px solid #eeeeee;
}

.content_filter li {
  border: none;
  margin-right: 37px;
  float: left;
}

.content_filter a {
  display: inline-block;
  font-weight: 700;
  font-size: 13px;
  padding-bottom: 15px;
  padding-top: 10px;
}

.content_filter .selected a{
  color: #00ae66;
}

.content_list {
  width: 1190px;
  margin: auto;
}

.content_list_item {
  padding: 30px 0;
  position: relative;
}

.content_list_item>a.link {
  display: block;
  position: absolute;
  width: 100%;
  height: 122px;
  z-index: 2;
}

.content_list_item_aside {
  position: relative;
  height: 122px;
  width: 160px;
  float: left;
  border-radius: 5px;
  overflow: hidden;
}

.content_list_item_aside img {
  width: 100%;
  height: 100%;
}

.content_list_item_main {
  margin-left: 190px;
  position: relative;
}

.content_list_item_main .title {
  display: flex;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 18px;
}

.content_list_item_main .title a {
  display: inline-block;
  max-width: 450px;
  white-space: nowrap;
  overflow: hidden;
  font-size: 20px;
  font-weight: 700;
  color: #000;
}

.content_list_item_main .des {
  float: left;
  color: #6d6d73;
  margin-top: 20px;
  margin-bottom: 16px;
  font-size: 14px;
  font-weight: 700;
}

.content_list_item_main .des i {
  font-weight: 400;
  color: #ccc;
  margin-left: 8px;
  margin-right: 8px;
}

.content_list_item_main .price {
  position: absolute;
  right: 0;
  top: 0;
  color: #e1251b;
  font-weight: 700;
  font-size: 14px;
  line-height: 22px;
}

.content_list_item_main .price em {
  font-size: 24px;
  margin-right: 5px;
}
</style>