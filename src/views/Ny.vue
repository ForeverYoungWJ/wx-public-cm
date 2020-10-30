<template>
  <div class="page nong">
    <div class="banner"><img :src="bannerImg"></div>
    <div class="dj-box">
      <div class="abs dj-list">
        <div class="dj-item" v-for="(item,index) in djList"
             :key="index">
          <img :src="item.image" class="dj-img">
          <div class="item-tit">{{item.title}}</div>
          <div class="item-info" v-html="item.content">{{item.content}}</div>
          <div class="to-see" @click="seeFun(index)">{{seeText}}</div>
          <div class="he-btn" @click="heFun(index)" v-show="btnSta"><img :src="btnUrl"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {Toast} from 'vant';

  export default {
    name: 'nong',

    //组件
    components: {[Toast.name]: Toast},

    //初始数据
    data() {
      return {
        seeText: '查看更多',
        btnSta: true, //显示申请合作按钮
        btnUrl: require('../assets/ny/btn.png'),
        bannerImg: require('../assets/ny/banner.png'),
        djList: []
      }
    },

    //创建前
    beforeCreate() {
    },

    //创建后
    created() {
      this._getList()//合作社信息
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
      //查看更多
      seeFun: function (index) {
        let id = this.djList[index].id;
        this.$router.push({name: 'hzdt', query: {id: id}}) //query 参数不丢失
      },
      //点击合作
      heFun: function (index) {
        let self = this;
        let title = self.djList[index].title;
        let id = self.djList[index].id;
        let brief = self.djList[index].brief; //合作介绍
        if (title === '水仙花合作社') {
          Toast.fail('合作暂未开放');
        } else {
          self.$router.push({name: 'hz', params: {brief: brief}, query: {id: id}})
        }

      },

      //合作社信息
      _getList: function () {
        let self = this;
        self.$axios.request({
          url: 'http://cm.legions.tech/api/cm/news/index',
          data: {}
        }).then((res) => {
          let code = parseInt(res.code); //parseInt
          if (code === 1) {
            let list = res.data;
            list.forEach((item, index, arr) => {
              item.image = process.env.VUE_APP_wxImgUrl + item.image;
              item.content = item.content.substring(0, 84) + '……'
            });
            self.djList = list;
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
  .banner {
    width: 100%;
  }

  .dj-item {
    border-bottom: 1px solid #e9e9e9;
    padding: 40px 20px;

    .dj-img {
      border-radius: 8px;
      margin-bottom: 20px;
    }

    .item-tit {
      font-size: 28px;
      font-weight: bold;
    }

    .item-info {
      line-height: 40px;
      margin: 20px 0;

      > span {
        font-size: 26px !important;
      }
    }

    .to-see {
      font-size: 26px;
      text-align: right;
      color: #908f8f;
    }

    .he-btn {
      width: 320px;
      margin: 56px auto 0;
    }
  }
</style>
<!--[{-->
<!--image: require('../assets/ny/bai.png'),-->
<!--title: '上海古宗白羊山羊合作社',-->
<!--content: '&emsp;&emsp;上海古宗白山羊专业合作社位于上海市崇明区向化镇阜康村，成立于2012年7月...'-->
<!--}, {-->
<!--image: require('../assets/ny/guo.png'),-->
<!--title: '上海享农果蔬专业合作社',-->
<!--content: '&emsp;&emsp;享农始终坚持自创的营运模式——五高农业建设：高人气休闲农业、高品质特色农业、高科技生物...'-->
<!--}, {-->
<!--image: require('../assets/ny/shui.png'),-->
<!--title: '水仙花合作社',-->
<!--content: '&emsp;&emsp;克松是崇明水仙百年世家——施家花厢的后人，凭着复兴崇明水仙的使命感和钻研、敬业的精神... '-->
<!--}]-->
