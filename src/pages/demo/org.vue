<template>
  <div>
    <fui-search-bar
      background="#efefef"
      radius="36"
      searchColor="#FFB703"
    ></fui-search-bar>
    <div class="overflow-y-hidden relative h-[70rpx] p-[20rpx] scollContent">
      <div
        class="
          whitespace-nowrap
          absolute
          overflow-y-scroll
          h-[50rpx]
        "
      >
        测试1-测试2-测试3-测试1-测试2-测试3-测试1-测试2-测试3-测试1-测试2-测试3-测试1-测试2-测试3
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.scollContent::-webkit-scrollbar {
  display: none;
}
</style>