<template>
	<view class="wrap">
		<view class="key-input">
			<view class="title">输入验证码</view>
			<view class="tips">验证码已发送至 +{{tel}}</view>
			<u-message-input :focus="true" :value="value" @change="change" @finish="finish" mode="bottomLine" :maxlength="maxlength"></u-message-input>
			<text :class="{ error: error }">如果接收不到，请检查手机号是否输入正确</text>
			<view class="captcha">
				<text :class="{ noCaptcha: show }" @click="noCaptcha">收不到验证码点这里</text>
				<text :class="{ regain: !show }">{{ second }}秒后重新获取验证码</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
      tel: '',
			maxlength: 4,
			value: '',
			second: 5,
			show: false,
			error: false
		};
	},
	computed: {},
	onLoad(option) {
		// this.getCaptcha()
    
    // 手机号加密
    let phone = option.tel.substring(0,3) + '****' + option.tel.substr(7)
    // 传递过来的手机号
    this.tel=phone;
    // alert(this.tel);
    
		let interval = setInterval(() => {
			this.second--;
			if (this.second <= 0) {
				this.show = true;
				if (this.value.lenth != 4) {
					this.error = true;
				}
				clearInterval(interval);
			}
		}, 1000);
	},
	methods: {
		// 收不到验证码选择时的选择
		noCaptcha() {
			uni.showActionSheet({
				itemList: ['重新获取验证码', '接听语音验证码'],
				success: function(res) {
					
				},
				fail: function(res) {
					
				}
			});
		},
		// change事件侦听
		change(value) {
			// console.log('change', value);
		},
		// 输入完验证码最后一位执行
		finish(value) {
			// console.log('finish', value);
		}
	}
};
</script>

<style lang="scss" scoped>
.wrap {
	padding: 80rpx;
}

.box {
	margin: 30rpx 0;
	font-size: 30rpx;
	color: 555;
}

.key-input {
	padding: 30rpx 0;
	text {
		display: none;
	}
	.error {
		display: block;
		color: red;
		font-size: 30rpx;
		margin: 20rpx 0;
	}
}

.title {
	font-size: 50rpx;
	color: #333;
}

.key-input .tips {
	font-size: 30rpx;
	color: #333;
	margin-top: 20rpx;
	margin-bottom: 60rpx;
}
.captcha {
	color: $u-type-warning;
	font-size: 30rpx;
	margin-top: 40rpx;
	.noCaptcha {
		display: block;
	}
	.regain {
		display: block;
	}
}
</style>
