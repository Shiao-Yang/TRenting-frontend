<template>
  <div class="home">
<!--    <img alt="Vue logo" src="../assets/logo.png">-->
<!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
<!--    <div id = "navigation-bar">-->
<!--      <ul>-->
<!--        <li><router-link to="/">首页</router-link>></li>-->
<!--        <li><router-link to="/About">联系我们</router-link></li>-->
<!--        <li style="float:right"><a target="_blank">我的订单</a></li>-->
<!--         <li style="float:right"><a target="_blank">我的报修</a></li>-->
<!--      </ul>-->
<!--    </div>-->
    <div id="header">
      <div class="w">
        <h1>LOGO</h1>
        <div class="web-text-box">
          <h1>标题</h1>
        </div>
        <div class="menu-box">
          <h1>菜单</h1>
        </div>
        <div class="search-box">
          <div class="box">
            <input type="text" placeholder="请输入区域、商圈或小区名开始找房">
            <input type="button" value="开始找房">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}

</script>
<!--<style scoped>-->
<!--@import "../assets/common/HomeView.css";-->
<!--</style>-->

<style>
#header {
  width: 100%;
  height: 610px;
  left: 0;
  top: 31px;
  background: #161616 url(../assets/HomeViewBG.jpg) no-repeat fixed center 0;
  background-size: 1920px;
  display: block;
  position: absolute;
}

.w {
  width: 1190px;
  margin: auto;
}

.search-box {
  padding: 20px;
  margin:0 auto;
  position: relative;
}

.web-text-box {
  margin: auto;
  font-size: 40px;
  text-align: center;
  height: 100px;
}

.menu-box {
  margin: auto;
  text-align: center;
  height: 50px;
  font-size: 14px;
  padding-top: 30px;

}

.box {
  width: 700px;
  height: 50px;
  padding: 20px;
  margin:0 auto;
  position: relative;
}

input[type=text] {
  padding: 10px;
  height: 30px;
  font-size: 18px;
  border: 0;
  border-left: none;
  float: left;
  width: 550px;
  background: white;
}

input[type=button] {
  background: #00ae66;
  width: 150px;
  height: 50px;
  float: left;
  border: 0;
  display: block;
  border-radius: 0 2px 2px 0;
  position: absolute;
  right: -1px;
  cursor: pointer;
  text-align: center;
  font-size: 18px;
  color: #fff;
}


</style>