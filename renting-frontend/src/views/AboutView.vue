<template>
  <div class="about">
    <div id = "f-shortcut" class = "f-shortcut" style="position: fixed;top:0;">
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
    <div id="inner-content">
      <h1>This is an about page!</h1>
    </div>
  </div>

</template>

<style scoped>
  @import "../assets/css/shortcut.css";
</style>

<style>
#inner-content {
  display: block;
  padding: 60px 0 0 0;
  text-align: center;
}


</style>