<template>
  <div class="app">
    <my-header :header="parentHeader" :tap-show="parentTapshow"></my-header>
    <div class="ticket_inner_body">
      <div class="callbackLogo"><img src="http://i3.letvimg.com/lc04_letvsports/201610/19/17/09/callback.png" alt=""></div>
      <p class="callbackText1">您已经完成支付！</p>
      <p class="callbackText2">快递将在订单确认后发出，届时会推送物流信息至收货手机号，请注意查收</p>
      <p class="callbackText3">有疑问，请邮件至lesportststickets@le.com</p>
      <div class="callbackButton">
        <div class="toAddr button active" @click="onLookOrderClicked">查看订单</div>
        <!--<div class="toIndex button fr" @click="onBackIndexClicked">返回首页</div>-->
      </div>
    </div>
  </div>
</template>

<script>
import myHeader from '../../components/header'
import {RelativeUrl} from '../../assets/conf'
module.exports = {
  components: {
    myHeader
  },
  data: function () {
    return {
      parentHeader: '支付成功',
      parentTapshow: false
    }
  },
  ready () {
  },
  methods: {
    onLookOrderClicked: function (event) {
      let params = window.getParams()
      console.log(params)
      if (params['merchant_no']) {
        window.location.href = RelativeUrl + '/personal.html#!/orderdetail/' + params['merchant_no']
      }
    }
    // onBackIndexClicked: function (event) {
    //   window.location.href = RelativeUrl + '/personal.html'
    // }
  },
  props: {
  }
}
</script>


<style scoped>
  .ticket_inner_body{background:#f8f8f8;width:100%;height:100%;position:fixed;left:0;top:1.1733rem;text-align:center;overflow:hidden;}
  .ticket_inner_body .callbackLogo{padding-top:2.4666rem;}
  .ticket_inner_body .callbackLogo img{display:inline-block;width:1.5466rem;height:1.5466rem;}
  .ticket_inner_body .callbackText1{font-size:0.4533rem;}
  .ticket_inner_body .callbackText2{font-size:0.3466rem;padding:0.3rem 1.4rem;}
  .ticket_inner_body .callbackText3{font-size:0.3466rem;color:#999999;margin:0 0.6rem;padding:0.4rem 0 1rem;border-top:1px dashed #d0d0d0;}
  .ticket_inner_body .callbackButton{padding: 0 1rem;text-align:center;}
  .ticket_inner_body .callbackButton .button{display:inline-block;width:3.7333rem;line-height:1.0666rem;border:1px solid #ffbc0c;background:#fff;color:#ffbc0c;border-radius:5px;}
  .ticket_inner_body .callbackButton .button.active{background:#ffbc0c;color:#fff;}
</style>
