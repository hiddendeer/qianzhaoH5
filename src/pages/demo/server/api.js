import http from '@/utils/network.js'

export default class api {
    static login (data) {
      return http.request({
        url: '/api/tvrjet-gov-system-app/loginApi',
        method: 'POST',
        data: data
      })
    }
  }