import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: JSON.parse(localStorage.getItem('userInfo')) || {}
  },
  mutations: {
    setUserInfo (state, data) {
      localStorage.setItem('userInfo', JSON.stringify(data))
      state.userInfo = data
    },
    exit (state) {
      localStorage.removeItem('userInfo')
      state.userInfo = {}
    }
  },
  actions: {
  },
  modules: {
  }
})
