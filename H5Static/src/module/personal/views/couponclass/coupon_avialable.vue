<template>
  <div class="center_body">
    <div v-if="parentCoupons.length > 0">
      <div class="tip blank"></div>
      <my-coupon v-for="coupon in parentCoupons" :coupon="coupon" :status="status" :color="color"></my-coupon>
    </div>
    <div v-else>
      <blank-coupon></blank-coupon>
    </div>
  </div>
</template>

<script>
// import { http } from 'vue'
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
      parentCoupons: [
      ],
      status: 'avialable',
      color: '#ef3b31'
    }
  },
  activate: function (done) {
    store.fetchCoupons(0).then((info) => {
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
  .tip.blank{height:0.4rem;width:100%;}
</style>