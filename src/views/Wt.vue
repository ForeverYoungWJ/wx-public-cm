<template>
  <div class="page wenTi">
    <div class="banner">
      <img :src="bannerImg">
    </div>
    <div class="info-box">
      <div class="info-tit">
        {{titText}}
      </div>
      <div class="info-text" v-html="infoText">
        {{infoText}}
      </div>
    </div>
    <div class="sel-box1">
      <van-tabs v-model="activeName" color="#2f9bfe" @click="onClick">
        <van-tab v-for="(item,index) in tabList" :key="index"
                 :title="item.title" :name="item.name">
        </van-tab>
      </van-tabs>
    </div>
    <div class="wt-box">
      <div class="dj-item" v-for="(item,index) in djList"
           :key="index">
        <img :src="item.image">
        <div class="dkj-title">{{item.title}}</div>
        <div class="dk-addr">
          <van-icon name="location" color="#298df2"/>
          <span>{{item.address}}</span>
        </div>
        <div class="abs yuyue" @click="clcFun(index)">{{yuText}}</div>
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
      <el-date-picker class="item-ipt"
                      v-model="dataTime1"
                      type="date"
                      placeholder="预约日期"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd">
      </el-date-picker>
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
  import {Tab, Tabs} from 'vant';
  import {Icon} from 'vant';
  import {Field} from 'vant';
  import {Popup} from 'vant';
  import {Toast} from 'vant';

  let outid, subType, openid, name, mobile, data, notes;
  let tabType = '0'; //导航类型 活动申请0 场地申请1

  export default {
    name: 'wenTi',

    //组件
    components: {
      [Tab.name]: Tab,
      [Tabs.name]: Tabs,
      [Popup.name]: Popup,
      [Icon.name]: Icon,
      [Field.name]: Field,
      [Toast.name]: Toast,
    },

    //初始数据
    data() {
      return {
        yuText: '预约',
        show: false,  //弹出预约
        textarea: '',//文本框
        yueText: '申请预约',
        textPla: '备注：',
        namePla: '申请人姓名：',
        phonePla: '联系电话：',
        inputName: '',
        inputPhone: '',
        //预约活动 日期
        dataTime1: '',
        subUrl: require('../assets/hz/sub.png'),
        bannerImg: require('../assets/wt/banner.png'),
        titText: '向化镇社区文化活动中心',
        infoText: '&emsp;&emsp;向化镇社区文化活动中心建成于2014年，按照中国元素、江南韵味、海岛特色、及与我镇灶花文化相呼应的定位，建成传统的“三进两场心”四合院体，占地总面积7305平方米，内设百姓健身房、东方信息苑、亲子活动室、多功能演艺厅、向化镇图书馆等多间功能室，外设一个文化广场，地域面积近1800平方米，是本地开展群众文化体育活动的重要场所，2018年被评为上海市市级文明单位。',
        activeName: '0',
        tabList: [{
          name: '0',
          title: '预约活动'
        }, {
          name: '1',
          title: '预约场地'
        }],
        djList: []
      }
    },

    //创建后
    created() {
      this._getActive();//预约活动
    },

    //调用的方法
    methods: {
      //点击tab
      onClick(name, title) {
        let self = this;
        tabType = name; //导航类型
        switch (name) {
          case '0': //预约活动
            self._getActive();
            break;
          case '1': //预约场地
            self._getSite();
            break;
        }
      },

      //点击预约
      clcFun(index) {
        let self = this;
        outid = self.djList[index].id; //outid
        subType = self.djList[index].title;//type Item
        self.inputName = '';
        self.inputPhone = '';
        self.dataTime1 = '';
        self.textarea = '';
        this.show = true;
      },

      //点击提交
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
        if (!self.dataTime1) {
          Toast.fail('请选择预约日期');
          return;
        }

        //判断申请类型
        if (tabType === '0') { //预约活动
          self._getActApplyFor()
        } else {     //预约场地
          self._getSiteApplyFor()
        }
        // Toast.success('提交成功！');
        //this.show = false;
      },

      //预约活动
      _getActive: function () {
        let self = this;
        self.$axios.request({
          url: 'http://cm.legions.tech/api/cm/culture/index',//总分
          data: {}
        }).then((res) => {
          let code = parseInt(res.code); //parseInt
          if (code === 1) {
            let list = res.data;
            list.forEach((item, index, arr) => {
              item.image = process.env.VUE_APP_wxImgUrl + item.image;
            });
            self.djList = list;

          } else {
            Toast.fail(res.msg);
          }
        }).catch(err => {
          Toast.fail(err.msg || '请求失败');
        });
      },

      //预约场地
      _getSite: function () {
        let self = this;
        self.$axios.request({
          url: 'http://cm.legions.tech/api/cm/culture/index1',
          data: {}
        }).then((res) => {
          let code = parseInt(res.code); //parseInt
          if (code === 1) {
            let list = res.data;
            list.forEach((item, index, arr) => {
              item.image = process.env.VUE_APP_wxImgUrl + item.image;
            });
            self.djList = list;
          } else {
            Toast.fail(res.msg);
          }
        }).catch(err => {
          Toast.fail(err.msg || '请求失败');
        });
      },

      //申请活动
      _getActApplyFor: function () {
        let self = this;
        self.$axios.request({
          url: 'http://cm.legions.tech/api/cm/culture/save',
          data: {
            outid: outid,
            openid: window.sessionStorage.getItem("ZHJOpenid"),
            name: self.inputName,
            mobile: self.inputPhone,
            type: subType,
            date: self.dataTime1,
            notes: self.textarea
          }
        }).then((res) => {
          let code = parseInt(res.code); //parseInt
          if (code === 1) {
            Toast.success('提交成功！');
            self.show = false;
          } else {
            Toast.fail(res.msg);
            self.show = false;
          }
        }).catch(err => {
          Toast.fail(err.msg || '请求失败');
          self.show = false;
        });
      },

      //申请场地
      _getSiteApplyFor: function () {
        let self = this;
        self.$axios.request({
          url: 'http://cm.legions.tech/api/cm/culture/save1',
          data: {
            outid: outid,
            openid: window.sessionStorage.getItem("ZHJOpenid"),
            name: self.inputName,
            mobile: self.inputPhone,
            item: subType,
            date: self.dataTime1,
            notes: self.textarea
          }
        }).then((res) => {
          let code = parseInt(res.code); //parseInt
          if (code === 1) {
            Toast.success('提交成功！');
            self.show = false;
          } else {
            Toast.fail(res.msg);
            self.show = false;
          }
        }).catch(err => {
          Toast.fail(err.msg || '请求失败');
          self.show = false;
        });
      }
    },

  }
</script>
<style lang="scss" type="text/scss">
  .el-picker-panel {
    z-index: 9003 !important;
  }</style>
<style lang="scss" type="text/scss" scoped>
  .banner {
    width: 100%;
  }


  .info-box {
    padding: 0 40px;
  }

  .info-tit {
    letter-spacing: 2px;
    font-size: 32px;
    margin: 28px 0;
    font-weight: bold;
  }

  .info-text {
    text-align: justify;
    font-size: 28px;
    line-height: 44px;
  }

  .sel-box1 {
    margin: 40px 0 16px;
  }

  .sel-item {
    width: 33.3% !important;
  }

  .wt-menu {
    margin: 48px 0 24px;
  }

  .wt-box {
    padding: 20px 40px;

    .dj-item {
      position: relative;
      width: 48%;
      display: inline-block;
      margin-bottom: 40px;

      .dkj-title {
        font-size: 28px;
        font-weight: 500;
        line-height: 32px;
        height: 72px;
        margin-top: 16px;
      }

      .dk-addr {
        color: #bfbfbf;

        i, span {
          vertical-align: middle;
        }
      }

      &:nth-child(odd) {
        margin-right: 4%;
      }
    }

    .yuyue {
      background-color: #2b91f6;
      color: #ffffff;
      width: 80px;
      font-size: 20px;
      text-align: center;
      border-radius: 8px;
      letter-spacing: 4px;
      line-height: 32px;
      right: -12px;
      bottom: 2px;
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


<!--let lbList = [{-->
<!--title: '电影放映',-->
<!--address: '崇明区向化镇',-->
<!--image: require('../assets/wt/10.png')-->
<!--}, {-->
<!--title: '健身气功培训班',-->
<!--address: '崇明区向化镇',-->
<!--image: require('../assets/wt/10.png')-->
<!--}, {-->
<!--title: '培训讲座',-->
<!--address: '崇明区向化镇',-->
<!--image: require('../assets/wt/10.png')-->
<!--}, {-->
<!--title: '少儿拉丁舞班',-->
<!--address: '崇明区向化镇',-->
<!--image: require('../assets/wt/10.png')-->
<!--}, {-->
<!--title: '少儿民乐班',-->
<!--address: '崇明区向化镇',-->
<!--image: require('../assets/wt/10.png')-->
<!--}, {-->
<!--title: '少儿书法班',-->
<!--address: '崇明区向化镇',-->
<!--image: require('../assets/wt/10.png')-->
<!--}, {-->
<!--title: '图书借鉴',-->
<!--address: '崇明区向化镇',-->
<!--image: require('../assets/wt/10.png')-->
<!--}, {-->
<!--title: '文化演出',-->
<!--address: '崇明区向化镇',-->
<!--image: require('../assets/wt/10.png')-->
<!--}, {-->
<!--title: '文体演出',-->
<!--addr: '崇明区向化镇',-->
<!--image: require('../assets/wt/10.png')-->
<!--}, {-->
<!--title: '文体活动掠影',-->
<!--address: '崇明区向化镇',-->
<!--imgUrl: require('../assets/wt/10.png')-->
<!--}, {-->
<!--title: '舞蹈培训',-->
<!--address: '崇明区向化镇',-->
<!--image: require('../assets/wt/10.png')-->
<!--}, {-->
<!--title: '演出排练',-->
<!--address: '崇明区向化镇',-->
<!--image: require('../assets/wt/10.png')-->
<!--}];-->

<!--let xList = [{-->
<!--title: '张伟杰民乐工作室',-->
<!--address: '崇明区向化镇',-->
<!--imgUrl: require('../assets/wt/1.png')-->
<!--}, {-->
<!--title: '向化镇综合排练厅',-->
<!--address: '崇明区向化镇',-->
<!--imgUrl: require('../assets/wt/2.png')-->
<!--}, {-->
<!--title: '向化镇图书馆',-->
<!--address: '崇明区向化镇',-->
<!--imgUrl: require('../assets/wt/3.png')-->
<!--}, {-->
<!--title: '陆纯标书画工作室',-->
<!--address: '崇明区向化镇',-->
<!--imgUrl: require('../assets/wt/4.png')-->
<!--}, {-->
<!--title: '倪红柳拉丁舞工作室',-->
<!--address: '崇明区向化镇',-->
<!--imgUrl: require('../assets/wt/5.png')-->
<!--}, {-->
<!--title: '百姓健身房',-->
<!--address: '崇明区向化镇',-->
<!--imgUrl: require('../assets/wt/6.png')-->
<!--}, {-->
<!--title: '向化镇社区志愿服务中心',-->
<!--address: '崇明区向化镇',-->
<!--imgUrl: require('../assets/wt/7.png')-->
<!--}, {-->
<!--title: '多功能厅',-->
<!--address: '崇明区向化镇',-->
<!--imgUrl: require('../assets/wt/8.png')-->
<!--}, {-->
<!--title: '东方信息苑向化镇苑',-->
<!--address: '崇明区向化镇',-->
<!--imgUrl: require('../assets/wt/9.png')-->
<!--}, {-->
<!--title: '彩虹园',-->
<!--address: '崇明区向化镇',-->
<!--imgUrl: require('../assets/wt/10.png')-->
<!--}, {-->
<!--title: '向化镇“田间小喇叭”综合工作室',-->
<!--address: '崇明区向化镇',-->
<!--imgUrl: require('../assets/wt/11.png')-->
<!--}];-->
