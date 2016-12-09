(function (doc, win) {
    var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
        var clientWidth = docEl.clientWidth;
        if (!clientWidth) return;
        docEl.style.fontSize = 10 * (clientWidth / 100) + 'px';
    };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
    var imgs = document.images;
    for(var i = 0;i < imgs.length;i++){
        imgs[i].onerror = function(){
            this.src = "http://i2.letvimg.com/lc07_letvsports/201610/24/10/43/loaderr.jpg";
        }
    }
})(document, window);
// 封装cookie操作的方法
var CookieUtils = {
  get: function (name) {
    var cookieName = encodeURIComponent(name) + '=',
        cookieStart = document.cookie.indexOf(cookieName),
        cookieValue = null;
    if (cookieStart > -1) {
        var cookieEnd = document.cookie.indexOf(';', cookieStart);
        if (cookieEnd == -1) {
            cookieEnd = document.cookie.length;
        }
        cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
    }
    return cookieValue;
  },
  set: function (name, value, expires, path, domain, secure) {
    var cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value);
    if (expires instanceof Date) {
        cookieText += "; expires=" + expires.toUTCString();
    }
    if (path) {
        cookieText += "; path=" + path;
    } else {
        cookieText += "; path=/";
    }
    if (domain) {
        cookieText += "; domain=" + domain;
    }
    if (secure) {
        cookieText += "; secure";
    }
    document.cookie = cookieText;
  },
  unset: function (name, path, domain, secure) {
    this.set(name, "", new Date(0), path, domain, secure);
    this.set(name, "", new Date(0), "/", domain, secure);
  }
};
// 兼容localStorage
if (!window.localStorage) {
  Object.defineProperty(window, "localStorage", new (function () {
    var aKeys = [], oStorage = {};
    Object.defineProperty(oStorage, "getItem", {
      value: function (sKey) { return sKey ? this[sKey] : null; },
      writable: false,
      configurable: false,
      enumerable: false
    });
    Object.defineProperty(oStorage, "key", {
      value: function (nKeyId) { return aKeys[nKeyId]; },
      writable: false,
      configurable: false,
      enumerable: false
    });
    Object.defineProperty(oStorage, "setItem", {
      value: function (sKey, sValue) {
        if(!sKey) { return; }
        document.cookie = escape(sKey) + "=" + escape(sValue) + "; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/";
      },
      writable: false,
      configurable: false,
      enumerable: false
    });
    Object.defineProperty(oStorage, "length", {
      get: function () { return aKeys.length; },
      configurable: false,
      enumerable: false
    });
    Object.defineProperty(oStorage, "removeItem", {
      value: function (sKey) {
        if(!sKey) { return; }
        document.cookie = escape(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
      },
      writable: false,
      configurable: false,
      enumerable: false
    });
    this.get = function () {
      var iThisIndx;
      for (var sKey in oStorage) {
        iThisIndx = aKeys.indexOf(sKey);
        if (iThisIndx === -1) { oStorage.setItem(sKey, oStorage[sKey]); }
        else { aKeys.splice(iThisIndx, 1); }
        delete oStorage[sKey];
      }
      for (aKeys; aKeys.length > 0; aKeys.splice(0, 1)) { oStorage.removeItem(aKeys[0]); }
      for (var aCouple, iKey, nIdx = 0, aCouples = document.cookie.split(/\s*;\s*/); nIdx < aCouples.length; nIdx++) {
        aCouple = aCouples[nIdx].split(/\s*=\s*/);
        if (aCouple.length > 1) {
          oStorage[iKey = unescape(aCouple[0])] = unescape(aCouple[1]);
          aKeys.push(iKey);
        }
      }
      return oStorage;
    };
    this.configurable = false;
    this.enumerable = true;
  })());
}
function sportsLogin(cb) {
  LEPass.isHasLogin(function (res) {
    console.log('set login');
    if (res.islogin != 1) {
        console.log(res);
        LEPass.logOut(function (res) {
            CookieUtils.unset("sp_sso_tk", "/");
            CookieUtils.unset("sp_sso_uname", "/");
            CookieUtils.unset("sp_sso_ukey", "/");
            var expDate = new Date(new Date().setTime(new Date().getTime() + 24 * 60 * 60 * 1000));
            var path = "/";
            if (IsPC()) {
                //PC登录弹窗
                LEPass.openLoginDialog(function (res) {
                    console.log(JSON.stringify(res));
                    // 登录成功回调
                    CookieUtils.set("sp_sso_tk", res.userinfo.uid, expDate, path);
                    CookieUtils.set("sp_sso_uname", res.userinfo.unickName, expDate, path);
                    CookieUtils.set("sp_sso_ukey", res.userkey, expDate, path);
                    CookieUtils.set("sp_sso_avatar", res.userinfo.uheadpic["headicon_70"], expDate, path);
                    if (cb && typeof(cb) == "function") {
                        cb(res);
                    }
                    //location.reload();
                }, function () {
                    location.reload();
                }, {
                    plat: 'sports_mall',
                    isForce: false,
                    isSetCookie: 1
                });

            } else {
                //H5登录跳转
                href = '' // window.location.host + '/H5/personal.html'
                LEPass.openLoginPage(href, "_self", {
                    plat: 'sports_cn_203_ticket',
                    isForce: false,
                    vertical: true,
                    isGlobal: false,
                    isSetCookie: 1
                });
            }
        });
    } else {
        console.log('set else..');
        var refreshFlag = false;
        if (CookieUtils.get('sp_sso_tk') != res.userinfo.uid) {
          refreshFlag = true;
        }
        var expDate = new Date(new Date().setTime(new Date().getTime() + 24 * 60 * 60 * 1000));
        var path = "/";
        CookieUtils.set("sp_sso_tk", res.userinfo.uid, expDate, path);
        CookieUtils.set("sp_sso_uname", res.userinfo.unickName, expDate, path);
        CookieUtils.set("sp_sso_ukey", res.userkey, expDate, path);
        CookieUtils.set("sp_sso_avatar", res.userinfo.uheadpic["headicon_70"], expDate, path);
        if (cb && typeof(cb) == "function") {
            cb(res);
        }
        if (refreshFlag) {
          location.reload();
        }
    }
  }, {
    isSetCookie: 1
  });
}
function sportsLogout(cb) {
  LEPass.logOut(function (res) {
    CookieUtils.unset("sp_sso_tk", "/");
    CookieUtils.unset("sp_sso_uname", "/");
    CookieUtils.unset("sp_sso_ukey", "/");
    CookieUtils.unset("sp_sso_avatar", "/");
    if (cb && typeof(cb) == "function")
        cb(res);
  });
}
function IsPC() {
  var userAgentInfo = navigator.userAgent;
  var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod", "micromessenger");
  var flag = true;
  for (var v = 0; v < Agents.length; v++) {
      if (userAgentInfo.indexOf(Agents[v]) > 0) {
          flag = false;
          break;
      }
  }
  return flag;
}
function getParams() {
  if(location.href.indexOf('?') > -1 ){
      var href = location.href.split('?')[1];
          href = href.split('&');
      var rst = [];
      for(var i = 0; i < href.length; i ++) {
          rst[href[i].split("=")[0]]=unescape(href[i].split("=")[1]);
      }
      return rst
  }
}

function openLogin(){
  LEPass.logOut(function (res) {
    CookieUtils.unset("sp_sso_tk", "/");
    CookieUtils.unset("sp_sso_uname", "/");
    CookieUtils.unset("sp_sso_ukey", "/");
    var expDate = new Date(new Date().setTime(new Date().getTime() + 24 * 60 * 60 * 1000));
    var path = "/";
    if (IsPC()) {
      //PC登录弹窗
      LEPass.openLoginDialog(function (res) {
        // 登录成功回调
        CookieUtils.set("sp_sso_tk", res.userinfo.uid, expDate, path);
        CookieUtils.set("sp_sso_uname", res.userinfo.unickName, expDate, path);
        CookieUtils.set("sp_sso_ukey", res.userkey, expDate, path);
        CookieUtils.set("sp_sso_avatar", res.userinfo.uheadpic["headicon_70"], expDate, path);
        if (cb && typeof(cb) == "function") {
          cb(res);
        }
        //location.reload();
      }, function () {
        location.reload();
      }, {
        plat: 'sports_cn_203_ticket',
        isForce: false,
        isSetCookie: 1
      });

    } else {
      //H5登录跳转
      href = '' // window.location.host + '/H5/personal.html'
      LEPass.openLoginPage(href, "_self", {
        plat: 'sports_cn_203_ticket',
        isForce: false,
        vertical: true,
        isGlobal: false,
        isSetCookie: 1
      });
    }
  });
}


