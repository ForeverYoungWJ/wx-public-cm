<template>
  <div class="Hz">
    <van-nav-bar
      :title="titleText"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="abs hz-page">
      <div class="sub-box">
        <div class="tit-box">{{tishiText}}</div>
        <div class="shen-tit">{{titText}}</div>
        <el-input
          class="item-ipt"
          :placeholder="namePla"
          v-model="inputName">
        </el-input>
        <el-input
          class="item-ipt"
          :placeholder="phonePla"
          v-model="inputPhone"
          maxlength="11"
          type="tel"
          oninput="value=value.replace(/[^\d]/g,'')"
        >
        </el-input>
        <el-select v-model="dwValue" :placeholder="place" class="item-ipt">
          <el-option
            v-for="item in dwOptions"
            :key="item.id"
            :label="item.name"
            :value="item.name">
          </el-option>
        </el-select>
        <el-input
          class="item-ipt text-ara"
          type="textarea"
          :rows="6"
          :placeholder="textPla"
          v-model="textarea">
        </el-input>
        <div class="btn-sub" @click="subFun()"><img :src="subUrl"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import {NavBar} from 'vant';
  import {Toast} from 'vant';

  let Id;

  export default {
    name: 'Hz',

    //组件
    components: {
      [NavBar.name]: NavBar,
      [Toast.name]: Toast,
    },

    //初始数据
    data() {
      return {
        tishiText: '',
        titleText: '申请合作',
        textarea: '',//文本框
        textPla: '备注（选填）：',
        titText: '申请信息',
        namePla: '农户姓名：',
        phonePla: '农户电话：',
        place: '所在村：',
        inputName: '',
        inputPhone: '',
        dwValue: '',
        subUrl: require('../assets/hz/sub.png'),
        dwOptions: [],
      }
    },

    //创建前
    beforeCreate() {
    },

    //创建后
    created() {
      Id = this.$route.query.id || '';
      this.tishiText = this.$route.params.brief || '';
      this._getVillage();//村列表
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
      onClickLeft() {
        this.$router.push('ny')//home
      },
      //村庄列表
      _getVillage: function () {
        let self = this;
        self.$axios.request({
          url: 'http://cm.legions.tech/api/cm/feedback/village',
          data: {}
        }).then((res) => {
          let code = parseInt(res.code); //parseInt
          if (code === 1) {
            let list = res.data;
            self.dwOptions = list;
          } else {
            Toast(res.msg);
          }
        }).catch(err => {
          Toast(err.msg || '请求失败');
        });
      },

      //点击提交
      subFun: function () {
        let self = this;

        if (!self.inputName) {
          Toast.fail('请填写农户姓名');
          return;
        }
        if (!self.inputPhone) {
          Toast.fail('请填写农户电话');
          return;
        }

        let re = /^1\d{10}$/;
        let str = self.inputPhone;
        if (re.test(str)) {
          //   alert('成功')
        } else {
          Toast.fail('手机号不合法');
          return;
        }

        if (!self.dwValue) {
          Toast.fail('请选择村');
          return;
        }
        self._getUploader()//提交
      },

      //提交接口
      _getUploader: function () {
        let self = this;
        self.$axios.request({
          url: 'http://cm.legions.tech/api/cm/news/save',
          data: {
            openid: window.sessionStorage.getItem("ZHJOpenid"),
            outid: Id,
            name: self.inputName, //名
            mobile: self.inputPhone,//电话
            address: self.dwValue, //村
            remark: self.textarea, //说明
          },
        }).then((res) => {
          let code = parseInt(res.code); //parseInt
          if (code === 1) {
            Toast.success('提交成功！');
            setTimeout(function () {
              self.$router.push('ny');
            }, 1000)
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
  .Hz {
    height: 100%;
    background-color: #f4f4f4;
  }

  .hz-page {
    top: 92px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    overflow-y: auto;
  }

  .sub-box {
    width: 100%;
    margin-top: 20px;
    border-top: 2px solid #dedede;
    border-bottom: 2px solid #dedede;
    background-color: #ffffff;

    > div {
      width: 96%;
      margin: 0 auto;
    }

    .tit-box {
      margin-top: 40px;
      font-size: 24px;
      text-align: justify;
      line-height: 36px;
    }

    .shen-tit {
      color: #000000;
      font-size: 32px;
      letter-spacing: 2px;
      margin: 40px auto !important;
    }

    .btn-sub {
      width: 500px !important;
      margin-top: 60px;
      margin-bottom: 80px;
    }
  }

  .item-ipt {
    display: block;
    /*border-bottom:2px solid #dfdede;*/
    margin-bottom: 40px !important;
  }


</style>

<!--[{-->
<!--dwValue: '1',-->
<!--label: '六滧村'-->
<!--}, {-->
<!--dwValue: '2',-->
<!--label: '花仓村'-->
<!--}, {-->
<!--dwValue: '3',-->
<!--label: '南江村'-->
<!--}, {-->
<!--dwValue: '4',-->
<!--label: '卫星村'-->
<!--}, {-->
<!--dwValue: '5',-->
<!--label: '春光村'-->
<!--}, {-->
<!--dwValue: '6',-->
<!--label: '米新村'-->
<!--}, {-->
<!--dwValue: '7',-->
<!--label: '阜康村'-->
<!--}, {-->
<!--dwValue: '8',-->
<!--label: '齐南村'-->
<!--}, {-->
<!--dwValue: '9',-->
<!--label: '向化村'-->
<!--}, {-->
<!--dwValue: '10',-->
<!--label: '北港村'-->
<!--}, {-->
<!--dwValue: '11',-->
<!--label: '渔业村'-->
<!--}, {-->
<!--dwValue: '12',-->
<!--label: '向宏居委'-->
<!--}]-->
<!--let map = {-->
<!--0:{tishiText:'您可以申请合作社的产业联盟，1-3个工作日内将有工作人员联系您，审核通过后，上海古宗白山羊合作社将提供您拥有专利认证的饲料，并对长成的白山羊以高于市场价的方式，进行回购。'},//山羊-->
<!--1:{tishiText:'您可以申请合作社的合作农户，1-3个工作日内将有工作人员联系您，审核通过后，上海享农果蔬合作社将以高于市场价的方式，对您的果蔬产品进行采购。'},//果蔬-->
<!--2:{tishiText:''},//水仙花-->
<!--};-->
