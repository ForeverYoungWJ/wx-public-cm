
function createUIID() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
  }

  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4()
}

export function getUUID() {
  var UUID = getCookie('UUID')
  if (!UUID) {
    UUID = createUIID()
    setCookie('UUID', UUID)
  }
  return UUID
}

// 截取微信code state
export function getParam() {
  let params = location.search
  let pMap = []
  if (params.indexOf('?') !== -1) {
    params = params.substr(1).split('&')
    for (let i = 0; i < params.length; i++) {
      let param = params[i].split('=')
      pMap[param[0]] = param[1]
    }
  }
  return pMap
}

// 获取cookie、
export function getCookie(name) {
  var v = window.document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)')
  return v ? v[2] : null
}

// 设置cookie
export function setCookie(name, value, days) {
  var d = new Date()
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days)
  window.document.cookie = name + '=' + value + ';path=/;expires=' + d.toGMTString()
}

// 删除cookie
export function delCookie(name) {
  setCookie(name, '', -1)
}

// 安卓设备
export function isAndroid() {
  const u = navigator.userAgent
  return u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 // android终端
}

// IOS设备
export function isiOS() {
  const u = navigator.userAgent
  return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // iso终端
}

// 微信内部浏览器
export function isWeiXin() {
  return navigator.userAgent.match('MicroMessenger') // 微信内部浏览器
}

// 手机 移动端设备
export function isMobile() {
  return navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i) // 移动端
}

// PC端设备
export function isPC() {
  let userAgentInfo = navigator.userAgent
  let Agents = ['Android', 'iPhone',
    'SymbianOS', 'Windows Phone',
    'iPad', 'iPod']
  let flag = true
  for (let v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
}

// 时间搓转换为日期
export function timestampToTime(timestamp) {
  var date = new Date(timestamp * 1000)// 时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + '-'
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  var D = date.getDate() + ' '
  var h = date.getHours() + ':'
  var m = date.getMinutes() + ':'
  var s = date.getSeconds()
  return Y + M + D + h + m + s
}
