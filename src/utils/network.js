import http from '@/components/firstui/fui-request'

//初始化请求配置项
http.create({
    //接口域名
    host: '',
    header: {
        // 'content-type': 'application/x-www-form-urlencoded'
    }
})

//请求拦截
http.interceptors.request.use(config => {
    //请求之前可在请求头中加入token等信息
    let token = uni.getStorageSync('token') || '';
    if (token) {
        config.header = {
            'Authorization': 'JWT ' + localStorage.getItem('TOKEN')
        }
    }
    
    return config
})

//响应拦截
http.interceptors.response.use(response => {
    //TODO
    if (response.statusCode == '200') {
        return response.data;
    }
})

export default http
