import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Component from './components'
import './utils/register-vant'
import 'normalize.css'
import './styles/index.less'
import 'amfe-flexible'
import './utils/validation.js'

Vue.use(Component)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
