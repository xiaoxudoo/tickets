<template>
  <div class="zero" v-else>
    <img src="http://i2.letvimg.com/lc04_letvsports/201610/24/14/37/blankAddr.jpg" alt="">
    <p>啊哦~暂无可用地址哦</p>
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
  .zero{position:fixed;top:1.1733rem;left:0;width:100%;bottom:0;background:#f6f6f6;text-align:center;padding-top:4.1333rem;font-size:0.3466rem;}
  .zero img{width:3.7333rem;height:2.6666rem;margin-bottom:0.4rem;}
</style>
