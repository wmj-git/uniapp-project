<template>
	<view>
		<view class="demo" :style="'height:' +  demo.height + 'px;' + 'padding-top:' + demo.top + 'px;padding-bottom:10rpx'">
			<view class="left" :style="'top:' + demo.top + 'px'">
				<view class="iconfont icon-zuo" @tap='backleft'></view>
			</view>
			<view class="top_title">添加被护理人员</view>
		</view>
		<view class="nurse_title">
			<view class="title_head">请填写护理人基本信息</view>
			<view class="sub_title">请如实填写以下信息</view>
		</view>
		<form @submit="formSubmit" @reset="formReset">
			<view class="form_data">
				<view class="form_item item_tag">
					<view class="form_item_label">姓名<span>*</span></view>
					<input type="text" placeholder="请输入姓名" v-model="form.name" name="name" />
				</view>
				<view class="form_item">
					<view class="form_item_label">性别<span>*</span></view>
					<view class="">
						<radio-group @change="radioChange" name="sex">
							<label class=" uni-list-cell-pd label-chorce label-chorce" v-for="(item, index) in items" :key="item.value">
								<view>
									<radio :value="item.value" :checked="index === current" />
								</view>
								<view>{{item.name}}</view>
							</label>
						</radio-group>
					</view>
				</view>
				<view class="form_item item_tag">
					<view class="form_item_label">年龄<span>*</span></view>
					<input type="number" placeholder="请输入年龄" v-model="form.age" name="age" />
				</view>
				<view class="form_item item_tag">
					<view class="form_item_label">手机<span>*</span></view>
					<input type="number" placeholder="请输入手机号" v-model="form.phone" name="phone" />
				</view>
				<view class="form_item item_tag">
					<view class="form_item_label">地址<span>*</span></view>
					<input type="text" placeholder="请输入地址" v-model="form.address" name="address" />
				</view>
				<view class="item_tag">
					<view class="form_item_label">被护理人介绍<span>*</span></view>
					<view class="uni-textarea">
						<textarea placeholder="请输入被护理人介绍" v-model="form.introduce" name="introduce"></textarea>
					</view>
				</view>
			</view>
			<view class="form_btn">
				<button type="default" class="receive_btn" formType="submit">保存</button>
			</view>
		</form>
	</view>
</template>

<script>
	import app from "../../App.vue"
	var graceChecker = require("../../common/graceChecker.js")
	export default {
		data() {
			return {
				demo: {
					top: 0,
					height: 0
				},
				items: [{
					value: '男',
					name: '男'
				}, {
					value: '女',
					name: '女'
				}],
				current: 0,
				height: '500px',
				form: {
					name: '',
					age: null,
					phone: null,
					address: '',
					introduce: ''
				},
				mid: "",
				isChoose: false
			}
		},
		onLoad: function(option) {
			this.isChoose = option.isChoose;
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
		methods: {
			backleft(e) {
				uni.navigateBack();
			},
			radioChange(evt) {
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === evt.target.value) {
						this.form.sex = this.items[i].value;
						this.current = i;
						break;
					}
				}
			},
			formSubmit: function(e) {
				var rule = [{
						name: "name",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "输入姓名"
					},
					{
						name: "sex",
						checkType: "in",
						checkRule: "男,女",
						errorMsg: "请选择性别"
					},
					{
						name: "age",
						checkType: "reg",
						checkRule: "^(?:[1-9][0-9]?|1[01][0-9]|120)$",
						errorMsg: "请输入年龄1-120"
					},
					{
						name: "phone",
						checkType: "reg",
						checkRule: "^1[3|4|5|7|6|9|8][0-9]{9}$",
						errorMsg: "请输入正确手机号"
					},
					{
						name: "address",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请输入地址"
					},
					{
						name: "introduce",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请输入护理人介绍"
					}
				];
				//进行表单检查
				var formData = e.detail.value;
				var checkRes = graceChecker.check(formData, rule);
				if (checkRes) {
					formData.operate = "Caregivers.add";
					formData.mid = this.mid;
					this.$myRequset({
						url: '/api',
						method: 'POST',
						data: formData
					});
					uni.showToast({
						title: "添加成功!",
						icon: "none"
					});
					if(this.isChoose){
						uni.navigateBack();
					}else{
						uni.navigateTo({
							url: "../nurseList/nurseList"
						});
					}
					
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
				}
			},
			formReset: function(e) {
				this.chosen = ''
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: white;
	}

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
		position: fixed;
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

		.top_title {
			font-size: 34rpx;
			color: #fff;
		}
	}

	.nurse_title {
		padding-top: 120rpx;
		margin: 20rpx 35rpx;

		.title_head {
			font-size: 48rpx;
			color: black;
			font-weight: 600;
		}

		.sub_title {
			color: #fa7200;
		}
	}

	.form_data {
		margin: 20rpx 35rpx;

		.form_item {
			padding: 10rpx 0;
			height: 120rpx;
			margin-bottom: 20rpx;
			border-bottom: 1px solid #f1f1f1;
			position: relative;
		}

		.w14_right {
			width: 14rpx;
			height: 23rpx;
		}

		.w14_right,
		.w14_bottom {
			position: absolute;
			right: 0;
			bottom: 20rpx;
		}

		.w14_bottom {
			width: 26rpx;
			height: 13rpx;
		}

		.item_tag::after {
			float: right;
		}

		.form_item_label {
			font-weight: 600;
			margin-bottom: 15rpx;

			span {
				color: red;
			}
		}

		.label-chorce {
			display: flex;
			align-items: center;
			justify-content: center;
			float: left;
			padding: 0;

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
		.label-chorce:first-child {
			margin-right: 100rpx;
		}
	}

	.uni-textarea {
		border: 1px solid #F1F1F1;
	}

	.form_btn {
		width: 80%;
		text-align: center;
		margin: 40rpx auto 0;
		padding-bottom: 40rpx;

		.receive_btn {
			height: 80rpx;
			border-radius: 40rpx;
			color: white;
			line-height: 80rpx;
			background: linear-gradient(to right, #63cce7, #66ebdf);
			box-shadow: 0 8rpx 36rpx 0 #2fcece;
		}

		.receive_btn::after {
			border: none;
		}
	}
</style>
