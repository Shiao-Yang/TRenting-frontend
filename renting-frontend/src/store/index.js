import Vue from 'vue'
import Vuex from 'vuex'
import user from './user';
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin : false,
    username: '',
    uid: 0,
    cartSum: 0,
    cartInfo: [
      // {
      //   hid: 0,
      //   short_price: 0,
      //   long_price: 0,
      //   location: '',
      //   area: 0,
      //   available: true,
      //   type: 1,
      //   floor_plan: '', //户型图
      //   details: '',
      // }
    ],
    order_all: [], //所有订单
    order_finished: [], //已完成订单
    order_unpaid: [],   //未支付订单
    order_uncommented: [], //未评价订单
    order_valid: [],
    //订单数量
    order_all_count: 0,
    order_finished_count: 0,
    order_unpaid_count: 0,
    order_uncommented_count: 0,
    order_valid_count: 0,
    userInfo: {
      img: 0,
      id: 1,
      username: 'Peter',
      password: '',
      tel: '',
      sex: 1,
      age: 0,
      name: '',
      email: '',
    },
    handOrderCartInfo: [ //提交订单时的house信息
      // {
      //   hid: 0,
      //   short_price: 0,
      //   long_price: 0,
      //   location: '',
      //   area: 0,
      //   available: true,
      //   type: 1,
      //   floor_plan: '', //户型图
      //   details: '',
      // }
    ],
  },
  getters: {
  },
  mutations: {
    login(state) {
      state.isLogin = true;
    },
    logout(state) {
      state.isLogin = false;
    },

  },
  actions: {
    clear({commit}) {
      commit("$_removeUser");
    }
  },
  modules: {
    user
  }
})
