<template>
  <div class="shoucang">
    <van-nav-bar
      :title="titleText"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="abs xy-list">
      <div class="xy-item" v-for="(item,index) in xyList"
           :key="index">
        <div class="xy-img" @click="scClc(index)"><img :src="item.image"></div>
        <div class="xy-info" @click="scClc(index)">
          <div class="xy-tit">{{item.title}}</div>
          <div class="abs xy-bot">
            <span>{{itemText}}</span>
            <span>{{item.time}}</span>
          </div>
        </div>
        <div class="abs btn-del" @click="del(index)">{{delText}}</div>
      </div>
    </div>

  </div>
</template>

<script>
  import {NavBar, Toast} from 'vant';
  import {Dialog} from 'vant';
  import {timestampToTime} from "../util/util";

  export default {
    name: 'shoucang',

    //组件
    components: {
      [NavBar.name]: NavBar,
      [Dialog.name]: Dialog,
    },

    //初始数据
    data() {
      return {
        titleText: '我的收藏',
        itemText: '人文向化',
        delText: '删除',
        xyList: [],
      }
    },

    //创建前
    beforeCreate() {
    },

    //创建后
    created() {
      this._getInfo()
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
      //点击收藏
      scClc: function (index) {
        let id = this.xyList[index].id;
        this.$router.push({name: 'Hk', query: {id: id}}); //query 参数不丢失
      },
      //点击删除
      del: function (index) {
        let self = this;
        let id = this.xyList[index].id;
        Dialog.confirm({
          title: '确认删除',
          message: '确认删除此条收藏记录吗？'
        }).then(() => {
          self._getCollect(id);//取消收藏
        }).catch(() => {
          // on cancel
        });
      },

      //列表信息
      _getInfo: function () {
        let self = this;
        self.$axios.request({
          url: 'http://cm.legions.tech/api/cm/party/collectList',
          data: {
            openid: window.sessionStorage.getItem("ZHJOpenid"),
          }
        }).then((res) => {
          let code = parseInt(res.code); //parseInt
          if (code === 1) {
            let list = res.data;
            if (list.length === 0) {
              self.xyList = [];
              return;
            }
            list.forEach((item, index, arr) => {
              item.image = process.env.VUE_APP_wxImgUrl + item.image;
              item.time = timestampToTime(item.createtime).split(' ')[0]
            });
            self.xyList = list;
          } else {
            Toast.fail(res.msg);
          }
        }).catch(err => {
          Toast.fail(err.msg || '请求失败');
        });
      },

      //取消收藏
      _getCollect: function (inId) {
        let self = this;
        self.$axios.request({
          url: 'http://cm.legions.tech/api/cm/party/Collect',
          data: {
            openid: window.sessionStorage.getItem("ZHJOpenid"),
            outid: inId,
            // status: 0 //取消收藏0
          }
        }).then((res) => {
          let code = parseInt(res.code); //parseInt
          if (code === 1) {
            Toast.success('删除成功！');
            self._getInfo();//重新获取列表
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
  .shoucang {
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
      position: relative;
      padding: 20px;
      background-color: #ffffff;
      border-bottom: 1px solid #dfdede;

      .xy-img {
        display: inline-block;
        vertical-align: top;
        width: 300px;
        margin-right: 20px;
      }

      .xy-info {
        display: inline-block;
        vertical-align: top;
        width: calc(100% - 320px);

        .xy-tit {
          font-size: 28px;
          font-weight: bold;
        }

        .xy-bot {
          color: #9c9c9c;
          bottom: 32px;

          > span {
            margin-right: 10px;
          }
        }
      }

      .btn-del {
        color: #d22b2e;
        right: 28px;
        bottom: 32px;
        z-index: 30;
      }
    }
  }

</style>
