<template>
  <div class="xinyuan">
    <van-nav-bar
      :title="titleText"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="abs xy-list">
      <div class="xy-item" v-for="(item,index) in xyList" :key="index">
        <img :src="item.image">
        <div class="xy-title">
          <div class="h-line"></div>
          <div class="tit-text">{{item.title}}</div>
        </div>
        <div class="xy-text" v-html="item.content">{{item.content}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {NavBar} from 'vant';
  import {Toast} from 'vant';

  export default {
    name: 'xinyuan',

    //组件
    components: {
      [NavBar.name]: NavBar,
      [Toast.name]: Toast,
    },

    //初始数据
    data() {
      return {
        titleText: '示范党群服务点',
        infoUrl: require('../assets/dq/info.png'),
        xyList: []
      }
    },

    //创建前
    beforeCreate() {
    },

    //创建后
    created() {
      this._getInfo();//优秀党群信息
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
          url: 'http://cm.legions.tech/api/cm/upos/index',
          data: {},
        }).then((res) => {
          let code = parseInt(res.code); //parseInt
          if (code === 1) {
            let list = res.data;
            list.forEach((item, index, arr) => {
              item.image = process.env.VUE_APP_wxImgUrl + item.image;
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
  .xinyuan {
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
    overflow: hidden;
    overflow-y: auto;

    .xy-item {
      margin-bottom: 40px;
      .xy-title{
        margin: 10px 0 20px;
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
          background-color: #f43521;
        }
        .tit-text {
          font-size: 28px;
          font-weight: bold;
          letter-spacing: 2px;
        }
      }
      .xy-text {
        font-size: 26px;
        line-height: 40px;
        text-align: justify;
      }
    }

  }
</style>
