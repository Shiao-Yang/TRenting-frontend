<template>
  <div class="info">
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
          <li v-if="$store.state.userInfo.id !== undefined && $store.state.userInfo.id !== ''">
            <div class="dt">
              <a @click="logOut" style="color: #f10215">
                退出登录
              </a>
            </div>
          </li>
        </ul>
        <ul class="top-right">
          <li id="login-button" class="shortcut_btn">
            <div v-if = "$store.state.userInfo.id === undefined || $store.state.userInfo.id === ''">
              <router-link to="/login">登录</router-link>
              &nbsp;&nbsp;
              <router-link to="/register" style="color:#f10215;">免费注册</router-link>
            </div>
            <div v-else>
              <router-link to="/info">{{ $store.state.userInfo.username }}</router-link>
            </div>
          </li>
          <li>
            <div class="dt">
              <router-link to="/order">我的订单</router-link>
            </div>
          </li>
          <li>
            <div class="dt">
              <router-link to="/ticket">我的报修</router-link>
            </div>
          </li>
          <li>
            <div class="dt">
              <router-link to="/cart">购物车</router-link>
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
                <router-link to="/order">我的订单</router-link>
              </dd>
              <dd>
                <router-link to="/order">评价晒单</router-link>
              </dd>
            </dl>
            <dl>
              <dt>客户服务</dt>
              <dd>
                <router-link to="/ticket_test">我的报修</router-link>
              </dd>
              <dd>
                <router-link to="/ticket_test">报修状态</router-link>
              </dd>
              <dd>
                <router-link to="/complain">我的投诉</router-link>
              </dd>
              <dd>
                <router-link to="/complain">投诉状态</router-link>
              </dd>
            </dl>
            <dl>
              <dt>账号服务</dt>
              <dd>
                <router-link :to="{path:'/info', query:{type:'baseSet'}}">我的信息</router-link>
              </dd>
              <dd>
                <router-link :to="{path:'/info', query:{type:'safeSet'}}">账号安全</router-link>
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
  name: "InfoView",
  data () {
    return {
      needFixed: false,
    }
  },

  methods:{
    handleScroll()
    {
      let self = this
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop > 82) {
        self.needFixed = true;
      } else {
        self.needFixed = false;
      }
    },
    logOut() {
      this.$store.commit('logout');
      this.$message.success("退出成功，3秒后将回到主页");
      setTimeout(()=>{
        this.$router.push({path:'/'});
      }, 3000);
    }
  },

  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  }
}
</script>

<style lang="css" scoped src="../assets/css/shortcut.css">

</style>

<style scoped>
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

.container .box {
  padding: 20px 0;
  height: 243px;
}

.user-box {
  float:left;
  margin-bottom: 0;
  width: 250px;
  height: 243px;
  box-shadow: 2px 2px 10px rgb(0 0 0 / 30%);
  overflow: hidden;
  zoom: 1;
}

.user-main {
  background-color: #f4ca3a;
  position: relative;
  height: 187px;
  text-align: center;
  overflow: hidden;
  zoom: 1;
}

.avatar {
  width: 64px;
  height: 64px;
  display: block;
  position: relative;
  z-index: 2;
  margin: 20px auto;
  border-radius: 100%;
  border:4px solid #fff;
  box-shadow: 3px 2px 10px rgb(79 5 1 / 84%);
  overflow: hidden;
  background-color: #f4f4f4;
}

.user {
  display: inline-block;
  margin-bottom: 10px;
  height: 20px;
  overflow: hidden;
}

.user-name {
  margin: auto;
  text-align: center;
  font: 700 18px/20px Arial;
  color: #232331;
}

.tags a, .tags span{
  padding: 0 10px;
  color: #232331;
  border: 1px solid #000;
  display: inline-block;
  margin: 0 5px;
  height: 22px;
  line-height: 22px;
  border-radius: 12px;
  cursor: pointer;
}

.tags a:hover, .tags span:hover{
  background-color: #fff;
}

.user-bottom {
  height: 36px;
  text-align: center;
  background-color: #232331;
  padding: 10px 20px;
  overflow: hidden;
  zoom: 1;
}

.user-bottom .text {
  float: left;
  margin:auto;
  text-align: center;
  color: #f4ca3a;
}

.user-bottom .text span {
  line-height: 36px;
  margin-left: 18px;
  margin-right: 10px;
  font-size: 13px;
  font-weight: 700;
  display: inline-block;
}

.user-bottom .button {
  float:right;
  padding: 0 10px;
  margin-top: 5px;
  height: 26px;
  line-height: 26px;
  border-radius: 14px;
  background-color: #f4ca3a;
  color: #232331;
  font-weight: 700;
  text-align: center;
}

.user-bottom .button:hover{
  background-color: #fff;
}

.my-block {
  background-color: #fff;
  margin-bottom: 20px;
}

.my-cart {
  margin: 9px 0 9px 250px;
  overflow: visible;
}

.my-block .mt {
  padding: 0 20px;
  height: 55px;
  line-height: 55px;
  border-bottom: 1px solid #f0f3ef;
  overflow: visible;
}

.my-block h3 {
  font-size: 18px;
  font-weight: 600;
}

.mc {
  overflow: hidden;
}

.my-cart .mc ul {
  display: flex;
  padding: 20px;
  height: 129px;
}

.my-cart .mc li {
  position: relative;
  width: 100px;
  height: 129px;
  margin: 0 10px 10px;
  border: none;
}

.my-block .mc a {
  display: inline-block;
  width: 100%;
  height: 100%;
}

.my-block .mc a:hover {
  box-shadow: 2px 2px 10px rgb(0 0 0 / 30%);
}

.my-cart .mc img {
  width: 80px;
  height: 80px;
  margin: 10px;
}

.my-cart .mc .more {
  width: 40px;
  height: 40px;
  margin: 30px;
}

.my-cart .mc span {
  top: 0;
  height: 24px;
  font-size: 14px;
  line-height: 24px;
  text-align: left;
  margin: 0 5px 0 5px;
  color: #666;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}

.my-block .nav{
  padding: 15px 20px;
  height: 90px;
}

.my-block .nav ul {
  display: flex;
  padding: 5px 20px 5px 20px;
  height: 80px;
}

.my-block .nav li {
  position: relative;
  width: 80px;
  height: 80px;
  margin: 0 20px 0 20px;
  border: none;
}

.my-block .nav img {
  width: 40px;
  height: 40px;
  margin: 10px 20px 5px 20px;
}

.my-block .nav span {
  height: 24px;
  line-height: 24px;
  text-align: center;
  position: relative;
  display: block;
}

.box-left {
  float: left;
  width: 694px;
}

.box-right {
  float: none;
  margin-left: 714px;
  width: 286px;
}

.my-rec ul {
  display: block;
  padding: 10px;
}

.my-rec li {
  float: left;
  position: relative;
  width: 100px;
  height: 100px;
  margin: 5px 10px;
  border: none;
}

.my-rec img {
  width: 60px;
  height: 60px;
  margin: 5px 20px;
}

.my-rec span {
  top: 0;
  height: 24px;
  font-size: 14px;
  line-height: 24px;
  text-align: left;
  margin: 0 5px 0 5px;
  color: #666;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
</style>