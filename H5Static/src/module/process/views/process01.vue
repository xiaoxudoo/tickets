<template>
  <div class="wrapper">
    <my-header :header="parentHeader" :tap-show="parentTapshow"></my-header>
    <form action="">
      <div class="center_body mt16">
        <div class="ticket_unit">
          <div class="ticket_inner_label main">
            选择时间
          </div>
          <div class="ticket_inner_checkbox main clearfix">
            <div v-for="(index, item) in result" :class="['checkbox', {'selected': item.isSelect, 'forbidden': item.isForbidden}]">
              <p v-on:click="select" id={{index}}>{{ item.title }}</p>
            </div>
          </div>
          <div class="separator" style="border-bottom:1px solid #e0e0e0;"></div>
          <Price :items.sync='prices' :initPriceDashed='initPriceDashed' :islogin='logged' @login="onLoginClicked" @price-select="onPriceSelectClicked"></Price>
        </div>
        <div class="ticket_unit">
            <Selector :selector.sync="selector" :count.sync="ticket_stock_number" :limit="limit" :stocks="parentStocks" @add="onAddClicked"></Selector>
        </div>
        <div class="mb100"></div>
      </div>
      <my-footer :contact-if="parentContactShow" :footer="parentFooter" :active="parentFooterActive" @submit="goTicket"></my-footer>
    </form>
    <div v-show="addrIf">
      <div class="mask"></div>
      <div class="popup">
        <div class="popText">
          <p>亲爱的，你还没有收货地址，</p>
          <p>赶紧去创建一个吧！</p>
        </div>
        <div class="popButton clearfix">
          <div class="toset button active fl" @click="onPopSetClicked">去设置</div>
          <div class="tocancel button fr" @click="onPopCancelClicked">取消</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// ES6 语法
import store from '../../../store'
import myHeader from '../../../components/header'
import myFooter from '../../../components/footer'
import Price from '../../../components/Price'
import Selector from '../../../components/Selector'
import {RelativeUrl} from '../../../assets/conf.js'
export default {
  components: {
    myHeader,
    myFooter,
    Price,
    Selector
  },
  data () {
    return {
      parentHeader: '选择门票',
      parentTapshow: false,
      parentContactShow: true,
      parentFooter: '立即购票',
      parentFooterActive: true,
      result: [],
      prices: [],
      hasTicket: true,
      logged: false,
      initPriceDashed: false,  // 初始渲染页面时，若没有可售卖的票，默认显示第一个日期选项，此时其价格选项应该置灰，无论是否有库存
      limit: {title: null, num: null},
      parentStocks: 0,
      ticket_price_id: -1,
      ticket_stock_number: 0,  // code define -1 --> 0
      selector: {
        isAvailable_min: false,
        isAvailable_add: true,
        condition: false
      },
      addrIf: false
    }
  },
  route: {
    active: function (transition) {
    },
    data: function (transition) {
      // 获取商品信息和价格
      store.fetchPriceItem(transition.to.params.id).then((json) => {
        var rst = json.info // 获取商品相关的所有信息，设置第一个可以售卖的商品时间和价格为选中状态
        var firstIndex = -1 // 设置初始的商品日期id
        var secondIndex = -1 // 设置初始的商品价格id
        for (var i = rst.length - 1; i >= 0; i--) {
          rst[i].isSelect = false // 先假设商品日期都没有被选择
          rst[i].isForbidden = true // 先假设商品日期都禁止选择
          // 遍历此日期下的所有价格选项, 先假设商品日期都没有被选择
          for (var m = 0, jlen = rst[i].prices.length; m < jlen; m++) {
            rst[i].prices[m].isSelect = false
          }
          // 遍历此日期下的所有价格选项, 检查其库存
          for (var j = 0; j < jlen; j++) {
            // 如果存在价格选项对应的库存不小于0，那么设置其为被选择状态，并且对应的日期选项为可以选择，跳出循环
            if (parseInt(rst[i].prices[j].stock) > 0) {
              rst[i].prices[j].isSelect = true
              rst[i].isForbidden = false
              secondIndex = j
              break
            }
          }
          // 判断是否开始或结束
          if (parseInt(rst[i].startTime) > parseInt(rst[i].curTime)) {
            // 未开始
            rst[i].isForbidden = true
          } else if (parseInt(rst[i].curTime) > parseInt(rst[i].endTime)) {
            // 已结束
            rst[i].isForbidden = true
            rst.splice(i, 1) // 结束的票可以删除，不展示
          } else {
            // 售卖中, 不改变原来的设定
          }
          // End
        }
        // 设置第一个没有被禁止选择（禁止的原因包括库存为空以及是否在售卖周期内）的日期选项
        for (var k = 0, klen = rst.length; k < klen; k++) {
          if (!rst[k].isForbidden) {
            firstIndex = k
            rst[k].isSelect = true
            this.hasTicket = true
            break
          } else {
            // 如果一直没有跳出循环，这个值将为false，说明没有可以选择的商品，点击按钮不能跳转
            this.hasTicket = false
          }
        }
        // 如果没有可供选择的日期选项，this.hasTicket === false
        if (firstIndex === -1) {
          this.parentFooterActive = false
          // 给一个默认的日期选项用于展示价格选项，并且价格选项需要置灰
          firstIndex = 0
          this.initPriceDashed = true // 此时显示的价格选项都置灰
        }
        this.result = rst
        this.prices = rst[firstIndex].prices
        console.log(this.prices)
        this.limit = rst[firstIndex].limit || {title: null, num: 9999}
        this.ticket_price_id = rst[firstIndex].prices[secondIndex].priceId  // 设置默认价格选项
        this.parentStocks = rst[firstIndex].prices[secondIndex].stock || 0 // 设置默认价格选项的库存，secondIndex === =1 时为空
        this.ticket_stock_number = 1  // 设置购买数量
      })
    }
  },
  ready () {
    // 加载后判断是否登录, ready is deplacated in Vue2.0
    this.onLoginClicked()
  },
  methods: {
    select: function (event) {
      // data stream, dispell dom
      this.onLoginClicked()
      var id = parseInt(event.currentTarget.id)
      if (!this.result[id].isForbidden) {
        for (var i = 0, len = this.result.length; i < len; i++) {
          this.result[i].isSelect = (i === id)
        }
        this.prices = this.result[id].prices
        for (var j = 0, jlen = this.prices.length; j < jlen; j++) {
          if (this.prices[j].stock > 0) {
            this.ticket_price_id = this.prices[j].priceId  // 重新设置默认价格选项
            this.parentStocks = this.prices[j].stock
            break
          }
        }
        this.limit = this.result[id].limit || {title: null, num: 9999}
        this.initSelector()  // 设置选择器的初始状态
      }
    },
    onPriceSelectClicked: function (id, index) {
      this.onLoginClicked()
      this.ticket_price_id = id  // 重新设置默认价格选项
      this.parentStocks = this.prices[index].stock
      this.initSelector()  // 设置选择器的初始状态
    },
    onAddClicked: function (event) {
      this.onLoginClicked()
    },
    onLoginClicked: function (event) {
      if (!this.logged) {
        window.sportsLogin(this.checkLogin)
      }
    },
    onPopCancelClicked: function (event) {
      this.addrIf = false
    },
    onPopSetClicked: function (event) {
      window.location.href = RelativeUrl + '/personal.html#!/addrs?returnUrl=' + window.location.href
    },
    // '立即购买'按钮
    goTicket: function (event) {
      if (this.hasTicket) {
        // 判断登录
        if (!this.logged) {
          window.sportsLogin(this.checkLogin)
        } else {
          // 判断是否有地址, 默认为第一个
          if (window.CookieUtils.get('sp_sso_tk')) {
            // let letvUserToken = window.CookieUtils.get('sp_sso_tk')
            store.fetchAddrs().then((addrs) => {
              let addrArray = addrs || []
              let len = addrArray.length
              let addrObject = null
              // 判断是否有默认地址，没有则以最后一条记录为收货地址
              if (len > 0) {
                for (var i = 0; i < len; i++) {
                  if (parseInt(addrArray[i].uadefault) === 1) {
                    addrObject = addrArray[i]
                    break
                  }
                }
                if (!addrObject) {
                  addrObject = addrArray[len - 1]
                }
                this.$route.router.go({name: 'process02', query: {num: this.ticket_stock_number, priceId: this.ticket_price_id, ssoId: addrObject.ssoId}})
              } else {
                // 弹出提示框
                this.addrIf = true
              }
            })
          } else {
            console.log('no letvUserToken')
          }
        }
      }
    },
    checkLogin: function () {
      this.logged = true
      console.log('has login...')
    },
    initSelector: function () {
      this.ticket_stock_number = 1
      this.selector.isAvailable_min = false
      this.selector.isAvailable_add = true
      this.selector.condition = false
    }
  }
}
</script>

<style>
  /*ticket_unit common style*/
  .center_body .ticket_unit{background:#fff;width:100%;}
  .center_body .ticket_unit{border-bottom:1px solid #e0e0e0;}
  .ticket_inner_label{height:1.2rem;font-size:0.4rem;color:#333333;line-height:1.2rem;margin-right:0.3rem;}
  .ticket_inner_label .limit{margin-left:0.3rem;color:#b6b6b6;}
  /*checkbox common style*/
  .checkbox{float:left;width:2.85rem;height:1.2666rem;margin-bottom:0.4rem;margin-right:0.23rem;font-size:0.32rem;text-align:center;border-radius:0.14rem;-webkit-border-radius:0.14rem;-moz-border-radius:0.14rem;border:1px solid #797979;overflow:hidden;color:#333333;background:#fff;}
  .checkbox.selected{border:1px solid #ffbc0c;color:#fff;background:#ffbc0c;}
  .checkbox.forbidden{border:1px dashed #e0e0e0;color:#e0e0e0;background:#fff;}
  .checkbox:nth-child(3n){margin-right:0;}
  .checkbox p{display:table-cell;vertical-align:middle;width:2.85rem;height:1.2666rem;line-height:0.4233rem;overflow:hidden;}
  /* pop box*/
  .mask{background-color: #000;left: 0;top: 0;z-index: 1;width: 100%;height: 100%;position: fixed;filter: alpha(opacity=50);opacity: 0.5;}
  .popup{
    background-color: #fff;
    position: fixed;
    width: 8.4rem;
    height: 4.4rem;
    top: 50%;
    left: 50%;
    margin-left: -4.2rem;
    margin-top: -2.2rem;
    z-index: 2;
    border-radius: 5px;
    text-align:center;
  }
  .popup .popText{color:#333;font-size:0.3466rem;margin-top:1rem;margin-bottom:0.8rem;}
  .popup .popText p{line-height:0.6rem;}
  .popup .popButton{padding: 0 0.5333rem;text-align:center;}
  .popup .popButton .button{width:3.4666rem;line-height:0.9333rem;border:1px solid #ffbc0c;background:#fff;color:#ffbc0c;border-radius:5px;}
  .popup .popButton .button.active{background:#ffbc0c;color:#fff;}
</style>
