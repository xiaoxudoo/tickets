<style scoped>
  .ticket_inner_body{background:#f6f6f6;width:100%;height:100%;position:fixed;left:0;top:1.1733rem;text-align:center;overflow:hidden;}
  .ticket_inner_body .notFoundLogo{padding-top:4.1333rem;}
  .ticket_inner_body .notFoundLogo img{display:inline-block;width:9.6rem;}
  .ticket_inner_body p{font-size:0.3466rem;color:#9d9d9d;padding-top:0.8rem;}
</style>

<template>
  <div class="wrapper">
    <my-header :header="parentHeader" :tap-show="parentTapshow"></my-header>
    <div class="ticket_inner_body">
      <div class="notFoundLogo"><img src="http://i3.letvimg.com/lc07_letvsports/201611/08/17/17/404.png" alt=""></div>
      <!--<p>啊哦，页面出问题了，请过会再来！</p>-->
    </div>
  </div>
  
</template>
<script>
import myHeader from './header'
module.exports = {
  components: {
    myHeader
  },
  data: function () {
    return {
      parentHeader: '404',
      parentTapshow: false
    }
  }
}
</script>