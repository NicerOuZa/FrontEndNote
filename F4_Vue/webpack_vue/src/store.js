import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    msg: '我是store中的数据',
    count: 0
  },
  mutations: {
    add(state){
      state.count++
    }
  },
  actions: {

  }
})
