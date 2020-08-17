<template>
	<view>
		<view class="demo" :style="'height:' +  demo.height + 'px;' + 'padding-top:' + demo.top + 'px;padding-bottom:10rpx'">
			<view class="left" :style="'top:' + demo.top + 'px'">
				<view class="iconfont icon-zuo" @tap='backleft'></view>
			</view>
			<view class="clr_fff">{{ title_status}}</view>
		</view>
		<view class="pt123">
			<view class="pt20">
				<form>
					<view class="uni-form-item">
						<view class="label">收货人</view>
						<input v-model="addressData.name" class="uni-input" name="input" placeholder="姓名" />
					</view>
					<view class="uni-form-item">
						<view class="label">联系电话</view>
						<input v-model="addressData.phone" class="uni-input" name="input" placeholder="手机或固话" />
					</view>
					<view class="uni-form-item">
						<view class="label">选择地区</view>
						<view class="uni-input">
							<picker mode="region" :range="years" @change="yearChange">
								<view class="city">
									<text v-model="addressData.province">{{ addressData.province }}</text>
									<text v-model="addressData.city">{{ addressData.city }}</text>
									<text v-model="addressData.area">{{ addressData.area}}</text>
								</view>
							</picker>
						</view>
					</view>
					<view class="uni-form-item">
						<view class="label">详细地址</view>
						<input v-model="addressData.address" class="uni-input" name="input" placeholder="请输入详细地址" />
					</view>
					<view class="uni-form-item">
						<view class="label">邮政编码</view>
						<input v-model="addressData.postcode" class="uni-input" name="input" placeholder="请输入邮编" />
					</view>
					<view class="uni-form-item uni-list-cell uni-list-cell-pd default_address">
						<view class="uni-list-cell-db">设为默认地址</view>
						<switch @change="switchChange" :checked="checked" />
					</view>
					<view class="uni-btn-v">
						<button @tap="saveSubmit" form-type="submit">提交</button>
					</view>
				</form>
			</view>

		</view>
	</view>
</template>

<script>
	import app from "../../App.vue"
	export default {
		name: '',
		data() {
			return {
				token: "",
				demo: {
					top: 0,
					height: 0
				},
				addressData: {
					name: '',
					phone: '',
					province: '请选择',
					city: '',
					area: '',
					address: '',
					postcode: ''
				},
				checked: false,
				citytext: [],
				is_default: null,
				address_id: "",
				title_status: "编辑地址"
			}
		},
		onLoad: function(option) {
			this.address_id = option.address_id;
			if (this.address_id == undefined) {
				this.title_status = "新增地址";
			} else {
				this.getAddressDetail();
				this.title_status = "编辑地址";
			}
		},
		created() {
			const demo = uni.getMenuButtonBoundingClientRect()
			this.demo.top = demo.top
			this.demo.height = demo.height
			if (app.globalData.token == '') {
				this.token = uni.getStorageSync('token');
			} else {
				this.token = app.globalData.token;
			}
		},
		methods: {
			backleft(e) {
				uni.navigateBack();
			},
			// 是否默认
			switchChange: function(e) {
				if (e.target.value) {
					this.is_default = 1;
				} else {
					this.is_default = null
				}
			},
			yearChange: function(e) {
				this.citytext = e.detail.value;
				this.addressData.province = this.citytext[0]
				this.addressData.city = this.citytext[1]
				this.addressData.area = this.citytext[2]
			},
			async getAddressDetail() {
				const res = await this.$myRequset({
					url: '/api',
					method: 'POST',
					data: {
						operate: 'Member.Address.getInfo',
						token: this.token,
						address_id: this.address_id
					},
					header: {
						'content-type': 'application/form',
					}
				});
				this.addressData = res.data.data;
				if (this.addressData.is_default == 1) {
					this.checked = true;
				} else {
					this.checked = false;
				}
			},
			async saveSubmit() {
				if (this.addressData.name == '') {
					uni.showToast({
						title: '收货人姓名不能为空！',
						icon: "none"
					});
				} else if (this.addressData.phone == '') {
					uni.showToast({
						title: '联系电话不能为空！',
						icon: "none"
					});
				} else if (!(/^1[3456789]\d{9}$/.test(this.addressData.phone))) {
					uni.showToast({
						title: '手机号填写有误，请重填！',
						icon: "none"
					});
				} else if (this.addressData.province == '请选择') {
					uni.showToast({
						title: '请选择地区！',
						icon: "none"
					});
				} else {
					if (this.addressData.id === '') {
						const res = await this.$myRequset({
							url: '/api',
							method: 'POST',
							data: {
								operate: 'Member.Address.set',
								token: this.token,
								name: this.addressData.name,
								phone: this.addressData.phone,
								province: this.addressData.province,
								city: this.addressData.city,
								area: this.addressData.area,
								is_default: this.is_default,
								address: this.addressData.address,
								postcode: this.addressData.postcode
							},
							header: {
								'content-type': 'application/form',
							}
						});
						if (res.data.code == 1) {
							uni.showToast({
								title: "地址添加成功",
								icon: "loading"
							});
							uni.navigateTo({
								url: "../addressList/addressList"
							});
						}
					} else {
						const res = await this.$myRequset({
							url: '/api',
							method: 'POST',
							data: {
								operate: 'Member.Address.set',
								token: this.token,
								name: this.addressData.name,
								phone: this.addressData.phone,
								province: this.addressData.province,
								city: this.addressData.city,
								is_default: this.is_default,
								area: this.addressData.area,
								address: this.addressData.address,
								postcode: this.addressData.postcode,
								id: this.address_id
							},
							header: {
								'content-type': 'application/form',
							}
						});
						if (res.data.code == 1) {
							uni.showToast({
								title: "修改成功",
								icon: "loading"
							});
							uni.navigateTo({
								url: "../addressList/addressList"
							});
							uni.removeStorageSync('editList');
						}
					}
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

	switch {
		margin-right: 40rpx;
	}

	.default_address {
		padding: 20rpx 26rpx !important;
		margin: 20rpx 0;
		background-color: #fff;
	}

	.uni-list-cell::after {
		height: 0;
	}

	.label {
		width: 130rpx;
		text-align: left;
		height: 50rpx;
		padding: 15rpx 0 15rpx 15rpx;
		line-height: 50rpx;
		font-size: 28rpx;
		background: #fff;

	}

	.pt20 {
		padding-top: 20rpx;

		.uni-form-item {
			padding: 10rpx;
		}
	}

	.uni-input {
		color: #8e8e8e;
	}

	.city text {
		padding-right: 60rpx;
		color: #8e8e8e;
	}

	.uni-btn-v button {
		background: $uni-color-theme;
		width: 80%;
		display: block;
		margin: 0 auto;
		color: #fff;
		line-height: 80rpx;
	}
</style>
