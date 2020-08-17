<template>
	<view class="">
		<view class="demo" :style="'height:' +  demo.height + 'px;' + 'padding-top:' + demo.top + 'px;padding-bottom:10rpx'">
			<view class="left" :style="'top:' + demo.top + 'px'">
				<navigator url="../../pages/my/my" open-type="switchTab">
					<view class="iconfont icon-zuo"></view>
				</navigator>
			</view>
			<view class="clr_fff">地址管理</view>
		</view>
		<view class="address_box">
			<scroll-view scroll-y="true" class="scroll-Y" style="height: 550px;">
				<view v-show="isEmpty == true">
					<view class="order_img">
						<image src="https://test134.vrapp.chot.cn/mini/picture/address_no.png" mode="widthFix"></image>
					</view>
					<view class="no_text">还没有收货地址呢，快来添加吧！</view>
				</view>
				<radio-group @change="radioChange">
					<view class="list_item" v-for="(item,index) in addressList" :key="item.index">
						<view>
							<text class="list_name">{{item.name}}</text>
							<text class="list_phone">{{item.phone}}</text>
						</view>
						<view class="list_address"><text v-show="index==0" class="default_text">默认</text>{{item.province}}{{item.city}}{{item.area}}{{item.address}}</view>
						<view class="operate uni-flex">
							<label class="radio">
								<radio :value="item.id" :checked="index === current" /></label>
							<view class="btn">
								<view class="btn_item" @tap="editFn(index)">
									<image src="https://test134.vrapp.chot.cn/mini/picture/edit.png" class="operate_img" mode="widthFix"></image>
									<button type="default" class="operate_btn edit_btn">编辑</button>
								</view>
								<view class="btn_item" @tap="deleteFn(index)">
									<image src="https://test134.vrapp.chot.cn/mini/picture/delete.png" class="operate_img" mode="widthFix"></image>
									<button type="default" class="operate_btn">
										删除
									</button>
								</view>
							</view>
						</view>
					</view>
				</radio-group>
			</scroll-view>
		</view>
		<view class="fixed_operate">
			<button type="default" class="address_btn" @tap="getwxAddress" :disabled="disabled_wx">使用微信地址</button>
			<button type="default" class="address_btn" @tap="addFn">新增地址</button>
		</view>
	</view>
</template>

<script>
	import app from "../../App.vue"
	export default {
		data() {
			return {
				demo: {
					top: 0,
					height: 0
				},
				token: "",
				addressList: [],
				current: 0,
				isEmpty: false,
				disabled_wx: false
			}
		},
		onLoad() {
			this.getList();
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
			radioChange(e) {
				console.log('选择地址：', e.detail.value);
			},
			async getList() {
				const res = await this.$myRequset({
					url: "/api",
					method: "POST",
					data: {
						operate: "Member.Address.gets",
						token: this.token
					},
					header: {
						'content-type': 'application/form',
					}
				});
				this.addressList = res.data.data.list;
				if (this.addressList.length > 0) {
					this.isEmpty = false;
				} else {
					this.isEmpty = true;
				}
				let address_id = res.data.data.list[0].id;
				const result = await this.$myRequset({
					url: "/api",
					method: "POST",
					data: {
						"operate": 'Member.Address.setDefault',
						token: this.token,
						address_id: address_id
					},
					header: {
						'content-type': 'application/form',
					}
				});
			},
			addFn() {
				uni.redirectTo({
					url: "../myAddress/myAddress"
				})
			},
			editFn(index) {
				uni.navigateTo({
					url: "../myAddress/myAddress?address_id=" + this.addressList[index].id
				})
			},
			async deleteAddress(index) {
				let address_id = this.addressList[index].id;
				const res = await this.$myRequset({
					url: "/api",
					method: "POST",
					data: {
						operate: "Member.Address.del",
						token: this.token,
						address_id: address_id
					},
					header: {
						'content-type': 'application/form',
					}
				});
				if (res.data.code == 1) {
					uni.showToast({
						title: "删除成功",
						icon: "loading"
					});
					this.getList();
				}
			},
			deleteFn(index) {
				let _this = this;
				uni.showModal({
					content: '确定删除该收货地址吗？',
					success: function(res) {
						if (res.confirm) {
							_this.deleteAddress(index);
						} else if (res.cancel) {
							uni.showToast({
								title: "取消删除",
								icon: "none"
							});
						}
					}
				});
			},
			async addAddress(data) {
				let myaddress = data.province + data.area + data.city + data.address;

				console.log('微信地址', myaddress);
				const resp = await this.$myRequset({
					url: '/api',
					method: 'POST',
					data: data,
					header: {
						'content-type': 'application/form',
					}
				});
				if (resp.data.code == 1) {
					this.getList();
					this.disabled_wx = true;
				} else {
					uni.showToast({
						title: "取消使用微信地址",
						icon: "none"
					});
					this.disabled_wx = false;
				}
			},
			getwxAddress() {
				if (uni.chooseAddress) {
					uni.chooseAddress({
						success: (res) => {
							let data = {
								operate: 'Member.Address.set',
								token: this.token,
								province: res.provinceName,
								area: res.cityName,
								city: res.countyName,
								address: res.detailInfo,
								name: res.userName,
								postcode: "",
								is_default: 1,
								phone: res.telNumber
								// phone: "15689569856"
							}
							this.addAddress(data);
						},
						fail: (err) => {
							uni.showToast({
								title: "取消使用微信地址",
								icon: "none"
							});
						}
					});
				} else {
					uni.showModal({
						title: '提示',
						content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
					});
				}
			}
		}
	}
</script>

<style lang="scss">
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

		.clr_fff {
			color: #fff;
			font-size: 35rpx;
		}
	}

	.address_box {
		padding-top: 130rpx;

		.order_img {
			display: flex;
			align-items: center;
			justify-content: center;

			image {
				width: 160rpx;
				height: 160rpx;
				padding: 80rpx 80rpx 20rpx;
			}
		}

		.no_text {
			text-align: center;
			margin: 10rpx auto;
			color: #999999;
			font-size: 26rpx;
		}

		.list_item {
			margin: 20rpx auto;
			background: #fff;
			padding: 27rpx;

			.list_name {
				color: #000;
				font-size: 30rpx;
				margin-right: 10rpx;
			}

			.list_phone {
				color: #a6a6a6;
				font-size: 24rpx;
			}

			.list_address {
				color: #a6a6a6;
				word-break: break-all;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;
				text-align: justify;
				margin-bottom: 20rpx;

				.default_text {
					color: #f00;
					background-color: rgba(255,0,0,.1);
					padding: 5rpx 8rpx;
					margin-right: 10rpx;
				}
			}

			.operate {
				padding-top: 20rpx;
				border-top: 1px solid #dadada;
				align-items: center;
				justify-content: center;

				.radio {
					flex: 1;
				}

				.btn,
				.btn_item {
					text-align: right;
					justify-content: center;
					align-items: center;
					display: flex;

					.operate_btn {
						background-color: transparent;
						font-size: 26rpx;
						padding: 0 5rpx;
						color: #a6a6a6;
						display: inline-block;

						&::after {
							border: none;
						}

					}

					.edit_btn {
						margin-right: 15rpx;
					}

					.operate_img {
						width: 40rpx;
						height: 40rpx;
						vertical-align: middle;
					}
				}
			}
		}
	}

	.fixed_operate {
		width: 100%;
		position: fixed;
		margin-top: 100rpx;
		bottom: 0;
		left: 0;
		height: 100rpx;
		align-items: center;
		justify-content: center;
		display: flex;

		.address_btn {
			background-color: $uni-color-theme;
			color: #fff;
			font-size: 32rpx;
			flex: 1;
			padding: 0;
			border-radius: 0;
			height: 100rpx;
			line-height: 100rpx;

			&::after {
				border: none;
			}

			&:first-child {
				background-color: #434552;
			}
		}
	}
</style>
