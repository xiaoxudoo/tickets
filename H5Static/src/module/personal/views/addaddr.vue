<template>
  <div>
  	<my-header :header="parentHeader" :tap-show="parentTapshow"></my-header>
    <validator name="validation1" >
      <form id="form1" class="center_body" novalidate>
        <div class="ticket_unit ticket_add_address">
          <div class="ticket_inner_input input_name">
            <div class="intelligent-label">
              <label for="name" class=""><em>*</em>收件人名称：</label>
            </div>
            <div class="form-control" :class="[$validation1.name.invalid && $validation1.name.touched ? 'error' : '']">
              <input type="text" v-model="addr.name" id="name" v-validate:name="['required', 'name']" name="name" placeholder="请输入收件人姓名">
            </div>
            <div class="label_reg">
              <label class="blank" v-if="$validation1.name.required && $validation1.name.touched">姓名不得为空</label>
              <label class="error" v-if="!$validation1.name.required && $validation1.name.name">{{ nameClientError }}</label>
            </div>              
          </div>
          <div class="ticket_inner_input input_placeId">
            <div class="intelligent-label">
              <label for="placeId" class=""><em>*</em>所在地区：</label>
            </div>
            <div class="form-control" :class="[$validation1.placeId.invalid && $validation1.placeId.touched ? 'error' : '']" @click="onCityClicked({})">
              <input type="text" v-model="placeText" id="placeId" v-validate:place-id="['required']" name="placeId" readonly="readonly" placeholder="请选择">
              <em class="angledown"></em>
            </div>
            <div class="label_reg">
              <label class="blank" v-if="$validation1.placeId.required && $validation1.placeId.touched">所在地区不得为空</label>
            </div>              
          </div>
          <div class="ticket_inner_input input_address">
            <div class="intelligent-label">
              <label for="address" class=""><em>*</em>详细地址：</label>
            </div>
            <div class="form-control" :class="[$validation1.address.invalid && $validation1.address.touched ? 'error' : '']">
              <textarea type="text" v-model="addr.address" id="address" v-validate:address="['required', 'address']"  name="address" placeholder="请输入详细地址"></textarea>
            </div>
            <div class="label_reg">
              <label class="blank" v-if="$validation1.address.required && $validation1.address.touched">详细地址不得为空</label>
              <label class="error" v-if="!$validation1.address.required && $validation1.address.address">{{ addressClientError }}</label>
            </div>              
          </div>
          <div class="ticket_inner_input input_mobile">
            <div class="intelligent-label">
              <label for="mobile" class=""><em>*</em>手机号码：</label>
            </div>
            <div class="form-control" :class="[$validation1.mobile.invalid && $validation1.mobile.touched ? 'error' : '']">
              <input type="number" v-model="addr.mobile" id="mobile" v-validate:mobile="['required', 'phone']" name="mobile" placeholder="请输入手机号码">
            </div>
            <div class="label_reg">
              <label class="blank" v-if="$validation1.mobile.required && $validation1.mobile.touched">联系电话不得为空</label>
              <label class="error" v-if="!$validation1.mobile.required && $validation1.mobile.phone">手机号格式错误</label>
            </div>              
          </div>
          <div class="ticket_inner_input input_email">
            <div class="intelligent-label">
              <label for="email" class="">邮箱地址：</label>
            </div>
            <div class="form-control" :class="[$validation1.email.invalid && $validation1.email.touched ? 'error' : '']">
              <input type="text" v-model="addr.email" id="email" v-validate:email="['email']" name="email" placeholder="请输入邮箱地址">
            </div>
            <div class="label_reg">
              <label class="error" v-if="$validation1.email.email">邮箱地址格式错误</label>
            </div>              
          </div>
          <div class="ticket_inner_input input_primary pb30" @click="setPrimary($event)">
            <em class="grid_box" :class="[ addr.uadefault ? 'primary' : '']"></em>设为默认地址
          </div>
        </div>
        <div class="mb100"></div>
        <my-footer :contact-if="parentContactShow" :footer="parentFooter" :active="parentFooterActive" @submit="saveAddr"></my-footer>
      </form>
    </validator>
    <!--toast-->
    <toast v-ref:toast :toast.sync="toast">
       <div slot = "content" >{{toast.content}}</div>
    </toast>
    <!-- city -->
    <city v-if="wares.length > 0" :wares="wares" @ware="onCityClicked" @back="onCityBackClicked"></city>  
  </div>
</template>

<script>
import store from '../../../store'
import myHeader from '../../../components/header'
import myFooter from '../../../components/footer'
import toast from '../../../components/toast'
import city from '../../../components/city.vue'
module.exports = {
  components: {
    myHeader,
    myFooter,
    toast,
    city
  },
  data: function () {
    return {
      parentHeader: '添加地址',
      parentTapshow: false,
      parentContactShow: false,
      parentFooter: '保存收货地址',
      addr: {
        name: null,
        placeId: null,
        address: null,
        mobile: null,
        email: null,
        uadefault: 0,
        ssoId: null
      },
      placeText: null,
      nameClientError: null,
      addressClientError: null,
      toast: {content: '错误内容'}, // 用于 toast
      wares: [],
      wareProvinceStore: [],
      wareCityStore: [],
      wareState: -1
    }
  },
  computed: {
    parentFooterActive: function () {
      return this.$validation1.valid
    }
  },
  route: {
    data: function ({to}) {
      if (parseInt(to.query.id) !== -1) {
        store.fetchAddr(to.query.id).then((info) => {
          this.addr = info
          this.placeText = info.place_name  // 只用一次
        })
      } else {
        this.addr = {
          name: null,
          placeId: null,
          address: null,
          mobile: null,
          email: null,
          uadefault: 0,
          ssoId: null
        }
        this.placeText = null
      }
    },
    waitForData: false
  },
  ready () {
  },
  methods: {
    saveAddr: function () {
      if (this.parentFooterActive) {
        store.MakeAddrSave(this.addr).then((json) => {
          if (json.ret === 0) {
            window.history.go(-1)
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
    setPrimary: function (event) {
      this.addr.uadefault = !this.addr.uadefault
      this.addr.uadefault = this.addr.uadefault === true ? 1 : 0
    },
    onCityClicked: function (ware) {
      if (ware.placeId !== '' && ware.placeId !== undefined && (parseInt(ware.placeId.substr(4, 1)) !== 0 || parseInt(ware.placeId.substr(5, 1)) !== 0)) {
        this.placeText = store.state.provinceText + store.state.cityText + ware.placeName
        this.addr.placeId = ware.placeId
        this.wares = []
        this.wareState = -1
      } else {
        store.GetLocationSub(ware.placeId).then((json) => {
          this.wares = []
          this.wareState ++
          for (var i in json.info) {
            this.wares.push({
              placeId: i,
              placeName: json.info[i]
            })
          }
          if (this.wareState === 0) {
            this.wareProvinceStore = this.wares
          } else if (this.wareState === 1) {
            this.wareCityStore = this.wares
            store.state.provinceText = ware.placeName
          } else if (this.wareState === 2) {
            store.state.cityText = ware.placeName
          }
        })
      }
    },
    onCityBackClicked: function () {
      console.log(this.wareState)
      if (this.wareState === 0) {
        this.wares = []
        this.wareState --
      } else if (this.wareState === 1) {
        this.wares = this.wareProvinceStore
        this.wareState --
      } else if (this.wareState === 2) {
        this.wares = this.wareCityStore
        this.wareState --
      }
    }
  },
  validators: {
    name: function (val) {
      let _v = val.trim()
      if (/^[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(_v)) {
        if (_v.length < 2) {
          this._vm.nameClientError = '姓名不得少于2个字符'
          return false
        } else if (_v.length > 20) {
          this._vm.nameClientError = '姓名不得多于20个字符'
          return false
        } else {
          return true
        }
      } else {
        this._vm.nameClientError = '请输入正确的字符'
        return false
      }
    },
    address: function (val) {
      let _v = val.trim()
      // if (/^[\w\s\u4e00-\u9fa5)]+$/.test(_v)) {
      if (/^[\s\S]+$/.test(_v)) {
        if (_v.length < 4) {
          this._vm.addressClientError = '详细地址不得少于4个字符'
          return false
        } else if (_v.length > 40) {
          this._vm.addressClientError = '详细地址不得多于40个字符'
          return false
        } else {
          return true
        }
      } else {
        this._vm.addressClientError = '请输入正确的字符'
        return false
      }
    },
    phone: function (val) {
      return /^1[3|4|5|7|8][0-9]\d{8}$/.test(val.trim())
    },
    email: function (val) {
      return val === '' ? true : /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(val.trim())
    }
  },
  props: {
  }
}
</script>

<style scoped>
    /*ticket_unit common style*/
    .center_body{}
    .center_body .ticket_unit{background:#fff;width:100%;border-top:1px solid #e0e0e0;padding-top:0.4rem;}

    .center_body .ticket_unit .ticket_inner_input{font-size:0.3466rem;width:9.2rem;padding:0 0.4rem;}
    .center_body .ticket_unit .ticket_inner_input .intelligent-label{width:100%;font-size:0.3466rem;color:#333;}
    .center_body .ticket_unit .ticket_inner_input .intelligent-label em{margin-right:0.2rem;vertical-align:middle;}
    .center_body .ticket_unit .ticket_inner_input .form-control{position:relative;width:9.0rem;margin-top:0.2rem;border:1px solid #d0d0d0;border-radius:2px;}
    .center_body .ticket_unit .ticket_inner_input .form-control.error{border:1px solid #ea3f38;}
    .center_body .ticket_unit .ticket_inner_input .form-control input{border:none;padding:0 0.2666rem;width:8.4666rem;height:0.9333rem;font-size:0.3466rem;}
    .center_body .ticket_unit .ticket_inner_input .form-control textarea{border:none;padding:0.2666rem;width:8.4666rem;height:1.8666rem;font-size:0.3466rem;resize:none;}    
    .center_body .ticket_unit .ticket_inner_input .form-control .angledown{position:absolute;right:0.4rem;top:0.3rem;width:0.16rem;height:0.3rem;background:url('http://i2.letvimg.com/lc06_letvsports/201610/10/14/48/arrow.png') 0 0;background-size:100%;transform:rotate(90deg);-webkit-transform:rotate(90deg);}
    .center_body .ticket_unit em.grid_box{display:inline-block;width:0.32rem;height:0.32rem;border:1px solid #e0e0e0;vertical-align:-0.05rem;margin-right:0.2rem;}
    .center_body .ticket_unit em.grid_box.primary{background:url("http://i1.letvimg.com/lc02_letvsports/201609/22/16/03/addrs_03.png") no-repeat -1px -0.88rem;background-size:100%;}
    .center_body .ticket_unit .ticket_inner_input .label_reg{width:100%;height:0.8rem;}
    .center_body .ticket_unit .ticket_inner_input .label_reg > label{line-height:0.8rem;padding-left:0.2666rem;font-size:0.3466rem;color:#ce0000;}
</style>
