import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    condition: true,
  }, //数据
  getters: {

  }, //计算属性
  mutations: {
    show(state) {
      state.condition = true;
    },
    hide(state) {
      state.condition = false;
    }
  }, //方法
  actions: {}, //提交mutation
  modules: {}
})