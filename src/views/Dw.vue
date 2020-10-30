<template>
  <div class="dianwei">
    <van-nav-bar
      :title="titleText"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="abs dw-list">
      <div class="dw-item" v-for="(item, index) in dwList" :key="index">
        <div class="abs abs-lf dw-tit">{{item.sortname}}</div>
        <div class="info-list" v-for="(item2,index) in item.list" :key="index">
          <div class="info-address">
            <div class="dw-it">
              <van-icon name="location" color="#d7d7d7"/>
              <div class="addr-b">{{addTit}}</div>
              <div class="addr-i" style="color: #d7d7d7">{{addS}}</div>
            </div>
            <div class="addr-f">{{item2.dump}}</div>
          </div>
          <div class="info-user">
            <div class="dw-it">
              <van-icon name="manager" color="#d7d7d7"/>
              <div class="user-b">{{userTit}}</div>
              <div class="user-i" style="color: #d7d7d7">{{userS}}</div>
            </div>
            <div class="user-f">{{item2.principal}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {NavBar} from 'vant';
  import {Icon} from 'vant';
  import {Toast} from 'vant';
  export default {
    name: 'dianwei',

    //组件
    components: {
      [NavBar.name]: NavBar,
      [Icon.name]: Icon,
      [Toast.name]: Toast,
    },

    //初始数据
    data() {
      return {
        titleText: '垃圾分类点位表',
        addTit: '堆放点',
        addS: ' | ',
        userS: ' | ',
        userTit: '负责人',
        dwList: []
      }
    },

    //创建前
    beforeCreate() {
    },

    //创建后
    created() {
      this._getSite()//点位表信息

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
        this.$router.push('gl');
      },
      //点位表信息
      _getSite: function () {
        let self = this;
        self.$axios.request({
          url: 'http://cm.legions.tech/api/cm/dumps/index',
          data: {}
        }).then((res) => {
          let code = parseInt(res.code); //parseInt
          if (code === 1) {
            let list = res.data;
            self.dwList = list;
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
  .dianwei {
    height: 100%;
    background-color: #f4f4f4;
  }

  .dw-list {
    top: 100px;
    left: 20px;
    right: 20px;
    bottom: 36px;
    overflow: hidden;
    overflow-y: auto;
  }

  .dw-item {
    position: relative;
    background-color: #ffffff;
    margin-top: 60px;
    padding: 32px;
    border-radius: 12px;
  }

  .dw-tit {
    top: -28px;
    text-align: center;
    width: 60%;
    background-color: #298cf2;
    padding: 8px;
    color: #ffffff;
    font-size: 26px;
    font-weight: bold;
    border-radius: 40px;
  }

  .info-list {
    border-bottom: 1px solid #d7d7d7;
    margin-top: 20px;
    line-height: 44px;
    padding-bottom: 16px;

    &:nth-last-child(1) {
      border-bottom: none;
    }
  }

  .addr-b, .user-b {
    font-weight: bold;
  }

  .info-address {
    > div {
      display: inline-block;
      vertical-align: text-top;
    }

    .dw-it {
      width: 20%;

      > i, div {
        display: inline-block;
        vertical-align: middle;
        margin-right: 8px;
      }
    }

    .addr-f {
      width: 80%;
    }
  }

  .info-user {
    > div {
      display: inline-block;
      vertical-align: text-top;
    }

    .dw-it {
      width: 20%;

      > i, div {
        display: inline-block;
        vertical-align: middle;
        margin-right: 8px;
      }
    }

    .user-f {
      width: 80%;
    }
  }
</style>

<!--dwList: [{-->
<!--sortname: '向化村垃圾堆放点位信息表',-->
<!--list: [{-->
<!--dump: '两网融合点（向中路306号）',-->
<!--principal: '沈永家（13311781777）'-->
<!--}, {-->
<!--dump: '建筑垃圾堆放点（向化村向北8队向化公路集建区）',-->
<!--principal: '倪惠忠、李永德、张俊飞 （13918546703、13761891289、15800502870）'-->
<!--}, {-->
<!--dump: '农业废弃物堆放点（向化村万龙4队419号西面）',-->
<!--principal: '秦冬超（18918576948）'-->
<!--}]-->
<!--}, {-->
<!--sortname: '向宏居委垃圾堆放点位信息表',-->
<!--list: [{-->
<!--dump: '两网融合点（向中路306号）',-->
<!--principal: '沈永家（13311781777）'-->
<!--}, {-->
<!--dump: '建筑垃圾堆放点（向化村向北8队向化公路集建区）',-->
<!--principal: '倪惠忠、李永德、张俊飞（13918546703、13761891289、15800502870)'-->
<!--}, {-->
<!--dump: '农业废弃物堆放点（向化村万龙4队419号西面）',-->
<!--principal: '秦冬超（18918576948）'-->
<!--}]-->
<!--}, {-->
<!--sortname: '六滧村居委垃圾堆放点位信息表',-->
<!--list: [{-->
<!--dump: '两网融合点（六滧闸东界河东南）',-->
<!--principal: '施士元（18917006023）'-->
<!--}, {-->
<!--dump: '建筑垃圾堆放点（六滧村闸东2队仓库边）',-->
<!--principal: '秦小法（13601862221）'-->
<!--}, {-->
<!--dump: '农业废弃物堆放点（六滧闸东界河东南）',-->
<!--principal: '施士元（18917006023）'-->
<!--}]-->
<!--}, {-->
<!--sortname: '南江村居委垃圾堆放点位信息表',-->
<!--list: [{-->
<!--dump: '两网融合点（南江4队仓库）',-->
<!--principal: '李光明（18017030566）'-->
<!--}, {-->
<!--dump: '建筑垃圾堆放点（闸西北路/向渔路向西200米）',-->
<!--principal: '李光明（18017030566）'-->
<!--}, {-->
<!--dump: '农业废弃物堆放点（闸西北路/向渔路向西200米）',-->
<!--principal: '李光明（18017030566）'-->
<!--}]-->
<!--}, {-->
<!--sortname: '米新村居委垃圾堆放点位信息表',-->
<!--list: [{-->
<!--dump: '两网融合点（米新村村委会西侧）',-->
<!--principal: '姚红香（13621825845）'-->
<!--}, {-->
<!--dump: '建筑垃圾堆放点（米乐路向化公路向西150米）',-->
<!--principal: '叶熊（18801815194）'-->
<!--}, {-->
<!--dump: '农业废弃物堆放点（米乐路向化公路向西150米）',-->
<!--principal: '叶熊（18801815194）'-->
<!--}]-->
<!--}, {-->
<!--sortname: '春光村居委垃圾堆放点位信息表',-->
<!--list: [{-->
<!--dump: '两网融合点（春光村二堡5队车口二堡丕林界河）',-->
<!--principal: '周俊（13761608992）'-->
<!--}, {-->
<!--dump: '建筑垃圾堆放点（春光村阜南8组春光村阜南827号北边）',-->
<!--principal: '叶熊（18801815194）'-->
<!--}, {-->
<!--dump: '建筑垃圾堆放点（春光村阜南8组春光村阜南827号北边）',-->
<!--principal: '叶熊（18801815194）'-->
<!--}]-->
<!--}, {-->
<!--sortname: '卫星村居委垃圾堆放点位信息表',-->
<!--list: [{-->
<!--dump: '两网融合点（永春村1103号西面）',-->
<!--principal: '李建新（13248124547）'-->
<!--}, {-->
<!--dump: '建筑垃圾堆放点（卫星村422号东面）',-->
<!--principal: '李建新（13248124547）'-->
<!--}, {-->
<!--dump: '农业废弃物堆放点（永春村1103号西面）',-->
<!--principal: '黄德平（17701644061）'-->
<!--}]-->
<!--}, {-->
<!--sortname: '齐南村居委垃圾堆放点位信息表',-->
<!--list: [{-->
<!--dump: '两网融合点（齐南村1021号村委会办公楼后面）',-->
<!--principal: '张礼（18221077316）'-->
<!--}, {-->
<!--dump: '建筑垃圾堆放点（齐南村1021号村委会办公楼后面）',-->
<!--principal: '张礼（18221077316）'-->
<!--}, {-->
<!--dump: '农业废弃物堆放点（齐南村1021号村委会办公楼后面）',-->
<!--principal: '张礼（18221077316）'-->
<!--}]-->
<!--}, {-->
<!--sortname: '春光村居委垃圾堆放点位信息表',-->
<!--list: [{-->
<!--dump: '建筑垃圾堆放点（花仓村丕林3队花仓4号垃圾房后面，园艺场东边）' ,-->
<!--principal: '施永飞（18017654891）'-->
<!--}, {-->
<!--dump: '建筑垃圾堆放点 （花仓村丕林3队花仓4号垃圾房后面，园艺场东边）',-->
<!--principal: '施永飞（18017654891）'-->
<!--}, {-->
<!--dump: '建筑垃圾堆放点 （花仓村丕林3队花仓4号垃圾房后面，园艺场东边）',-->
<!--principal: '施永飞（18017654891）'-->
<!--}]-->
<!--}, {-->
<!--sortname: '北港村居委垃圾堆放点位信息表',-->
<!--list: [{-->
<!--dump: '两网融合点（北港村齐西398队向化公路北沿公路路北）' ,-->
<!--principal: '张礼（18221077316）'-->
<!--}, {-->
<!--dump: '建筑垃圾堆放点 （北港村6队公益墓地西面）',-->
<!--principal: '顾健（13681643467）'-->
<!--}, {-->
<!--dump: '农业废弃物堆放点 （北港村6队公益墓地西面）',-->
<!--principal: '顾健（13681643467）'-->
<!--}]-->
<!--}, {-->
<!--sortname: '六滧港渔业村垃圾堆放点位信息表',-->
<!--list: [{-->
<!--dump: '两网融合点（村委会东侧）' ,-->
<!--principal: '黄耀（13671742594）'-->
<!--}, {-->
<!--dump: '建筑垃圾堆放点 （村委会东侧）',-->
<!--principal: '黄耀（13671742594）'-->
<!--}, {-->
<!--dump: '农业废弃物堆放点 （村委会东侧）',-->
<!--principal: '黄耀（13671742594）'-->
<!--}]-->
<!--}, {-->
<!--sortname: '阜康村垃圾堆放点位信息表',-->
<!--list: [{-->
<!--dump: '两网融合点（齐东815号北侧）' ,-->
<!--principal: '印永仁（18918839085）'-->
<!--}, {-->
<!--dump: '建筑垃圾堆放点（阜康6队电信塔南侧）',-->
<!--principal: '龚世伟（15900761631）'-->
<!--}, {-->
<!--dump: '农业废弃物堆放点（新圩615号北面）',-->
<!--principal: '印永仁（18918839085）'-->
<!--}]-->
<!--}]-->
