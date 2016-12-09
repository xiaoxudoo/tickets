<template>
  <div class="wrapper">
    <my-header :header="parentHeader" :tap-show="parentTapshow"></my-header>
    <validator name="validation1" >
      <form id="form1" class="center_body" novalidate>
        <div class="ticket_unit ticket_user_addr mt16">
            <div class="ticket_inner_body" @click="onSelectAddrClicked">
                <div class="person">
                    <p>收货人：<span class="username">{{ name }}</span>
                    <span style="margin-left:0.53333rem;" class="usertele">{{ tel | asterisk }}</span></p>
                </div>
                <p class="address">
                    <em></em>
                    收货地址：<span v-text="addr">北京北京市朝阳区东风六里屯18号晨光大院4号楼 乐视体育公司收货地址：北京北京市朝阳区东风六里屯18号晨光大院4号楼 乐视体育公司收货地址：北京北京市朝阳区东风六里屯18号晨光大院4号楼 乐视体育公司收货地址：北京北京市朝阳区东风六里屯18号晨光大院4号楼 乐视体育公司</span>
                </p>
            </div>
        </div>
        <div class="ticket_unit ticket_user_baseinfo mt16">
            <div class="ticket_inner_label">
                持票人信息<span class="extra">(请填写真实身份证号)</span>
            </div>
            <div class="ticket_inner_input main">
                <div class="intelligent-label fl">
                    <label for="username" class=""><em>*</em>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名:</label>
                </div>
                <div class="form-control fl">
                    <input type="text" id="username" v-model="username" v-validate:username="['required', 'name']" name="ticketHolderName" placeholder="请输入持票人姓名">
                </div>
                <div class="clearfix"></div>
                <div class="label_reg">
                    <label class="blank" v-if="$validation1.username.required && $validation1.username.touched">姓名不得为空</label>
                    <label class="error" v-if="!$validation1.username.required && $validation1.username.touched && $validation1.username.name">{{ nameClientError }}</label>
                </div>              
            </div>
            <div class="ticket_inner_input main">
                <div class="intelligent-label fl">
                    <label for="" class=""><em>*</em>身份证号:</label>
                </div>
                <div class="form-control fl">
                    <input type="text" v-model="identity" id="identity" v-validate:identity="{ required: true, pattern: '/^[1-9]{1}[0-9]{16}([0-9]|[xX])$/' }" name="ticketHolderIdentity" placeholder="请输入持票人身份证号">
                </div>
                <div class="clearfix"></div>
                <div class="label_reg">
                    <label class="blank" v-if="$validation1.identity.required && $validation1.identity.touched">身份证号不得为空</label>
                    <label class="error" v-if="!($validation1.identity.required) && $validation1.identity.touched && $validation1.identity.pattern">身份证号格式错误</label>
                </div>
            </div>            
        </div>
        <div class="ticket_unit ticket_commodity mt16">
            <div class="ticket_inner_label">
                商品及费用
                <a v-link="{ name: 'process01'}" class="link fr">返回修改</a>
            </div>
            <div class="ticket_inner_board main">
                <div class="board_image fl">
                    <img class="img" :src="ticket_img" alt="">
                </div>
                <div class="board_text fl">
                    <div class="board_text_tt">
                        <p>{{ ticket_title }}</p>
                    </div>
                    <div class="board_text_sku">
                        <p class="board_text_time">{{ ticket_time }}</p>
                        <p class="board_text_price">{{ ticket_price }}</p>
                        <p class="bboard_text_count">x<em>{{ ticket_count }}</em></p>
                    </div>
                </div>
                <div class="clearfix"></div>
            </div>
            <div class="ticket_inner_grid main" v-for="event in events">
                <em class="grid_box" :class="[ event.checked ? 'selected' : '']" @click.stop="setEvent($index,$event)"></em>
                <div data-accountId="{{ event.id }}">优惠活动<span>{{ $index + 1 }}</span>:<span class="" :title="event.title">{{ event.title | cutToShort}}</span>&nbsp;&nbsp;应付<span class="money">¥<em>{{ event.price }}</em></span></div>
            </div>
            <div class="ticket_inner_grid main" v-for="coupon in coupons">
                <em class="grid_box" :class="[ coupon.checked ? 'selected' : '']" @click.stop="setCoupon($index,$event)"></em>
                <div data-accountId="{{ coupon.id }}">优惠券<span>{{ $index + 1 }}</span>:<span class="" :title="coupon.title">{{ coupon.title | cutToShort}}</span>&nbsp;&nbsp;应付<span class="money">¥<em>{{ coupon.price }}</em></span></div>
            </div>
            <div class="ticket_inner_grid nonborder main">
                <a :href="contact" class="link fr">联系客服</a>
            </div>
        </div>
        <div class="ticket_unit ticket_express mt16">
            <div class="ticket_inner_label mb0">
                快递费<em class="details" v-link="{name: 'expressInfo'}"></em>
                <span class="money fr">¥<em>{{ expPrice }}</em></span>
            </div>
        </div>
        <div class="ticket_unit ticket_invoice mt16">
            <div class="ticket_inner_label mb0">
                <input type="hidden" name="isInvoice" :value="invoiceIf ? 1 : 0">
                <em class="grid_box" style="vertical-align:-0.04rem;" @click="setInvoice($event)"></em><span>发票</span>
                <div class="invoice_notice">
                  <p>增值税发票，文体演出结束后由我司开具，可选</p>
                  <p>择上门自取或快递到付。（特殊项目除外）<em class="details" style="margin-left:0;" v-link="{name: 'invoiceInfo'}"></em></p>
                </div>
            </div>
            <div class="ticket_hidden_place" v-if="invoiceIf">
              <div class="ticket_hidden_input">
                  <input type="text" name="invoiceTitle" v-model="invoiceTitle" v-validate:invoice="['required', 'invoice']" placeholder="请输入发票抬头：个人或者公司名称">
              </div>
              <div class="label_reg">
                  <label class="blank" v-if="$validation1.invoice.required && $validation1.invoice.touched">发票抬头不得为空</label>
                  <label class="error" v-if="!$validation1.invoice.required && $validation1.invoice.touched && $validation1.invoice.invoice">{{ invoiceClientError }}</label>
              </div>
            </div>
        </div>
        <div class="ticket_unit ticket_notice mt16">
            <div class="ticket_inner_grid2 nonborder main">
                <em class="grid_box selected" @click="setProtocol($event)"></em>
                <div>我已阅读并同意<span class="protocol" v-link="{name: 'noticeInfo'}">《乐视体育票务线上用户协议》</span></div>
                <p>鉴于文体演出票品特殊性,一旦票品售出,不支持无理由退换.</p>
            </div>
        </div>
        <div class="mb100"></div>
      </form>
      <div class="fix_footer">
        <div class="totalMoney">
            <p>应付：<em>￥{{ totalMoney }}</em></p>
        </div>
        <a @click.prevent.stop="onGoPayClicked" class="goOrder" :class="[ $validation1.invalid ? 'grey' : '' ]">前往支付</a>
      </div>
    </validator>
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
import {RelativeUrl, ContactNo, loadingImg, errorImg} from '../../../assets/conf'
module.exports = {
  components: {
    myHeader,
    toast
  },
  data: function () {
    return {
      parentHeader: '确认订单',
      parentTapshow: false,
      contact: 'tel:' + ContactNo,
      invoiceIf: false,
      protocolIf: true,
      nameClientError: null,
      invoiceClientError: null,
      toast: {content: '错误内容', timer: 1000}, // 用于 toast
      username: null,
      identity: null,
      invoiceTitle: null,
      // 根据登录信息请求地址
      name: null,
      tel: '12345678910',
      addr: null,
      ssoid: null,
      // 根据ticket_price_id请求票务信息
      ticket_price_id: null,
      ticket_img: loadingImg,
      ticket_title: null,
      ticket_time: null,
      ticket_price: null,
      ticket_count: null,
      // 根据登录信息请求优惠信息
      events: [],
      eventId: null,
      coupons: [],
      couponId: null,
      defaultExpPrice: null,
      expPrice: null, // 邮费由优惠信息决定
      defaultTotalMoney: null,
      totalMoney: ''
    }
  },
  computed: {
  },
  watch: {
  },
  route: {
    data: function ({ to }) {
      this.ticket_price_id = to.query.priceId
      this.ticket_count = to.query.num
      this.ssoid = to.query.ssoId
      this.eventId = null
      this.couponId = null
      console.log(this.eventId + this.couponId)
      store.fetchProdItemPrice(to.query.priceId, to.query.num, to.query.ssoId).then((json) => {
        if (json.ret === 0) {
          let info = json.info
          this.name = info.address.name
          this.tel = info.address.mobile
          this.addr = info.address.address
          this.ticket_img = info.product.pic_url || errorImg
          this.ticket_title = info.product.title
          this.ticket_time = info.item.title
          this.ticket_price = info.price.title
          info.events.forEach(function (item) {
            item.checked = false
          })
          this.events = info.events
          info.coupons.forEach(function (item) {
            item.checked = false
          })
          this.coupons = info.coupons
          this.defaultExpPrice = info.defaultExpPrice || 0
          this.expPrice = this.defaultExpPrice
          this.defaultTotalMoney = (parseFloat(info.price.price) * parseInt(this.ticket_count) * 100 + parseFloat(this.defaultExpPrice) * 100) / 100
          this.totalMoney = this.defaultTotalMoney
        } else {
          this.name = null
          this.tel = '12345678910'
          this.addr = null
          this.ticket_img = loadingImg
          this.ticket_title = null
          this.ticket_time = null
          this.ticket_price = null
          this.events = []
          this.coupons = []
          this.defaultExpPrice = null
          this.expPrice = null
          this.defaultTotalMoney = null
          this.totalMoney = ''
        }
      })
    }
  },
  ready () {
  },
  methods: {
    // 对不起，没有注释
    setSelect: function (event) {
      var cls = event.currentTarget.className
      var ind = cls.indexOf('selected')
      if (ind > -1) {
        event.currentTarget.className = cls.slice(0, ind - 1)
      } else {
        event.currentTarget.className += ' selected'
      }
    },
    setEvent: function (index, event) {
      if (this.events[index].checked) {
        this.events[index].checked = !this.events[index].checked
        this.eventId = null
        this.expPrice = this.defaultExpPrice
        this.totalMoney = this.defaultTotalMoney
      } else {
        for (var i = this.events.length - 1; i >= 0; i--) {
          this.events[i].checked = (i === index)
        }
        for (var j = this.coupons.length - 1; j >= 0; j--) {
          this.coupons[j].checked = false
        }
        this.couponId = null
        this.eventId = this.events[index].id
        if (this.events[index].expPrice !== null) { this.expPrice = this.events[index].expPrice }
        this.totalMoney = (parseFloat(this.events[index].price) * 100 + parseFloat(this.expPrice) * 100) / 100
      }
    },
    setCoupon: function (index, event) {
      if (this.coupons[index].checked) {
        this.coupons[index].checked = !this.coupons[index].checked
        this.couponId = null
        this.totalMoney = this.defaultTotalMoney
      } else {
        for (var i = this.coupons.length - 1; i >= 0; i--) {
          this.coupons[i].checked = (i === index)
        }
        for (var j = this.events.length - 1; j >= 0; j--) {
          this.events[j].checked = false
        }
        this.eventId = null
        this.couponId = this.coupons[index].id
        this.expPrice = this.defaultExpPrice
        this.totalMoney = (parseFloat(this.coupons[index].price) * 100 + parseFloat(this.expPrice) * 100) / 100
      }
    },
    setInvoice: function (event) {
      this.invoiceIf = !this.invoiceIf
      this.setSelect(event)
    },
    setProtocol: function (event) {
      this.protocolIf = !this.protocolIf
      this.setSelect(event)
    },
    onGoPayClicked: function (event) {
      store.state.orderData.priceId = this.ticket_price_id
      store.state.orderData.count = this.ticket_count
      store.state.orderData.addressId = this.ssoid
      store.state.orderData.eventId = this.eventId
      store.state.orderData.couponId = this.couponId
      store.state.orderData.amount = this.totalMoney
      store.state.orderData.receiptType = this.invoiceIf ? 2 : 0
      store.state.orderData.receiptTitle = this.invoiceTitle
      // Input Element
      store.state.orderData.name = this.username
      store.state.orderData.id = this.identity
      // Go to Pay Page
      if (this.$validation1.valid) {
        if (this.protocolIf) {
          store.fetchIDLimit(this.ticket_price_id, this.ticket_count, this.identity).then((json) => {
            if (json.ret === 0) {
              this.$route.router.go({name: 'process03'})
              console.log('limit validation pass')
            } else {
              this.idServerErrorIf = false
              let field = JSON.parse(json.msg)
              let fields = ''
              if (typeof (field) === 'object') {
                for (var i in field) {
                  fields = fields + field[i]
                }
              } else {
                fields = json.msg
              }
              this.toast = {content: fields, timer: 1600}
            }
          })
        } else {
          this.toast = {content: '请同意服务条款', timer: 1600}
        }
      } else {
        console.log(this.$validation1.username.valid)
        console.log(this.$validation1.identity.valid)
      }
    },
    onSelectAddrClicked: function (event) {
      window.location.href = RelativeUrl + '/personal.html#!/addrs?returnUrl=' + window.location.href
    }
  },
  validators: {
    name: function (val) {
      let _v = val.trim()
      if (/^[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(_v)) {
        if (_v.length < 2) {
          this._vm.nameClientError = '姓名不得少于2个字符'
          return false
        } else if (_v.length > 8) {
          this._vm.nameClientError = '姓名不得多于8个字符'
          return false
        } else {
          return true
        }
      } else {
        this._vm.nameClientError = '请输入正确的字符'
        return false
      }
    },
    invoice: function (val) {
      let _v = val.trim()
      if (_v === '') {
        return false
      }
      if (/^[\s\S]+$/.test(_v)) {
        if (_v.length < 2) {
          this._vm.invoiceClientError = '发票抬头不少于2个字符'
          return false
        } else if (_v.length > 20) {
          this._vm.invoiceClientError = '发票抬头不多于20个字符'
          return false
        } else {
          return true
        }
      } else {
        this._vm.invoiceClientError = '请输入正确的字符'
        return false
      }
    }
  },
  props: {
  }
}
</script>

<style scoped>
  .center_body .ticket_unit{background:#fff;width:100%;}
  .center_body .ticket_unit .ticket_inner_body{position:relative;padding:0.48rem 0.6666rem 0.4rem 1rem;background:url("http://i2.letvimg.com/lc05_letvsports/201609/22/15/02/addr1.png") no-repeat 0 top;background-size:10rem 0.08rem;}
  .center_body .ticket_unit .ticket_inner_body .person{font-size:0.3733rem;font-weight:600;color:#333;}
  .center_body .ticket_unit .ticket_inner_body .address{width:8.3333rem;height:1.2rem;overflow:hidden;font-size:0.3466rem;color:#333;line-height:0.6rem;margin-top:0.2rem;}            
  .center_body .ticket_unit .ticket_inner_body .address em{position:absolute;margin-top:0.04rem;left:0.4rem;width:0.32rem;height:0.4266rem;background:url("http://i1.letvimg.com/lc04_letvsports/201611/10/10/29/addr.png") no-repeat 0 0;background-size:100%;}
  .center_body .ticket_unit .ticket_inner_label{height:1.2rem;font-size:0.4rem;color:#333333;line-height:1.2rem;margin-right:0.3rem;}
  .center_body .ticket_unit .ticket_inner_label{padding: 0 0.4rem;margin-bottom:0.4rem;width:9.2rem;border-bottom:1px solid #e0e0e0;}
  .center_body .ticket_unit .ticket_inner_label .extra{font-size:0.3466rem;margin-left:0.26666rem;color:#b6b6b6;}
  .center_body .ticket_unit .ticket_inner_input{font-size:0.3466rem;}
  .center_body .ticket_unit .ticket_inner_input .intelligent-label{display:inline-block;width:2.1333rem;height:0.9rem;line-height:0.9rem;}
  .center_body .ticket_unit .ticket_inner_input .intelligent-label em{margin-right:0.2rem;vertical-align:middle;}
  .center_body .ticket_unit .ticket_inner_input .form-control{display:inline-block;width:7.0rem;height:0.9rem;border:1px solid #d0d0d0;border-radius:2px;vertical-align:top;}
  .center_body .ticket_unit .ticket_inner_input .form-control input{border:none;padding:0 0.2666rem;width:6.4666rem;height:100%;font-size:0.3466rem;}
  .center_body .ticket_unit .ticket_inner_input .label_reg{width:100%;height:0.8rem;}
  .center_body .ticket_unit .ticket_inner_input .label_reg > label{padding-top:0.1333rem;padding-left:2.48rem;font-size:0.32rem;color:#ce0000;}

  .center_body .ticket_unit .ticket_inner_board{border-bottom:1px solid #e0e0e0;height:3.0666rem;}
  .center_body .ticket_unit .ticket_inner_board .board_image{width:2.0rem;height:2.6666rem;}
  .center_body .ticket_unit .ticket_inner_board .board_text{position:relative;width:6.8rem;padding-left:0.4rem;}
  .center_body .ticket_unit .ticket_inner_board .board_text .board_text_tt{width:100%;height:1.2rem;display:table-cell;vertical-align:middle;}
  .center_body .ticket_inner_board .board_text_tt p{font-size:0.3466rem;height: 1.2rem;color:#333333;line-height:0.6rem;overflow:hidden;}
  .center_body .ticket_unit .ticket_inner_board .board_text .board_text_sku{font-size:0.32rem;line-height:0.48rem;}
  .center_body .ticket_unit .ticket_inner_grid{position:relative;height:1.2rem;font-size:0.32rem;line-height:1.2rem;color:#333;border-bottom:1px solid #e0e0e0;}
  .center_body .ticket_unit .ticket_inner_grid > div{display:inline-block;font-size:0.32rem;}
  /*.center_body .ticket_unit .ticket_inner_grid .promotTitle{display:inline-block;width:4.16rem;overflow:hidden;vertical-align:-0.48rem;}*/
  .center_body .ticket_unit .ticket_inner_grid2{position:relative;height:1.7333rem;font-size:0.32rem;color:#333;border-bottom:1px solid #e0e0e0;}
  .center_body .ticket_unit .ticket_inner_grid2 > div{display:inline-block;font-size:0.32rem;line-height:1.2rem;}
  .center_body .ticket_unit .ticket_inner_grid2 p {font-size:0.32rem; color:#999;margin-top:-0.1rem;}
  .center_body .ticket_unit .ticket_hidden_place .ticket_hidden_input{margin:0.4rem 0.4rem 0;width:9rem;height:0.9333rem;border:1px solid #d0d0d0;border-radius:2px;}
  .center_body .ticket_unit .ticket_hidden_place .ticket_hidden_input input{border:none;width:8.65rem;padding-left:0.35rem;line-height:0.9333rem;font-size:0.3466rem;}
  .center_body .ticket_unit .ticket_hidden_place .label_reg{width:100%;height:0.8rem;}
  .center_body .ticket_unit .ticket_hidden_place .label_reg > label{padding-top:0.1333rem;padding-left:0.8rem;font-size:0.32rem;color:#ce0000;}
  .center_body .ticket_unit em.grid_box{display:inline-block;width:0.32rem;height:0.32rem;border:1px solid #e0e0e0;vertical-align:-0.05rem;margin-right:0.2rem;}
  .center_body .ticket_unit em.grid_box.selected{background:url("http://i2.letvimg.com/lc04_letvsports/201611/10/10/35/right.png") no-repeat 0 0;background-size:100%;}
  .center_body .ticket_unit .link{display:inline-block;width:2rem;margin-top:0.3rem;font-size:0.3466rem;color:#ce0000;line-height:0.5333rem;text-align:center;border:1px solid #ce0000;border-radius:6px;}
  .center_body .ticket_unit .details{display:inline-block;width:0.3466rem;height:0.3466rem;margin-left:0.2666rem;background:url("http://i1.letvimg.com/lc02_letvsports/201609/22/16/03/addrs_03.png") no-repeat 0 top;background-size:100%;vertical-align:-0.0266rem;}
  .center_body .ticket_unit .protocol{color:#ea3f38;}
  .center_body .ticket_unit .invoice_notice{display:inline-block;height:1.2rem;width:7.0rem;margin-left:0.4rem;padding-top:0.14rem;color:#999999;vertical-align:top;}
  .center_body .ticket_unit .invoice_notice p{width:100%;line-height:0.46rem;font-size:0.32rem;color:#999999;}
  /*fix footer*/
  .fix_footer{position:fixed;bottom:0;left:0;width:100%;height:1.3333rem;border-top:1px solid #e0e0e0;text-align:center;}
  .fix_footer .totalMoney{float:left;width:5.8rem;height:100%;background:#fff;font-size:0.32rem;font-weight:600;line-height:1.3333rem;color:#333333;}
  .fix_footer .totalMoney em{font-size:0.48rem;font-weight:600;color:#ea3f38;vertical-align:top;}
  .fix_footer .goOrder{float:right;width:4.2rem;height:100%;background:#ffbc0c;font-size:0.4rem;color:#fff;text-align:center;line-height:1.3333rem;}
  .fix_footer .goOrder.grey{ background:#eee;}
  @media screen and (max-width: 640px) {
    .center_body .ticket_unit .invoice_notice{display:inline-block;height:1.2rem;width:7.3rem;margin-left:0.2rem;padding-top:0.14rem;color:#999999;vertical-align:top;}
    .center_body .ticket_unit .invoice_notice p{width:100%;line-height:0.46rem;font-size:0.32rem;color:#999999;letter-spacing:-1px}
  }
  @media screen and (max-width: 320px) {
    .center_body .ticket_unit .ticket_inner_grid2 p{font-size:0.32rem; letter-spacing:-1px;color:#999;margin-top:-0.1rem;}
  }
</style>
