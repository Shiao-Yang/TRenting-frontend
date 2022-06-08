<template>
  <div class="pay-windows">
    <div class="mark">
      <div class="alert">
        <!-- 内容 -->
        <div class="cont">
          <div class="mt">支付方式选择</div>
          <div class="mc">
            <div class="paylogo">
              <ul>
                <li>
                  <input class="aside" name="payStyle" type="radio" value="Alipay" v-model="payStyle"></input>
                  <img src="../assets/Alipay.jpg">
                </li>
                <li>
                  <input class="aside" name="payStyle" type="radio" value="Wechat" v-model="payStyle"></input>
                  <img src="../assets/WechatPay.jpg">
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="erwei">
          <img src="../assets/Ali_money.jpg" v-if="payStyle === 'Alipay'">
          <img src="../assets/Wechat_money.jpg" v-else-if="payStyle === 'Wechat'">
        </div>
        <!-- 按钮 -->
        <div class="btns">
          <el-button @click="sure" type="success">已支付</el-button>
          <el-button @click="cancel" type="danger">再想想</el-button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "PayWindows",
  data() {
    return {
      payStyle: '',
    }
  },

  methods : {
    sure() {
      this.$emit('ok');
    },
    cancel() {
      this.$emit('cancel');
    }
  },
}
</script>

<style scoped>
.mark {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.alert{
  background: #fff;
  width: 800px;
  border-radius: 40px;
  padding-bottom: 20px;
}

.cont {
  border-bottom: 2px solid #f0f3ef;
}

.cont .mt {
  margin-top: 10px;
  margin-bottom: 10px;
  color: black;
  font-size: 24px;
  font-weight: 700;
}

.cont .mc {
  width: 500px;
  margin: auto;
}

.mc ul {
  display: inline-block;
  position: relative;
  margin-bottom: 10px;
}

.aside {
  float: left;
  margin:auto 10px;
}

.paylogo {
  display: flex;
  margin-left: 60px;
}

ul {
  margin: 0 auto;
}

li {
  display: flex;
  border-right: none;
  margin-bottom: 20px;
}

button {
  margin-right: 20px;
}

.mc img {
  width: 240px;
  height: 100px;
  margin-right: 40px;
}

.btns {
  margin-top: 30px;
}

.erwei {
  margin: 20px auto;
}

.erwei img {
  width: 300px;
  height: 300px;
}
</style>