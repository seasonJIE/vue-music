import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import fastclick from 'fastclick'  
import VueLazyload from 'vue-lazyload'

fastclick.attach(document.body);
Vue.config.productionTip = false

Vue.use(VueLazyload, {
  error: require('assets/logo.png'),
  loading: require('assets/logo.png')
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
