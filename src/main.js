// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 注册全局的公共组件样式
import Header from './components/Hearder/Hearder.vue'

Vue.config.productionTip = false
Vue.component('Header',Header)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router
})
