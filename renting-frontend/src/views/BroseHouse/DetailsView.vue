<template xmlns="">
  <div class="details">
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
            <div v-if="this.$store.state.isLogin">
              <router-link :to="{path:'/info', query:{uid:this.$route.query.uid,}}">{{ user.username }}</router-link>
            </div>
            <div v-else>
              <router-link to="/login">登录</router-link>&nbsp;&nbsp;
              <router-link to="/login" style="color:#f10215;">免费注册</router-link>
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
          <el-input v-model="input" placeholder="请输入内容" class="search-input" clearable>
          </el-input>
          <el-button class="search-button" slot="suffix" icon="el-icon-search" @click="search"></el-button>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="main-info">
        <div class="house-intro-w">
          <div class="house-pic-w">
            <div class="house-pic">
              <div class="house-info-img-main">
                <img alt="preview" id="img-main" class="img-main" :src="house.pictures">
              </div>
              <div class="house-info-pic-list">
                <router-link id="prev" :to="this.$route.path">
                  <img alt="left" class="prev-arrow" src="../../assets/arrow-left.png">
                </router-link>
                <router-link id="next" :to="this.$route.path">
                  <img alt="right" class="next-arrow" src="../../assets/arrow-right.png">
                </router-link>
                <div class="items">
                  <ul>
                    <li>
                      <img alt="preview" :src="house.pictures">
                    </li>
                    <li>
                      <img alt="preview" :src="house.floor_plan">
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="house-info-w">
            <div class="house-info-title">
              <span v-if="this.$route.query.type === 'short'">短租</span>
              <span v-else>长租</span>
              · {{house.location}} · {{houseType[house.type]}}
            </div>
            <div class="house-info-price-w">
              <div class="house-info-price">
                <div class="dt">价 格 :</div>
                <div class="dd">
                  <span class="price">
                    <span class="price-info" v-if="this.$route.query.type === 'short'">
                      ￥
                      <span class="price-num">{{house.short_price}}</span>
                      / 日
                    </span>
                    <span v-else class="price-info">
                      ￥
                      <span class="price-num">{{house.long_price}}</span>
                      / 月
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="house-details-w">
            <ul class="house-details">
              <li class="details_addr">
                <div class="dt">详细地址 : </div>
                <div class="dd">
                  {{ house.detail }}
                </div>
              </li>
              <li class="details_area">
                <div class="dt">建筑面积 : </div>
                <div class="dd">
                  {{house.area}} m<sup>2</sup>
                </div>
              </li>
              <li class="details_available">
                <div class="dt">当前状态 : </div>
                <div class="dd">
                  <span v-if="house.available === 1">可出租</span>
                  <span v-else>不可出租</span>
                </div>
              </li>
              <li class="addToCart">
                <el-button v-if="house.available === 1" type="success" @click="addToCart">添加到购物车</el-button>
                <el-button v-else type="success" disabled>添加到购物车</el-button>
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
  name: "DetailsView",
  data () {
    return {
      user: {
        username: '',
        avatar: '',
      },
      houseType:['未知', '单人间', '双人间', '三人间', '四人间'],
      input: '',
      house: {
        hid : 0,
        pictures: '',
        location: '',
        type: '',
        short_price: '',
        long_price: '',
        floor_plan: '',
        detail: '',
        area: '',
        available: 1,
      },
      pictures: [],
    }
  },
  watch : {

  },
  methods:{
    getUser(uid) {
      let self = this;
      self.$axios({
        method: 'GET',
        url: 'http://127.0.0.1:8000/browse_house/get_user/',
        params: uid,
      })
          .then(res =>{
            self.user = res.data;
            console.log(self.user);
          })
          .catch(err=>{
            console.log(err);
          })
    },

    getHouse(hid) {
      let self = this;
      self.$axios({
        method: 'GET',
        url: 'http://127.0.0.1:8000/browse_house/get_house/',
        params: hid,
      })
          .then(res => {
            self.house = res.data;
            console.log(self.house);
          })
          .catch(err => {
            console.log(err);
          })
    },

    addToCart() {
      let self = this;
      let formData = new FormData();
      formData.append("uid", self.$route.query.uid);
      formData.append("hid", self.$route.query.hid);
      if(self.$route.query.uid === undefined) {
        self.$message.error("尚未登录!")
      }
      else {
        self.$axios({
          method: 'POST',
          url: 'http://127.0.0.1:8000/browse_house/add_cart/',
          data: formData,
        })
            .then(res=> {
              console.log(res.data);
              switch (res.data.error){
                case 0:
                  self.$message.success("添加至购物车成功");
                  break;
                case 2:
                case 3:
                  self.$message.error("尚未登录");
                  break;
                case 4:
                  self.$message.error("房源不存在了")
                  break;
                case 5:
                  self.$message.error("房源已存在于购物车中");
                  break;
                case 6:
                  self.$message.error("未知错误，请联系开发者处理");
                  break;
              }

            })
      }
    }
  },

  created() {
    this.getUser({uid:this.$route.query.uid})
    this.getHouse({hid:this.$route.query.hid})
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
  position: absolute;
  top: 186px;
  width: 100%;
}

.main-info {
  position: relative;
  width: 1210px;
  margin: 10px auto;
}

.house-intro-w {
  display: flex;
}

.house-pic-w {
  float: left;
  width: 452px;
  padding-bottom: 15px;
}

.house-info-w {
  position: absolute;
  float: left;
  right: 0;
  width: 738px;
  height: 127px;
  margin-left: 15px;
  display: inline-block;
}

.house-pic {
  position: relative;
}

.house-info-img-main {
  position: relative;
  border:1px solid #eee;
  margin-bottom: 20px;
}

.house-info-img-main #img-main {
  width: 450px;
  height: 300px;
}

.house-info-pic-list {
  margin-bottom: 18px;
  position: relative;
  display: block;
}

.house-info-pic-list #next {
  right: 0;
  display: block;
  width: 22px;
  height: 32px;
  float: left;
  position: absolute;
  cursor: pointer;
  top: 25%;
}

.house-info-pic-list #prev{
  left: 0;
  display: block;
  width: 22px;
  height: 32px;
  float: left;
  position: absolute;
  cursor: pointer;
  top: 25%;
}

.house-info-pic-list #prev img {
  width: 22px;
  height: 32px;
}

.house-info-pic-list #next img {
  width: 22px;
  height: 32px;
}

.house-info-pic-list .items {
  width: 380px;
  height: 65px;
  margin: auto 22px;
  overflow: hidden;
}

.house-info-pic-list .items ul {
  margin: 0;
  height: 58px;
  width: 360px;
}

.house-info-pic-list .items ul li {
  float: left;
  border: none;
  margin: auto 9px;
  max-width: 60px;
  max-height: 70px;
}

.house-info-pic-list .items ul li img {
  border: 2px solid #eee;
  width: 60px;
  height: 60px;
  margin: auto;
  cursor: pointer;
}

.house-info-pic-list .items ul li img:hover {
  border: 2px solid #f10215;
}

.house-info-title {
  display: inline-block;
  float: left;
  font: 700 24px Arial, "microsoft yahei";
  padding-top: 20px;
  padding-left: 15px;
  color: #666666;
  line-height: 28px;
  margin-bottom: 20px;
}

.house-info-price-w {
  clear: both;
  float: left;
  width: 100%;
  background-color: #f4f4f4;
  padding: 10px;
}

.house-info-price {
  float: left;
  display: flex;
}

.house-info-price .dt {
  line-height: 22px;
  padding-left: 10px;
  font-size: 18px;
  font-weight: 500;
  margin: auto;
  color: #999999;
}

.house-info-price .dd {
  float: left;
  margin-left: 70px;
  color: #e4393c;
  font-size: 16px;
}

.house-info-price .dd .price-num {
  font-size: 26px;
  font-weight: 700;
}

.house-details-w {
  width: 738px;
  float: left;
  position: absolute;
  right: 0;
  top: 127px;
  margin-left: 20px;
  padding-bottom: 15px;
}

.house-details {
  padding: 0;
  margin: 0;
}

.house-details li {
  display: flex;
  width: 700px;
  border-right: none;
  margin-bottom: 3px;
  line-height: 45px;
  float: left;
  text-align: left;
  margin-left: 20px;
  margin-top: 5px;
}

.house-details li .dt {
  line-height: 40px;
  font-size: 18px;
  font-weight: 500;
  margin: auto 0;
  color: #999999;
}

.house-details li .dd {
  font-size: 18px;
  text-align: center;
  margin-left: 60px;
  font-weight: 700;
  color: #000000;
}

.addToCart {
  padding: 40px;
}
</style>