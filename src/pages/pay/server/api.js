import http from '@/utils/network.js'

export default class api {
    static checkPhoneChannel (data) {
      return http.request({
        url: '/api/recharge/checkPhoneChannel',
        method: 'get',
        data: data
      })
    }
    static getPhoneCouponTimes (data) {
      return http.request({
        url: '/api/recharge/getPhoneCouponTimes',
        method: 'get',
        data: data
      })
    }
    static genPhoneCoupon (data) {
      return http.request({
        url: '/api/recharge/genPhoneCoupon',
        method: 'get',
        data: data
      })
    }
    static getPhoneCoupon (data) {
      return http.request({
        url: '/api/recharge/getPhoneCoupon',
        method: 'get',
        data: data
      })
    }
    static getJsapiTicketSign (data) {
      return http.request({
        url: '/api/getJsapiTicketSign',
        method: 'get',
        data: data
      })
    }
    static getOpenid (data) {
      return http.request({
        url: '/api/getOpenid',
        method: 'get',
        data
      })
    }
    static postRechargeOrder (data) {
      return http.request({
        url: '/api/recharge/postRechargeOrder',
        method: 'post',
        data
      })
    }
    static cancelPayRechargeOrder (data) {
      return http.request({
        url: '/api/recharge/cancelPayRechargeOrder',
        method: 'post',
        data
      })
    }
  }