<template>
  <div class="zero mt16" v-else>
    <img src="http://i1.letvimg.com/lc07_letvsports/201610/24/12/31/blankOrder.png" alt="">
    <p>啊哦~暂无订单</p>
  </div>
</template>

<script>
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
  },
  props: {
  }
}
</script>


<style scoped>
  .zero{position:fixed;top:2.4rem;left:0;width:100%;bottom:0;background:#fff;text-align:center;padding-top:2.7333rem;font-size:0.3466rem;}
  .zero img{width:2.44rem;height:2.8rem;margin-bottom:0.2rem;}
</style>

