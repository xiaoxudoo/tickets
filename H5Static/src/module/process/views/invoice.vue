<template>
  <div class="wrapper">
    <my-header v-if="flag" :header="parentHeader" :tap-show="parentTapshow"></my-header>
    <div class="center_body">
      <p>发票说明</p>
      <p>操作流程：</p>
      <p>（1）网上订单</p>
      <p>请您将“发票抬头”填写至“发票信息”内，并确认发票信息。</p>
      <p>（2）电话订单</p>
      <p>请您将“发票抬头”告知客服人员。</p>

      <p>如何获得发票？</p>
      <p>为落实财政部、国家税务总局《关于全面推开营业税改征增值税试点的通知》工作，乐视体育将于2016年5月1日全面试点营业税改增值税。发票将在演出/体育赛事/其他活动结束后统一由乐视体育按照订单票面实际金额开具发票，用户可选择上门自取或快递费到付方式快递发票。（特殊项目除外）</p>
      <p>发票注意事项：</p>
      <p>1、发票为增值税发票，此发票可以用作单位报销使用；</p>
      <p>2、发票内容为“票款”【如购买的是演唱会，也可能会是 ***演唱会票款】；</p>
      <p>3、不支持订单合并或拆分开具发票；</p>
      <p>4、配送费金额不包含在订单发票金额中；</p>
      <p>5、部分城市演出/体育赛事/其他活动门票即是发票，不另开发票；</p>
      <p>6、发票抬头不能为空，抬头不能开“北京”、“公司”之类的泛称；</p>
      <p>7、订单生效后（演出开始前），可补开发票，演出一旦结束则无法为您提供补开发票服务；</p>
      <p>8、中国大陆以外地区无法提供发票。</p>
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
      parentHeader: '发票说明',
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
