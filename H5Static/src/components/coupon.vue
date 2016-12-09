<template>
  <div data-status="" class="ticket_unit ticket_coupon">
    <div class="ticket_inner_coupon main" :class="[status]">
      <div class="coupon_value fl" v-bind:style="{ color: color}">
        <p v-if="parseInt(coupon.type) === 1"><span class="value_number" v-text="coupon.price"></span>折</p>
        <p v-else>¥<span class="value_number">{{ coupon.price }}</span></p>
      </div>
      <div class="coupon_notice fl">
        <p><em class="dot" v-bind:style="{ backgroundColor: color}"></em>有效期<em class="coupon_begin">{{ coupon.startTime }}</em> 至 <em class="coupon_end">{{ coupon.endTime }}</em></p>
        <p class="couponTitle"><em class="dot" v-bind:style="{ backgroundColor: color}"></em>{{ coupon.title }}</p>
      </div>
      <div class="clearfix"></div>
    </div>
  </div>
</template>

<script>
module.exports = {
  data: function () {
    return {
    }
  },
  computed: {
    couponCount: function () {
      return Number(this.coupon.price * 10).toFixed(1)
    }
  },
  methods: {
  },
  props: ['coupon', 'status', 'color']
}

</script>

<style scoped>
/*ticket_unit common style*/
  .ticket_unit .ticket_coupon{background:transparent!important;padding-top:0.4rem;}
  .ticket_unit .ticket_inner_coupon{width:9.2rem;height:2.4rem;margin-bottom:0.2666rem;}
  .ticket_unit .ticket_inner_coupon.avialable{background:url("http://i2.letvimg.com/lc07_letvsports/201609/23/16/05/coupon.png") no-repeat 0 0;background-size:100%;}  
  .ticket_unit .ticket_inner_coupon.used{background:url('http://i2.letvimg.com/lc02_letvsports/201610/12/13/54/used.png') no-repeat 0 0;background-size:100%;}
  .ticket_unit .ticket_inner_coupon.expire{background:url('http://i2.letvimg.com/lc07_letvsports/201610/12/12/11/expired.png') no-repeat 0 0;background-size:100%;}  
  .ticket_unit .ticket_inner_coupon .coupon_value{width:2.8rem;height:2.4rem;font-size:0.4266rem;line-height:2.4rem;text-align:center;}
  .ticket_unit .ticket_inner_coupon .coupon_value .value_number{font-size:0.9333rem;}
  .ticket_unit .ticket_inner_coupon .coupon_notice{position:relative;width:5.4rem;height:2.2rem;margin-left:0.9333rem;padding-top:0.2rem;font-size:0.32rem;color:#999999;line-height:0.52rem;}
  .ticket_unit .ticket_inner_coupon .coupon_notice .couponTitle{width:4rem;height:1.04rem;overflow:hidden;}
  .ticket_unit .ticket_inner_coupon .coupon_notice .dot{position:absolute;margin-top:0.2rem;left:-0.3rem;width:0.14rem;height:0.14rem;border-radius:50%;-webkit-border-radius:50%;}
</style>