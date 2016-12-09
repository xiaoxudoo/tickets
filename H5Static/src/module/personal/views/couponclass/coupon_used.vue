<template>
  <div class="center_body">
    <div v-if="parentCoupons.length > 0">
      <div class="tip main"><em></em>当前页面仅保存3个月内使用的优惠券</div>
   	  <my-coupon v-for="coupon in parentCoupons" :coupon="coupon" :status="status" :color="color"></my-coupon>
    </div>
    <div v-else>
      <blank-coupon></blank-coupon>
    </div>
  </div>
</template>

<script>
import store from '../../../../store'
import myCoupon from '../../../../components/coupon'
import blankCoupon from '../../../../components/blankCoupon'
module.exports = {
  components: {
    myCoupon,
    blankCoupon
  },
  data: function () {
    return {
      parentCoupons: [],
      status: 'used',
      color: '#999999'
    }
  },
  activate: function (done) {
    store.fetchCoupons(1).then((info) => {
      this.parentCoupons = info
      console.log(info)
      done()
    })
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
  .tip{font-size:0.3466rem;line-height:1.1333rem;width:100%;}
  .tip em{display:inline-block;vertical-align:middle;width:0.16rem;height:0.16rem;margin-right:0.16rem;background:#ef444b;border-radius:50%;-webkit-border-radius:50%;}
</style>