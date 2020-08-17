<template>
	<view class="container">
		<view class="demo" :style="'height:' +  demo.height + 'px;' + 'padding-top:' + demo.top + 'px;padding-bottom:10rpx'">
		    <view class="left" :style="'top:' + demo.top + 'px'">
		        <view class="iconfont icon-zuo" @tap='backleft'></view>
		    </view>
		</view>
		<view class="pd_t123"><image mode="widthFix" src="https://test134.vrapp.chot.cn/mini/picture/agree_xieyi.png"></image></view> 
		<view class="texts">
			<!-- <view>{{userAgreeText}}</view> -->
			<view class="text_item">尊敬的用户，本《隐私权政策》将向您说明：</view>
			<view class="text_item">1、我们可能会根据您的授权获取您的位置等敏感信息，您有权拒绝或撤回授权；</view>
			<view class="text_item">2、我们会采取行业领先的安全措施保护您的个人信息安全。</view>
			<view class="text_item">3、未经您的同意，我们不会从第三方处获取、共享或向其他提供您的信息；</view>
			<view class="text_item">4、您可以查询、更正、删除您的个人信息、我们也将提供注销，投诉的方式。</view>
			<view class="text_item">前往查看我们的完整承诺 <navigator url="/pages/useragree/useragree" class="strong">《乐管家服务协议》</navigator></view>			
		</view>
		<view class="pt50">
			<view><button class="grad agree" @tap="agreeTap">{{userAgreeText}} </button></view> 
			<view><a class="noagree" @tap="noagreeTap">不同意 </a></view> 
		</view>
	</view>
</template>

<script>
	export default {
	       data () {
	       	return {
	       		demo: {
	       			top: 0,
	       			height: 0
	       		},
				userAgreeText:"同意"
	       	}
	       },
	       created () {
				const demo = uni.getMenuButtonBoundingClientRect()
				this.demo.top = demo.top
				this.demo.height = demo.height
				uni.setNavigationBarColor({
					frontColor: '#000000',
					backgroundColor: '#000000'
				})
	        },
	        methods: {
				backleft(e){
					uni.navigateBack();
				},
				agreeTap(){
					var _this =this;
					uni.showModal({
						content: '确认同意么？',
						success: function(res) {
							if (res.confirm) {
					
								uni.showToast({
									title: "已同意",
									icon: "none"
								});
								_this.userAgreeText="已同意"
					
							} else if (res.cancel) {
								
							}
						}
					});
				},
				noagreeTap(){
					var _this =this;
					uni.showModal({
						content: '确认不同意么？',
						success: function(res) {
							if (res.confirm) {
								_this.userAgreeText="同意"
					
							}
						}
					});
					
				},
				async useragreeAPI (){
					const res = await this.$myRequset({
					    url: '/api', 
						method:"POST",
					    data: {
							operate:"Other.index",
					        en_name: 'user_agreement',
							data_type:"rich_text"
					    }
					});
					console.log(res.data.data.value);
					//this.userAgreeText = res.data.data.value
					
				}
				
	        },
	        mounted() {
	           
	        },			
			onLoad() {				
				this.useragreeAPI();
			}
			
	    }
</script>

<style lang="scss">
	.demo{
	    display: flex;
	    align-items: center;
	    justify-content: center;
	    background: #fff;
	    font-size: 26rpx;
		width: 100%;
		text-align: center;
		position: fixed;
		top: 0;
		z-index: 999;
	    .left{
	        float: left;
	        position: absolute;
	        width: max-content;
	        height: max-content;
	        top: 0;
	        bottom: 0;
	        left: 20rpx;
	        margin: auto;
	    }
		.icon-zuo{
			color: #000;
		}
	}
	.pd_t123{
		padding-top: 123rpx;
	}
	.container{
		padding: 30rpx;
		background: #fff;
		.texts{
			color: #8e8e8e;
			font-size: 26rpx;
			padding-top: 60rpx;
			.text_item{
				padding-top: 20rpx;
			}
			.strong{
				display: inline-block;
				color: #000;
				font-weight:bold;
				
			}
		}
		.grad {
		  background-image: linear-gradient(to right, #63cce7 , #66ebdf);
		}
		.agree{
			width: 374rpx;
			height: 90rpx;
			color: #fff;
			border:none;
			border-radius: 40rpx;
		}
		.noagree{
			display:block;
			text-align: center;
			background:transparent;
			color: #8e8e8e;
		}
		.pt50{
			padding-top: 30px;
		}
	}

    .bar-line {
        height: 44px; //导航栏高度

        .bar-back {
            font-size: 52rpx !important;
            position: absolute;
            left: 30rpx;
        }

        .bar-title {
            font-size: 32rpx;
        }
    }
</style>
