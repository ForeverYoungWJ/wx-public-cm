<template>
  <div class="FanKui">
    <van-nav-bar
      :title="titleText"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="abs fk-box">
      <div class="fw-tit">
        <div class="h-line"></div>
        <div class="tit-text">{{tit1}}</div>
      </div>
      <div class="sub-box">
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
      </div>
      <div class="fw-tit">
        <div class="h-line"></div>
        <div class="tit-text">{{tit2}}</div>
      </div>
      <div class="fl-box">
        <el-input
          class="item-ipt text-ara"
          type="textarea"
          :rows="4"
          :placeholder="textPla"
          v-model="textarea">
        </el-input>
      </div>
      <div class="if-box">
        <van-uploader v-model="imgList" accept="image/*"
                      multiple :max-count="3"
                      :after-read="afterReadImg">
          <img :src="addImg" class="add-img">
        </van-uploader>
        <van-uploader v-model="vdList" accept="video/*"
                      multiple :max-count="1"
                      :after-read="afterReadVideo">
          <img :src="addVd" class="add-img">
        </van-uploader>
        <div class="weizhi">
          <div class="addr-info" @click="wzClc()">
            <van-icon class="ic-w" name="location" color="#1989fa"/>
            <span class="ic-w">{{tiaText}}</span></div>
          <div class="ming" :class="toggleState" @click="nmClc()"><img :src="imgSta"></div>
        </div>
        <van-action-sheet v-model="show" :actions="actions"
                          @select="onSelect" :title="addressTit"/>
      </div>
      <div class="btn-sub" @click="subFun()"><img :src="subUrl"></div>
    </div>
  </div>
</template>

<script>
  import {Toast} from 'vant';
  import {NavBar} from 'vant';
  import {Uploader} from 'vant';
  import {ActionSheet} from 'vant';
  import {Icon} from 'vant';
  import $Axios from 'axios'

  let UploaderImgList;
  let UploaderVideoList;
  let nmUrl = require('../assets/fk/nv.png');//匿名
  let gkUrl = require('../assets/fk/gk.png');//公开
  let latitude; // 纬度，浮点数，范围为90 ~ -90
  let longitude; // 经度，浮点数，范围为180 ~ -180。
  let nmCheck = 1; //匿名状态 0匿名 1公开

  let wx = require('weixin-js-sdk');

  export default {
    name: 'FanKui',

    //组件
    components: {
      [NavBar.name]: NavBar,
      [Uploader.name]: Uploader,
      [Icon.name]: Icon,
      [ActionSheet.name]: ActionSheet,
      [Toast.name]: Toast,
    },

    //初始数据
    data() {
      return {
        tit1: '反馈信息',
        tit2: '情况说明',
        addressTit: '所在位置',
        tiaText: '添加位置',
        titleText: '垃圾分类情况反馈',
        textarea: '',//文本框
        textPla: '请输入具体内容：',
        namePla: '反馈人姓名：',
        phonePla: '联系电话：',
        place: '所在村：',
        inputName: '',
        inputPhone: '',
        dwValue: '',
        imgSta: gkUrl,//匿名图标
        toggleState: 'on',//匿名class 状态
        addImg: require('../assets/fk/addi.png'),
        addVd: require('../assets/fk/addv.png'),
        subUrl: require('../assets/hz/sub.png'),
        dwOptions: [],//村列表
        imgList: [],
        vdList: [],
        show: false, //地址显示f
        actions: []
      }
    },

    //创建前
    beforeCreate() {
    },

    //创建后
    created() {
      let self = this;
      this.upLoadImgSta = false; //上传图片状态
      this.upLoadVdSta = false; //上传视频状态视频
      wx.ready(function () {
        wx.getLocation({
          type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
          success: function (res) {
            // alert(JSON.stringify(res));
            latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
            longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
            //请求地址信息
            self._getInfo2()
          }
        })
      });
      self._getVillage();//村庄列表
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
        this.$router.push('gl')//home
      },

      //点击提交
      subFun: function () {
        let self = this;
        let imglist = self.imgList || [];//图片
        let vdList = self.vdList || [];//视频

        if (!self.inputName) {
          Toast.fail('请填写反馈人姓名');
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
          Toast.fail('请选择村');
          return;
        }

        if (!self.textarea) {
          Toast.fail('请填写情况说明');
          return;
        }

        //判断是否有 视频    有视频无图片
        if (vdList.length > 0 && imglist.length === 0) {
          self.upLoadImgSta = true; //上传图片状态
          self.upLoaderVd(vdList);//上传视频
        }

        //判断是否有 图片   有图片无视频
        if (imglist.length > 0 && vdList.length === 0) {
          self.upLoadVdSta = true; //上传视频状态视频
          self.upLoaderImg(imglist);//上传图片
        }

        //既有图片又有视频
        if (imglist.length > 0 && vdList.length > 0) {
          self.upLoadImgSta = false; //上传图片状态
          self.upLoadVdSta = false; //上传视频状态视频
          self.upLoaderVd(vdList); //上传视频
          self.upLoaderImg(imglist);//上传图片
        }

        //没有上传图片和视频直接提交
        if (vdList.length === 0 && imglist.length === 0) {
          self._getUploader();//提交
        }
      },

      //点击位置
      wzClc: function () {
        this.show = true;
      },

      //获取信息
      _getInfo2: function () {
        let self = this;
        let KEY = "QYFBZ-5WQ3P-TDEDT-LTOXG-HHMLO-MEBUB";//开发密钥
        // let ll = '39.984154' + ',' + '116.307490';
        let ll = latitude + ',' + longitude;
        // alert(ll);
        let url = 'https://apis.map.qq.com/ws/geocoder/v1?&poi_options=address_format=short&get_poi=1';
        this.$jsonp(url, {
          key: KEY,//开发密钥
          // get_poi: "1",//是否返回周边POI列表：1.返回；0不返回(默认)
          location: ll,
          callbackName: "QQmap",//回调函数名字
          output: "jsonp", //返回数据格式
        })
          .then(res => {
            // alert(JSON.stringify(res));
            let addList = res.result.pois;
            addList.forEach((item, index, arr) => {
              let Item = {};
              Item.name = item.title;
              Item.subname = item.address;
              self.actions.push(Item);
            });
          })
          .catch(err => {
            debugger
          });
      },

      //选中地址
      onSelect(item) {
        // 默认情况下，点击选项时不会自动关闭菜单
        // 可以通过 close-on-click-action 属性开启自动关闭
        let addInfo = item.subname;
        let tit = item.name;
        this.tiaText = addInfo + '(' + tit + ')';
        this.show = false;
      },

      //点击匿名
      nmClc() {
        let self = this;
        if (self.toggleState === 'off') {
          self.toggleState = 'on';
          nmCheck = 1; //公开
          self.imgSta = gkUrl;
        } else {
          self.toggleState = 'off';
          nmCheck = 0; //匿名
          self.imgSta = nmUrl;
        }

      },

      //村庄列表
      _getVillage: function () {
        let self = this;
        self.$axios.request({
          url: 'http://cm.legions.tech/api/cm/feedback/village',//总分
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

      // 提交接口
      _getUploader: function () {
        let self = this;
        self.$axios.request({
          url: 'http://cm.legions.tech/api/cm/feedback/save',
          data: {
            openid: window.sessionStorage.getItem("ZHJOpenid"),
            name: self.inputName, //名
            mobile: self.inputPhone,//电话
            address: self.dwValue, //村
            remark:self.textarea, //说明
            position:self.tiaText || '', //位置
            isopen:nmCheck, //匿名 公开
            images:UploaderImgList || '', //图片
            attachfile:UploaderVideoList || '' //视频
          },
        }).then((res) => {
          let code = parseInt(res.code); //parseInt
          if (code === 1) {
            Toast.success('提交成功！');
            self.upLoadImgSta = false; //上传图片状态
            self.upLoadVdSta = false; //上传视频状态视频
            setTimeout(function () {
              self.$router.push('gl');
            },1000)
          } else {
            Toast(res.msg);
          }
        }).catch(err => {
          Toast(err.msg || '请求失败');
        });
      },

      //上传图片
      afterReadImg(file){
        // console.log(file.file);
      },
      //上传视频
      afterReadVideo(file){
        // console.log(file);
      },

      //上传图片
      upLoaderImg: function (imgList) {
        let self = this;
        let formData = new FormData();
        imgList.forEach((item, index, arr) => {
          let Item = '';
          Item = item.file;
          formData.append('file[]', Item);
        });
        $Axios.post('http://cm.legions.tech/api/cm/file/save', formData, {
          headers: {'Content-Type': 'multipart/form-data'}
        }).then((res) => {
            let code = parseInt(res.data.code); //parseInt
            if (code === 1) {
              UploaderImgList = res.data.data;
              self.upLoadImgSta = true; //上传图片状态
              self._check() //检测上传
            }
          }
        ).catch((error) => {
          Toast.fail(error.msg);
        })
      },

      //上传视频
      upLoaderVd: function (vdList) {
        let self = this;
        let formData = new FormData();
        vdList.forEach((item, index, arr) => {
          let Item = '';
          Item = item.file;
          formData.append('file[]', Item);
        });
        $Axios.post('http://cm.legions.tech/api/cm/file/save', formData, {
          headers: {'Content-Type': 'multipart/form-data'}
        }).then((res) => {
            let code = parseInt(res.data.code); //parseInt
            if (code === 1) {
              UploaderVideoList = res.data.data;
              self.upLoadVdSta = true; //上传视频状态视频
              self._check() //检测上传
            }
          }
        ).catch((error) => {
          Toast.fail(error.msg);
        })
      },

      //检测图片 视频上传成功
      _check: function () {
        let self = this;
        //图片 视频都上传好
        if (this.upLoadImgSta && this.upLoadVdSta) {
          self._getUploader();//提交评价
        }
      }
    },

  }
</script>

<style lang="scss" type="text/scss" scoped>
  .FanKui {
    height: 100%;
    background-color: #f4f4f4;
  }

  .fk-box {
    top: 100px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    overflow-y: auto;
  }

  .fw-tit {
    padding-left: 24px;
    line-height: 72px;

    > div {
      display: inline-block;
      vertical-align: middle;
    }

    .h-line {
      font-weight: bold;
      width: 8px;
      height: 32px;
      border-radius: 16px;
      margin-right: 16px;
      background-color: #2f9bfe;
    }

    .tit-text {
      font-size: 26px;
      font-weight: bold;
      letter-spacing: 2px;
    }

    .fen-img {
      width: 100px;
      float: right;
    }
  }

  .sub-box {
    width: 100%;
    /*background-color: #ffffff;*/
  }

  .fl-box {
    width: 100%;
  }

  .if-box {
    width: 96%;
    margin: 0 auto;

  }

  .item-ipt {
    display: block;
    width: 96%;
    margin: 0 auto;
    margin-bottom: 20px;
  }

  .btn-sub {
    width: 500px;
    margin: 0 auto;
    margin-top: 60px;
    margin-bottom: 50px;
  }

  .van-uploader {
    vertical-align: top;
  }

  .add-img {
    width: 160px;
    margin-right: 20px;
  }

  .weizhi {
    width: 100%;
    margin-top: 32px;

    .addr-info {
      width: 80%;
      display: inline-block;
      vertical-align: top;
    }

    .ming {
      width: 20%;
      display: inline-block;
      vertical-align: top;
      text-align: center;

      img {
        width: 80%;
      }
    }

    .ic-w {
      vertical-align: middle;
      margin-right: 8px;
    }
  }

  .van-action-sheet__item {
    text-align: left;
    height: 120px;
    line-height: 120px;
  }

  .van-action-sheet__name {
    display: block;
    height: 60px;
    line-height: 60px;
  }

  .van-action-sheet__subname {
    display: block;
    height: 60px;
    margin-left: 0;
    line-height: 60px;
  }
</style>

<!--//获取信息-->
<!--_getInfo: function () {-->
<!--let self = this;-->
<!--// let ll= latitude+","+longitude;-->
<!--let ll = '39.984154' + ',' + '116.307490';-->
<!--$axios.request({-->
<!--method: 'post',-->
<!--// dataType: 'json',-->
<!--// responseType: 'json',-->
<!--url: 'https://apis.map.qq.com/ws/geocoder/v1',-->
<!--// headers: {-->
<!--//   'Content-Type': "application/json;charset=utf-8"-->
<!--// },-->
<!--transformRequest: [-->
<!--function (data) {-->
<!--let ret = '';-->
<!--for (let it in data) {-->
<!--ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'-->
<!--}-->
<!--ret = ret.substring(0, ret.lastIndexOf('&'));-->
<!--return ret-->
<!--}-->
<!--],-->
<!--data: {-->
<!--key: "QYFBZ-5WQ3P-TDEDT-LTOXG-HHMLO-MEBUB",//开发密钥-->
<!--location: ll,-->
<!--get_poi: "1",//是否返回周边POI列表：1.返回；0不返回(默认)-->
<!--// coord_type:"1",//输入的locations的坐标类型,1 GPS坐标-->
<!--// parameter:{"scene_type":"tohome","poi_num":20},//附加控制功能-->
<!--output: "jsonp"-->
<!--}-->
<!--}).then((res, textStatus) => {-->
<!--debugger-->
<!--}).catch(err => {-->
<!--debugger-->
<!--// Toast(err.msg || '请求失败');-->
<!--});-->
<!--},-->
<!--dwOptions: [{-->
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
<!--}],-->
