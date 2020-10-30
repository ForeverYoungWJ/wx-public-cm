<template>
  <div class="RenLing">
    <van-nav-bar
      :title="titleText"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="abs sub-box">
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
    </div>
    <div class="abs abs-center btn-sub" @click="subFun()"><img :src="subUrl"></div>
  </div>
</template>

<script>
  import { NavBar } from 'vant';
  export default {
    name: 'RenLing',

    //组件
    components: {
      [NavBar.name]: NavBar,
    },

    //初始数据
    data() {
      return {
        titleText:'微心愿认领',
        textarea: '',//文本框
        textPla:'备注：',
        titText: '申请认领信息',
        namePla: '姓名：',
        phonePla: '联系电话：',
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
        this.$router.push('xy')
      },
      subFun: function () {
        let self = this;

        if (!self.inputName) {
          self.$message({
            message: '请填写姓名',
            type: 'warning'
          });
          return;
        }
        if (!self.inputPhone) {
          self.$message({
            message: '请填写联系电话',
            type: 'warning'
          });
          return;
        }

        let re = /^1\d{10}$/;
        let str = self.inputPhone;
        if (re.test(str)) {
          //   alert('成功')
        } else {
          self.$message({
            message: '手机号不合法',
            type: 'warning'
          });
          return;
        }

        if (!self.textarea) {
          self.$message({
            message: '请填备注',
            type: 'warning'
          });
          return;
        }


        this.$message({
          message: '提交成功！',
          type: 'success'
        });
      }
    },

  }
</script>

<style lang="scss" type="text/scss" scoped>
  .RenLing {
    height: 100%;
    background-color: #f4f4f4;
  }

  .sub-box {
    width: 100%;
    top: 120px;
    left: 0;
    right: 0;
    height: 700px;
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
  }

  .item-ipt {
    display: block;
    /*border-bottom:2px solid #dfdede;*/
    margin-bottom: 20px!important;
  }
  .sex-box {
    height: 80px;
    line-height: 80px;
    padding-left: 32px;
  }
  .btn-sub {
    width: 500px;
    margin-top: 480px;
  }
</style>
