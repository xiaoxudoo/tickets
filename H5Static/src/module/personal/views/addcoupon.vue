<template>
  <div class="wrapper">
    <!-- Add your site or application content here -->
    <my-header :header="parentHeader" :tap-show="parentTapshow"></my-header>
    <validator name="validation1" >
      <form id="form1" class="center_body" novalidate>
        <div class="ticket_coupon_code mt16">
          <p>优惠券必须绑定后才能使用；一旦绑定，该优惠券仅能通过该账号下单使用。</p>
          <div class="ticket_inner_input">
              <div class="intelligent-label fl">
                  <label for="code" class="">优&nbsp;&nbsp;惠&nbsp;&nbsp;码：</label>
              </div>
              <div class="form-control fl">
                  <input type="text" v-model="code" id="code" v-validate:code="['required']" name="key" placeholder="请输入优惠码">
              </div>
              <div class="clearfix"></div>
              <div class="label_reg">
                  <label class="blank"  v-if="$validation1.code.required && $validation1.code.touched">优惠码不得为空</label>
              </div>              
          </div>
        </div>
        <div class="fix_footer">
          <a class="add" :class="[ $validation1.invalid ? 'grey' : '' ]" @click.prevent="bindCoupon">添加</a>
        </div>
      </form>
    </validator>
    <!--toast-->
    <toast v-ref:toast :toast.sync="toast">
       <div slot = "content" >{{toast.content}}</div>
    </toast>
  </div>
</template>

<script>
// import { http } from 'vue'
import store from '../../../store'
import myHeader from '../../../components/header'
import toast from '../../../components/toast'
module.exports = {
  components: {
    myHeader,
    toast
  },
  data: function () {
    return {
      parentHeader: '添加优惠券',
      parentTapshow: false,
      code: '',
      toast: {content: '错误内容', timer: 2000} // 用于 toast
    }
  },
  ready () {
  },
  methods: {
    bindCoupon: function (event) {
      console.log(this.code)
      store.MakeCouponSave(this.code).then((json) => {
        if (json.ret === 0) {
          this.$route.router.go({name: 'coupons', query: {type: 0}})
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
          this.toast = {content: fields, timer: 2000}
        }
      })
    }
  },
  props: {
  }
}
</script>

<style scoped>
  .ticket_coupon_code{background:#fff;height:3.4rem;font-size:0.3466rem;padding: 0 0.4rem;}
  .ticket_coupon_code p{height:1.6rem;display:table-cell;vertical-align:middle;}
  .ticket_coupon_code .ticket_inner_input{font-size:0.3466rem;}
  .ticket_coupon_code .ticket_inner_input .intelligent-label{display:inline-block;width:2rem;height:0.9333rem;line-height:0.9333rem;}
  .ticket_coupon_code .ticket_inner_input .form-control{display:inline-block;width:7rem;height:0.9333rem;border:1px solid #d0d0d0;border-radius:2px;vertical-align:top;}
  .ticket_coupon_code .ticket_inner_input .form-control input{border:none;padding:0 0.2666rem;width:6.4666rem;height:100%;font-size:0.3466rem;}
  .ticket_coupon_code .ticket_inner_input .label_reg{width:100%;height:0.8rem;}
  .ticket_coupon_code .ticket_inner_input .label_reg > label{padding-left:2.3rem;font-size:0.3466rem;line-height:0.8rem;color:#ea3f38;}
  /*footer style*/
  .fix_footer{position:fixed;bottom:0;left:0;width:100%;height:1.3333rem;border-top:1px solid #e0e0e0;text-align:center;}
  .fix_footer .add{float:left;width:100%;height:100%;background:#ffbc0c;font-size:0.4rem;color:#fff;text-align:center;line-height:1.3333rem;}
  .fix_footer .add.grey{ background:#eee; }
</style>
