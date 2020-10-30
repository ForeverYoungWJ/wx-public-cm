<template>
  <div class="jiaotong">
    <van-nav-bar
      :title="titleText"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="banner"><img :src="bannerImg"></div>
    <div class="abs abs-center item-bs" @click="bsFun()"><img :src="bsUrl"></div>
    <div class="abs abs-center item-sc" @click="scFun()"><img :src="scUrl"></div>
    <div class="abs abs-center item-gj" @click="gjFun()"><img :src="gjUrl"></div>
  </div>
</template>

<script>
  import { NavBar } from 'vant';

  export default {
    name: 'jiaotong',

    //组件
    components: {
      [NavBar.name]: NavBar,
    },

    //初始数据
    data() {
      return {
        titleText:'实时交通查询',
        bannerImg:require('../assets/jt/bg.png'),
        bsUrl:require('../assets/jt/1.png'),
        scUrl:require('../assets/jt/2.png'),
        gjUrl:require('../assets/jt/3.png')
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
      onClickLeft() {
        this.$router.push('ms');
      },
      //巴士购票
      bsFun:function () {
        window.location.href='http://m.echengbus.com/r/'
      },
      //申崇实时信息
      scFun:function () {
        window.location.href='https://mp.weixin.qq.com/s/MZsHxF9N2uehYqBSeflyrw'
      },
      //公交线路
      gjFun:function () {
        window.location.href='http://zh.84000.com.cn/cas/bus.html'
      }
    },

  }
</script>

<style lang="scss" type="text/scss" scoped>
  .jiaotong{
    height: 100%;
  }
  .banner{
    width: 100%;
    height: 344px;
    img{
      height: 100%;
    }
  }
  .item-bs {
    width: 740px;
    margin-top: -8px;
  }
  .item-sc {
    width: 740px;
    margin-top: 200px;
  }
  .item-gj {
    width: 740px;
    margin-top: 420px;
  }
</style>
