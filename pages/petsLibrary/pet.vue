<template>
  <view class="">
    <view class="head">
      <text class="title">
        {{petInfo.name}}
      </text>
      <text class="">
        <text class="tem-title">{{petInfo.plots.mu}}</text> 
        <text class="tem-symbol"> > </text>
        <text class="tem-title">{{petInfo.plots.ke}}</text> 
        <text class="tem-symbol"> > </text>
        <text class="tem-title">{{petInfo.plots.shu}}</text>
      </text>
      <text class="info-link">
        <u-link font-size="28" :href="petInfo.detailsLink">查看更详细信息></u-link>
      </text>
    </view>
    <view class="body">
      <!-- 轮播图 -->
      <view>
        <u-swiper :list="list" :effect3d="true" height="500"></u-swiper>
      </view>
      
      <!-- 基本信息 -->
      <view class="basic-info box">
        <u-divider border-color="#2EB4EC" half-width="100">
          <view class="title2">
            <u-icon label="基本信息" size="40" color="#2EB4EC" label-color="#2EB4EC" name="info-circle"></u-icon>
          </view>
        </u-divider>
        <u-row class="row-margin">
          <u-col span="4">
            <view class="labe">名称：</view>
          </u-col>
          <u-col span="8">
            <view class="text-info">{{petInfo.name}}</view>
          </u-col>
        </u-row>
        <u-row class="row-margin">
          <u-col span="4">
            <view class="labe">拉丁学名：</view></u-col>
          <u-col span="8">
            <view class="text-info ladi">{{petInfo.ladiName}}</view>
          </u-col>
        </u-row>
        <u-row class="row-margin">
          <u-col span="4">
            <view class="labe">目：</view></u-col>
          <u-col span="8">
            <view class="text-info">{{petInfo.plots.mu}}</view>
          </u-col>
        </u-row>
        <u-row class="row-margin">
          <u-col span="4">
            <view class="labe">科：</view></u-col>
          <u-col span="8">
            <view class="text-info">{{petInfo.plots.ke}}</view>
          </u-col>
        </u-row>
        <u-row class="row-margin">
          <u-col span="4">
            <view class="labe">属：</view></u-col>
          <u-col span="8">
            <view class="text-info">{{petInfo.plots.shu}}</view>
          </u-col>
        </u-row>
      </view>
      
      <!-- 间隔线 -->
      <view class="wall">
        <u-gap height="5" bg-color="#e7e7e7"></u-gap>
      </view>
      
      <!-- 分布地区 -->
      <view class="basic-info box">
        <u-divider border-color="#43C08A" half-width="100">
          <view class="title2">
            <u-icon label="分布地区" size="40" color="#43C08A" label-color="#43C08A" name="map"></u-icon>
          </view>
        </u-divider>
        <u-row class="row-margin">
          <u-col span="10" offset="1">
            <view class="text-info">{{petInfo.distributionArea}}</view>
          </u-col>
        </u-row>
      </view>
      
      <!-- 防止方法 -->
      <view class="basic-info box">
        <u-divider border-color="#4F75AF" half-width="100">
          <view class="title2">
            <u-icon label="防治方法" size="40" color="#4F75AF" label-color="#4F75AF" name="attach"></u-icon>
          </view>
        </u-divider>
        <u-row class="row-margin">
          <u-col span="10" offset="1">
            <view v-if="petInfo.preventiveMeasures">
              <view class="text-info" v-if="petInfo.preventiveMeasures.split('#####').length > 1" v-for="(item,index) in petInfo.preventiveMeasures.split('#####')">
                <view class="">
                  <view class="text-title">
                    {{item.split('---')[0]}}
                  </view>
                  <view v-for="(methods, index) in item.split('---')[1].split('###')">
                    {{methods}}
                  </view>
                </view>
              </view>
              <view v-else class="text-info2" v-for="(item, index) in petInfo.preventiveMeasures.split('###')">
                {{item}}
              </view>
            </view>
          </u-col>
        </u-row>
      </view>
     
      
      <!-- 返回顶部 -->
      <view class="wrap">
        <u-back-top :scroll-top="scrollTop"></u-back-top>
      </view>
    </view>
  </view>
  
  
</template>

<script>
  export default {
  	data() {
  		return {
        petInfo: {
          'name': '',
          'ladiName':'',
          'plots': {
            'mu': '',
            'ke': '',
            'shu': ''
          },
          distributionArea: '',
          preventiveMeasures: '',
          detailsLink: ''
        },
        list: [{
            image: '',
            title: ''
          },
          {
            image: '',
            title: ''
          },
          {
            image: '',
            title: ''
          }
        ],
        scrollTop: 0,
        modelShow: false
  		}
  	},
    onPageScroll(e) {
      this.scrollTop = e.scrollTop;
    },
  	onLoad(option) {
      // 获取害虫id
      console.log(option.id);
      
      uni.request({
        url: 'http://ocr.server.truedei.com/ocr/pest/selectPestsById?id=' + option.id,
        method:'GET',
        // data: ,
        success: res => {
          console.log(res.data.result);
          // 保存查询后的害虫数据
          var data = res.data.result;
          var imagesData = data.images.split("#####");
          //初始化图片
          
          for (var i = 0; i < 3; i++) {
            this.list[i].image = imagesData[i];
          }
          this.petInfo.name = data.pastName;
          this.petInfo.ladiName = data.latinCode;
          this.petInfo.plots.mu = data.item;
          this.petInfo.plots.ke = data.branch;
          this.petInfo.plots.shu = data.dependant;
          this.petInfo.distributionArea = data.distributionArea;
          this.petInfo.preventiveMeasures = data.preventiveMeasures;
          this.petInfo.detailsLink = data.detailsLink;
        },
        fail: err=>{
          reject(err);
        }
      });
      
    },
  	methods: {
  
  	}
  }
</script>

<style>
  
</style>
<style>
  .head text {
    display: block;
    text-align: center;
  }
  
  .head {
    text-align: center;
  }
  
  .head .title {
    display: inline-block;
    margin: 28rpx 0;
    padding: .2em .5em;
    border-radius: 16rpx;
    font-size: 48rpx;
    font-weight: 700;
    color: #449087;
    background-color: #E4F4F1;
  }
  .head .tem-title {
    display: inline-block;
    margin: 10rpx 0 50rpx;
    padding: .4em .6em;
    border-radius: 20rpx;
    font-size: 30rpx;
    background-color: #C4F093;
    color: #58832D;
  }
  /* baidu详情链接 */
  .head .info-link{
    padding-bottom: 1.5em;
  }
  .head .tem-symbol {
    display: inline-block;
    margin: 10rpx 0 50rpx;
    padding: 0 .2em;
    font-size: 34rpx;
    font-weight: 700;
    color: #7F7755;
  }
  
  .title2 {
    display: block;
    text-align: center;
    margin: 28rpx 0;
    font-size: 32rpx;
    font-weight: 700;
  }
  .box {
    margin: 40rpx auto 5rpx;
    width: 90%;
    /* border: #aaaa7f 1rpx solid; */
    border-radius: 16rpx;
    padding-bottom: 1.5em;
  }
  
  .box .labe,
  .box .text-info{
    font-size: 30rpx;
  }
  .text-info2{
    margin: .8em 0;
    text-indent: 2em;
    font-size: 30rpx;
  }
  .box .ladi{
    font-size: 24rpx;
  }
  /* 防治方法标题样式 */
  .text-info .text-title{
    margin-left: -2em;
    margin-bottom: .8em;
    display: inline-block;
    border-bottom: #007F4A 8rpx solid;
    color: #007F4A;
    font-weight: 700;
    font-size: 18px;
    text-indent: 0em;
    line-height: 2.4em;
  }
  .box .labe{
    text-align: right;
    font-weight: 700;
    color: #606266;
  }
  .box .text-info{
    text-align: left;
    text-indent:2em;
  }
  .row-margin {
    margin: 10rpx 0;
  }
  
  .wall {
    width: 90%;
    margin: 0 auto;
  }
</style>
