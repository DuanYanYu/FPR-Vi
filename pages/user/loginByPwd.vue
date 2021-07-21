<template>
  <view class="content">
    <!-- 信息框 -->
    <u-toast ref="uToast" />
    <!-- 主体 -->
    <view class="title">
      <text>用户名密码登录</text>
      <u-form class="uForm">
        <u-form-item>
          <u-input class="" maxlength="11" v-model="username" placeholder="请输入用户名" />
        </u-form-item>
        <u-form-item>
          <u-input class="" type="password" v-model="pwd" placeholder="请输入密码" />
        </u-form-item>
      </u-form>
      <button @click="loginByPwd" :style="[inputStyle]" class="getCaptcha">登录</button>
      <view class="">
        <view class="alternative" @click="register">账号注册></view>
      </view>
    </view>
    <view class="buttom">
      <u-row>
        <u-col span="6">
          <view class="wechat" >
            <view class="icon"><u-icon size="70" name="weixin-fill" color="rgb(83,194,64)"></u-icon></view>
            <text style="margin-left: .4em;">微信</text>
          </view>
        </u-col>
        
        <u-col span="6" text-align="end">
          <view class="QQ">
            <view class="icon"><u-icon size="70" name="qq-fill" color="rgb(17,183,233)"></u-icon></view>
            <text style="margin-right: .4em;">QQ</text>
          </view>
        </u-col>
      </u-row>
    </view>
    <view>
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
        username: '',
        pwd: ''
      }
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
        if(this.username&&this.pwd) {
          style.color = "#fff";
          style.backgroundColor = this.$u.color['warning'];
        }
        return style;
      }
    },
    methods: {
      ...mapMutations(['login', 'logout']),
      // 用户登录方法
      loginByPwd() {
        
        var username = this.username;
        var pwd = this.pwd;
        
        //检查用户名和密码
        if(username == '' || pwd == '') {
          this.$refs.uToast.show({
          	title: '用户名和密码不能为空',
          	type: 'error'
          });
          return;
        } else {
          // 登录请求
          uni.request({
            url: 'http://ocr.server.truedei.com/ocr/user/userLogin',
            method:'POST',
            data: {
              "accountNumber": username,
              "password": pwd
            },
            success: res => {
              
              if(res.data.messageCode == 200){
                //登录成功
                var data = res.data.result;
                console.log(res);
                var info = {
                  name: data.accountNumber,
                  phone: data.tel,
                  id: data.id,
                  avatarUrl: data.avatarUrl
                };
                
                // var info.name = data.accountNumber;
                // var info.phone = data.tel;
                // var info.id = data.id;
                // var info.avatarUrl = data.avatarUrl;
                this.login(info);
                
                // 成功后提示信息加页面跳转
                this.$refs.uToast.show({
                	title: '登录成功',
                  type: 'success',
                	// url: '/pages/user/index',
                  back: true,
                  duration: 1000,
                  isTab: true
                });
              }else if(res.data.messageCode == 501){
                //账号或密码错误
                this.$refs.uToast.show({
                	title: '用户名或密码错误',
                	type: 'error'
                });
                return;
              }
              
            },
            fail: err=>{
              reject(err);
            }
          });
        }
      },
      // 跳转注册界面
      register() {
        this.$u.route({
        	url: 'pages/user/register'
        });
      }
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
  .alternative {
  	color: grey;
    display: inline-block;
  	/* display: flex; */
  	/* justify-content: space-between; */
  	margin-top: 30rpx;
    width: 100%;
    text-align: right;
    font-size: 32rpx;
  }
  .buttom {
    margin-top: 200rpx;
  	.loginType {
  		display: flex;
  		padding: 350rpx 150rpx 150rpx 150rpx;
  		justify-content:space-between;
  		
  	}
    .QQ, 
    .wechat{
      width: 70rpx;
      text-align: center;
    }
  	
  	.hint {
  		padding: 20rpx 40rpx;
  		font-size: 20rpx;
  		color: $u-tips-color;
  		
  		.link {
  			color: $u-type-warning;
  		}
  	}
  }
</style>
