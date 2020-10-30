<template>
  <div class="Dangke">
    <van-nav-bar
      :title="titleText"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="abs dk-box">
      <div class="tit" v-html="titInfo">{{titInfo}}</div>
      <div class="zb-kai" @click="zbFun()"><img :src="kaiUrl"></div>
      <div class="tit2"><img :src="tit2Url"></div>
      <div class="xy-list">
        <div class="xy-item" v-for="(item, index) in xyList"
             :key="index" @click="fwListClc(index)">
          <div class="item-img">
            <img class="xy-ico" :src="item.image">
            <div class="abs img-box"></div>
            <div class="abs abs-center annv"><img :src="icoUrl"></div>
          </div>
          <div class="xy-tit van-ellipsis">{{item.title}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {NavBar} from 'vant';
  import {Toast} from 'vant';

  export default {
    name: 'Dangke',

    //组件
    components: {
      [NavBar.name]: NavBar,
      [Toast.name]: Toast,
    },

    //初始数据
    data() {
      return {
        titleText: '共享党课',
        titInfo: '&emsp;&emsp;通过5G实时直播的方式，图文并茂展示，直播回放等特点功能，达到一课多听，一课随听、一课回放的效果，打破原有的线下课堂对时间、地点和空间的限制，将向化镇党群文创中心的任何一堂党课搬入各村党群服务点、以及党员的手机终端。',
        tit2Url: require('../assets/dk/hui.png'),
        kaiUrl: require('../assets/dk/zb.png'),
        icoUrl: require('../assets/dk/icon.png'),
        xyList: []
      }
    },

    //创建前
    beforeCreate() {
    },

    //创建后
    created() {
      this._getList()//回看记录列表
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
      //点击直播
      zbFun: function () {
      // this.$router.push('dkzb');
      },
      //点击回看 list
      fwListClc: function (index) {
        let id = this.xyList[index].id;
        this.$router.push({name: 'Hk', query: {id: id}}); //query 参数不丢失
      },
      //回看列表接口
      _getList: function () {
        let self = this;
        self.$axios.request({
          url: 'http://cm.legions.tech/api/cm/party/index',
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
  .Dangke {
    height: 100%;
  }

  .dk-box {
    top: 120px;
    left: 32px;
    right: 32px;
    bottom: 0;
    overflow: hidden;
    overflow-y: auto;
  }

  .tit {
    color: #393939;
    font-size: 28px;
    font-weight: bold;
    text-align: justify;
    letter-spacing: 2px;
    line-height: 40px;
  }

  .zb-kai {
    width: 90%;
    margin: 40px auto 0;
  }

  .tit2 {
    width: 200px;
    margin: 56px 0 20px;
  }

  .xy-list {
    .xy-item {
      width: 48%;
      display: inline-block;
      margin-bottom: 40px;

      .item-img {
        position: relative;
      }

      .img-box {
        top: 0;
        left: 0;
        right: 0;
        bottom: 8px;
        background-color: #000000;
        opacity: .6;
      }

      .annv {
        width: 120px;
      }

      .xy-tit {
        color: #000000;
        font-size: 20px;
        margin-top: 20px;
      }

      &:nth-child(odd) {
        margin-right: 4%;
      }
    }
  }
</style>
