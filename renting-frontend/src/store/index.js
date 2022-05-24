import Vue from 'vue'
import Vuex from 'vuex'
import user from './user';
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin : false
  },
  getters: {
  },
  mutations: {
    login(state) {
      state.isLogin = true;
    },
    logout(state) {
      state.isLogin = false;
    }
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
