<template>
  <div id="app">
<!--    <nav>-->
<!--      <router-link to="/">Home</router-link>-->
<!--      <router-link to="/about">About</router-link>-->
<!--    </nav>-->
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
            <router-link to="/login">登录</router-link>
            &nbsp;&nbsp;
            <router-link to="/login" style="color:#f10215;">免费注册</router-link>
          </li>
          <li>
            <div class="dt">
              <a target="_blank">我的订单</a>
            </div>
          </li>
          <li>
            <div class="dt">
              <a target="_blank">我的报修</a>
            </div>
          </li>
          <li>
            <div class="dt">
              <a target="_blank">购物车</a>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<style>
/*#app {*/
/*  font-family: Avenir, Helvetica, Arial, sans-serif;*/
/*  -webkit-font-smoothing: antialiased;*/
/*  -moz-osx-font-smoothing: grayscale;*/
/*  text-align: center;*/
/*  color: #2c3e50;*/
/*}*/
* {
  padding: 0;
}
a {
  text-decoration: none;
}

ul {
  display: block;
  list-style-type: disc;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 40px;
  overflow: hidden;
}

li {
  list-style: none;
  display: inline;
  border-right: 1px solid #bbb;
}

li:last-child{
  border-right: none;
}

#app{
  display: block;
  font: 10px/1.5 Microsoft YaHei,Heiti SC,tahoma,arial,Hiragino Sans GB,"\5B8B\4F53",sans-serif;
  -webkit-font-smoothing: antialiased;
}

#shortcut {
  position:absolute;
  top: 0;
  left: 0;
  width: 100%;
  border-bottom: 1px solid #ddd;
  background-color: #e3e4e5;
  height: 30px;
  line-height: 30px;
}

#shortcut .w {
  height: 30px;
  line-height: 30px;
  color: #999;
}

#shortcut .dt {
  padding-left: 7px;
  padding-right:7px;
}

#shortcut li{
  float: left;
}

#shortcut a{
  color: #999;
}

#shortcut a:hover {
  color: #f10215;
}

#login-button{
  text-align: left;
  width: 90px;
  white-space: nowrap;
  overflow: hidden;
  z-index: 20;
}

.w {
  margin: auto;
  width: 1190px;
}

.top-left{
  margin: 0;
  float: left
}

.top-right{
  margin: 0;
  float:right;
}

.too-right li{
  display:list-item;
  text-align: -webkit-match-parent;
}

.shortcut_btn {
  position: relative;
}
</style>
