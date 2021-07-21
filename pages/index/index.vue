<template>
  <view class="content">
    <!-- 信息提示框 -->
    <view>
      <u-toast ref="uToast" />
    </view>

    <!-- 头部-----------始 -->
    <view class="head">
      <text class="head_top">AI农林业害虫智能识别系统</text>
    </view>
    <!-- 头部-----------终 -->

    <!-- 主内容---------始 -->
    <view class="body">
      <view class="content">
        <view class="content0"></view>
        <view class="content1"></view>
        <view class="content2"></view>
        <view class="content3"></view>
        <view class="content4" @click="chooseImage" data-ptype="camera album">
          <u-image shape="circle" width="300rpx" height="300rpx" src="/static/images/bug.jpg"></u-image>
        </view>
      </view>
      <!-- 
        功能项：
        按钮-点击拍照
        链接-点击查找本机相册的照片
       -->
      <u-button @click="chooseImage" :ripple="true" type="primary" ripple-bg-color="#55ffff" data-ptype="camera">点击拍照
      </u-button>
      <view class="pic">
        <text @click="chooseImage" data-ptype="album">从相册选择 ></text>
      </view>

      <!-- 主内容---------终 -->
    </view>

    <!-- 所有内容的容器 -->
    <view class="u-page">
      <!-- 查询结果 -->
      <u-popup v-model="show" mode="bottom" border-radius="14" height="700rpx">
        <view>
          <u-card v-for="petInfo in petsInfo" @click="showPet(petInfo.id)" margin="40rpx 60rpx"
            :title="petInfo.pastName" :sub-title="petInfo.item + '>' + petInfo.branch + '>' +petInfo.dependant"
            title-size="40">
            <view class="" slot="body">
              <view class="cardImage">
                <text class="recognition">精度:{{petInfo.accuracy}}</text>
                <u-image width="380rpx" border-radius="25rpx" height="380rpx" :src="petInfo.images.split('#####')[0]">
                </u-image>
              </view>
              <view style="text-align: center;">
                <text>查看详情 ></text>
              </view>
            </view>
          </u-card>
        </view>
      </u-popup>
    </view>

    <!-- 加载框--加载信息 -->
    <view class="">
      <!-- 用于上传图片后加载框 -->
      <u-modal v-model="modelShow" :content="modelContent" ref="uModal" :async-close="true"
        :show-confirm-button="false"></u-modal>
      <!-- 给用户选择要识别的类型 -->
      <u-modal v-model="modelShow2" show-cancel-button cancel-color="#2979ff" :content="modelContent2" ref="uModal"
        @confirm="allSearch()" confirm-text="万物识别" @cancel="petSearch()" cancel-text="害虫识别"></u-modal>
    </view>

    <!-- 与包裹页面所有内容的元素u-page同级，且在它的下方 -->
    <u-tabbar v-model="current" :bg-color="bgColor" :border-top="borderTop" :list="tabbar" :mid-button="midButton"
      :inactive-color="inactiveColor" :activeColor="activeColor" :change="change"></u-tabbar>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        current: 0,
        bgColor: '#ffffff',
        borderTop: true,
        tabbar: '',
        current: 0,
        midButton: false, // 用于使底部导航栏中间有突出的圆点
        inactiveColor: '#909399',
        activeColor: '#5098FF',
        show: false,
        imgList: '',
        petsInfo: [],
        petUrl: '',
        modelShow: false,
        modelShow2: false,
        modelContent: '正在进行识别，请耐心等待！\n提示：图片越小识别越快！）',
        modelContent2: '请根据选择的图片选择识别范围（万物识别：可识别生活中大部分物品；昆虫识别：只识别昆虫）'
      }
    },
    onLoad() {
      this.tabbar = [{
          "pagePath": "/pages/folkMasters/index",
          "iconPath": "/static/icon/cum.png",
          "selectedIconPath": "/static/icon/cum-full.png",
          "text": "高手社区",
          customIcon: false,
        },
        // {
        //     "pagePath": "/pages/expert/index",
        //     "iconPath": "/static/icon/rc.png",
        //     "selectedIconPath": "/static/icon/rc-full.png",
        //     "text": "询问专家",
        //     customIcon: false,
        // },
        {
          "pagePath": "/pages/index/index",
          "iconPath": "/static/icon/scan.png",
          "selectedIconPath": "/static/icon/scan-full.png",
          "text": "扫一扫",
          // "midButton": true,
          "customIcon": false,
        },
        {
          "pagePath": "/pages/petsLibrary/index",
          "iconPath": "/static/icon/bug.png",
          "selectedIconPath": "/static/icon/bug-full.png",
          "text": "智虫库",
          customIcon: false,
        },
        {
          "pagePath": "/pages/user/index",
          "iconPath": "account",
          "selectedIconPath": "account-fill",
          "text": "我",
          customIcon: false,
        }
      ]
    },
    methods: {
      change(index) {

      },
      chooseImage(e) {
        // 判断是从相册获取还是拍照获取
        var type = e.target.dataset.ptype;
        var photoType = [];
        photoType.push(type);

        var self = this;
        var imgdata;

        uni.chooseImage({
          count: 1, //默认9
          sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
          sourceType: photoType, //从相册选择
          success: function(res) {
            // 图片本地地址
            // console.log(JSON.stringify(res.tempFilePaths));
            // self.modelShow2 = true;
                  self.modelShow = true;
            var base64 = '';

            console.log(res.tempFiles[0].size);
            if (res.tempFiles[0].size / 1024 / 1024 >= 10) {
              self.$refs.uToast.show({
                title: '请保证图片大小在10M内',
                type: 'error',
                duration: 1000,
              });
              self.modelShow = false;
              return
            }
            
            if (res.tempFiles[0].size / 1024 / 1024 < 1.2) {
              self.urlToBase64(res.tempFilePaths[0]).then(res => {
                // Base64图片信息
                console.log(self.imgList.concat(res));
                self.imgList = '';
                self.imgList = self.imgList.concat(res);

                self.getPetInfo();
              });
            } else {
              self.compressImg(res.tempFiles[0], res => {
                console.log(res);
                self.imgList = '';
                self.imgList = res;
                self.getPetInfo();
              });
            }


            //图片文件转为二进制流
            // console.log(res.tempFiles[0]);
            // self.getPetInfo2(res.tempFilePaths);


            //图片文件转为base64


            // console.log(self.imgList);
            // 传递照片获取信息
          },
          fail: function(error) {
            console.log(error);
            self.modelShow = false;
            self.$refs.uToast.show({
              title: '获取信息失败，请稍后再试',
              type: 'error',
              duration: 1000,
            });
          }
        });
      },
      // 函数:显示pet信息界面
      showPet(petId) {
        uni.navigateTo({
          url: "/pages/petsLibrary/pet?id=" + petId,
          // url:"../component/classdetails/classdetails?newsid="+ newsid,
          // success:res =>{},
          // fail:() =>{},
          // complete:() => {}
        });
      },
      // 函数:将图片转换为base64
      urlToBase64(url) {
        return new Promise((resolve, reject) => {
          uni.request({
            url: url,
            method: 'GET',
            responseType: 'arraybuffer',
            success: res => {
              let base64 = wx.arrayBufferToBase64(res.data); //把arraybuffer转成base64
              base64 = 'data:image/jpeg;base64,' + base64 //不加上这串字符，在页面无法显示的
              // console.log(base64)
              resolve(base64)
            },
            fail: err => {
              reject(err)
            }
          });
        })
      },
      // 函数:进行上传照片和分析结果请求
      getPetInfo() {
        var imgdata = {
          "oneImg": this.imgList
        }

        uni.request({
          url: 'http://ocr.server.truedei.com/ocr/ocrOnePic',
          method: 'POST',
          data: imgdata,
          success: res => {
            console.log(res);
            // 保存查询后的害虫数据
            if (res.data.messageCode == 200) {
              console.log(this.petsInfo);
              this.petsInfo = res.data.data;
              // this.petUrl = res.data.url;
              // 显示隐藏框
              this.modelShow = false;
              this.$refs.uToast.show({
                title: '查询结果为' + this.petsInfo.length + '条！',
                type: 'success',
                duration: 1500,
              });
              this.show = true;

            } else if (res.data.messageCode == 501) {
              this.modelShow = false;
              // 获取信息失败
              this.$refs.uToast.show({
                title: '获取信息失败，请稍后再试',
                type: 'error',
                duration: 1000,
              });
            } else {
              this.modelShow = false;
              this.$refs.uToast.show({
                title: '网络原因获取失败，请稍后再试',
                type: 'error',
                duration: 1000,
              });
            }

          },
          fail: err => {
            console.log(err);
            this.modelShow = false;
            this.$refs.uToast.show({
              title: '图片太大了，请更换后重试！',
              type: 'error',
              duration: 1000,
            });
          }
        });
      },
      getPetInfo2(tempFilePaths) {

        uni.uploadFile({
          url: 'http://ocr.server.truedei.com/ocr/ocrOnePic2', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          // formData: {
          //     'user': 'test'
          // },
          success: (uploadFileRes) => {
            console.log(uploadFileRes);
          }
        });
        //   uni.request({
        //     url: 'http://ocr.server.truedei.com/ocr/ocrOnePic2',
        //     method:'POST',
        //     data: imgdata,
        //     success: res => {
        //       console.log(res);
        //       // 保存查询后的害虫数据
        //       if (res.data.messageCode == 200) {
        //         console.log(this.petsInfo);
        //         this.petsInfo = res.data.data;
        //         // this.petUrl = res.data.url;
        //         // 显示隐藏框
        //         this.modelShow = false;
        //         this.$refs.uToast.show({
        //         	title: '查询结果为' + this.petsInfo.length + '条！',
        //           type: 'success',
        //           duration: 1500,
        //         });
        //         this.show = true;

        //       } else if(res.data.messageCode == 501) {
        //         this.modelShow = false;
        //         // 获取信息失败
        //         this.$refs.uToast.show({
        //         	title: '获取信息失败，请稍后再试',
        //           type: 'error',
        //           duration: 1000,
        //         });
        //       }else {
        //         this.modelShow = false;
        //         this.$refs.uToast.show({
        //         	title: '网络原因获取失败，请稍后再试',
        //           type: 'error',
        //           duration: 1000,
        //         });
        //       }

        //     },
        //     fail: err=>{
        //       console.log(err);
        //       this.modelShow = false;
        //       this.$refs.uToast.show({
        //       	title: '网络原因获取失败，请稍后再试',
        //         type: 'error',
        //         duration: 1000,
        //       });
        //     }
        //   });
      },
      petSearch() {
        this.$refs.uToast.show({
          title: '害虫识别',
          type: 'error',
          duration: 1000,
        });
      },
      allSearch() {
        this.$refs.uToast.show({
          title: '万物识别',
          type: 'error',
          duration: 1000,
        });
      },
      startSearch() {

      },
      //压缩图片方法
      compressImg(file, callback) {
        var src;
        var fileSize = parseFloat(parseInt(file['size']) / 1024 / 1024).toFixed(2);
        var read = new FileReader();
        read.readAsDataURL(file);
        read.onload = function(e) {
          var img = new Image();
          img.src = e.target.result;
          img.onload = function() {
            //默认按比例压缩   
            var w = this.width,
              h = this.height;
            //生成canvas   
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            var base64;
            // 创建属性节点   
            canvas.setAttribute("width", w);
            canvas.setAttribute("height", h);
            ctx.drawImage(this, 0, 0, w, h);
            if (fileSize < 1) {
              //如果图片小于一兆 那么不执行压缩操作
              base64 = canvas.toDataURL(file['type'], 1);
            } else if (fileSize > 1 && fileSize < 2) {
              //如果图片大于1M并且小于2M 那么压缩0.5
              base64 = canvas.toDataURL(file['type'], 0.5);
            } else {
              //如果图片超过2m 那么压缩0.2
              base64 = canvas.toDataURL(file['type'], 0.2);
            }
            // 回调函数返回file的值   
            callback(base64);
          };
        };
      }
    }
  }
</script>

<style lang="scss" scoped>
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40rpx;
  }

  .logo {
    height: 200rpx;
    width: 200rpx;
    margin-top: 100rpx;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 50rpx;
  }

  .text-area {
    display: flex;
    justify-content: center;
  }

  .title {
    font-size: 28rpx;
    color: $u-content-color;
  }

  .button-demo {
    margin-top: 80rpx;
  }

  .link-demo {
    margin-top: 80rpx;
  }

  // 卡片样式
  view.cardImage {
    display: inline-block;
    position: relative;
    left: 50%;
    margin-left: -190rpx;
    width: 380rpx;
    height: 380rpx;
  }

  /* 初始化样式 */
  view,
  image {
    margin: 0;
    padding: 0;
  }

  /* 头部样式-----------------始 */
  .head {
    position: relative;
    width: 100%;
    height: 240rpx;
  }

  /* 头部背景 */
  .head image {
    width: 100%;
    height: 240rpx;
  }

  /* 头部标题 */
  .head .head_top {
    position: absolute;
    top: 20%;
    left: 50%;
    margin-left: -5em;
    font-weight: 700;
    font-size: 20px;
  }

  /* 头部样式----------------------终 */


  /* 主内容样式--------------------始 */
  .body {
    width: 750rpx;
    height: 700rpx;
  }

  .body .content {
    position: relative;
    height: 400rpx;
    display: grid;
    place-items: center;
  }

  .body .content0,
  .body .content1,
  .body .content2,
  .body .content3 {
    position: absolute;
  }

  .body .content0 {

    z-index: 555;
    left: 50%;
    margin-left: -230rpx;
    width: 460rpx;
    height: 460rpx;
    background-color: rgba(88, 181, 230, 0.1);
    border-radius: 220rpx;
    -webkit-animation: fade_0 1.7s ease-in 0s infinite;
    animation: fade_0 1.7s ease-in 0s infinite;
  }

  .body .content1 {
    position: absolute;
    z-index: 666;
    left: 50%;
    margin-left: -205rpx;
    width: 410rpx;
    height: 410rpx;
    background-color: rgba(88, 181, 230, 0.2);
    border-radius: 200rpx;
    -webkit-animation: fade_3 1.7s ease-in 0s infinite;
    animation: fade_3 1.7s ease-in 0s infinite;
  }

  .body .content2 {
    /*水平垂直居中*/
    position: absolute;
    z-index: 777;
    left: 50%;
    margin-left: -180rpx;
    width: 360rpx;
    height: 360rpx;
    background-color: rgba(88, 181, 230, 0.5);
    border-radius: 180rpx;
    -webkit-animation: fade_2 1.7s ease-in 0s infinite;
    animation: fade_2 1.7s ease-in 0s infinite;
  }

  .body .content3 {
    position: absolute;
    z-index: 888;
    /*水平垂直居中*/
    left: 50%;
    margin-left: -150rpx;
    width: 300rpx;
    height: 300rpx;
    background-color: rgba(88, 181, 230, 1.0);
    border-radius: 150rpx;
    -webkit-animation: fade_1 1.7s ease-in 0s infinite;
    animation: fade_1 1.7s ease-in 0s infinite;
  }

  .body .content4 {
    position: absolute;
    left: 50%;
    margin-left: -150rpx;
    z-index: 999;
    display: inline-block;
    width: 300rpx;
    height: 300rpx;
    border-radius: 150rpx;
    -webkit-animation: fade_5 1.7s ease-in 0s infinite;
    animation: fade_5 1.7s ease-in 0s infinite;
  }

  /* 拍照按钮 */
  .body button {
    width: 280rpx;
    margin-top: 200rpx;
  }

  /* 从相册选择照片*/
  .body .pic {
    margin-top: 40rpx;
    text-align: center;
  }

  /* 主内容样式--------------------终 */

  .recognition {
    display: inline-block;
    margin-bottom: .5em;
    width: 100%;
    text-align: center;
    color: green;
  }

  /* 动画 */
  @-webkit-keyframes fade_1 {
    0% {
      opacity: 0;
    }

    12% {
      opacity: 1;
    }

    24% {
      opacity: 1;
    }

    36% {
      opacity: 1;
    }

    48% {
      opacity: 1;
    }

    60% {
      opacity: 0;
    }

    72% {
      opacity: 0;
    }

    88% {
      opacity: 0;
    }

    100% {
      opacity: 0;
    }
  }

  @-webkit-keyframes fade_2 {
    0% {
      opacity: 0;
    }

    12% {
      opacity: 0;
    }

    24% {
      opacity: 1;
    }

    36% {
      opacity: 1;
    }

    48% {
      opacity: 1;
    }

    60% {
      opacity: 1;
    }

    72% {
      opacity: 0;
    }

    88% {
      opacity: 0;
    }

    100% {
      opacity: 0;
    }
  }

  @-webkit-keyframes fade_3 {
    0% {
      opacity: 0;
    }

    12% {
      opacity: 0;
    }

    24% {
      opacity: 0;
    }

    36% {
      opacity: 1;
    }

    48% {
      opacity: 1;
    }

    60% {
      opacity: 1;
    }

    72% {
      opacity: 1;
    }

    88% {
      opacity: 0;
    }

    100% {
      opacity: 0;
    }
  }

  @-webkit-keyframes fade_0 {
    0% {
      opacity: 0;
    }

    12% {
      opacity: 0;
    }

    24% {
      opacity: 0;
    }

    36% {
      opacity: 0;
    }

    48% {
      opacity: 1;
    }

    60% {
      opacity: 1;
    }

    72% {
      opacity: 1;
    }

    88% {
      opacity: 1;
    }

    100% {
      opacity: 0;
    }
  }
</style>
