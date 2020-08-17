import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state={
	user_address:{
		province:'',
		city:'',
		district:''				
	}
}

const mutations={
	commit_address(state,data){
		state.user_address=data;
	}
}
export default new Vuex.Store({
	state:state,
	mutations:mutations
	
})
export const store =  new Vuex.Store({
	state:{
		wokerItems:{}
		
	}, 
	mutations:{
		//改变属性的状态
		setWokerItems(state,data){
			state.wokerItems = data
		}
	}, 
	getters:{
		//获取属性的状态
	},
	actions:{
		//应用mutations
	}
})