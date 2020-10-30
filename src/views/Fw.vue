<template>
  <div class="fuwu">
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
    <div class="abs fw-list" v-show="fwSta1">
      <div class="fw-item" v-for="(item,index) in fwList"
           :key="index">
        <div class="tit-box">
          <div class="fw-title">{{item.cate_name}}</div>
          <div class="fw-time">{{item.time}}</div>
        </div>
        <div class="tit-box tit-bot">
          <div class="tit-lei">
            <span>{{fenText}}</span>
            <span>{{item.fcate_name}}</span>
          </div>
          <div class="tit-sta" :class="item.cla">{{item.staText}}</div>
        </div>
      </div>
    </div>
    <!--    pjList-->
    <div class="abs pj-list" v-show="fwSta2">
      <div class="pj-item" v-for="(item,index) in fwList"
           :key="index">
        <div class="pj-bar">
          <div class="pj-l">
            <div class="pj-tit">
              {{item.cate_name}}
            </div>
            <div class="pj-lei">
              <span>{{fenText}}</span>
              <span>{{item.fcate_name}}</span>
            </div>
          </div>
          <div class="abs pj-time">{{item.time}}</div>
        </div>
        <!--        value="item.pjValue"-->
        <textarea class="pj-info" :placeholder="pjTiShi"
                  rows="4" v-model="item.pjValue" style="width: 100%;">
         </textarea>
        <div class="sub-img">
          <!--          max-size	文件大小限制，单位为byte-->
          <van-uploader v-model="item.imgList" accept="image/*" multiple :max-count="3">
            <img :src="addImg" class="add-img">
          </van-uploader>
          <van-uploader v-model="item.vdList" accept="video/*" multiple :max-count="1">
            <img :src="addVd" class="add-img">
          </van-uploader>
        </div>
        <div class="sub-bottom">
          <!--?imgSta1:imgSta2   item.imgSta?imgSta1:imgSta2 :class="toggleState"-->
          <div class="ming" @click="nmClc(index)" ref="pjSta">
            <img :src="item.imgSta1"></div>
          <div class="btn-sub" @click="subFun(index)">{{subText}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {Toast} from 'vant';
  import {NavBar} from 'vant';
  import {Tab, Tabs} from 'vant';
  import {Uploader} from 'vant';
  import {timestampToTime} from '../util/util'
  import $Axios from 'axios'

  let InfoData; //提交的用户数据
  let imgListData, vdListData;//上传图片视频地址
  let Sta;//获取列表状态
  let nmUrl = require('../assets/fk/nv.png');//匿名
  let gkUrl = require('../assets/fk/gk.png');//公开


  export default {
    name: 'fuwu',

    //组件
    components: {
      [Tab.name]: Tab,
      [Tabs.name]: Tabs,
      [Uploader.name]: Uploader,
      [NavBar.name]: NavBar,
      [Toast.name]: Toast,
    },

    //初始数据
    data() {
      return {
        titleText: '我的服务',
        fenText: '分类：',
        activeName: '0',
        pjValue: '',//评价信息
        staText: '已提交',
        pjTiShi: '请输入评价内容',
        fwSta1: true, //服务列表 不评价
        fwSta2: false,//评价列表
        imgSta1: nmUrl,//匿名图标
        activeIcon: 'https://img.yzcdn.cn/vant/user-active.png',
        inactiveIcon: 'https://img.yzcdn.cn/vant/user-inactive.png',
        subText: '提交',
        addImg: require('../assets/fk/addi.png'),
        addVd: require('../assets/fk/addv.png'),
        toggleState: 'off',//匿名class 状态
        tabList: [{
          name: '0',
          title: '全部'
        }, {
          name: '1',
          title: '已提交'
        }, {
          name: '2',
          title: '处理中'
        }, {
          name: '3',
          title: '待评价'
        }],
        imgList: [],
        vdList: [],
        fwList: [],
        pjList: [],
      }
    },

    //创建前
    beforeCreate() {

    },

    //创建后
    created() {
      Sta = '';//全部
      imgListData = '';
      vdListData = '';
      this.upLoadImgSta = false; //上传图片状态
      this.upLoadVdSta = false; //上传视频状态视频
      this._getInfo();//获取服务
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
        this.$router.push('user')//home
      },
      //点击tab
      onClick(name, title) {
        let self = this;
        switch (name) {
          case '0'://全部
            Sta = '';
            self.fwSta1 = true;//服务列表 不评价
            self.fwSta2 = false;//服务列表 评价
            self._getInfo();//获取服务
            break;
          case '1'://处理中
            Sta = '0';
            self.fwSta1 = true;//服务列表 不评价
            self.fwSta2 = false;//服务列表 评价
            self._getInfo();//获取服务
            break;
          case '2'://已提交
            Sta = '1';
            self.fwSta1 = true;//服务列表 不评价
            self.fwSta2 = false;//服务列表 评价
            self._getInfo();//获取服务
            break;
          case '3'://待评价
            Sta = '10';
            self.fwSta1 = false;//服务列表 不评价
            self.fwSta2 = true;//服务列表 评价
            // self.pjList = dList;
            self._getInfo();//获取服务
            break;
        }
      },

      //点击匿名
      nmClc(index) {
        let self = this;
        let state = this.fwList[index].nmSta;//匿名状态
        if (state === 1) { //公开
          self.fwList[index].nmSta = 0;
          self.fwList[index].imgSta1 = nmUrl
        } else { //匿名
          self.fwList[index].nmSta = 1;
          self.fwList[index].imgSta1 = gkUrl
        }
      },

      //点击提交
      subFun: function (index) {
        let self = this;
        let state = this.fwList[index].nmSta; //匿名状态
        let group_id = this.fwList[index].group_id; //所属单位id
        let outid = this.fwList[index].id; //关联id
        let pjValue = this.fwList[index].pjValue;//评论内容
        let imglist = this.fwList[index].imgList || [];//上次的图片
        let vdList = this.fwList[index].vdList || [];//上次的视频

        //判断是否有内容
        if (!pjValue || pjValue === '') {
          Toast.fail('请填写评价内容！');
          return
        }

        //提交的数据
        InfoData = {
          outid: outid, //关联id
          isopen: state, //匿名状态
          group_id: group_id, //所属单位id
          content: pjValue,//评论内容
        };

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
          self.upLoaderVd(vdList);//上传视频
          self.upLoaderImg(imglist);//上传图片
        }

        //没有上传图片和视频直接提交
        if (vdList.length === 0 && imglist.length === 0) {
          self._getPing();//提交
        }
      },

      //列表信息
      _getInfo: function () {
        let self = this;
        self.$axios.request({
          url: 'http://cm.legions.tech/api/cm/my/serverList',
          data: {
            openid: window.sessionStorage.getItem("ZHJOpenid"),
            status: Sta || ''
          }
        }).then((res) => {
          let code = parseInt(res.code); //parseInt
          if (code === 1) {
            let list = res.data;
            list.forEach((item, index, arr) => {
              item.imgList = [];
              item.imgList = [];
              item.time = timestampToTime(item.createtime);
              item.cla = 'st-' + item.status;
              item.imgSta1 = gkUrl;//公开图片
              item.nmSta = 1;  //默认公开
              item.pjValue = '';//评价内容
              switch (item.status) {
                case '0':
                  item.staText = '已提交';
                  break
                case '1':
                  item.staText = '处理中';
                  break
                case '10':
                  item.staText = '待评价';
                  break
              }
            });
            self.fwList = list;
          } else {
            Toast.fail(res.msg);
          }
        }).catch(err => {
          Toast.fail(err.msg || '请求失败');
        });
      },

      //提交评价
      _getPing: function () {
        let self = this;
        self.$axios.request({
          url: 'http://cm.legions.tech/api/cm/my/serverReview',
          data: {
            openid: window.sessionStorage.getItem("ZHJOpenid"),
            outid: InfoData.outid,//关联ID
            group_id: InfoData.group_id,//所属单位ID
            content: InfoData.content,//评论内容
            isopen: InfoData.isopen,//是否公开
            images: imgListData || '',//图片组
            attachfile: vdListData || ''//视频组
          }
        }).then((res) => {
          let code = parseInt(res.code); //parseInt
          if (code === 1) {
            self.upLoadImgSta = false; //上传图片状态
            self.upLoadVdSta = false; //上传视频状态视频
            self._getInfo()//重新获取列表信息
          } else {
            Toast.fail(res.msg);
          }
        }).catch(err => {
          Toast.fail(err.msg || '请求失败');
        });
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
              imgListData = res.data.data;
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
              vdListData = res.data.data;
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
          self._getPing();//提交评价
        }
      }
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  .fuwu {
    background-color: #f4f4f4;
    height: 100%;
  }

  .fw-list {
    top: 200px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    overflow-y: auto;

    .fw-item {
      padding: 32px;
      border-top: 1px solid #e2e2e2;
      border-bottom: 1px solid #e2e2e2;
      margin-bottom: 20px;
      background-color: #ffffff;

      .tit-box {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .fw-title {
          font-size: 30px;
          font-weight: bold;
        }

        .fw-time {
          color: #aaa9ae;
        }

        .tit-lei {
          color: #e0cea1;
          padding: 4px 20px;
          border: 2px solid #e0cea1;
          border-radius: 24px;
        }

        .tit-sta {
          color: #ffffff;
          //background-color: #fe8169;
          width: 100px;
          text-align: center;
          line-height: 44px;
          border-radius: 12px;

          &.st-0 {
            background-color: #fe8169;
          }

          &.st-1 {
            background-color: #6989fe;
          }

          &.st-10 {
            background-color: #47eecd;
          }
        }
      }

      .tit-bot {
        margin-top: 30px;
      }
    }
  }

  .pj-list {
    top: 200px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    overflow-y: auto;

    .pj-item {
      position: relative;
      padding: 32px;
      border-top: 1px solid #e2e2e2;
      border-bottom: 1px solid #e2e2e2;
      background-color: #ffffff;
      margin-bottom: 20px;

      .pj-info {
        box-shadow: none;
        border: none;
        outline: none;
        -webkit-appearance: none;
      }

      .pj-bar {
        line-height: 60px;
        border-bottom: 1px solid #e2e2e2;
      }

      .pj-l {
        > div {
          display: inline-block;
          vertical-align: middle;
        }

        .pj-tit {
          font-size: 30px;
          font-weight: bold;
          margin-right: 20px;
        }

        .pj-lei {
          font-size: 16px;
          line-height: 26px;
          color: #e0cea1;
          padding: 4px 20px;
          border: 2px solid #e0cea1;
          border-radius: 24px;
        }
      }

      .pj-time {
        color: #aaa9ae;
        top: 36px;
        right: 32px;
      }
    }

    .van-uploader {
      vertical-align: top;
    }

    .add-img {
      width: 140px;
      margin-right: 20px;
    }

    .ming {
      width: 100px;
    }

    .sub-bottom {
      margin-top: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;

    }

    .btn-sub {
      width: 160px;
      letter-spacing: 4px;
      font-size: 28px;
      line-height: 52px;
      border-radius: 24px;
      color: #ffffff;
      text-align: center;
      background-color: #2f9bfe;
    }
  }

</style>
