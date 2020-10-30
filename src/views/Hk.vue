<template>
  <div class="HuiKan">
    <van-nav-bar
      :title="titleText"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="abs hk-page">
      <div class="hk--box">
        <div class="vd-info">
          <video style="width: 100%"
                 :src="vdUrl" preload="auto"
                 loop="loop" ref="audio"
                 controls="controls" controlslist="nodownload"
                 :poster="posUrl"
          >
          </video>
        </div>
        <div class="vd-tit">{{vdText}}</div>
        <div class="vd-sub">
          <div class="vd-time">{{vdTime}}</div>
          <div class="vd-ll">
            <span>{{lText}}</span>
            <span>{{lNum}}</span>
          </div>
        </div>
      </div>
      <div class="info-box">
        <div class="info-h" v-html="infoHtml">{{infoHtml}}}</div>
      </div>
    </div>
    <div class="hk-foot">
      <div class="abs abs-center pl-box">
        <div class="ping-box">
          <van-icon class="abs x-icon" name="records" color="#696969"/>
          <input class="abs abs-center pipt" v-model="plValue" :placeholder="subIptText" @keyup.enter="FaClc()"></input>
          <!--          <span>{{pText}}</span> chat-o-->
        </div>
        <div class="ping-icon">
          <van-icon :name="faSong" class="ft-ico" color="#696969" @click="FaClc()"/>
          <!--收藏-->
          <van-icon :name="shouIco" class="ft-ico" :shouSta="shouSta" :color="shouCol" @click="ShouClc()"/>
          <!--点赞-->
          <van-icon :name="zanIco" class="ft-ico" :zanSta="zanSta" :color="zanCol" @click="ZanClc()"/>
          <van-icon name="share" class="ft-ico" color="#696969"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {NavBar} from 'vant';
  import {Icon} from 'vant';
  import {Toast} from 'vant';
  import {Field} from 'vant';
  import {timestampToTime} from '../util/util';

  let Id;

  export default {
    name: 'HuiKan',

    //组件
    components: {
      [NavBar.name]: NavBar,
      [Field.name]: Field,
      [Icon.name]: Icon,
      [Toast.name]: Toast,
    },

    //初始数据
    data() {
      return {
        titleText: '直播回看',
        faSong: require('../assets/dk/fs.svg'),
        shouIco: '',//收藏ico   star-o
        shouCol: '',//收藏 颜色
        zanIco: '',//点赞ico   good-job-o
        zanCol: '',//点赞颜色
        vdUrl: '',//视频
        shouSta: '',//收藏状态
        zanSta: '',//点赞状态
        posUrl: '',//预览图 require('../assets/dj/vd.png')
        vdText: '',//标题
        vdTime: '',//时间
        lNum: '',//浏览数
        plValue: '',//评论
        infoHtml: '',//文本
        lText: '浏览：',
        subIptText: '写评论...',
        shouChecked: true,
        shouActive: 'star-o',
        shouInActive: 'star',

      }
    },

    //创建后
    created() {
      Id = this.$route.query.id;
      this._getInfo();//根据id请求信息
    },

    //调用的方法
    methods: {
      //返回
      onClickLeft: function () {
        this.$router.push('dk');
      },
      //根据id查询
      _getInfo: function () {
        let self = this;
        self.$axios.request({
          url: 'http://cm.legions.tech/api/cm/party/get',
          data: {
            id: Id,
            openid: window.sessionStorage.getItem("ZHJOpenid"),
          }
        }).then((res) => {
          let code = parseInt(res.code); //parseInt
          if (code === 1) {
            self.vdUrl = res.data.data.video,//视频 res.data.video
              self.posUrlres = process.env.VUE_APP_wxImgUrl + res.data.data.image,//预览图
              self.vdText = res.data.data.title,//标题
              self.vdTime = timestampToTime(res.data.data.publishtime),//时间
              self.lNum = res.data.data.times, //浏览数
              self.infoHtml = res.data.data.content, //文本
              self.shouSta = res.data.is_collect, //收藏状态
              self.zanSta = res.data.is_like, //点赞状态
              self.shouIco = parseInt(res.data.collect) ? 'star' : 'star-o',//收藏图标
              self.zanIco = parseInt(res.data.like) ? 'good-job' : 'good-job-o', //点赞图标
              self.shouCol = parseInt(res.data.collect) ? '#2f9bfe' : '#696969',//收藏颜色
              self.zanCol = parseInt(res.data.like) ? '#2f9bfe' : '#696969' //点赞颜色
          } else {
            Toast.fail(res.msg);
          }
        }).catch(err => {
          Toast.fail(err.msg || '请求失败');
        });
      },

      //评论
      _getPing: function () {
        let self = this;
        self.$axios.request({
          url: 'http://cm.legions.tech/api/cm/party/Comment',
          data: {
            outid: Id,
            openid: window.sessionStorage.getItem("ZHJOpenid"),
            content: self.plValue
          }
        }).then((res) => {
          let code = parseInt(res.code); //parseInt
          if (code === 1) {
            Toast.success('评论成功！');
            self.plValue = '';
          } else {
            Toast.fail(res.msg);
          }
        }).catch(err => {
          Toast.fail(err.msg || '请求失败');
        });
      },

      //点击发送
      FaClc() {
        if (!this.plValue || this.plValue === '') {
          Toast.fail('请填写评论内容');
          return;
        }
        this._getPing();//评论接口
      },

      //点击收藏
      ShouClc() {
        let self = this;
        if (this.shouSta === '0') { //没收藏
          self.shouSta = '1';
          self._getShou(self.shouSta);//收藏接口
        } else {
          self.shouSta = '0';
          self._getShou(self.shouSta);//收藏接口
        }
      },

      //点击点赞
      ZanClc() {
        let self = this;
        if (this.zanSta === '0') { //没点赞
          self.zanSta = '1';
          self._getZan(self.zanSta);//点赞接口
        } else {
          self.zanSta = '0';
          self._getZan(self.zanSta);//点赞接口
        }
      },

      //点赞接口
      _getZan: function () {
        let self = this;
        self.$axios.request({
          url: 'http://cm.legions.tech/api/cm/party/Like',
          data: {
            outid: Id,
            openid: window.sessionStorage.getItem("ZHJOpenid"),
            // status: zanSta
          }
        }).then((res) => {
          let code = parseInt(res.code); //parseInt
          if (code === 1) {
            self._getInfo();
          } else {
            Toast.fail(res.msg);
          }
        }).catch(err => {
          Toast.fail(err.msg || '请求失败');
        });
      },

      //收藏接口
      _getShou: function () {
        let self = this;
        self.$axios.request({
          url: 'http://cm.legions.tech/api/cm/party/Collect',
          data: {
            outid: Id,
            openid: window.sessionStorage.getItem("ZHJOpenid"),
            // status: shouSta
          }
        }).then((res) => {
          let code = parseInt(res.code); //parseInt
          if (code === 1) {
            self._getInfo();
          } else {
            Toast.fail(res.msg);
          }
        }).catch(err => {
          Toast.fail(err.msg || '请求失败');
        });
      },
    },

  }
</script>

<style lang="scss" type="text/scss" scoped>
  .HuiKan {
    height: 100%;
    background-color: #f4f4f4;
  }

  .hk-page {
    top: 92px;
    left: 0;
    right: 0;
    bottom: 80px;
    overflow: hidden;
    overflow-y: auto;
  }

  .hk--box {
    margin-bottom: 20px;
    background-color: #ffffff;

    .vd-tit {
      font-size: 32px;
      padding: 20px;
    }

    .vd-sub {
      color: #a0a0a0;
      padding: 20px 20px 60px;
      display: flex; /*设置为弹性容器*/
      align-items: center;
      justify-content: space-between;
    }
  }

  .info-box {
    padding: 20px;
    line-height: 40px;
    min-height: 672px;
    text-align: justify;
    background-color: #ffffff;
  }

  .hk-foot {
    background-color: #ffffff;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 80px;
    z-index: 20;

    .pl-box {
      width: 96%;
      height: 60px;
      background-color: #ffffff;

      > div {
        display: inline-block;
        vertical-align: middle;
        height: 60px;
        line-height: 60px;
      }
    }

    .ping-box {
      position: relative;
      color: #696969;
      width: 60%;
      border-radius: 40px;
      background-color: #efefef;

      i, span {
        vertical-align: middle;
        font-size: 28px;
      }

      .x-icon {
        top: 16px;
        left: 34px;
      }

      .pipt {
        width: 360px;
        height: 60px;
        margin-left: 32px;
        outline: none;
        border: none;
        background-color: transparent;
        border-top-right-radius: 40px;
        border-bottom-right-radius: 40px;
      }
    }

    .ping-icon {
      width: 40%;
      display: flex; /*设置为弹性容器*/
      align-items: center; /*定义div1的元素垂直居中*/
      justify-content: center; /*定义div1的里的元素水平居中*/
      .ft-ico {
        width: 25%;
        font-size: 44px;
        line-height: 60px;
        text-align: center;
      }
    }
  }
</style>
