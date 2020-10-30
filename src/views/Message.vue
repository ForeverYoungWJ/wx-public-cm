<template>
  <div class="message">
    <van-nav-bar
      :title="titleText"
      left-text=""
    />
    <!-- 组件引用 菜单栏-->
    <div class="home-bar">
      <van-tabs v-model="activeName" color="#2f9bfe" @click="onClick">
        <van-tab v-for="(item,index) in tabList" :key="index"
                 :title="item.title" :name="item.name">
        </van-tab>
      </van-tabs>
    </div>

    <!--列表list-->
    <div class="abs home-list">
      <div class="home-item" v-for="(item,index) in hList"
           :key="index" @click=daiClickFun(index)>
        <div class="tou-img it-h"><img :src="imgUrl"></div>
        <div class="item-tit it-h">
          <div class="item-title">{{item.title}}</div>
          <div class="item-info van-ellipsis">{{item.content}}</div>
        </div>
        <div class="abs item-time">{{item.time}}</div>
      </div>
    </div>
    <div class="abs qing" v-show="qingSta"><img :src="qingUrl"></div>
  </div>
</template>

<script>
  import {Toast} from 'vant';
  import {NavBar} from 'vant';
  import {Tab, Tabs} from 'vant'
  import {Dialog} from 'vant';
  import {timestampToTime} from "../util/util";

  let messState;//消息状态

  export default {
    name: 'message',

    //组件
    components: {
      [NavBar.name]: NavBar,
      [Toast.name]: Toast,
      [Tab.name]: Tab,
      [Tabs.name]: Tabs,
      [Dialog.name]: Dialog,
    },

    //初始数据
    data() {
      return {
        titleText: '消息',
        imgUrl: require('../assets/message/zhong.png'),
        activeName: '0',
        qingSta: false,
        qingUrl: require('../assets/message/qing.png'),
        tabList: [{
          name: '0',
          title: '待查看'
        }, {
          name: '1',
          title: '已查看'
        }],
        hList: []
      }
    },

    //创建后
    created() {
      messState = 0;//未查看
      this._getInfo(); //请求消息接口
    },

    //挂在完成 只会执行一次。
    mounted() {
    },

    //调用的方法
    methods: {
      //点击消息状态
      onClick: function (name, title) {
        let self = this;
        if (parseInt(name) === 0) {
          messState = 0;//未查看
          self.qingSta = false;
          self._getInfo();
        }
        if (parseInt(name) === 1) {
          messState = 1;//已查看
          self.qingSta = false;
          self._getInfo();
        }
      },

      //点击消息提示
      daiClickFun: function (index) {
        let self = this;
        let id = this.hList[index].id;
        let name = this.hList[index].title;
        let info = this.hList[index].content;
        Dialog.alert({
          title: name,
          message: info
        }).then(() => {
          self._getInfoId(id);//根据id查询
        });
      },

      //消息接口
      _getInfo: function () {
        let self = this;
        self.$axios.request({
          url: 'http://cm.legions.tech/api/cm/msg/index',
          data: {
            status: messState,
            openid: window.sessionStorage.getItem("ZHJOpenid")
          }
        }).then((res) => {
          let code = parseInt(res.code); //parseInt
          if (code === 1) {
            let list = res.data;
            list.forEach((item, index, arr) => {
              item.time = timestampToTime(item.createtime);
            });
            self.hList = list;
          } else {
            Toast.fail(res.msg);
          }
        }).catch(err => {
          Toast.fail(err.msg || '请求失败');
        });
      },

      //根据id查询接口
      _getInfoId: function (inId) {
        let self = this;
        self.$axios.request({
          url: 'http://cm.legions.tech/api/cm/msg/get',
          data: {
            id: inId
          }
        }).then((res) => {
          let code = parseInt(res.code); //parseInt
          if (code === 1) {
            self._getInfo()//重新获取数据
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
  .message {
    background-color: #f4f4f4;
    height: 100%;
  }

  .home-bar {
    margin-top: 4px;
  }

  .home-list {
    top: 190px;
    left: 0;
    right: 0;
    bottom: 100px;
    overflow: hidden;
    overflow-y: auto;
  }

  .home-item {
    position: relative;
    color: #908f8f;
    font-size: 26px;
    padding: 20px 40px;
    border-bottom: 2px solid #e3e2e2;
    background-color: #ffffff;

    .it-h {
      display: inline-block;
      vertical-align: middle;
    }

    .tou-img {
      width: 14%;
    }


    .item-tit {
      width: 84%;
      padding-left: 2%;
    }

    .ft-ico {
      margin-right: 6px;
      vertical-align: middle;
    }

    .ft-addr {
      margin-left: 20px;
    }

    .item-clc {
      color: #000000;
      font-weight: bold;
    }

    .item-title {
      font-size: 28px;
      color: #000000;
      font-weight: bold;
      margin-bottom: 8px;
    }

    .item-time {
      right: 36px;
      top: 28px;
    }
  }

  .qing {
    width: 180px;
    right: 32px;
    bottom: 112px;
    z-index: 20;
  }
</style>
