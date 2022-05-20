<template>
  <div id="app">
<!--    <nav>-->
<!--      <router-link to="/">Home</router-link>-->
<!--      <router-link to="/about">About</router-link>-->
<!--    </nav>-->
<!--    <div v-if="(this.$route.path==='\\')">-->
<!--      <div id="shortcut">-->
<!--        <div class="w" aria-label="顶部导航栏">-->
<!--          <ul class="top-left">-->
<!--            <li>-->
<!--              <div class="dt">-->
<!--               <router-link to="/">首页</router-link>-->
<!--              </div>-->
<!--            </li>-->
<!--            <li>-->
<!--              <div class="dt">-->
<!--                <router-link to="/about">联系我们</router-link>-->
<!--              </div>-->
<!--            </li>-->
<!--          </ul>-->
<!--          <ul class="top-right">-->
<!--            <li id="login-button" class="shortcut_btn">-->
<!--              <div v-if = !$store.state.isLogin>-->
<!--                <router-link to="/login">登录</router-link>-->
<!--                &nbsp;&nbsp;-->
<!--                <router-link to="/login" style="color:#f10215;">免费注册</router-link>-->
<!--              </div>-->
<!--              <div v-else>-->

<!--              </div>-->
<!--            </li>-->
<!--            <li>-->
<!--              <div class="dt">-->
<!--                <a target="_blank">我的订单</a>-->
<!--              </div>-->
<!--            </li>-->
<!--            <li>-->
<!--              <div class="dt">-->
<!--                <a target="_blank">我的报修</a>-->
<!--              </div>-->
<!--            </li>-->
<!--            <li>-->
<!--              <div class="dt">-->
<!--                <a target="_blank">购物车</a>-->
<!--              </div>-->
<!--            </li>-->
<!--          </ul>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
    <router-view/>
  </div>
</template>



<style>
* {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  margin: 0;
  padding: 0;
}

#app{
  display: block;
  font: 10px/1.5 Microsoft YaHei,Heiti SC,tahoma,arial,Hiragino Sans GB,"\5B8B\4F53",sans-serif;
  -webkit-font-smoothing: antialiased;
}
</style>
