<template>
  <div class="wrapper">
      <!-- Add your site or application content here -->
      <div class="center_body">
        <div class="ticket_unit ticket_notice mt16">
            <div class="ticket_inner_navbar">
                <em></em>购票须知
            </div>
            <div class="ticket_inner_text" v-html="ticket_notice"></div>
        </div>
        <div class="ticket_unit ticket_detail mt16">
            <div class="ticket_inner_navbar">
                <em></em>门票详情
            </div>
            <div class="ticket_inner_text" v-html="ticket_detail"></div>
            <div class="loading" :class="[ loadif ? '' : 'hide']"><em></em>加载新数据</div>
            <div class="goTop hide"></div>
        </div>
        <div class="mb100"></div>
      </div>
  </div>
</template>

<script>
import store from '../../../store'
module.exports = {
  components: {
  },
  data: function () {
    return {
      ticket_notice: '',
      ticket_detail: ''
    }
  },
  route: {
    data: function ({to}) {
      store.fetchProduct(to.params.id).then((json) => {
        if (json.ret === 0) {
          this.ticket_notice = json.info.specialDesc
          this.ticket_detail = json.info.desc
        } else {
          this.ticket_notice = ''
          this.ticket_detail = ''
        }
      })
    }
  },
  methods: {
  },
  props: {
  }
}
</script>

<style scoped>
  .nav_header{ position:relative;width:100%;height:1.1733rem;background:#fff;text-align:center;font-size:0.48rem;color:#333333; }
  .nav_header p{line-height:1.1733rem;}
  .nav_header .tap_dd{position:absolute;top:0.4rem;right:0.4rem;line-height:0;}
  .nav_header .tap_dd .circle{display:inline-block;background-color:#ffbc0c;border-radius:100%;-webkit-border-radius:100%;width:0.1rem;height:0.1rem;}
  .nav_header .tap_dt{ z-index:1;position:absolute;right:0.4rem;width:2.4rem;height:2.3466rem;padding:0 0.3333rem;background:#000;opacity:0.75;filter:alpha(opacity=75);border-radius:3px;}
  .nav_header .tap_dt .arrow{position:absolute;top:-6px;right:0.2666rem;width: 0;height: 0;border-left: 6px solid transparent;border-right: 6px solid transparent;border-bottom: 6px solid #000;}
  .nav_header .tap_dt a{display:block;width:100%;font:0.4rem "MicroSoft Yahei";color:#fff;line-height:1.1733rem;overflow:hidden;}
  .nav_header .tap_dt a:active{color:#ffbc0c;}
  .nav_header .tap_dt a.myorder{border-bottom:1px solid #1a242d}
  /*ticket_unit common style*/
  .center_body{}
  .center_body .ticket_unit{background:#fff;width:100%;}
  .center_body .ticket_unit .ticket_inner_navbar{width:100%;height:1.1733rem;font-size:0.4rem;font-weight:600;color:#333333;line-height:1.1733rem;border-bottom:1px solid #e0e0e0;}
  .center_body .ticket_unit .ticket_inner_navbar em{display:inline-block;width:2px;height:0.4rem;background:#ef3b31;margin-right:0.4rem;vertical-align:-2px;}
  .center_body .ticket_unit .ticket_inner_text{padding:0 0.4rem 0.4rem;margin-top:0.4rem;width:9.2rem;font-size:0.3466rem;color:#333333;line-height:0.55rem;}
  /*下面两句没有效果*/
  .center_body .ticket_unit .ticket_inner_text img{display:block;width:100%;margin:0.4rem 0;}
  .center_body .ticket_unit .ticket_inner_text p{margin-bottom:0.6666rem;}
  /*ticket detail infomation*/
  .center_body .baseinfo_poster{position:relative;height:4.5333rem;}
  .center_body .baseinfo_poster .gassblur_image{position:absolute;width:100%;height:2.1333rem;}
  .center_body .baseinfo_poster .baseinfo_box{position:absolute;width:9.2rem;margin:0 0.4rem;}
  .center_body .baseinfo_poster .baseinfo_box .baseinfo_poster_image{width:2.8rem;height:3.7333rem;margin-top:0.4666rem;}
  .center_body .baseinfo_poster .baseinfo_box .baseinfo_poster_text{position:relative;width:6.1333rem;height:4.2rem;padding-left:0.2666rem;}
      /*match info title*/
      .center_body .baseinfo_poster .baseinfo_poster_tt{width:100%;height:2.1333rem;display:table-cell;vertical-align:middle;}
      .center_body .baseinfo_poster .baseinfo_poster_tt p{font:0.4rem "MicroSoft Yahei";color:#fff;height:1.0666rem;overflow:hidden;}
      .center_body .baseinfo_poster .baseinfo_poster_price{width:100%;margin-top:0.4rem;}
      .center_body .baseinfo_poster .baseinfo_poster_price p{font:0.48rem "MicroSoft Yahei";color:#ef3b31;height:0.64rem;overflow:hidden;}
      .center_body .baseinfo_poster .baseinfo_poster_tags{position:absolute;bottom:0;left:0.2666rem;width:100%;}
      .center_body .baseinfo_poster .baseinfo_poster_tags .tag{float:left;margin-right:0.1333rem;width:1.2rem;height:0.48rem;border:1px solid #ffc12e;border-radius:2px;color:#ffc12e;font:0.32rem "MicroSoft Yahei";line-height:0.48rem;text-align:center;}
  .center_body .baseinfo_grid{margin:0 0.4rem;width:9.2rem;height:1.2rem;font-size:0.3466rem;color:#333333;line-height:1.2rem;border-top:1px solid #e0e0e0;text-align: center;}
  .center_body .baseinfo_grid .gridLeft{float:left;}
  .center_body .baseinfo_grid .gridRight{float:right;}
  .center_body .baseinfo_grid .select{display:inline-block;vertical-align:-4px;width:0.3733rem;height:0.4rem;background:url("http://i2.letvimg.com/lc02_letvsports/201609/21/22/05/select.png") no-repeat 0 0;background-size:100%;margin-right:0.16rem;}
  .center_body .baseinfo_grid .unselect{display:inline-block;vertical-align:-4px;width:0.3733rem;height:0.4rem;background:url("http://i2.letvimg.com/lc02_letvsports/201609/21/22/05/select.png") no-repeat 0 -0.4rem;background-size:100%;margin-right:0.16rem;}
  /*loading style*/
  .center_body .loading{width:100%;height:1.2rem;text-align:center;font-size:0.32rem;color:#999;}
  .center_body .loading em{display:inline-block;width:0.4rem;height:0.4rem;background:url("http://i3.letvimg.com/lc06_letvsports/201609/21/23/34/tel_loading.png") no-repeat 0 0;background-size:100%;vertical-align:middle;margin-right:0.18rem;}
  .center_body .goTop{position:fixed;right:0.4rem;bottom:2rem;width:1.1733rem;height:1.1733rem;background:url("http://i1.letvimg.com/lc02_letvsports/201609/22/00/31/gotop.png") no-repeat 0 0;background-size:100%;}
  /*fix footer*/
  .fix_footer{position:fixed;bottom:0;left:0;width:100%;height:1.3333rem;border-top:1px solid #e0e0e0;text-align:center;}
  .fix_footer .contact{float:left;width:2rem;height:100%;background:#fff;font-size:0.32rem;color:#333333;}
  .fix_footer .contact img{display:inline-block;width:0.4133rem;height:0.3733rem;margin-top:0.2666rem;}
  .fix_footer .goTicket{float:right;width:8rem;height:100%;background:#ffbc0c;font-size:0.4rem;color:#fff;text-align:center;line-height:1.3333rem;}
</style>






