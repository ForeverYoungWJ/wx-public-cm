<template>
  <div class="page guan">
    <div class="banner"><img :src="bannerImg"></div>
    <div class="dj-box">
      <div class="abs dj-list">
        <div class="dj-item" v-for="(item,index) in djList"
             :key="index" @click="clcFun(index)">
          <img :src="item.imgUrl">
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'guan',

    //组件
    components: {},

    //初始数据
    data() {
      return {
        bannerImg:require('../assets/gl/banner.png'),
        djList:[{
          imgUrl:require('../assets/gl/fankui.png')
        // },{
        //   imgUrl:require('../assets/gl/tianjian.png')
        },{
          imgUrl:require('../assets/gl/dianwei.png')
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
          //垃圾分类反馈
          case 0:
            // alert('垃圾分类反馈');
            self.$router.push('ljfk');
            break;
          //垃圾分类田间小喇叭
          case 1:
            // alert('垃圾分类田间小喇叭');
            self.$router.push('dw');
            break;
          //垃圾分类点位表
          case 2:
            // alert('垃圾分类点位表');
            self.$router.push('dw');
            break;
      }
    },
  }
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
</style>
