<template>
  <div class="ticket_unit ticket_address mt16">
    <div class="ticket_inner_label clearfix" @click="onSetDefault">
        <div :class="['name_phone', 'clearfix', (showSelect && !canDelete) ? 'red' : '']" class="name_phone clearfix">
          <div class="fl">收货人：<span>{{ addr.name }}</span></div>
          <div class="fr phone">{{ addr.mobile }}</div>
        </div>
        <div class="address clearfix">
          <div class="fl">收货地址：</div>
          <div class="fr value">{{ addr.address }}</div>
        </div>
    </div>
    <div class="ticket_inner_footer">
      <div class="fl" @click="onSetDefault">
        <div class="selected" v-show="addr.uadefault">
          <img src="http://i2.letvimg.com/lc07_letvsports/201611/03/19/39/defalutAddressSecleted.png" alt="">默认地址
        </div>
        <div v-else>
          <div class="unselected"></div>默认地址
        </div>     
      </div>
      <div v-if="canDelete" class="fr delete" @click="onRemove"><img src="http://i0.letvimg.com/lc05_letvsports/201611/03/19/37/delete.png" alt="">删除</div>
      <div class="fr edit" @click="onEdit"><img src="http://i3.letvimg.com/lc04_letvsports/201611/03/19/34/edit.png" alt="">编辑</div>
    </div>
  </div>
</template>

<script>
module.exports = {
  components: {
  },
  data: function () {
    return {
    }
  },
  ready () {
  },
  methods: {
    onSetDefault: function (event) {
      this.$emit('set-default', this.addr.ssoId)
    },
    onRemove: function (event) {
      this.$emit('remove', this.addr.ssoId)
    },
    onEdit: function (event) {
      this.$emit('edit', this.addr.ssoId)
      window.bus.$emit('edit', this.addr)
    }
  },
  props: ['addr', 'canDelete', 'showSelect']
}
</script>


<style scoped>
  .ticket_unit{background:#fff;width:100%;}
  .ticket_unit .ticket_inner_label{font-size:0.3466rem;color:#333333;padding: 0 0.4rem;width:9.2rem;height:2.4rem;border-bottom:1px solid #e0e0e0;}
  .ticket_unit .ticket_inner_label .red{color:red;}
  .ticket_unit .ticket_inner_label .name_phone{line-height:1.2rem;}
  /*.ticket_unit .ticket_inner_label .name_phone .phone{margin-right:1.4rem;}*/
  .ticket_unit .ticket_inner_label .address .value{width:7.2rem;height:1.0rem;line-height:0.5rem;overflow:hidden;}
  .ticket_unit .ticket_inner_footer{padding:0 0.4rem;width:9.2rem;height:1.2rem;line-height:1.2rem;font-size:0.3466rem;}
  .ticket_unit .ticket_inner_footer img{display:inline-block;vertical-align:-0.0266rem;width:0.4rem;height:0.4rem;margin-right:0.24rem;}
  .ticket_unit .ticket_inner_footer .selected{color:#ea3f38;}
  .ticket_unit .ticket_inner_footer .unselected{display:inline-block;vertical-align:-0.0266rem;width:0.35rem;height:0.35rem;border:0.05rem solid #666666;border-radius:50%;margin-right:0.24rem;}
  .ticket_unit .ticket_inner_footer .edit{color:#999;}
  .ticket_unit .ticket_inner_footer .delete{color:#999;margin-left:0.5333rem;}
</style>
