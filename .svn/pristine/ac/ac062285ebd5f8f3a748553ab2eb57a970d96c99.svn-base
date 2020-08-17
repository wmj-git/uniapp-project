const BASE_URL = 'https://test134.vrapp.chot.cn'
import app from "../App.vue"
export const myRequset = (options) =>{
	return new Promise((resolve,reject)=>{
		uni.request({
			url:BASE_URL+options.url,
			method:options.method || 'GET',
			data:options.data || {},
			success: (res) => {
				if(res.data.code !==1){
					if(res.data.code==4002){
						console.log(res.data.code)
						
					}
					var info = res.data.info
					return uni.showToast({
						title:info,
						icon: "none"
					})
					
				}
				resolve(res)
			},fail: (err) => {
				uni.showToast({
					title:'请求接口失败',
					icon: "none"
				})
				reject(err)
			}
		})
	})
	
}

