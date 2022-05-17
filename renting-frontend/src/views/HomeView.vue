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
    <div id = "f-shortcut" class = "f-shortcut" v-if="this.needFixed === true" style="position: fixed;top:0;">
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
                <input type="text" placeholder="请输入区域、商圈或小区名开始找房" style="background-color: #f4f4f4; width:450px;height: 32px;padding: 2px 5px 2px 5px">
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
<!--                  <router-link to="/" class="link">-->
<!--                    <img class="f-shortcut-logo" src="../assets/traveller.png" style="border-radius: 50%; width: 40px; height: 40px;background-color: #f4f4f4">d-->
<!--                  </router-link>-->
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
    <div id="header">
      <div class="w">
        <div class="logo">
          <img src="../assets/logo.png" style="height: 50px; width: 50px">
        </div>
        <div class="web-text-box">
          <h1 style="color:white;">用心创造温馨</h1>
        </div>
        <div class="menu-box">
        </div>
        <div class="search-box">
          <div class="box" style="display: flex;flex-direction: row;justify-content: flex-start;">
            <input type="text" placeholder="请输入区域、商圈或小区名开始找房">
            <input type="button" value="开始找房">
          </div>
        </div>
      </div>
    </div>
    <div id="recommend">
      <div class="recommend-more">
        <div class="floorhd">
          <h3 class="floorhd-tit">
            为您推荐
          </h3>
        </div>
        <div class="recommend-more-inner">
          <div>
            <ul id="recContent" class="more-list">
              <li class="more-item">
                <a class="more-lk" target="_blank">
                  <div class="more-img">
                    <img src="../assets/logo.png" width="150px" height="150px">
                  </div>
                  <div class="more-info">
                    <div class="more-info-name">
                      <p>
                        测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本
                      </p>
                    </div>
                    <div class="more-info-price">
                      <div class="mod-price">
                        <i>￥</i>
                        <span class="more-info-price-txt">
                          99999
                          <span class="more-info-price-decimal">/月</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
              <li class="more-item">
                <a class="more-lk" target="_blank">
                  <div class="more-img">
                    <img src="../assets/logo.png" width="150px" height="150px">
                  </div>
                  <div class="more-info">
                    <div class="more-info-name">
                      <p>
                        测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本
                      </p>
                    </div>
                    <div class="more-info-price">
                      <div class="mod-price">
                        <i>￥</i>
                        <span class="more-info-price-txt">
                          99999
                          <span class="more-info-price-decimal">/月</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
              <li class="more-item">
                <a class="more-lk" target="_blank">
                  <div class="more-img">
                    <img src="../assets/logo.png" width="150px" height="150px">
                  </div>
                  <div class="more-info">
                    <div class="more-info-name">
                      <p>
                        测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本
                      </p>
                    </div>
                    <div class="more-info-price">
                      <div class="mod-price">
                        <i>￥</i>
                        <span class="more-info-price-txt">
                          99999
                          <span class="more-info-price-decimal">/月</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
              <li class="more-item">
                <a class="more-lk" target="_blank">
                  <div class="more-img">
                    <img src="../assets/logo.png" width="150px" height="150px">
                  </div>
                  <div class="more-info">
                    <div class="more-info-name">
                      <p>
                        测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本
                      </p>
                    </div>
                    <div class="more-info-price">
                      <div class="mod-price">
                        <i>￥</i>
                        <span class="more-info-price-txt">
                          99999
                          <span class="more-info-price-decimal">/月</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
              <li class="more-item">
                <a class="more-lk" target="_blank">
                  <div class="more-img">
                    <img src="../assets/logo.png" width="150px" height="150px">
                  </div>
                  <div class="more-info">
                    <div class="more-info-name">
                      <p>
                        测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本
                      </p>
                    </div>
                    <div class="more-info-price">
                      <div class="mod-price">
                        <i>￥</i>
                        <span class="more-info-price-txt">
                          99999
                          <span class="more-info-price-decimal">/月</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
              <li class="more-item">
                <a class="more-lk" target="_blank">
                  <div class="more-img">
                    <img src="../assets/logo.png" width="150px" height="150px">
                  </div>
                  <div class="more-info">
                    <div class="more-info-name">
                      <p>
                        测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本
                      </p>
                    </div>
                    <div class="more-info-price">
                      <div class="mod-price">
                        <i>￥</i>
                        <span class="more-info-price-txt">
                          99999
                          <span class="more-info-price-decimal">/月</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
              <li class="more-item">
                <a class="more-lk" target="_blank">
                  <div class="more-img">
                    <img src="../assets/logo.png" width="150px" height="150px">
                  </div>
                  <div class="more-info">
                    <div class="more-info-name">
                      <p>
                        测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本
                      </p>
                    </div>
                    <div class="more-info-price">
                      <div class="mod-price">
                        <i>￥</i>
                        <span class="more-info-price-txt">
                          99999
                          <span class="more-info-price-decimal">/月</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
              <li class="more-item">
                <a class="more-lk" target="_blank">
                  <div class="more-img">
                    <img src="../assets/logo.png" width="150px" height="150px">
                  </div>
                  <div class="more-info">
                    <div class="more-info-name">
                      <p>
                        测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本
                      </p>
                    </div>
                    <div class="more-info-price">
                      <div class="mod-price">
                        <i>￥</i>
                        <span class="more-info-price-txt">
                          99999
                          <span class="more-info-price-decimal">/月</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
              <li class="more-item">
                <a class="more-lk" target="_blank">
                  <div class="more-img">
                    <img src="../assets/logo.png" width="150px" height="150px">
                  </div>
                  <div class="more-info">
                    <div class="more-info-name">
                      <p>
                        测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本
                      </p>
                    </div>
                    <div class="more-info-price">
                      <div class="mod-price">
                        <i>￥</i>
                        <span class="more-info-price-txt">
                          99999
                          <span class="more-info-price-decimal">/月</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
              <li class="more-item">
                <a class="more-lk" target="_blank">
                  <div class="more-img">
                    <img src="../assets/logo.png" width="150px" height="150px">
                  </div>
                  <div class="more-info">
                    <div class="more-info-name">
                      <p>
                        测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本
                      </p>
                    </div>
                    <div class="more-info-price">
                      <div class="mod-price">
                        <i>￥</i>
                        <span class="more-info-price-txt">
                          99999
                          <span class="more-info-price-decimal">/月</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
              <li class="more-item">
                <a class="more-lk" target="_blank">
                  <div class="more-img">
                    <img src="../assets/logo.png" width="150px" height="150px">
                  </div>
                  <div class="more-info">
                    <div class="more-info-name">
                      <p>
                        测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本
                      </p>
                    </div>
                    <div class="more-info-price">
                      <div class="mod-price">
                        <i>￥</i>
                        <span class="more-info-price-txt">
                          99999
                          <span class="more-info-price-decimal">/月</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
              <li class="more-item">
                <a class="more-lk" target="_blank">
                  <div class="more-img">
                    <img src="../assets/logo.png" width="150px" height="150px">
                  </div>
                  <div class="more-info">
                    <div class="more-info-name">
                      <p>
                        测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本
                      </p>
                    </div>
                    <div class="more-info-price">
                      <div class="mod-price">
                        <i>￥</i>
                        <span class="more-info-price-txt">
                          99999
                          <span class="more-info-price-decimal">/月</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
              <li class="more-item">
                <a class="more-lk" target="_blank">
                  <div class="more-img">
                    <img src="../assets/logo.png" width="150px" height="150px">
                  </div>
                  <div class="more-info">
                    <div class="more-info-name">
                      <p>
                        测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本
                      </p>
                    </div>
                    <div class="more-info-price">
                      <div class="mod-price">
                        <i>￥</i>
                        <span class="more-info-price-txt">
                          99999
                          <span class="more-info-price-decimal">/月</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
              <li class="more-item">
                <a class="more-lk" target="_blank">
                  <div class="more-img">
                    <img src="../assets/logo.png" width="150px" height="150px">
                  </div>
                  <div class="more-info">
                    <div class="more-info-name">
                      <p>
                        测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本
                      </p>
                    </div>
                    <div class="more-info-price">
                      <div class="mod-price">
                        <i>￥</i>
                        <span class="more-info-price-txt">
                          99999
                          <span class="more-info-price-decimal">/月</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
              <li class="more-item">
                <a class="more-lk" target="_blank">
                  <div class="more-img">
                    <img src="../assets/logo.png" width="150px" height="150px">
                  </div>
                  <div class="more-info">
                    <div class="more-info-name">
                      <p>
                        测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本
                      </p>
                    </div>
                    <div class="more-info-price">
                      <div class="mod-price">
                        <i>￥</i>
                        <span class="more-info-price-txt">
                          99999
                          <span class="more-info-price-decimal">/月</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
              <li class="more-item">
                <a class="more-lk" target="_blank">
                  <div class="more-img">
                    <img src="../assets/logo.png" width="150px" height="150px">
                  </div>
                  <div class="more-info">
                    <div class="more-info-name">
                      <p>
                        测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本
                      </p>
                    </div>
                    <div class="more-info-price">
                      <div class="mod-price">
                        <i>￥</i>
                        <span class="more-info-price-txt">
                          99999
                          <span class="more-info-price-decimal">/月</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
              <li class="more-item">
              <a class="more-lk" target="_blank">
                <div class="more-img">
                  <img src="../assets/logo.png" width="150px" height="150px">
                </div>
                <div class="more-info">
                  <div class="more-info-name">
                    <p>
                      测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本
                    </p>
                  </div>
                  <div class="more-info-price">
                    <div class="mod-price">
                      <i>￥</i>
                      <span class="more-info-price-txt">
                          99999
                          <span class="more-info-price-decimal">/月</span>
                        </span>
                    </div>
                  </div>
                </div>
              </a>
              </li>
              <li class="more-item">
              <a class="more-lk" target="_blank">
                <div class="more-img">
                  <img src="../assets/logo.png" width="150px" height="150px">
                </div>
                <div class="more-info">
                  <div class="more-info-name">
                    <p>
                      测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本
                    </p>
                  </div>
                  <div class="more-info-price">
                    <div class="mod-price">
                      <i>￥</i>
                      <span class="more-info-price-txt">
                          99999
                          <span class="more-info-price-decimal">/月</span>
                        </span>
                    </div>
                  </div>
                </div>
              </a>
              </li>
              <li class="more-item">
              <a class="more-lk" target="_blank">
                <div class="more-img">
                  <img src="../assets/logo.png" width="150px" height="150px">
                </div>
                <div class="more-info">
                  <div class="more-info-name">
                    <p>
                      测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本
                    </p>
                  </div>
                  <div class="more-info-price">
                    <div class="mod-price">
                      <i>￥</i>
                      <span class="more-info-price-txt">
                          99999
                          <span class="more-info-price-decimal">/月</span>
                        </span>
                    </div>
                  </div>
                </div>
              </a>
              </li>
              <li class="more-item">
              <a class="more-lk" target="_blank">
                <div class="more-img">
                  <img src="../assets/logo.png" width="150px" height="150px">
                </div>
                <div class="more-info">
                  <div class="more-info-name">
                    <p>
                      测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本
                    </p>
                  </div>
                  <div class="more-info-price">
                    <div class="mod-price">
                      <i>￥</i>
                      <span class="more-info-price-txt">
                          99999
                          <span class="more-info-price-decimal">/月</span>
                        </span>
                    </div>
                  </div>
                </div>
              </a>
              </li>
              <li class="more-item">
                <a class="more-lk" target="_blank">
                  <div class="more-img">
                    <img src="../assets/logo.png" width="150px" height="150px">
                  </div>
                  <div class="more-info">
                    <div class="more-info-name">
                      <p>
                        测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本
                      </p>
                    </div>
                    <div class="more-info-price">
                      <div class="mod-price">
                        <i>￥</i>
                        <span class="more-info-price-txt">
                          99999
                          <span class="more-info-price-decimal">/月</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  // components: {
  //   HelloWorld
  // },

  data () {
    return {
      needFixed: true
    }
  },

  methods:{
    handleScroll()
    {
      let self = this
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop > 300) {
        self.needFixed = true;
      } else {
        self.needFixed = false;
      }
    },
  },

  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  }

};




</script>
<style scoped>
  @import "../assets/css/shortcut.css";
</style>

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

#recommend {
  position: absolute;
  left:0;
  top:641px;
  width: 100%;
  background-color: #f4f4f4;
}

* {
  margin: 0;
  padding: 0;
}

.w {
  width: 1190px;
  margin: auto;
}

.logo {
  width: 1190px;
  line-height: 50px;
  float:left;
  height:50px;
  position: relative;
}

.search-box {
  padding: 20px;
  margin:0 auto;
  position: relative;
  display: flex;
}

.web-text-box {
  margin: auto;
  font-size: 40px;
  text-align: center;
  height: 160px;
  position:relative;
}

.menu-box {
  margin: auto;
  text-align: center;
  width: 1190px;
  height: 50px;
  font-size: 14px;
  padding-top: 30px;
  float: left;
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
  outline: none;
}

input[type=button] {
  background: #00ae66;
  width: 150px;
  height: 50px;
  float: left;
  border: 0;
  display: block;
  border-radius: 0 2px 2px 0;
  right: -1px;
  cursor: pointer;
  text-align: center;
  font-size: 18px;
  color: #fff;
}

input[type=button]:hover{
  background-color: darkgreen;
}

ul li {
  list-style: none;
  margin: 0;
  padding: 0;
}

a {
  color: #666;
  text-decoration: none;
}

p {
  margin: 0;
  padding: 0;
}

.recommend-more {
  min-height: 305px;
}

.floorhd {
  height: 65px;
}

.floorhd-tit {
  position: relative;
  width: 150px;
  height: 45px;
  font-size: 28px;
  font-weight: 700;
  text-align: center;
  line-height: 45px;
  padding: 0 30px;
  margin: 0 auto 20px;
  overflow: hidden;
  color: #333;
}


.floorhd-tit:after, .floorhd-tit:before {
  background-size: 50px 20px;
  background-repeat: no-repeat;
  background-image: url("../assets/sprite@2x.png");
  width: 25px;
  height: 20px;
  content: "";
  position: absolute;
  top:50%;
  margin-top: -10px;
}

.floorhd-tit:before {

  background-position:0;
  left: 0;
}

.floorhd-tit:after {
  background-position:-25px 0;
  right: 0;
}

.recommend-more-inner {
  margin: auto;
  width: 1250px;
}

.more-list {
  margin: 0 -5px;
}

.more-item {
  position: relative;
  float: left;
  width: 230px;
  height: 322px;
  margin: 0 5px 10px;
  background-color: #ffffff;
  border: none;
}

.more-lk {
  display: inline-block;
  width: 100%;
  height: 100%;
}

.more-img {
  width: 150px;
  height: 150px;
  margin:30px auto 40px;
}

.more-info-name {
  top:0;
  height: 48px;
  font-size: 14px;
  line-height: 24px;
  text-align: left;
  color:#666;
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.more-info-price {
  margin-top: 10px;
}

.mod-price {
  float: left;
  width: 120px;
  text-align: left;
  color: #e1251b;
}

.more .mod-price {
  display: inline-block;
  font-size: 16px;
  line-height: 18px;
  height: 18px;
  color: #e1251b;
}

.more .mod-price i {
  vertical-align: middle;
  font-size: 12px;
  font-weight: 700;
  font-family: MicrosoftYahei-regular,Arial,Helvetica,sans-serif;
}

.mod-price i {
  margin-right: 3px;
}

i {
  font-style: normal;
  color: #e1251b;
}

.more-info-price-txt {
  font-size: 20px;
  font-weight: 700;
  font-family: arial,sans-serif;
}

.more-info-price-decimal {
  font-size: 12px;
}
</style>