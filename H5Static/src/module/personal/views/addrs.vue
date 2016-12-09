<template>
  <div class="wrapper">
    <my-header :header="parentHeader" :tap-show="parentTapshow"></my-header>
    <div v-if="parentAddrs.length > 0" class="headerTips">已添加<em>{{ parentAddrs.length }}</em>条地址，你还可以添加<em>{{ 6 - parentAddrs.length }}</em>条新地址</div>
    <div class="center_body">
      <div v-if="parentAddrs.length > 0">
        <my-addr v-for="(index, addr) in parentAddrs" @set-default="onSetDefaultClicked" @edit="onEditClicked" @remove="onRemoveClicked" :addr.sync="addr" :can-delete="canDelete" :show-select="(index === 0) && showSelect"></my-addr>
      </div>
      <blank-addr v-else></blank-addr>
      <div class="mb100"></div>
    </div>
    <div class="fix_footer">
      <a @click="onAddrClicked" class="saveAddr" :class="[active ? 'active' : '']">添加地址</a>
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
import myAddr from '../../../components/addr'
import blankAddr from '../../../components/blankAddr'
import toast from '../../../components/toast'
module.exports = {
  components: {
    myHeader,
    myAddr,
    blankAddr,
    toast
  },
  data: function () {
    return {
      parentHeader: '我的地址',
      parentTapshow: false,
      parentAddrs: [
      ],
      canDelete: true,
      showSelect: false,
      active: true,
      toast: {content: '正在加载...'} // 用于 toast
    }
  },
  route: {
    data: function (transition) {
      // 从不同路由跳进来后的UI变化
      let url = window.location.href
      let retIndex = url.indexOf('returnUrl')
      let selectAddrId = window.localStorage.getItem('selectedAddrId')
      if (selectAddrId) {
        this.showSelect = true
      } else {
        this.showSelect = false
      }
      if (retIndex > -1) {
        this.parentHeader = '选择地址'
        this.canDelete = false // 没有删除操作，不去设置默认地址，去跳转
      } else {
        this.parentHeader = '我的地址'
        this.canDelete = true // 可以做删除操作，去设置默认地址，不做跳转
      }
      this.showToast()
      store.fetchAddrs().then((info) => {
        var addrArray = info || []
        var tmp = null
        // 将默认地址置顶
        for (var i = addrArray.length - 1; i >= 0; i--) {
          if (addrArray[i].uadefault) {
            tmp = addrArray[i]
            addrArray.splice(i, 1) // 它的返回值是一个数组
            addrArray.unshift(tmp)
            break
          }
        }
        // 如果有选择地址，将选择地址置顶
        tmp = null
        if (selectAddrId) {
          for (i = addrArray.length - 1; i >= 0; i--) {
            if (parseInt(addrArray[i].ssoId) === parseInt(selectAddrId)) {
              tmp = addrArray[i]
              addrArray.splice(i, 1)
              addrArray.unshift(tmp)
              break
            }
          }
        }
        this.parentAddrs = addrArray // 在这里赋值，可以避免地址顺序变化带来的页面扰动
        if (this.parentAddrs.length >= 6) {
          this.active = false
        }
      })
    }
  },
  ready () {
  },
  methods: {
    onSetDefaultClicked: function (id) {
      if (this.canDelete) {
        var tmpId = null
        var tmpAddr = null
        // 设置默认地址，不做跳转
        // 把默认地址放置在最当前位置
        for (var i = this.parentAddrs.length - 1; i >= 0; i--) {
          if (parseInt(this.parentAddrs[i].ssoId) === parseInt(id)) {
            this.parentAddrs[i].uadefault = true
            tmpId = i
            tmpAddr = this.parentAddrs[i]
          } else {
            this.parentAddrs[i].uadefault = false
          }
        }
        this.parentAddrs.splice(tmpId, 1)
        this.parentAddrs.unshift(tmpAddr)
        store.MakeAddrDefault(id).then((json) => {
          if (json.ret === 0) {
            console.log('set default success')
          } else {
            console.log('set default fail...')
          }
        })
      } else {
        // 直接跳转页面
        let url = window.location.href
        let retIndex = url.indexOf('returnUrl')
        let retEND = url.indexOf('ssoId')
        // 把选择地址放置在最当前位置
        tmpAddr = null
        for (i = this.parentAddrs.length - 1; i >= 0; i--) {
          if (parseInt(this.parentAddrs[i].ssoId) === parseInt(id)) {
            tmpAddr = this.parentAddrs[i]
            this.parentAddrs.splice(i, 1)
            this.parentAddrs.unshift(tmpAddr)
            break
          }
        }
        window.localStorage.setItem('selectedAddrId', id)
        // store.state.selectedAddrId = id  // 记录被选择的地址id,以下刷新会清洗掉store中的状态，无法使用store保存数据
        // 判断跳转回的路由
        if (retEND > -1) {
          window.location.href = url.slice(retIndex + 10, retEND + 6) + id
        } else {
          window.location.href = url.slice(retIndex + 10)
        }
      }
    },
    onEditClicked: function (id) {
      this.$route.router.go({name: 'addaddr', query: {id: id}})
    },
    onRemoveClicked: function (id) {
      for (var i = this.parentAddrs.length - 1; i >= 0; i--) {
        if (parseInt(this.parentAddrs[i].ssoId) === parseInt(id)) {
          this.parentAddrs.$remove(this.parentAddrs[i])
          break
        }
      }
      // 执行 删除操作的请求
      store.MakeAddrDelete(id).then((json) => {
        if (json.ret === 0) {
          console.log('delete success')
          this.active = true
        } else {
          console.log('delete fail...')
        }
      })
    },
    onAddrClicked: function () {
      if (this.parentAddrs.length < 6) {
        this.$route.router.go({name: 'addaddr', query: {id: -1}})
      }
    },
    showToast: function () {
      // 直接设置，默认2.5秒后自动消失
      this.toast = {content: '加载中...', timer: 1000}
      // 如果同时设置多个，则只会显示最后一个
      // this.toast.content = 'toast  2.8s...'
    }
  },
  props: {
  }
}
</script>


<style scoped>
    .wrapper{background:url('http://i3.letvimg.com/lc02_letvsports/201611/03/18/35/bgcut.jpg') repeat;}
    .headerTips{width:9.2rem;line-height:1.0666rem;padding:0 0.4rem;color:#333;font-size:0.3466rem;border-top:1px solid #e0e0e0;background:#fff;}

    /*fix footer*/
    .fix_footer{position:fixed;bottom:0;left:0;width:100%;height:1.3333rem;border-top:1px solid #e0e0e0;text-align:center;}
    .fix_footer .saveAddr{float:left;width:10rem;height:100%;font-size:0.4rem;text-align:center;line-height:1.3333rem;background:#f6f6f6;color:#999999;}
    .fix_footer .saveAddr.active{background:#ffbc0c;color:#fff;}
</style>
