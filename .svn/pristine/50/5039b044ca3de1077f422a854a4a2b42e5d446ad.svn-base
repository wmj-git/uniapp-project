<template>
	<view class="prohibition">
		<view class="demo" :style="'height:' +  demo.height + 'px;' + 'padding-top:' + demo.top + 'px;padding-bottom:10rpx'">
			<view class="left" :style="'top:' + demo.top + 'px'">
				<view class="iconfont icon-zuo" @tap='backleft'></view>
			</view>
			<view class="clr_fff">护工详情</view>
		</view>

		<view>
			<image class="img100 banner" mode="widthFix" src="https://test134.vrapp.chot.cn/mini/picture/banner_back.png"></image>
		</view>
		<view class="content">
			<view class="relative">
				<view class="uni-flex my_worker">
					<view class="">
						<image class="hg_headering" mode="widthFix" :src="detail.avatar_img"></image>
					</view>
					<view class="align">
						<view>
							<text class="name">{{ detail.name }}</text> <text class="phone">{{ detail.tel }}</text>
						</view>
						<view class="person_info">
							<text>年龄:{{detail.age}}岁</text>
							<text class="line">|</text> 
							<text>职称:{{detail.title}}</text>
							<text class="line">|</text>
							<text>服务次数:{{detail.service_count}}</text>
							
						</view>
					</view>
				</view>
				<view class="lined">
					<image class="img100" src="https://test134.vrapp.chot.cn/mini/picture/line.png" mode="widthFix"></image>
				</view>
				<view class="linear"></view>
				<view class="hugong">
					<view class="about">
						<image class="w21" src="https://test134.vrapp.chot.cn/mini/picture/hg_dot.png"></image>
						<text class="title">护工介绍</text>
					</view>
					<view class="des">
						{{ detail.introduce}}
					</view>
					


				</view>
				
				

			</view>
		</view>
	</view>
</template>
<script>
	import app from "../../App.vue"
	export default {
		name: "SpecsDetail",
		components: {
		},
		data() {
			return {
				demo: {
					top: 0,
					height: 0
				},
				nurse:'',
				detail: {}
			}
		},
		async onLoad(option) {
			console.log(option)
			this.nurse_id=option.nurse_id
			
			this.getSpecsDetailAPI();
		},
		created() {
			const demo = uni.getMenuButtonBoundingClientRect()
			this.demo.top = demo.top
			this.demo.height = demo.height

			if (app.globalData.token == undefined) {
				this.token = uni.getStorageSync('token');
			} else {
				this.token = app.globalData.token;
			}
			
		},
		methods: {
			backleft(e) {
				uni.navigateBack();
			},
					
			async getSpecsDetailAPI() {
				let data = {
					operate: "goods.get_nurse_info",
					nurse_id:this.nurse_id
				}
				const res = await this.$myRequset({
					url: "/api",
					method: "POST",
					data: data,
					header: {
						'content-type': 'application/form'
					}
				});
				console.log("护工详情")
				console.log(res)
				this.detail= res.data.data.info
				
			},

			
			
		}
	}
</script>

<style lang="scss">
	.uni-progress {
		display: flex;
	}

	.uni-progress-bar {
		background-color: rgb(235, 235, 235);
		height: 13px;
		flex: 1;
		align-self: center;
		border-radius: 20rpx;

		.uni-progress-inner-bar {
			background-color: #23c0ba;
			height: 100%;
			border-radius: 20rpx;
		}
	}

	.uni-rate {
		padding-top: 20rpx;
	}

	.show_rate {
		padding: 10rpx 0 15rpx;
	}

	.assess {
		border-top: 20rpx solid #fafafa;
		background: #fefefe;
		padding: 20rpx 0;

		.assess_item {
			width: 86%;
			box-shadow: 0rpx 0rpx 6rpx 6rpx #f4f4f4;
			padding: 20rpx;
			margin: 0 auto;
			border-radius: 20rpx;
		}

		.change_item {
			width: 94%;
			box-shadow: unset;
		}

		.border-textarea {
			border: 1px solid #d2d2d2;
			border-radius: 10rpx;
		}

		.uni-rate-title {
			font-size: 26rpx;
			color: #4f4f4f;
		}

		.pd_b20 {
			padding-bottom: 20rpx;
		}

		.confirm {
			padding-top: 20rpx;
			text-align: right;

			.confirm_btn {
				background: linear-gradient(to right, #63c8e8, #64d3e6);
				border: none;
				color: #fff;
				font-size: 26rpx;
				width: 146rpx;
				height: 47rpx;
				line-height: 47rpx;
				padding: 0;
				display: inline-block;

			}
		}
	}

	.chorce_btn {
		background: #fff;
		border: 1px solid #4f4f4f;
		color: #4f4f4f;
		font-size: 26rpx;
		width: 146rpx;
		height: 47rpx;
		margin-right: 20rpx;
		line-height: 47rpx;
		padding: 0;
		display: inline-block;
	}

	.chorce_btn::after {
		border: none;
	}
	.name {
		color: #232222;
		font-size: 34rpx;
		font-weight: bold;
	}

	.phone {
		color: #232222;
		font-size: 34rpx;
		padding-left: 30rpx;
		font-weight: bold;
	}

	.active {
		border-color: #2FCECE;
		color: #2FCECE;
	}

	.align {
		align-self: center;
	}

	.content {
		position: absolute;
		top: 185rpx;
		width: 100%;
	}

	.person_info {
		font-size: 24rpx;
		color: #9e9e9e;
		align-self: center;
		padding-left: 10rpx;

		.line {
			padding-left: 10rpx;
			padding-right: 10rpx;
		}
	}

	.des {
		font-size: 26rpx;
		color: #414141;
		text-align: justify;
	}

	.btn {
		text-align: right;
		padding-top: 20rpx;

		.btn_pj {
			background: linear-gradient(to right, #63c8e8, #64d3e6);
			border: none;
			color: #fff;
			font-size: 26rpx;
			width: 106rpx;
			height: 47rpx;
			line-height: 47rpx;
			padding: 0;
			display: inline-block;

			&::after {
				border: none;
			}
		}

		.change_box {
			display: inline-block;
		}

		.btn_change {
			background: #fff;
			border: 1px solid #4f4f4f;
			color: #4f4f4f;
			font-size: 26rpx;
			width: 106rpx;
			height: 47rpx;
			line-height: 45rpx;
			padding: 0;
			display: inline-block;
			margin-left: 20rpx;

			&:after {
				border: none;
			}
		}
	}

	.clr_fff {
		color: #fff;
		font-size: 34rpx;
	}

	.linear {
		width: 100%;
		height: 60rpx;
		background: linear-gradient(to bottom, #f8f8f8, #ffffff);
		margin-top: -20rpx;
	}

	.hugong {
		padding: 40rpx;
		padding-top: 0;

	}

	.w21 {
		width: 21rpx;
		height: 21rpx;
		padding-right: 10rpx;
	}

	.title {
		font-size: 30rpx;
		font-weight: bold;
	}

	.demo {
		display: flex;
		align-items: center;
		justify-content: center;
		background: #23c0ba;
		font-size: 26rpx;
		width: 100%;
		text-align: center;
		position: fixed;
		top: 0;
		z-index: 999;

		.left {
			float: left;
			position: absolute;
			width: max-content;
			height: max-content;
			top: 0;
			bottom: 0;
			left: 20rpx;
			margin: auto;
		}
	}

	.my_worker {
		padding: 40rpx;


	}

	.lined {
		margin-top: -40rpx;
		text-align: center;

		image {
			height: auto;
		}

	}

	.banner {
		height: auto;
		width: 100%;
	}

	.hg_headering {
		width: 135rpx;
		height: auto;
		min-height: 135rpx;
		border-radius: 50%;
		margin-right: 30rpx;
	}

	.relative {
		position: relative;
		width: 90%;
		margin: 0 auto;
		background: #fff;
		border-radius: 20rpx;
		box-shadow: 0px 2px 2px 2px #f2f2f2;
		margin-bottom: 80rpx;
	}

	.hg_fwz {
		width: 133rpx;
		height: 64rpx;
		position: absolute;
		right: 0;
		top: 0;
	}

	.nurse_box {
		padding: 40rpx;
		background-color: #1fada7;
		border-radius: 20rpx;
		box-shadow: 0 2px 10px 2px #1ca29b;
		margin-bottom: 30rpx;
	}

	.change_box {
		display: inline-block;
		margin-right: 20rpx;
	}

	.worker_label {
		color: #1ca29b;
	}

	.workerModule {
		width: 100%;
		margin: 20rpx auto;

		.lists {
			border-radius: 20rpx;
			box-shadow: 0 0 6rpx 6rpx #f1f1f1;

			.listItem {
				background: #fff;
				padding: 30rpx 20rpx;
				border-bottom: 1px solid #f4f4f4;
				border-radius: 10rpx;
			}

			.w138 {
				width: 135rpx;
				height: 135rpx;
				border-radius: 20rpx;
			}

			.workerInfo {
				margin-left: 15rpx;

				.name {
					font-size: 28rpx;
					color: #000000;
					margin-right: 15rpx;
				}

				.age {
					color: #737373;
					font-size: 22rpx;
					line-height: 50rpx;
				}

				.workerDes {
					width: 405rpx;
					color: #9e9e9e;
					font-size: 22rpx;
					border-top: 4rpx solid #e5e5e5;
					height: 40rpx;
					overflow: hidden;
				}

				.rate {
					font-size: 22rpx;
					line-height: 50rpx;
					margin-right: 15rpx;
				}

				.serverNum {
					font-size: 22rpx;
					line-height: 50rpx;
				}
			}
		}
	}
</style>
