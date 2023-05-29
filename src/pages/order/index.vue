<template>
  <div class="p-[15px] overflow-y-hidden">
    <fui-form ref="form" :show="false">
      <fui-form-item label="身份证">
        <fui-input
          v-model="formParam.certId"
          :borderBottom="false"
          :padding="[0]"
          class="fui-page__input"
          placeholder="请输入"
        />
      </fui-form-item>
      <fui-form-item label="手机号">
        <fui-input
          v-model="formParam.postNumber"
          :borderBottom="false"
          :padding="[0]"
          class="fui-page__input"
          placeholder="请输入"
        />
      </fui-form-item>

      <fui-form-item>
        <fui-button @click="submit" radius="10px" height="35px"
          >查询</fui-button
        >
      </fui-form-item>
    </fui-form>
  </div>
  <div class="px-[15px]">
    <scroll-view class="scroll-Y" :scroll-y="true">
      <div class="card1" v-for="item in orderData">
        <div class="card2">
          <div class="card3">
            <div
              style="
                padding-bottom: 10px;
                display: flex;
                justify-content: space-between;
              "
            >
              <span style="color: #969799">客户姓名</span>
              <span class="title">{{ item.post_name }}</span>
            </div>
            <div
              style="
                padding-bottom: 10px;
                display: flex;
                justify-content: space-between;
              "
            >
              <span style="color: #969799">订单状态</span>
              <span
                ><fui-tag round type="success" theme="light" :scaleRatio="0.9">
                  <span v-if="item.status == `暂无消息`">已下单</span>
                  <span v-else>{{ item.status }}</span>
                </fui-tag></span
              >
            </div>
            <div
              style="
                padding-bottom: 10px;
                display: flex;
                justify-content: space-between;
              "
            >
              <span style="color: #969799">套餐</span>
              <span>{{ item.plan_name }}</span>
            </div>
            <div style="display: flex; justify-content: space-between">
              <div style="color: #969799">选购号码</div>
              <div>{{ item.number }}</div>
            </div>
            <div style="display: flex; justify-content: space-between">
              <div style="color: #969799">地址</div>
              <div>{{ item.post_address }}</div>
            </div>
          </div>
        </div>
      </div>
    </scroll-view>
    <fui-button @click="handleClick" radius="10px" height="35px"
      >联系客服</fui-button
    >
  </div>
  <fui-toast ref="refToast"></fui-toast>
</template>

<script setup>
import commonApi from "../../api/commonApi.js";
import { ref } from "vue";

const form = ref(null);
const refToast = ref(null);
const isLeft = ref(false);
const fabs = ref([]);

const orderData = ref([]);

const formParam = ref({
  certId: "320623199508193038",
  postNumber: "15366197000",
});

// 跳转到客服中心
const handleClick = () => {
  window.location.href = "https://work.weixin.qq.com/kfid/kfccb5d6fd1f79de943";
};

//校验规则
const rules = [
  {
    name: "certId",
    rule: ["required", "isIdCard"],
    msg: ["请填写身份证号码", "请填写正确身份证"],
  },
  {
    name: "postNumber",
    rule: ["required", "isMobile"],
    msg: ["请填写联系电话", "请检查手机格式"],
  },
];

const submit = () => {
  form.value.validator(formParam.value, rules).then(async (res) => {
    if (!res.isPassed) {
      refToast.value.show({ text: res.errorMsg });
      return;
    }

    const orderRes = await commonApi.queryOrder(formParam.value);
    if (orderRes.errorCode == "") {
      if (orderRes?.data.length == 0) {
        refToast.value.show({ text: "暂无订单信息" });
        return;
      }
      orderData.value = orderRes?.data;
    }
  });
};
</script>

<style lang="scss" scoped>
.scroll-Y {
  height: calc(100vh - 240px);
}

.card1 {
  box-sizing: border-box;
  // height: 100%;
  padding: 12px;

  .card2 {
    padding: 15px;
    background-color: #fff;
    border-radius: 10px;

    .card3 {
      position: relative;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      width: 100%;
      // padding: var(--van-cell-vertical-padding) var(--van-cell-horizontal-padding);
      overflow: hidden;
      color: #323233;
      font-size: 14px;
      line-height: 24px;
      background: #fff;
    }
  }
}
</style>