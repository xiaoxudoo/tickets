import { Promise } from 'es6-promise'
import { http } from 'vue'
import CONFIG from 'assets/conf'
var store = {
  state: {
    orderData: {
      priceId: null, // 购买的商品的价格选项的id
      count: null,   // 购买的数量
      name: null,    // 持票人姓名
      id: null,      // 持票人身份证信息
      couponId: null,  // 优惠券id
      addressId: null, // 平台用户地址Id
      eventId: null,   // 优惠活动id
      amount: null,    // 总金额（包含运费，已经减掉优惠金额单位元）
      receiptType: null, // 0不开发票，1个人，2单位
      receiptTitle: null  // 发票抬头，receiptType为2的时候必须填写
    },
    provinceText: '',
    cityText: '',
    selectedAddrId: null
  },
  fetchProduct: (productId) => {
    return new Promise((resolve, reject) => {
      http.get('/h5/productDetail?qtype=json&productId=' + productId)
      .then((res) => {
        return res.json()
      }).then((json) => {
        resolve(json)
      }).catch((ex) => {
        reject(ex)
      })
    })
  },
  fetchPriceItem: (productId) => {
    return new Promise((resolve, reject) => {
      http.get('/h5/prices?qtype=json&productId=' + productId)
      .then((res) => {
        return res.json()
      }).then((json) => {
        resolve(json)
      }).catch((ex) => {
        reject(ex)
      })
    })
  },
  // mark
  fetchStock: (priceId) => {
    return new Promise((resolve, reject) => {
      http.get('/h5/priceStock?qtype=json&priceId=' + priceId)
      .then((res) => {
        return res.json()
      }).then((json) => {
        if (json.ret === 5) {
          window.openLogin()
        }
        resolve(json.info)
      }).catch((ex) => {
        reject(ex)
      })
    })
  },
  // mark
  fetchAddrs: () => {
    return new Promise((resolve, reject) => {
      http.get('/h5/getAddrs?qtype=json')
      .then((res) => {
        return res.json()
      }).then((json) => {
        if (json.ret === 5) {
          window.openLogin()
        }
        resolve(json.info)
      }).catch((ex) => {
        reject(ex)
      })
    })
  },
  fetchAddr: (ssoId) => {
    return new Promise((resolve, reject) => {
      http.get('/h5/getAddr?qtype=json&ssoId=' + ssoId)
      .then((res) => {
        return res.json()
      }).then((json) => {
        if (json.ret === 5) {
          window.openLogin()
        }
        resolve(json.info)
      }).catch((ex) => {
        reject(ex)
      })
    })
  },
  fetchCoupons: (type) => {
    return new Promise((resolve, reject) => {
      http.get('/h5/coupons?qtype=json&type=' + type)
      .then((res) => {
        return res.json()
      }).then((json) => {
        if (json.ret === 5) {
          window.openLogin()
        }
        resolve(json.info)
      }).catch((ex) => {
        reject(ex)
      })
    })
  },
  fetchProdItemPrice: (priceId, num, ssoId) => {
    return new Promise((resolve, reject) => {
      http.get('/h5/getProdItemPrice?qtype=json&priceId=' + priceId + '&ssoId=' + ssoId + '&num=' + num)
      .then((res) => {
        return res.json()
      }).then((json) => {
        if (json.ret === 5) {
          window.openLogin()
        }
        resolve(json)
      }).catch((ex) => {
        reject(ex)
      })
    })
  },
  fetchIDLimit: (priceId, num, ID) => {
    return new Promise((resolve, reject) => {
      http.get('/h5/checkNumById?qtype=json&priceId=' + priceId + '&id=' + ID + '&num=' + num)
      .then((res) => {
        return res.json()
      }).then((json) => {
        if (json.ret === 5) {
          window.openLogin()
        }
        resolve(json)
      }).catch((ex) => {
        reject(ex)
      })
    })
  },
  MakeLoginCallback: () => {
    let letvUserToken = window.CookieUtils.get('sp_sso_ukey')
    let tokens = window.CookieUtils.get('ticket_csrf')
    return new Promise((resolve, reject) => {
      http.post('/h5/loginCallback?qtype=json', {userKey: letvUserToken, _token: tokens})
      .then((res) => {
        return res.json()
      }).then((json) => {
        resolve(json)
      }).catch((ex) => {
        reject(ex)
      })
    })
  },
  // mark
  MakeOrderAndPay: function () {
    let orderData = this.state.orderData  // this 指向调用函数的对象， 箭头函数中的this指向vue全局变量
    orderData._token = window.CookieUtils.get('ticket_csrf')
    orderData.appId = 11  // H5 的APPID
    return new Promise((resolve, reject) => {
      http.post('/h5/createOrder?qtype=json', orderData).then((res) => {
        return res.json()
      }).then((json) => {
        resolve(json)
      }).catch((ex) => {
        reject(ex)
      })
    })
  },
  OrderPay: function (orderData) {
    orderData._token = window.CookieUtils.get('ticket_csrf')
    return new Promise((resolve, reject) => {
      http.post('/h5/pay?qtype=json', orderData).then((res) => {
        resolve(res)
      }).catch((ex) => {
        reject(ex)
      })
    })
  },
  // mark
  MakeAddrDefault: (ssoId) => {
    let _token = window.CookieUtils.get('ticket_csrf')
    return new Promise((resolve, reject) => {
      http.post('/h5/setAddrDefault?qtype=json', {ssoId: ssoId, _token: _token})
      .then((res) => {
        return res.json()
      }).then((json) => {
        if (json.ret === 5) {
          window.openLogin()
        }
        resolve(json)
      }).catch((ex) => {
        reject(ex)
      })
    })
  },
  MakeAddrDelete: (ssoId) => {
    let _token = window.CookieUtils.get('ticket_csrf')
    return new Promise((resolve, reject) => {
      http.post('/h5/delAddr?qtype=json', {ssoId: ssoId, _token: _token})
      .then((res) => {
        return res.json()
      }).then((json) => {
        if (json.ret === 5) {
          window.openLogin()
        }
        resolve(json)
      }).catch((ex) => {
        reject(ex)
      })
    })
  },
  MakeAddrSave: (addrData) => {
    addrData._token = window.CookieUtils.get('ticket_csrf')
    return new Promise((resolve, reject) => {
      http.post('/h5/storeAddr?qtype=json', addrData)
      .then((res) => {
        return res.json()
      }).then((json) => {
        if (json.ret === 5) {
          window.openLogin()
        }
        resolve(json)
      }).catch((ex) => {
        reject(ex)
      })
    })
  },
  MakeCouponSave: (key) => {
    let _token = window.CookieUtils.get('ticket_csrf')
    return new Promise((resolve, reject) => {
      http.post('/h5/bindCoupon?qtype=json', {key: key, _token: _token})
      .then((res) => {
        return res.json()
      }).then((json) => {
        if (json.ret === 5) {
          window.openLogin()
        }
        resolve(json)
      }).catch((ex) => {
        reject(ex)
      })
    })
  },
  GetOrderList: (type, pageIndex, pageSize) => {
    return new Promise((resolve, reject) => {
      http.get('/h5/orders?qtype=json&type=' + type + '&pageIndex=' + pageIndex + '&pageSize=' + pageSize)
      .then((res) => {
        return res.json()
      }).then((json) => {
        if (json.ret === 5) {
          window.openLogin()
        }
        resolve(json)
      }).catch((ex) => {
        reject(ex)
      })
    })
  },
  GetOrderDetails: (orderId) => {
    return new Promise((resolve, reject) => {
      http.get('/h5/orderDetail?orderId=' + orderId + '&qtype=json')
      .then((res) => {
        return res.json()
      }).then((json) => {
        if (json.ret === 5) {
          window.openLogin()
        }
        resolve(json)
      }).catch((ex) => {
        reject(ex)
      })
    })
  },
  GetExpressDetails: (expressId) => {
    return new Promise((resolve, reject) => {
      http.get('/h5/traceExpress?expressId=' + expressId + '&qtype=json')
      .then((res) => {
        return res.json()
      }).then((json) => {
        if (json.ret === 5) {
          window.openLogin()
        }
        resolve(json)
      }).catch((ex) => {
        reject(ex)
      })
    })
  },
  GetLocationSub: (zipCode) => {
    var url = CONFIG.SSOURL + '/location/sub'
    if (zipCode !== undefined && zipCode !== '') {
      url += '?zipCode=' + zipCode
    }
    return new Promise((resolve, reject) => {
      http.jsonp(url).then((res) => {
        return res.json()
      })
      .then((json) => {
        console.log(json)
        resolve(json)
      }).catch((ex) => {
        reject(ex)
      })
    })
  },
  GetCsrfToken: () => {
    return new Promise((resolve, reject) => {
      http.get('/h5/getAddrs?qtype=json')
    })
  }
}

export default store
