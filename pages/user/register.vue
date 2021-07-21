<template>
  <view class="content">
    
    <!-- 信息框 -->
    <u-toast ref="uToast" />
    
    <view class="title">
      <text>账号注册</text>
      <u-form class="uForm">
        <u-form-item>
          <u-input class="" type="text" maxlength="8" v-model="username" placeholder="请输入用户名" />
        </u-form-item>
        <u-form-item>
          <u-input class="" type="password" v-model="pwd" placeholder="请输入密码" />
        </u-form-item><u-form-item>
          <u-input class="" type="password" v-model="pwd2" placeholder="请再次输入密码" />
        </u-form-item>
      </u-form>
      <button @click="register" :style="[inputStyle]" class="getCaptcha">注册</button>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        pwd: '',
        pwd2: '',
        username: ''
      }
    },
    computed: {
      inputStyle() {
        let style = {};
        if (this.pwd&&this.pwd2&&this.username) {
          style.color = "#fff";
          style.backgroundColor = this.$u.color['warning'];
        }
        return style;
      }
    },
    methods: {
      
      // 用户注册方法
      register() {
        
        if(this.tel == '' || this.pwd == '' || this.pwd2 == '' || this.username == '') {
          this.$refs.uToast.show({
          	title: '请将信息填入完整进行注册',
          	type: 'error'
          });
        } else if (this.pwd != this.pwd2) {
          
          // 检验两次密码是否一致
          this.$refs.uToast.show({
          	title: '输入的两次密码不一致',
          	type: 'error'
          });
          this.pwd = '';
          this.pwd2 = '';
        } else {
          
          // 注册请求
          uni.request({
            url: 'http://ocr.server.truedei.com/ocr/user/registration',
            method:'POST',
            data: {
              "accountNumber": this.username,
              "password": this.pwd
            },
            success: res => {
              console.log(res);
              if (res.data.message == '注册成功') {
                // 成功后提示信息加页面跳转
                this.$refs.uToast.show({
                  title: '注册成功',
                  type: 'success',
                  url: '/pages/user/loginByPwd',
                  duration: 1000
                });
              } else if(res.data.message == '已存在该账号！') {
                this.$refs.uToast.show({
                	title: '该用户名已存在！',
                	type: 'error'
                });
                this.username = '';
              }
            },
            fail: err=>{
              reject(err);
            }
          });
        }
        

        
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
