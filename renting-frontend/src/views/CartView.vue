<template>
  <div class="info">
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
                <router-link to="/ticket">我的报修</router-link>
              </dd>
              <dd>
                <router-link to="/ticket">报修状态</router-link>
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

          <!--el-button type="success" @click="getHouse">注&nbsp;&nbsp;册</el-button-->

          <div class="breadcrumb" >
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item :to="{path: '/info/'}">个人中心</el-breadcrumb-item>
              <el-breadcrumb-item>购物车</el-breadcrumb-item>
            </el-breadcrumb>
          </div>

          <div class="divider">
              <el-divider><i class="el-icon-house"></i></el-divider>
          </div>


          <div class="cart">
            <div v-if="this.house.length=== 0">
              <p style="margin-top: 200px; padding-left: 50%; font-family: 微软雅黑,serif; font-size: 66px">空空如也~</p>
            </div>

            <!--
            <div class="house-item">
              <div class="house-image">
                <img class="image" src="../assets/cart.png" alt="加载失败">
              </div>
              <div class="house-dsc">
                <div class="house-info">
                  <h1 class="title">精品好房 <span><el-tag type="success">在售</el-tag></span></h1>
                  <p>短租：{{house[0].short_price}} 元/天   长租：{{house[0].long_price}}</p>
                  <p>位置：{{house[0].location}} | 面积：{{house[0].area}}</p>
                  <p>户型：单人 | 双人 | 四人</p>

                </div>
              </div>

              <div class="op_button">
                <el-button type="success" icon="el-icon-shop">下单买房</el-button>
                <el-button type="danger" icon="el-icon-delete">移除</el-button>
              </div>
            </div>
            -->


            <div style="margin-top: 10px">
              <div class="house-item" v-for="house in house_paging">
                <div class="house-image">
                  <img class="image" src="../assets/cart.png" alt="加载失败">
                </div>
                <div class="house-dsc">
                    <!--h1 class="title">精品好房 <el-tag type="success">在售</el-tag></h1>
                    <p>短租：{{house.short_price}} 元/天   长租：{{house.long_price}}</p>
                    <p>位置：{{house.location}} | 面积：{{house.area}}</p>
                    <p>户型：{{house.type}}</p-->
                  <div style="font-size: 30px; color: #00ae66; font-weight:bold; margin-bottom: 5px">
                    精品好房
                    <span v-if="house.available===1" style="position: relative; bottom: 5px"><el-tag type="success" size="medium">在售</el-tag></span>
                    <span v-if="house.available===0" style="position: relative; bottom: 5px"><el-tag type="danger" size="medium">暂停出售</el-tag></span>
                  </div>
                  <el-descriptions style="color: rgba(43,177,28,0.82)" border column="2" >
                    <el-descriptions-item label="编号">{{house.id}}</el-descriptions-item>
                    <el-descriptions-item label="位置">{{house.location}}</el-descriptions-item>
                    <el-descriptions-item label="面积">{{house.area}}&nbsp;&nbsp;m²</el-descriptions-item>
                    <el-descriptions-item label="户型">
                      <div v-if="house.type === 1">单人间</div>
                      <div v-if="house.type === 2">双人间</div>
                      <div v-if="house.type === 3">四人间</div>
                    </el-descriptions-item>
                    <el-descriptions-item label="短租">
                      {{house.short_price}}&nbsp;&nbsp;元/天
                    </el-descriptions-item>
                    <el-descriptions-item label="长租">
                      {{house.long_price}}&nbsp;&nbsp;元/天
                    </el-descriptions-item>
                    <el-descriptions-item label="相关描述">
                      <div v-if="house.detail === null || house.detail === ''">
                        暂无
                      </div>
                      <div v-if="house.detail !== null && house.detail !== ''">
                        {{ house.detail }}
                      </div>
                    </el-descriptions-item>
                  </el-descriptions>
                </div>


                <div class="op_button">
                    <el-button style="position: relative; top: 60px; left:50px" plain type="success" icon="el-icon-sold-out" @click="handOrder(house)">下单买房</el-button>
                    <el-button style="position: relative; top: 90px; left:50px" plain type="danger" icon="el-icon-delete" @click="removeFromCart(house)">移除</el-button>
                </div>

              </div>
            </div>

            <div style="margin-top: 60px">
              <el-pagination
                  :page-size="3"
                  :pager-count="7"
                  :current-page="current_page"
                  layout="prev, pager, next"
                  @current-change = "house_change_page"
                  :total="this.house.length"
                  style="float:right">
              </el-pagination>
            </div>

          </div>










        </div>
      </div>
    </div>
  </div>
</template>

<script>
import qs from "qs";
import axios from "axios";

export default {
  name: "CartView",
  data () {
    return {
      house: [], //房源信息，由于有多个，以列表形式存储
      house_count: 0, //房源数量
      page_size: 10,
      images: [],
      url: '../assets/cart.png',
      //当前页数
      current_page: 1,
      //当前 各个订单页面中所展示的订单
      house_paging: [],
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
    getHouse() {
      var formData = {
        'id': 1,
      };
      console.log(formData);

      this.$axios({
        method: 'get',
        url: "http://127.0.0.1:8000/personal_homepage/get_cart/?uid="+formData.id,
      })
      .then(res => {
        console.log(res.data);
        this.house = res.data;
        this.$store.state.cartInfo = res.data;
        //console.log(this.house[0].pictures);
        var i;

        /*
        for(i = 0; i < house.length; i++) {
          var url = house[i].pictures;
          house[i].pictures = 'data:image/jpg;base64,' + url;
        }

         */
        this.house_paging = [];
        this.current_page = 1;
        if(this.house) {
          for(let i = 0; i < this.house.length&&i<3; i++) {
            this.house_paging.push(this.house[i]);
          }
        }

         //console.log(house[0].pictures);

      })
      .catch(err => {
        console.log(err);
      })

    },
    removeFromCart(house) {
      console.log(1);
      let houseData = {
        hid: house.id,
        uid: 1,
      }

      console.log(2);
      console.log(houseData);
      this.$axios({
        method: 'post',
        url: "http://127.0.0.1:8000/cart/delete/",
        data: qs.stringify(houseData),
      }).then(res => {
        let tmp = res.data;
        console.log(res.data.error);
        if(tmp.error === 0) {
          for(let i = 0; i < this.house.length; i++) {

            if(this.house[i].id===houseData.hid) {
              this.house.splice(i,1);
              break;
            }
          }

          this.house_paging = [];
          this.current_page = 1;
          if(this.house) {
            for(let i = 0; i < this.house.length&&i<3; i++) {
              this.house_paging.push(this.house[i]);
            }
          }

          this.$message ({
            showClose: true,
            type: "success",
            message: '删除成功',
          });

        }
      }).catch(err => {
        console.log(err);
        this.$message ({
          showClose: true,
          type: "error",
          message: '删除失败',
        });
      })

      /*

      for(let i = 0; i < this.$store.state.cartInfo.length; i++) {
        if (this.$store.state.cartInfo[i].hid === houseData.hid) {
          this.$store.state.cartInfo.splice(i, 1);
          break;
        }
      }

       */

    },
    house_change_page(new_page) {
      console.log(new_page);
      this.house_paging = [];
      this.current_page = new_page;
      for(let i = 3*(new_page-1); i < this.house.length && i < 3*new_page; i++) {
        this.house_paging.push(this.house[i]);
      }
      console.log(this.house_paging);
    },
    handOrder(cart) {
      this.$store.state.handOrderCartInfo = cart;
      this.$router.push('/handOrder');
    }
  },

  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  created() {
    this.getHouse();
  }
}
</script>

<style lang="css" scoped src="../assets/css/shortcut.css">

</style>

<style scoped>
.el-row {
  margin-bottom: 20px;

}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {

  background: #e5e9f2;
}
.grid-content {

  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.house-item {
  height: 250px;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  position: relative;
  top: 35px;
  margin-bottom: 10px;
}

.breadcrumb {
  position: relative;
  top: 25px
}

.divider {
  position: relative;
  top: 25px
}
.house-image {

  height: 230px;
  width: 250px;
  display: inline-block;
  position: relative;
  left: 10px;
  top: 10px;
  vertical-align: middle;
}

.image {
  height: 100%;
  width: 100%;
}

.house-dsc {

  height: 230px;
  width: 500px;
  display: inline-block;
  position: relative;
  vertical-align: middle;
  left: 20px;
  top: 10px;
}

.house-info {

  border-width: 1px;
  border-style: solid;
  height: 180px;
  width: 300px;
  display: inline-block;
  position: relative;
  left: 30px;
}

.op_button {

  height: 230px;
  width: 200px;
  display: inline-block;
  position: relative;
  vertical-align: middle;
  top: 10px;
  left: 40px;
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