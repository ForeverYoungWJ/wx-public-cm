import Vue from 'vue'
import App from './App.vue'
import 'lib-flexible'
// import axios from 'axios'
import router from './router'
import store from './store'
import $api from './serve/api'
import $Wx from './serve/wx'
import Axios from './serve/axios'
import VueJsonp from 'vue-jsonp'
import { isWeiXin } from './util/util';
import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')

Vue.use(VueJsonp)

Vue.use(VideoPlayer)

Vue.config.productionTip = false
Vue.prototype.$wx = $Wx
Vue.prototype.$api = $api
Vue.prototype.$axios = Axios
Vue.prototype.$store = store
// Vue.prototype.$jsonp = Jsonp

// 请求微信分享接口
$Wx.getSignature();

if (!isWeiXin()) {
  let userInfo = {
    city: '闵行',
    country: '中国',
    createtime: 1578452463,
    groupid: 0,
    guid: 'd08850e6-1174-44c2-a4d1-cdd86941151a',
    headimgurl: 'http://thirdwx.qlogo.cn/mmopen/1qicbxj5F6nqEEySHibqPfXtVibibiblL2uYYKyEeDDqjUt2Zw4ZZ8ITGj7mDuW1KjhuTI5BPFFF479ziaAcibNT1h8BEVXibJ2YZPCc/132',
    id: '19',
    language: 'zh_CN',
    nickname: '曾小閑||不闲',
    openid: 'oHMma1I1t3fBHVQsPt_T56A5PvsE',
    province: '上海',
    qr_scene: 0,
    qr_scene_str: '',
    remark: '',
    sex: 1,
    subscribe: 1,
    subscribe_scene: 'ADD_SCENE_SEARCH',
    subscribe_time: 1575449051,
    tagid_list: []
  };
  window.sessionStorage.setItem('ZHJOpenid', 'oHMma1I1t3fBHVQsPt_T');// openid 临时存储 浏览器关闭会清空
  window.sessionStorage.setItem('ZHJUserInfo', JSON.stringify(userInfo));// 用户信息存入 临时存储 浏览器关闭会清空
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
