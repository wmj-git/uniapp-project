<template>
	<view>
		<view class="demo" :style="'height:' +  demo.height + 'px;' + 'padding-top:' + demo.top + 'px;padding-bottom:10rpx'">
		    <view class="left" :style="'top:' + demo.top + 'px'">
		        <view class="iconfont icon-zuo" @tap='backleft'></view>
		    </view>
		    <view class="clr_fff">护工选择</view>
		</view>
		
		<view class="pt123">
			<view class="workerModule">
				<view class="lists">
					<scroll-view scroll-y="true" class="listItems scroll-Y">
						<radio-group @change="radioChange">
							
							<label class="uni-flex listItem" v-for="(item,index) in items" :key="item.id">
								
								<view class="uni-flex">
									<view> <image class="w138" :src='item.avatar_img' mode=""></image> </view>
									<view class="workerInfo" @tap="makeTap(index,item)">
										<view class="uni-flex">
											<view class="name">{{item.name}}</view>
											<view class="mar_left20 age">年龄:{{item.age}}岁</view>
										</view>
										<view class="uni-flex">
											<view class="rate">评分: {{item.avg}}</view>
											<view class="mar_left20 serverNum">服务:<text style="color: #6987fb;">{{item.service_count}}</text>次</view>
											
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
				
				<view class="makehlr_btn">
					<button @tap="workerChoose_ok"> 选择你要替换的护工 </button>					
				</view>
				
				
				
				
				
			</view>
			
		</view>

		
		
	</view>
	
	
</template>

<script>
	import app from "../../App.vue"
	export default {
		name: "Specs",
		data () {
			return {
				demo: {
					top: 0,
					height: 0
				},
				
				//items: [],
				nurse_id:"",
				rule:"",
				start_time:"",
				token:"",
				appointment_id:""
			}
		},	
		created () {
			const demo = uni.getMenuButtonBoundingClientRect()
			this.demo.top = demo.top
			this.demo.height = demo.height
			if(app.globalData.token==undefined){
				this.token = uni.getStorageSync('token');
			}else{
				this.token = app.globalData.token;
			}	
		},
		computed:{
			items:{
				//在vuex中获取数据
				get(){
					return this.$store.state.wokerItems
				},
				set(){
					
				}
			}
		},
		onLoad: function (option) { 
			
			var goods_id =option.goods_id;	
			this.appointment_id = option.appointment_id;
			let level= "";
			this.makeListAPI(goods_id,level);

		},
		methods:{
			makeTap(index,item){
				console.log(item.id)
				var nurse_id = item.id
				uni.navigateTo({
					url: "../specsDetail/specsDetail?nurse_id="+nurse_id
				});
			},
			backleft(e){
			  	uni.navigateBack();
			},
			workerChoose_ok(){
				var _this =this;
				if(_this.nurse_id==""){
					uni.showToast({ 
						title: '请选择护工', 
						duration: 2000 ,
						icon: "none"
						})		
				}else{
					
					uni.showModal({
					    title: '替换护工',
					    content: '确认要更换护工么？',
					    success: function (res) {
					        if (res.confirm) {
					            console.log('用户点击确定');
								
								_this.workerChoosetAPI();
					        } else if (res.cancel) {
					            console.log('用户点击取消');
					        }
					    }
					});
					
					
					
					
				}	
			},
			async workerChoosetAPI(){
				console.log(this.token)
				console.log(this.appointment_id)
				console.log(this.nurse_id)
				const res = await this.$myRequset({
				    url: '/api', 
					method:"POST",
				    data: {
				        operate: 'Member.AppointOrder.change_nurse',
						token:this.token,
						appointment_id:this.appointment_id,
						nurse_id:this.nurse_id
				    }
				});
				console.log("是否替换护工")
				console.log(res.data.code==1)
				if(res.data.code==1){
					uni.showToast({
						title: res.data.data.info,
						duration: 1000
					})
					uni.navigateTo({
						url:"../workerReplace/workerReplace"
					})

				}
			},	
			async makeListAPI(goods_id,level){
				const res = await this.$myRequset({
				    url: '/api', 
					method:"POST",
				    data: {
				        operate: 'goods.get_nurse',
						goods_id:goods_id,
						level:level
				    }
				});
				console.log(res.data.data.list.length==0);
				if(res.data.data.list.length==0){
					uni.showToast({ 
						title: '没有护工可以选择', 
						duration: 2000,
						icon: "none"
						})		
					
					
				}else{
					//this.items =res.data.data.list
					
					this.$store.commit("setWokerItems",res.data.data.list)	
						
				}	
				
			},
			radioChange(e){
				this.nurse_id = e.detail.value
			}
			
		}
		
	}
</script>

<style lang="scss">
	.clr_fff{
		color: #fff;
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
	}
	.workerModule{
		width: 100%;
		background: #f8f8f8;
		.lists{				
			width: 90%;
			margin: 0 auto;
			margin-top:20rpx;
			border-radius: 20rpx;
			.listItems{
				overflow: hidden;
				height: 1090rpx;
			}
			.listItem{		
				background: #fff;
				padding: 20rpx;
				margin-top: 20rpx;
				border-radius: 10rpx;
				box-shadow: 0 0 6rpx 6rpx #f1f1f1;
			}
			.w138{
				width: 135rpx;
				height: 135rpx;
				border-radius: 20rpx;
			}
			.workerInfo{
				margin-left:15rpx;
				.name{
					font-size: 28rpx;
					color: #000000;
				}
				.age{
					color: #737373;
					font-size: 22rpx;
					line-height: 50rpx;
				}
				.workerDes{
					width: 405rpx;
					color: #9e9e9e;
					font-size: 22rpx;
					border-top: 4rpx solid #e5e5e5;
					height: 40rpx;
					overflow: hidden;
				}
				.rate{
					font-size: 22rpx;
					line-height: 50rpx
				}
				.serverNum{
					font-size: 22rpx; 
					line-height: 50rpx;
				}
			}
			
			
		}
	}
	.mar_left20{
		margin-left: 20rpx;
	}
	.pt123{
		padding-top: 123rpx;
	}
	.makehlr_btn{
		position: fixed;
		bottom: 20rpx;
		text-align: center;
		margin-left: 50%;
		transform: translateX(-50%);
	}
	.makehlr_btn button{
		width: 375rpx;
		height: 95rpx;
		line-height: 95rpx;
		font-size: 32rpx;
		color: #fff;
		background: #23C1BB;
		border-radius: 60rpx;
		-webkit-align-self: center;
		align-self: center;
	}
	

</style>
