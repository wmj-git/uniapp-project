<template>
	<view>
		<view class="demo" :style="'height:' +  demo.height + 'px;' + 'padding-top:' + demo.top + 'px;padding-bottom:10rpx'">
			<view class="left" :style="'top:' + demo.top + 'px'">
				<view class="iconfont icon-zuo" @tap='backleft'></view>
			</view>
			<view class="clr_fff">服务项目</view>
		</view>
		<view class="pd_t123">
			<view class="pd30">	
				<view class="serveritem">
					<view class="uni-form-item uni-column">
						<picker @change="bindPickerChange" :range="serverItem">	
							<label class="label_tit">服务项目：</label>
							<label class="chekd">{{serverItem[index]}}</label>		
						</picker>
					</view>
					<view class="date_btn">
						<label class="label_tit">服务时间：</label>
						<text class="chekd" type="button" @click="onShowDatePicker('date')">{{data}}</text>
						<mx-date-picker :show="showPicker" :type="type" :value="value" :show-tips="true" :begin-text="'服务项目'" :end-text="'服务项目'" :show-seconds="true" @confirm="onSelected" @cancel="onSelected" />
					</view>
					<view class="form_btn">
						<button type="default" class="receive_btn" @tap="addServer">保存</button>
					</view>
				</view>
				
			</view>
		</view>
		
		
	</view>
</template>

<script>
	import MxDatePicker from "../../components/mx-datepicker/mx-datepicker.vue";
	import app from "../../App.vue"
	export default {
		name: 'serverItem',
		components: {
			MxDatePicker
		},
		onLoad: function (option) {
			this.appointment_id =option.appointment_id
			this.serverItems();
		},
		data() {
			return {
				mid:'',
				demo: {
					top: 0,
					height: 0
				},
				showPicker:false,//时间状态
				data:'请选择',//时间
				type:'rangetime',//时间插件类型
				value:'',//时间插件
				serverItem:['请选择',],
				servers:[],
				index:0,
				jg:'',
				item_idItem:['0',],
				item_id:"",
				appointment_id:""
			}
		},
		created () {
			const demo = uni.getMenuButtonBoundingClientRect()
			this.demo.top = demo.top
			this.demo.height = demo.height
			if(app.globalData.mid==undefined){
				this.mid = uni.getStorageSync('mid');
			}else{
				this.mid = app.globalData.mid;
			}	
		},
		methods: {
			backleft(e){
			  	uni.navigateBack();
			},
			bindPickerChange: function(e) {	
	
				this.index = e.target.value			
				this.jg=this.serverItem[this.index]	
				this.item_id=this.item_idItem[this.index]	
			},
			onShowDatePicker(type){
				this.type = type;
				this.showPicker = true;
				this.value = this[type];				
			},
			onSelected(e){
				this.showPicker = false;
				if(e){
					this[this.type] = e.value;
					//console.log('value=>'+e.value);
					this.data =e.value.replace(/\//g,"-");									
				}
			},
			async serverItems(){
				const res = await this.$myRequset({
					url:"/api",
					method:"POST",
					data:{
						operate:"ServiceItem.index",
						mid:this.mid
					}					
				})
				var serverItem= res.data.data.list
				
				serverItem.forEach((item,index)=>{
					this.serverItem.push(item.name);
					this.item_idItem.push(item.id)
				});
			
				
			},
			addServer(e){
				if(this.jg!="请选择"&&this.data!="请选择"){
					this.addServerAPI();
				}else{
					
					uni.showToast({
						title:"请选择",
						icon: "none"
					})
					
				}
				
				
			},
			async addServerAPI(){
				const res = await this.$myRequset({
					url: '/api',
					method: "POST",
					data: {
						operate: 'ServiceItem.add_log',
						mid: this.mid,
						item_id: this.item_id,
						day: this.data,
						appointment_id:this.appointment_id
					},
					header: {
						'content-type': 'application/form'
					}
				});
				if(res.data.code == 1){
					uni.showToast({
						title:"保存成功",
						icon: "none"
					})
					
					var appointment_id = this.appointment_id
					uni.navigateTo({
						url:"../serverItemList/serverItemList?appointment_id"+appointment_id
					});
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
	.pd_t123{
		padding-top: 123rpx;
	}
	.pd30{
		padding: 30rpx;
	}
	.serveritem{
		background: #fff;
		margin: 0 auto;
		padding: 30rpx;
		border-radius: 20rpx;
		.date_btn{
			display: flex;
			padding-top: 30rpx;
			padding-bottom: 30rpx;
		}
	}
	.label_tit{
		font-weight: 600;
		font-size: 28rpx;
	}
	.chekd{
		font-size: 28rpx;
		color: #a8a8a8;
	}
	.form_btn {
		width: 80%;
		text-align: center;
		margin: 40rpx auto;
	
		.receive_btn {
			height: 80rpx;
			border-radius: 40rpx;
			color: white;
			line-height: 80rpx;
			background: linear-gradient(to right, #63cce7, #66ebdf);
			box-shadow: 0 8rpx 26rpx 0 #2fcece;
		}
	
		.receive_btn::after {
			border: none;
		}
	}
</style>
