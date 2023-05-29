<template>
  <!-- <div class="header-img"><img style="width: 100%;height: 100%;" :src="headerImg" /></div>
  <div class="header-bg">
    <img style="width: 100%;height: 100%;" :src="backgroundImg" />
  </div> -->
  <div :class="{'system-width': ['windows','mac'].includes(systemType)}">
    <!-- <div class="header-bg">
      <img style="width: 100%;height: 100%;" :src="backgroundImg" />
    </div> -->
    <div class="imgUrl">
      <!-- <div style="padding: 5px">
        <img src="@/assets/image/logo.png" style="width:100px;height: 100px;" alt="">
      </div> -->
      <div style="padding-top: 80px;">
      <!-- <div style="padding: 5px; text-align: center"><fui-text type="danger" fontWeight="bold"
          :text="(`当前套餐：` + currentPlans.name)" :size="28"></fui-text></div> -->
      <fui-swiper-dot :current="current" :items="plansArray"  @click="dotClick" :styles="{width: 35,height: 25}" >
        <swiper previous-margin="60rpx" next-margin="60rpx" class="fui-banner__box" :class="{'banner-h': ['windows','mac'].includes(systemType)}" @change="changeSwiper" circular
          :indicator-dots="false" :interval="5000" :duration="150">
          <swiper-item v-for="(item, index) in plansArray" :key="index">
            <div class="fui-banner__cell" :class="{ 'fui-item__scale': current !== index }">
              <img  :src="item.des_picture" style="height: 100%;width: 100%;border-radius: 15px;">
            </div>
          </swiper-item>
        </swiper>
      </fui-swiper-dot>
      <div style=" text-align: center"><fui-text type="danger" fontWeight="bold"
          :text="(`当前套餐：` + currentPlans.name)" :size="30"></fui-text></div>

      <!-- 表单内容 -->
      <div style="
        width: 100%;
        height: 100%;
        margin-top: 15px;
        display: flex;
        justify-content: center;
      ">
        <div class="form-content" :class="{'form-content-system': ['windows','mac'].includes(systemType)}">
          <div style="background-color: #fff; min-height: 230px; border-radius: 20px">
            <div style="padding: 10px">
              <fui-form ref="form" :show="false">
                <fui-form-item label="归属地" arrow highlight @click="openAreaPicker">
                  <fui-input v-model="formParam.vest" :textRight="true" placeholder="请选择归属地"
                    placeholder-style="color:#ccc;" disabled :borderBottom="false" :padding="[0]" />
                </fui-form-item>
                  <uni-data-picker ref="refPicker" v-model="selectValue" v-show="showPicker" placeholder="请选择地区" popup-title="请选择所在地区"
    :localdata="cityData" @popupclosed="handleClose" @nodeclick="onnodeclick" @change="changePicker"></uni-data-picker>

                <fui-form-item label="选择号码" arrow highlight>
                  <fui-input v-model="formParam.number" color="red" :textRight="true" :borderBottom="false"
                    :padding="[0]" class="fui-page__input" placeholder="请选择" disabled @click="openPopup" />
                </fui-form-item>

                <fui-form-item label="">
                  <!-- <fui-textarea v-model="formParam.postAddress" :borderTop="false" :borderBottom="false" :padding="[0]"
                    class="fui-page__input" placeholder="请输入详细地址"></fui-textarea> -->
                  <fui-textarea v-model="formParam.postAddress" height="150rpx" flexStart label="收货地址"
                    placeholder="请输入详细地址" :borderTop="false" :borderBottom="false" :padding="[0]"></fui-textarea>
                </fui-form-item>
                <div v-if="formParam.postAddress != '' && formParam.address != '' && formParam.number != ''">
                  <fui-form-item label="客户姓名">
                    <fui-input v-model="formParam.postName" :borderBottom="false" :padding="[0]" class="fui-page__input"
                      placeholder="请输入（已加密）" />
                  </fui-form-item>
                  <fui-form-item label="联系电话">
                    <fui-input v-model="formParam.postNumber" :borderBottom="false" :padding="[0]"
                      class="fui-page__input" placeholder="请输入（已加密）" />
                  </fui-form-item>
                  <fui-form-item label="身份证号">
                    <fui-input v-model="formParam.certId" :borderBottom="false" :padding="[0]" class="fui-page__input"
                      placeholder="请输入（已加密）" />
                  </fui-form-item>
                </div>
                <fui-form-item>
                  <!-- <fui-button @click="submit" background="linear-gradient(300deg, #6831FF 0%, #465CFF 100%)"
                    radius="10px" height="35px">确认提交</fui-button> -->
                    <!-- background="#6c6c6c" -->
                  <fui-button @click="submit" 
                    radius="10px" height="35px">确认提交</fui-button>
                </fui-form-item>
 
              </fui-form>
            </div>
          </div>
        </div>
      </div>
      </div>

    </div>
    <div class="bottom-img_content">
      <!-- <img src="https://qztele-1251945399.cos.ap-nanjing.myqcloud.com/qztele/%E7%BD%91%E7%AB%99%E5%BA%95%E9%83%A8%E8%AF%A6%E6%83%85%E9%A1%B5%E5%9B%BE.png" style="width: 100%;height: 100%;" alt=""> -->
      <!-- <img src="https://qztele-1251945399.cos.ap-nanjing.myqcloud.com/qztele/%E4%BB%8B%E7%BB%8D%E5%9B%BE%20.png" style="width: 100%;height: 100%;" alt=""> -->
      <img src="https://qztele-1251945399.cos.ap-nanjing.myqcloud.com/qztele/%E6%B0%B4%E5%A2%A8%E9%95%BF%E5%9B%BE%E4%BF%AE%E6%94%B9-01-01.png" style="width: 100%;height: 100%;" alt="">
    </div>
  </div>
  <!-- <uni-data-picker ref="refPicker" v-model="selectValue" v-show="showPicker" placeholder="请选择地区" popup-title="请选择所在地区"
    :localdata="cityData" @popupclosed="handleClose" @nodeclick="onnodeclick" @change="changePicker"></uni-data-picker> -->
  <fui-bottom-popup :show="showPopup" @close="closePopup" :style="[{'width': ['windows','mac'].includes(systemType) ? '50%':'100%' },{'margin': 'auto'}]">

    <div class="fui-scroll__wrap">
      <div class="fui-title">
        <div class="fui-icon__close" @click="closePopup">
          <fui-icon name="close" :size="48"></fui-icon>
        </div>
        选择
      </div>
      <scroll-view scroll-y class="fui-scroll__view" :class="{'scroll-system': ['windows','mac'].includes(systemType)}">
        <div style="width: 100%; display: flex; justify-content: center">
          <fui-button @click="getPhone" background="linear-gradient(300deg, #6831FF 0%, #465CFF 100%)" radius="10px"
            width="65%" height="35px">
            <fui-icon name="search" color="#fff" :size="32"></fui-icon><span style="padding-left: 5px">换一批</span>
          </fui-button>
        </div>
        <div>
          <fui-input label="" v-model="phoneArr.searchValue" radius="20" :size="30" :labelSize="30" placeholder="关键字搜索">
            <template v-slot:left>
              <view class="fui-left__icon" style="padding-right: 5px;">
                <fui-icon name="search" color="#333" :size="35"></fui-icon>
              </view>
            </template>
            <fui-button type="gray" @click="triggerSearch" bold width="200rpx" height="30px" :size="28" text="点击搜索">
            </fui-button>
          </fui-input>
        </div>
        <fui-list-cell v-for="(item, index) in numArray" :key="index">
          <div style="margin-left: 30px" @click="selectPhone(item)">
            <div style="display: flex">
              <div style="font-size: 20px; font-weight: bold; color: #000000">
                {{ item }}
              </div>
              <div style="position: absolute; right: 20px">
                <fui-tag text="点击领取" type="warning" :scaleRatio="1" theme="light"></fui-tag>
              </div>
            </div>
            <div style="display: flex; justify-content: space-between">
              <div style="
                  text-decoration: line-through;
                  font-size: 16px;
                  color: #b3b3b3;
                ">
                ¥99
              </div>
              <fui-text text="免费领取" type="warning" :size="16"></fui-text>
              <!-- <div style="color: #fa9e0a;font-size: 16px;">免费领取</div> -->
            </div>
          </div>
        </fui-list-cell>
      </scroll-view>

    </div>
  </fui-bottom-popup>
  <fui-toast ref="refToast"></fui-toast>
  <div class="absolute top-[10px] right-[-8px]">
    <fui-tag text="查询订单" @click="viewOrder" radius="40"></fui-tag>
  </div>
</template>

<script setup>
import backgroundImg from "@/assets/image/backgroundImg.jpg"
import cityJson from "@/assets/json/citys.json";
import commonApi from "@/api/commonApi.js";
import { onLoad } from '@dcloudio/uni-app'
import { onMounted, ref } from "vue";
const refPicker = ref(null);
const form = ref(null);
const refToast = ref(null);
const showPicker = ref(false);
const showPopup = ref(false);
const showDetail = ref(false);
const selectValue = ref(1); // 组件级问题-必须存在默认值。
const cityData = ref([]);

const systemType = ref(uni.getSystemInfoSync().platform)
console.log(systemType);

// 查询手机号
const phoneArr = ref({
  provinceCode: "34",
  cityCode: "340",
  goodsId: "342206271905",
  qryType: "02",
  searchCategory: "1",
  amounts: 10,
  searchValue: "",
});

const numArray = ref([]);
const plansArray = ref([]);
const currentPlans = ref({})
const promoter = ref('')

onLoad((option) => {
  promoter.value = option.pid;
})

onMounted(async () => {
  cityData.value = cityJson;
  getPlans();
  getPhone();
});

const options = cityJson;
const formData = ref({});
const current = ref(0);
const postAddress = ref('');

const formParam = ref({
  vest: '',
  provinceCode: "",
  cityCode: "",
  postProvinceCode: "",
  postCityCode: "",
  postDistrictCode: "",
  number: "",
  postAddress: "",
  postName: "",
  certId: "",
  postNumber: "",
  promoter:''
});


//校验规则
const rules = [
  {
    name: "cityCode",
    rule: ["required"],
    msg: ["请选择归属地"],
  },
  {
    name: "number",
    rule: ["required"],
    msg: ["请选择号码"],
  },
  {
    name: "postAddress",
    rule: ["required"],
    msg: ["请填写收货地址"],
  },
  {
    name: "postName",
    rule: ["required"],
    msg: ["请填写姓名"],
  },
  {
    name: "postNumber",
    rule: ["required", "isMobile"],
    msg: ["请填写联系电话", "请检查手机格式"],
  },
  {
    name: "certId",
    rule: ["required", "isIdCard"],
    msg: ["请填写身份证号码", "请填写正确身份证"],
  },
];

const items = ref([
  // {
  //   background: "#09BE4F",
  // },
  // // {
  // //   background: "#FFB703",
  // // },
  // // {
  // //   background: "#B2B2B2",
  // // },
]);

const submit = () => {
  formParam.value.promoter = promoter.value;
  form.value.validator(formParam.value, rules).then(async (res) => {
    console.log(res);
    if (!res.isPassed) {

      refToast.value.show({ text: res.errorMsg });
      return;
    }
    formParam.value.certName = formParam.value.postName;
    formParam.value.goodsId = currentPlans.value.goods_id;
    formParam.value.postAddress = postAddress.value + formParam.value.postAddress;

    const submitRes = await commonApi.postCbOrder(formParam.value);
    if (submitRes.errorCode == "") {
      refToast.value.show({ text: '提交成功' });
      uni.redirectTo({
        url: '/pages/index/success?pid='+promoter.value
      });
    } else {
      refToast.value.show({ text: submitRes.errorMessage });
    }

  });
};

const changeSwiper = (e) => {
  current.value = e.detail.current;
  currentPlans.value = plansArray.value?.[e.detail.current]
}

const getPlans = async () => {
  const res = await commonApi.getPlans();
  if (res.errorCode !== "") {
    refToast.value.show({ text: res.errorMessage });
    plansArray.value = []
    return;
  }
  plansArray.value = res.data;

  items.value = res.data;

  currentPlans.value = plansArray.value?.[0]
}

// 获取手机号列表
const getPhone = async () => {
  const res = await commonApi.getPhone(phoneArr.value);
  if (res.errorCode !== "") {
    refToast.value.show({ text: res.errorMessage });
    numArray.value = []
    return;
  }
  // formParam.value.mobile = res.data.numArray?.[0];
  numArray.value = res.data.numArray;
};

// 打开选择弹窗
const openAreaPicker = () => {
  showPicker.value = true;
  refPicker.value.show();
};

const change = (e) => {
  current.value = e.detail.current;
};
const openPopup = () => {
  showPopup.value = true;
};

const dotClick = (e) => {
  current.value = e.index;
  currentPlans.value = plansArray.value?.[e.index]
  plansArray.value.splice(e.index,1)
  plansArray.value.unshift(currentPlans.value)


}

const triggerSearch = () => {
  getPhone();
}
const selectPhone = (row) => {
  formParam.value.number = row;
  showPopup.value = false;
}

// 更新全称地址
const changePicker = (e) => {
  formParam.value.postDistrictCode = e.detail.value?.[2]?.value;
  formParam.value.vest =  e.detail.value?.[0]?.text +
    "/" +
    e.detail.value?.[1]?.text +
    "/" +
    e.detail.value?.[2]?.text;
    postAddress.value =
    e.detail.value?.[0]?.text +
    "/" +
    e.detail.value?.[1]?.text +
    "/" +
    e.detail.value?.[2]?.text;
};

// 选中的节点
const onnodeclick = (node) => {
  if (node?.postCode) {
    if (node?.parent_value) {
      formParam.value.cityCode = node.value;
      formParam.value.postCityCode = node.postCode;
    } else {
      formParam.value.provinceCode = node.value;
      formParam.value.postProvinceCode = node.postCode;
    }
    console.log(formParam);
  }
};

const handleClose = () => {
  showPicker.value = false;
};
const closePopup = () => {
  showPopup.value = false;
};
const viewOrder = () => {
  uni.navigateTo({
        url: '/pages/order/index'
      })

}
</script>

<style lang="scss" scoped>
.pop-system {
  width: 50%;
  margin: auto;
}
.banner-h {
  height: 150rpx !important;
}
.system-width {
  width: 50%;
  margin: auto;
}
.fui-banner__box {
  height: 200px;
}

.bottom-img_content {
  // padding: 10px 0px;
}

.header-img {
  position: absolute;
  z-index: 0;
  height: 280px;
  width: 100%
}

.header-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.imgUrl {
  background-image: url('https://qztele-1251945399.cos.ap-nanjing.myqcloud.com/qztele/%E4%B8%8A%E5%BA%95%E5%9B%BE-01.png');
  //background-image: url('https://qztele-1251945399.cos.ap-nanjing.myqcloud.com/qztele/%E9%A1%B6%E5%9B%BE.jpg');
  background-repeat: no-repeat;
  // background-size: auto 100%;
  background-size: 100% 100%;
}

.form-content {
  width: 90%;
  height: 100%;
  // background-color: rgb(47,52,145);
  background-color: #3333;
  border-radius: 20px;
  padding: 10px;
  // background-image: url('@/assets/image/backgroundImg.jpg');
}
.form-content-system {
  width: 78% !important;
  border-radius: 8px;
}

:deep(.fui-bottom__popup-show) {
  height: 60vh;
}

.fui-banner__cell {
  width: 100%;
  height: 100%;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 34rpx;
  border-radius: 20px;
  font-weight: 600;
  transition: transform 0.1s linear;
}

.fui-item__scale {
  transform: scale3d(0.9, 0.9, 1);
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
  display: block;
  width: 100%;
  height: 600px;
}

.scroll-system {
  height: 200px;
}
</style>

