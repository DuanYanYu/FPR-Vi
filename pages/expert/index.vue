<template>
  <view>
    <view @click="toPush()">push</view>
    
    <u-tabbar v-model="current" :bg-color="bgColor" :border-top="borderTop" :list="tabbar" :mid-button="midButton"
      :inactive-color="inactiveColor" :activeColor="activeColor"></u-tabbar>
  </view>
  
  
</template>

<script>
  export default {
    data() {
      return {
        current: 0,
        show: true,
        bgColor: '#ffffff',
        borderTop: true,
        tabbar: '',
        current: 0,
        midButton: true,
        inactiveColor: '#909399',
        activeColor: '#5098FF',
        
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
        {
          "pagePath": "/pages/expert/index",
          "iconPath": "/static/icon/rc.png",
          "selectedIconPath": "/static/icon/rc-full.png",
          "text": "询问专家",
          customIcon: false,
        },
        {
          "pagePath": "/pages/index/index",
          "iconPath": "/static/icon/scan.png",
          "selectedIconPath": "/static/icon/scan-full.png",
          "text": "扫一扫",
          "midButton": true,
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
      toPush(){
        this.$u.route({
          url: 'pages/folkMasters/push'
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  .content {
    width: 100%;
    height: 100%;
  }

  .content-div {
    width: 100%;
    height: 100%;
  }

  .swiper-div {
    display: flex;
    width: 100%;
    margin-bottom: 5rpx;
  }
</style>
