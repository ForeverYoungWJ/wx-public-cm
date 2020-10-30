<template>
  <div class="ZhuBo">
    <div class="banner"><img :src="bannerImg"></div>
    <div class="abs zb-box">
      <div class="abs abs-center lb-1" @click="lb1Fun"><img :src="lb1Url"></div>
      <div class="abs abs-center lb-2" @click="lb2Fun"><img :src="lb2Url"></div>
    </div>
    <audio preload="auto" loop="loop" :src="lb1" ref="audio1"></audio>
    <audio preload="auto" loop="loop" :src="lb2" ref="audio2"></audio>
  </div>
</template>

<script>
  let wx = require('weixin-js-sdk');
  let u = navigator.userAgent;
  let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  let isWeiXin = navigator.userAgent.match('MicroMessenger');

  import { NavBar } from 'vant';
  export default {
    name: 'ZhuBo',

    //组件
    components: { [NavBar.name]: NavBar},

    //初始数据
    data() {
      return {
        bannerImg:require('../assets/zb/banner.png'),
        lb1: 'https://legions.oss-cn-shanghai.aliyuncs.com/chongMing/wx-music/z.mp3',//require('../assets/lb/z.mp3')
        lb2:'https://legions.oss-cn-shanghai.aliyuncs.com/chongMing/wx-music/h.mp3',//require('../assets/lb/h.mp3')
        lb1Url: require('../assets/zb/nan.png'),
        lb2Url: require('../assets/zb/nv.png'),
      }
    },

    //创建前
    beforeCreate() {
    },

    //创建后
    created() {

    },

    //挂在开始之前被调用
    beforeMount() {
    },

    //挂在完成 只会执行一次。
    mounted() {
    },

    //更新前
    beforeUpdata() {
    },

    //更新后
    updated() {
    },

    //销毁前
    beforeDestrioy() {
      let self = this;
      let audio1 = self.$refs.audio1;
      let audio2 = self.$refs.audio2;
      audio1.pause();// 暂停
      audio2.pause();// 暂停
    },

    //销毁后
    destroyed() {

    },

    //监听
    watch: {},

    //调用的方法
    methods: {
      //黄锦
      lb1Fun() {
        // audio.currentTime = 0;//重新播放
        let self = this;
        let audio = self.$refs.audio1;
        document.addEventListener("WeixinJSBridgeReady", function () {//微信
          if(audio.paused){
            audio.play();// 播放
          }else{
            audio.pause();// 暂停
          }
        }, false);
        if(audio.paused){
          audio.play();// 播放
        }else{
          audio.pause();// 暂停
        }

      },
      //张佳琪
      lb2Fun() {
        let self = this;
        let audio = self.$refs.audio2;

        document.addEventListener("WeixinJSBridgeReady", function () {//微信
          if(audio.paused){
            audio.play();// 播放
          }else{
            audio.pause();// 暂停
          }
        }, false);

        if(audio.paused){
          audio.play();// 播放
        }else{
          audio.pause();// 暂停
        }
      }
    },

  }
</script>

<style lang="scss" type="text/scss" scoped>
  .ZhuBo {
    height: 100%;
    background-color: #fcf8ee;
  }
  .banner{
    width: 100%;
    height: 344px;
  }
  .zb-box{
    top: 360px;
    left: 40px;
    right: 40px;
    bottom: 120px;
  }
  .lb-1 {
    width:100%;
    margin-top: -220px;
  }

  .lb-2 {
    width: 100%;
    margin-top: 60px;
  }

</style>
