<template>
  <div class="page home2">
    <div class="banner">
      <img class="banner-bg" :src="bgUrl">
    </div>

    <!--理论宣讲平台-->
    <div class="fw-box">
      <div class="fw-tit">
        <div class="h-line h1"></div>
        <div class="tit-text">{{tit1}}</div>
      </div>
      <div class="fw-item" v-for="(item, index) in fwList" :key="index">
        <img class="fa-ico" :src="item.imgUrl">
        <div class="fwText">{{item.name}}</div>
      </div>
    </div>
    <div class="fen-line"></div>

    <!--教育服务平台-->
    <div class="fw-box">
      <div class="fw-tit">
        <div class="h-line h2"></div>
        <div class="tit-text">{{tit2}}</div>
      </div>
      <div class="fw-item" v-for="(item, index) in jyList" :key="index">
        <img class="jy-ico" :src="item.imgUrl">
      </div>
    </div>
    <div class="fen-line"></div>

    <!--文化服务平台-->
    <div class="fw-box">
      <div class="fw-tit">
        <div class="h-line h3"></div>
        <div class="tit-text">{{tit3}}</div>
      </div>
      <div class="pt-item" v-for="(item, index) in whList" :key="index">
        <img class="pt-ico" :src="item.imgUrl">
      </div>
    </div>
    <div class="fen-line"></div>

    <!--健身体育教育平台-->
    <div class="zubo-box">
      <div class="fw-tit">
        <div class="h-line h4"></div>
        <div class="tit-text">{{tit4}}</div>
      </div>
      <div class="zubo-banner"><img :src="zuboUrl"></div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'home2',

    //组件
    components: {},

    //初始数据
    data() {
      return {
        tit1: '理论宣讲平台',
        tit2: '教育服务平台',
        tit3: '文化服务平台',
        tit4: '健身体育服务平台',
        bgUrl: require('../assets/home2/banner.png'),
        zuboUrl: require('../assets/home2/js.png'),
        fwList: [{
          imgUrl: require('../assets/home2/ll1.png'),
          name: '小喇叭课件'
        }, {
          imgUrl: require('../assets/home2/ll2.png'),
          name: '小主播视频'
        }, {
          imgUrl: require('../assets/home2/ll3.png'),
          name: '小主播音频'
        }],
        jyList: [{
          imgUrl: require('../assets/home2/d1.png')
        }, {
          imgUrl: require('../assets/home2/d2.png')
        }, {
          imgUrl: require('../assets/home2/d3.png')
        }],
        whList:[{
          imgUrl: require('../assets/home2/pt1.png')
        },{
          imgUrl: require('../assets/home2/pt2.png')
        }]
      }
    },

    //创建后
    created() {

    },

    //调用的方法
    methods: {},

  }
</script>

<style lang="scss" type="text/scss" scoped>
  .banner {
    position: relative;
    width: 100%;
    /*width: 680px;*/
    /*margin: 32px auto 0;*/
    .banner-bg {
      /*border-radius: 32px;*/
    }

    .banner-tag {
      width: 100%;
      bottom: 8px;
      height: 54px;
      color: #ffffff;

      .banner-bc {
        width: 100%;
        height: 100%;
        background-color: #000000;
        opacity: .6;
        /*border-bottom-left-radius: 32px;*/
        /*border-bottom-right-radius: 32px;*/
      }

      .ban-text {
        font-size: 28px;
        text-align: left;
        padding-left: 36px;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        line-height: 54px;
      }
    }
  }


  .fw-box {
    width: 680px;
    margin: 10px auto 0;
  }

  .fw-tit {
    > div {
      display: inline-block;
      vertical-align: middle;
    }

    .h-line {
      font-weight: bold;
      width: 8px;
      height: 32px;
      border-radius: 16px;
      margin-right: 16px;

      &.h1 {
        background-color: #fe2f56;
      }

      &.h2 {
        background-color: #26bd82;
      }

      &.h3 {
        background-color: #fb8447;
      }

      &.h4 {
        background-color: #4f9beb;
      }
    }

    .tit-text {
      font-size: 26px;
      font-weight: bold;
      letter-spacing: 2px;
    }

    .fen-img {
      width: 100px;
      float: right;
    }
  }

  .fw-item {
    display: inline-block;
    width: 33.3%;
    margin-top: 40px;
    text-align: center;

    .fwText {
      letter-spacing: 2px;
      font-size: 26px;
      margin-top: 12px;
    }
  }
  .pt-item{
    display: inline-block;
    width: 50%;
    margin-top: 40px;
  }

  .fa-ico {
    width: 96px;
  }

  .jy-ico {
    width: 94%;
  }
  .pt-ico{
    width: 96%;
  }
  .fen-line {
    width: 100%;
    background-color: #f1f4fc;
    height: 12px;
    margin: 40px 0;
  }

  .zubo-box {
    width: 680px;
    margin: 10px auto 0;

    .zubo-banner {
      width: 100%;
      margin: 40px 0;
    }
  }
</style>
