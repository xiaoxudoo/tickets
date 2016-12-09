
export function fromNow (time) {
  if (time < 1800) {
    let m = pluralize(parseInt(time / 60))

    let s = pluralize(time - 60 * m)

    return m + '分' + s + '秒'
  } else {
    return '00分00秒'
  }
}

export function asterisk (tel) {
  tel = tel.trim()
  return tel.slice(0, 3) + '****' + tel.slice(-4)
}

export function cutToShort (val) {
  return val.slice(0, 12) // 优惠券保留12个中文字符
}

export function cutToShortSeven (val) {
  return val.slice(0, 7) // 优惠券保留7个中文字符
}

export function convertStatus (status, isExpress) {
  if (parseInt(isExpress) === 1) {
    return '已发货'
  } else {
    switch (parseInt(status)) {
      case 0:
        return '待支付'
      case 1:
        return '支付中'
      case 2:
        return '已支付'
      case 3:
        return '支付失败'
      default:
        return '其他'
    }
  }
}

export function uniform (money) {
  if (parseFloat(money) < 0) {
    money = -parseFloat(money)
  }
  return Number(money).toFixed(2)
}

function pluralize (s) {
  if (s < 10) {
    s = '0' + s
  }

  return s
}
