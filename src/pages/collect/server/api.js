import http from '@/utils/network.js'

export default class api {
    static postOrder (data) {
      return http.request({
        url: '/api/broadband/postOrder',
        method: 'POST',
        data: data
      })
    }
}