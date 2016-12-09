<template>
  <div class="wrapper">
    <!-- Add your site or application content here -->
    <my-header :header="parentHeader" :tap-show="parentTapshow"></my-header>
    <div class="center_body">
        <div class="ticket_unit ticket_header_image">
            <div class="ticket_inner_banner" :class="backgroundUrl">
                <p class="payStatus">{{ status }}</p>
                <p class="orderId">订单号:<em class="">{{ orderId }}</em></p>
            </div>
            <div v-if="order.tip">
              <div class="ticket_inner_tips">{{ order.tip }}</div>
            </div>
            <div v-if="order.expressNo">
              <div class="ticket_inner_express">
                <p>快递公司: {{ order.expressCompany }}</p>
                <p>快递单号: {{ order.expressNo }}</p>
              </div>
            </div>
        </div>
        <div class="ticket_unit ticket_user_addr mt16">
            <div class="ticket_inner_body">
                <div class="person">
                    <p>收货人：<span class="username">{{ order.recipient }}</span>
                    <span style="margin-left:0.53333rem;" class="usertele">{{ order.contact | asterisk }}</span></p>
                </div>
                <p class="address">
                    <em></em>
                    收货地址：{{ order.address }}
                </p>
            </div>
        </div>
        <div class="ticket_unit ticket_commodity mt16">
            <div class="ticket_inner_board nonborder main">
                <div class="board_image fl">
                    <img class="img" :src="order.picUrl" alt="">
                </div>
                <div class="board_text fl">
                    <div class="board_text_tt">
                        <p v-text="order.productTitle"></p>
                    </div>
                    <div class="board_text_sku">
                        <p class="board_text_time" v-text="order.priceItem"></p>
                        <p class="board_text_price" v-text="order.price"></p>
                        <p class="bboard_text_count">x<em>{{ order.count }}</em></p>
                    </div>
                </div>
                <div class="clearfix"></div>
            </div>
        </div>
        <div class="ticket_unit ticket_pay_type mt16">
            <div class="ticket_inner_grid_two main02">
                <div>支付方式：<em class="pay_type"></em>{{ order.payMethod }}</div>
            </div>
            <div class="ticket_inner_grid_two main02">
                <div>发票抬头：<em class="invoice_tt">{{ order.receiptHead }}</em></div>
            </div>
        </div>
        <div class="ticket_unit ticket_pay_info mt16">
            <div class="ticket_inner_grid_multiLine main02">
                <div class="clearfix"><span class="tt">商品金额：</span><span class="td">¥<em>{{ order.price * parseInt(order.count) | uniform }}</em></span></div>
                <div class="clearfix"><span class="tt">优惠金额：</span><span class="td">¥<em>{{ order.discount | uniform }}</em></span></div>
                <div class="clearfix"><span class="tt">快递金额：</span><span class="td">¥<em>{{ order.freight | uniform }}</em></span></div>
            </div>
            <div class="ticket_inner_grid_multiLine nonborder main02">
                <div class="clearfix"><span class="tt">实付总额：</span><span class="td" style="font-size:0.48rem;">¥<em>{{ order.amount | uniform }}</em></span></div>
                <div class="clearfix order_create"><span class="fr"><em class="timer_logo"></em>订单创建时间：<em class="create_time">{{ order.createTime }}</em></span></div>
            </div>
        </div>
        <div v-if="!goToPay" class="ticket_inner_footer main">
          <a :href="contactNo" class="link fr">联系客服</a>
          <a v-if="order.expressNo" @click.prevent="checkExpInfo" class="link fr" target="_blank">查看快递</a>
        </div>
    </div>
    <div v-if="goToPay">
      <div class="mb100"></div>
      <div class="fix_footer">
          <a :href="contactNo" class="contact">
              <img src="http://i2.letvimg.com/lc03_letvsports/201609/22/00/11/tel.png" alt="">
              <p>客服</p>
          </a>
          <a @click="goPayClicked" class="goPay">前往支付（剩余 <em class="timer">{{ timer | fromNow }}</em>）</a>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../../../store'
import myHeader from '../../../components/header'
import {ContactNo, expressWebsite, openExpress, loadingImg, errorImg} from '../../../assets/conf'
import moment from 'moment'  // 处理时间的库
module.exports = {
  components: {
    myHeader
  },
  data: function () {
    return {
      parentHeader: '订单详情',
      parentTapshow: false,
      contactNo: 'tel:' + ContactNo,
      expressWebsite: expressWebsite,
      orderId: '',
      backgroundUrl: '', // 背景图class
      goToPay: false,  // 去支付条件，
      timer: '',
      order: {
        status: null,
        recipient: '',
        contact: '',
        address: '',
        picUrl: loadingImg,
        productTitle: '',
        priceItem: '',
        price: '',
        count: null,
        payMethod: '',
        receiptHead: '',
        amount: '0',
        discount: '0',
        freight: '0',
        createTime: null,
        tip: '',
        expressNo: '',
        expressCompnay: ''
      }
    }
  },
  computed: {
    status: function () {
      if (parseInt(this.order.status) === 0) {
        if (parseInt(this.order.isDealed) === 0) {
          this.backgroundUrl = 'paying'
          this.goToPay = true
          // 未支付的时候设置定时器
          let self = this
          setInterval(function () {
            if (moment(self.order.createTime).add('30', 'm') >= moment()) {
              self.timer = moment(self.order.createTime).add('30', 'm').format('X') - moment().format('X')
            } else {
              self.order.isDealed = '1'
              self.goToPay = false
            }
          }, 1000)
          return '待支付'
        } else if (parseInt(this.order.isDealed) === 1) {
          this.backgroundUrl = 'cancel'
          return '已过期'
        }
      } else if (parseInt(this.order.status) === 1) {
        this.backgroundUrl = 'paying'
        return '支付中'
      } else if (parseInt(this.order.status) === 2) {
        if (this.order.expressNo) {
          this.backgroundUrl = 'express'
          return '已发货'
        } else {
          this.backgroundUrl = 'payed'
          return '已支付'
        }
      } else if (parseInt(this.order.status) === 3) {
        this.backgroundUrl = 'paying'
        return '交易失败'
      } else if (parseInt(this.order.status) === 4) {
        this.backgroundUrl = 'back'
        return '已取消'
      }
    }
  },
  route: {
    data: function ({ to }) {
      this.orderId = to.params.id
      this.backgroundUrl = ''
      store.GetOrderDetails(this.orderId).then((json) => {
        this.order = json.info
        this.order.picUrl = json.info.picUrl === '' ? errorImg : json.info.picUrl
      })
    }
  },
  ready () {
  },
  methods: {
    checkExpInfo: function () {
      if (openExpress) {
        this.$route.router.go({name: 'express', params: {id: this.order.expressNo}})
      } else {
        window.location.href = expressWebsite
      }
    },
    goPayClicked: function () {
      let href = window.location.href
      let tokens = window.CookieUtils.get('ticket_csrf')
      let userName = window.CookieUtils.get('sp_sso_uname')
      store.OrderPay({IsPc: false, orderId: this.orderId, productUrl: href, _token: tokens, userName: userName}).then((ret) => {
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
  props: {
  }
}
</script>


<style scoped>
  /*ticket_unit common style*/
  .center_body{}
  .center_body .ticket_unit{background:#fff;width:100%;}

  .center_body .ticket_unit .ticket_inner_banner{padding-left:0.95rem;height:3.0666rem;color:#fff;}
  .center_body .ticket_unit .ticket_inner_banner.paying {background:url("http://i2.letvimg.com/lc04_letvsports/201609/23/11/27/order_banner.jpg") no-repeat 0 0;background-size:100%;}
  .center_body .ticket_unit .ticket_inner_banner.cancel {background:url("http://i2.letvimg.com/lc03_letvsports/201610/11/16/33/order_cancel.jpg") no-repeat 0 0;background-size:100%;}
  .center_body .ticket_unit .ticket_inner_banner.express {background:url("http://i3.letvimg.com/lc03_letvsports/201610/11/16/33/order_express.jpg") no-repeat 0 0;background-size:100%;}
  .center_body .ticket_unit .ticket_inner_banner.payed {background:url("http://i0.letvimg.com/lc03_letvsports/201610/11/16/33/order_payed.jpg") no-repeat 0 0;background-size:100%;}
  .center_body .ticket_unit .ticket_inner_banner.back {background:url("http://i3.letvimg.com/lc03_letvsports/201610/11/16/32/order_back.jpg") no-repeat 0 0;background-size:100%;}
  .center_body .ticket_unit .ticket_inner_banner .payStatus{padding-top:0.8rem;font-size:0.48rem;}
  .center_body .ticket_unit .ticket_inner_banner .orderId{padding-top:0.2rem;font-size:0.3466rem;}
  .center_body .ticket_unit .ticket_inner_banner .orderId em{margin-left:0.2666rem;}
  .center_body .ticket_unit .ticket_inner_tips{width:9.2rem;height:1.7333rem;padding: 0 0.4rem;background:#fff;font-size:0.3466rem;color:#ef3b31;display:table-cell;vertical-align:middle; }
  .center_body .ticket_unit .ticket_inner_express{width:9.2rem;height:1.7333rem;padding: 0 0.4rem;background:#fff;font-size:0.3733rem;color:#333;display:table-cell;vertical-align:middle;}
  .center_body .ticket_unit .ticket_inner_body{position:relative;padding:0.48rem 0.6666rem 0.4rem 1rem;background:url("http://i2.letvimg.com/lc05_letvsports/201609/22/15/02/addr1.png") no-repeat 0 top;background-size:10rem 0.08rem;}
  .center_body .ticket_unit .ticket_inner_body .person{font-size:0.3733rem;font-weight:600;color:#333;}
  .center_body .ticket_unit .ticket_inner_body .address{width:8.3333rem;height:1.2rem;overflow:hidden;font-size:0.3466rem;color:#999;line-height:0.6rem;margin-top:0.2rem;}
  .center_body .ticket_unit .ticket_inner_body .address em{position:absolute;margin-top:0.04rem;left:0.4rem;width:0.32rem;height:0.4266rem;background:url("http://i1.letvimg.com/lc04_letvsports/201611/10/10/29/addr.png") no-repeat 0 0;background-size:100%;}

  .center_body .ticket_unit .ticket_inner_board{border-bottom:1px solid #e0e0e0;height:3.0666rem;}
  .center_body .ticket_unit .ticket_inner_board{height:2.6666rem;padding: 0.2666rem 0;} /*revision*/
  .center_body .ticket_unit .ticket_inner_board .board_image{width:2.0rem;height:2.6666rem;}
  .center_body .ticket_unit .ticket_inner_board .board_text{position:relative;width:6.8rem;padding-left:0.4rem;}
  .center_body .ticket_unit .ticket_inner_board .board_text .board_text_tt{width:100%;height:1.2rem;display:table-cell;vertical-align:middle;}
  .center_body .ticket_inner_board .board_text_tt p{font-size:0.3466rem;height: 1.2rem;color:#333333;line-height:0.6rem;overflow:hidden;}
  .center_body .ticket_unit .ticket_inner_board .board_text .board_text_sku{font-size:0.32rem;line-height:0.48rem;}

  .center_body .ticket_unit .ticket_inner_grid_two{position:relative;height:1.0666rem;font-size:0.3466rem;line-height:1.0666rem;color:#333;border-bottom:1px solid #e0e0e0;}
  .center_body .ticket_unit .ticket_inner_grid_two > div{display:inline-block;}

  .center_body .ticket_unit .ticket_inner_grid_multiLine{position:relative;padding-top:0.4rem;padding-bottom:0.4rem;font-size:0.3466rem;color:#333;border-bottom:1px solid #e0e0e0;}
  .center_body .ticket_unit .ticket_inner_grid_multiLine .tt{float:left;}
  .center_body .ticket_unit .ticket_inner_grid_multiLine .td{float:right;color:#ef3b31;}
  .center_body .ticket_unit .ticket_inner_grid_multiLine .order_create{position:relative;padding-top:0.2rem;color:#999;font-size:0.32rem;}
  .center_body .ticket_unit .ticket_inner_grid_multiLine .order_create .timer_logo{position:absolute;margin-left:-0.5rem;margin-top:0.04rem;display:inline-block;width:0.37333rem;height:0.37333rem;background:url("http://i3.letvimg.com/lc06_letvsports/201609/23/11/31/order.png") no-repeat 0 0;background-size:100%;}
  .ticket_inner_footer{padding:0.4rem 0;height:0.6666rem;}
  .ticket_inner_footer .link{display:inline-block;width:2rem;margin-left:0.4rem;font-size:0.3466rem;color:#999;line-height:0.6666rem;text-align:center;border:1px solid #999999;border-radius:2px;}
  .ticket_inner_footer .link.footer_goPay{background:#ffbc0c;color:#fff;border-color:#ffbc0c;}
  /*fix footer*/
  .fix_footer{position:fixed;bottom:0;left:0;width:100%;height:1.3333rem;border-top:1px solid #e0e0e0;text-align:center;}
  .fix_footer .contact{float:left;width:2rem;height:100%;background:#fff;font-size:0.32rem;color:#333333;}
  .fix_footer .contact img{display:inline-block;width:0.4133rem;height:0.3733rem;margin-top:0.2666rem;}
  .fix_footer .goPay{float:left;width:8rem;height:100%;background:#ffbc0c;font-size:0.4rem;color:#fff;text-align:center;line-height:1.3333rem;}
  .fix_footer .goPay .timer{color:#ef3b31;}
</style>
