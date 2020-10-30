<template>
  <div class="music-btn" :class="toggleState" v-show="audioVisible" @click="toggleAudioPlay">
    <div class="icon-music icon-music-on"></div>
    <div class="icon-music icon-music-off"></div>
    <audio preload="auto" loop="loop" :src="music" ref="audio"></audio>
  </div>
</template>

<script>
  let wx = require('weixin-js-sdk');
  export default {
    data() {
      return {
        toggleState: 'off',
        audioVisible: false,
        music: require('../assets/music/bg.mp3')
      }
    },
    methods: {
      toggleAudioPlay() {
        let self = this;
        let audio = self.$refs.audio;
        if (self.toggleState === 'off') {
          self.toggleState = 'on';
          audio.play()
        } else {
          self.toggleState = 'off';
          audio.pause()
        }
      }
    },
    created() {
      let self = this;
      self.$nextTick(() => {
        let isWeiXin = navigator.userAgent.match('MicroMessenger');
        let audio = self.$refs.audio;
        if (isWeiXin) {
          document.addEventListener("WeixinJSBridgeReady", () => {
            audio.load();
            audio.play();
            self.toggleState = 'on';
            self.audioVisible = true;
          }, false);
          wx.ready(() => {
            audio.load();
            audio.play();
            self.toggleState = 'on';
            self.audioVisible = true;
          });
        } else {
          audio.load();
          // audio.play();
          self.toggleState = 'on';
          self.audioVisible = true;
        }
      })
    }
  }
</script>

<style lang="scss" scoped>

</style>
