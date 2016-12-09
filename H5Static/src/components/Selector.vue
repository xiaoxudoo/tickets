<template>
  <div class="wrapper">
    <div class="ticket_inner_label main">
        选择数量<span class="limit">{{limitTitle}}</span>
    </div>
    <div class="ticket_inner_selector main">
        <div class="selector_box clearfix">
            <div @click="minify" class="symbol less fl">
              <em :class="[selector.isAvailable_min ? '' : 'grey']"></em>
            </div>
            <div @click="addify" class="symbol more fr">
              <img :class="[selector.isAvailable_add ? '' : 'grey']" src="http://i1.letvimg.com/lc04_letvsports/201610/31/11/11/add.png" alt="">
            </div>
            <div class="number fl">{{ count }}</div>
        </div>
        <span v-show="selector.condition" transition="expand" class="stocks">库存不足</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  computed: {
    limitTitle: function () {
      if (this.limit.title !== null && this.limit.title !== '') {
        return '(' + this.limit.title + ')'
      }
    }
  },
  props: ['count', 'limit', 'stocks', 'selector'],
  ready () {
    if (this.count > this.stocks) {
      this.selector.isAvailable_add = false
      this.selector.isAvailable_min = false
      this.minify = null
      this.addify = null
    }
  },
  methods: {
    minify: function (event) {
      this.selector.isAvailable_add = true
      this.selector.condition = false
      if (this.count > 2) {
        this.count --
      } else if (this.count === 2) {
        this.count --
        this.selector.isAvailable_min = false
      } else {
        this.selector.isAvailable_min = false
      }
    },
    addify: function (event) {
      this.selector.isAvailable_min = true
      if (this.count < this.stocks) {
        this.selector.condition = false
        this.selector.isAvailable_add = true
        if (this.count < this.limit.num - 1) {
          this.count ++
        } else if (this.count === (this.limit.num - 1)) {
          this.count ++
          this.selector.isAvailable_add = false
        } else {
          this.selector.isAvailable_add = false
        }
      } else {
        this.selector.isAvailable_add = false
        this.selector.condition = true
        this.count = this.stocks // 设置上限数额为库存
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .ticket_inner_label{height:1.2rem;font-size:0.4rem;color:#333333;line-height:1.2rem;margin-right:0.3rem;}
  .ticket_inner_label .limit{margin-left:0.3rem;color:#b6b6b6;}
  /*common selector style*/
  .ticket_inner_selector .selector_box{display:inline-block;width:2.9rem;height:0.8rem;margin-bottom:0.4rem;font-size:0.32rem;text-align:center;border: 1px solid #e0e0e0;border-radius:0.2rem;-webkit-border-radius:0.2rem;-moz-border-radius:0.2rem;}
  .ticket_unit .ticket_inner_selector .selector_box .symbol{width:0.8rem;line-height:0.8rem;}
  .ticket_unit .ticket_inner_selector .selector_box .symbol.less em{display:inline-block;width:0.2666rem;height:1px;background:#797979;vertical-align: 4px;}
  .ticket_unit .ticket_inner_selector .selector_box .symbol.less em.grey{background:#e0e0e0;}
  .ticket_unit .ticket_inner_selector .selector_box .symbol.more img{display:inline-block;width:0.2666rem;height:0.2666rem;}
  .ticket_unit .ticket_inner_selector .selector_box .symbol.more img.grey{opacity:0.5;}
  .ticket_inner_selector .selector_box .number{width:1.2rem;line-height:0.8rem;border-left:1px solid #e0e0e0;border-right:1px solid #e0e0e0;}
  .ticket_inner_selector .stocks{font-size:0.32rem;line-height:0.8rem;color:#ce0000;margin-left:0.4rem;vertical-align:top;}
  .expand-transition{
    transition: all .3s ease;
  }
  /* .expand-enter 定义进入的开始状态 */
  /* .expand-leave 定义离开的结束状态 */
  .expand-enter, .ticket_inner_selector .expand-leave {
    line-height: 0;
    opacity: 0;
  }
</style>
