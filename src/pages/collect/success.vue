<template>
    <div>
        <fui-result type="success" title="提交成功" descr="">

            <fui-button @click="backGo" width="400rpx" height="84rpx" text="再次提交" type="gray" color="#09BE4F" bold></fui-button>
        </fui-result>
    </div>
</template>

<script setup>
import {ref} from "vue";

const backGo = () => {
    uni.redirectTo({
	url: '/pages/index/index'
});
}

</script>