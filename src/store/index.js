import Vue from 'vue'
import Vuex from 'vuex'
import { getParam } from '../util/util'
Vue.use(Vuex)

export default new Vuex.Store({
  //  这里相当于Vue实例中的data，用于存放数据
  state: {
    WxIosUrl: '',
    WxCode: getParam()['code'],
    WxOpenId: '',
    WxUserInfo: {}
  },
  //  这里相当于Vue实例中的methods，用于定义方法 所有的方法都过来拿
  mutations: {
    // 微信首次进入Url 用于Iso 微信签名
    setWxIosUrl (state, url) {
      state.WxIosUrl = url
    },
    // 微信头部code
    setWxCode (state, code) {
      state.WxCode = code
    },
    // 微信openID
    setOpenId (state, openid) {
      state.WxOpenId = openid
    },
    // 微信用户数据
    setUserInfo (state, data) {
      state.WxUserInfo = data
    }
  },
  actions: {
  },
  modules: {
  }
})
