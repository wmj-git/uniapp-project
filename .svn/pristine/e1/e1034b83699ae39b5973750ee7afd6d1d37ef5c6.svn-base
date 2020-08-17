<template>
	<view>
		<view class="demo" :style="'height:' +  demo.height + 'px;' + 'padding-top:' + demo.top + 'px;padding-bottom:10rpx'">
			<view class="left" :style="'top:' + demo.top + 'px'">
				<view class="iconfont icon-zuo" @tap='backleft'></view>
			</view>
			<view class="clr_fff">历史记录</view>
		</view>
		<view class="pd_t123">
			<view class="historyServer" :class="[historyServers ? 'show' : 'hide' ]">
				<view>服务记录</view>
				<uni-steps :options="historySuccessItem" direction="column" :active='count-1'></uni-steps>
			</view>
			<view :class="[historyServers ? 'hide' : 'show' ]">
				<view class="noHistoryServer">你还没有服务项目记录哦~</view>
			</view>
		</view>
	</view>
</template>

<script>
	import app from "../../App.vue"
	export default {
		name: 'HistoryServer',
		created () {
			const demo = uni.getMenuButtonBoundingClientRect()
			this.demo.top = demo.top
			this.demo.height = demo.height
			if(app.globalData.token==undefined||app.globalData.mid==undefined){
				this.token = uni.getStorageSync('token');
				this.mid = uni.getStorageSync('mid');
			}else{
				this.token = app.globalData.token;
				this.mid = app.globalData.mid;
			}	
		},
		data(){
			return{
				mid:"",
				token:"",
				demo: {
					top: 0,
					height: 0
				},
				appointment_id:"",
				historySuccessItem:[],
				count:"",
				historyServers:true
			}
		},
		methods:{
			backleft(e){
			  	uni.navigateBack();
			},
			async serverHistoryListAPI(){
				const res = await this.$myRequset({
					url: '/api', 
				    data:{
				    	operate:"ServiceItem.history_log",
				    	appointment_id:this.appointment_id
				    },
				    method:"POST"
				});
				if(res.data.data.length>0){
					this.historyServers=true
					this.historySuccessItem =res.data.data
					this.count = this.historySuccessItem.length
					let this_items = [];
					this.historySuccessItem.forEach(function(val,index,arrList){					
						val['title']=val['name'];
						val['desc']=val['day'];
						this_items=arrList;
																																									
					})
					console.log(this_items)	
					this.historyItem = this_items.reverse();
				}else{
					this.historyServers=false
				}	
			}
			
		},
		onLoad(option) {
			console.log(option)
			this.appointment_id=option.appointment_id;
			this.serverHistoryListAPI();
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
	.pd_t123{
		padding-top: 123rpx;
	}
	.noHistoryServer{
		text-align: center;
		color: #999;
		width: 100%;
		padding-top: 30rpx;
	}
	.historyServer{
		padding: 30rpx;
	}
</style>
