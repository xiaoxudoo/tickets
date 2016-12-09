<template>
  <div class="wrapper fullscreen">
    <div class="nav_header">
      <div class="historyback" @click="onHistoryBackClicked"><img class="img" src="http://i0.letvimg.com/lc07_letvsports/201610/19/10/52/back.png" alt=""></div>
      <p>选择地区</p>
    </div>
    <div class="ticket_inner_body">
      <div class="grid" v-for="ware in wares" @click="fetchWareClick(ware)">{{ware.placeName}}</div>
    </div>
  </div>
</template>

<script>
// import store from '../store'
module.exports = {
  components: {
  },
  data: function () {
    return {
    }
  },
  ready () {
  },
  methods: {
    fetchWareClick: function (ware) {
      this.$emit('ware', ware)
    },
    onHistoryBackClicked: function (event) {
      this.$emit('back')
    }
  },
  props: ['wares']
}
</script>

<style scoped>
  .fullscreen{position:absolute;top:0;left:0;z-index:10;min-height:19rem;background:#fff;}
  .nav_header{ position:relative;width:100%;height:1.1733rem;background:#fff;text-align:center;font-size:0.48rem;color:#333333; }
  .nav_header .historyback{position:absolute;width:0.2666rem;height:0.4666rem;margin-left:0.4rem;margin-top:0.35rem;}
  .nav_header p{line-height:1.1733rem;}
  .ticket_inner_body{background:#fff;border-top:1px solid #e0e0e0;}
  .grid{width:9.2rem;padding:0 0.4rem;height:1.2rem;font-size:0.3466rem;line-height:1.2rem;border-bottom:1px solid #e0e0e0;}
  .grid:hover{background:#f6f6f6;}
</style>

