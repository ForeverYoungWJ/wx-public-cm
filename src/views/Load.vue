<script src="../../../../../Downloads/trtc.js"></script>
<template>
  <div class="page load">
    <div class="page-bg"></div>
    <div class="abs abs-center percent">
      <div class="percent-num">{{percent}}</div>
      <div class="wth-box">
        <span class="percent-wth" :style="{'width':percent}"></span>
      </div>
    </div>
  </div>
</template>

<script>
  import config from '../config/config'
  import PxLoader from 'pxloader' //欲加载
  import PxLoaderImage from 'pxloader/PxLoaderImage'

  export default {
    name: 'load',
    data() {
      return {
        percent: '0%',
      }
    },
    created() {
      this.loadImages();
    },
    methods: {
      loadImages() {
        let self = this;
        let imageList = config.imageList;
        let loader = self._loader = new PxLoader();
        if (imageList && imageList.length > 0) {
          imageList.forEach((image, index) => {
            let pxImage = new PxLoaderImage(image);
            pxImage.imageNumber = index + 1;
            loader.add(pxImage);
          });
          loader.addProgressListener((e) => {
            let value = e.completedCount / e.totalCount;
            self.percent = Math.floor((value) * 100) + '%';
            if (value >= 1) {
              self.$router.push('home')//home
            }
          });
          loader.start();
        }
      }
    }
  }
</script>

<style  lang="scss"  type="text/scss" scoped>

  .percent {
    width: 440px;
    text-align: center;
    font-size:36px;
    font-weight:normal;
    color:#1989fa;
    line-height:48px;
  }
  .wth-box{
    height: 24px;
    margin-top: 20px;
    border: 2px solid #ffffff;
    border-radius: 12px;
    overflow: hidden;
    .percent-wth{
      display: block;
      height: 100%;
      background-color: #1989fa;
    }
  }
</style>
