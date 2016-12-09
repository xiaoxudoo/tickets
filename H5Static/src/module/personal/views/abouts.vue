<template>
  <div class="wrapper">
    <my-header v-if="flag" :header="parentHeader" :tap-show="parentTapshow"></my-header>
    <div class="center_body">
      <p>乐视体育票务是乐视体育旗下专业的体育票务销售平台，提供国内外各种体育赛事的票务销售、送达、客户解答等专业服务。</p>
      <p>2014年3月，乐视体育文化产业发展（北京）有限公司在乐视网体育频道的基础上正式成立，由单一的视频媒体网站的业务形态，发展为基于“IP运营+内容平台+智能化+互联网服务”的全产业链体育生态型公司。</p>
      <p>在内容平台方面，乐视体育目前拥有310多项，每年16000多场赛事版权，项目横跨足球、篮球、高尔夫、网球、赛车、搏击、自行车、跑步、电竞、帆船、极限等众多领域，是全球体育版权资源最为丰富的公司，其中73%是独家资源，被业界称为“版权帝国”。</p>
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
      parentHeader: '关于我们',
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
  .center_body p{text-indent:10px;color:#333;font-size:0.32rem;}
</style>
