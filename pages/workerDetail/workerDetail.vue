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
				<view>
					<image class="hg_fwz" src="https://test134.vrapp.chot.cn/mini/picture/hg_fwz.png" mode="widthFix"></image>
				</view>
				<view class="uni-flex my_worker">
					<view class="">
						<image class="hg_headering" mode="widthFix" :src="detail.avatar_img"></image>
					</view>
					<view class="align">
						<view>
							<text class="name">{{ detail.name }}</text> <text class="phone">{{ detail.tel }}</text>
						</view>
						<view class="person_info">
							<text>年龄：{{ detail.age }}岁</text><text class="line">|</text> <text>职称：{{ detail.title }}</text>
						</view>
					</view>
				</view>
				<view class="lined">
					<image class="img100" src="https://test134.vrapp.chot.cn/mini/picture/line.png" mode="widthFix"></image>
				</view>
				<view class="linear"></view>
				<view class="hugong">

					<view>
						<image class="w21" src="https://test134.vrapp.chot.cn/mini/picture/hg_dot.png"></image>
						<text class="title">护理进度</text>
					</view>
					<view class="uni-progress" active>
						<view class="uni-progress-bar">
							<view class="uni-progress-inner-bar" :style="{width: width}"></view>
						</view>
						<!-- <view class="uni-progress-info">{{ progress.num }}/{{ progress.total }} </view> -->
						<view class="uni-progress-info">{{ progress.total }}{{ unit }}</view>

					</view>
					<view class="about">
						<image class="w21" src="https://test134.vrapp.chot.cn/mini/picture/hg_dot.png"></image>
						<text class="title">护工介绍</text>
					</view>
					<view class="des">
						{{ detail.introduce}}
					</view>
					<view class="about">
						<image class="w21" src="https://test134.vrapp.chot.cn/mini/picture/hg_dot.png"></image>
						<text class="title">护工评价</text>
					</view>
					<view class="des">
						<view class="show_rate">
							<uni-rate size="15" :value="rate_star" disabled="true"></uni-rate>
						</view>
						<view>
							{{ detail.comments}}
						</view>
					</view>
					<view class="btn">
						<button class="btn_pj verify_btn" v-show="finsh_confirm == true" hover-class="active"
						 @tap="verifyFinish">确认完工</button>
						<button class="btn_pj" v-show="evaluationed == true" hover-class="active" @tap="evaluateFn">评价</button>
						<button class="btn_change" hover-class="active" @tap="changeFn" v-show="isChange == true ">更换</button>
					</view>


				</view>
				<view class="assess" v-show="remark == true">
					<view class="assess_item change_item">
						<view class="uni-textarea">
							<textarea class="border-textarea" placeholder-style="color:#d2d2d2" placeholder="更换原因：" v-model="remark_val"></textarea>
						</view>
						<view class="workerModule">
							<view class="lists">
								<scroll-view scroll-y="true" class="listItems scroll-Y" v-show="chorce == true">
									<radio-group @change="radioChange">
										<label class="uni-flex listItem" v-for="(item, index) in nurseList" :key="item.id">

											<view class="uni-flex">
												<view>
													<image class="w138" :src='item.avatar_img' mode=""></image>
												</view>
												<view class="workerInfo">
													<view class="uni-flex">
														<view class="name">{{item.name}}</view>
														<view class="mar_left20 age">年龄: {{item.age}}岁</view>
													</view>
													<view class="uni-flex">
														<view class="rate">评分: {{item.avg}}</view>
														<view class="mar_left20 serverNum">服务: <text style="color: #6987fb;">{{item.service_count}}</text>次</view>

													</view>
													<view class="workerDes">
														{{item.introduce}}
													</view>
												</view>

											</view>
											<view class="mar_left20">
												<radio color="#00c4bc" :value="item.id" :checked="index === current" />
											</view>
										</label>
									</radio-group>
								</scroll-view>
							</view>
						</view>
						<view>
							<view class="confirm remark_box">
								<button class="chorce_btn" hover-class="active" @tap="choriceNurse">选择护工</button>
								<button class="confirm_btn" @tap="changeNurseFn">确认更换</button>
							</view>
						</view>
					</view>
				</view>
				<view class="assess" v-show="evaluate == true">
					<view class="assess_item">
						<view class="uni-flex pd_b20">
							<view class="uni-rate-title">评分：</view>
							<uni-rate value="3" @change="changeStarts"></uni-rate>
						</view>
						<view class="uni-textarea">
							<textarea class="border-textarea" placeholder-style="color:#d2d2d2" placeholder="评价内容：" v-model="text_val"></textarea>
						</view>
						<view>
							<view class="confirm">
								<button class="confirm_btn" @tap="confirmFn">提交评价</button>
							</view>
						</view>
					</view>
				</view>

			</view>
		</view>
	</view>
</template>
<script>
	import app from "../../App.vue"
	import uniRate from "../../components/uni-rate/uni-rate.vue"
	export default {
		name: "WorKer",
		components: {
			uniRate
		},
		data() {
			return {
				demo: {
					top: 0,
					height: 0
				},
				stars: 3,
				index: 0,
				width: '',
				progress: {},
				remark: false,
				chorce: false,
				nurse_id: "",
				perscent: 50,
				isChange: false,
				evaluate: false, // 是否点击评价按钮
				evaluationed: false, // 是否已评价
				params: [],
				nurse: {},
				date: new Date().toISOString().slice(0, 10),
				detail: {}, // 列表信息
				token: '',
				remark_val: '', // 更换原因
				text_val: '',
				rate_star: 0,
				nurseList: [],
				unit: "",
				order_status: "",
				finsh_confirm: false //完工确认
			}
		},
		onLoad: async function(option) {
			this.params.appoint_id = option.appoint_id;
			this.params.nurse_id = option.nurse_id;
			this.params.order_no = option.order_no;
			this.params.caregivers_id = option.caregivers_id;
			this.params.appointment_id = option.appointment_id;
			this.unit = option.unit;
			this.order_status = option.status;
			if (this.order_status == '正在护理') {
				this.finsh_confirm = true;
			} else {
				this.finsh_confirm = false;
			}
			switch (this.unit) {
				case "1":
					this.unit = "天";
					break;
				case "2":
					this.unit = "月";
					break;
				case "10":
					this.unit = "个";
					break;
				case "11":
					this.unit = "千克";
					break;
				case "12":
					this.unit = "套";
				default:
					this.unit = "小时";
					break;
			}
			await this.getNurseDetail();
			this.getNurser();


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
			changeStarts(num) {
				this.stars = num.value;
			},
			async finishFn() {
				const res = await this.$myRequset({
					url: "/api",
					method: "POST",
					data: {
						operate: "Member.AppointOrder.up_finish",
						token: this.token,
						appointment_id: this.params.appointment_id,
						nurse_id: this.params.nurse_id,
						order_no: this.params.order_no
					}
				});
				if (res.data.code == 1) {
					this.finsh_confirm = false;
				}
			},
			// 确认完工
			verifyFinish() {
				let _this = this;
				uni.showModal({
					content: '是否确认完工？',
					success: function(res) {
						if (res.confirm) {
							_this.finishFn();
						} else if (res.cancel) {
							uni.showToast({
								title: "取消确认",
								icon: "none"
							});
						}
					}
				});
			},
			// 更换
			changeFn() {
				if (this.nurseList.length > 0) {
					this.remark = !this.remark;
				} else {
					uni.showToast({
						title: "没有可更换的护工",
						icon: "none"
					});
				}
			},
			radioChange(e) {
				this.nurse_id = e.detail.value
			},
			// 选择护工
			choriceNurse() {
				this.chorce = !this.chorce;
			},
			evaluateFn() {
				this.evaluate = !this.evaluate;
			},
			toPercent(num, total) {
				return (Math.round(num / total * 10000) / 100.00 + "%"); // 小数点后两位百分比
			},
			async getNurseDetail() {
				let _this = this;
				let data = {
					operate: "Member.AppointOrder.nurse_info",
					token: this.token,
					appoint_id: this.params.appoint_id,
					nurse_id: this.params.nurse_id,
					order_no: this.params.order_no,
					caregivers_id: this.params.caregivers_id
				}
				const res = await this.$myRequset({
					url: "/api",
					method: "POST",
					data: data,
					header: {
						'content-type': 'application/form'
					}
				});
				this.detail = res.data.data.info;
				this.rate_star = Math.round(this.detail.score)
				let verdict = res.data.data.info;
				/*  精确到小时 */
				let day = verdict.end_time - verdict.start_time;
				let dd = new Date(this.getTimer());
				let _day = ((dd.getTime()) / 1000) - (verdict.start_time);

				// 总数
				let days = Math.floor(day / (24 * 3600)); // 相差的总天数
				var leave1 = day % (24 * 3600)
				var hours = Math.floor(leave1 / 3600); // 相差的总小时

				// 已经护理小时数
				let _days = Math.floor(_day / (24 * 3600)); // 相差的总天数
				var _leave1 = _day % (24 * 3600);
				var _hours = Math.floor(_leave1 / 3600); // 相差的总小时
				if (this.order_status == '正在护理' || this.order_status == '已完成') {
					this.progress.num = _days * 24 + _hours;
				} else {
					this.progress.num = 0;
				}
				this.progress.total = days * 24 + hours;

				if ((this.progress.num) - (this.progress.total) >= 0) { // 护理已完成
					this.progress.num = this.progress.total;
				}

				this.width = this.toPercent(this.progress.num, this.progress.total);
				if (verdict.introduce == "") {
					verdict.introduce = "暂无介绍"
				}
				if (!verdict.avatar_img) {
					verdict.avatar_img = "https://test134.vrapp.chot.cn/mini/picture/head_default.png";
				}
				if (verdict.isAllowChangeNurse === 1) {
					this.isChange = true;
				} else {
					this.isChange = false;
				}
				if (verdict.comments == null) {
					verdict.comments = "暂无评价";
					this.evaluationed = true;
				} else {
					this.evaluationed = false;
				}
			},

			changeNurseFn() {
				let _this = this;
				if (!_this.remark_val) {
					uni.showToast({
						title: "更换原因不能为空！",
						icon: "none"
					});
				} else if (_this.nurse_id == 0) {
					uni.showToast({
						title: "请选择要更换的护工！",
						icon: "none"
					});
				} else {
					uni.request({
						url: "https://test134.vrapp.chot.cn/api/",
						data: {
							operate: "Member.AppointOrder.change_nurse",
							token: this.token,
							appointment_id: this.params.appointment_id,
							nurse_id: this.nurse_id,
							remark: this.remark_val
						},
						method: "POST",
						header: {
							'content-type': 'application/json',
						},
						success: (res) => {
							if (res.data.code == 0) {
								uni.showToast({
									title: "更换次数已达上限",
									icon: "none"
								});
							} else if (res.data.code == 1) {
								uni.showToast({
									title: "更换成功",
									icon: "none"
								});
								uni.redirectTo({
									url: "../workerall/workerall"
								})
							}
							this.remark = false;
							this.nurse_id = 0; // 默认不显示已选择护工
							this.remark_val = ""; // 更换原因清空
						}
					});
				}
			},
			// 获取当前系统时间
			getTimer() {
				var date = new Date(),
					year = date.getFullYear(),
					month = date.getMonth() + 1,
					day = date.getDate(),
					hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
					minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
					second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
				month >= 1 && month <= 9 ? (month = "0" + month) : "";
				day >= 0 && day <= 9 ? (day = "0" + day) : "";
				var timer = year + '/' + month + '/' + day + ' ' + hour + ':' + minute + ':' + second;
				return timer;
			},

			/* 护工列表 */
			async getNurser() {
				let data = {
					operate: "goods.get_nurse",
					goods_id: this.detail.relevancy_goods_id,
					level: this.detail.level
				}
				const res = await this.$myRequset({
					url: "/api",
					method: "POST",
					data: data,
					header: {
						'content-type': 'application/form',
					}
				});
				this.nurseList = res.data.data.list;
			},
			// 提交评价内容
			async confirmFn() {
				if (!this.text_val) {
					uni.showToast({
						title: "评价内容不能为空!",
						icon: "none"
					});
				} else {
					let data = {
						operate: "Member.AppointOrder.add_comments",
						token: this.token,
						comments: this.text_val,
						score: this.stars,
						appoint_id: this.params.appoint_id
					}
					const res = await this.$myRequset({
						url: '/api',
						method: "POST",
						data: data,
						header: {
							'content-type': 'application/form',
						}
					})
					if (res.data.code === 1) {
						uni.showToast({
							title: "评论成功!",
							icon: "none"
						});
						this.detail.comments = this.text_val;
						this.evaluationed = false;
						this.evaluate = false;
						// 评论提交后刷新当前页面
						uni.redirectTo({
							url: '../workerDetail/workerDetail?appoint_id=' + this.params.appoint_id + "&nurse_id=" + this.params.nurse_id +
								"&order_no=" + this.params.order_no + "&caregivers_id=" + this.params.caregivers_id
						});
					};
				}
			}
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

	.about {
		padding-top: 40rpx;
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
		font-size: 30rpx;
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

			&.verify_btn {
				width: 126rpx;
				background: rgba(100, 204, 232, .1);
				color: $uni-color-theme;
				margin-right: 20rpx;
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
