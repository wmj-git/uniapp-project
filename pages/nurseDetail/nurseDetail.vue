<template>
	<view>
		<view class="demo" :style="'height:' +  demo.height + 'px;' + 'padding-top:' + demo.top + 'px;padding-bottom:10rpx'">
			<view class="left" :style="'top:' + demo.top + 'px'">
				<view class="iconfont icon-zuo" @tap='backleft'></view>
			</view>
			<view class="top_title">被护理人资料</view>
		</view>
		<view class="relative">
			<view>
				<image class="img100" mode="widthFix" src="https://test134.vrapp.chot.cn/mini/picture/my_bg.png"></image>
			</view>
			<view class="infor">
				<view>
					<view class="uni-flex uni-padding-wrap" style="padding-top: 45rpx;">
						<view @tap="editFn" class="uni-flex edit_bar"><button class="edit_btn">点击编辑</button></view>
					</view>
					<view class="uni-padding-wrap youhui">
						<view class="uni-list-item">
							<view class="uni-padding-right uni-flex">
								<view class="my_icon">
									<image class="w42_icon" src="https://test134.vrapp.chot.cn/mini/picture/my_xingbie.png"></image>
								</view>
								<view class="icon_text">
									姓名
								</view>
								<view class="right" v-show="edit===false">
									{{ form.name }}
								</view>
								<view class="right" v-show="edit=== true">
									<input value="" type="text" placeholder="请输入姓名" class="uni-input" v-model="form.name">
								</view>
							</view>
						</view>
						<view class="uni-list-item">
							<view class="uni-padding-right uni-flex">
								<view class="my_icon">
									<image class="w42_icon" src="https://test134.vrapp.chot.cn/mini/picture/my_qianming.png"></image>
								</view>
								<view class="icon_text">
									联系方式
								</view>
								<view class="right" v-show="edit===false">
									{{ form.phone }}
								</view>
								<view class="right" v-show="edit=== true">
									<input value="" type="number" placeholder="请输入联系方式" class="uni-input" v-model="form.phone">
								</view>
							</view>
						</view>
						<view class="uni-list-item">
							<view class="uni-padding-right uni-flex">
								<view class="my_icon">
									<image class="w42_icon" src="https://test134.vrapp.chot.cn/mini/picture/my_xingbie.png"></image>
								</view>
								<view class="icon_text">
									性别
								</view>
								<view class="right" v-show="edit===false">
									{{ form.sex }}
								</view>
								<view class="" v-show="edit=== true">
									<radio-group @change="radioChange">
										<label class=" uni-list-cell-pd label-chorce" v-for="(item, index) in items" :key="item.value">
											<view>
												<radio :value="item.value" :checked="index === current" />
											</view>
											<view>{{item.name}}</view>
										</label>
									</radio-group>
								</view>
							</view>
						</view>
						<view class="uni-list-item">
							<view class="uni-padding-right uni-flex">
								<view class="my_icon">
									<image class="w42_icon" src="https://test134.vrapp.chot.cn/mini/picture/my_zhiye.png"></image>
								</view>
								<view class="icon_text">
									年龄
								</view>
								<view class="right" v-show="edit=== false">
									{{ form.age }}
								</view>
								<view class="right" v-show="edit=== true">
									<input value="" type="number" placeholder="请输入年龄" class="uni-input" v-model="form.age">
								</view>
							</view>
						</view>
						<view class="uni-list-item">
							<view class="uni-padding-right uni-flex">
								<view class="my_icon">
									<image class="w42_icon" src="https://test134.vrapp.chot.cn/mini/picture/my_address.png"></image>
								</view>
								<view class="icon_text">
									常住地
								</view>
								<view class="right" v-show="edit=== false">
									{{ form.address }}
								</view>
								<view class="right" v-show="edit=== true">
									<input value="" placeholder="请输入常住地" class="uni-input" v-model="form.address">
								</view>
							</view>
						</view>
						<view class="uni-list-item">
							<view class="uni-padding-right uni-flex">
								<view class="my_icon">
									<image class="w42_icon" src="https://test134.vrapp.chot.cn/mini/picture/my_xingbie.png"></image>
								</view>
								<view class="icon_text introduce_label">
									护理人介绍
								</view>
								<view class="right introduce" v-show="edit=== false">
									{{ form.introduce }}
								</view>
								<view class="right uni-textarea introduce introduce_textarea" v-show="edit=== true">
									<textarea class="textarea_padding" placeholder="请输入被护理人介绍" v-model="form.introduce" name="introduce"></textarea>
								</view>
							</view>
						</view>
						<view v-show="edit=== true" class="uni-list-item">
							<button @tap="saveSubmit" class="saveBnt">保存修改</button>
						</view>
					</view>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	import app from "../../App.vue"
	export default {
		name: 'myDetail',
		components: {},
		data() {
			return {
				edit: false,
				items: [{
					value: 'sex',
					name: '男'
				}, {
					value: 'sex1',
					name: '女'
				}],
				current: null,
				form: {},
				demo: {
					top: 0,
					height: 0
				},
				mid: '',
				caregivers_id: '',
				save: false
			}
		},
		onLoad() {
			this.detailList();
		},
		created() {
			if (app.globalData.mid == undefined) {
				this.mid = uni.getStorageSync('mid');
			} else {
				this.mid = app.globalData.mid;
			}
			const demo = uni.getMenuButtonBoundingClientRect()
			this.demo.top = demo.top
			this.demo.height = demo.height
		},
		watch: {
			form: {
				handler(newVal, oldVal) {
					if (newVal == oldVal) {
						this.save = true;
					} else {
						this.save = false;
					}
				},
				deep: true
			}
		},
		methods: {
			backleft(e) {
				uni.navigateBack();
			},
			detailList() {
				this.form = uni.getStorageSync('list');
				this.caregivers_id = uni.getStorageSync('list').id;
			},
			editFn() {
				this.edit = true;
				for (let k = 0; k < this.items.length; k++) {
					if (this.form.sex === this.items[k].name) {
						this.current = k;
					} else {
						this.current = 0
					}
				}
			},
			radioChange(evt) {
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === evt.target.value) {
						this.form.sex = this.items[i].name;
						this.current = i;
						break;
					}
				}
			},
			async saveSubmit() {
				if (this.save) {
					if (this.form.name == "" || this.form.age == "" || this.form.address == "" || this.form.sex == "" || this.form.phone ==
						"" || this.form.introduce == "") {
						uni.showToast({
							title: '表单项不能为空！',
							icon: "none"
						})
					} else {
						let data = {
							operate: 'Caregivers.edit',
							caregivers_id: this.caregivers_id,
							mid: this.mid,
							name: this.form.name,
							sex: this.form.sex,
							age: this.form.age,
							address: this.form.address,
							phone: this.form.phone,
							introduce: this.form.introduce
						}
						const res = await this.$myRequset({
							url: '/api',
							method: 'POST',
							data: data,
							header: {
								'content-type': 'application/form',
							}
						});
						if (res.data.code == 1) {
							this.edit = false;
							uni.showToast({
								title: '修改被护理人成功！',
								icon: "none"
							})
							if (getApp().globalData.is_flag) { //is_flag开始等于 true
								getApp().globalData.is_flag = false;
								uni.navigateTo({
									url: '../nurseList/nurseList'
								});
								setTimeout(() => {
									getApp().globalData.is_flag = true;
								}, 2000)
							} 
						} else {
							uni.showToast({
								title: '修改被护理人失败！',
								icon: "none"
							});
						}
					}
				} else {
					uni.showToast({
						title: '表单信息未修改，不能提交！',
						icon: "none"
					});
				}

			}
		}
	}
</script>

<style lang="scss">
	.demo {
		position: relative;
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

	/* #ifdef MP-WEIXIN */
	radio .wx-radio-input.wx-radio-input-checked::before {
		width: 50rpx;
		height: 50rpx;
		border-radius: 50%;
		line-height: 50rpx;
		text-align: center;
		font-size: 30rpx;
		color: #fff;
		background: #63cce7;
		transform: translate(-50%, -50%) scale(1);
	}

	/* #endif */
	.infor {
		position: absolute;
		top: 100rpx;
		overflow-x: hidden;
	}

	.uni-input {
		padding: 1rpx 12rpx;
	}

	.edit_bar {
		position: absolute;
		right: 0;
		top: 80rpx;
	}

	.edit_btn {
		background: #4ed1d6;
		border-top-left-radius: 30rpx;
		border-bottom-left-radius: 30rpx;
		color: #fff;
		font-size: 27rpx;
		padding: 5rpx 20rpx;
	}

	.edit_btn::after {
		border: none;
	}

	.label-chorce {
		display: flex;
		align-items: center;
		justify-content: center;
		float: left;
		padding: 0 10px;
	}

	.icon_text {

		font-size: 32rpx;
		color: #707070;
		flex: 1;
	}

	.introduce_label {
		display: flex;
		align-items: center;
	}

	.introduce_textarea {
		border: 1px solid #f4f4f4;
		text-align: justify !important;
	}

	.textarea_padding {
		padding: 6rpx 8rpx;
	}

	.top_title {
		font-size: 34rpx;
		color: #fff;
	}

	.uni-list::before {
		height: 0 !important;
	}

	.uni-list::after {
		height: 0 !important;
	}

	.uni-list-item {
		padding: 30rpx 0;
		border-bottom: 1px solid #f1f1f1;
		margin-left: 30rpx;

		&:last-child {
			border-bottom: none;
		}
	}

	.saveBnt {
		text-align: center;
		font-size: 34rpx;
		color: #fff;
		border-color: transparent;
		background-color: #30cece;
	}

	.youhui {
		background: #fff;
		border-radius: 20rpx;
		width: 80%;
		margin: 120rpx auto;
	}

	.right {
		color: #939393;
		font-size: 28rpx;
	}

	.introduce {
		text-align: right;
		width: 320rpx;
	}

	.relative {
		position: relative;
	}

	.absolute {
		position: absolute;
		top: 10rpx;
	}

	.my_icon {
		display: flex;
		align-items: center;
		margin-right: 20rpx;
	}

	.myphone {
		font-size: 29rpx;
		color: #fff;
	}

	.w42_icon {
		width: 42rpx;
		height: 51rpx;
	}
</style>
