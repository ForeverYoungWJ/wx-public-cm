import axios from './axios'
import $store from '../store'
import {getParam} from "../util/util";

let wx = require('weixin-js-sdk')

let hideItems = ['menuItem:share:appMessage', 'menuItem:share:timeline', 'menuItem:favorite',
  'menuItem:exposeArticle', 'menuItem:setFont', 'menuItem:dayMode', 'menuItem:nightMode', 'menuItem:refresh',
  'menuItem:share:qq', 'menuItem:share:weiboApp', 'menuItem:share:facebook', 'menuItem:share:QZone',
  'menuItem:editTag', 'menuItem:delete', 'menuItem:copyUrl', 'menuItem:originPage', 'menuItem:readMode',
  'menuItem:openWithQQBrowser', 'menuItem:openWithSafari', 'menuItem:share:email', 'menuItem:share:brand']

let showItems = ['menuItem:share:appMessage', 'menuItem:share:timeline',
  'menuItem:copyUrl', 'menuItem:share:qq', 'menuItem:share:weiboApp',
  'menuItem:favorite', 'menuItem:share:facebook', 'menuItem:share:QZone',
  'menuItem:openWithQQBrowser', 'menuItem:openWithSafari']

// 分享到朋友圈
let shareAppOpts = {
  title: '示范党群服务点',
  desc: '不忘初心 牢记使命',
  link: location.href, //
  imgUrl: require('../assets/wx/share.jpg')
}

// 分享给朋友
var shareTimelineOpts = {
  title: '示范党群服务点',
  link: location.href, //
  imgUrl: require('../assets/wx/share.jpg') //
}

function isWeiXin () {
  return navigator.userAgent.match('MicroMessenger')
}

function initWX (json) {
  wx.config({
    debug: false, // 开启调试模式,成功失败都会有alert框
    appId: json.appId,
    timestamp: json.timestamp,
    nonceStr: json.nonceStr,
    signature: json.signature,
    jsApiList: ['checkJsApi', 'onMenuShareTimeline',
      'onMenuShareAppMessage', 'hideMenuItems', 'showMenuItems', 'chooseImage', 'uploadImage', 'openLocation',
      'getLocation']
  })
}

export default {
  // 微信签名
  getSignature () {
    let self = this

    // 进行签名的时候  Android 不用使用之前的链接， ios 需要
    let signLink = /(Android)/i.test(navigator.userAgent) ? location.href.split('#')[0] : window.entryUrl
    // if (!isWeiXin()) {
    //   return false
    // }

    return axios.request({
      url: 'http://cm.legions.tech/api/wx/index/buildConfig',
      data: {
        url: signLink
      }
    }).then((res) => {
      let statusCode = parseInt(res.code)
      if (statusCode == 1) {
        initWX(res.data)
        self.refreshShareData()
      }
    }).catch(err => {
      // alert(err)
    })
  },

  // 获取openID
  getOpenId () {
    let self = this

    // if (!isWeiXin()) {
    //   return false
    // }

    return axios.request({
      url: 'http://cm.legions.tech/api/wx/user/oauth',
      data: {
        code: getParam()['code']
      }
    }).then((res) => {
      let statusCode = parseInt(res.code)
      if (statusCode === 1) {
        let openid = res.data.openid
        let userInfo = res.data
        $store.commit('setOpenId', openid)
        $store.commit('setUserInfo', userInfo)
        window.sessionStorage.setItem('ZHJOpenid', openid);//openid 临时存储 浏览器关闭会清空
        window.sessionStorage.setItem('ZHJUserInfo', JSON.stringify(userInfo));//用户信息存入 临时存储 浏览器关闭会清空
      }
    }).catch(err => {
      // alert(err)
    })
  },

  refreshShareData () {
    wx.ready(function () {
      // onMenuShareAppMessage 接口 —“分享给朋友”按钮点击状态及自定义分享内容
      wx.onMenuShareAppMessage({
        title: shareAppOpts.title,
        desc: shareAppOpts.desc,
        link: shareAppOpts.link,
        imgUrl: shareAppOpts.imgUrl,
        success: function () {
          let cb = shareAppOpts.success
          if (cb) {
            cb.call(shareAppOpts.scope)
          }
        }
      })

      // 微信“分享到朋友圈”接口—— wx.onMenuShareTimeline()
      wx.onMenuShareTimeline({
        title: shareTimelineOpts.title || shareAppOpts.title,
        link: shareTimelineOpts.link || shareAppOpts.link,
        imgUrl: shareTimelineOpts.imgUrl || shareAppOpts.imgUrl,
        success: function () {
          let cb = shareTimelineOpts.success
          if (cb) {
            cb.call(shareTimelineOpts.scope)
          }
        }
      })
    })
  },

  // 重新负值 “分享给朋友”    在调一次 调值refreshShareData
  setShareAppData (inOpts) {
    shareAppOpts.link = inOpts
  },

  // 重新负值  “分享到朋友圈”   在调一次 调值refreshShareData
  setShareTimelineData (inOpts) {
    shareTimelineOpts.link = inOpts
  },

  previewImage (inOpts) {
    wx.previewImage({
      current: inOpts.current, // 当前显示图片的http链接
      urls: inOpts.urls // 需要预览的图片http链接列表
    })
  },

  // 禁用分享
  hideMenuItems () {
    wx.ready(function () {
      wx.hideMenuItems({
        menuList: hideItems
      })
    })
  },

  showMenuItems () {
    wx.ready(function () {
      wx.showMenuItems({
        menuList: showItems
      })
    })
  },

  // 获取经纬度
  getLocation () {
    wx.ready(function () {
      wx.getLocation({
        type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        success: function (res) {
          alert(JSON.stringify(res))
          // 使用微信内置地图查看位置接口
          // wx.openLocation({
          //   latitude: res.latitude, // 纬度，浮点数，范围为90 ~ -90
          //   longitude: res.longitude, // 经度，浮点数，范围为180 ~ -180。
          //   name: '我的位置', // 位置名
          //   address: '中国海洋大学', // 地址详情说明
          //   scale: 28, // 地图缩放级别,整形值,范围从1~28。默认为最大
          //   infoUrl: 'http://www.haiyangdaxue.com' // 在查看位置界面底部显示的超链接,可点击跳转（测试好像不可用）
          // })
        }
      })
    })
  }

}
