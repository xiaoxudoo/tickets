
<template>
  <div class="wrapper">
    <my-header v-if="flag" :header="parentHeader" :tap-show="parentTapshow"></my-header>
    <div class="center_body">
      <p>同城快递费12.00元，发货后1-3天到达；其它地区 22元，发货后1-3天到达(国际快递除外)。</p>
    </div>
  </div>
</template>

<script>
import myHeader from '../../../components/header'
module.exports = {
  components: {
    myHeader
  },
  data: function () {
    return {
      parentHeader: '快递说明',
      parentTapshow: false,
      flag: null
    }
  },
  route: {
    data: function ({to}) {
      let flag = to.query.flag ? parseInt(to.query.flag) : null
      if (flag === 0) {
        this.flag = false
      } else {
        this.flag = true
      }
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
  .center_body{background:#fff;width:9.2rem;padding:0.6133rem 0.4rem 1rem;border-top:1px solid #e0e0e0;}
  .center_body p{color:#333;font-size:0.32rem;}
</style>
