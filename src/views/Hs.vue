<template>
  <div class="HuiShou">
    <van-nav-bar
      :title="titleText"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="abs hs-page">
      <div class="sub-box">
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

  export default {
    name: 'HuiShou',

    //组件
    components: {
      [NavBar.name]: NavBar,
      [Toast.name]: Toast,
    },

    //初始数据
    data() {
      return {
        titleText: '闲置旧物回收',
        textarea: '',//文本框
        textPla: '家庭地址：',
        titText: '申请信息',
        namePla: '申请人姓名：',
        phonePla: '联系电话：',
        inputName: '',
        inputPhone: '',
        subUrl: require('../assets/hz/sub.png'),
      }
    },

    //创建后
    created() {

    },

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

        if (!self.textarea) {
          Toast.fail('请填写家庭地址');
          return;
        }

        self._getUploader()//提交
      },

      //提交接口
      _getUploader: function () {
        let self = this;
        self.$axios.request({
          url: 'http://cm.legions.tech/api/cm/recovery/save',
          data: {
            openid: window.sessionStorage.getItem("ZHJOpenid"),
            name: self.inputName, //名
            mobile: self.inputPhone,//电话
            address: self.textarea //地址
          },
        }).then((res) => {
          let code = parseInt(res.code); //parseInt
          if (code === 1) {
            Toast.success('提交成功！');
            setTimeout(function () {
              self.$router.push('ms');
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
  .HuiShou {
    height: 100%;
    background-color: #f4f4f4;
  }

  .hs-page {
    top: 112px;
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

    .shen-tit {
      color: #000000;
      font-size: 32px;
      letter-spacing: 2px;
      margin: 50px auto !important;
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
    margin-bottom: 20px !important;
  }

  .sex-box {
    height: 80px;
    line-height: 80px;
    padding-left: 32px;
  }

</style>
