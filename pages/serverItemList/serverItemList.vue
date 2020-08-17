<template>
	<view>
		<view class="demo" :style="'height:' +  demo.height + 'px;' + 'padding-top:' + demo.top + 'px;padding-bottom:10rpx'">
			<view class="left" :style="'top:' + demo.top + 'px'">
				<view class="iconfont icon-zuo" @tap='backleft'></view>
			</view>
			<view class="clr_fff">服务项目</view>
		</view>
		<view class="pd_t123">
			<view class="workerModule">				
				<view class="lists">						
					<view class="listItem" v-for="(item, index) in items" :key="item.id">
						<view class="orderid">
							<text class="title">订单号：{{item.order_no}}</text>
						
							<image class="sucessImg" src="https://test134.vrapp.chot.cn/mini/picture/135_57.png" mode="widthFix"></image>
							<text class="statusText"> {{item.status}}</text>
						
						</view>
						<view class="uni-flex relative">								
							<view class="workerInfo">
								<view class="uni-flex">
								  	<view class="name">被护理人: {{item.name}}</view>
									<view :class="[item.status=='待服务'||item.status=='正在护理' ? 'show' : 'hide' ]" class="addItem" @click="addItemTap(index,item)"> <image src="https://test134.vrapp.chot.cn/mini/picture/addItem.png" mode=""></image> </view>
								</view>									
								<view class="uni-flex">
									<view class="tell">电话: {{item.phone}} </view>																			
								</view>
							</view>							
						</view>
						<view :class="[item.status=='待服务'||item.status=='已完成'||item.status=='正在护理' ? 'show' : 'hide' ]">
							<view class="uni-flex">
								<view class="zj_server"> 今日完成进度: {{item.log_count}}/5 </view>
							</view>
							<view>
								<uni-steps :options="item.log" direction="column" :active='item.log_count-1'></uni-steps>
							</view>
							<view class="historyItemMore" @click="historyMoreClick(index,item)">
								查看历史服务项目
							</view>
						</view>	
					</view>
					<uni-load-more :status="status" :content-text="contentText" />										
				</view>
	
			</view>
		</view>
		
	</view>
</template>

<script>
	import  uniSteps  from '../../components/uni-steps/uni-steps.vue'
	import app from "../../App.vue"
	import uniLoadMore from '../../components/uni-load-more/uni-load-more.vue';
	export default {
		name: 'serverItemList',
		components: {
			uniSteps,
			uniLoadMore
		},
		created () {
			const demo = uni.getMenuButtonBoundingClientRect()
			this.demo.top = demo.top
			this.demo.height = demo.height
			this.token = app.globalData.token;
		},
		data(){
			return{
				token:"",
				status: 'more',
				contentText: {
					contentdown: '上拉加载更多',
					contentrefresh: '正在加载.....',
					contentnomore: '没有更多数据了'
				},
				demo: {
					top: 0,
					height: 0
				},
				items:[],
				page:1,
				pageSize:1,
				statusText:"",
				sverItemShow:false
				
			}
		},
		onReachBottom(){
			this.page++;
			console.log("+++")
			this.serverItemListMoreAPI();
			
		},
		methods:{
			backleft(e){
			  	uni.navigateBack();
			},
			addItemTap(index, item){
				var appointment_id=item.appointment_id;			
				uni.navigateTo({
					url:"../serverItem/serverItem?appointment_id="+appointment_id			
				})
			},
			historyMoreClick(index, item){
				var appointment_id=item.appointment_id;
				uni.navigateTo({
					url:"../historyServer/historyServer?appointment_id="+appointment_id		
				})
			},
			async serverItemListAPI(){
				const res = await this.$myRequset({
					url: '/api', 
				    data:{
				    	operate:"Member.order.service_order",
				    	token:this.token,
						page:this.page
				    },
				    method:"POST"
				});
				console.log("服务项目列表")
				console.log(res)
				this.items=res.data.data.list.list
				this.pageSize=res.data.data.list.page					
				let this_items = [];
				this.items.forEach(function(val,index,arrList){	
					if(val['status']==2){
						val['status'] = "正在护理";
					}else if(val['status']==5){
						val['status'] = "已完成";
					}else if(val['status']==0){
						val['status'] = "已取消";						
					}else if(val['status']==3){
						val['status'] = "待服务";												
					}					
					 val.log.forEach(function(item,key,arrLog){						
						item['title']=item['name'];
						item['desc']=item['day'];
						arrList[index]['log'][key]=item;							
					})
					this_items=arrList;																																								
				})
				console.log(this_items)	
				this.items = this_items;	
				
				let pages = Math.ceil(res.data.data.list.count / this.pageSize);
				console.log(pages)	
				if (this.page == pages) {
					this.status = "nomore";
				}
			},
			async serverItemListMoreAPI(){
				const res = await this.$myRequset({
					url: '/api', 
				    data:{
				    	operate:"Member.order.service_order",
				    	token:this.token,
						page:this.page
				    },
				    method:"POST"
				});
				console.log(res)
				for (var i = 0; i < res.data.data.list.list.length; i++) {
					this.items.push(res.data.data.list.list[i]); // 加载的数据追加在上一页后面										
				}
				this.pageSize=res.data.data.list.page					
				let this_items = [];
				this.items.forEach(function(val,index,arrList){	
					if(val['status']==2){
						val['status'] = "正在护理";
					}else if(val['status']==5){
						val['status'] = "已完成";
					}else if(val['status']==0){
						val['status'] = "已取消";						
					}else if(val['status']==3){
						val['status'] = "待服务";												
					}					
					 val.log.forEach(function(item,key,arrLog){						
						item['title']=item['name'];
						item['desc']=item['day'];
						arrList[index]['log'][key]=item;							
					})
					this_items=arrList;																																								
				})
				console.log(this_items)	
				this.items = this_items;	
				
				let pages = Math.ceil(res.data.data.list.count / this.pageSize);
				console.log(pages)	
				if (this.page == pages) {
					this.status = "nomore";
				}
				
			}
			
			
			
		},
		onLoad() {
			this.serverItemListAPI();
			
		},
		onHide() {
			let token = this.token
			uni.clearStorageSync('token', token);
		}
	}
</script>

<style lang="scss">
	.relative{
		position: relative;
	}
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
	.pd_t123{
		padding-top: 123rpx;
	}
	.addItem{
		position: absolute;
		top: 10rpx;
		right: 0rpx;
		image{
			width: 64rpx;
			height: 64rpx;
		}
	}
	
	
	.orderid {
		position: relative;
		padding-bottom: 27rpx;
		border-bottom: 1px solid #f4f4f4;
	
		.title {
			font-size: 26rpx;
			color: #28292c;
		}
	
		.sucessImg {
			width: 135rpx;
			height: 57rpx;
			position: absolute;
			top: 0;
			right: -34rpx;
		}
	}
	.statusText{
		position: absolute;
		top: 0rpx;
		right: -34rpx;
		display: inline-block;
		width: 122rpx;
		height: 40rpx;
		z-index: 99;
		line-height: 40rpx;
		color: #fff;
		text-align: center;
	}
	.workerModule{
		width: 100%;
		background: #f8f8f8;
		.lists{				
			width: 90%;
			margin: 0 auto;
			margin-top:20rpx;
			border-radius: 20rpx;
			.listItem{		
				background: #fff;
				padding: 20rpx;
				margin-top: 20rpx;
				border-radius: 10rpx;
				box-shadow: 0 0 6rpx 6rpx #f1f1f1;
			}
			.listItem:last-child{
				margin-bottom: 30rpx;
			}
			.w138{
				width: 135rpx;
				height: 135rpx;
				border-radius: 20rpx;
			}
			.zj_server{
				margin-left:15rpx;
				color: #737373;
				font-size: 24rpx;
				line-height: 50rpx;
			}
			.historyItemMore{
				text-align: center;
				color: #737373;
				font-size: 28rpx;
				margin-top: 10rpx;
			}
			.workerInfo{
				margin-left:15rpx;
				.name{
					font-size: 28rpx;
					color: #737373;
					font-weight: bold;
					padding-top: 15rpx;
				}
				.tell{
					color: #737373;
					font-size: 24rpx;
					line-height: 50rpx;
				}
				
			}
			
			
		}
	}
</style>
