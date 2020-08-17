<template>
	<view class="container prohibition">
		<view class="demo" :style="'height:' +  demo.height + 'px;' + 'padding-top:' + demo.top + 'px;padding-bottom:10rpx'">
			<view class="left" :style="'top:' + demo.top + 'px'">
				<view class="iconfont icon-zuo" @tap='backleft'></view>
			</view>
			<view class="clr_fff">订单续费</view>
		</view>
		<view class="pd_t123">
			<view class="item">
				<view>被护理人：<text>{{form.caregivers_name}}</text></view>
				<view>护工：<text>{{form.nurse_name}}</text></view>
				<view>服务项目：<text>{{form.goods_spec}}</text></view>
			</view>
			<view class="item">
				<view class="span-tit uni-flex" style="justify-content:space-between;">
					<view>
						<image class="w21" src="https://test134.vrapp.chot.cn/mini/picture/dot-title.png" mode=""> 服务天数 <text class="clr23c0ba"></text>
					</view>
					<view class="stepper">
						<text @tap="bindMinus" :class="[isminNormal ? 'normal' : 'disabled' ]">-</text> <input type="number" @change="bindManual"
						 v-model="num" /> <text @tap="bindPlus" :class="[ismaxNormal ? 'normal' : 'disabled' ]">+</text>
					</view>
				</view>
			</view>
			<view class="confirm_btn">
				<button class="confirm" @tap="confirm">提交</button>
			</view>
		</view>
	</view>
</template>

<script>
	import Util from '../../common/util.js'
	export default {
		data() {
			return {
				demo: {
					top: 0,
					height: 0
				},
				num: 1, //下单数量默认是1
				isminNormal: false,
				ismaxNormal: true,
				form: {},
				token: ''
			}
		},
		onLoad: function(option) {
			this.form = option;
		},
		created() {
			const demo = uni.getMenuButtonBoundingClientRect()
			this.demo.top = demo.top
			this.demo.height = demo.height
			this.token = uni.getStorageSync('token');
		},
		methods: {
			backleft(e) {
				uni.navigateBack();
			},
			//点击减号
			bindMinus() {
				var num = this.num;
				if (num > 1) {
					num--;
					this.num = num;
					this.ismaxNormal = true
				} else {
					this.isminNormal = false
				}

			},
			//点击加号
			bindPlus() {
				var num = this.num;
				if (num < 9999) {
					num++;
					this.num = num;
					this.isminNormal = true
				} else {

					this.ismaxNormal = false
				}
			},
			bindManual(e) {
				var num = e.detail.value;
				this.num = num;
			},
			async confirm() {
				console.log('tokenq	ss',this.token);
				let rule = this.form.goods_id + "@" + this.form.goods_spec + "@" + this.num;
				const res = await this.$myRequset({
					url: "/api",
					method: "POST",
					data: {
						token: this.token,
						operate: "member.order.again_set",
						nurse_id: this.form.nurse_id,
						order_no: this.form.order_no,
						order_type: 2,
						rule: rule,
						caregivers_id: this.form.caregivers_id,
						start_time: Util.timestampToTime(this.form.start_time)
					}
				});
				console.log('下单成功！',res);
				if (res.data.code == 1) {
					console.log('tokenq',this.token);
					var order_no = res.data.data.order.order_no
					uni.request({
						url: "https://test134.vrapp.chot.cn/api",
						data: {
							operate: "member.pay.wx_jsapi",
							token: this.token,
							order_no: order_no
						},
						method: 'POST',
						success: (res) => {
							console.log(res)				
							var signType = res.data.data.signType
							var nonceStr = res.data.data.nonceStr;
							let _package = res.data.data.package;
							var paySign = res.data.data.paySign
							var signType = res.data.data.signType
							var timeStamp = res.data.data.timeStamp
				
							uni.requestPayment({
								provider: 'wxpay',
								timeStamp: timeStamp,
								nonceStr: nonceStr,
								package: _package,
								signType: signType,
								paySign: paySign,
								success: function(res) {
									console.log('success:' + JSON.stringify(res));
									uni.switchTab({
										url: "../../pages/worker/worker",
										success: (res) => {
											let data = {
												tabIndex: 0
											}
											let page = getCurrentPages().pop();
											if (page == undefined || page == null) return;
											page.onLoad(data);
										}
									});
								},
								fail: function(err) {
									console.log('fail:' + JSON.stringify(err));
									uni.switchTab({
										url: "../../pages/worker/worker",
										success: (res) => {
											let data = {
												tabIndex: 0
											}
											let page = getCurrentPages().pop();
											if (page == undefined || page == null) return;
											page.onLoad(data);
										}
									});
								}
							});
						}
					})
				
				
				
				} else {
					uni.showToast({
						title: res.data.info,
						duration: 3000,
						icon: "none"
					});
				
				}
			}
		}
	}
</script>

<style lang="scss">
	.container {
		background: #f9f9f9;
		height: 100%;
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
			font-size: 34rpx;
		}

		.icon-zuo {
			color: #fff;
		}
	}

	.pd_t123 {
		padding-top: 123rpx;
	}

	.w21 {
		width: 21rpx;
		height: 21rpx;
		padding-right: 10rpx;
	}

	.item {
		width: 80%;
		margin: 10rpx auto 60rpx;

		text {
			font-size: 26rpx;
			color: #999;
		}
	}

	.confirm_btn {
		width: 80%;
		margin: 20rpx auto;
	}

	.stepper {
		width: 250rpx;
		display: flex;

		text {
			border: 1px solid #23c1bb;
			color: #23c1bb;
			margin-left: 10rpx;
			margin-right: 10rpx;
			width: 42rpx;
			height: 42rpx;
			display: inline-block;
			text-align: center;
			line-height: 42rpx;
			border-radius: 6rpx;
		}

		input {
			text-align: center;
			border: 1px solid #f1f1f1;
			color: #8e8e8e;
			width: 102rpx;
			height: 42rpx;
			border-radius: 6rpx;
		}

	}

	.confirm {
		height: 80rpx;
		border-radius: 40rpx;
		color: white;
		line-height: 80rpx;
		background: linear-gradient(to right, #63cce7, #66ebdf);
		box-shadow: 0 8rpx 26rpx 0 #2fcece;

		&::after {
			border: none;
		}
	}
</style>
