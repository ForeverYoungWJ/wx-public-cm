<template>
  <div class="dangyuan">
    <van-nav-bar
      :title="titleText"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="abs xy-list">
      <div class="xy-item" v-for="(item,index) in xyList" :key="index">
        <div class="tit-box">
          <div class="abs info-img"><img :src="item.avatar"></div>
          <div class="abs abs-center info-right">
            <div class="xy-title">
              <div class="h-line"></div>
              <div class="tit-text">{{item.name}}</div>
            </div>
            <div class="yx-sub" v-html="item.brief">{{item.brief}}</div>
          </div>
        </div>
        <div class="xy-info" v-html="item.content">{{item.content}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {NavBar} from 'vant';
  import {Toast} from 'vant';

  export default {
    name: 'dangyuan',

    //组件
    components: {
      [NavBar.name]: NavBar,
      [Toast.name]: Toast,
    },

    //初始数据
    data() {
      return {
        titleText: '向化镇优秀党员事迹汇',
        xyList: []
      }
    },

    //创建前
    beforeCreate() {
    },

    //创建后
    created() {
      this._getInfo()//信息
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
      onClickLeft: function () {
        this.$router.push('dj');
      },
      //信息数据
      _getInfo: function () {
        let self = this;
        self.$axios.request({
          url: 'http://cm.legions.tech/api/cm/deeps/index',
          data: {},
        }).then((res) => {
          let code = parseInt(res.code); //parseInt
          if (code === 1) {
            let list = res.data;
            list.forEach((item, index, arr) => {
              item.avatar = process.env.VUE_APP_wxImgUrl + item.avatar;
            });
            self.xyList = list;
          } else {
            Toast(res.msg);
          }
        }).catch(err => {
          Toast(err.msg || '请求失败');
        });
      },
    },

  }
</script>

<style lang="scss" type="text/scss" scoped>
  .dangyuan {
    height: 100%;
  }

  .jt-bg {
    width: 100%;
    height: 100%;
    background-color: #ffffff;
  }

  .xy-list {
    top: 120px;
    left: 40px;
    right: 40px;
    bottom: 40px;
    padding-top: 40px;
    overflow: hidden;
    overflow-y: auto;

    .xy-item {
      margin-bottom: 50px;
      .tit-box{
        position: relative;
        margin-bottom: 60px;
        background-color: #d40f39;
        border-radius: 100px;
        width: 100%;
        height: 152px;
        .info-img {
          width: 160px;
          left: 0;
          z-index: 10;
          top: -30px;
        }
        .info-right{
          width: 460px;
          margin-left: 80px;
          .xy-title{
            margin-bottom: 12px;
            > div {
              color: #ffe139;
              display: inline-block;
              vertical-align: middle;
            }
            .h-line {
              font-weight: bold;
              width: 6px;
              height: 28px;
              border-radius: 16px;
              margin-right: 20px;
              background-color: #ffe139;
            }
            .tit-text {
              font-size: 24px;
              font-weight: bold;
              letter-spacing: 2px;
            }
          }
          .yx-sub{
            font-size: 22px;
            color: #ffffff;
          }
        }
      }
      .xy-info {
        font-size: 26px;
        text-align: justify;
        line-height: 40px;
      }
    }

  }
</style>
