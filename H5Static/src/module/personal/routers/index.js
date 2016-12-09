module.exports = function (router) {
  router.map({
    '/': {
      name: 'index',
      component: require('../views/index.vue')
    },
    '/orders': {
      name: 'orders',
      component: function (reslove) {
        return require(['../views/orders.vue'], reslove)
      }
    },
    '/orderdetail/:id': {
      name: 'orderdetail',
      component: function (reslove) {
        return require(['../views/orderdetail.vue'], reslove)
      }
    },
    '/addrs': {
      name: 'addrs',
      component: function (reslove) {
        return require(['../views/addrs.vue'], reslove)
      }
    },
    '/addaddr': {
      name: 'addaddr',
      component: function (reslove) {
        return require(['../views/addaddr.vue'], reslove)
      }
    },
    '/coupons': {
      name: 'coupons',
      component: function (reslove) {
        return require(['../views/coupons.vue'], reslove)
      }
    },
    '/addcoupon': {
      name: 'addcoupon',
      component: function (reslove) {
        return require(['../views/addcoupon.vue'], reslove)
      }
    },
    '/express/:id': {
      name: 'express',
      component: function (reslove) {
        return require(['../views/express.vue'], reslove)
      }
    },
    '/helps': {
      name: 'helps',
      component: function (reslove) {
        return require(['../views/helps.vue'], reslove)
      }
    },
    '/abouts': {
      name: 'abouts',
      component: function (reslove) {
        return require(['../views/abouts.vue'], reslove)
      }
    },
    // not found handler
    '*': {
      component: require('../../../components/not_found.vue')
    }
  })

  router.alias({
    '/home': '/'
  })

  router.beforeEach(function (transition) {
    console.log('before---------------')
		// 可以通过在路由中的自定义字段来验证用户是否需要登陆
		// if(transition.to.auth){
		// 	console.log('通过配置路由中自定义的字段验证是否需要登陆');
		// }

		// // 如果是中止，这里可以判断用户登录
		// // if(transition.to.path === '/forbidden'){
    if (transition.to.name === 'forbidden') {
      router.app.authenticating = true
      setTimeout(function () {
        router.app.authenticating = false
        console.log('此路由在全局中设置为中止')
        transition.abort()
      }, 1500)
    }
    transition.next()
  })

	// 可以记录访问路径
  router.afterEach(function (transition) {
    console.log('-----------------after')
  })
}
