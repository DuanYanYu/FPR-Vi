<template>

  <view class="wrap">
    <view class="top"></view>
    <view class="content">
      <view class="title">修改个人信息</view>
      <!-- 头像 -->
      <view class="">
        <view class="u-avatar-wrap">
          <image class="u-avatar-demo" :src="formData.avatar" mode="aspectFill"></image>
        </view>
        <view class="head-avatar">
          <u-button @click="chooseAvatar" size="medium" type="warning">修改头像</u-button>
        </view>
      </view>
      <!-- 基本信息 -->
      <view>
        <u-form class="uForm">
          <u-form-item label="用户名" label-width="170" left-icon="account">
            <u-input class="" @click="changeName" disabled  maxlength="11" v-model="formData.username" placeholder="请输入用户名" />
          </u-form-item>
          <u-form-item label="性别" label-width="170" left-icon="man">
            <u-radio-group v-model="formData.sex">
              <u-radio v-for="(item, index) in radioList" :key="index" :name="item.name" :disabled="item.disabled">
                {{ item.name }}
              </u-radio>
            </u-radio-group>
          </u-form-item>
          <u-form-item label="年龄" label-width="170">
            <u-input class="" maxlength="2" type="number" v-model="formData.age" placeholder="请输入年龄" />
          </u-form-item>
          <u-form-item label="手机号" label-width="170" left-icon="phone">
            <u-input class="" maxlength="11" v-model="formData.tel" placeholder="请输入手机号" />
          </u-form-item>
          <u-form-item label="邮箱" label-width="170" left-icon="email">
            <u-input class="" maxlength="32" type="email" v-model="formData.email" placeholder="请输入邮箱" />
          </u-form-item>
<!--          <u-form-item label="密码" label-width="170" left-icon="lock">
            <u-input class="" maxlength="32" type="password" v-model="formData.pwd" placeholder="请输入密码" />
          </u-form-item>
          <u-form-item label="确认密码" label-width="170" left-icon="lock">
            <u-input class="" maxlength="32" type="password" v-model="formData.pwd2" placeholder="请再次输入密码" />
          </u-form-item> -->
        </u-form>
        <button @click="editInfo" :style="[inputStyle]" class="getCaptcha">修改</button>
      </view>
    </view>
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
    data() {
      return {
        formData: {
          id: 0,
          username: '',
          age: 0,
          sex: '',
          tel: '',
          email: '',
          // pwd: '',
          // pwd2: '',
          avatar: '',
        },
        modelshow: false,
        modelcontent: '请耐心等待图片上传完毕',
        radioList: [{
            name: '男',
            disabled: false
          },
          {
            name: '女',
            disabled: false
          }
        ]
      }
    },
    onLoad() {

      var userId = this.userInfo.id;
      this.formData.id = userId;
      if (userId == 0 || !userId) {
        uni.reLaunch({
          url: '/pages/user/index'
        });
        return;
      }
      // console.log(this.userInfo.id);
      // 加载用户初始信息
      uni.request({
        url: 'http://ocr.server.truedei.com/ocr/user/getUserById',
        method: 'GET',
        data: {
          "id": userId
        },
        success: res => {
          var data = res.data.result;
          //初始化个人信息到Data()中的FormData中。
          //名字
          if (data.accountNumber != undefined) {
            this.formData.username = data.accountNumber;
          }
          //性别
          if (data.gender != undefined) {
            if (data.gender == 1){
              this.formData.sex = "男";
            }else{
              this.formData.sex = "女";
            }
          }
          //头像
          if (data.avatarUrl != undefined) {
            this.formData.avatar = data.avatarUrl;
          }
          //年龄
          if (data.age != undefined) {
            this.formData.age = data.age;
          }
          //手机号
          if (data.tel != undefined) {
            this.formData.tel = data.tel;
          }
          //邮箱
          if (data.email != undefined) {
            this.formData.email = data.email;
          }

        },
        fail: err => {
          reject(err);
        }
      });
    },
    computed: {
      ...mapState(['hasLogin', 'userInfo']),
      // 将信息保存到store中
      toUser(provider) {
        this.login(provider);

        uni.reLaunch({
          url: '/pages/user/index'
        });
      },
      inputStyle() {
        let style = {};
        if (this.formData.username && this.formData.tel) {
          style.color = "#fff";
          style.backgroundColor = this.$u.color['warning'];
        }
        return style;
      }
    },
    created() {
      // 监听从裁剪页发布的事件，获得裁剪结果
      uni.$on('uAvatarCropper', path => {
        this.avatar = path;
        // 可以在此上传到服务端
        var userId = this.formData.id;
        
        console.log(userId);
        this.modelshow = true;
        //上传头像
        uni.request({
          url: 'http://ocr.server.truedei.com/upload/uploadAvatarUrl',
          method: 'POST',
          data: {
            "oneImg": this.avatar
          },
          success: res => {
            this.modelshow = false;
            this.formData.avatar = res.data.result.imgUrl;
            
            //修改头像
            this.editInfo();
          },
          fail: err => {
            reject(err);
          }
        });
        // uni.uploadFile({
        //   url: 'http://ocr.server.truedei.com/upload/uploadAvatarUrl',
        //   filePath: path,
        //   name: 'file',
        //   complete: (res) => {
        //     console.log(res);
        //   }
        // });
      })
    },
    methods: {
      ...mapMutations(['login']),
      // 头像裁剪
      chooseAvatar() {
        // 此为uView的跳转方法，详见"文档-JS"部分，也可以用uni的uni.navigateTo
        this.$u.route({
          // 关于此路径，请见下方"注意事项"
          url: '/uview-ui/components/u-avatar-cropper/u-avatar-cropper',
          // 内部已设置以下默认参数值，可不传这些参数
          params: {
            // 输出图片宽度，高等于宽，单位px
            destWidth: 300,
            // 裁剪框宽度，高等于宽，单位px
            rectWidth: 200,
            // 输出的图片类型，如果'png'类型发现裁剪的图片太大，改成"jpg"即可
            fileType: 'jpg',
          }
        })
      },
      changeName(){
        this.$refs.uToast.show({          title: '用户名不可修改',          type: 'error',          duration: 1000,        });
      },
      editInfo(){
        // console.log("修改信息")
        var userId = this.userInfo.id;
        uni.request({
          url: 'http://ocr.server.truedei.com/ocr/user/updateUserById',
          method: 'PUT',
          data: {
            "id": userId,
            "gender": this.formData.sex == '男'? 1 : 2,
            "avatarUrl": this.formData.avatar,
            "name": this.formData.username,
            "tel": this.formData.tel,
            "accountNumber": this.formData.username,
            "age": this.formData.age,
            "email": this.formData.email
          },
          success: res => {
            
            if (res.data.message == "修改成功") {
              
              //修改全局用户信息
              var info = {
                name: this.formData.username,
                phone: this.formData.tel,
                id: userId,
                avatarUrl: this.formData.avatar
              };
              this.login(info);
              
              //修改成功后信息提示
              this.$refs.uToast.show({
              	title: '信息修改成功',
                type: 'success',
                duration: 1000,
              });
            }
          },
          fail: err => {
            reject(err);
          }
        });
      },
      // 函数:将图片转换为base64
      urlToBase64(url){
        return new Promise((resolve, reject)=>{
          uni.request({
            url: url,
            method:'GET',
            responseType: 'arraybuffer',
            success: res => {
              let base64 = wx.arrayBufferToBase64(res.data); //把arraybuffer转成base64
              base64 = 'data:image/jpeg;base64,' + base64 //不加上这串字符，在页面无法显示的
              // console.log(base64)
              resolve(base64)
            },
            fail: err=>{
              reject(err)
            }
          });
        });
      },
    }
  }
</script>

<style>
  .content {
    width: 600rpx;
    margin: 80rpx auto 0;
  }

  .title {
    text-align: left;
    font-size: 60rpx;
    font-weight: 500;
    margin-bottom: 100rpx;
  }

  .title u-input {
    margin-top: 2em;
    text-align: left;
    margin-bottom: 10rpx;
    padding-bottom: 6rpx;
  }

  .uForm {
    margin-top: 2em;
  }

  .getCaptcha {
    margin-top: 1em;
    background-color: rgb(253, 243, 208);
    color: #666666;
    border: none;
    font-size: 30rpx;
    padding: 12rpx 0;

    &::after {
      border: none;
    }
  }

  .head-avatar {
    text-align: center;
  }

  .wrap {
    padding: 40rpx;
  }

  .u-avatar-wrap {
    margin-top: 80rpx;
    overflow: hidden;
    margin-bottom: 80rpx;
    text-align: center;
  }

  .u-avatar-demo {
    width: 150rpx;
    height: 150rpx;
    border-radius: 100rpx;
  }
</style>
