<template>
	<view>
		<view class="demo" :style="'height:' +  demo.height + 'px;' + 'padding-top:' + demo.top + 'px;padding-bottom:10rpx'">
		    <view class="left" :style="'top:' + demo.top + 'px'">
		        <view class="iconfont icon-zuo" @tap='backleft'></view>
		    </view>
		</view>
		<view class="uni-container">
			<view class="relative">
				<view>
					<image class="img100" mode="widthFix" src="https://test134.vrapp.chot.cn/mini/picture/xieyi.png"></image>	
				</view>
				<view class="absolute uni-flex w80b">
					<view class="flex-item centers pd-t30 pd-b20">
						<view><image class="xieyi_hefa" src="https://test134.vrapp.chot.cn/mini/picture/xieyi_hefa.png"></image>	</view>
						<view>
							<view>合法合规</view>
							<view class="des">同等法律效力</view>
						</view>
					</view>
					<view class="flex-item centers pd-t30 pd-b20">
						<view><image class="xieyi_hefa" src="https://test134.vrapp.chot.cn/mini/picture/xieyi_qukuailian.png"></image>	</view>
						<view>
							<view>实名认证</view>
							<view class="des">身份证+人脸验证</view>
						</view>
					</view>
					<view class="flex-item centers pd-t30 pd-b20">
						<view><image class="xieyi_hefa" src="https://test134.vrapp.chot.cn/mini/picture/xieyi_shiming.png"></image>	</view>
						<view>
							<view>区块链存证</view>
							<view class="des">公正无篡改</view>
						</view>
					</view>
				</view>
				<view class="pd30" style="margin-top: 166rpx;">
					<view class="title02">了解乐管家协议</view>
					<view class="des">乐管家协议为您的隐私安全提供保障</view>
					
				</view>
				<view class="uni-flex">
					<view @tap="useragree">
						<image class="xieyi_ic" src="https://test134.vrapp.chot.cn/mini/picture/xieyi_left.png"></image>
					</view>
					<view @tap="useragree">
						<image class="xieyi_ic" src="https://test134.vrapp.chot.cn/mini/picture/xieyi_right.png"></image>
					</view>
				</view>			
				<view class="promit">
					更多相关内容更新中...
				</view>
			</view>
		</view>
		
		<view>
			
		</view>
		
	</view>
</template>

<script>
	export default {
		name: 'my',
		data () {
			return {
				demo: {
					top: 0,
					height: 0
				}
			}
		},
		created () {
			const demo = uni.getMenuButtonBoundingClientRect()
			this.demo.top = demo.top
			this.demo.height = demo.height
		},
		methods: {
			useragree(e) {
				uni.navigateTo({
					url: "../useragree/useragree"
				});				
			},
			backleft(e){
				uni.navigateBack();
			}
		}
	}
	
	
	
</script>

<style lang="scss">
	.demo{
	    display: flex;
	    align-items: center;
	    justify-content: center;
	    background: #63c6e9;
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
			color: #fff;
		}
	}
	.promit{
		color: #b9b9b9;
		font-size: 24rpx;
		padding-top: 50rpx;
		text-align: center;
	}
	.xieyi_ic{
		width: 368rpx;
		height: 223rpx;
	}
	.pd30{
		padding: 30rpx;
	}
	.centers{
		text-align: center;
	}
	.title02{
		font-size: 36rpx;
		color: #444444;
	}
	.relative{
		position: relative;
	}
	.absolute{
		position: absolute;
	}
	.w80b{
		width: 90%;
		background: #fff;
		border-radius: 10rpx;
		top: 200px;
		z-index: 2;
		text-align: center;
		left: 5%;
		box-shadow: 0px 6px 9px 2px #e0eff1;

	}
	.xieyi_hefa{
		width: 52rpx;
		height: 66rpx;
	}
	.pd-t30{
		padding-top: 30rpx;
	}
	.pd-b20{
		padding-bottom: 20rpx;
	}
	.des{
		font-size: 24rpx;
		color: #969696;
	}
</style>
