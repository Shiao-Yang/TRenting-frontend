<template>
  <div class="info">
    <div id="shortcut">
      <div class="w" aria-label="顶部导航栏">
        <ul class="top-left">
          <li>
            <div class="dt">
              <router-link to="/">
                <span>首页</span>
              </router-link>
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
              <router-link to="/info">用户1234</router-link>
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
    <div id="info-nav">
      <div class="w">
        <div class="logo">
          <router-link to="/"></router-link>
        </div>
        <div class="title">个人主页</div>
        <div class="nav-items">
          <div class="dte">
            <router-link to="/info">个人首页</router-link>
          </div>
          <div class="dte">
            <router-link to="/info">账号设置</router-link>
          </div>
        </div>
        <div class="info-nav-r">
          <div id="info-nav-search">
            <div class="form">
              <input type="text" id="key" class="text"></input>
              <button type="button" class="button">
                搜索
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="container" class="container">
      <div class="w">
        <div class="sub">
          <div class="menu">
            <dl>
              <dt>订单中心</dt>
              <dd>
                <router-link to="/info">我的订单</router-link>
              </dd>
              <dd>
                <router-link to="/info">评价晒单</router-link>
              </dd>
            </dl>
            <dl>
              <dt>客户服务</dt>
              <dd>
                <router-link to="/info">我的报修</router-link>
              </dd>
              <dd>
                <router-link to="/info">报修状态</router-link>
              </dd>
              <dd>
                <router-link to="/info">我的投诉</router-link>
              </dd>
              <dd>
                <router-link to="/info">投诉状态</router-link>
              </dd>
            </dl>
            <dl>
              <dt>账号服务</dt>
              <dd>
                <router-link to="/info">我的信息</router-link>
              </dd>
              <dd>
                <router-link to="/info">账号安全</router-link>
              </dd>
            </dl>
          </div>
        </div>
        <div class="main">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InfoView"
}
</script>

<style scoped>
  @import "../assets/css/shortcut.css";
</style>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

#info-nav {
  height: 82px;
  background-color: #fff;
  color: #333;
}

#info-nav .logo {
  float: left;
}

#info-nav .logo a {
  display: block;
  width: 158px;
  height: 82px;
  background: url("../assets/logo.png") no-repeat 0 0 ;
}

#info-nav a {
  color:#333;
}

#info-nav .title {
  float: left;
  padding: 40px 0 0 16px;
  font-size: 20px;
  color: #000;
}

.w {
  width: 1190px;
  margin: auto;
}

#info-nav .w{
  background-color: #fff;
}

#info-nav .nav-items {
  display: flex;
  margin-left: 70px;
  float: left;
  padding: 40px 0 0 25px;
  width: 300px;
  color: #333;
}

#info-nav .nav-items .dte {
  padding-right: 30px;
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  text-align: center;
}

#info-nav a:hover {
  color:#e1251b;
}


#info-nav .info-nav-r #info-nav-search{
  width: 210px;
  float: right;
  margin-top: 32px;
}

#info-nav .info-nav-r #info-nav-search .form {
  width:210px;
  height: 36px;
  padding-top: 8px;
}

#info-nav-search .text {
  margin:auto;
  width: 140px;
  border-color: #666666;
  height: 24px;
  float: left;
  line-height: 24px;
  padding: 4px;
  border-width: 2px 0 2px 2px;
  border-style: solid;
  font-size: 14px;
}

#info-nav-search .button {
  width: 60px;
  background: #666666;
  font-size: 14px;
  color: #fff;
  float: left;
  height: 36px;
  border: none;
  cursor:pointer;
}

#info-nav-search .button:hover {
  background: #000;
}

.container {
  width: 100%;
  padding-bottom: 50px;
  background-color: #f4f4f4;
  min-height: 1000px;
}

.sub {
  width: 190px;
  float: left;
}

.container .menu {
  width: 170px;
  background-color: #fff;
  color: #333;
}

.container .menu dl {
  padding:15px 20px;
  border-bottom: 1px solid #f3f3f3;
}

.container .menu dt {
  font-size: 16px;
  font-weight: 700;
  line-height: 32px;
}

.container .menu dd {
  font-size: 14px;
  line-height: 32px;
}

.container .menu a:hover {
  color:#e1251b;
}

.container .menu a {
  color: #333;
}

a {
  text-decoration: none;
}

.container .main {
  float: left;
  width: 1000px;
}

</style>