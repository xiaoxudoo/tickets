<template>
  <div class="fix_footer">
    <a v-if="contactIf" :href="contact" class="contact">
      <img src="http://i2.letvimg.com/lc03_letvsports/201609/22/00/11/tel.png" alt="">    
      <p>客服</p>
    </a>
    <a :class="[active ? 'active' : '', contactIf ? 'buttonRight' : 'button']" @click="onSubmit">{{ footer }}</a>
  </div>
</template>

<script>
import {ContactNo} from '../assets/conf'
module.exports = {
  components: {
  },
  data: function () {
    return {
      contact: 'tel:' + ContactNo
    }
  },
  ready () {
  },
  methods: {
    onSubmit: function (event) {
      this.$emit('submit')
    }
  },
  props: ['contactIf', 'footer', 'active']
}
</script>

<style scoped>
  /*fix footer*/
  .fix_footer{position:fixed;bottom:0;left:0;width:100%;height:1.3333rem;border-top:1px solid #e0e0e0;text-align:center;}
  .fix_footer .contact{float:left;width:2rem;height:100%;background:#fff;font-size:0.32rem;color:#333333;}
  .fix_footer .contact img{display:inline-block;width:0.4133rem;height:0.3733rem;margin-top:0.2666rem;}
  .fix_footer .buttonRight{float:right;width:8rem;height:100%;font-size:0.4rem;text-align:center;line-height:1.3333rem;}
  .fix_footer .buttonRight{background:#e0e0e0;color:#fff;}
  .fix_footer .buttonRight.active{background:#ffbc0c;color:#fff;}
  .fix_footer .button{float:left;width:10rem;height:100%;font-size:0.4rem;text-align:center;line-height:1.3333rem;}
  .fix_footer .button{background:#e0e0e0;color:#fff;}
  .fix_footer .button.active{background:#ffbc0c;color:#fff;}
</style>
