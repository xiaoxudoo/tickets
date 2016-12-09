
import Vue from 'vue'

import App from '../../components/not_found.vue'

var vm = new Vue({
  el: 'body',
  components: { App }
})

vm.$log()
