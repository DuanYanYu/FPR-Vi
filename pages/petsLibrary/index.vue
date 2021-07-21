<template>
  <view class="content">
    <view class="u-search-inner">
      <!-- <u-sticky :enable="enable"> -->
      <u-search 
        offset-top="20" 
        style="width: 100%;" 
        v-model="value" 
        border-color="#008952"
        @custom="search" 
        @search="search"
        placeholder="请输入要查找的名字" 
        :animation="true">
      </u-search>
      <!-- </u-sticky> -->
    </view>

    <view class="pets-box">
      <view class="pet-box" @click="showPet(petInfo.id)" v-for="petInfo in petInfos">
        <view class="box-container">
          <u-row gutter="" justify="around">
            <u-col span="4">
              <view class="pet-image">
                <u-image width="300" height="300" border-radius="32rpx" :src="petInfo.images.split('#####')[0]">
                </u-image>
              </view>
            </u-col>
            <u-col span="6" offset="1">
              <view class="pet-info">
                <u-row>
                  <text class="pet-name">{{petInfo.pastName}}</text>
                </u-row>
                <u-row>
                  <text class="pet-plots">{{petInfo.item}}</text>
                  <text space="emsp"> > </text>
                  <text class="pet-plots">{{petInfo.branch}}</text>
                  <text space="emsp"> > </text>
                  <text class="pet-plots">{{petInfo.dependant}}</text>
                </u-row>
                <u-row style="margin-top: .2em;">
                  <text class="pet-position">分布地：</text>
                  <text class="pet-position-v" space="emsp">{{petInfo.distributionArea}}</text>
                </u-row>
                <u-row justify="end" style="margin-top: 1em;">
                  <view class="petInfo">
                    <!-- <text>详情</text> -->
                    <u-icon name="rewind-right" label="详情" label-color="#2979ff" size="40"></u-icon>
                  </view>
                </u-row>
              </view>
            </u-col>
          </u-row>
        </view>
      </view>
    </view>

    <!-- 消息提示框 -->
    <view>
      <u-toast ref="uToast" />
    </view>

    <!-- 加载更多组件 -->
    <view class="load-more">
      <u-loadmore :status="status" @loadmore="loadmore" :icon-type="iconType" :load-text="loadText" />
    </view>

    <!-- 回到最顶端 -->
    <view class="wrap">
      <u-back-top :scroll-top="scrollTop" :icon-style="iconStyle" :custom-style="backTop"></u-back-top>
    </view>
    
    <u-tabbar v-model="current" :bg-color="bgColor" :border-top="borderTop" :list="tabbar" :mid-button="midButton"
      :inactive-color="inactiveColor" :activeColor="activeColor"></u-tabbar>
    

  </view>
</template>

<script>
  export default {
    data() {
      return {
        value: '',
        current: 0,
        show: true,
        bgColor: '#ffffff',
        borderTop: true,
        tabbar: '',
        midButton: false, // 用于使底部导航栏中间有突出的圆点
        inactiveColor: '#909399',
        activeColor: '#5098FF',
        show: false,
        petInfos: [],
        hasNextPage: true,
        enable: true,
        scrollTop: 0,
        // 加载更多
        status: 'loadmore',
        iconType: 'circle',
        loadText: {
          loadmore: '轻轻上拉或点击',
          loading: '努力加载中',
          nomore: '实在没有了'
        },
        isPot: false,
        page: 1,
        options: {
          avatarText: '王',
          nameText: '王小二',
          nameIcon: '/static/hm-credit-card/images/img_24428_0_0.png',
          introduce: '介绍',
          curriculum: '课程',
          points: '79分'
        },
        backTop: {
          backgroundColor: '#E6F4F1'
        },
        iconStyle: {
          color: '#2979FF'
        }
      }
    },
    onPageScroll(e) {
      this.scrollTop = e.scrollTop;
    },
    onShow() {
      this.enable = true
    },
    onHide() {
      this.enable = false
    },
    onReachBottom() {
      this.loadmore();
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
        //   "pagePath": "/pages/expert/index",
        //   "iconPath": "/static/icon/rc.png",
        //   "selectedIconPath": "/static/icon/rc-full.png",
        //   "text": "询问专家",
        //   customIcon: false,
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
      ];

      //请求害虫列表
      uni.request({
        url: 'http://ocr.server.truedei.com/ocr/pest/getPestList',
        method: 'POST',
        data: {
          "page": 1,
          "rows": 8,
        },
        success: res => {
          console.log(res);
          var data = res.data.result.list;
          this.petInfos = data;
          
          //判断是否最后一页
          this.isPot = res.data.result.isLastPage;
          if (this.isPot) {
            this.status = 'nomore';
          }
        },
        fail: err => {
          reject(err);
        }
      });
    },
    watch: {
      // 这里的演示为证明通过v-model绑定值，它是双向绑定的，意味着您无需监听change事件
      // 也能知道value值当前的内容
      value(val) {
        // console.log(val);
      }
    },
    methods: {
      showPet(petId) {
        uni.navigateTo({
          url: "/pages/petsLibrary/pet?id=" + petId,
          // url:"../component/classdetails/classdetails?newsid="+ newsid,
          // success:res =>{},
          // fail:() =>{},
          // complete:() => {}
        });
      },
      //加载更多方法
      loadmore() {

        //如果不是最后一页则继续加载数据
        if (!this.isPot) {
          this.status = 'loading';

          //loadmore加载下一页数据
          this.page = this.page + 1;

          if (this.value != '') {
            var data = {
              "page": this.page,
              "rows": 8,
              "pastName": this.value
            }
          } else {
            var data = {
              "page": this.page,
              "rows": 8
            }
          }


          uni.request({
            url: 'http://ocr.server.truedei.com/ocr/pest/getPestList',
            method: 'POST',
            data: data,
            success: res => {
              console.log(res);
              var data = res.data.result.list;
              this.petInfos = this.petInfos.concat(data);

              //判断是否为最后一页
              if (res.data.result.isLastPage) {
                this.isPot = true;
                this.status = 'nomore';
              } else {
                this.status = 'loadmore';
              }
            },
            fail: err => {
              reject(err);
            }
          });
        }
      },
      //关键字查询害虫
      search(value) {

        // console.log("搜索触发");
        var value = this.value;
        this.page = 1;
        this.isPot = false;
        this.status = 'loadmore';

        //获取搜索的关键字
        if (value === '') {
          this.petInfos = [];
          this.page = this.page - 1;
          this.loadmore();
          return;
        }

        uni.request({
          url: 'http://ocr.server.truedei.com/ocr/pest/getPestList',
          method: 'POST',
          data: {
            "page": this.page,
            "rows": 8,
            "pastName": this.value
          },
          success: res => {
            console.log(res);

            this.petInfos = res.data.result.list;

            //判断是否为最后一页
            if (res.data.result.isLastPage) {
              this.isPot = true;
              this.status = 'nomore';
            } else {
              this.status = 'loadmore';
            }
          },
          fail: err => {
            reject(err);
          }
        });
      },
      change(value) {
        // 搜索框内容变化时，会触发此事件，value值为输入框的内容
        //console.log(value);
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
    padding: 0;
  }

  .logo {
    height: 200rpx;
    width: 200rpx;
    margin-top: 100rpx;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 50rpx;
  }

  .search {
    margin: 40rpx auto 0;
    height: 60rpx;
    width: 100%;
  }

  .text-area {
    display: flex;
    justify-content: center;
  }

  .title {
    font-size: 28rpx;
    color: $u-content-color;
  }

  .link-demo {
    margin-top: 80rpx;
  }

  .petInfo {
    position: absolute;
    bottom: -30rpx;
    right: 0;
    padding: .3em;
    display: inline-block;
    height: 2em;
    line-height: 2em;
    background-color: white;
    color: #2979ff;
    // text-decoration: underline;
  }

  .pets-box {
    margin: 0 auto;
    margin-top: 10rpx;
    width: 100%;
  }

  .pets-box .box-container {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: center;
    border-radius: 38.96rpx;
    box-shadow: 0px 10px 30px rgba(209, 213, 223, 0.5);
    background-color: #ffffff;
    width: 720.78rpx;
    height: 377.92rpx;
  }

  .pets-box .pet-box {
    margin: -40rpx 0;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: center;
    width: 750rpx;
    height: 465.84rpx;
  }


  .u-search-inner {
    background-color: #E6F4F1;
    margin-top: 30rpx;
    margin-bottom: 50rpx;
    border-radius: 100rpx;
    display: flex;
    align-items: center;
    padding: 10rpx 16rpx;
  }

  .load-more {
    margin-top: 30rpx;
  }

  .pet-image,
  .pet-info {
    position: relative;
    margin: 20rpx auto;
    // margin-left: 30rpx;
    width: 360rpx;
    height: 300rpx;
  }

  // 昆虫名
  .pet-info .pet-name {
    display: inline-block;
    padding: .3em;
    background-color: #E4F4F1;
    color: #449087;
    border-radius: 22rpx;
    font-size: 40rpx;
    font-weight: 700;
  }

  // 昆虫类别
  .pet-info .pet-plots {
    display: inline-block;
    margin-top: 10rpx;
    padding: .2em .3em;
    border-radius: 16rpx;
    background-color: #C4F093;
    color: #58832D;
    font-weight: 700;
  }
  
  // 昆虫分布标题
  .pet-position {
    display: inline-block;
    padding: .2em .3em;
    border-radius: 16rpx;
    background-color: #FFEFCA;
    color: #AD8E23;
    font-weight: 700;
  }
  
  // 昆虫分布地详情
  .pet-position-v {
    white-space: nowrap;
    /* 2.超出部分隐藏 */
    overflow: hidden;
    /* 3.文字用省略号替代超出的部分 */
    text-overflow: ellipsis;
  }
</style>
