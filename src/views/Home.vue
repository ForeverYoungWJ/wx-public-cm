<template>
  <div class="page home">
    <div class="banner" @click="toPan()">
      <img class="banner-bg" :src="bgUrl">
      <div class="abs banner-tag">
        <div class="banner-bc"></div>
        <div class="abs ban-text">{{bannerText}}</div>
      </div>
    </div>
    <div class="zt" @click="ztClc()"><img :src="ztUrl"></div>
    <!--服务6个列表-->
    <div class="fw-box">
      <div class="fw-tit">
        <div class="h-line"></div>
        <div class="tit-text">{{tit1}}</div>
      </div>
      <div class="fw-item" v-for="(item, index) in fwList" :key="index"
           @click="fwListClc(index)">
        <img class="fa-ico" :src="item.imgUrl">
        <div class="fwText">{{item.name}}</div>
      </div>
    </div>
    <div class="fen-line"></div>
    <!--小主播招新-->
    <div class="zubo-box">
      <div class="fw-tit">
        <div class="h-line"></div>
        <div class="tit-text">{{tit2}}</div>
<!--        <div class="fen-img"><img :src="fenUrl"></div>-->
      </div>
      <div class="zubo-banner"><img :src="zuboUrl"></div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'home',

    //组件
    components: {},

    //初始数据
    data() {
      return {
        tit1: '服务菜单',
        tit2: '小主播招新',
        bannerText: '向化镇360°网上党建文创中心 ',
        // fenUrl: require('../assets/home/fen.png'),
        bgUrl: require('../assets/home/bg.png'),
        ztUrl: require('../assets/home2/ban2.png'),
        zuboUrl: require('../assets/home/lb.png'),
        fwList: [{
          imgUrl: require('../assets/home/dj.png'),
          name: '智慧家党建'
        }, {
          imgUrl: require('../assets/home/ms.png'),
          name: '智慧家民生'
        }, {
          imgUrl: require('../assets/home/sf.png'),
          name: '智慧家司法'
        }, {
          imgUrl: require('../assets/home/ny.png'),
          name: '智慧家农业'
        }, {
          imgUrl: require('../assets/home/gl.png'),
          name: '智慧家社会管理'
        }, {
          imgUrl: require('../assets/home/wt.png'),
          name: '智慧家文体'
        }]
      }
    },

    //创建后
    created() {

    },


    //调用的方法
    methods: {
      //点击全景
      toPan: function () {
        window.location.href='https://720yun.com/t/dfvku97q7dy';
        // this.$router.push('panorama');
      },

      //点击新时代文明实践中心
      ztClc(){
        this.$router.push('home2');
      },

      //点击服务列表
      fwListClc:function (index) {
        switch (index) {
          //党建
          case 0:
            this.$router.push('dj');
            break;
            //民生
          case 1:
            this.$router.push('ms');
            break;
            //司法
          case 2:
            this.$router.push('sf');
            break;
            //农业
          case 3:
            this.$router.push('ny');
            break;
            //社会管理
          case 4:
            this.$router.push('gl');
            break;
            //文体
          case 5:
            this.$router.push('wt');
            break;
        }
      }
    },

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

  .zt {
    width: 680px;
    margin: 10px auto 0;
    img{
      border-radius: 40px;
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
      background-color: #2f9bfe;
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

  .fa-ico {
    width: 96px;
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
