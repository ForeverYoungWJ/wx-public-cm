import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import $wx from '../serve/wx'
import $store from '../store'
import { isWeiXin, getParam } from '../util/util'

Vue.use(VueRouter)

Vue.use(ElementUI)

const routes = [
  {
    path: '/load',
    name: 'load',
    component: () => import('../views/Load.vue'),
    meta: {
      footBar: false
    }
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/Home.vue'),
    meta: {
      footBar: true
    }
  },
  {
    path: '/dj',
    name: 'dj',
    component: () => import('../views/Dj.vue'),
    meta: {
      footBar: true
    }
  },
  {
    path: '/ms',
    name: 'ms',
    component: () => import('../views/Ms.vue'),
    meta: {
      footBar: true
    }
  },
  {
    path: '/sf',
    name: 'sf',
    component: () => import('../views/Sf.vue'),
    meta: {
      footBar: true
    }
  },
  {
    path: '/ny',
    name: 'ny',
    component: () => import('../views/Ny.vue'),
    meta: {
      footBar: true
    }
  },
  {
    path: '/gl',
    name: 'gl',
    component: () => import('../views/Gl.vue'),
    meta: {
      footBar: true
    }
  },
  {
    path: '/wt',
    name: 'wt',
    component: () => import('../views/Wt.vue'),
    meta: {
      footBar: true
    }
  },
  {
    path: '/jt',
    name: 'jt',
    component: () => import('../views/Jt.vue'),
    meta: {
      footBar: false
    }
  },
  {
    path: '/dw',
    name: 'dw',
    component: () => import('../views/Dw.vue'),
    meta: {
      footBar: false
    }
  },
  {
    path: '/lb',
    name: 'lb',
    component: () => import('../views/Lb.vue'),
    meta: {
      footBar: false
    }
  },
  {
    path: '/dq',
    name: 'dq',
    component: () => import('../views/Dq.vue'),
    meta: {
      footBar: false
    }
  },
  {
    path: '/xy',
    name: 'xy',
    component: () => import('../views/Xy.vue'),
    meta: {
      footBar: false
    }
  },
  {
    path: '/hz',
    name: 'hz',
    component: () => import('../views/Hz.vue'),
    meta: {
      footBar: false
    }
  },
  {
    path: '/hzdt',
    name: 'hzdt',
    component: () => import('../views/HzDetail.vue'),
    meta: {
      footBar: false
    }
  },
  {
    path: '/dk',
    name: 'dk',
    component: () => import('../views/Dk.vue'),
    meta: {
      footBar: false
    }
  },
  {
    path: '/zc',
    name: 'zc',
    component: () => import('../views/Zc.vue'),
    meta: {
      footBar: false
    }
  },
  {
    path: '/hs',
    name: 'hs',
    component: () => import('../views/Hs.vue'),
    meta: {
      footBar: false
    }
  },
  {
    path: '/wg',
    name: 'wg',
    component: () => import('../views/Wg.vue'),
    meta: {
      footBar: false
    }
  },
  {
    path: '/ljfk',
    name: 'ljfk',
    component: () => import('../views/Ljfk.vue'),
    meta: {
      footBar: false
    }
  },
  {
    path: '/rl',
    name: 'rl',
    component: () => import('../views/Rl.vue'),
    meta: {
      footBar: false
    }
  },
  {
    path: '/zb',
    name: 'zb',
    component: () => import('../views/Zb.vue'),
    meta: {
      footBar: true
    }
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('../views/User.vue'),
    meta: {
      footBar: true
    }
  },
  {
    path: '/message',
    name: 'message',
    component: () => import('../views/Message.vue'),
    meta: {
      footBar: true
    }
  },
  {
    path: '/dyList',
    name: 'dyList',
    component: () => import('../views/DyList.vue'),
    meta: {
      footBar: false
    }
  },
  {
    path: '/fuWu',
    name: 'fuWu',
    component: () => import('../views/Fw.vue'),
    meta: {
      footBar: false
    }
  },
  {
    path: '/active',
    name: 'active',
    component: () => import('../views/Active.vue'),
    meta: {
      footBar: false
    }
  },
  {
    path: '/shou',
    name: 'shou',
    component: () => import('../views/Shou.vue'),
    meta: {
      footBar: false
    }
  },
  {
    path: '/Gg',
    name: 'Gg',
    component: () => import('../views/Gg.vue'),
    meta: {
      footBar: false
    }
  },
  {
    path: '/Hk',
    name: 'Hk',
    component: () => import('../views/Hk.vue'),
    meta: {
      footBar: false
    }
  },
  {
    path: '/wxy',
    name: 'wxy',
    component: () => import('../views/Wxy.vue'),
    meta: {
      footBar: false
    }
  },
  {
    path: '/dkzb',
    name: 'dkzb',
    component: () => import('../views/DKZb.vue'),
    meta: {
      footBar: false
    }
  },
  {
    path: '/home2',
    name: 'home2',
    component: () => import('../views/Home2.vue'),
    meta: {
      footBar: true
    }
  }
]

const router = new VueRouter({
  mode: 'hash', // history指定服务器目录
  // base: '/vue-h5', //process.env.BASE_URL
  // 跳转页面 定位为顶部
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes
})

// 判定必须为微信环境
if(!isWeiXin()){
  window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=888"
}


export default router
