import http from '@/utils/network.js'

export default class commonApi {
    static login (data) {
      return http.request({
        url: '/api/tvrjet-gov-system-app/loginApi',
        method: 'POST',
        data: data
      })
    }
    static getPhone (params) {
      return http.request({
        url: '/api/numbers',
        method: 'GET',
        data: params
      })
    }
    static getPlans (params) {
      return http.request({
        url: '/api/plans',
        method: 'GET',
        data: params
      })
    }
    static postCbOrder (data) {
      return http.request({
        // url: '/api/orders/postCbOrder',
        url: '/api/orders/postOrderV2',
        method: 'POST',
        data
      })
    }
    static getOpenid (data) {
      return http.request({
        url: '/api/getOpenid',
        method: 'get',
        data
      })
    }
    static queryOrder (data) {
      return http.request({
        url: '/api/orders/queryOrder',
        method: 'get',
        data
      })
    }
  }