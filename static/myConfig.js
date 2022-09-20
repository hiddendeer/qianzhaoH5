// var host = "http://code.qztele.com/pub/home/";
// var getOrderList = "apiOrderList";

// function myRequest(api, data) {
// 	let result = '';
// 	uni.request({
// 		url: host + api,
// 		data: data,
// 		header: {
// 			'content-type':'application/json'
// 		},
// 		success: function(res){
// 			if (res.data.code == 0) {
// 				console.log('请求成功')
// 				console.log(res.data)
// 				result = res.data
				
// 			} else {
// 				uni.showToast({
// 					title: res.msg,
// 					duration:2000
// 				})
// 				result = "false"
// 			}
// 		}
// 	});
// 	resolve(result)
// }

// export default {
// 	myRequest,
// 	getOrderList
// }
// const BASE_URL = 'http://localhost:8082'
// 通过export向外暴露一个方法，方法名叫myRequest,调用myRequest方法时会向方法中传递一个对象options
// export const myRequest = 
// }