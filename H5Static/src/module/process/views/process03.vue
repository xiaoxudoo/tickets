<template>
  <div class="wrapper">
    <my-header :header="parentHeader" :tap-show="parentTapshow"></my-header>
    <div class="center_body">
      <div class="ticket_unit ticket_order_created mt16">
        <div class="ticket_inner_body">
          <p>当前页面将在5秒后自动跳转至乐支付界面，请在30分钟内完成支付，否则该订单会因逾期未付被系统取消。如果支付遇到问题，可以在我的订单中继续支付。</p>
          <div class="goPay" @click="onTicketPayClicked">立即支付</div>
        </div>
      </div>
    </div>
    <div v-show="cancelIf">
      <div class="mask"></div>
      <div class="popup">
        <div class="poplogo"><img class="img" src="http://i1.letvimg.com/lc06_letvsports/201610/19/15/04/cancel.png" alt=""></div>
        <div class="popText">
          <p>亲爱的用户，关闭当前页面你就无法继续支付了，有可能会抢不到票呦！</p>
        </div>
        <div class="popButton clearfix">
          <div class="toset button active fl" @click="onPopCancelClicked">点错了</div>
          <div class="tocancel button fr" @click="onCloseClicked">关闭</div>
        </div>
      </div>
    </div>
    <!--toast-->
    <toast v-ref:toast :toast.sync="toast">
       <div slot = "content" >{{toast.content}}</div>
    </toast>
  </div>
</template>

<script>
import store from '../../../store'
import myHeader from '../../../components/header'
import toast from '../../../components/toast'
// import { http } from 'vue'
module.exports = {
  components: {
    myHeader,
    toast
  },
  data: function () {
    return {
      parentHeader: '支付提示',
      parentTapshow: false,
      cancelIf: false,
      canJumpIf: false,
      hasClicked: false,
      timer: null,
      toast: {content: '错误内容', timer: 1000} // 用于 toast
    }
  },
  route: {
    data: function (transition) {
      this.cancelIf = false
      this.canJumpIf = false // 恢复出厂设置
      this.hasClicked = false
      console.log(store.state.orderData)
      this.timer = setTimeout(this.toPay, 4900) // 5s 后自动跳转
    },
    deactivate: function (transition) {
      if (this.timer) {
        clearTimeout(this.timer)
        this.timer = null
      }
      if (this.canJumpIf) {
        this.cancelIf = false
        this.canJumpIf = false // 恢复出厂设置
        transition.next()
      } else {
        this.cancelIf = true
        transition.abort()
      }
    }
  },
  ready () {
  },
  methods: {
    toPay: function (event) {
      if (!this.hasClicked) {
        this.hasClicked = true // 已经发起请求
        store.MakeOrderAndPay().then((json) => {
          this.hasClicked = false // 允许再次发起请求
          if (json.ret === 0) {
            let href = window.location.href
            let tokens = window.CookieUtils.get('ticket_csrf')
            let userName = window.CookieUtils.get('sp_sso_uname')
            store.OrderPay({IsPc: false, orderId: json.info, productUrl: href, _token: tokens, userName: userName}).then((ret) => {
              if (ret.body.ret === 0) {
                document.getElementsByTagName('html')[0].innerHTML = ret.body.info
                document.forms[0].submit()
              } else if (ret.body.ret === 5) {
                window.openLogin()
              } else {
                this.toast = {content: '服务器内部错误', timer: 1000}
              }
            })
          } else {
            let field = JSON.parse(json.msg)
            let fields = ''
            if (typeof (field) === 'object') {
              for (var i in field) {
                fields = fields + field[i]
              }
            } else {
              fields = json.msg
            }
            this.toast = {content: fields, timer: 1000}
          }
        })
      }
    },
    onTicketPayClicked: function (event) {
      if (this.timer) {
        clearTimeout(this.timer)
        this.timer = null
      }
      this.toPay() // 立即跳转
    },
    onPopCancelClicked: function (event) {
      this.cancelIf = false
      if (this.timer) {
        clearTimeout(this.timer)
        this.timer = null
      }
      this.timer = setTimeout(this.toPay, 5000) // 5s 后自动跳转
    },
    onCloseClicked: function (event) {
      this.canJumpIf = true
      this.$route.router.go({name: 'process00'})
    }
  },
  props: {
  }
}
</script>

<style scoped>
  .center_body .ticket_unit{background:#fff;width:100%;height:100%;position:fixed;left:0;top:1.2rem;}
  .center_body .ticket_unit .ticket_inner_body{width:9.2rem;padding:0.4rem 0.4rem 0;}
  .center_body .ticket_unit .ticket_inner_body .goPay{margin-top:0.6rem;width:100%;font-size:0.48rem;line-height:0.9333rem;background:#ffbc0c;color:#fff;text-align:center;border-radius:0.1rem;}
  /* pop box*/
  .mask{background-color: #000;left: 0;top: 0;z-index: 1;width: 100%;height: 100%;position: fixed;filter: alpha(opacity=50);opacity: 0.5;}
  .popup{
    background-color: #fff;
    position: fixed;
    width: 8.4rem;
    height: 5rem;
    top: 50%;
    left: 50%;
    margin-left: -4.2rem;
    margin-top: -2.5rem;
    z-index: 2;
    border-radius: 5px;
    text-align:center;
  }
  .popup .poplogo{padding-top:0.53333rem;}
  .popup .poplogo img{display:inline-block;width:1.0666rem;height:1.0666rem;}
  .popup .popText{color:#333;font-size:0.3466rem;margin:0.4rem;}
  .popup .popText p{line-height:0.6rem;text-align:center;}
  .popup .popButton{padding: 0 0.5333rem;text-align:center;}
  .popup .popButton .button{width:3.4666rem;line-height:0.9333rem;border:1px solid #ffbc0c;background:#fff;color:#ffbc0c;border-radius:5px;}
  .popup .popButton .button.active{background:#ffbc0c;color:#fff;}
</style>
