<template>
  <div class="user">
    <div class="banner"><img :src="bannerImg"></div>
    <div class="abs user-info">
      <div class="abs abs-center user-img"><img :src="userImg"></div>
      <div class="abs abs-center line"></div>
      <div class="abs user-list">
        <div class="user-item" v-for="(item,index) in userList"
             :key="index" @click="clcFun(index)">
          <img :src="item.icon">
          <div class="user-text">{{item.text}}</div>
        </div>
      </div>
    </div>
    <div class="abs other-list">
      <div class="other-tit">{{otherText}}</div>
      <div class="other-item" v-for="(item,index) in otherList"
           :key="index" @click="clcOtherFun(index)"
      >
        <img :src="item.icon" class="o-icon">
        <span class="o-tit">{{item.title}}</span>
        <van-icon class="o-ic" name="arrow" color="#5b5b5b"/>
      </div>
    </div>
  </div>
</template>

<script>
  import {Icon} from 'vant';

  export default {
    name: 'user',

    //组件
    components: {[Icon.name]: Icon,},

    //初始数据
    data() {
      return {
        otherText: '其他功能',
        bannerImg: require('../assets/user/banner.png'),
        userImg: '',//require('../assets/user/tou.jpg')
        userList: [{
          icon: require('../assets/user/wxy.png'),
          text: '我的微心愿'
        }, {
          icon: require('../assets/user/fw.png'),
          text: '我的服务'
        }, {
          icon: require('../assets/user/act.png'),
          text: '已报名活动'
        }, {
          icon: require('../assets/user/shou.png'),
          text: '我的收藏'
        }],
        otherList: [{
          //   icon: require('../assets/user/gy.png'),
          //   title: '关于我们'
          // }, {
          icon: require('../assets/user/sz.png'),
          title: '系统公告'
        }]
      }
    },

    //创建前
    beforeCreate() {
    },

    //创建后
    created() {
      let userInfoImg = JSON.parse(sessionStorage.getItem('ZHJUserInfo')).headimgurl; //微信头像
      this.userImg = userInfoImg;
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
      //点击
      clcFun: function (index) {
        let self = this;
        switch (index) {
          //微心愿
          case 0:
            self.$router.push('wxy');//xy
            break;
          //我的服务
          case 1:
            self.$router.push('fuWu');
            break;
          //活动
          case 2:
            self.$router.push('active');
            break;
          //收藏
          case 3:
            self.$router.push('shou');
            break;
        }
      },

      //点击其他功能
      clcOtherFun: function (index) {
        let self = this;
        switch (index) {
          //系统公告
          case 0:
            self.$router.push('Gg');
            break;
        }
      }
    },

  }
</script>

<style lang="scss" type="text/scss" scoped>
  .user {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 112px;
    overflow: hidden;
    overflow-y: auto;
    background-color: #f4f4f4;
  }

  .banner {
    width: 100%;
    height: 344px;
  }

  .user-info {
    width: 680px;
    top: 480px;
    left: 50%;
    margin-left: -340px;
    height: 460px;
    background-color: #ffffff;
    margin-top: -240px;
    border-radius: 24px;
  }

  .line {
    width: 96%;
    height: 2px;
    margin-top: -28px;
    background-color: #ededed;
  }

  .user-list {
    width: 100%;
    bottom: 60px;

    .user-item {
      width: 25%;
      display: inline-block;
      text-align: center;
      font-weight: bold;

      img {
        width: 50%;
        margin-bottom: 20px;
      }
    }
  }

  .user-img {
    width: 240px;
    margin-top: -220px;

    img {
      border-radius: 50%;
    }
  }

  .other-list {
    width: 680px;
    top: 520px;
    left: 50%;
    margin-left: -340px;
    background-color: #ffffff;
    margin-top: 240px;
    margin-bottom: 60px;
    border-radius: 24px;

    > div {
      padding: 20px;
      border-bottom: 1px solid #ededed;
      line-height: 44px;

      &:nth-last-child(1) {
        border-bottom: none;
      }
    }
  }

  .other-item {
    > img, span, i {
      display: inline-block;
      vertical-align: middle;
      margin-right: 10px;
    }
  }

  .o-icon {
    width: 30px;
  }

  .o-ic {
    float: right;
  }
</style>
