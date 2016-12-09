<template>
  <div class="wrapper">
    <div class="ticket_inner_label main">
        选择价格<span v-if="islogin && (parseFloat(items[0].memberPrice) > 0)" class="limit">(会员价仅适用于乐视超级体育会员)</span>
    </div>
    <div class="ticket_inner_checkbox main clearfix">
        <div v-for="item in items" @click.stop="select($event)" id={{item.priceId}} :class="['checkbox', { 'selected': item.isSelect, 'forbidden': item.stock <= 0 || initPriceDashed}]">
          <p v-if="islogin && (parseFloat(item.memberPrice) > 0)">
            <del><span class="original_price">{{ item.title }}</span></del><br><span style="font-size:0.32rem;">会员价:</span><span class="discount_price">￥{{item.memberPrice}}</span>
          </p>
          <p v-else>
            <span class="original_price">{{ item.title }}</span>
          </p>
        </div>
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
  },
  props: ['items', 'islogin', 'initPriceDashed'], // 如果 prop 是一个对象或数组，是按引用传递。在子组件内修改它会影响父组件的状态，不管是使用哪种绑定类型。
  methods: {
    select: function (event) {
      // data stream, dispell dom
      var id = parseInt(event.currentTarget.id) // priceId
      for (var i = 0, len = this.items.length; i < len; i++) {
        if ((parseInt(this.items[i].priceId) === id) && (this.items[i].stock > 0) && (!this.initPriceDashed)) {
          this.$emit('price-select', id, i)
          for (var j = 0; j < len; j++) {
            this.items[j].isSelect = (parseInt(this.items[j].priceId) === id)
          }
          break
        }
      }
    },
    toLogin: function (event) {
      this.$emit('login')
      console.log('to login...')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .ticket_inner_label{height:1.2rem;font-size:0.4rem;color:#333333;line-height:1.2rem;margin-right:0.3rem;}
    .ticket_inner_label .limit{margin-left:0.3rem;color:#b6b6b6;}
    .ticket_inner_label .limit .toLogin{color:#ce0000;}
    /*checkbox common style*/
    .checkbox{float:left;width:2.85rem;height:1.2666rem;margin-bottom:0.4rem;margin-right:0.23rem;font-size:0.32rem;text-align:center;border-radius:0.14rem;-webkit-border-radius:0.14rem;-moz-border-radius:0.14rem;border:1px solid #797979;overflow:hidden;color:#333333;background:#fff;}            
    .checkbox.selected{border:1px solid #ffbc0c;color:#fff;background:#ffbc0c;}
    .checkbox.forbidden{border:1px dashed #e0e0e0;color:#e0e0e0;background:#fff;}
    .checkbox:nth-child(3n){margin-right:0;}
    .checkbox p{display:table-cell;vertical-align:middle;width:2.85rem;height:1.2666rem;line-height:0.4233rem;overflow:hidden;}
    .checkbox p .discount_price{color:#ea3f38;}
    .checkbox.forbidden p .discount_price {color:#e0e0e0;}
</style>
