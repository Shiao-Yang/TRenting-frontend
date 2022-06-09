<template>
  <div class="info">
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
            <div>
              <router-link :to="{path:'/info', query:{uid:this.$route.query.uid,}}">{{ user.username }}</router-link>
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
    <div id="info-nav">
      <div class="w">
        <div class="logo">
          <router-link to="/"></router-link>
        </div>
        <div class="title">个人主页</div>
        <div class="nav-items">
          <div class="dte">
            <router-link :to="{path:'/info', query:{uid:this.$route.query.uid,}}">个人首页</router-link>
          </div>
          <div class="dte">
            <router-link :to="{path:'/info', query:{uid:this.$route.query.uid, type:'baseSet'}}">账号设置</router-link>
          </div>
        </div>
        <div class="info-nav-r">
          <div id="info-nav-search">
            <div class="form">
              <input type="text" v-model="input" id="key" class="text"></input>
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
                <router-link to="/info">我的订单</router-link>
              </dd>
              <dd>
                <router-link to="/info">评价晒单</router-link>
              </dd>
            </dl>
            <dl>
              <dt>客户服务</dt>
              <dd>
                <router-link to="/info">我的报修</router-link>
              </dd>
              <dd>
                <router-link to="/info">报修状态</router-link>
              </dd>
              <dd>
                <router-link to="/info">我的投诉</router-link>
              </dd>
              <dd>
                <router-link to="/info">投诉状态</router-link>
              </dd>
            </dl>
            <dl>
              <dt>账号服务</dt>
              <dd>
                <router-link :to="{path:'/info', query:{uid:this.$route.query.uid, type:'baseSet'}}">我的信息</router-link>
              </dd>
              <dd>
                <router-link :to="{path:'/info', query:{uid:this.$route.query.uid, type:'safeSet'}}">账号安全</router-link>
              </dd>
            </dl>
          </div>
        </div>
        <div class="main" v-if="this.$route.query.type===undefined">
          <div class="box">
            <div class="user-box">
              <div class="user-main">
                <router-link to="/info" class="avatar">
                  <img class="" :src=user.avatar style="height: 64px; width: 64px">
                </router-link>
                <div class="user">
                  <router-link to="/info" class="user-name">{{ user.username }}</router-link>
                </div>
                <div class="tags">
                  <router-link :to="{path:'/info', query:{uid:this.$route.query.uid, type:'baseSet'}}" class="tag">账号设置</router-link>
                  <span>小白</span>
                </div>
              </div>
              <div class="user-bottom">
                <div class="text">
                  <span>为您个性化的推荐</span>
                  <router-link to="/" class="button">去逛逛</router-link>
                </div>
              </div>
            </div>
            <div class="my-block my-cart">
              <div class="mt">
                <h3>我的购物车</h3>
              </div>
              <div class="mc">
                <ul>
                  <li v-for="cart in carts.slice(0, 5)">
                    <router-link to="/info">
                      <img :src=cart.pictures>
                      <span>{{cart.location}}</span>
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/info" >
                      <img class = "more" src="../../assets/more.png">
                      <span style="text-align: center">全部信息</span>
                    </router-link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="box-left">
            <div class="my-block my-order">
              <div class="mt">
                <h3>我的订单</h3>
              </div>
              <div class="mc">
                <div class="nav">
                  <ul>
                    <li>
                      <router-link to="/info">
                        <img src="../../assets/pay.png">
                        <span>待付款</span>
                      </router-link>
                    </li>
                    <li>
                      <router-link to="/info">
                        <img src="../../assets/valid.png">
                        <span>当前有效</span>
                      </router-link>
                    </li>
                    <li>
                      <router-link to="/info">
                        <img src="../../assets/comment.png">
                        <span>待评价</span>
                      </router-link>
                    </li>
                    <li>
                      <router-link to="/info">
                        <img src="../../assets/finish.png">
                        <span>已完成</span>
                      </router-link>
                    </li>
                    <li>
                      <router-link to="/info">
                        <img src="../../assets/more.png">
                        <span>全部订单</span>
                      </router-link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="my-block my-repair">
              <div class="mt">
                <h3>我的报修</h3>
              </div>
              <div class="mc">
                <div class="nav">
                  <ul>
                    <li>
                      <router-link to="/info">
                        <img src="../../assets/waiting.png">
                        <span>待处理</span>
                      </router-link>
                    </li>
                    <li>
                      <router-link to="/info">
                        <img src="../../assets/repairing.png">
                        <span>正在处理</span>
                      </router-link>
                    </li>
                    <li>
                      <router-link to="/info">
                        <img src="../../assets/comment.png">
                        <span>待评价</span>
                      </router-link>
                    </li>
                    <li>
                      <router-link to="/info">
                        <img src="../../assets/finish.png">
                        <span>已完成</span>
                      </router-link>
                    </li>
                    <li>
                      <router-link to="/info">
                        <img src="../../assets/more.png">
                        <span>全部报修</span>
                      </router-link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="my-block my-complaint">
              <div class="mt">
                <h3>我的投诉</h3>
              </div>
              <div class="mc">
                <div class="nav">
                  <ul>
                    <li>
                      <router-link to="/info">
                        <img src="../../assets/submit.png">
                        <span>待提交</span>
                      </router-link>
                    </li>
                    <li>
                      <router-link to="/info">
                        <img src="../../assets/reply.png">
                        <span>待回复</span>
                      </router-link>
                    </li>
                    <li>
                      <router-link to="/info">
                        <img src="../../assets/comment.png">
                        <span>待评价</span>
                      </router-link>
                    </li>
                    <li>
                      <router-link to="/info">
                        <img src="../../assets/finish.png">
                        <span>已完成</span>
                      </router-link>
                    </li>
                    <li>
                      <router-link to="/info">
                        <img src="../../assets/more.png">
                        <span>全部投诉</span>
                      </router-link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="box-right">
            <div class="my-block my-rec">
              <div class="mt">
                <h3>为您推荐</h3>
              </div>
              <div class="mc">
                <ul>
                  <li v-for="house in houses.slice(0, 8)">
                    <router-link to="/info">
                      <img :src=house.pictures>
                      <span>{{house.location}}</span>
                    </router-link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="main-infoSet" v-else>
          <div class="setbox">
            <div class="mt">
              <ul>
                <li class="baseSet">
                  <router-link class="selected" :to="{path:'/info', query:{uid:this.$route.query.uid, type:'baseSet'}}" v-if="this.$route.query.type==='baseSet'">基本信息</router-link>
                  <router-link :to="{path:'/info', query:{uid:this.$route.query.uid, type:'baseSet'}}" v-else>基本信息</router-link>
                </li>
                <li class="safeSet">
                  <router-link class="selected" :to="{path:'/info', query:{uid:this.$route.query.uid, type:'safeSet'}}" v-if="this.$route.query.type==='safeSet'">安全信息</router-link>
                  <router-link :to="{path:'/info', query:{uid:this.$route.query.uid, type:'safeSet'}}" v-else>安全信息</router-link>
                </li>
              </ul>
            </div>
            <div class="mc">
              <div class="baseSet" v-if="this.$route.query.type==='baseSet'">
                <div class="user-set">
                  <div class="form">
                    <div class="item">
                      <span class="label">用户名 :</span>
                      <div class="fl"><strong>{{user.username}}</strong></div>
                    </div>
                    <div class="item">
                      <span class="label">联系电话 :</span>
                      <div class="fl">
                        <input v-model="user.tel"></input>
                      </div>
                    </div>
                    <div class="item">
                      <span class="label">邮箱 :</span>
                      <div class="fl">
                        <input v-model="user.email"></input>
                      </div>
                    </div>
                    <div class="item">
                      <span class="label">年龄 :</span>
                      <div class="fl">
                        <select v-model="user.age">
                          <option v-for="(index, i) in this.ages" :key=i :value=index>{{index}}</option>
                        </select>
                      </div>
                    </div>
                    <div class="item">
                      <span class="label">性别 :</span>
                      <div class="fl">
                        <input class ="sexIn" type="radio" name="sex" value=1 v-model="user.sex"></input>
                        <label class="mr10">男</label>
                        <input class = "sexIn" type="radio" name="sex" value=0 v-model="user.sex"></input>
                        <label class="mr10">女</label>
                      </div>
                    </div>
                    <div class="item">
                      <span class="label">&nbsp</span>
                      <div class="fl">
                        <el-button type="success" size="mini" @click="updateInfo" round plain>提交修改</el-button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="user-info">
                  <div class="u-ava">
                    <img :src="user.avatar">
                  </div>
                  <div class="u-ext">
                    <div class="einfo"><strong>用户名 : {{user.username}}</strong></div>
                    <div class="einfo">信用等级 : <span style="color: #00ae66;margin-left: 5px">优秀</span></div>
                    <div class="einfo">用户类型 : <span style="color: #f4ca3a;margin-left: 5px">VIP</span> </div>
                    <div class="einfo">用户等级 : <span style="color: #f10215;margin-left: 5px">Lv6</span></div>
                  </div>
                </div>
              </div>
              <div class="safeSet" v-else>
                <div class="user-set">
                  <div class="form">
                    <div class="item">
                      <span class="label">原密码 :</span>
                      <el-input placeholder="请输入原密码" v-model="oldPass" maxlength="18" show-password></el-input>
                    </div>
                    <div class="item">
                      <span class="label">新密码 :</span>
                      <el-input placeholder="请输入新密码" v-model="newPass1" maxlength="18" show-password></el-input>
                    </div>
                    <div class="item">
                      <span class="label">确认密码 :</span>
                      <el-input placeholder="请再次输入新密码" v-model="newPass2" maxlength="18" show-password></el-input>
                    </div>
                    <div class="item">
                      <span class="label">&nbsp</span>
                      <div class="fl">
                        <el-button type="success" size="mini" @click="updatePassword" round plain>提交修改</el-button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="user-info">
                  <div class="u-ava">
                    <img :src="user.avatar">
                  </div>
                  <div class="u-ext">
                    <div class="einfo"><strong>用户名 : {{user.username}}</strong></div>
                    <div class="einfo">信用等级 : <span style="color: #00ae66;margin-left: 5px">优秀</span></div>
                    <div class="einfo">用户类型 : <span style="color: #f4ca3a;margin-left: 5px">VIP</span> </div>
                    <div class="einfo">用户等级 : <span style="color: #f10215;margin-left: 5px">Lv6</span></div>
                  </div>
                </div>
              </div>
              </div>
            </div>
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
      user: {
        username:'',
        avatar:''
      },
      carts: [],
      houses: [],
      input: '',
      id: this.$route.query.uid,
      ages: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100],
      oldPass: '',
      newPass1: '',
      newPass2: '',
    }
  },

  methods:{
    getUser(uid)
    {
      let self = this;
      self.$axios({
        method: 'GET',
        url: 'http://127.0.0.1:8000/personal_homepage/get_user',
        params: uid,
      })
          .then(res=>{
            self.user = res.data;
            console.log(res.data);
          })
          .catch(err=>{
            console.log(err);
          })
    },

    search() {
      let self = this;
      if(self.input === '' || self.input === undefined) {
        self.$router.push({
          path: '/list',
          query: {
            uid: self.$route.query.uid,
          }})
      }
      else {
        self.$router.push({
          path: '/list',
          query: {
            uid: self.user.uid,
            keywords: self.input,
          }})
      }
      this.$router.go(0);
    },

    getCart(uid)
    {
      let self = this;
      self.$axios({
        method: 'GET',
        url: 'http://127.0.0.1:8000/personal_homepage/get_cart',
        params: uid,
      })
          .then(res=>{
            self.carts = res.data;
            console.log(res.data);
          })
          .catch(err=>{
            console.log(err);
          })
    },

    getHouses() {
      let self=this;
      self.$axios({
        method: 'GET',
        url: 'http://127.0.0.1:8000/personal_homepage/get_house/',
      })
          .then(res=>{
            self.houses = res.data;
            console.log(res.data);
          })
          .catch(err=>{
            console.log(err);
          })
    },

    updateInfo() {
      let self=this;
      let formData = new FormData();
      formData.append("uid", self.$route.query.uid);
      formData.append("username", self.user.username);
      formData.append("phoneNum", self.user.tel);
      formData.append("email", self.user.email);
      formData.append("age", self.user.age);
      formData.append("sex", self.user.sex);
      self.$axios({
        method: 'POST',
        url: 'http://127.0.0.1:8000/user_ctrl/update_info/',
        data:formData,
      })
          .then(res=>{
            console.log(res.data);
            self.getUser(self.$route.query.uid);
          })
          .catch(err=>{
            console.log(err);
          })
    },

    updatePassword() {
      let self=this;
      let formData = new FormData();
      formData.append("uid", self.$route.query.uid);
      formData.append("oldPass", self.oldPass);
      formData.append("newPass1", self.newPass1);
      formData.append("newPass2", self.newPass2);

      self.$axios({
        method: 'POST',
        url: 'http://127.0.0.1:8000/personal_homepage/update_password/',
        data:formData,
      })
          .then(res => {
            console.log(res.data);
            switch (res.data.error) {
              case 0:
                this.$message.success("修改成功");
                self.$router.go(0);
                break;
              case 2:
              case 3:
                this.$message.error('还没有登录哦！')
                break;
              case 4:
                this.$message.error('原密码错误！')
                break;
              case 5:
                this.$message.error('新密码格式错误！')
                break;
              case 6:
                this.$message.error('两次密码输入不一致!')
                break;
            }
          })
          .catch(err=> {
            console.log(err);
          })
    }
  },

  created() {
    this.getUser({uid:this.$route.query.uid});
    this.getCart({uid:this.$route.query.uid});
    this.getHouses();
  },

  mounted() {
  },
}
</script>

<style lang="css" scoped src="../../assets/css/shortcut.css">

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
  background: url("../../assets/logo.png") no-repeat 0 0 ;
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

.my-cart .mc span, .my-rec .mc span {
  top: 0;
  height: 24px;
  font-size: 14px;
  font-weight: 600;
  line-height: 24px;
  margin: 0 auto;
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

.container .main-infoSet {
  float: left;
  width: 850px;
}

.setbox {
  margin: 20px 0;
  padding-bottom: 20px;
  background-color: #fff;
}

.setbox .mt {
  display: block;
  padding: 10px 10px 10px 40px;
}

.setbox .mt ul{
  display: flex;
  border-right: none;
}

.setbox .mt li{
  border-right: none;
  margin-right: 20px;
  font-weight: 700;
  font-size: 14px;
  color: #666666;
  opacity: .5;
}

.setbox .mt .selected {
  color: #00ae66;
  opacity: 100;
  border-bottom: 2px solid #00ae66;
}

.setbox .mc .user-set {
  float: left;
  width: 500px;
  padding: 10px;
}

.mc .user-set .form .item {
  display: block;
  margin-bottom: 20px;
  line-height: 30px;
}

.mc .user-set .form .item:after{
  content: ".";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}

.mc .user-set .form .item span.label{
  float: left;
  height: 18px;
  line-height: 18px;
  padding: 6px 0;
  width: 100px;
  text-align: right;
}

.mc .user-set .form .item .fl{
  margin-left: 40px;
  float: left;
}

.mc .user-set .form .item input.sexIn{
  vertical-align: -2px;
  margin-right: 3px;
}

.mr10 {
  margin-right: 10px;
}

.user-info {
  overflow: hidden;
  width: 280px;
  float: left;
  padding: 10px;
  margin-bottom: 10px;
  height: 102px;
  background: #f9f9f9;
  border: 1px solid #ccc;
  color: #666;
  line-height: 20px;
}

.user-info .u-ava {
  position: relative;
  z-index: 0;
  float: left;
  width: 104px;
  height: 104px;
  overflow: hidden;
  text-align: center;
  margin-right: 6px;
}

.user-info .u-ava img {
  width: 100px;
  height: 100px;
  border-radius: 50px;
}

.u-ext {
  float: left;
  text-align: left;
  padding-left: 5px;
  width: 160px;
}

.u-ext .einfo {
  height: 20px;
  margin-bottom: 5px;
}

</style>