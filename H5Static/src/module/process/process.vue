<template>
  <div class="app">
    <router-view class="view" id="view" :transition="effect" transition-mode="out-in"></router-view>
  </div>
</template>
<script>
/*  Vue head manager
 *  https://github.com/ktquez/vue-head
 */
import {pagetitle, shortDesc, keys} from '../../assets/conf'
module.exports = {
  components: {
  },
  data: function () {
    return {
    }
  },
  head: {
    title: function () {
      return {
        inner: pagetitle,
        separator: ' '
      }
    },
    // Meta tags
    meta: [
      { name: 'keywords', content: keys, id: 'ekeys' },
      { name: 'description', content: shortDesc, id: 'desc' } // id to replace intead of create element
    ]
  },
  ready () {
  },
  methods: {
  },
  props: {
  }
}
</script>

<style>
<style>
/*
关于 v-cloak 参考： http://vuejs.org/api/#v-cloak

*/
[v-cloak] {
  display: none;
}

.view {
  
}

/*.fade-enter, .fade-leave {
  opacity: 0;
  transform: translate3d(0, -5px, 0);
}*/
.fade-enter{
  opacity: 1;
  transform: translate3d(100%, 0, 0);
}

.fade-leave {
  opacity: 0;
  -webkit-transform: translate3d(0, 0, 0);
          transform: translate3d(0, 0, 0);

}

.back-enter {
  opacity: 1;
  -webkit-transform: translate3d(-110%, 0, 0);
          transform: translate3d(-110%, 0, 0);

}
.back-leave{
  opacity: 0;
  /*transform: translate3d(100%, 0, 0);*/
  -webkit-transform: translate3d(0, 0, 0);
          transform: translate3d(0, 0, 0);
}

.v-link-active {
  color: red;
}

.custom-active-class {
}

</style>
