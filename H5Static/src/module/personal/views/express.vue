<template>
  <div class="wrapper">
    <my-header v-if="flag" :header="parentHeader" :tap-show="parentTapshow"></my-header>
    <div class="center_body">
      <div class="expTitle">
        <p class="ugly">物流信息:&nbsp;<span class="expStatus" v-text="expressInfo.status">运输中</span></p>
        <p class="subs">承运公司:&nbsp;&nbsp;<span class="expCompany" v-text="expressInfo.company">韵达快递</span></p>
        <p class="subs">订单号:&nbsp;&nbsp;<span class="expId" v-text="expressInfo.id">1234567891011</span></p>
      </div>
      <div class="expProcess mt16">
        <div class="exp_grid" v-for="(index, point) in expressInfo.points">
          <div class="exp_left">
            <div class="verline" v-if="index !== (expressInfo.points.length - 1)"></div>
            <div class="masklineHead" v-if="index === 0"></div>
            <div class="masklineTail" v-if="index === (expressInfo.points.length - 1)"></div>
            <img class="stateNow" v-if="index === 0" src="http://i3.letvimg.com/lc07_letvsports/201612/02/16/01/expmk01.png" alt="">
            <img class="stateBefore" v-else src="http://i3.letvimg.com/lc04_letvsports/201612/02/16/08/expmk02.png" alt="">
          </div>
          <div class="exp_right">
            <p class="address_detail"><span v-text="point.AcceptStation"></span></p>  
            <p class="time_detail" v-text="point.AcceptTime"></p>
          </div>
        </div>
      </div>
    </div>
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
module.exports = {
  components: {
    myHeader,
    toast
  },
  data: function () {
    return {
      parentHeader: '物流信息',
      parentTapshow: false,
      flag: null,
      expressInfo: {
        status: null,
        company: null,
        id: null,
        points: [
        ]
      },
      toast: {content: '错误内容', timer: 1000} // 用于 toast
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
      this.expressInfo.id = to.params.id
      store.GetExpressDetails(to.params.id).then((json) => {
        if (json.ret === 0) {
          this.expressInfo.points = json.info.trace
          this.expressInfo.company = json.info.company
          this.expressInfo.status = json.info.status
        } else if (json.ret === 19) {
          this.toast = {content: JSON.parse(json.msg), timer: 2000}
        } else {
          this.$route.router.go({path: '/error'})
        }
      })
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
  .expTitle{background:#fff;width:9.2rem;padding: 0 0.4rem;border-top: 1px solid #d0d0d0;height:2.3466rem;}
  .expTitle p.ugly{color:#000;font-size:0.4rem;padding-top:0.35rem;}
  .expTitle p.ugly .expStatus{color:#e41d25;}
  .expTitle p.subs{color:#999;font-size:0.3466rem;}
  .expProcess{background:#fff;width:9.2rem;padding: 0 0.4rem;}
  .expProcess .exp_grid{position:relative;width:100%;}
  .expProcess .exp_grid .exp_left{position:absolute;width:0.8rem;height:100%;}
  .expProcess .exp_grid .exp_left .verline{position:absolute;left:0.2rem;margin-left:-1px;width:1px;height:100%;background:#e0e0e0;}
  .expProcess .exp_grid .exp_left .masklineHead{position:absolute;left:0.2rem;margin-left:-1px;width:1px;height:0.4rem;background:#ffffff;}  
  .expProcess .exp_grid .exp_left .masklineTail{position:absolute;left:0.2rem;margin-left:-1px;width:1px;height:0.5rem;background:#e0e0e0;} 
  .expProcess .exp_grid .exp_left img.stateNow{position:absolute;width:0.4rem;left:0;top:0.4rem;}
  .expProcess .exp_grid .exp_left img.stateBefore{position:absolute;width:0.2rem;left:0.1rem;top:0.5rem;}
  .expProcess .exp_grid .exp_right{margin-left:0.8rem;width:8.4rem;border-bottom:1px solid #e0e0e0;}
  .expProcess .exp_grid:last-child .exp_right{border:none;}
  .expProcess .exp_grid .exp_right .address_detail{font-size:0.3466rem;color:#999;padding-top:0.3rem;}
  .expProcess .exp_grid .exp_right .time_detail{font-size:0.32rem;color:#999;max-height:0.48rem;margin:0.1rem 0.12rem;overflow:hidden;}
</style>
