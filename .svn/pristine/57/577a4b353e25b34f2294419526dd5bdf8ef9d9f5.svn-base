function updateUserInfo(phone,token) {
       uni.request({
            url:'https://test134.vrapp.chot.cn/api' ,//服务器端地址
            data: {
				operate:"MemberCenter.update",
				token:token,						 	
                phone:phone
             },
             method: 'POST',
             header: {
                'content-type': 'application/json'
            },
             success: (res) => {
				console.log("向后台更新信息");
				console.log(res);
            }
        });
            

			
}
module.exports = {
	updateUserInfo: updateUserInfo,
}
