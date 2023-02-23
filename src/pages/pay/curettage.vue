<template>
  <div class="content">
    <div class="w-[300rpx] absolute content-child">
      <div class="flex justify-center">
        <vue-eraser ref="eraserRef" :size="12" :coverSrc="imgUrl" :result-text="resText" :complete-ratio="0.6"
          :complete-function="completeFunction" :progress-function="progressFunction"></vue-eraser>
      </div>
      <div class="pt-[10rpx] text-center text-26rpx font-bold text-[#FFB703]">
        剩余{{ num }}次数
      </div>
      <div class="flex pt-[10rpx]">
        <fui-button class="!m-auto" @click="_clickReset" radius="5px" width="120rpx" height="50rpx" size="18">
          再来一次</fui-button>
        <fui-button class="!m-auto" @click="_clickCheck" radius="5px" background="#2a9d8f" width="120rpx" height="50rpx"
          size="18">
          去充值
        </fui-button>
      </div>
    </div>
  </div>
  <fui-toast ref="toastRef"></fui-toast>
  <fui-modal :buttons="[]" width="600" :show="show">
    <fui-icon name="checkbox-fill" :size="108" color="#09BE4F"></fui-icon>
    <text class="fui-title">恭喜刮出{{ discount }}折券</text>
    <text class="fui-descr">可通过充值选择优惠券。</text>
    <fui-button text="我知道了" width="240rpx" height="72rpx" :size="28" radius="36rpx" background="#FFB703" borderWidth="0"
      :margin="['0', '0', '24rpx']" @click="onCancel">
    </fui-button>
    <view class="fui-icon__close" @tap="onCancel">
      <fui-icon name="close" color="#B2B2B2" :size="48"></fui-icon>
    </view>
  </fui-modal>
  <fui-bottom-popup :show="showPopup" @close="closePopup">
    <view class="fui-scroll__wrap">
      <view class="fui-title">优惠券</view>
      <scroll-view scroll-y class="fui-scroll__view">
        <div class="p-[40rpx] text-26rpx">
          <div class="flex py-[20rpx]">
            <div class="font-bold">号码</div>
            <div class="pl-[20rpx] text-[#6831FF] font-bold">{{ phone }}</div>
          </div>
          <div class="flex">
            <div class="font-bold flex items-center">套餐</div>
            <div class="pl-[20rpx]">
              <fui-data-tag v-model:modelValue="currentTC" :height="50" :options="options" @change="changeMoney"
                activeColor="#FFB703" borderColor="#FFB703" mark markColor="#FFB703"></fui-data-tag>
            </div>
          </div>
          <div class="relative">
            <div class="mt-[50rpx]">
              <div v-for="item in couponList" @click="changeRadio({ value: item.uuid })"
                class="w-[90%] min-h-[200rpx] mt-[20rpx] base-filter rounded-[8rpx] flex">
                <div class="flex-[1] flex items-center">
                  <div class="text-[#f76260] font-bold flex justify-around w-[80%]">
                    <fui-radio color="#FFB703" :scaleRatio="0.8" :value="item.uuid" :checked="item.uuid == selectRadio"
                      @change="changeRadio"></fui-radio><span class="text-30rpx font-bold">{{ item.discount }} 折</span>
                  </div>
                </div>
                <div class="flex-[2] font-bold mt-[50rpx]">
                  <div><span class="text-#666666">折扣金额：</span> {{ item.calcMoney || 0 }} 元</div>
                  <div class="mt-[10rpx]">
                    <span class="text-#666666">使用状态：</span>
                    <span v-if="item.used" class="text-#f59e0b">已使用</span>
                    <span v-else class="text-#84cc16">未使用</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
        <div class="absolute bottom-0 flex justify-around h-[100rpx] w-full borderClass">
          <div class="pt-[20rpx] w-full">
            <div class="text-32rpx text-[#ef4444] font-bold flex justify-around">
              <span class="">付款: {{ payMoney }} 元</span>
              <div class="w-[180rpx]"> <fui-button @click="postRechargeOrder" class="!m-auto" type="warning"
                  background="#07C160" :bold="true" radius="5px" size="25" width="100%" height="60rpx">
                  立即支付</fui-button></div>
            </div>

          </div>
        </div>
      </scroll-view>
      <view class="fui-icon__close" @tap="closePopup">
        <fui-icon name="close" :size="48"></fui-icon>
      </view>
    </view>
  </fui-bottom-popup>
</template> 

<script setup>
import wx from "weixin-js-sdk";
import vueEraser from "@/components/workComponents/vue-eraser.vue";
import imgUrl from "@/assets/image/scratch/s_top.png";
import api from "./server/api.js";
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";

const toastRef = ref(null);
const eraserRef = ref(null);
const flag = ref(true); // 限制多次请求
const resText = ref("");
const isAgain = ref(false); //是否还有一次机会
const num = ref(10);
const discount = ref(10); // 折扣
const show = ref(false);
const showPopup = ref(false);

const currentTC = ref(50);

const options = [
  { text: "50元", value: 50 },
  { text: "100元", value: 100 },
];

const openid = ref("");
const phone = ref("");
const checked1 = ref(true);
const checked2 = ref(false);
const selectRadio = ref("");
const payMoney = ref(0);
const couponList = ref([]); // 优惠券列表

onLoad((e) => {
  phone.value = e.phone;
  if (e.openid) {
    openid.value = e.openid;
  }
  getPhoneCouponTimes();
  getPhoneCoupon();
});

// 提交支付
const postRechargeOrder = async () => {
  const findObj = couponList.value.find(item => item.uuid == selectRadio.value);
  if (!findObj) {
    toastRef.value.show({ text: "无法支付，参数错误！" });
    return;
  }
  const payRes = await api.postRechargeOrder({
    openid: uni.getStorageSync("openid"),
    phone: findObj.phone,
    money: currentTC.value,
    pay_money: 0.01,
    coupon_id: findObj.uuid,
  });
  if (payRes.errorCode == "") {
    console.log(payRes?.data);
    wx.chooseWXPay({
      timestamp: payRes?.data?.timeStamp, // 支付签名时间戳，注意微信 jssdk 中的所有使用 timestamp 字段均为小写。但最新版的支付后台生成签名使用的 timeStamp 字段名需大写其中的 S 字符
      nonceStr: payRes?.data?.nonceStr, // 支付签名随机串，不长于 32 位
      package: payRes?.data?.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
      signType: payRes?.data?.signType, // 微信支付V3的传入 RSA ,微信支付V2的传入格式与V2统一下单的签名格式保持一致
      paySign: payRes?.data?.paySign, // 支付签名
      success: function (res) {
        console.log(res, '支付成功回调');
        toastRef.value.show({ text: "支付成功" });
        setTimeout(() => {
          showPopup.value = false;
          getPhoneCouponTimes();
          getPhoneCoupon();
          // 支付成功后的回调函数
        }, 1500)

      },
    });
  } else {
    toastRef.value.show({ text: payRes.errorMessage });
  }
};

const getPhoneCoupon = async () => {
  const res = await api.getPhoneCoupon({
    openid: openid.value,
    phone: phone.value,
  });
  if (res.errorCode == '') {
    let list = []
    res.data.forEach(item => {
      if (!item.used) {
        item.calcMoney = currentTC.value * item.discount / 10;
        list.push(item)
      }
    })
    couponList.value = list;

    if (couponList.value.length > 0) {
      selectRadio.value = couponList.value?.[0]?.uuid;
      payMoney.value = couponList.value?.[0]?.calcMoney;
    }
  }
};

const changeRadio = (e) => {
  selectRadio.value = e.value;
};

const getPhoneCouponTimes = async () => {
  const res = await api.getPhoneCouponTimes({
    openid: "oxTpk6uPC-MyF1CrPu4GWModxPjU",
    phone: phone.value,
  });
  if (res.errorCode == "") {
    num.value = res.data.remaining_times;
  }
  console.log(res);
};

const _clickCheck = () => {
  showPopup.value = true;
};
const closePopup = () => {
  showPopup.value = false;
};

const completeFunction = async (e) => {
  console.log("complete");
  if (num.value == 0) {
    resText.value = "";
    toastRef.value.show({ text: "您的次数用完了" });
    eraserRef.value.clear();
    return false;
  }
  if (num.value > 0) {
    const res = await api.genPhoneCoupon({
      openid: "oxTpk6uPC-MyF1CrPu4GWModxPjU",
      phone: phone.value,
    });
    if (res.errorCode == "") {
      show.value = true;
      isAgain.value = true;
      discount.value = res.data.discount;
      resText.value = discount.value + "折优惠";
      num.value--;
    } else {
      resText.value = "没有了";
      toastRef.value.show({ text: res.errorMessage });
    }
  }
};
const progressFunction = async (ratio) => {
  if (num.value == 0) {
    resText.value = "";
    toastRef.value.show({ text: "您的次数用完了" });
    eraserRef.value.clear();
    return false;
  }
  if (ratio > 0.009) {
    if (flag.value) {
      flag.value = false;
      console.log("过程");
    }
  }
};

const _clickReset = () => {
  eraserRef.value.reset();
};

const onCancel = () => {
  show.value = false;
};
const changeMoney = (e) => {
  currentTC.value = e.detail.value;
  couponList.value.forEach(item => {
    item.calcMoney = e.detail.value * item.discount / 10;
  })
};
</script>

<style lang="scss" scoped>
.content {
  position: relative;
  height: 100vh;
  background-image: url('https://qztele-1251945399.cos.ap-nanjing.myqcloud.com/qztele/%E5%88%AE%E5%88%AE%E4%B9%90.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;

  .content-child {
    bottom: 180rpx;
    right: 50rpx;
  }
}

.fui-title {
  font-size: 32rpx;
  padding-top: 24rpx;
}

.fui-descr {
  font-size: 24rpx;
  color: #b2b2b2;
  padding-top: 12rpx;
  padding-bottom: 48rpx;
}

.fui-icon__close {
  position: absolute;
  right: 24rpx;
  top: 20rpx;
}

.fui-scroll__wrap {
  padding-top: 30rpx;
  position: relative;
}

.fui-title {
  font-size: 30rpx;
  font-weight: bold;
  text-align: center;
  padding-bottom: 24rpx;
}

.fui-icon__close {
  position: absolute;
  top: 24rpx;
  left: 24rpx;
}

.fui-scroll__view {
  width: 100%;
  height: 800rpx;
}

.base-filter {
  border: 1px solid #d0d7de;
  filter: drop-shadow(0px 0px 3px rgba(0, 0, 0, 0.1));
}

.borderClass {
  border-top: 1px solid #d0d7de;
}

.base-coupons {
  width: 600rpx;
  height: 200rpx;
  position: relative;
  filter: drop-shadow(0px 0px 3px rgba(0, 0, 0, 0.2));
  background: radial-gradient(circle at right top, transparent 6px, #fff 0) top left/30% 50% no-repeat,
    radial-gradient(circle at right bottom, transparent 6px, #fff 0) bottom left/90px 52% no-repeat,
    radial-gradient(circle at left top, transparent 6px, #fff 0) top right/209px 51% no-repeat,
    radial-gradient(circle at left bottom, transparent 6px, #fff 0) bottom right/209px 51% no-repeat;
  border-radius: 4px;
}

.base-coupons::before {
  content: "";
  height: 80px;
  border: 1px dashed #fff;
  position: absolute;
  left: 178rpx;
  top: 0;
  bottom: 0;
  margin: auto;
}
</style>