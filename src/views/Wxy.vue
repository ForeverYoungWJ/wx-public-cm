<template>
  <div class="xinyuan">
    <van-nav-bar
      :title="titleText"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="abs xy-list">
      <div class="xy-item" v-for="(item,index) in xyList" :key="index" >
        <van-image :src="item.image" fit="cover
        " class="xy-img"/>
        <div class="xy-info">
          <div class="xy-title">
            <span class="xy-bold">{{xyTit}}</span>
            <span>{{item.name}}</span>
          </div>
          <div class="xy-sex">
            <span class="xy-bold">{{sex}}</span>
            <span>{{item.gender}}</span>
          </div>
          <div class="xy-school">
            <span class="xy-bold">{{school}}</span>
            <span>{{item.class}}</span>
          </div>
          <div class="xy-phone">
            <span class="xy-bold">{{phone}}</span>
            <span>{{item.mobile}}</span>
          </div>
          <div class="xy-in">
            <span class="xy-bold">{{info}}</span>
            <span>{{item.content}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {NavBar} from 'vant';
  import {Tab, Tabs} from 'vant';
  import {Image} from 'vant';
  import {Toast} from 'vant';

  export default {
    name: 'xinyuan',

    //组件
    components: {
      [Tab.name]: Tab,
      [Tabs.name]: Tabs,
      [NavBar.name]: NavBar,
      [Image.name]: Image,
      [Toast.name]: Toast,
    },

    //初始数据
    data() {
      return {
        titleText: '我的微心愿',
        xyTit: '许愿人：',
        renSta:false, //微心愿 内容
        info: '愿望内容：',
        name: '许愿人：',
        sex: '性别：',
        school: '学校班级：',
        phone: '联系方式：',
        xyList: [],
      }
    },

    //创建前
    beforeCreate() {
    },

    //创建后
    created() {
      this._getInfo() //心愿列表信息
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
        this.$router.push('user');
      },

      //列表  状态
      _getInfo: function () {
        let self = this;
        self.$axios.request({
          url: 'http://cm.legions.tech/api/cm/my/wishList',
          data: {
            openid:window.sessionStorage.getItem("ZHJOpenid")
          }
        }).then((res) => {
          let code = parseInt(res.code); //parseInt
          if (code === 1) {
            let list = res.data;
            list.forEach((item, index, arr) => {
              item.image = process.env.VUE_APP_wxImgUrl + item.image;
            });
            self.xyList = list;
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
  .xinyuan {
    height: 100%;
    background-color: #f4f4f4;
  }

  .xy-list {
    top: 112px;
    left: 0;
    right: 0;
    bottom: 4px;
    overflow: hidden;
    overflow-y: auto;

    .xy-item {
      position: relative;
      padding: 40px 20px;
      background-color: #ffffff;
      border-bottom: 2px solid #dfdede;
      > div {
        display: inline-block;
        vertical-align: top;
        /*height: 120px;*/
      }

      .xy-bold {
        color: #000000;
        font-weight: bold;

      }

      .xy-img {
        width: 200px;
        height: 200px;
        margin-right: 40px;
        display: inline-block;
        vertical-align: top;
      }

      .xy-info {
        width: calc(100% - 240px);
        color: #bdbcbc;
        >div{
          font-size: 24px;
          line-height: 40px;
        }
      }

    }
  }

</style>
