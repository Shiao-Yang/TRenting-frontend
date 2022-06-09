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
        <div class="title">订单确认</div>
        <div class="info-nav-r">
          <div id="info-nav-search">
            <div class="form">
              <input type="text" v-model="input" id="key" class="text" v-on:keyup.enter="search"></input>
              <button type="button" class="button" @click="search">
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
        <div class="main" v-if="success === false">
          <div class="box">
            <div class="mt">
              <ul>
                <li class="main-title">确认订单</li>
                <li class="sub-title">请仔细核对订单信息后确认并支付</li>
              </ul>
            </div>
            <div class="mc">
              <div class="house_info">
                <div class="form">
                  <div class="item">
                    <span class="label">房源类型 :</span>
                    <div class="fl">{{ hType[house.type] }}</div>
                  </div>
                  <div class="item">
                    <span class="label">房源详细地址 :</span>
                    <div class="fl">{{ house.detail }}</div>
                  </div>
                  <div class="item pic">
                    <span class="label">房源预览 :</span>
                    <div class="fl">
                      <img alt="preview" :src="house.pictures">
                      <img alt="preview" :src="house.floor_plan">
                    </div>
                  </div>
                </div>
              </div>
              <div class="user_info">
                <div class="form">
                  <div class="item">
                    <span class="label">租客姓名 :</span>
                    <div class="fl">{{ user.name }}</div>
                  </div>
                  <div class="item">
                    <span class="label">手机 :</span>
                    <div class="fl">{{ user.tel }}</div>
                  </div>
                  <div class="item">
                    <span class="label">邮箱 :</span>
                    <div class="fl">{{ user.email }}</div>
                  </div>
                </div>
              </div>
              <div class="order_info">
                <div class="form">
                  <div class="item">
                    <span class="label">订单类型 : </span>
                    <div class="fl">{{ oType[order.type] }}</div>
                  </div>
                  <div class="item">
                    <span class="label">租期起始日期 : </span>
                    <div class="fl">{{ order.start_time }}</div>
                  </div>
                  <div class="item">
                    <span class="label">租用时长 :</span>
                    <div class="fl">
                      {{order.duration}} {{unit[order.type]}}
                    </div>
                  </div>
                  <div class="item">
                    <span class="label">交易额 :</span>
                    <div class="fl">
                      <span class="price">￥</span>
                      <span class="priceNum">{{order.amount}}</span>
                    </div>
                  </div>
                  <div class="item">
                    <span class="label"></span>
                    <div class="fl">
                      <el-button type="success" @click="bol=true">确认并支付</el-button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="main" v-if="success === true">
          <div class="box">
            <div class="mt">
              <ul>
                <li class="main-title">确认支付成功</li>
              </ul>
            </div>
            <div class="mc">
              <div class="success-info">
                <div class="success_img">
                  <img alt="preview" src="../assets/finish.png">
                </div>
                <div class="success-info-details">
                  <p>订单支付成功！</p>
                  <span>3 秒后跳转至主页</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <template v-if="bol">
      <PayWindows @ok="payOrder" @cancel="close"></PayWindows>
    </template>
  </div>
</template>

<script>
import PayWindows from "@/components/PayWindows";
export default {
  name: "ConfirmOrder",
  components: {PayWindows},
  data () {
    return {
      success: false,
      input: '',
      bol: false,
      user: {
        username: '',
      },
      hType: ['未知', '单人间', '双人间', '三人间', '四人间+'],
      oType: ['短租订单', '长租订单'],
      unit: ['日', '月'],
      house: {
        type: '',
        long_price: 0,
      },
      order: {
        oid: 0,
        type: '',
        start_time: '',
        tel: '',
      },
    }
  },

  methods:{
    getUser(uid) {
      let self = this;
      if(self.$store.state.userInfo.id === undefined || self.$store.state.userInfo.id === '') {
        let msg = this.$message.error("尚未登录，3秒后跳转至首页");
        setTimeout(()=>{
          this.$router.push({
            path:'/'
          });
          msg.close();
        }, 3000);
      }
      else {
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

    getOrder(uid, oid) {
      let self = this;
      self.$axios({
        method: 'GET',
        url: 'http://127.0.0.1:8000/order/get_unpaid',
        params: uid,
      })
          .then(res=>{
            let orders = res.data;
            for(let i=0; i<orders.length; i++) {
              if(orders[i].oid == oid) {
                self.order = orders[i];
                self.getHouse({hid:orders[i].hid});
              }
            }
            console.log(self.order);
          })
          .catch(err =>{
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

    payOrder() {
      let self = this;
      let formData = new FormData();
      formData.append("uid", self.user.uid);
      formData.append("oid", self.order.oid);
      self.$axios({
        method: 'POST',
        url: ' http://127.0.0.1:8000/order/pay/',
        data: formData,
      })
          .then(res => {
            console.log(res.data);
            self.success = true;
            self.close();
            self.$message.success("支付成功!")
            setTimeout(() => {
              self.$router.push({
                path:'/',
                query: {
                  uid: self.user.uid,
                }
              });
            }, 3000);
          })
          .catch(err=> {
            console.log(err);
          })

    },

    close() {
      // 关闭支付弹窗
      this.bol = false;
    }
  },

  created() {
    this.getUser({uid: this.$store.state.userInfo.id})
    this.getOrder({uid: this.$store.state.userInfo.id}, this.$route.query.oid);

  },

  mounted() {
  },
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
  width: 1000px;
  float: left;
}

.container .box {
  margin: 20px;
  background-color: #ffffff;
}

.container .box .mt {
  display: block;
  padding: 20px;
  height: 30px;
  line-height: 30px;
  border-bottom: 1px solid #f0f3ef;
}

.container .box .mt ul {
  display: flex;
  float: left;
}

.container .box ul li {
  border-right: none;
  margin-right: 20px;
}

.container .box .mt .main-title {
  color: black;
  font-weight: 700;
  font-size: 20px;
}

.container .box .mt .sub-title {
  color: #666666;
  font-size: 12px;
  margin-top: 4px;
  font-weight: 600;
  opacity: .6;
}

.house_info, .user_info {
  border-bottom: 1px solid #f0f3ef;
}

.mc {
  margin-top: 5px;
  margin-bottom: 5px;
  padding-bottom: 40px;
}

.mc .form .item {
  display: block;
  margin-bottom: 10px;
  width: 100%;
  height: 40px;
}

.mc .form .pic {
  height: 120px;
}

.mc .form .item span.label {
  float: left;
  height: 18px;
  line-height: 18px;
  padding: 6px 0;
  margin-left: 20px;
  margin-right: 30px;
  width: 100px;
  text-align: right;
}

.fl {
  float: left;
  padding: 6px;
}

.mc .form .item img {
  margin-top: 10px;
  width: 100px;
  height: 100px;
  margin-left: 10px;
  margin-right: 20px;
}

.price {
  color: #f10215;
  padding: 0;
}

.priceNum {
  color: #f10215;
  padding: 0;
  font-weight: 700;
  font-size: 20px;
}

.success-info {
  position: relative;
  display: flex;
}

.success_img {
  width: 200px;
  height: 200px;
}

.success_img img {
  float: left;
  margin-left: 50px;
  width: 150px;
  height: 150px;
}

.success-info .success-info-details {
  margin:40px 30px;
}

.success-info-details p {
  font-size: 24px;
  font-weight: 700;
  color: #00ae66;
}

.success-info .success-info-details span{
  font-size: 16px;
  float: left;
}
</style>