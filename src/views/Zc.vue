<template>
  <div class="ZhuCan">
    <van-nav-bar
      :title="titleText"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="abs zc-page">
      <div class="sub-box">
        <div class="tit-box">{{tishiText}}</div>
        <div class="shen-tit">{{titText}}</div>
        <el-input
          class="item-ipt"
          :placeholder="namePla"
          v-model="inputName">
        </el-input>
        <div class="item-ipt sex-box">
          <el-radio v-model="radio" label="男">{{sex1Text}}</el-radio>
          <el-radio v-model="radio" label="女">{{sex2Text}}</el-radio>
        </div>
        <el-input
          class="item-ipt"
          :placeholder="phonePla"
          v-model="inputPhone"
          maxlength="11"
          type="tel"
          oninput="value=value.replace(/[^\d]/g,'')"
        >
        </el-input>
        <el-input
          class="item-ipt"
          :placeholder="agePla"
          maxlength="3"
          oninput="value=value.replace(/[^\d]/g,'')"
          v-model="inputAge">
        </el-input>
        <el-input
          class="item-ipt text-ara"
          type="textarea"
          :rows="4"
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

  export default {
    name: 'Zc',

    //组件
    components: {
      [NavBar.name]: NavBar,
      [Toast.name]: Toast,
    },

    //初始数据n
    data() {
      return {
        tishiText: '在线填写您正确的个人信息，1-3个工作日内，将有为老服务中心的工作人员与您电话/上门联系处理',
        radio: '男',//男
        sex1Text: '男',
        sex2Text: '女',
        titleText: '老年助餐',
        textarea: '',//文本框
        textPla: '家庭地址：',
        titText: '申请信息',
        namePla: '申请人姓名：',
        phonePla: '联系电话：',
        agePla: '年龄：',
        inputAge: '',
        inputName: '',
        inputPhone: '',
        subUrl: require('../assets/hz/sub.png'),
      }
    },

    //创建前
    beforeCreate() {
    },

    //创建后
    created() {

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
        this.$router.push('ms')
      },

      //提交
      subFun: function () {
        let self = this;

        if (!self.inputName) {
          Toast.fail('请填写申请人姓名');
          return;
        }
        if (!self.inputPhone) {
          Toast.fail('请填写联系电话');
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

        if (!self.inputAge) {
          Toast.fail('请填写年龄');
          return;
        }

        if (!self.textarea) {
          Toast.fail('请填写家庭地址');
          return;
        }

        self._getUploader();//提交
      },


      //提交接口
      _getUploader: function () {
        let self = this;
        self.$axios.request({
          url: 'http://cm.legions.tech/api/cm/meal/save',
          data: {
            openid: window.sessionStorage.getItem("ZHJOpenid"),
            name: self.inputName, //名
            gender:self.radio,//性别
            mobile: self.inputPhone,//电话
            age: self.inputAge, //村
            address: self.textarea //地址
          },
        }).then((res) => {
          let code = parseInt(res.code); //parseInt
          if (code === 1) {
            Toast.success('提交成功！');
            setTimeout(function () {
              self.$router.push('ms');
            },1000)
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
  .ZhuCan {
    height: 100%;
    background-color: #f4f4f4;
  }

  .zc-page{
    top:122px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    overflow-y: auto;
  }
  .sub-box {
    width: 100%;
    top: 120px;
    left: 0;
    right: 0;
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
      margin: 50px auto !important;
    }
    .btn-sub {
      width: 540px!important;
      margin-top: 60px;
      margin-bottom: 80px;
    }
  }

  .item-ipt {
    display: block;
    margin-bottom: 20px !important;
  }


  .sex-box {
    height: 90px;
    line-height: 80px;
    padding-left: 32px;
    border: none !important;
  }


</style>
