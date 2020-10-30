<template>
  <div class="page sifa">
    <div class="banner"><img :src="bannerImg"></div>
    <div class="dj-box">
      <div class="tit-tishi">{{tishiText}}</div>
      <div class="abs dj-list">
        <div class="dj-item" v-for="(item,index) in djList"
             :key="index" @click="clcFun(index)">
          <img :src="item.image">
          <div class="ls-name">
            <span>{{item.name}}</span>
            <span>{{nameText}}</span>
          </div>
          <div class="ls-nian">
            <van-icon name="star" color="#ffffff"/>
            <span>{{item.experience}}</span>
<!--            <span>{{nianText}}</span>-->
          </div>
          <div class="ls-state"
               v-html="item.is_online?'5G端在线':'离线'"
               :class="item.is_online?'ls-z':'ls-l'"
          >
            {{item.is_online?'5G端在线':'离线'}}
          </div>
        </div>
      </div>
    </div>
    <van-popup
      v-model="show"
      closeable
      class="dlog-box"
    >
      <div class="item-ipt yue-tit" v-html="wxTishiText">{{wxTishiText}}</div>
      <div class="item-ipt ls-num" v-html="lsNum">{{lsNum}}</div>
      <div class="wx-img"><img :src="wxImgUrl"></div>
    </van-popup>
  </div>
</template>

<script>
  import {Icon} from 'vant';
  import {Toast} from 'vant';
  import {Popup} from 'vant';

  export default {
    name: 'sifa',

    // 组件
    components: {
      [Icon.name]: Icon,
      [Toast.name]: Toast,
      [Popup.name]: Popup,
    },

    //初始数据
    data() {
      return {
        show:false,
        lsNum:'',//律师 num
        wxTishiText:'请扫描小程序码</br>输入律师编号与律师视频通话',
        tishiText: '您可以通过点击头像的方式，联系在线律师进行咨询，面对面为您提供咨询与帮助',
        nameText: '',//律师
        nianText: '年经验',
        wxImgUrl:require('../assets/sf/xcx.jpg'),
        bannerImg: require('../assets/sf/banner.png'),
        djList:[]
      }
    },

    //创建后
    created() {
      this._getInfo()//律师信息
    },


    //调用的方法
    methods: {
      //点击律师头像
      clcFun: function (index) {
        let num = this.djList[index].num;
        let state = parseInt(this.djList[index].is_online);// 0不在线 1在线
        if(state === 1){
          this.show = true; //显示小程序码
          this.lsNum = '律师编号：0'+ num;
        }
      },

      //律师列表信息
      _getInfo: function () {
        let self = this;
        self.$axios.request({
          url: 'http://cm.legions.tech/api/cm/attorney/index',
          data: {}
        }).then((res) => {
          let code = parseInt(res.code); //parseInt
          if (code === 1) {
            let list = res.data;
            let num = 1;
            list.forEach((item, index, arr) => {
              item.num = num++;
              item.image = process.env.VUE_APP_wxImgUrl + item.image;
              item.is_online = parseInt(item.is_online);
            });
            self.djList = list;

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
  .banner {
    width: 100%;
    height: 344px;
  }

  .dj-box {
    width: 100%;
    height: 1440px;
    position: relative;
    background-size: cover;
    background-position: bottom;
    background-repeat: no-repeat;
    background-image: url("../assets/sf/bg.jpg");
  }

  .tit-tishi {
    color: #ffffff;
    font-size: 24px;
    padding: 40px 20px;
  }

  .dj-list {
    top: 152px;
    left: 40px;
    right: 40px;

    .dj-item {
      color: #ffffff;
      text-align: center;
      display: inline-block;
      width: 26%;
      margin-bottom: 60px;
      margin-right: 11%;

      > div {
        margin-top: 20px;
      }

      &:nth-child(3n+0) {
        margin-right: 0;
      }
    }
  }

  .ls-nian {
    width: 70%;
    font-size: 20px;
    background-color: #b59356;
    border-radius: 40px;
    line-height: 32px;
    margin: 0 auto;

    > i, span {
      vertical-align: middle;
    }
  }

  .ls-state {
    &.ls-z {
      color: #18eaff;
    }

    &.ls-l {
      color: #97a0b4;
    }
  }

  .dlog-box {
    width: 600px;
    border-radius: 32px;
    padding: 100px 40px;
    .yue-tit{
      font-size: 28px;
      font-weight: bold;
      text-align: center;
    }
    .wx-img {
      width: 60%;
      margin: 60px auto 0;
    }
    .ls-num{
      font-size: 28px;
      margin-top: 30px;
      font-weight: bold;
      text-align: center;
    }
  }
</style>

<!--djList: [{-->
<!--is_online: '1',-->
<!--name: '张力',-->
<!--experience: '10',-->
<!--image: require('../assets/sf/1.png')-->
<!--}, {-->
<!--is_online: '0',-->
<!--name: '张振侯',-->
<!--experience: '7',-->
<!--image: require('../assets/sf/2.png')-->
<!--}, {-->
<!--is_online: '0',-->
<!--name: '张白云',-->
<!--experience: '25',-->
<!--image: require('../assets/sf/3.png')-->
<!--}, {-->
<!--is_online: '0',-->
<!--name: '褚福昊',-->
<!--experience: '3',-->
<!--image: require('../assets/sf/4.png')-->
<!--}, {-->
<!--is_online: '0',-->
<!--name: '黄海雷',-->
<!--experience: '11',-->
<!--image: require('../assets/sf/5.png')-->
<!--}, {-->
<!--is_online: '0',-->
<!--name: '陈昌',-->
<!--experience: '27',-->
<!--image: require('../assets/sf/6.png')-->
<!--}, {-->
<!--is_online: '0',-->
<!--name: '郁文彪',-->
<!--experience: '11',-->
<!--image: require('../assets/sf/7.png')-->
<!--}]-->
