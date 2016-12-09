<template>
  <div class="wrapper">
    <!-- Add your site or application content here -->
    <my-header :header="parentHeader" :tap-show="parentTapshow"></my-header>
    <div class="nav_tab_two">
        <ul class="clearfix">
          <li v-for="(index, tap) in taps" :class="[ tap.checked ? 'active' : '']" @click="getCoupon(index)"><p>{{ tap.info }}</p></li>
        </ul>
    </div>
    <component :is="currentView" keep-alive transition="fade" transition-mode="out-in"></component>
    <div class="mb100"></div>
    <div class="fix_footer">
        <a v-link="{ name: 'addcoupon' }" class="goAdd">添加优惠券</a>
    </div>
  </div>
</template>

<script>
import myHeader from '../../../components/header'
import couponsAvialable from './couponclass/coupon_avialable'
import couponsUsed from './couponclass/coupon_used'
import couponsExpire from './couponclass/coupon_expire'
module.exports = {
  components: {
    myHeader,
    couponsAvialable,
    couponsUsed,
    couponsExpire
  },
  data: function () {
    return {
      parentHeader: '我的优惠券',
      parentTapshow: false,
      currentView: 'couponsAvialable',
      taps: [
        {
          info: '可使用',
          checked: true
        },
        {
          info: '已使用',
          checked: false
        },
        {
          info: '已过期',
          checked: false
        }
      ]
    }
  },
  route: {
    data: function ({to}) {
      let type = to.query.type ? parseInt(to.query.type) : 0
      this.getCoupon(parseInt(type))
    }
  },
  ready () {
  },
  methods: {
    getCoupon: function (index) {
      switch (parseInt(index)) {
        case 0:
          this.currentView = 'couponsAvialable'
          break
        case 1:
          this.currentView = 'couponsUsed'
          break
        case 2:
          this.currentView = 'couponsExpire'
          break
        default:
          this.currentView = 'couponsAvialable'
      }

      for (var i = this.taps.length - 1; i >= 0; i--) {
        this.taps[i].checked = (i === index)
      }
    }
  },
  props: {
  }
}
</script>

<style scoped>
  .nav_tab_two{background:#fff;width:10rem;font-size:0.4266rem;height:1.2rem;line-height:1.2rem;text-align:center;border-top:1px solid #e0e0e0;}
  .nav_tab_two li{float:left;width:2rem;margin-left:1rem;height:1rem;}
  .nav_tab_two li.active{color:#ef3b31;border-bottom:2px solid #ef444b;}
  .fade-transition {
    transition: opacity .3s ease;
  }
  .fade-enter, .fade-leave {
    opacity: 0;
  }
  /*footer style*/
  .fix_footer{position:fixed;bottom:0;left:0;width:10rem;height:1.3333rem;text-align:center;}
  .fix_footer .goAdd{float:left;width:100%;height:100%;background:#ffbc0c;font-size:0.4rem;color:#fff;text-align:center;line-height:1.3333rem;}
</style>