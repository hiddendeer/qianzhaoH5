<template>
    <div class="h-[100vh] bg-[#e9e9eb]">
        <div v-for="item in 10" class="base-coupons relative top-[100px] left-[100rpx] my-[10rpx]">
            <div class="absolute top-[70rpx] left-[50rpx] font-bold text-[#f76260] !tracking-[6rpx]">6折</div>
            <div class="absolute top-[30rpx] left-[200rpx]">名称：乾昭充值优惠券</div>
            <div class="absolute top-[90rpx] left-[200rpx]">日期：本次生效</div>
            <div class="absolute bottom-[10rpx] right-[10rpx] w-[200rpx]">
                <fui-button class="!m-auto" type="warning"
                    background="linear-gradient(to right, #38f9d7  0%, #43e97b 100%)" :bold="true" radius="5px"
                    size="25" width="100%" height="25px">
                    立即支付</fui-button>
            </div>
        </div>

    </div>
</template>

<script setup>
import commonApi from '../../api/commonApi.js';
import { ref, onMounted } from "vue";



</script>

<style lang="scss" scoped>

.base-coupons {
    width: 600rpx;
    height: 200rpx;
    position: relative;
    filter: drop-shadow(0px 0px 3px rgba(0, 0, 0, .2));
    background: radial-gradient(circle at right top, transparent 6px, #fff 0) top left/30% 50% no-repeat, radial-gradient(circle at right bottom, transparent 6px, #fff 0) bottom left/90px 52% no-repeat, radial-gradient(circle at left top, transparent 6px, #fff 0) top right/209px 51% no-repeat, radial-gradient(circle at left bottom, transparent 6px, #fff 0) bottom right/209px 51% no-repeat;
    border-radius: 4px;
}

.base-coupons::before {
    content: '';
    height: 80px;
    border: 1px dashed #fff;
    position: absolute;
    left: 178rpx;
    top: 0;
    bottom: 0;
    margin: auto;
}
</style>
