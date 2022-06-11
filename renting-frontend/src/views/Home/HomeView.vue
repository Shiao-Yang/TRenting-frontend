<template>
  <div class="home">
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
              <router-link to="/ticket_test">我的报修</router-link>
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
    <div id="header">
      <div class="w">
        <div class="logo">
          <img src="../../assets/logo.png" style="position:absolute;top:0;left:0;height: 50px; width: 50px">
        </div>
        <div class="web-text-box">
          <h1 style="color:white;font-size: 100px">用心创造温馨</h1>
        </div>
        <div class="web-ftext-box">
          <span id="web-ftext">平台已成功交易订单{{numData.complaints}}次，为您竭诚服务</span>
        </div>
        <div class="search-box">
          <div class="box" style="height: 43px;padding: 20px 5px 2px 5px">
            <ul style="padding-left: 5px">
              <li class="menu-item" id="menu-short"
                  onclick="document.querySelector('.menu-item-check').className='menu-item';document.querySelector('#menu-short').className='menu-item-check';document.getElementById('menu-i').style.left='30px'">
                <span>短租</span>
              </li>
              <li class="menu-item-check" id="menu-long"
                  onclick="document.querySelector('.menu-item-check').className='menu-item';document.querySelector('#menu-long').className='menu-item-check';document.getElementById('menu-i').style.left='80px'">
                <span>长租</span>
              </li>
            </ul>
            <i id="menu-i" style="left:80px"></i>
          </div>
          <div class="box" style="padding: 0">
            <input v-model="input"  type="text" placeholder="请输入区域、商圈或小区名开始找房"  v-on:keyup.enter="search">
            <input type="button" value="开始找房" @click="search()">
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
              <li class="more-item" v-for="house in houses.slice(0, 50)">
                <a @click="toDetail(house)" class="more-lk" target="_blank">
                  <div class="more-img">
                    <img src="../../assets/logo.png" width="150px" height="150px" v-if="house.pictures == null">
                    <img :src= house.pictures width="150px" height="150px" v-else>
                  </div>
                  <div class="more-info">
                    <div class="more-info-name">
                      <p class="locationInfo">
                        <span>{{house.location}}</span>
                      </p>
                      <p class="detailsInfo">
                        <span >{{houseType[house.type]}}</span>
                        <span>·</span><span>{{house.area}} m<sup>2</sup></span>
                      </p>
                    </div>
                    <div class="more-info-price">
                      <div class="mod-price">
                        <i>￥</i>
                        <span class="more-info-price-txt">
                          {{ house.long_price }}
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
export default {
  name: 'HomeView',

  data() {
    return {
      needFixed: false,
      houses: [      ],
      imgBase64_pre: "data:image/png;base64,",
      user: {

      },
      houseType:['未知', '单人间', '双人间', '三人间', '四人间'],
      numData:{
        order: 1,
        tickets: 1,
        complaints: 1,
      },
      input: '',
    }
  },

  methods:{
    handleText (){
      let self = this;
      let i=0;
      let order= self.numData.order;
      let tickets= self.numData.tickets;
      let complaints= self.numData.complaints;
      let text=["平台已处理报修"+tickets+"次，为您保驾护航", "平台已回复投诉"+complaints+"次，倾听您的声音","平台已成功交易订单"+order+"次，为您竭诚服务"]
      function changeText(){
        i=i%3;
        document.getElementById("web-ftext").innerText = text[i];
        i++;
      }
      setInterval(changeText, 3000);
    },

    getHouses()
    {
      const self = this;
      self.$axios({
        method: 'GET',
        url: 'http://127.0.0.1:8000/homepage/get_house/'
      })
          .then(res => {
            this.houses = res.data;
            console.log(this.houses);
          })
          .catch((err =>{
            console.log(err);
          }))
    },

    getData()
    {
      const self = this;
      self.$axios({
        method: 'GET',
        url: 'http://127.0.0.1:8000/homepage/get_data/'
      })
          .then(res => {
            this.numData = res.data;
            console.log(this.numData);
          })
          .catch((err => {
            console.log(err);
          }))
    },

    search() {
      let self = this;
      if(document.getElementById('menu-long').className === 'menu-item-check') {
        self.$router.push({
          path: '/list',
          query: {
            keywords: '',
            type: 'long',
          }});
      }

      else if(document.getElementById('menu-short').className === 'menu-item-check') {
        self.$router.push({
          path: '/list',
          query: {
            keywords: self.input,
            type: 'short',
          }});
      }

      else {
        self.$router.push({
          path: '/list',
          query: {
            keywords: self.input,
          }});
      }
    },

    getUser(uid)
    {
      const self = this;
      self.$axios({
        method: 'GET',
        url: 'http://127.0.0.1:8000/homepage/get_user',
        params:uid,
      })
          .then(res => {
            console.log(res.data);
          })
          .catch(err => {
            console.log(err);
          })
    },

    toDetail(house) {
      let self = this;
      let type = self.$route.query.type;
      let uid = self.user.uid;
      if(type === undefined) {
        type = ''
      }

      if(uid === undefined) {
        uid = 0;
      }
      if(house.id === undefined) {
        return ;
      }

      this.$router.push({
        path:'/details',
        query: {
          uid: uid,
          type: type,
          hid: house.id,
        }
      })
    },
    logOut() {
      this.$store.commit('logout');
      this.$router.go(0);
    }
  },

  created() {
    this.getHouses()
    this.getData()
    this.getUser({uid:this.$store.state.userInfo.id})
  },

  mounted() {
    window.onload = this.handleText
  },
};

</script>
<style lang="css" scoped src="../../assets/css/shortcut.css">

</style>

<style scoped>
#header {
  width: 100%;
  height: 610px;
  left: 0;
  top: 31px;
  background: #161616 url(../../assets/HomeViewBG.jpg) no-repeat fixed center 0;
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

.w {
  width: 1190px;
  margin: auto;
  display: block;
}

.logo {
  width: 1190px;
  line-height: 50px;
  float:left;
  height:50px;
  position: relative;
  display: block;
}

.search-box {
  padding: 20px;
  margin:auto;
  position: relative;
  display: block;
}

.web-text-box {
  display: block;
  margin: auto;
  padding: 100px 40px 20px 40px;
  font-size: 40px;
  text-align: center;
  height: 200px;
  position:relative;
}

.web-ftext-box {
  display: block;
  margin: auto;
  padding: 0;
  font-size: 20px;
  text-align: center;
  height: 45px;
  line-height: 45px;
  font-weight: 800;
  color: #fff;
  opacity:9;
}

.box {
  width: 700px;
  height: 50px;
  padding: 20px;
  margin:0 auto;
  position: relative;
  display: flex;
}
.menu-item-check {
  text-align: center;
  border: none;
  margin-left: 12px;
  font-size: 18px;
  font-weight: 900;
  color: #fff;
  opacity: 1;
  cursor: pointer;
}

.menu-item {
  text-align: center;
  border: none;
  margin-left: 12px;
  font-size: 18px;
  font-weight: 900;
  color: #fff;
  opacity: .5;
  cursor: pointer;
}

#menu-i {
  border-left: 9px solid transparent;
  border-right: 9px solid transparent;
  width: 0;
  height: 0;
  transition: all ease-in-out .3s;
  position: absolute;
  top: 55px;
  border-bottom: 10px solid #fff;
  z-index: 9;
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
  background-image: url("../../assets/sprite@2x.png");
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

.more-lk:hover {
  box-shadow: 2px 2px 10px rgb(0 0 0 / 30%);;
}

.more-img {
  width: 150px;
  height: 150px;
  margin:30px auto 40px;
}

.more-info {
  margin: 0 20px;
}

.more-info-name {
  top:0;
  height: 50px;
  line-height: 24px;
  text-align: left;
  color:#000;
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.more-info-name .locationInfo {
  font-size: 24px;
  font-weight: 700;
}

.more-info-name .detailsInfo {
  font-size: 16px;
  font-weight: 500;
  color: #666;
}

.more-info-name .detailsInfo span {
  margin-right: 5px;
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

a {
  cursor: pointer;
}


</style>