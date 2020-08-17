<template>
	<view class="">
		<view class="demo" :style="'height:' +  demo.height + 'px;' + 'padding-top:' + demo.top + 'px;padding-bottom:10rpx'">
			<view class="left" :style="'top:' + demo.top + 'px'">
				<navigator url="../my/my" open-type="switchTab">
					<view class="iconfont icon-zuo"></view>
				</navigator>
			</view>
			<view class="top_title">被护理人员资料</view>
		</view>
		<view class="list_box">
			<view v-show="isEmpty == true">
				<view class="order_img">
					<image src="https://test134.vrapp.chot.cn/mini/picture/nurse_no.png" mode="widthFix"></image>
				</view>
				<view class="no_text">还没有护理人呢，快来添加吧！</view>
			</view>
			<view class="nurse_list" v-for="(item,index) in list" :key="item.index" @tap="seeDetail(index)">
				<view class="list_top">
					<view class="list_text">{{ item.name }}
						<icon type="clear" color="#e1e1e1" @click.stop="deleteNurse(index)" class="text_detail" size="22"></icon>
					</view>
				</view>
				<view class="list_content">
					<view class="list_item first">
						<view class="list_item_label">性别:<span>{{ item.sex }}</span></view>
						<view class="list_item_label">年龄:<span>{{ item.age }}岁</span></view>
					</view>
					<view class="list_item" open-type="callPhone">
						<view class="list_item_label">手机: <span @click.stop="callPhone(index)">{{ item.phone }}</span>
							<image class="phone_img" src="https://test134.vrapp.chot.cn/mini/picture/phone.png" />
						</view>
					</view>
					<view class="list_item">
						<view class="list_item_label">地址: <span>{{ item.address }}</span></view>
					</view>
					<view class="list_item">
						<view class="list_item_label introduce">情况简介: <span>{{ item.introduce }}</span></view>
					</view>
				</view>
			</view>
		</view>
		<view class="top" :style="{'display':(flag===true? 'block':'none')}">
			<uni-icons class="topc" type="arrowthinup" color="#919191" size="24" @click="top"></uni-icons>
		</view>
		<view class="form_btn">
			<button type="default" class="receive_btn" @tap="addNurse">新增被护理人</button>
		</view>
	</view>
</template>

<script>
	import app from "../../App.vue"
	import uniIcons from "../../components/uni-icons/uni-icons.vue"
	export default {
		components: {
			uniIcons
		},
		data() {
			return {
				demo: {
					top: 0,
					height: 0
				},
				flag: false,
				list: [],
				mid: '',
				isEmpty: false
			}
		},
		onLoad() {
			this.getList();
		},
		created() {
			const demo = uni.getMenuButtonBoundingClientRect()
			this.demo.top = demo.top
			this.demo.height = demo.height
			if (app.globalData.mid == undefined) {
				this.mid = uni.getStorageSync('mid');
			} else {
				this.mid = app.globalData.mid;
			}
		},
		onPageScroll(e) {
			if (e.scrollTop > 600) {
				this.flag = true;
			} else {
				this.flag = false;
			}
		},
		methods: {
			addNurse() {
				uni.navigateTo({
					url: "../nurse/nurse"
				});
			},
			//回到顶部
			top() {
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				});
			},
			async getList() {
				let res = await this.$myRequset({
					url: '/api',
					method: 'POST',
					data: {
						operate: 'Caregivers.index',
						mid: this.mid
					},
					header: {
						'content-type': 'application/form',
					}
				});
				this.list = res.data.data.list;
				if (this.list.length == 0) {
					this.isEmpty = true;
				} else {
					this.isEmpty = false;
				}
			},
			callPhone(index) {
				uni.makePhoneCall({
					phoneNumber: this.list[index].phone
				});
			},
			seeDetail(index) {
				uni.setStorageSync('list', this.list[index]);
				uni.navigateTo({
					url: "../nurseDetail/nurseDetail"
				})
			},
			async delNurseFn(index) {
				let response = await this.$myRequset({
					url: '/api',
					data: {
						operate: "Caregivers.is_die",
						caregivers_id: this.list[index].id
					},
					method: 'POST',
					header: {
						'content-type': 'application/form'
					}
				});
				if (response.data.code == 1) {
					uni.showToast({
						title: "正在删除",
						icon: "loading"
					});
					this.getList();
				}
			},
			deleteNurse(index) {
				let _this = this;
				uni.showModal({
					content: '确定删除该被护理人信息吗？',
					success: function(res) {
						if (res.confirm) {
							_this.delNurseFn(index);
						} else if (res.cancel) {
							uni.showToast({
								title: "取消删除",
								icon: "none"
							});
						}
					}
				});
			}
		}
	}
</script>
<style>
	page{
		background-color: #fff;
	}
</style>
<style lang="scss" scoped>
	.demo {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #23c0ba;
		font-size: 26rpx;
		width: 100%;
		text-align: center;
		top: 0;
		z-index: 999;
		position: fixed;

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

		.top_title {
			font-size: 34rpx;
			color: #fff;
		}
	}

	.list_box {
		padding-top: 120rpx;

		.order_img {
			display: flex;
			align-items: center;
			justify-content: center;
		
			image {
				width: 200rpx;
				height: 200rpx;
				padding: 80rpx 80rpx 20rpx;
			}
		}
		.no_text {
			text-align: center;
			margin: 10rpx auto;
			color: #999999;
			font-size: 26rpx;
		}
	}

	.nurse_list {
		width: 86%;
		margin: 15px auto;
		background: #fff;
		box-shadow: 0 8rpx 26rpx 0 #dedede;
		border-radius: 10px;
		padding: 20rpx;

		.list_item {
			.phone_img {
				width: 21rpx;
				height: 21rpx;
				margin-left: 10rpx;
			}

			span {
				margin-left: 10rpx;
				color: #969696;
			}

			.introduce {
				word-break: break-all;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;
				text-align: justify;
			}
		}

	}

	.first {
		display: flex;
	}

	.first .list_item_label {
		flex: 2;
	}

	.list_top {
		padding: 0 20rpx 12rpx;
		border-bottom: 1px solid #f4f4f4;
		position: relative;

		.list_text {
			font-size: 34rpx;
			font-weight: 600;
		}

		.text_detail {
			position: absolute;
			color: #fff;
			font-size: 26rpx;
			top: -20rpx;
			right: -20rpx;

		}
	}

	.list_content {
		padding: 20rpx 20rpx 10rpx;
	}

	.form_btn {
		width: 80%;
		text-align: center;
		margin: 40rpx auto;
		padding-bottom: 40rpx;

		.receive_btn {
			height: 80rpx;
			border-radius: 40rpx;
			color: white;
			line-height: 80rpx;
			background: linear-gradient(to right, #63cce7, #66ebdf);
			box-shadow: 0 8rpx 26rpx 0 #2fcece;
		}

		.receive_btn:after {
			border: none;
		}
	}

	.top {
		position: relative;
		display: none;
	}

	.topc {
		position: fixed;
		right: 0;
		background: #fff;
		top: 70%;
		border: 1px solid #b8b8b8;
		height: 60rpx;
		width: 60rpx;
		text-align: center;
		line-height: 60rpx;
		border-radius: 50%;
	}
</style>
