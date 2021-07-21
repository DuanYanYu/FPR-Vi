<template>
  <view class="content">

    <!-- <view @click="toLunTan">查看详细信息</view> -->

    <!-- 论坛 -->
    <view class="wrap">

      <!-- 顶部导航栏 -->
      <view class="u-tabs-box">
        <u-tabs-swiper activeColor="#1296db" ref="tabs" :list="list" :current="current" @change="change"
          :is-scroll="false" swiperWidth="750"></u-tabs-swiper>
      </view>

      <!-- 两个页面合二为一 -->
      <swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
        <!-- 论坛页面 -->
        <swiper-item class="swiper-item">
          <scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
            <view class="page-box">
              
              <view class="posting" v-for="posting in postingData">
                <!-- 发帖用户信息 -->
                <view class="posting-user">
                  <u-row gutter="16">
                    <!-- 头像 -->
                    <u-col span="3">
                      <u-image width="130" height="130" shape="circle" :src="posting.avatarUrl"
                      ></u-image>
                    </u-col>
                    <!-- 用户名 -->
                    <u-col span="5">
                      <text class="posting-name">{{posting.name}}</text>
                    </u-col>
                    <!-- 发帖日期 格式：2021年5月28日-->
                    <u-col span="4">
                      <text class="posting-date">{{posting.releaseDate.split(' ')[0].split('-')[0] + '年' + posting.releaseDate.split(' ')[0].split('-')[1] + '月' + posting.releaseDate.split(' ')[0].split('-')[2]}}</text>
                    </u-col>
                  </u-row>
                </view>
                <view class="posting-info" @click="toComment(posting.topicId)">
                  <!-- 帖子文字内容 -->
                  <view class="posting-text">
                    <!-- 各位大佬们，帮忙看看这个是什么虫子鸭，危害怎么样，咬人吗？？？？ -->
                    {{posting.content}}
                    <text class="sanjiao"></text>
                  </view>
                  <!-- 帖子照图片 -->
                  <view class="posting-img">
                    <u-row gutter="16">
                      <u-col span="12" text-align="center">
                        <u-image width="320rpx" height="320rpx" :src="posting.imgs.split('#####')[0]"
                          mode="aspectFill"></u-image>
                      </u-col>
                    </u-row>
                  </view>
                </view>
                <!-- 帖子操作 -->
                <view class="comment">
                  <u-row gutter="16">
                    <u-col span="3" text-align="center">
                      <u-icon size="40" name="thumb-up"></u-icon>
                    </u-col>
                    <u-col span="3" text-align="center">
                      <u-icon size="40" name="eye"></u-icon>
                    </u-col>
                    <u-col span="3" text-align="center">
                      <u-icon size="40" name="chat" @click="toComment(posting.topicId)"></u-icon>
                    </u-col>
                    <u-col span="3" text-align="center">
                      <u-icon size="40" name="more-dot-fill"></u-icon>
                    </u-col>
                  </u-row>
                </view>
              </view>
              <!-- 加载更多 -->
              <u-loadmore @loadmore="loadmore" :status="status" bgColor="#f2f2f2" :icon-type="iconType" :load-text="loadText"></u-loadmore>
            </view>
          </scroll-view>
        </swiper-item>
        <!-- 我的发帖页面 -->
        <swiper-item class="swiper-item">
          <scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
            <!-- 未登录时显示 -->
            <view class="page-box" v-if="!hasLogin">
              <view class="posting" @click="toLogin()">
                您还未登录，点击 “我” 进行登录。
              </view>
            </view>
            <!-- 登录后没有评论显示 -->
            <view class="page-box" v-if="hasLogin&&postingUserData.length == 0">
              <view class="posting">
                您还没有发表过帖子。<br>
                点击右下角加号来发表第一个帖子吧！
              </view>
            </view>
            <!-- 用户自己发表的帖子 -->
            <view class="posting" v-if="hasLogin" v-for="posting in postingUserData">
              <!-- 发帖用户信息 -->
              <view class="posting-user">
                <u-row gutter="16">
                  <!-- 头像 -->
                  <u-col span="3">
                    <u-image width="130" height="130" shape="circle" :src="posting.avatarUrl"
                    ></u-image>
                  </u-col>
                  <!-- 用户名 -->
                  <u-col span="5">
                    <text class="posting-name">{{posting.name}}</text>
                  </u-col>
                  <!-- 发帖日期 格式：2021年5月28日-->
                  <u-col span="4">
                    <text class="posting-date">{{posting.releaseDate.split(' ')[0].split('-')[0] + '年' + posting.releaseDate.split(' ')[0].split('-')[1] + '月' + posting.releaseDate.split(' ')[0].split('-')[2]}}</text>
                  </u-col>
                </u-row>
              </view>
              <view class="posting-info" @click="toComment(posting.topicId)">
                <!-- 帖子文字内容 -->
                <view class="posting-text">
                  <!-- 各位大佬们，帮忙看看这个是什么虫子鸭，危害怎么样，咬人吗？？？？ -->
                  {{posting.content}}
                  <text class="sanjiao"></text>
                </view>
                <!-- 帖子照图片 -->
                <view class="posting-img">
                  <u-row gutter="16">
                    <u-col span="12" text-align="center">
                      <u-image width="320" height="320" :src="posting.imgs.split('#####')[0]"
                        mode="widthFix"></u-image>
                    </u-col>
                  </u-row>
                </view>
              </view>
              <!-- 帖子操作 -->
              <view class="comment">
                <u-row gutter="16">
                  <u-col span="3" text-align="center">
                    <u-icon size="40" name="thumb-up"></u-icon>
                  </u-col>
                  <u-col span="3" text-align="center">
                    <u-icon size="40" name="eye"></u-icon>
                  </u-col>
                  <u-col span="3" text-align="center">
                    <u-icon size="40" name="chat" @click="toComment(posting.topicId)"></u-icon>
                  </u-col>
                  <u-col span="3" text-align="center">
                    <u-icon size="40" name="trash" @click="deleteComment()"></u-icon>
                  </u-col>
                </u-row>
              </view>
              <!-- 加载更多 -->
            </view>
            <u-loadmore v-if="!hasLogin" @loadmore="loadmore" :status="status" bgColor="#f2f2f2" :icon-type="iconType" :load-text="loadText"></u-loadmore>
          </scroll-view>
        </swiper-item>
      </swiper>
    </view>
    
    <!-- 弹出框：用户删除帖子-->
    <u-modal v-model="modalShow" :content="content" show-cancel-button></u-modal>
    
    <!-- 回到顶端 -->
    <view class="">
      <u-back-top :scroll-top="scrollTop" :icon-style="iconStyle" :custom-style="backTop"></u-back-top>
    </view>
    
    <!-- 悬浮按钮 -->
    <view>
      <Drag @dragClick="addPosting" creatTop="510" creatLeft="280" image="../../static/jia.png" imageWidth="84%" ></Drag>
    </view>
    
    <!-- 提示信息框 -->
    <view>
      <u-toast ref="uToast" />
      <u-modal v-model="modalshow" @confirm="toLogin()" show-cancel-button :content="modalcontent"></u-modal>
    </view>
    
    <u-tabbar v-model="current" :bg-color="bgColor" :border-top="borderTop" :list="tabbar" :mid-button="midButton"
      :inactive-color="inactiveColor" :activeColor="activeColor"></u-tabbar>
  </view>
</template>

<script>
  import Drag from '../../components/beyondGod-drag/beyoundGod-drag.vue';
  import {
    mapState,
    mapMutations
  } from 'vuex'
  
  export default {
    components:{
        Drag
    },
    computed: {
      ...mapState(['hasLogin', 'userInfo']),
      // 将信息保存到store中
    },
    data() {
      return {
        current: 0,
        modalshow: false,
        show: true,
        modalShow: false,
        modalcontent: '您还没有登录，是否要登录',
        bgColor: '#ffffff',
        borderTop: true,
        tabbar: '',
        iconType: 'circle',
        current: 0,
        midButton: false, // 用于使底部导航栏中间有突出的圆点
        inactiveColor: '#909399',
        activeColor: '#5098FF',
        scrollTop: 0,
        backTop: {
          backgroundColor: '#E6F4F1'
        },
        iconStyle: {
          color: '#2979FF'
        },
        list: [
          {
            name: '论坛'
          },
          {
            name: '我的',
            // count: 12
          }
        ],
        postingData: [],
        postingUserData: [],
        current: 0,
        swiperCurrent: 0,
        tabsHeight: 0,
        dx: 0,
        loadStatus: ['loadmore', 'loadmore', 'loadmore', 'loadmore'],
        status: 'loadmore',
        loadText: {
          loadmore: '轻轻上拉或点击',
          loading: '努力加载中',
          nomore: '实在没有了'
        },
        isPot: false,
        page: 1,
        content: '确定删除吗，删除后不可恢复！'
      }
    },
    // onReachBottom() {
    //   this.loadmore();
    // },
    watch: {
      hasLogin(newValue, oldValue) {
        if (newValue) {
          this.loadData();
        }
      },
      obj(newValue, oldValue) {
        console.log("obj",newValue,oldValue)
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

      this.loadData();

    },
    methods: {
      // 加载帖子函数
      loadData() {
        
        
        
        uni.request({
          url: 'http://ocr.server.truedei.com/topic/getTopicList',
          method: 'GET',
          data: {
            "page": 1,
            "rows": 8
          },
          success: res => {
            console.log(res.data.result);
            
            this.postingData = res.data.result.list;
            
            //判断是否最后一页
            this.isPot = res.data.result.isLastPage;
            if (this.isPot) {
              this.status = 'nomore';
            } else{
              this.status = 'loadmore';
            }
            
          },
          fail: err => {
            reject(err);
          }
        });
        
        // 请求用户发表的评论
        if (this.hasLogin){
          uni.request({
            url: 'http://ocr.server.truedei.com/topic/getTopicList',
            method: 'GET',
            data: {
              "page": 1,
              "rows": 8,
              "uid": this.userInfo.id
            },
            success: res => {
              console.log("我的帖子");
              console.log(res.data.result);
              
              this.postingUserData = res.data.result.list;
              
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
        }
        
      },
      toComment(topicId) {
        uni.navigateTo({
          url: "/pages/folkMasters/comment?topicId=" + topicId,
          // url:"../component/classdetails/classdetails?newsid="+ newsid,
          // success:res =>{},
          // fail:() =>{},
          // complete:() => {}
        });
      },
      toLunTan() {
        this.$u.route({
          url: 'pages/folkMasters/comment'
        });
      },
      // 删除帖子
      deleteComment(){
        this.modalShow = true;
      },
      // 跳转到登录界面
      toLogin(){
        this.$u.route({
        	url: 'pages/user/loginByPwd'
        });
      },
        // 发帖
      addPosting(){
        
        if (this.hasLogin) {
          this.$u.route({
            url: 'pages/folkMasters/push'
          });
        } else {
          this.modalshow = true;
          // this.$refs.uToast.show({
          //   title: '您还没有登录，不能发帖',
          //   type: 'error'
          // });
        }

      },
      //加载更多方法
      loadmore() {
      
        //如果不是最后一页则继续加载数据
        if (!this.isPot) {
          
          this.status = 'loading';
      
          //loadmore加载下一页数据
          this.page = this.page + 1;
          
          // 加载个人用户的帖子
          if (this.hasLogin) {
            // 包装data
            var data = {
              "page": this.page,
              "rows": 8,
              "uid": this.userInfo.id
            }
            
            uni.request({
              url: 'http://ocr.server.truedei.com/topic/getTopicList',
              method: 'GET',
              data: data,
              success: res => {
                this.postingUserData = this.postingUserData.concat(res.data.result.list);
              },
              fail: err => {
                reject(err);
              }
            });
          }
          
          // 包装data
          var data = {
            "page": this.page,
            "rows": 8
          }
          // 加载所有评论
          uni.request({
            url: 'http://ocr.server.truedei.com/topic/getTopicList',
            method: 'GET',
            data: data,
            success: res => {
              this.postingData = this.postingData.concat(res.data.result.list);
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
        else{
        }
      },
      change(index) {
        this.swiperCurrent = index;
        // this.getOrderList(index);
      },
      transition({
        detail: {
          dx
        }
      }) {
        this.$refs.tabs.setDx(dx);
      },
      animationfinish({
        detail: {
          current
        }
      }) {
        this.$refs.tabs.setFinishCurrent(current);
        this.swiperCurrent = current;
        this.current = current;
      }

    },
    onPageScroll(e) {
      this.scrollTop = e.scrollTop;
    }
  }
</script>
<style>
  /* #ifndef H5 */
  page {
    height: 100%;
    background-color: #f2f2f2;
  }

  /* #endif */
</style>
<style lang="scss" scoped>
  .content {
    // display: flex;
    // flex-direction: column;
    // align-items: center;
    // justify-content: center;
    // padding: 40rpx;
  }


  .com-content {
    // height: 1600rpx;
  }

  .u-tabs-box {}

  // 帖子卡片样式
  .posting {
    margin: 1.4em;
    padding: .8em;
    background-color: #ffffff;
    border-radius: 14rpx;
  }
  
  .posting-user {
    padding-bottom: .6em;
    border-bottom: 1rpx solid C0C4CC;
  }
  
  // 发帖人姓名
  .posting-name {
    font-size: 42rpx;
    font-weight: 700;
  }
  
  // 发帖日期
  .posting-date {
    // font-weight: 700;
  }
  
  // 帖子内容
  .posting-info {
    margin: 1.4em 0;
  }
  
  // 帖子文字内容
  .posting-text {
    position: relative;
    display: inline-block;
    // color: white;
    padding: .4em .8em;
    border-radius: 12rpx;
    background-color: #D6EEE3;
    font-size: 30rpx;
  }
  
  .sanjiao{
    position: absolute;
    left: 54rpx;
    top: -36rpx;
    width: 0;
    height: 0;
    line-height: 0;
    font-size: 0;
    border: 10px solid transparent;
    border-bottom-color: #D6EEE3;
  }

  .posting-img {
    margin: 30rpx 0;
    text-align: center;
  }

  .order {
    width: 710rpx;
    background-color: #ffffff;
    margin: 20rpx auto;
    border-radius: 20rpx;
    box-sizing: border-box;
    padding: 20rpx;
    font-size: 28rpx;

    .top {
      display: flex;
      justify-content: space-between;

      .left {
        display: flex;
        align-items: center;

        .store {
          margin: 0 10rpx;
          font-size: 32rpx;
          font-weight: bold;
        }
      }

      .right {
        color: $u-type-warning-dark;
      }
    }

    .item {
      display: flex;
      margin: 20rpx 0 0;

      .left {
        margin-right: 20rpx;

        image {
          width: 200rpx;
          height: 200rpx;
          border-radius: 10rpx;
        }
      }

      .content {
        .title {
          font-size: 28rpx;
          line-height: 50rpx;
        }

        .type {
          margin: 10rpx 0;
          font-size: 24rpx;
          color: $u-tips-color;
        }

        .delivery-time {
          color: #e5d001;
          font-size: 24rpx;
        }
      }

      .right {
        margin-left: 10rpx;
        padding-top: 20rpx;
        text-align: right;

        .decimal {
          font-size: 24rpx;
          margin-top: 4rpx;
        }

        .number {
          color: $u-tips-color;
          font-size: 24rpx;
        }
      }
    }

    .total {
      margin-top: 20rpx;
      text-align: right;
      font-size: 24rpx;

      .total-price {
        font-size: 32rpx;
      }
    }

    .bottom {
      display: flex;
      margin-top: 40rpx;
      padding: 0 10rpx;
      justify-content: space-between;
      align-items: center;

      .btn {
        line-height: 52rpx;
        width: 160rpx;
        border-radius: 26rpx;
        border: 2rpx solid $u-border-color;
        font-size: 26rpx;
        text-align: center;
        color: $u-type-info-dark;
      }

      .evaluate {
        color: $u-type-warning-dark;
        border-color: $u-type-warning-dark;
      }
    }
  }

  .centre {
    text-align: center;
    margin: 200rpx auto;
    font-size: 32rpx;

    image {
      width: 164rpx;
      height: 164rpx;
      border-radius: 50%;
      margin-bottom: 20rpx;
    }

    .tips {
      font-size: 24rpx;
      color: #999999;
      margin-top: 20rpx;
    }

    .btn {
      margin: 80rpx auto;
      width: 200rpx;
      border-radius: 32rpx;
      line-height: 64rpx;
      color: #ffffff;
      font-size: 26rpx;
      background: linear-gradient(270deg, rgba(249, 116, 90, 1) 0%, rgba(255, 158, 1, 1) 100%);
    }
  }

  .wrap {
    display: flex;
    flex-direction: column;
    height: calc(100vh - var(--window-top));
    width: 100%;
  }

  .swiper-box {
    flex: 1;
  }

  .swiper-item {
    height: 100%;
  }
</style>
