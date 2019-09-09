// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
// 注册全局的公共组件样式
import Header from './components/Hearder/Hearder.vue'
import Star from './components/Star/Star.vue'
import CartControl from './components/CartControl/CartControl.vue'
// import 'mint-ui/lib/style.css'
import './mock/mock.serve.js'
// 引入表单验证的vee-validate
import '../validate.js'
// import { Button } from 'mint-ui';
// Vue.component(Button.name, Button);
import ElementUI from 'element-ui';
Vue.use(ElementUI);
import Button from 'element-ui/lib/button';
Vue.use(Button);

Vue.config.productionTip = false
import 'element-ui/lib/theme-chalk/index.css';
import '../element-variables.scss'
// 第一个是组件的名字，第二个是上面的那个组件
Vue.component('Header',Header)
Vue.component('Star',Star)
Vue.component('CartControl',CartControl)
// import 'element-ui/lib/theme-chalk/index.css';
Vue.prototype.$bus=new Vue()

// 图片懒加载
import VueLazyload from 'vue-lazyload'
import loading from './common/images/cat1.jpg'
Vue.use(VueLazyload, {
  loading
})
// 时间格式过滤器
import './filter/index.js'
/* eslint-disable no-new */
// console.log(Button)
new Vue({
  // el: '#app',
  components: { App },
  template: '<App/>',
  router,
  store
}).$mount('#app')
