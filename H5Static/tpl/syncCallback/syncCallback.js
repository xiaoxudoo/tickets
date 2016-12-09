
import Vue from 'vue'
import fastclick from 'fastclick'
fastclick.attach(document.body)

// register filters globally
// import filters from '../../filters'
var filters = require('../../filters')

Object.keys(filters).forEach(function (k) {
  Vue.filter(k, filters[k])
})

import App from './syncCallback.vue'

var vm = new Vue({
  el: 'body',
  components: { App }
})

vm.$log()

