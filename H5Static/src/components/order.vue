<template>
  <div data-status="" class="ticket_unit ticket_commodity mt16">
    <div class="ticket_inner_label_two clearfix">
        <span class="label_text_time fl"></span>
        <span class="label_text_order fl">订单号：<em>{{ order.orderId }}</em></span>
        <span class="label_text_status fr">{{ orderStatus }}</span>
    </div>
    <div class="ticket_inner_board_two main">
        <div class="board_image fl">
            <img class="img" :src="picUrl" alt="">
        </div>
        <div class="board_text fl">
            <div class="board_text_tt">
                <p>{{ order.productTitle }}</p>
            </div>
            <div class="board_text_sku">
                <p class="board_text_time">{{ order.priceItem }}</p>
                <p class="board_text_price">{{ order.price }}</p>
                <p class="board_text_count">x{{ order.count }}</p>
            </div>
        </div>
        <div class="clearfix"></div>
    </div>
    <div class="ticket_inner_grid_two clearfix main">
        <div class="fr">共<span class="grid_shop_count">{{ order.count }}</span>件商品&nbsp;&nbsp;合计：&nbsp;<span class="grid_shop_money">¥<em class="grid_money_number">{{ order.amount }}</em></span>&nbsp;(含运费)</div>
    </div>
    <div class="ticket_inner_footer main">
        <a v-show="payingIf" @click="goPayClicked" class="link footer_goPay fr">前往支付</a>
        <a v-link="'orderdetail/' + order.orderId" class="link fr">查看详情</a>
    </div>
  </div>
</template>

<script>
import store from '../store'
import {loadingImg, errorImg} from '../assets/conf'
module.exports = {
  data: function () {
    return {
      payingIf: false,
      picUrl: loadingImg
    }
  },
  computed: {
    orderStatus: function () {
      if (parseInt(this.order.status) === 0) {
        if (parseInt(this.order.isDealed) === 0) {
          this.payingIf = true
          return '待支付'
        } else if (parseInt(this.order.isDealed) === 1) {
          return '已过期'
        }
      } else if (parseInt(this.order.status) === 1) {
        return '支付中'
      } else if (parseInt(this.order.status) === 2) {
        if (this.order.isExpress) {
          return '已发货'
        } else {
          return '已支付'
        }
      } else if (parseInt(this.order.status) === 3) {
        return '交易失败'
      } else if (parseInt(this.order.status) === 4) {
        return '已取消'
      }
    },
    picUrl: function () {
      return this.order.picUrl || errorImg
    }
  },
  methods: {
    goPayClicked: function () {
      let href = window.location.href
      let tokens = window.CookieUtils.get('ticket_csrf')
      let userName = window.CookieUtils.get('sp_sso_uname')
      store.OrderPay({IsPc: false, orderId: this.order.orderId, productUrl: href, _token: tokens, userName: userName}).then((ret) => {
        console.log('pay => ', ret)
        if (ret.body.ret === 0) {
          document.getElementsByTagName('html')[0].innerHTML = ret.body.info
          document.forms[0].submit()
        } else if (ret.body.ret === 5) {
          window.openLogin()
        } else {
          window.alert('服务器错误')
        }
      })
    }
  },
  props: ['order']
}

</script>

<style scoped>
  .ticket_unit{background:#fff;width:100%;}
  .ticket_unit .ticket_inner_label_two{font-size:0.3466rem;color:#333333;line-height:1.0666rem;padding: 0 0.4rem;width:9.2rem;margin-bottom:0.2666rem;border-bottom:1px solid #e0e0e0;}
  .ticket_unit .ticket_inner_label_two .label_text_time{margin-right:0.4rem;}
  .ticket_unit .ticket_inner_label_two .label_text_status{color:#ef3b31;}

  .ticket_unit .ticket_inner_board_two{border-bottom:1px solid #e0e0e0;height:2.4rem;}
  .ticket_unit .ticket_inner_board_two .board_image{width:1.6rem;height:2.1333rem;}
  .ticket_unit .ticket_inner_board_two .board_text{position:relative;width:7.2rem;padding-left:0.2666rem;}
  .ticket_unit .ticket_inner_board_two .board_text .board_text_tt{width:100%;height:0.8rem;display:table-cell;vertical-align:middle;}
  .ticket_inner_board_two .board_text_tt p{font-size:0.3466rem;height: 0.8rem;color:#333333;line-height:0.4rem;overflow:hidden;}
  .ticket_unit .ticket_inner_board_two .board_text .board_text_sku{font-size:0.29rem;line-height:0.45rem;color:#999;}

  .ticket_unit .ticket_inner_grid_two{position:relative;font-size:0.3466rem;color:#333333;line-height:1.0666rem;border-bottom:1px solid #e0e0e0;}
  .ticket_unit .ticket_inner_grid_two .grid_shop_money{color:#ef444b;font-size:0.4666rem;vertical-align:-0.0266rem;}
  .ticket_unit .ticket_inner_footer{padding:0.4rem 0;height:0.6666rem;}
  .ticket_unit .ticket_inner_footer .link{display:inline-block;width:2rem;margin-left:0.4rem;font-size:0.3466rem;color:#999;line-height:0.6666rem;text-align:center;border:1px solid #999999;border-radius:0.16rem;}
  .ticket_unit .ticket_inner_footer .link.footer_goPay{background:#ffbc0c;color:#fff;border-color:#ffbc0c;}
</style>
