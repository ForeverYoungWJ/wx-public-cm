<template>
  <div class="page min">
    <div class="banner"><img :src="bannerImg"></div>
    <div class="dj-box">
      <div class="abs dj-list">
        <div class="dj-item" v-for="(item,index) in djList"
             :key="index" @click="clcFun(index)">
          <img :src="item.imgUrl">
        </div>
      </div>
    </div>
    <div class="banner2">
      <div class="banner2-bg"><img :src="banner2bgUrl"></div>
      <div class="abs abs-center ban2"><img :src="bannerUrl"></div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'min',

    //组件
    components: {},

    //初始数据
    data() {
      return {
        bannerImg:require('../assets/ms/banner.png'),
        banner2bgUrl:require('../assets/ms/banner2-bg.png'),
        bannerUrl:require('../assets/ms/banner2.png'),
        djList:[{
          imgUrl:require('../assets/ms/zhucan.png')
        },{
          imgUrl:require('../assets/ms/jiaotong.png')
        },{
          imgUrl:require('../assets/ms/jiuwu.png')
        },{
          imgUrl:require('../assets/ms/wei.png')
        }]
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
      clcFun:function (index) {
        let self = this;
        switch (index) {
          //老年助餐
          case 0:
            // alert('老年助餐');
           self.$router.push('zc');
            break;
          //实时交通
          case 1:
            // alert('实时交通');
            self.$router.push('jt');
            break;
          //闲置旧物回收
          case 2:
            // alert('闲置旧物回收');
            self.$router.push('hs');
            break;
          //微网格
          case 3:
            // alert('微网格');
            self.$router.push('wg');
            break;
        }
      }
    },

  }
</script>

<style lang="scss" type="text/scss" scoped>
  .banner{
    width: 100%;
  }
  .dj-box{
    width: 100%;
    height: 380px;
    position: relative;
  }
  .dj-list {
    top: 20px;
    left: 20px;
    right: 20px;
    .dj-item {
      display: inline-block;
      width: 49%;
      margin-bottom: 10px;
      &:nth-child(odd) {
        margin-right: 2%;
      }
    }
  }

  .banner2 {
    margin: 20px 0;
    position: relative;
    .banner2-bg{
      width: 100%;
    }
    .ban2 {
      width: 600px;
    }
  }
</style>
