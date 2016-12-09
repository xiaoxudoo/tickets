module.exports = function (router) {
  router.map({
    '/:id': {
      name: 'process00',
      component: require('../views/index.vue')
    },
    '/:id/short': {
      name: 'short',
      component: require('../views/index-1.vue')
    },
    '/:id/process01': {
      name: 'process01',
      component: require('../views/process01.vue')
    },
    '/:id/process02': {
      name: 'process02',
      component: function (reslove) {
        return require(['../views/process02.vue'], reslove)
      }
    },
    '/:id/process03': {
      name: 'process03',
      component: function (reslove) {
        return require(['../views/process03.vue'], reslove)
      }
    },
    '/invoiceInfo': {
      name: 'invoiceInfo',
      component: function (reslove) {
        return require(['../views/invoice.vue'], reslove)
      }
    },
    '/expressInfo': {
      name: 'expressInfo',
      component: function (reslove) {
        return require(['../views/expinfo.vue'], reslove)
      }
    },
    '/noticeInfo': {
      name: 'noticeInfo',
      component: function (reslove) {
        return require(['../views/notice.vue'], reslove)
      }
    },
    // not found handler
    '/error': {
      component: require('../../../components/not_found.vue')
    },
    '*': {
      component: require('../../../components/not_found.vue')
    }
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
