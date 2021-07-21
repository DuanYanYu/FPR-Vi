<template>
  <view class="main">
    <view class="comment-content">

      <!-- 发帖人的帖子 -->
      <view class="posting">
        <!-- 发帖人信息 -->
        <u-row gutter="16" class="posting-user">
          <!-- 发帖人头像 -->
          <u-col span="3">
            <u-image width="130" height="130" shape="circle" :src="posting.avatarUrl"></u-image>
          </u-col>

          <!-- 发帖人姓名 -->
          <u-col span="5">
            <view class="posting-username">{{posting.accountNumber}}</view>
          </u-col>

          <!-- 发帖日期 -->
          <u-col span="4">
            <!-- <view class="posting-date">{{posting.releaseDate}}</view> -->
            <view class="posting-date">
              {{posting.releaseDate.split(' ')[0].split('-')[0] + '年' + posting.releaseDate.split(' ')[0].split('-')[1] + '月' + posting.releaseDate.split(' ')[0].split('-')[2]}}
            </view>
            <view class="posting-date">{{posting.releaseDate.split(' ')[1]}}</view>
          </u-col>
        </u-row>

        <!-- 发帖文字内容 -->
        <u-row gutter="16">
          <text class="posting-content">
            <!-- 大佬们，这个虫子是什么鸭？？？危害大吗？？怎么防治？？？ -->
            {{posting.content}}
            <text class="sanjiao"></text>
          </text>
        </u-row>

        <!-- 发帖图片 -->
        <u-row gutter="16">
          <view>
            <imageAdaptation :imgList="imgList" :imgLayout1="imgLayout1" :imgLayout2="imgLayout2"
              :imgLayout3="imgLayout3"></imageAdaptation>
          </view>
        </u-row>
      </view>

      <!-- 评论标题 -->
      <view class="comment-title">
        <text>热评</text>
      </view>

      <!-- 帖子下的评论 -->
      <view class="comments">
        <!-- 评论信息 -->

        <view class="comment-user" v-for="comment in commentData">

          <!-- 评论用户信息 -->
          <u-row gutter="16">
            <!-- 评论者头像 -->
            <u-col span="3">
              <u-image width="100" height="100" shape="circle" v-bind:src="comment.avatarUrl"></u-image>
            </u-col>
            <u-col span="7">
              <!-- 评论用户名 -->
              <view class="comment-u-name">{{comment.accountNumber}}</view>
              <!-- 评论日期 -->
              <view class="comment-u-date">{{comment.commentDate}}</view>
            </u-col>
            <!-- 回复评论 -->
            <u-col span="2">
              <text class="replay" @click="replay(comment.commentId)">回复</text>
            </u-col>
          </u-row>
          <u-row gutter="16">

            <!-- 评论内容（包括评论的回复） -->
            <view class="comment-u-content">
              <u-row gutter="16">
                <u-col span="1"></u-col>
                <!-- 评论内容 -->
                <u-col span="11">
                  <text class="comment">{{comment.content}}</text>
                </u-col>
              </u-row>

              <!-- 评论回复 -->
              <view class="comment-reply" v-for="reply in comment.child">
                <u-row gutter="16">
                  <u-col span="10">
                    <!-- 评论回复用户信息（谁回复谁） -->
                    <view class="replay-u">
                      <text class="comment-reply-u">{{reply.name}}</text>回复:<text
                        class="comment-reply-u">{{comment.name}}</text>
                    </view>
                  </u-col>
                  <u-col span="2">
                    <text class="replay" @click="replay(reply.commentId)">回复</text>
                  </u-col>
                </u-row>
                <view class="">
                  <text>{{reply.commentDate}}</text>
                </view>
                <view class="replay-content">
                  <text>{{reply.content}}</text>
                </view>
              </view>
            </view>
          </u-row>
        </view>
        <!-- 没有评论数据时显示 -->
        <view class="comment-reply" v-if="commentData.length == 0">
          暂无评论
        </view>
      </view>
    </view>

    <!-- 写评论 -->
    <!-- 禁止遮罩层下的页面滚动 -->
    <view @touchmove.stop.prevent="">
      <ygc-comment ref="ygcComment" :placeholder="'发布评论'" @pubComment="pubComment"></ygc-comment>
    </view>

    <!-- 悬浮按钮-添加评论 -->
    <uni-fab horizontal="right" @fabClick="addComment()"></uni-fab>

    <!-- 消息提示框 -->
    <view>
      <u-toast ref="uToast" />
      <u-modal v-model="modalShow" @confirm="toLogin()" show-cancel-button :content="modalcontent"></u-modal>
    </view>
  </view>

</template>

<script>
  import imageAdaptation from '../../components/images-adaptation/imageAdaptation.vue'
  import ygcComment from '@/components/ygc-comment/ygc-comment.vue';
  import {
    mapState,
    mapMutations
  } from 'vuex'

  export default {
    components: {
      imageAdaptation,
      ygcComment
    },
    computed: {
      ...mapState(['hasLogin', 'userInfo']),
      // 将信息保存到store中
    },
    data() {
      return {
        commentData: [],
        posting: {},
        modalShow: false,
        modalcontent: '您还没有登录，是否要登录',
        //发帖的照片
        imgList: [],
        imgLayout1: [400, 400],
        imgLayout2: [315, 315],
        imgLayout3: [200, 200],
        show: false,
        maskCloseAble: false,
        closeable: true,
        commentContent: '',
        topicId: '',
        parentId: ''
      }
    },
    onLoad(option) {
      // 帖子id
      var topicId = option.topicId;
      this.topicId = topicId;

      if (topicId) {
        //加载评论
        this.loadComment();
        
      } else {
        uni.reLaunch({
          url: '/pages/folkMasters/index'
        });
      }


    },
    methods: {
      //加载评论
      loadComment() {
        
        uni.request({
          url: 'http://ocr.server.truedei.com/topic/getTopicById',
          method: 'GET',
          data: {
            "topicId": this.topicId
          },
          success: res => {
            var data = res.data.result;
            console.log("初始评论");
            console.log(data);
            // 初始化发帖的信息
            this.posting = data.topic;
            this.commentData = data.comments;
        
            if (data.topic.imgs) {
              this.imgList = data.topic.imgs.split('#####');
            }
        
            this.commentData = data.comments;
          },
          fail: err => {
            reject(err);
          }
        });
      },
      // 回复评论
      replay(commentId) {
        
        this.commentId = commentId;
        
        // alert('commentId' + this.commentId);
        if (!this.hasLogin) {
        
          this.$refs.uToast.show({
            title: '未登录，不能评论',
            type: 'error'
          });
        
        } else {
          this.toggleMask('show');
        }

      },
      // 添加评论-检验用户是否登录
      addComment() {
        if (!this.hasLogin) {
          
          this.modalShow = true;

        } else {
          this.toggleMask('show');
        }
      },
      
      // 跳转到登录界面
      toLogin(){
        this.$u.route({
        	url: 'pages/user/loginByPwd'
        });
      },

      toggleMask(type) {
        this.$refs.ygcComment.toggleMask(type);
      },

      // 新增评论或回复
      pubComment(commentContent1) {

        this.$refs.ygcComment.toggleMask();
        
        // 新增评论
        if(this.commentId == ''){
          var data = {
            "userId": this.userInfo.id,
            "topicId": this.posting.topicId,
            "content": commentContent1
          }
          // alert("noComment");
        } else {
          // 新增回复
          var data = {
            "userId": this.userInfo.id,
            "topicId": this.posting.topicId,
            "content": commentContent1,
            "commentId": this.commentId
          }
          // alert(this.commentId);
        }

        uni.request({
          url: 'http://ocr.server.truedei.com/comment/submitComment',
          method: 'POST',
          data: data,
          success: res => {
            console.log(res);
            
            if(res.data.result == '评论成功'){
              this.$refs.uToast.show({
                title: '评论成功',
                type: 'success'
              });
              
              this.loadComment();
            } else {
              this.$refs.uToast.show({
                title: '发帖失败，请稍后再试',
                type: 'error'
              });
            }
            
          },
          fail: err => {
            reject(err);
          }
        });
      }
    }
  }
</script>

<style>
  .main {
    margin: 80rpx 50rpx;
    padding-bottom: 4em;
  }

  .comment-content {
    margin: 0;
    padding: 0;
  }

  .posting {}

  /* 发帖人信息边框样式 */
  .posting-user {
    padding: .5em;
    border: #18B566 solid 1rpx;
    border-radius: 14rpx;
    box-shadow: 0px 10px 30px rgba(209, 213, 223, 0.5);
  }

  /* 发帖人用户名 */
  .posting .posting-username {
    font-size: 40rpx;
    font-weight: 700;
  }

  /* 发帖日期 */
  .posting .posting-date {
    font-weight: 700;
    color: #606266;
  }

  /* 发帖文字内容 */
  .posting .posting-content {
    position: relative;
    display: inline-block;
    margin: 1em 0;
    padding: 1em;
    border-radius: 18rpx;
    background-color: #ebecef
  }

  .posting .sanjiao {
    position: absolute;
    left: 68rpx;
    top: -36rpx;
    width: 0;
    height: 0;
    line-height: 0;
    font-size: 0;
    border: 10px solid transparent;
    border-bottom-color: #ebecef;
  }

  /* 热评样式 */
  .comment-title {
    display: inline-block;
    margin-top: 1em;
    margin-bottom: .5em;
    font-size: 32rpx;
    font-weight: 700;
    border-bottom: 8rpx solid #18B566;
  }

  .comments {

    margin-top: 10rpx;
    /* height: 800rpx; */
    border: 1px solid #18B566;
    box-shadow: 0px 10px 30px rgba(209, 213, 223, 0.5);
    border-radius: 20rpx;
  }

  /* 评论用户信息样式 */
  .comment-user {
    margin: 1em .5em;

  }

  /* 评论用户名样式 */
  .comment-user .comment-u-name {
    font-size: 34rpx;
    font-weight: 700;
  }

  /* 评论日期 */
  .comment-user .comment-u-date {
    margin-top: .3em;
    font-size: 24rpx;
    color: #7e8186;
  }

  /* 每个用户的评论 */
  .comment-user .comment-u-content {
    margin-top: 1em;
    width: 100%;
  }

  /*  .comment-u-content .comment {
    margin-left: 2em;
  } */

  /* 评论回复样式 */
  .comment-reply {
    margin: 1em 2em;
  }

  .replay-date {
    margin-left: .2em;
  }

  /* 评论回复用户信息样式 */
  .comment-reply-u {
    color: #2979FF;
  }

  /* 回复内容 */
  .replay-content {
    /* display: block; */
    margin: .5em 0;
    padding: .4em;
    border-radius: 6rpx;
    background-color: #eaeef7
  }

  .replay {
    color: #2979FF;
  }

  .addReplay {
    margin-top: 1.5em;
  }
</style>
