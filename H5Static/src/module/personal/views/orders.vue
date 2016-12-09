<template>
  <div class="wrapper">
    <!-- Add your site or application content here -->
    <my-header :header="parentHeader" :tap-show="parentTapshow"></my-header>
    <div class="nav_tab">
        <ul class="clearfix">
          <li v-for="(index, tap) in taps" :class="[ tap.checked ? 'active' : '']" @click="getOrder(index)"><p>{{ tap.info }}</p></li>
        </ul>
    </div>
    <component :is="currentView" transition="fade" transition-mode="out-in">
      <!-- 组件在 vm.currentview 变化时改变 -->
    </component>
  </div>
</template>

<script>
import myHeader from '../../../components/header'
import orderAll from './orderclass/order_all'
import orderPaying from './orderclass/order_paying'
import orderPayed from './orderclass/order_payed'
import orderExpress from './orderclass/order_express'
import orderOther from './orderclass/order_other'
module.exports = {
  components: {
    myHeader,
    orderAll,
    orderPaying,
    orderPayed,
    orderExpress,
    orderOther
  },
  data: function () {
    return {
      parentHeader: '我的订单',
      parentTapshow: false,
      currentView: 'orderAll',
      taps: [
        {
          info: '全部',
          checked: true
        },
        {
          info: '待支付',
          checked: false
        },
        {
          info: '已支付',
          checked: false
        },
        {
          info: '已发货',
          checked: false
        },
        {
          info: '其他',
          checked: false
        }
      ]
    }
  },
  route: {
    data: function ({to}) {
      let type = to.query.type ? parseInt(to.query.type) : 0
      this.getOrder(parseInt(type))
    }
  },
  ready () {
  },
  methods: {
    getOrder: function (index) {
      switch (parseInt(index)) {
        case 0:
          this.currentView = 'orderAll'
          break
        case 1:
          this.currentView = 'orderPaying'
          break
        case 2:
          this.currentView = 'orderPayed'
          break
        case 3:
          this.currentView = 'orderExpress'
          break
        case 4:
          this.currentView = 'orderOther'
          break
        default:
          this.currentView = 'orderAll'
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
  /*nav header common style*/
  .nav_header{ position:relative;width:100%;height:1.1733rem;background:#fff;text-align:center;font-size:0.48rem;color:#333333; }
  .nav_header p{line-height:1.1733rem;}
  .nav_tab{background:#fff;font-size:0.4266rem;line-height:1.2rem;text-align:center;border-top:1px solid #e0e0e0;}
  .nav_tab li{float:left;width:2rem;}
  .nav_tab li.active{color:#ef3b31;border-bottom:2px solid #ef444b;}
  .fade-transition {
    transition: opacity .3s ease;
  }
  .fade-enter, .fade-leave {
    opacity: 0;
  }
</style>
