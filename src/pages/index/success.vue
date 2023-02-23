<template>
    <div>
        <fui-result type="success" title="预约成功" descr="我们将尽快安排人员与您联系，请保持电话畅通，再次感谢您的预约。">

            <fui-button @click="backGo" width="400rpx" height="84rpx" text="再次申请" type="gray" color="#09BE4F" bold></fui-button>
        </fui-result>
    </div>
</template>

<script setup>
import {ref} from "vue";
import { onLoad } from '@dcloudio/uni-app'
const pid = ref('')
onLoad((option) => {
    pid.value = option.pid;
})

const backGo = () => {
    uni.redirectTo({
	url: '/pages/index/index?pid='+pid.value
});
}

</script>