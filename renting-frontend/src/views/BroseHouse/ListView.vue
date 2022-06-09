<template>
  <div class="list">
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
    <div class= "search-area">
      <div class="search-nav">
        <router-link to="/list" class="logo">
          <img class="logo" src="../../assets/logo.png">
        </router-link>
        <ul>
          <li>
            <router-link to="/list">
              <span>搜索首页</span>
            </router-link>
          </li>
          <li>
            <router-link :to="{path:'/list',query:{type:'short', keywords: input}}">
              <span style="color: #00ae66" v-if="this.$route.query.type === 'short'">短租</span>
              <span v-else>短租</span>
            </router-link>
          </li>
          <li>
            <router-link :to="{path:'/list',query:{type:'long', keywords: input}}">
              <span v-if="$route.query.type === 'short'">长租</span>
              <span style="color: #00ae66" v-else>长租</span>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="list-search">
        <div class="search-box">
          <el-input v-model="input" placeholder="请输入内容" class="search-input" @keyup.enter.native="search" clearable>
          </el-input>
          <el-button class="search-button" slot="suffix" icon="el-icon-search" @click="search"></el-button>
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
              <router-link to="#">不限</router-link>
            </li>
            <li class="filter_item">
              <router-link to="#">海淀</router-link>
            </li>
            <li class="filter_item">
              <router-link to="#">朝阳</router-link>
            </li>
            <li class="filter_item">
              <router-link to="#">顺义</router-link>
            </li>
            <li class="filter_item">
              <router-link to="#">大兴</router-link>
            </li>
            <li class="filter_item">
              <router-link to="#">丰台</router-link>
            </li>
            <li class="filter_item">
              <router-link to="#">昌平</router-link>
            </li>
          </ul>
          <ul>
            <li class="filter_item filter_item_aside">
              <router-link to="#">方式</router-link>
            </li>
            <li class="filter_item_strong" id="fil1" v-if="this.$route.query.type === undefined">
              <router-link :to="{path: '/list', query: {type: undefined, uid: user.uid}}">不限</router-link>
            </li>
            <li class="filter_item" id="fil1" v-else>
              <router-link :to="{path: '/list', query: {type: undefined, uid: user.uid}}">不限</router-link>
            </li>
            <li class="filter_item_strong" v-if="this.$route.query.type === 'long'" id="fil2">
              <router-link :to="{path: '/list', query: {type: 'long', uid: user.uid}}">长租</router-link>
            </li>
            <li class="filter_item" v-else id="fil2">
              <router-link :to="{path: '/list', query: {type: 'long', uid: user.uid}}">长租</router-link>
            </li>
            <li class="filter_item_strong" v-if="this.$route.query.type === 'short'" id="fil3">
              <router-link :to="{path: '/list', query: {type: 'short', uid: user.uid}}">短租</router-link>
            </li>
            <li class="filter_item" v-else id="fil3">
              <router-link :to="{path: '/list', query: {type: 'short', uid: user.uid}}">短租</router-link>
            </li>
          </ul>
          <ul>
            <li class="filter_item_aside filter_item">
              <router-link to="/list">租金</router-link>
            </li>
            <li class="filter_item">
              <el-checkbox label="≤1000元" value="[1000]" v-model="price"></el-checkbox>
            </li>
            <li>
              <el-checkbox label="1000~1500元" v-model="price"></el-checkbox>
            </li>
            <li>
              <el-checkbox label="1500~2000元" v-model="price"></el-checkbox>
            </li>
            <li>
              <el-checkbox label="2000~2500元" v-model="price"></el-checkbox>
            </li>
            <li>
              <el-checkbox label="2500~5000元" v-model="price"></el-checkbox>
            </li>
            <li>
              <el-checkbox label=">5000元" v-model="price"></el-checkbox>
            </li>
          </ul>
          <ul>
            <li class="filter_item_aside filter_item">
              <router-link to="/list">户型</router-link>
            </li>
            <li class="filter_item">
              <el-checkbox label="一居" v-model="houseType"></el-checkbox>
            </li>
            <li>
              <el-checkbox label="两居" v-model="houseType"></el-checkbox>
            </li>
            <li>
              <el-checkbox label="三居" v-model="houseType"></el-checkbox>
            </li>
            <li>
              <el-checkbox label="四居+" v-model="houseType"></el-checkbox>
            </li>
          </ul>
        </div>
      </div>
      <div class="content-w">
        <div class="content">
          <div class="content_main">
            <p class="content_title">
              已为您找到<span style="color:#00ae66;margin: auto 5px;">{{ this.houses.length }}</span>套房源
            </p>
            <ul class="content_filter">
              <li class="selected" id="cof1">
                <a @click="changeSelected('cof1')">默认</a>
              </li>
              <li id="cof2" >
                <a @click="changeSelected('cof2')">最新上架</a>
              </li>
              <li id="cof3" >
                <a @click="changeSelected('cof3')">价格</a>
              </li>
              <li id="cof4" >
                <a @click="changeSelected('cof4')">面积</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="content_list">
          <div class="content_list_item" v-for="(house, index) in houses">
            <a @click="toDetail(house)" class="link"></a>
            <a href="javascript:;" class="content_list_item_aside">
              <img :src="house.pictures">
            </a>
            <div class="content_list_item_main">
              <p class="title">
                <a href="javascript:;" :to="{path:'/details', query:{hid:house.hid, type: $route.query.type}}">
                <span>
                  <span v-if="$route.query.type === 'short'">短租</span>
                  <span v-else>长租</span>
                  ·
                  <span>{{ house.location }}</span>
                  ·
                  <span>{{ hType[house.type] }}</span></span>
                </a>
              </p>
              <p class="des">
                <a href="javascript:;" :to="{path:'/details', query:{hid:house.hid, type: $route.query.type}}">{{ house.detail }}</a>
                <i>/</i>
                {{house.area}} ㎡
              </p>
              <span class="price">
              <span v-if="$route.query.type === 'short'">
                <em>{{house.short_price}}</em>
                元/日
              </span>
              <span v-else>
                <em>{{house.long_price}}</em>
                元/月
              </span>
            </span>
            </div>
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
      input: this.$route.query.keywords,
      user: {
        uid: '',
      },
      price: [],
      hType: ['未知', '单人间', '双人间', '三人间', '四人间+'],
      houseType: [],
      houses: [],
      sType: '',
    }
  },

  watch : {
    '$route.query.type': function () {
      if(this.$route.query.type === 'short') {
        document.getElementsByClassName('filter_item strong').className = 'filter_item';
        document.getElementById('fil3').className = 'filter_item_strong';
      }
    },
    '$route.query': function () {
      this.getUser({uid:this.$store.state.userInfo.id});
      this.searchHouses({keywords:$route.query.keywords});
    },
  },

  methods : {
    changeSelected(targetID) {
      console.log(document.querySelector('.selected').className);
      document.querySelector('.selected').className = 'click';
      console.log(document.querySelector('.click').className);
      document.getElementById(targetID).className = 'selected';
    },

    unifyHouseType() {
      for(let i=0; i< this.houseType.length; i++) {
        if(this.houseType[i] === '一居') {
          this.houseType[i] = 1;
        }
        else if(this.houseType[i] === '二居') {
          this.houseType[i] = 2;
        }
        else if(this.houseType[i] === '三居') {
          this.houseType[i] = 3;
        }
        else if(this.houseType[i] === '四居+') {
          this.houseType[i] = 4;
        }
      }
    },

    getUser(uid) {
      let self = this;
      self.$axios({
        method: 'GET',
        url: 'http://127.0.0.1:8000/browse_house/get_user/',
        params: uid,
      })
          .then(res =>{
            self.user = res.data;
            self.user['uid'] = uid.uid;
            console.log(self.user);
          })
          .catch(err=>{
            console.log(err);
          })
    },

    searchHouses(keywords) {
      let self = this;
      if(keywords.keywords === undefined) {
        self.$axios({
          method: 'GET',
          url: 'http://127.0.0.1:8000/homepage/get_house/',
        })
            .then(res => {
              self.houses = res.data;
              console.log(self.houses);
            })
            .catch(err => {
              console.log(err);
            })
      }
      else {
        self.$axios({
          method: 'GET',
          url: 'http://127.0.0.1:8000/browse_house/searchSimple/',
          params: keywords,
        })
            .then(res => {
              self.houses = res.data;
              console.log(self.houses);
            })
            .catch(err => {
              console.log(err);
            })
      }

    },

    resetData() {
      let self = this;
      if(self.input === undefined) {
        self.input = '';
      }

      if(self.$route.query.type !== undefined) {
        self.sType = self.$route.query.type;
      }
    },

    search() {
      let self = this;
      if(self.input === '' || self.input === undefined) {
        self.$router.push({
          path: '/list',
        })
      }
      else {
        self.$router.push({
          path: '/list',
          query: {
            keywords: self.input,
          }})
      }
      this.$router.go(0);
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
        console.log("UNDEFINED");

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


  },
  created() {
    this.getUser({uid: this.$store.state.uid});
    this.searchHouses({keywords: this.$route.query.keywords});
    this.resetData();
  },

  mounted() {
  },
}
</script>
<style lang="css" scoped src="../../assets/css/shortcut.css">

</style>

<style scoped>
.search-area {
  position: absolute;
  left: 0;
  top: 31px;
  width: 100%;
  height: 155px;
  padding: 25px 0;
  background-color: #f4f4f4;
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
  margin: auto 0;
  line-height: 30px;
  height: 30px;
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
  /*box-shadow: 0px 0px 4px rgb(0 0 0 / 10%);*/
  /*width: 668px;*/
  /*height: 46px;*/
  /*display: inline-block;*/
  /*line-height: 46px;*/
  /*font-size: 14px;*/
  /*border-radius: 4px;*/
  /*background-color: #ffffff;*/
}

.search-input {
  width: 660px;
  box-sizing: border-box;
  border-width: 0;
  font-size: 16px;
  background-color: #fff;
}

.container {
  width: 100%;
  margin: auto;
  background-color: #fff;
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

.filter_item_strong a{
  color: #00ae66;
  font-weight: 700;
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

.content-w {
  width: 100%;
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
  border-bottom: 2px solid #00ae66;
}

.content_list {
  width: 1190px;
  margin: auto;
}

.content_list_item {
  float: left;
  width: 100%;
  margin-top: 10px;
  position: relative;
}

.content_list_item .link {
  display: block;
  position: absolute;
  width: 100%;
  height: 122px;
  z-index: 2;
}

.content_list_item .link:hover {
  box-shadow: 0px 0px 10px rgb(0 0 0 / 10%);
}

.content_list_item_aside {
  position: relative;
  margin-left: 10px;
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
  right: 10px;
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

a {
  cursor: pointer;
}
</style>