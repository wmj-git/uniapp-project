<template>
	<view>
		<view class="demo" :style="'height:' +  demo.height + 'px;' + 'padding-top:' + demo.top + 'px;padding-bottom:10rpx'">
		    <view class="left" :style="'top:' + demo.top + 'px'">
		        <view class="iconfont icon-zuo" @tap='backleft'></view>
		    </view>
		    <view class="clr_fff">护工选择</view>
		</view>
		
		<view class="pt123">
			<view :class="[isEmpty_list ? 'show' : 'hide' ]" class="order_img">
				<image src="https://test134.vrapp.chot.cn/mini/picture/withdrawal.png" mode="widthFix"></image>
				<view class="hgText">没有护工可以选哦~</view>
			</view>
			
			
			<view class="workerModule">
				<view class="lists">
					<scroll-view scroll-y="true" class="listItems scroll-Y">
						<radio-group @change="radioChange">
							
							<label class="uni-flex listItem" v-for="(item, index) in items" :key="item.id">
								
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
					<button @tap="nurseList_ok"> 选择被护理人 </button>					
				</view>
				
				
				
				
				
			</view>
			
		</view>

		
		
	</view>
	
	
</template>

<script>
	export default {
		name: "Specs",
		data () {
			return {
				demo: {
					top: 0,
					height: 0
				},
				isEmpty_list:false, //护工选择列表为空的时候
				items: [],				
				nurse_id:"",
				rule:"",
				start_time:"",
				token:"",
				from_mid:""
			}
		},	
		created () {
			const demo = uni.getMenuButtonBoundingClientRect()
			this.demo.top = demo.top
			this.demo.height = demo.height
		},
		computed:{
			// items(){
			// 	//在vuex中获取数据
			// 	return this.$store.state.wokerItems
			// }
		},
		onLoad: function (option) { 
			
			var goods_spec = option.goods_spec
			var goods_id =option.goods_id				
			this.rule = option.rule;
			this.start_time = option.start_time;
			this.token = option.token;
			this.from_mid = option.from_mid;
	
			if(goods_spec.indexOf("初")!==-1){
				var level =1;
				this.makeListAPI(goods_id,level);
			}else if(goods_spec.indexOf("中")!==-1){
				var level =2;
				this.makeListAPI(goods_id,level);
			}else if(goods_spec.indexOf("高")!==-1){
				var level =3;
				this.makeListAPI(goods_id,level);
			}
			
		},
		methods:{
			makeTap(index,item){
				console.log(item.id)
				var nurse_id = item.id
				
				uni.navigateTo({
					url: "../../pages/specsDetail/specsDetail?nurse_id="+nurse_id
				});
			},
			backleft(e){
			  	uni.navigateBack();
			},
			nurseList_ok(){
				
				if(this.nurse_id==""){
					uni.showToast({ 
						title: '请选择护工', 
						duration: 2000 ,
						icon: "none"
						})		
				}else{
					var nurse_id = this.nurse_id
					var rule =this.rule
					var start_time = this.start_time
					var token = this.token
					var from_mid = this.from_mid
					
					uni.navigateTo({
						url: "../../pages/makeNurseList/makeNurseList?nurse_id="+nurse_id+"&rule="+rule+"&start_time="+start_time+"&token="+token+"&from_mid="+from_mid
					});	
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
				console.log(res.data.data.list);
				if(res.data.data.list.length==0){
					uni.showToast({ 
						title: '没有护工可以选择', 
						duration: 2000,
						icon: "none"
					})		
					this.isEmpty_list=true
					
				}else{
					//this.$store.commit("setWokerItems",res.data.data.list)
					this.items =res.data.data.list
					
					
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
	.hgText{
		text-align: center;
		color: #999999;
		padding-top: 20rpx;
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
	.order_img {
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
	
		image {
			width: 150rpx;
			height: 150rpx;
			padding: 80rpx 80rpx 20rpx;
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
		width: 400rpx;
		height: 95rpx;
		line-height: 95rpx;
		font-size: 36rpx;
		color: #fff;
		background: #23C1BB;
		border-radius: 60rpx;
		-webkit-align-self: center;
		align-self: center;
	}
	

</style>
