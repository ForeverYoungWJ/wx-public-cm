<template>
  <div class="laba">
    <div class="jt-bg"></div>
    <div class="abs head-tit"><img :src="heaUrl"></div>
    <div class="abs return" @click="retFun()"><img :src="retUrl"></div>
    <div class="abs abs-center tishi">{{tishiText}}</div>
    <div class="abs abs-center lb-1" @click="lb1Fun"><img :src="lb1Url"></div>
    <div class="abs abs-center lb-2" @click="lb2Fun"><img :src="lb2Url"></div>
    <audio preload="auto" loop="loop" :src="lb1" ref="audio1"></audio>
    <audio preload="auto" loop="loop" :src="lb2" ref="audio2"></audio>
  </div>
</template>

<script>

  export default {
    name: 'laba',

    //组件
    components: {},

    //初始数据
    data() {
      return {
        tishiText: '点击下方按钮，播放/暂停 田间小喇叭',
        lb1: require('../assets/lb/h.mp3'),
        lb2: require('../assets/lb/z.mp3'),
        heaUrl: require('../assets/jiaotong/hea.png'),
        retUrl: require('../assets/jiaotong/return.png'),
        lb1Url: require('../assets/lb/h.png'),
        lb2Url: require('../assets/lb/z.png'),
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
    },

    //销毁后
    destroyed() {
    },

    //监听
    watch: {},

    //调用的方法
    methods: {
      //返回
      retFun: function () {
        this.$router.push('gl');
      },
      //黄锦
      lb1Fun() {
        // audio.currentTime = 0;//重新播放
        let self = this;
        let audio = self.$refs.audio1;
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
  .laba {
    height: 100%;
  }

  .jt-bg {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url("../assets/jiaotong/bg.jpg");
  }

  .head-tit {
    width: 750px;
    top: 40px;
    left: 50%;
    margin-left: -375px;
  }

  .return {
    width: 36px;
    top: 20px;
    left: 36px;
  }

  .lb-1 {
    width: 280px;
    margin-top: -180px;
  }

  .lb-2 {
    width: 280px;
    margin-top: 240px;
  }

  .tishi {
    color: #00f5ff;
    font-size: 28px;
    width: 100%;
    margin-top: -472px;
    margin-left: 40px;
  }
</style>
