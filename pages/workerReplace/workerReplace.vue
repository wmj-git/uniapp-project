<template>
	<view>
		<view class="demo" :style="'height:' +  demo.height + 'px;' + 'padding-top:' + demo.top + 'px;padding-bottom:10rpx'">
			<view class="left" :style="'top:' + demo.top + 'px'">
				<view class="iconfont icon-zuo" @tap='backleft'></view>
			</view>
			<view class="clr_fff">更换护工</view>
		</view>
		<view class="pt123">
			<view class="content">
				<view class="items">
					<view class="item" v-for="(items,index1) in queryList" :key="index1">
						<view  @tap="detail_all(index1)">
							<view class="order_id">订单编号：<text>{{items.order_no}}</text></view>
							<view class="orderid">
								<text class="title">服务类别：<text>{{items.goods_title}}</text></text>																
								<image class="sucessImg" src="https://test134.vrapp.chot.cn/mini/picture/135_57.png" mode="widthFix"></image>
								<view class="statusText">{{items.status}}</view>
							</view>				
							<view class="uni-flex order-info">
								<view>被护理人：{{items.name}}</view>	
								<view class="start_time">
									开始日期：{{items.start_time}}
								</view>
							</view>
								
							
						</view>
						<view class="info">
							<view v-for="(item1,index2) in items.nurse" :key="index2">
								<view class="uni-flex work_item">
									<text class="item_name font_item">护工：<text>{{ item1.name }}</text></text>
									<view class="uni-flex work_item">
										<view class="font_item" @click.stop="callPhone(index1)">电话：<text>{{ item1.tel }}</text>
											<image class="phone_img" src="https://test134.vrapp.chot.cn/mini/picture/phone.png" />
										</view>
									</view>
								</view>
								
							</view>
						</view>
						<view class="btn btn-chekd" @tap="WokerChooseTap(index,items)">
							<button class="">更换护工</button>
						</view>
					</view>
				</view>
			</view>
			<uni-load-more :status="status" :content-text="contentText" />
			
		</view>
		
	</view>
</template>

<script>
	import app from "../../App.vue"
	import uniLoadMore from '../../components/uni-load-more/uni-load-more.vue';	
	import Util from '../../common/util.js'
	export default{
		name:"WokerReplace",
		components: {
			uniLoadMore
		},
		data(){
			return{
				demo: {
					top: 0,
					height: 0
				},
				token:"",
				page: 1,
				pageSize: 10,
				status: 'loading',
				contentText: {
					contentdown: '上拉加载更多',
					contentrefresh: '加载中.....',
					contentnomore: '没有更多数据啦'
				},
				demo: {
					top: 0,
					height: 0
				},
				data: {},
				queryList: [],
				statusText: '',
				nurse_id: null
			}
		},
		created() {
			const demo = uni.getMenuButtonBoundingClientRect()
			this.demo.top = demo.top
			this.demo.height = demo.height
			if(app.globalData.token==undefined){
				this.token = uni.getStorageSync('token');
			}else{
				this.token = app.globalData.token;
			}	
		},
		onReachBottom(e) {
			this.page++;
			let status = 3;
			this.getNurseListMore(status);	
		
		},
		onLoad() {
			let status = 3;
			this.getNurseList(status);
	
		},
		onHide(){
			uni.removeStorageSync('token');
		},
		methods:{
			backleft(e){
			  	uni.navigateBack();
			},
			WokerChooseTap(index,items){
				let goods_id=items.goods_id;
				let appointment_id=items.appointment_id;
				console.log(goods_id)
				uni.navigateTo({
					url: "../workerChoose/workerChoose?goods_id="+goods_id+"&appointment_id="+appointment_id
				})
			},
			
			
			detail_all(index) {
				console.log('传递参数：', this.queryList[index]);
				let nurse = {};
				this.queryList[index].nurse.forEach((val) => {
					nurse = val;
				});
				let order_no = this.queryList[index].order_no;
				let caregivers_id = this.queryList[index].caregivers_id;
				let nurse_id = nurse.nurse_id;
				let appoint_id = nurse.id;
				let status = this.queryList[index].status;
				uni.navigateTo({
					url: "../workerAllDetail/workerAllDetail?order_no=" + order_no + "&caregivers_id=" + caregivers_id +
						"&nurse_id=" +
						nurse_id + "&appoint_id=" + appoint_id
				})

			},
			async getNurseList(status) {
				const res = await this.$myRequset({
					url: "/api",
					method: "POST",
					data: {
						operate: "Member.AppointOrder.index",
						token: this.token,
						status: status,
						page: this.page
					},
					header: {
						'content-type': 'application/form'
					}
				});
				console.log("更换");
				console.log(res);
				this.queryList = res.data.data.list.list;
			
				this.queryList.forEach((item, index) => {
					if (item.status == 0) {
						item.status = "已取消";
					} else if (item.status == 2) {
						item.status = "待护理";
					} else if (item.status == 3) {
						item.status = "正在护理";
					} else if (item.status == 5) {
						item.status = "已完成";
					}
					if (item.name == null) {
						item.name = ""
					}
					
					item.start_time= Util.timestampToDate(item.start_time);
				});
				if (!this.queryList) {
					this.status = "more";
				} else {
					this.status = "nomore";
				}
			
				let pages = Math.ceil(res.data.data.list.count / this.pageSize);
				if (this.page == pages) {
					this.status = "nomore";
				}
			},
			async getNurseListMore(status) {
				let data = {
					operate: 'Member.AppointOrder.index',
					token: this.token,
					page: this.page,
					status: status
				}
				const res = await this.$myRequset({
					url: '/api',
					method: "POST",
					data: data
				})
				for (var i = 0; i < res.data.data.list.list.length; i++) {
					this.queryList.push(res.data.data.list.list[i]); // 加载的数据追加在上一页后面										
				}
				this.queryList.forEach((item, index) => {
					//console.log(item.status) 
					if (item.status == 0) {
						item.status = "已取消";
					} else if (item.status == 2) {
						item.status = "待护理";
					} else if (item.status == 3) {
						item.status = "正在护理";
					} else if (item.status == 5) {
						item.status = "已完成";
					}
					if (item.name == null) {
						item.name = ""
					}
					item.nurse.forEach((val) => {
						if (val.introduce == "") {
							val.introduce = "暂无简介";
						}
					});
					item.start_time= Util.timestampToDate(item.start_time);
				});
				let pages = Math.ceil(res.data.data.list.count / this.pageSize);
				if (this.page == pages) {
					this.status = "nomore";
				}
			}
			
			
			
			
			
			
			
			
			
			
			
		}

		
	}
</script>

<style lang="scss">
	.demo{
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
		.clr_fff{
			color: #fff;
			font-size: 35rpx;
		}
	}
	.content {
		background: #fefefe;
		padding: 10rpx 0;
		.btn-chekd{
			height: 50rpx;
			padding-top: 27rpx;
		}
		.btn-chekd button{
			width: 170rpx;
			height: 60rpx;
			line-height: 60rpx;
			background: #23c0ba;
			color: #fff;
			font-size: 28rpx;
			float: right;
			border-radius: 30rpx;
		}
		.item {
			width: 86%;
			margin: 26rpx auto;
			background: #fff;
			box-shadow: 0rpx 0rpx 6rpx 6rpx #f4f4f4;
			border-radius: 20rpx;
			padding: 27rpx;
		}
	
		.statusText {
			position: absolute;
			top: -46rpx;
			right: -34rpx;
			display: inline-block;
			width: 122rpx;
			height: 40rpx;
			z-index: 99;
			line-height: 40rpx;
			color: #fff;
			text-align: center;
	
	
		}
		.order-info{
			border-bottom: 1px solid #f4f4f4;
			padding-bottom: 15rpx;
			color: #737373;

		}
		.start_time{		
			padding-left: 30rpx;
		}
		.order_id{
			font-size: 26rpx;
			color: #28292c;
		}
		.orderid {
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
	
			.title {
				font-size: 28rpx;
				color: #28292c;
				font-weight: normal;
				flex: 2;
			}
	
			.sucessImg {
				width: 135rpx;
				height: 57rpx;
				position: absolute;
				top: -46rpx;
				right: -34rpx;
			}
	
			.add_server {
				font-size: 26rpx;
				padding: 0 10rpx;
				margin-left: 100rpx;
				color: #000;
				background-color: transparent;
				border: 1px solid #c1c1c1;
				height: 56rpx;
				line-height: 56rpx;
	
				&:after {
					border: none;
				}
			}
		}
	
		.active {
			color: #2FCECE !important;
			border-color: #2FCECE !important;
		}
	
		.info {
			padding-top: 15rpx;
	
			.item_name {
				flex: .8;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
	
			.font_item {
				font-size: 28rpx;
				color: #737373;
				font-weight: normal;
				text {
					color: #000000;
					font-weight: bold;
				}
			}

			.work_item {
				display: flex;
				align-items: center;
				justify-content: space-between;
				.phone_img {
					width: 21rpx;
					height: 21rpx;
					margin-left: 10rpx;
				}
			}
	
			.detail {
				font-size: 26rpx;
				padding: 0 15rpx;
				height: 46rpx;
				line-height: 46rpx;
				margin-right: 0;
				border: 1px solid #c1c1c1;
				background-color: transparent;
	
				&:after {
					border: none;
				}
			}
			
		}
	}
	
</style>
