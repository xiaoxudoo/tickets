<template>
  <div class="center_body">
    <div v-show="parentOrders.length > 0" v-drapload drapload-key="allscroll" drapload-down="down_all()">
      <!--滚动元素最好只有一个孩子节点-->
      <div>
        <my-order v-for="order in parentOrders" :order="order"></my-order>
      </div>
    </div>
    <blank-order v-else></blank-order>
  </div>
</template>

<script>
import store from '../../../../store'
import myOrder from '../../../../components/order'
import blankOrder from '../../../../components/blankOrder'
module.exports = {
  components: {
    myOrder,
    blankOrder
  },
  data: function () {
    return {
      pageSize: 10,
      pageIndex: 1,
      type: 0,
      parentOrders: []
    }
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
    console.log(this.allscroll)
  },
  methods: {
    down_all: function () {
      console.log('debug')
      store.GetOrderList(this.type, this.pageIndex, this.pageSize).then((json) => {
        json.info = json.info || []
        let len = json.info.length
        console.log(this.allscroll)
        if (len > 0) {
          this.parentOrders = this.parentOrders.concat(json.info)
          if (len >= parseInt(this.pageSize)) {
            this.pageIndex += 1
            this.allscroll.resetload()
          } else {
            this.allscroll.noData()
          }
        } else {
          this.allscroll.noData()
        }
      })
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
