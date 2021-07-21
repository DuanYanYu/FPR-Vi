<template>
  <view class="container">
    <view class="body">
      <!-- 输入的内容 -->
      <textarea v-model="content" placeholder="请输入内容" class="content" />
      <view class="images">
        <!-- 添加的图片 -->
        <view class="item" v-for="(item, index) in upImges" :key="index">
          <u-image width="220" height="220" :src="item" class="image"></u-image>
          <u-icon name="trash" size="40" @click="deleteImg(index)" color="#FF6D4F" class="delete"></u-icon>
        </view>
        <view v-if="upImges.length != 6" class="item upload-btn flex-row" @click="uploadImage">
          <u-icon color="#ccc" size="200" name="plus"></u-icon>
        </view>
        <!-- <u-icon name="photo" color="#2979ff" size="28"></u-icon> -->
      </view>

      <view class="uploadImg">
        <u-button type="warning" @click="sendPosting" shape="square">发布</u-button>
      </view>
    </view>
    <!-- 信息提示框 -->
    <view>
      <u-modal v-model="modelshow" :show-confirm-button="false" :async-close="true" :content="modelcontent"></u-modal>
      <u-toast ref="uToast" />
    </view>
  </view>
</template>

<script>
  import {
    mapState,
    mapMutations
  } from 'vuex'

  export default {
    computed: {
      ...mapState(['hasLogin', 'userInfo']),
      // 将信息保存到store中
    },
    data() {
      return {
        btnPlain: true,
        content: '',
        modelcontent: '请耐心等待图片上传完毕',
        modelshow: false,
        upImges: []
      }
    },
    watch: {
      'upImges': function(newVal) {
        if(newVal.length == 6) {
          this.$refs.uToast.show({
            title: '照片上限为6张',
            type: 'warning',
          });
        }
      }
    },

    methods: {

      // 添加照片
      uploadImage(e) {
        // 判断是从相册获取还是拍照获取
        var type = e.target.dataset.ptype;
        var photoType = [];
        photoType.push(type);

        var self = this;

        var imgdata;
        uni.chooseImage({
          count: 6, //默认9
          sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
          sourceType: photoType, //从相册选择

          success: function(res) {
            // 图片本地地址
            // console.log(JSON.stringify(res.tempFilePaths));
            self.urlToBase64(res.tempFilePaths[0]).then(res => {
              // Base64图片信息
              
              // console.log("res" + res);
              self.base64ToImg(res);
              
            });
          },
        });
      },
      // base64位图片转url地址,并将图片地址存到upImges数组中
      base64ToImg(base64){
        this.modelshow = true;
        uni.request({
          url: 'http://ocr.server.truedei.com/upload/uploadAvatarUrl',
          method: 'POST',
          data: {
            "oneImg": base64
          },
          success: res => {
            this.modelshow = false;
            this.upImges.push(res.data.result.imgUrl);
            
          },
          fail: err => {
            reject(err);
          }
        });
      },
      sendPosting() {
        
        // 没有登录不能发帖
        if (!this.hasLogin) {
          this.$refs.uToast.show({
            title: '您还没有登录，不能发帖',
            type: 'error',
          });
          this.$u.route({
            url: 'pages/folkMasters/index'
          });
          return;
        }
        
        // 评论不能为空
        if (this.content == '' || this.upImges.length == 0) {
          this.$refs.uToast.show({
            title: '帖子内容不能为空',
            type: 'error'
          });
          return;
        }
        
        console.log("照片：");
        console.log(this.upImges);
        
        var imgsUrl = this.upImges.join("#####");
        console.log(imgsUrl);
        
        uni.request({
          url: 'http://ocr.server.truedei.com/topic/submitTopic',
          method: 'POST',
          data: {
            "userId": this.userInfo.id,
            "title": "这是标题",
            "content": this.content,
            "imgs": imgsUrl
          },
          success: res => {
            console.log(res);
          },
          fail: err => {
            reject(err);
          }
        });
      },
      //删除照片
      deleteImg(index) {
        this.upImges.splice(index, 1);

        this.$refs.uToast.show({
          title: '照片已删除',
          type: 'success',
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
    },
    onLoad() {
      
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    height: 100vh;
    overflow: hidden;
  }

  .uploadImg {
    margin-top: 2em;
    text-align: center;
  }

  .module {
    width: 80vw;
    height: 600rpx;
    padding: 30rpx;
    overflow-y: auto;
    margin: 25vh auto 0;
    background-color: #FFF;

    .item {
      height: 80rpx;
      display: inline-block;
      justify-content: flex-start;

      .text {
        margin-left: 20rpx;
      }
    }
  }

  .body {
    padding: 30rpx;
    overflow-y: auto;
    height: calc(100vh - 88rpx - var(--status-bar-height));

    .protocol {
      align-items: flex-start;

      .text {
        color: #999;
        font-size: 28rpx;
        width: calc(100% - 60rpx);
      }
    }

    .items {
      padding: 20rpx 0;

      .item {
        height: 100rpx;
        border-bottom: 2rpx solid #F2F2F2;

        .label {
          color: #666;
          font-size: 30rpx;
          margin-left: 20rpx;
        }

        .value {
          color: #999;
          font-size: 28rpx;
        }
      }
    }


    .content {
      height: 200rpx;
      font-size: 28rpx;
      padding: 20rpx 30rpx;
      border-radius: 10rpx;
      width: calc(100% - 60rpx);
      background-color: #F9F9F9;
    }

    .images {
      overflow: hidden;

      .item {
        float: left;
        margin: 20rpx 20rpx 0 0;
        width: calc((100vw - 100rpx) / 3);
        height: calc((100vw - 100rpx) / 3);
        position: relative;

        &:nth-child(3n) {
          margin-right: 0;
        }

        &.upload-btn {
          cursor: pointer;
          text-align: center;
          flex-direction: column;
          justify-content: center;
          border: 2rpx solid #ededed;
        }

        .image {
          width: 100%;
          height: 100%;
        }

        .delete {
          position: absolute;
          top: 10rpx;
          right: 10rpx;
          z-index: 9;
        }
      }
    }
  }

  .header {
    height: 88rpx;
    padding: 0 30rpx 0 20rpx;
    border-bottom: 2rpx solid #F2F2F2;

    .left,
    .right {
      width: 100rpx;
    }

    .center {
      text-align: center;
      width: calc(100% - 200rpx);
    }

    .right {
      text-align: right;
    }
  }
</style>
