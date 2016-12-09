<template>
  <div class="center_body">
    <div v-if="parentOrders.length > 0">
      <my-order v-for="order in parentOrders" :order="order"></my-order>
      <div class="loading" v-show="loadif"><em></em>加载新数据</div>
      <div class="loading" v-if="finishif">已经到底了</div>
      <!--<div id="goTop" class="goTop"></div>-->
    </div>
    <blank-order v-else></blank-order>
  </div>
</template>

<script>
import store from '../../../../store'
import myOrder from '../../../../components/order'
import blankOrder from '../../../../components/blankOrder'
// import $ from 'zepto'
module.exports = {
  components: {
    myOrder,
    blankOrder
  },
  data: function () {
    return {
      loadif: false,
      finishif: false,
      requestflag: true,
      pageSize: 10,
      pageIndex: 1,
      type: 3,
      parentOrders: []
    }
  },
  loadListData: function (fn) {
  },
  activate: function (done) {
    this.parentOrders = []
    store.GetOrderList(this.type, this.pageIndex, this.pageSize).then((json) => {
      this.parentOrders = json.info || []
      this.pageIndex += 1
      done()
    })
  },
  ready () {
    // var a = document.documentElement.clientHeight / 2
    // $(window).scroll(function () {
    //   (window.innerWidth ? window.pageYOffset : document.documentElement.scrollTop) >= a ? $('#gotop').removeClass('hide') : $('.gotop').addClass('Offscreen')
    // })
    // $('#gotop').click(function () {
    //   $('html, body').animate({
    //     scrollTop: '0px'
    //   }, 400)
    //   return false
    // })
    document.body.onscroll = (e) => {
      let winHeight = document.documentElement.clientHeight
      let bodyHeight = Math.max(document.body[ 'scrollHeight' ], document.documentElement['scrollHeight'])
      let scrollTop = document.body.scrollTop
      if ((bodyHeight - winHeight - scrollTop < 1) && !this.finishif && this.requestflag) {
        this.loadif = true
        this.requestflag = false
        let orders = this.parentOrders
        store.GetOrderList(this.type, this.pageIndex, this.pageSize).then((json) => {
          json.info = json.info || []
          let len = json.info.length
          if (len > 0) {
            for (let i = 0; i < len; i++) {
              orders.push(json.info[i])
            }
            this.parentOrders = orders
            if (len >= parseInt(this.pageSize)) {
              this.pageIndex += 1
              this.loadif = false
              this.requestflag = true
            } else {
              this.loadif = false
              this.finishif = true
            }
          } else {
            this.loadif = false
            this.finishif = true
          }
        })
      }
    }
  },
  methods: {
    swipeup: function () {
      let winHeight = document.documentElement.clientHeight
      let bodyHeight = Math.max(document.body[ 'scrollHeight' ], document.documentElement['scrollHeight'])
      let scrollTop = document.body.scrollTop
      if ((scrollTop / (bodyHeight - winHeight) > 0.9) && !this.finishif) {
        this.loadif = true
        let orders = this.parentOrders
        store.GetOrderList(this.type, this.pageIndex, this.pageSize).then((json) => {
          json.info = json.info || []
          let len = json.info.length
          if (len > 0) {
            for (let i = 0; i < len; i++) {
              orders.push(json.info[i])
            }
            this.parentOrders = orders
            if (len >= parseInt(this.pageSize)) {
              this.loadif = false
            } else {
              this.loadif = false
              this.finishif = true
            }
          } else {
            this.loadif = false
            this.finishif = true
          }
          this.pageIndex += 1
        })
      } else {
        console.log(document.body.scrollHeight - document.body.scrollTop)
      }
    }
  },
  props: []
}
</script>

<style scoped>
  .center_body .loading{width:100%;height:1.2rem;text-align:center;font-size:0.32rem;color:#999;}
  .center_body .loading em{display:inline-block;width:0.4rem;height:0.4rem;background:url("http://i3.letvimg.com/lc06_letvsports/201609/21/23/34/tel_loading.png") no-repeat 0 0;background-size:100%;vertical-align:middle;margin-right:0.18rem;}
  .center_body .goTop{position:fixed;right:0.4rem;bottom:2rem;width:1.1733rem;height:1.1733rem;background:url("http://i1.letvimg.com/lc02_letvsports/201609/22/00/31/gotop.png") no-repeat 0 0;background-size:100%;}
</style>

