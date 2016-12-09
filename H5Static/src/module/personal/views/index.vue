<template>
  <div class="wrapper">
      <!-- Add your site or application content here -->
      <my-header :header="parentHeader" :tap-show="parentTapshow"></my-header>
      <div class="center_body">
        <div class="ticket_unit ticket_portrait">
          <div class="portrait_poster">
            <img class="portrait_img" :src="portrait_img" alt="">
            <p v-show="loginStatus" class="portrait_name" v-text="portrait_name"></p>
          </div>
        </div>
        <div class="ticket_unit ticket_personal mt16">
          <div v-link="{ name: 'orders'}" class="baseinfo_grid myorders clearfix">
              <span class="fl"><img class="leftlogo" src="http://i1.letvimg.com/lc04_letvsports/201610/10/14/52/index03.png" alt="">我的订单</span>
              <span class="fr"><img class="rightArrow" src="http://i2.letvimg.com/lc06_letvsports/201610/10/14/48/arrow.png" alt=""></span>
          </div>
          <div v-link="{ name: 'addrs'}" class="baseinfo_grid myaddrs clearfix">
              <span class="fl"><img class="leftlogo" src="http://i2.letvimg.com/lc04_letvsports/201610/10/14/57/index04.png" alt="">我的地址</span>
              <span class="fr"><img class="rightArrow" src="http://i2.letvimg.com/lc06_letvsports/201610/10/14/48/arrow.png" alt=""></span>
          </div>
          <div v-link="{ name: 'coupons'}" class="baseinfo_grid mycoupons clearfix">
              <span class="fl"><img class="leftlogo" src="http://i2.letvimg.com/lc04_letvsports/201610/10/14/57/index05.png" alt="">我的优惠券</span>
              <span class="fr"><img class="rightArrow" src="http://i2.letvimg.com/lc06_letvsports/201610/10/14/48/arrow.png" alt=""></span>
          </div>
        </div>
        <div class="ticket_unit ticket_affiliate mt16">
          <div v-link="{ name: 'helps'}" class="baseinfo_grid myhelps clearfix">
              <span class="fl"><img class="leftlogo" src="http://i3.letvimg.com/lc04_letvsports/201610/10/14/57/index06.png" alt="">用户帮助</span>
              <span class="fr"><img class="rightArrow" src="http://i2.letvimg.com/lc06_letvsports/201610/10/14/48/arrow.png" alt=""></span>
          </div>
          <div v-link="{ name: 'abouts'}" class="baseinfo_grid myabouts clearfix">
              <span class="fl"><img class="leftlogo" src="http://i2.letvimg.com/lc04_letvsports/201610/10/14/58/index07.png" alt="">关于我们</span>
              <span class="fr"><img class="rightArrow" src="http://i2.letvimg.com/lc06_letvsports/201610/10/14/48/arrow.png" alt=""></span>
          </div>
        </div>
        <div class="ticket_unit ticket_logout mt16">
          <div v-if="!loginStatus" @click="login" class="baseinfo_grid">
              登录
          </div>
          <div v-else @click="logout" class="baseinfo_grid">
              退出登录
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import myHeader from '../../../components/header'
import store from '../../../store'
module.exports = {
  components: {
    myHeader
  },
  data: function () {
    return {
      parentHeader: '我的票务',
      parentTapshow: false,
      portrait_img: 'http://i3.letvimg.com/lc05_letvsports/201610/10/12/04/index_head.jpg',
      portrait_name: null
    }
  },
  computed: {
    loginStatus: function () {
      if (window.CookieUtils.get('sp_sso_tk')) {
        return true
      } else {
        return false
      }
    }
  },
  ready () {
    store.GetCsrfToken()
    window.sportsLogin(() => {
      this.loginStatus = true
      console.log('sso has login...')
    })
    if (window.CookieUtils.get('sp_sso_tk')) {
      this.loginStatus = true
      this.portrait_img = window.CookieUtils.get('sp_sso_avatar')
      this.portrait_name = window.CookieUtils.get('sp_sso_uname')
    }
  },
  methods: {
    login: function (event) {
      window.sportsLogin(() => {
        this.loginStatus = true
        this.portrait_img = window.CookieUtils.get('sp_sso_avatar')
        this.portrait_name = window.CookieUtils.get('sp_sso_uname')
        console.log('sso has login...')
        // post userKey到h5/loginCallback
        /* store.MakeLoginCallback().then((json) => {
          if (json.ret === 0) {
            console.log('成功登录票务系统...')
          } else {
            console.log('登录票务系统失败...')
          }
        }) */
      })
    },
    logout: function (event) {
      window.sportsLogout(function () {
        window.location.reload()
      })
    },
    touch: function (event) {
      this.touched = true
    }
  },
  props: {
  }
}
</script>


<style scoped>
  /*ticket_unit common style*/
  .center_body{}
  .center_body .ticket_unit{background:#fff;width:100%;}
  .center_body .portrait_poster{position:relative;width:100%;height:5.44rem;background:url("http://i2.letvimg.com/lc03_letvsports/201610/10/12/06/index01.jpg") no-repeat 0 top;background-size:100%;text-align:center;}
  .center_body .portrait_poster .portrait_img{margin-top:0.6666rem;width:2.9333rem;height:2.9333rem;border-radius:50%;-webkit-border-radius:50%;border: 0.1333rem solid #333;}
  .center_body .portrait_poster .portrait_name{font-size: 0.48rem;color:#333;}
    /*match info title*/
    .center_body .baseinfo_grid{padding:0 0.4rem;width:9.2rem;height:1.3333rem;font-size:0.4266rem;color:#333333;line-height:1.3333rem;border-bottom:1px solid #e0e0e0;text-align:center;}
    .center_body .baseinfo_grid:hover{background:#f6f6f6;}
    .center_body .baseinfo_grid img.leftlogo{display:inline-block;width: 0.32rem;height: 0.43rem;margin-right: 0.4rem;vertical-align: -0.026rem;}
    .center_body .baseinfo_grid img.rightArrow{display:inline-block;width:0.16rem;height:0.3rem;}
</style>
