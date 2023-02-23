<template>
  <div class="content">
    <div class="pt-[35vh] overflow-y-hidden">
      <div class="w-[80%] m-auto">
        <fui-input v-model="phoneValue" :modelValue="phoneValue" placeholder="请输入手机号" placeholder-style="color:#ccc;"
          color="#fda085" :inputBorder="true" :padding="['16rpx', '28rpx']">
          <template v-slot:left>
            <view class="pr-[15rpx]">
              <fui-icon name="mobile" :size="48"></fui-icon>
            </view>
          </template>
        </fui-input>
        <div class="mt-[50rpx]">
          <fui-button class="!m-auto" type="warning" background="linear-gradient(120deg, #f6d365 0%, #fda085 100%)"
            @click="_clickCheck" radius="10px" width="95%" height="35px">
            立即参与</fui-button>
        </div>
      </div>
    </div>
  </div>
  <fui-toast ref="toastRef"></fui-toast>
  <fui-dialog :show="show" :content="content" title="提示" maskClosable @click="onClick" @close="onClose"></fui-dialog>
</template>

<script setup>
import wx from "weixin-js-sdk";
import commonApi from "../../api/commonApi.js";
import api from "./server/api.js";
import { ref, onMounted } from "vue";
import { onLoad } from "@dcloudio/uni-app";

const phoneValue = ref("");
const toastRef = ref(null);
const show = ref(false);
const content = ref('该手机号非乾昭用户，请跳转至平台注册。');

onMounted(() => {
  getConfig();
  if (!uni.getStorageSync("openid")) {
    const getCode = getURLParameters(location.href);
    getOpenid(getCode?.code);
  }
});

const getConfig = async () => {
  const res = await api.getJsapiTicketSign();
  if (res.errorCode == "") {
    wx.config({
      // debug: true, // 开启调试模式,调用的所有 api 的返回值会在客户端 alert 出来，若要查看传入的参数，可以在 pc 端打开，参数信息会通过 log 打出，仅在 pc 端时才会打印。
      appId: res?.data?.appId, // 必填，公众号的唯一标识
      timestamp: res?.data?.timestamp, // 必填，生成签名的时间戳
      nonceStr: res?.data?.nonceStr, // 必填，生成签名的随机串
      signature: res?.data?.signature, // 必填，签名
      jsApiList: ["chooseWXPay"], // 必填，需要使用的 JS 接口列表
    });
  }
};

const getOpenid = async (code) => {
  const res = await api.getOpenid({ code });
  if (res.errorCode == "") {
    uni.setStorageSync("openid", res.data);
  }
};



// 校验
const _clickCheck = async () => {
  if (!/^(?:13\d|14\d|15\d|16\d|17\d|18\d|19\d)\d{5}(\d{3}|\*{3})$/.test(phoneValue.value)) {
    toastRef.value.show({ text: "请输入正确的手机号" });
    return;
  }
  const res = await api.checkPhoneChannel({
    oepnid: uni.getStorageSync("openid"),
    phone: phoneValue.value
  });
  if (res.errorCode == '') {
    uni.navigateTo({
      url: "/pages/pay/curettage?phone=" + phoneValue.value + "&openid=" + uni.getStorageSync("openid"),
    });
  } else {
    show.value = true;
  }
};

const getURLParameters = (url) =>
  (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(
    (a, v) => (
      (a[v.slice(0, v.indexOf("="))] = v.slice(v.indexOf("=") + 1)), a
    ),
    {}
  );

const onClick = (e) => {
  if (e.index == `1`) {
    window.location.href = `http://pc.qztele.com/h5/#/`;
  } else {
    show.value = false;
  }
}
const onClose = () => {
  show.value = false;
}
</script>

<style lang="scss" scoped>
.content {
  position: relative;
  height: 100vh;
  background-image: url('https://qztele-1251945399.cos.ap-nanjing.myqcloud.com/qztele/%E9%AA%8C%E8%AF%81%E9%9D%A2.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;

  .content-child {
    bottom: 180rpx;
    right: 50rpx;
  }
}

:deep(.fui-input__border::after) {
  border: 1px solid var(--fui-color-border, #b3b3b3);
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
