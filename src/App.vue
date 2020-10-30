<template>
  <div id="app">
    <router-view/>
    <!--底部footer导航-->
    <!--    v-show="this.$route.meta.footBar"-->
    <van-tabbar class="ft-bar" v-model="active" active-color="#2f78fe" inactive-color="#979797"
                v-show="this.$route.meta.footBar">
      <!--      :icon="item.icon" :name="item.name"-->
      <van-tabbar-item v-for="(item, index) in ftList" :key="index" replace
                       :to="item.ref">
        <span> {{item.title}}</span>
        <img class="ft-img" :class="item.imgClc" slot="icon" slot-scope="props"
             :src="props.active ? item.active : item.normal">
      </van-tabbar-item>
<!--      <div class="abs abs-center qian-ico"><img :src="qianUrl"></div>-->
    </van-tabbar>
  </div>
</template>
<script>
  import {isWeiXin} from "util/util";

  let homeIco = require('./assets/foot/home.png');
  let homeIco2 = require('./assets/foot/home-a.png');
  let messageIco = require('./assets/foot/xx.png');
  let messageIco2 = require('./assets/foot/xx-a.png');
  // let signInIco = require('./assets/foot/kong.png');//jia
  // let signInIco2 = require('./assets/foot/kong.png');
  let playIco = require('./assets/foot/zb.png');
  let playIco2 = require('./assets/foot/zb-a.png');
  let userIco = require('./assets/foot/my.png');
  let userIco2 = require('./assets/foot/my-a.png');

  import {Tabbar, TabbarItem} from 'vant';

  export default {
    name: 'app',
    components: {
      [Tabbar.name]: Tabbar,
      [TabbarItem.name]: TabbarItem,
    },
    data() {
      return {
        // qianUrl:require('./assets/home/jia.png'),
        active: 0,
        ftList: [{
          name: 'home',
          imgClc: 'f-1',
          // icon: 'wap-home-o',
          ref: '/home',
          title: '首页',
          normal: homeIco,
          active: homeIco2,
        },{
          name: 'message',
          imgClc: 'f-2',
          // icon: 'wap-home-o',
          ref: '/message',
          title: '消息',
          normal: messageIco,
          active: messageIco2,
        }, {
          imgClc: 'f-4',
          name: 'play',
          // icon: 'contact',
          ref: '/zb',//play
          title: '主播秀',
          normal: playIco,
          active: playIco2,
        }, {
          imgClc: 'f-5',
          name: 'user',
          // icon: 'contact',
          ref: '/user',//user
          title: '我的',
          normal: userIco,
          active: userIco2,
        }],

      }
    },
    watch: {
      $route() {
        // this.$wx.getSignature();
      }
    },
    beforeCreate() {
      // let self = this;
      // let userInfo = JSON.parse(sessionStorage.getItem('volunteerUserInfo'));
      let openid = window.sessionStorage.getItem("ZHJOpenid");
      if (!openid || openid === '') {
        this.$wx.getOpenId().then(() => {
          this.$router.push('load');
        });
      } else {
        this.$router.push('load');
      }

    },
    created() {
      switch (this.$route.name) {
        case 'home':
          this.active = 0;
          break;
        case 'message':
          this.active = 1;
          break;
        case 'signIn':
          this.active = 2;
          break;
        case 'play':
          this.active = 3;
          break;
        case 'user':
          this.active = 4;
          break;

      }

    },
    methods: {}
  }
</script>

<style lang="scss" type="text/scss">
  @import './styles/app.scss';

  .page {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 108px;
    overflow: hidden;
    overflow-y: auto;
  }

  .ft-bar {
    height: 108px;
    border: 1px solid hsl(0, 0%, 85%);
  }

  .f-1 {
    width: 64px;
  }

  .f-2 {
    width: 32px;
  }

  /*.f-3 {*/
  /*  width: 44px;*/
  /*}*/

  .f-4 {
    width: 36px;
  }

  .f-5 {
    width: 36px;
  }
  /*.qian-ico {*/
  /*  width: 80px;*/
  /*  margin-top: -40px;*/
  /*  z-index: 20;*/
  /*}*/
  /*.item-ipt {*/
  /*  border:1px solid #dfdede;*/
  /*  border-radius: 10px;*/
  /*}*/
</style>
<!--{-->
<!--imgClc: 'f-2',-->
<!--name: 'message',-->
<!--// icon: 'bag-o',-->
<!--ref: '/home',//message-->
<!--title: '消息',-->
<!--normal: messageIco,-->
<!--active: messageIco2,-->
<!--},-->
<!--, {-->
<!--imgClc: 'f-3',-->
<!--name: 'signIn',-->
<!--// icon: 'cart-o',-->
<!--ref: '/home',//signIn-->
<!--title: '签到',-->
<!--normal: signInIco,-->
<!--active: signInIco2,-->
<!--}-->
