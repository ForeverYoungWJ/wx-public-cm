<template>
  <div class="page dang">
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
      <div class="abs abs-center ban2" @click="clcDyFun()"><img :src="bannerUrl"></div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'dang',

    //组件
    components: {},

    //初始数据
    data() {
      return {
        bannerImg:require('../assets/dj/banner.png'),
        banner2bgUrl:require('../assets/dj/banner2-bg.png'),
        bannerUrl:require('../assets/dj/banner2.png'),
        djList:[{
          imgUrl:require('../assets/dj/gx.png')
        },{
          imgUrl:require('../assets/dj/xy.png')
        },{
          imgUrl:require('../assets/dj/fwd.png')
        },{
          imgUrl:require('../assets/dj/yw.png')
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
      clcDyFun:function(){
        this.$router.push('dyList');
      },
      clcFun:function (index) {
        let self = this;
        switch (index) {
          //共享党课
          case 0:
            // alert('共享党课');
            self.$router.push('dk');
            break;
          //微心愿认领
          case 1:
            // alert('微心愿认领');
            self.$router.push('xy');
            break;
          //示范党群服务点
          case 2:
            // alert('示范党群服务点');
            self.$router.push('dq');
            break;
          //党建要闻
          case 3:
            // alert('党建要闻');
            window.location.href='http://dangjian.gmw.cn';
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
