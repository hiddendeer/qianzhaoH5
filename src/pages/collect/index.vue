<template>
    <div class="h-[100vh] pt-[290rpx] bg-white">
        <fui-form ref="form" :show="false">
            <fui-form-item label="姓名" asterisk>
                <fui-input
                  v-model="formParam.full_name"
                  :borderBottom="false"
                  :padding="[0]"
                  class="fui-page__input"
                  placeholder="请输入（必填）"
                />
              </fui-form-item>
              <fui-form-item label="身份证" asterisk>
                <fui-input
                  v-model="formParam.cert_no"
                  :borderBottom="false"
                  :padding="[0]"
                  class="fui-page__input"
                  placeholder="请输入（已加密）"
                />
              </fui-form-item>
            <fui-form-item label="手机号" asterisk>
                <fui-input
                  v-model="formParam.phone"
                  :borderBottom="false"
                  :padding="[0]"
                  class="fui-page__input"
                  placeholder="请输入（必填）"
                />
              </fui-form-item>
              <fui-form-item label="">
                <fui-textarea v-model="formParam.address" height="150rpx" flexStart label="地址"
                  placeholder="请输入详细地址" :borderTop="false" :borderBottom="false" :padding="[0]"></fui-textarea>
              </fui-form-item>
      
      
            <fui-form-item>
              <fui-button @click="submit" radius="10px" height="35px"
                >提交</fui-button
              >
            </fui-form-item>
          </fui-form>
          <fui-toast ref="refToast"></fui-toast>
    </div>
</template>

<script setup>

import api from "./server/api.js";
import { ref } from "vue"

const form = ref(null)
const refToast = ref(null)

//校验规则
const rules = [
  {
    name: "full_name",
    rule: ["required"],
    msg: ["请填写姓名"],
  },
  {
    name: "cert_no",
    rule: ["required", "isIdCard"],
    msg: ["请填写身份证号码", "请填写正确身份证"],
  },
  {
    name: "phone",
    rule: ["required", "isMobile"],
    msg: ["请填写手机号", "请检查手机格式"],
  },
  {
    name: "address",
    rule: ["required"],
    msg: ["请填写地址"],
  },
];

const formParam = ref({
    full_name: "",
    cert_no: "",
    phone: "",
    address: "江苏省南京市"
})

const submit = () => {
  form.value.validator(formParam.value, rules).then(async (res) => {
    console.log(res);
    if (!res.isPassed) {
      refToast.value.show({ text: res.errorMsg });
      return;
    }

    const submitRes = await api.postOrder(formParam.value);
    if (submitRes.errorCode == "") {
      refToast.value.show({ text: '提交成功' });
      uni.redirectTo({
        url: '/pages/collect/success'
      });
    } else {
      refToast.value.show({ text: submitRes.errorMessage });
    }

  });
};

</script>