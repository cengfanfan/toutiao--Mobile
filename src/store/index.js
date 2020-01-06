import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 10
  },
  mutations: {
    add (state) {
      state.count++
    },
    cut (state) {
      state.count--
    }
  },
  actions: {
    asyncAdd (mutations) {
      setInterval(() => {
        mutations.commit('add')
      }, 1000)
    }
  },
  modules: {
  }
})
