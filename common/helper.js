import config from "../static/data/config.js"
// const HOST="http://code.qztele.com/pub/home/";
const now = Date.now || function () {  
    return new Date().getTime();  
};  

const myRequest = (options)=>{  
	let myUrl = '';
	let perfixUrl = '/pub/home/'
	
	// 长于25 则认为传入的的 是链接，否则传入的是 通用接口
	if(false){
		myUrl = options.url
	}else{
		myUrl = config.host + options.url;
	}
	
	// console.log(myUrl)
	
    return new Promise((resolve,reject)=>{  
		// 在回调函数中处理异步请求
        uni.request({
			url: myUrl, 
			method: options.method || 'GET', 
			data: options.data || {}, 
			header: {
				'content-type':'application/json'
			},
            success: function (res){ 
                if(res.data.errorCode != '' ){
					if(options.url != 'getHistory'){
						return uni.showToast({
							icon:'none',
						    title: res.data.errorMessage,
							duration:2000
						})
					}
                }
				 //如果请求成功，调用resolve返回数据
				 // console.log(JSON.stringify(res))
                resolve(res) 
            },
            fail: (err)=>{ 
                uni.showToast({ 
					icon:'none',
                    title: '请求接口失败！',
					duration:2000
                })
                reject(err)
            }
        })
    })
}

const getUrlKey = (name,url)=>{
　　return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(url) || [, ""])[1].replace(/\+/g, '%20')) || null
}

const getAllUrlKey = (url)=> {
    // let url = url.toString();
    let arrObj = url.split("?");
    let params = Object.create(null) 
    if (arrObj.length > 1) {
        arrObj = arrObj[1].split("&");
        arrObj.forEach(item => {
            item = item.split("=");
            params[item[0]] = item[1]
        })
    }
    return params;
}

export default{
	// HOST,
	now,
	myRequest,
	getUrlKey,
	getAllUrlKey
}