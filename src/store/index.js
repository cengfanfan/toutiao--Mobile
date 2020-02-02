import Vue from 'vue'
import Vuex from 'vuex'
import { getToken, setToken, removeToken } from '@/utils/storage'

Vue.use(Vuex)

const USER_KEY = 'user'
export default new Vuex.Store({
  state: {
    user: getToken(USER_KEY)
  },
  mutations: {
    getUserToken (state, data) {
      state.user = data
      setToken(USER_KEY, state.user)
    },
    removeUserToken (state, data) {
      state.uesr = data
      removeToken(USER_KEY, state.uesr)
    }
  },
  actions: {

  },
  modules: {
  }
})
