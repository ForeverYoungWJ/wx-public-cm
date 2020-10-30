<template>
  <div class="gongGao">
    <van-nav-bar
      :title="titleText"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="abs xy-list">
      <div class="xy-item" v-for="(item,index) in xyList"
           :key="index">
        <div class="xy-time">
          {{item.time}}
        </div>
        <div class="xy-title">
          {{item.title}}
        </div>
        <div class="xy-info">
          {{item.content}}
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import {NavBar, Toast} from 'vant';
  import {Dialog} from 'vant';
  import {timestampToTime} from "../util/util";

  export default {
    name: 'gongGao',

    //组件
    components: {
      [NavBar.name]: NavBar,
      [Dialog.name]: Dialog,
    },

    //初始数据
    data() {
      return {
        titleText: '系统公告',
        xyList: [],
      }
    },

    //创建前
    beforeCreate() {
    },

    //创建后
    created() {
       this._getInfo();
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

      //系统信息
      _getInfo: function () {
        let self = this;
        self.$axios.request({
          url: 'http://cm.legions.tech/api/cm/my/noticeList',
          data: {}
        }).then((res) => {
          let code = parseInt(res.code); //parseInt
          if (code === 1) {
            let list = res.data || [];
            if (list.length === 0) {
              return;
            }
            list.forEach((item, index, arr) => {
              item.time = timestampToTime(item.publishtime);
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
  .gongGao {
    height: 100%;
    background-color: #f4f4f4;
  }

  .xy-list {
    top: 112px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    overflow-y: auto;

    .xy-item {
      color: #bdbcbc;
      padding: 40px 20px;
      border-top: 1px solid #e2e2e2;
      border-bottom: 1px solid #e2e2e2;
      background-color: #ffffff;
      margin-bottom: 20px;

      .xy-title {
        margin: 12px 0;
        color: #000000;
        font-size: 28px;
        font-weight: bold;
      }
    }
  }

</style>
