<template>
  <div class="WangGe">
    <van-nav-bar
      :title="titleText"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="abs wg-page">
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
            :key="item.dwValue"
            :label="item.label"
            :value="item.label">
          </el-option>
        </el-select>
        <el-input
          class="item-ipt text-ara"
          type="textarea"
          :rows="3"
          :placeholder="textPla"
          v-model="textarea">
        </el-input>
        <el-input
          class="item-ipt text-ara"
          type="textarea"
          :rows="3"
          :placeholder="textPla2"
          v-model="textarea2">
        </el-input>
        <div class="btn-sub" @click="subFun()"><img :src="subUrl"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import { NavBar } from 'vant';
  import {Toast} from 'vant';

  export default {
    name: 'WangGe',

    //组件
    components: {
      [NavBar.name]: NavBar,
      [Toast.name]: Toast,
    },

    //初始数据
    data() {
      return {
        tishiText:'在线填写您正确的个人信息，1-3个工作日内，将有微网格民生服务中心的工作人员与您电话/上门联系处理',
        titleText:'微网格民生服务',
        textarea: '',//家庭地址
        textarea2:'',//情况说明
        textPla:'家庭地址：',
        textPla2:'情况说明（选填）：',
        titText: '申请信息',
        namePla: '申请人姓名：',
        phonePla: '联系电话：',
        place: '服务类别：',
        inputName: '',
        inputPhone: '',
        dwValue: '',
        subUrl: require('../assets/hz/sub.png'),
        dwOptions: [{
          dwValue: '1',
          label: '家电维修'
        }, {
          dwValue: '2',
          label: '邻里纠纷'
        }, {
          dwValue: '3',
          label: '其他'
        }],
      }
    },

    //创建后
    created() {

    },

    //调用的方法
    methods: {
      onClickLeft() {
        this.$router.push('ms')//home
      },
      //提交
      subFun: function () {
        let self = this;
        //

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

        if (!self.dwValue) {
          Toast.fail('请选择服务类别');
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
          url: 'http://cm.legions.tech/api/cm/service/save',
          data: {
            openid: window.sessionStorage.getItem("ZHJOpenid"),
            name: self.inputName,   //名
            mobile: self.inputPhone,//电话
            category:self.dwValue, //服务类别
            address: self.textarea, //地址
            remark: self.textarea2 //情况说明
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
  .WangGe {
    height: 100%;
    background-color: #f4f4f4;
  }

  .wg-page{
    top:122px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    overflow-y: auto;
  }

  .sub-box {
    width: 100%;
    border-top: 2px solid #dedede;
    border-bottom: 2px solid #dedede;
    background-color: #ffffff;

    > div {
      width: 96%;
      margin: 0 auto;
    }
    .tit-box {
      font-size: 24px;
      margin-top: 32px;
      text-align: justify;
      line-height: 36px;
    }
    .shen-tit {
      color: #000000;
      font-size: 34px;
      letter-spacing: 2px;
      margin: 40px auto !important;
    }
    .btn-sub {
      width: 500px!important;
      margin-top: 60px;
      margin-bottom: 80px;
    }
  }

  .item-ipt {
    display: block;
    /*border-bottom:2px solid #dfdede;*/
    margin-bottom: 30px!important;
  }

</style>
