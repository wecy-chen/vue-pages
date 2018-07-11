import Vue from 'vue'
import App from './App'
import notify from './plugin/notify.js';
import store from './store'

import '@/assets/bootstrap/css/bootstrap.min.css'
import '@/assets/bootstrap/js/bootstrap.min'

import router from './router'
//import $ from 'jquery'

// 导入轮播图插件
import VueAwesomeSwiper from 'vue-awesome-swiper';
// 使用轮播图插件
Vue.use(VueAwesomeSwiper);
import 'swiper/dist/css/swiper.css';


Vue.use(notify,{
    delay:5000
}); // 使用带有install的对象

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  store,
  router
})
