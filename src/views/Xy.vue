<template>
  <div class="xinyuan">
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
        <van-image :src="item.image" fit="cover
        " class="xy-img"/>
        <div class="xy-info">
          <div class="xy-title">
            <span>{{xyTit}}</span>
            <span>{{item.name}}</span>
          </div>
          <div class="xy-in van-ellipsis">
            <div v-html="item.content2">{{item.content2}}</div>
          </div>
        </div>
        <div class="abs xy-sta"
             v-html="item.status?'已认领':'待认领'"
             :class="item.status?'sta-rl':'sta-drl'" @click="renFun(index)">
          {{item.status?'已认领':'待认领'}}
        </div>
      </div>
    </div>
    <div class="ren-box" v-show="renSta">
      <div class="ren-bg"></div>
      <div class="abs abs-center xin-box">
        <div class="rl-info">
          <div class="xy-in-it van-ellipsis">
            <span class="it-b">{{name}}</span>
            <span class="it-x">{{nameText}}</span>
          </div>
          <div class="xy-in-it van-ellipsis">
            <span class="it-b">{{sex}}</span>
            <span class="it-x">{{sexText}}</span>
          </div>
          <div class="xy-in-it van-ellipsis">
            <span class="it-b">{{school}}</span>
            <span class="it-x">{{schoolText}}</span>
          </div>
          <div class="xy-in-it van-ellipsis">
            <span class="it-b">{{phone}}</span>
            <span class="it-x">{{phoneText}}</span>
          </div>
          <div class="xy-in-it">
            <span class="it-b">{{info}}</span>
            <span class="it-x" v-html="infoText">{{infoText}}</span>
          </div>
        </div>
        <div class="rl-dj" @click="lingFun()">
          <img class="xy-ico" :src="lingUrl">
        </div>
      </div>
    </div>
    <van-popup
      v-model="show"
      closeable
      class="dlog-box"
    >
      <div class="item-ipt yue-tit">{{yueText}}</div>
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
        :rows="4"
        :placeholder="textPla"
        v-model="textarea">
      </el-input>
      <div class="btn-sub" @click="subFun()"><img :src="subUrl"></div>
    </van-popup>
  </div>
</template>

<script>
  import {NavBar} from 'vant';
  import {Tab, Tabs} from 'vant';
  import {Image} from 'vant';
  import {Popup} from 'vant';
  import {Toast} from 'vant';

  let qState,xyId;

  export default {
    name: 'xinyuan',

    //组件
    components: {
      [Tab.name]: Tab,
      [Tabs.name]: Tabs,
      [Popup.name]: Popup,
      [NavBar.name]: NavBar,
      [Image.name]: Image,
      [Toast.name]: Toast,
    },

    //初始数据
    data() {
      return {
        titleText: '微心愿认领',
        yueText: '认领人信息',
        textPla: '备注：',
        namePla: '认领人姓名：',
        phonePla: '联系电话：',
        xyTit: '许愿人：',
        renSta: false,
        activeName: '0',
        show:false,//认领微心愿 提交
        name: '许愿人：',
        sex: '性别：',
        school: '学校班级：',
        phone: '联系方式：',
        info: '愿望内容：',
        inputName: '',
        inputPhone: '',
        textarea: '',//文本框
        subUrl: require('../assets/hz/sub.png'),
        lingUrl: require('../assets/xy/ren.png'),
        tabList: [{
          name: '0',
          title: '全部'
        }, {
          name: '1',
          title: '待认领'
        }, {
          name: '2',
          title: '已认领'
        }],
        xyList: [],
        nameText: '',
        sexText: '',
        schoolText: '',
        phoneText: '',
        infoText: ''
      }
    },

    //创建前
    beforeCreate() {
    },

    //创建后
    created() {
      qState = '';
      this._getInfo() //心愿列表信息
      // this.xyList = XYlist
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
        this.$router.push('dj');
      },
      //点击tab
      onClick(name, title) {
        let self = this;
        switch (name) {
          case '0':
            qState = '';//全部
            self._getInfo();
            break;
          case '1':
            qState = '0';//未认领
            self._getInfo();
            break;
          case '2':
            qState = '1';//已认领
            self._getInfo();
            break;

        }
      },

      //点击待认领
      renFun: function (index) {
        let self = this;
        let state = this.xyList[index].status;
        if (state === 0) { //未认领
          xyId = this.xyList[index].id;
          self.nameText = this.xyList[index].name;
          self.infoText = this.xyList[index].content;
          self.sexText = this.xyList[index].gender;
          self.schoolText = this.xyList[index].class;
          self.phoneText = this.xyList[index].mobile;
          self.renSta = true;
        }

        // this.$router.push('rl');
      },

      //点击提交 认领信息
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

        self._getSub();//提交信息
      },

      //点击领取心愿
      lingFun() {
        this.renSta = false;
        this.inputName = '';
        this.inputPhone = '';
        this.textarea = '';
        this.show = true;
      },

      //列表  状态
      _getInfo: function () {
        let self = this;
        self.$axios.request({
          url: 'http://cm.legions.tech/api/cm/wish/index',
          data: {
            status:qState
          }
        }).then((res) => {
          let code = parseInt(res.code); //parseInt
          if (code === 1) {
            let list = res.data;
            list.forEach((item, index, arr) => {
              item.image = process.env.VUE_APP_wxImgUrl + item.image;
              item.status = parseInt(item.status);
              item.content2 = '许愿内容：'+item.content.substring(0, 20) + '……';
            });
            self.xyList = list;
          } else {
            Toast.fail(res.msg);
          }
        }).catch(err => {
          Toast.fail(err.msg || '请求失败');
        });
      },

      //提交微心愿
      _getSub:function () {
        let self = this;
        self.$axios.request({
          url: 'http://cm.legions.tech/api/cm/wish/save',
          data: {
            outid:xyId,
            openid:window.sessionStorage.getItem("ZHJOpenid"),
            name:self.inputName,
            mobile:self.inputPhone,
            notes:self.textarea
          }
        }).then((res) => {
          let code = parseInt(res.code); //parseInt
          if (code === 1) {
            self.show = false;
            Toast.success('提交成功！');
            self._getInfo(); //从新获取列表
          } else {
            Toast.fail(res.msg);
          }
        }).catch(err => {
          Toast.fail(err.msg || '请求失败');
        });
      }
    },

  }
</script>

<style lang="scss" type="text/scss" scoped>
  .xinyuan {
    height: 100%;
    background-color: #f4f4f4;
  }

  .xy-list {
    top: 200px;
    left: 0;
    right: 0;
    bottom: 4px;
    overflow: hidden;
    overflow-y: auto;

    .xy-item {
      position: relative;
      padding: 20px;
      background-color: #ffffff;
      margin-bottom: 20px;

      > div {
        display: inline-block;
        vertical-align: top;
        height: 120px;
      }

      .xy-title {
        color: #000000;
        font-weight: bold;
        font-size: 28px;
        margin-bottom: 44px;
      }

      .xy-img {
        width: 120px;
        height: 120px;
        margin-right: 16px;
        display: inline-block;
        vertical-align: top;
      }

      .xy-info {
        width: calc(100% - 136px);
        color: #bdbcbc;
        font-size: 24px;
      }

      .xy-sta {
        color: #ffffff;
        font-size: 22px;
        width: 100px;
        text-align: center;
        line-height: 40px;
        height: 40px !important;
        right: 40px;
        top: 40px;
        border-radius: 8px;

        &.sta-drl {
          background-color: #47eecd;
        }

        &.sta-rl {
          background-color: #f82871;
        }
      }
    }
  }

  .ren-box {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;

    .ren-bg {
      width: 100%;
      height: 100%;
      opacity: .8;
      background-color: #000000;
    }
  }

  .xin-box {
    background-color: #f8f0f1;
    width: 620px;
    border-radius: 8px;
    padding: 40px;

    > div {
      display: inline-block;
      vertical-align: middle;
    }

    .rl-info {
      width: 70%;
      letter-spacing: 2px;

      .xy-in-it {
        font-size: 26px;
        line-height: 40px;

        > div {
          display: inline-block;
          vertical-align: middle;
        }

        .it-b {
          font-weight: bold;
        }
      }
    }

    .rl-dj {
      width: 30%;
    }
  }

  .dlog-box {
    width: 600px;
    border-radius: 32px;
    padding: 100px 40px;
  }

  .item-ipt {
    margin-bottom: 24px;
    width: 100%;
  }

  .ipt-b {
    border: 2px solid #DCDFE6;
  }

  .yue-tit {
    text-align: center;
    font-size: 40px;
    letter-spacing: 4px;
    font-weight: bold;
  }

  .btn-sub {
    width: 320px;
    margin: 0 auto;
    margin-top: 40px;
  }
</style>
