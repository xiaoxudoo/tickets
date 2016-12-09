
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import VueValidator from 'vue-validator'
import VueHead from 'vue-head'
import VueTouch from 'vue-touch'
import fastclick from 'fastclick'
fastclick.attach(document.body)

// register filters globally
var filters = require('../../filters')

Object.keys(filters).forEach(function (k) {
  Vue.filter(k, filters[k])
})

import App from './personal.vue'

window.bus = new Vue()  // A simple global event bus

Vue.use(VueTouch)
Vue.use(VueHead)
Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(VueValidator)

// set the API root so we can use relative url's in our store actions.
// Vue.http.options.root = CONFIG.URL

// routing
var router = new VueRouter(
  {
    hashbang: true,  // 为true的时候 example.com/#!/foo/bar ， false的时候 example.com/#/foo/bar
    // abstract: false,  // 地址栏不会有变化
    // 以下设置需要服务端设置
    history: false,   // 当使用 HTML5 history 模式时，服务器需要被正确配置 以防用户在直接访问链接时会遇到404页面。
    // saveScrollPosition: false,
    linkActiveClass: 'custom-active-class' // 全局设置连接匹配时的类名 参考http://vuejs.github.io/vue-router/en/link.html
  }
)

require('./routers')(router)

router.start(App, '#app')
