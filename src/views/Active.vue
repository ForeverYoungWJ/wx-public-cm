<template>
  <div class="active">
    <van-nav-bar
      :title="titleText"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />
    <van-tabs v-model="activeName" color="#2f9bfe" @click="onClick">
      <van-tab v-for="(item,index) in tabList" :key="index"
               :title="item.title" :name="item.name">
      </van-tab>
    </van-tabs>
    <div class="abs xy-list">
      <div class="xy-item" v-for="(item,index) in xyList" :key="index">
        <div class="xy-tit">{{item.type}}</div>
        <div class="xy-info">
          <span>{{timeText}}</span>
          <span>{{item.date}}</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import {NavBar} from 'vant';
  import {Tab, Tabs} from 'vant';
  import {Toast} from 'vant';

  export default {
    name: 'active',

    //组件
    components: {
      [Tab.name]: Tab,
      [Tabs.name]: Tabs,
      [Toast.name]: Toast,
      [NavBar.name]: NavBar,
    },

    //初始数据
    data() {
      return {
        titleText: '已报名活动',
        timeText:'报名时间：',
        activeName: '0',
        tabList: [{
          name: '0',
          title: '服务类别'
        }, {
          name: '1',
          title: '服务项目'
        }],
        xyList: [],
      }
    },

    //创建前
    beforeCreate() {
    },

    //创建后
    created() {
      this._getLei();//请求服务类别
      // this.xyList = Alist
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
      //点击tab
      onClick(name, title) {
        let self = this;
        switch (name) {
          case '0':
            this._getLei();//请求服务类别
            // self.xyList = Alist;
            break;
          case '1':
            this._getXiang();//请求服务项目
            // self.xyList = Xlist;
            break;
        }
      },

      //服务类别接口
      _getLei: function () {
        let self = this;
        self.$axios.request({
          url: 'http://cm.legions.tech/api/cm/my/activityList',
          data: {
            openid:window.sessionStorage.getItem("ZHJOpenid"),
          }
        }).then((res) => {
          let code = parseInt(res.code); //parseInt
          if (code === 1) {
            let data = res.data.activity || [];
            self.xyList= data;
          } else {
            Toast.fail(res.msg);
          }
        }).catch(err => {
          Toast.fail(err.msg || '请求失败');
        });
      },

      //服务项目接口
      _getXiang: function () {
        let self = this;
        self.$axios.request({
          url: 'http://cm.legions.tech/api/cm/my/activityList',
          data: {
            openid:window.sessionStorage.getItem("ZHJOpenid"),
          }
        }).then((res) => {
          let code = parseInt(res.code); //parseInt
          if (code === 1) {
            let data = res.data.place || [];
            data.forEach((item, index, arr) => {
              item.type = item.item;
            });
            self.xyList= data;
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
  .active {
    height: 100%;
    background-color: #f4f4f4;
  }

  .xy-list {
    top: 188px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    overflow-y: auto;
    background-color: #ffffff;

    .xy-item {
      position: relative;
      padding: 20px;
      background-color: #ffffff;
      border-bottom: 1px solid #dfdede;
      .xy-tit {
        font-size: 32px;
        color: #000000;
        font-weight: 400;
      }
      .xy-info{
        margin-top: 24px;
        color: #dfdede;
      }
    }
  }

</style>
