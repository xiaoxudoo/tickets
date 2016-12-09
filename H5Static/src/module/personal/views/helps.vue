<template>
  <div class="wrapper">
    <my-header v-if="flag" :header="parentHeader" :tap-show="parentTapshow"></my-header>
    <div class="center_body">
      <p class="question">一、Q：预订/预售票品说明</p>
      <p>A：预订/预售票品不支持在线选座，正式开票后乐视体育票务将根据用户付款先后顺序依次配票，同一个订单下的N张票品在没有特殊备注的情况下，会直接安排连座。</p>
      <p>预订/预售票品的票价、时间、场馆都有可能变更，如果有改动，我们会在最终出票前第一时间与您联系并确认订单，您可以更改订单，但不可以取消订单。</p>
      <p class="question">二、Q：订票方式说明</p>
      <p>A：暂时不支持在线选座功能</p>
      <p>1、	在线订购</p>
      <p>2、电话团购（大量购票）</p>
      <p>如果您有大量购票的需求，请注意浏览票品详情页面的电话团购购票说明。</p>
      <p>温馨提示：由于热门票品的电话团购人数较多，可能会导致您不能及时打入电话进行团购，请您稍等一下再拨打或是直接在线订购商品。对您造成的不便我们深感抱歉，感谢您对乐视体育票务的支持与理解！</p>
      <p class="question">三、Q：支付方式说明</p>
      <p>A：我们为您提供乐支付支付方式，支持支付宝、微信支付。</p>
      <p>目前各银行对于网上支付均有一定金额的限制，由于各银行政策不同，建议您在申请网上支付功能时向银行咨询相关事宜。</p>
      <p>请您下单后在30分钟内完成支付。超时后，订单会自动取消，需重新下单。</p>
      <p class="question">四、Q：配送方式说明</p>
      <p>A：进入到订单详情页面可追踪订单状态，请耐心等待票品配送或上门自取。</p>
      <p class="question">五、Q：发票说明</p>
      <p>A：</p><p>操作流程：</p>
      <p>1、在线订购订单</p>
      <p>请您将“发票抬头”填写至“发票信息”内，并确认发票信息。</p>
      <p>2、电话团购订单</p>
      <p>请您将“发票抬头”告知客服人员。</p>
      <p>如何获得发票？</p>
      <p>为落实财政部、国家税务总局《关于全面推开营业税改征增值税试点的通知》工作，我司将于2016年5月1日全面试点营业税改增值税。</p>
      <p>发票将在演出/体育赛事/其他活动结束后统一由我司按照订单票面实际金额开具发票，用户可选择上门自取或快递费到付方式快递发票。（特殊项目除外）</p>
      <p>发票注意事项：</p>
      <p>1、发票为增值税发票，此发票可以用作单位报销使用；</p>
      <p>2、发票内容为“票款”【如购买的是演唱会，也可能会是 ***演唱会票款】；</p>
      <p>3、不支持订单合并或拆分开具发票；</p>
      <p>4、配送费金额不包含在订单发票金额中；</p>
      <p>5、部分城市演出/体育赛事/其他活动门票即是发票，不另开发票；</p>
      <p>6、发票抬头不能为空，抬头不能开“北京”、“公司”之类的泛称；</p>
      <p>7、中国大陆以外地区无法提供发票。</p>
      <p class="question">六、Q：退换货说明</p>
      <p>A：</p>
      <p>1、不可抗力情况
      <p>因不可抗力因素导致演出取消或延期，乐视体育会主动与您确认退票事宜，不收取任何手续费。
      <p>办理退、换货的要求：
      <p>（1） 符合退、换货时间规定
      <p>（依据：主办方通知的因演出取消/延期安排的退票时间、转场时间段）；
      <p>（2） 需将票品完好无损退回；
      <p>（3） 如开发票，需将发票完好无损退回；
      <p>2、非不可抗力情况（关于无理由退换票品说明）
      <p>根据《网络交易管理办法》中关于：“其他根据商品性质并经消费者在购买时确认不宜退货的商品，不适用无理由退货。”的规定，鉴于文体演出票品特殊性，演出门票为联网售票，门票和座位都是唯一的，具有时效性、唯一性、数字化等特殊属性，一旦票品售出，不支持无理由退换，请您在购买时务必仔细核对您的订单信息并审慎下单。（因不可抗力因素导致演出取消或延期除外）。</p>
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
      parentHeader: '用户帮助',
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
  .center_body p{text-indent:25px;color:#333;font-size:0.32rem;}
  .center_body p.question{text-indent:0px;font-weight:bold;}
  .center_body p.answer{text-indent:25px;}
</style>
