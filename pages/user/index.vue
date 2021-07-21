<template>
	<view class="content">
    <meta name="referrer"  content="never">
    <!-- 用户信息 -->
    <view class="user">
      <u-row>
        <u-col span="3">
          <u-image v-if="hasLogin" :src="userInfo.avatarUrl" width="160" height="160" shape="circle" @click="changeHeadPhoto"></u-image>
          <u-image v-else width="160" height="160" shape="circle"></u-image>
        </u-col>
        <u-col span="5" style="padding-left: 1em;">
          <view class="user-name">{{hasLogin ? userInfo.userName : '未登录'}}</view>
          <view class="user-phone">手机：{{(hasLogin && userInfo.phone!='') ? userInfo.phone : '-----------'}}</view>
        </u-col>
        <u-col span="2">
          <text v-if="hasLogin" @click="infoEdit" class="infoEdit">修改\n信息</text>
        </u-col>
        <u-modal v-model="modeShow" @confirm="confirm" ref="uModal" :async-close="true" show-cancel-button content="确认退出登录吗？"></u-modal>
        <u-col span="2">
          <u-button :data-type="hasLogin ? 'on' : 'off'" :type="hasLogin ? 'error' : 'primary'" @click="submit($event)">{{hasLogin ? '退出' : '登录'}}</u-button>
        </u-col>
      </u-row>
    </view>
    
    
    <!-- 用户历史搜索信息 -->
    <view class="user-history">
      <view class="title">
        <u-divider border-color="#FFBC29">
          <u-icon name="star-fill" label="我收藏的" label-color="#FFBC29" color="#FFBC29" size="40"></u-icon>
        </u-divider>
      </view>
      <view v-if="hasLogin" class="user-history">
        <u-time-line>
          <!-- 一项item即为一次历史查看记录 -->
          <u-time-line-item nodeTop="2" v-for="i in 3">
            <!-- 此处自定义了左边内容，用一个图标替代 -->
            <template v-slot:node>
              <view class="u-node" style="background: #ababab;">
              </view>
            </template>
            <!-- 历史记录信息 -->
            <template v-slot:content>
              <view>
                <view class="u-order-title">2019-05-08 12:12</view>
                <view class="u-order-desc">
                  <!-- 历史记录简介 -->
                  <view class="pet">
                    <view class="pet-pic">
                      <u-image width="100%" height="320rpx" src="/static/images/bug.jpg"></u-image>
                      <text class="pet-name">害虫名</text>
                    </view>
                    <view class="pet-info">了解详情></view>
                  </view>
                </view>
              </view>
            </template>
          </u-time-line-item>
        </u-time-line>
      </view>
    </view>
    <view>
      <u-toast ref="uToast" />
    </view>

    
    <u-tabbar
      v-model="current"
      :bg-color="bgColor"
      :border-top="borderTop"
      :list="tabbar"
      :mid-button="midButton"
      :inactive-color="inactiveColor"
      :activeColor="activeColor"
    ></u-tabbar>
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
      toUser(provider) {
        this.login(provider);
        
        uni.reLaunch({
          url: '/pages/user/index'
        });
      }
    },
		data() {
			return {
				current: 0,
				show: true,
        modeShow: false,
				bgColor: '#ffffff',
				borderTop: true,
				tabbar: '',
				current: 0,
				midButton: false, // 用于使底部导航栏中间有突出的圆点
				inactiveColor: '#909399',
				activeColor: '#5098FF',
        // pic:'https://uviewui.com/common/logo.png',
        user: {
          'avatarUrl': '',
          'username': '',
          'phone': ''
        },
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
        }];
        
        
		},
		methods: {
      ...mapMutations(['login', 'logout']),
      // 修改头像
      changeHeadPhoto(){
        this.$refs.uToast.show({
        	title: '修改头像',
        	type: 'error'
        });
      },
      confirm() {
        this.modeShow = false;
        this.logout();
        this.$refs.uToast.show({
        	title: '账号已注销',
        	type: 'success'
        });
      },
      // 跳转登录界面
      submit(event) {
        var logintype = event.target.dataset.type;
        
        if (logintype == 'on') {
          
          this.modeShow = true;
          
        }else {
          uni.navigateTo({
              url:"/pages/user/loginByPwd",
              // url:"../component/classdetails/classdetails?newsid="+ newsid,
              // success:res =>{},
              // fail:() =>{},
              // complete:() => {}
          });
        }
      },
      //想修改个人信息界面跳转
      infoEdit() {
        uni.navigateTo({
            url:"/pages/user/edit",
            // url:"../component/classdetails/classdetails?newsid="+ newsid,
            // success:res =>{},
            // fail:() =>{},
            // complete:() => {}
        });
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
  
  .infoEdit {
    color: rgb(64, 158, 255);
    // text-decoration: underline;
    font-weight: 700;
  }
  .u-node {
  		width: 33rpx;
  		height: 33rpx;
  		border-radius: 100rpx;
  		display: flex;
  		justify-content: center;
  		align-items: center;
  		background: #d0d0d0;
  	}
  	
  	.u-order-title {
  		color: #333333;
  		font-weight: bold;
  		font-size: 32rpx;
  	}
  	
  	.u-order-desc {
  		color: rgb(150, 150, 150);
  		font-size: 28rpx;
  		margin-bottom: 6rpx;
  	}
  	
  	.u-order-time {
  		color: rgb(200, 200, 200);
  		font-size: 26rpx;
  	}

	.text-area {
		display: flex;
		justify-content: center;
	}
  
  .head-pic {
    
  }
	
	.title {
		font-size: 28rpx;
		color: $u-content-color;
	}
	
	.link-demo {
		margin-top: 80rpx;
	}
  
  .user {
    width: 100%;
    // border: 1rpx solid black;
    height: 200rpx;
  }
  .head-pic {
    display: inline-block;
  }
  .user-info {
    display: inline-block;
    height: 200rpx;
  }

  .user-name {
    font-size: 48rpx;
    font-weight: 700;
  }
  
  .user-history {
    margin-top: 1.5em;
   }
   
  
  .pet {
    width: 100%;
    height: 380rpx;
    border: 8rpx solid #f7f7f7;
  }
  
  .pet-pic {
    position: relative;
    width: 100%;
    height: 304rpx;
    background-color: black;
  }
  
  .pet-name {
    position: absolute;
    left: .5em;
    bottom: 0;
    color: white;
    font-weight: 700;
    font-size: 36rpx;
  }
  
  .pet-info {
    padding-top: .8em;
    text-align: right;
    width: 100%;
    height: 68rpx;
    background-color: #f7f7f7;
    color: #2979FF;
  }
</style>
