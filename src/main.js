// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/**
 *入口的js文件，看src下文件，先从main.js看起
 *
 */
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import qs from 'qs'
Vue.config.productionTip = false
/**
 *vue整合的ui是ElementUI
 *axios:跨域组件
 *qs:自动转json,后端传来的字符串，自动转为json
 */
Vue.use(ElementUI)
Vue.prototype.$axios = axios
Vue.prototype.qs = qs
/* eslint-disable no-new */
/**
 * new Vue:整个大vue对象的构建
 * el绑定app组件
 * router:当前vue的域有路由域，本质就是页面跳转，只是名称叫路由，由路由组件搞定
 * components：注册子组件，注册app.vue这个组件，单文件组件
 * template：使用这个组件，使用这个标签<App/>来使用app.vue这个组件
 */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
