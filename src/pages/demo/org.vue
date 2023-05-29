<template>
  <div>
    <fui-search-bar background="#efefef" radius="36" searchColor="#FFB703"></fui-search-bar>
    <div class="overflow-y-hidden relative h-[70rpx] p-[20rpx] scollContent">
      <div class="
            whitespace-nowrap
            absolute
            overflow-y-scroll
            h-[50rpx]
          ">
        测试1-测试2-测试3-测试1-测试2-测试3-测试1-测试2-测试3-测试1-测试2-测试3-测试1-测试2-测试3
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
onMounted(() => {
  uni.getLocation({
	type: 'gcj02',
	success: function (res) {
    console.log(res);
		console.log('当前位置的经度：' + res.longitude);
		console.log('当前位置的纬度：' + res.latitude);
	}
});
})
</script>

<style lang="scss" scoped>
.scollContent::-webkit-scrollbar {
  display: none;
}
</style>