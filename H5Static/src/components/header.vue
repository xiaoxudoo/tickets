<template>
  <div class="nav_header">
    <div class="backWrapper" @click="onHistoryBackClicked">
      <div class="historyback" ><img class="img" src="http://i0.letvimg.com/lc07_letvsports/201610/19/10/52/back.png" alt=""></div>
    </div>
    <p v-text="header">确认订单</p>
    <div v-if="tapShow">
      <div class="tap_dd" @click="setTaps">
        <em class="circle"></em>
        <em class="circle"></em>
        <em class="circle"></em>
      </div>
      <div class="tap_dt" v-if="tapif">
        <em class="arrow"></em>
        <a @click.prevent="goOrder" class="myorder">我的订单</a>
        <a @click.prevent="goTicket" class="">我的票务</a>
      </div>
    </div>
  </div>
</template>

<script>
// import {indexUrl} from '../assets/conf.js'
module.exports = {
  data: function () {
    return {
      tapif: false
    }
  },
  methods: {
    setTaps: function (event) {
      this.tapif = !this.tapif
    },
    onHistoryBackClicked: function (event) {
      window.history.back()
    },
    goOrder: function (event) {
      window.location.href = 'personal.html#!/orders'
    },
    goTicket: function (event) {
      window.location.href = 'personal.html'
    }
  },
  props: ['header', 'tapShow']
}

</script>

<style scoped>
  /*nav header common style*/
  .nav_header{ position:relative;width:100%;height:1.1733rem;background:#fff;text-align:center;font-size:0.48rem;color:#333333; }
  .nav_header .backWrapper{position:absolute;height:1.1733rem;width:0.8rem;}
  .nav_header .historyback{position:absolute;width:0.2666rem;height:0.4666rem;margin-left:0.4rem;margin-top:0.35rem;}
  .nav_header p{line-height:1.1733rem;}
  .nav_header .tap_dd{position:absolute;top:0.45rem;right:0.4rem;line-height:0;}
  .nav_header .tap_dd .circle{display:inline-block;background-color:#333333;border-radius:50%;-webkit-border-radius:50%;width:4px;height:4px;}
  .nav_header .tap_dt{ z-index:1;position:absolute;right:0.4rem;width:2.4rem;height:2.3466rem;padding:0 0.3333rem;background:#000;opacity:0.75;filter:alpha(opacity=75);border-radius:3px;} 
  .nav_header .tap_dt .arrow{position:absolute;top:-6px;right:0.2666rem;width: 0;height: 0;border-left: 6px solid transparent;border-right: 6px solid transparent;border-bottom: 6px solid #000;}
  .nav_header .tap_dt a{display:block;width:100%;font:0.4rem "MicroSoft Yahei";color:#fff;line-height:1.1733rem;overflow:hidden;}
  .nav_header .tap_dt a:active{color:#ffbc0c;}
  .nav_header .tap_dt a.myorder{border-bottom:1px solid #1a242d}
</style>