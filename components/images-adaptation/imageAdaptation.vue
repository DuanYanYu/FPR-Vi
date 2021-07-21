<template>
	<view>
		<view class="allImage">
			<view class="images" v-for="(item,index) in imgList" :key="index">
				<image @click="previewImg()" class="oneimg" :src="item" mode="aspectFill" :style="{width:imgWidth+'rpx',height:imgHeight+'rpx'}"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			imgList: {
				type: Array
			},
			imgLayout1: {
				type: Array
			},
			imgLayout2: {
				type: Array
			},
			imgLayout3: {
				type: Array
			}
		},
		data() {
			return {
				imgWidth: 200,
				imgHeight: 200,
				imgDisplay: 'flex',
			}
		},
		mounted() {
			this.judgeImg();
		},
		methods: {
			// 预览图片
			previewImg() {
				uni.previewImage({
					urls: this.imgList,
					longPressActions: {
						itemList: ['保存图片'],

					}
				})
			},


      // 自适应判断
      judgeImg() {
        // console.log("照片");
        // console.log(this.imgList);
        
        if (this.imgList == null) {
          this.imgDisplay = 'none';
        } else if (this.imgList.length == 1) {
          if (this.imgLayout1 != null) {
            // console.log("一个照片时");
            // console.log(this.imgLayout1);
            this.imgWidth = this.imgLayout1[0];
            this.imgHeight = this.imgLayout1[1];
          } else {
            this.imgHeight = 600;
            this.imgWidth = 600;
          }

        } else if (this.imgList.length == 2 || this.imgList.length == 4) {
          if (this.imgLayout2 != null) {
            this.imgWidth = this.imgLayout2[0];
            this.imgHeight = this.imgLayout2[1];
          } else {
            this.imgWidth = 315;
            this.imgHeight = 315;
          }

        } else {
          if (this.imgLayout3 != null) {
            this.imgWidth = this.imgLayout3[0];
            this.imgHeight = this.imgLayout3[1];
          } else {
            this.imgWidth = 200;
            this.imgHeight = 200;
          }

        }
      }
		}
	}
</script>

<style>
	/* 想法图片排列样式 */

	.allImage {
		display: flex;
		margin-top: 10rpx;
		flex-wrap: wrap;
		justify-content: flex-start;
	}

	.images:not(:nth-child(3n)) {
		/* margin-right: 10rpx; */
	}

	.images {
		margin-right: 10rpx;
	}
</style>
