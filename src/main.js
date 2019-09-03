// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
// 注册全局的公共组件样式
import Header from './components/Hearder/Hearder.vue'
import Star from './components/Star/Star.vue'
import 'mint-ui/lib/style.css'

// 引入表单验证的vee-validate
import '../validate.js'
import { Button } from 'mint-ui';
Vue.component(Button.name, Button);
Vue.config.productionTip = false
// 第一个是组件的名字，第二个是上面的那个组件
Vue.component('Header',Header)
Vue.component('Star',Star)
/* eslint-disable no-new */
console.log(Button)
new Vue({
  // el: '#app',
  components: { App },
  template: '<App/>',
  router,
  store
}).$mount('#app')
