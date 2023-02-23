<!--本文件由FirstUI授权予江苏伟岸纵横科技股份有限公司（手机号：13 0294 59   8 2    1，身份证尾号：  29 06 7 0）专用，请尊重知识产权，勿私下传播，违者追究法律责任。-->
<template>
	<view>
		<slot></slot>
	</view>
</template>

<script>
	export default {
		name: "fui-swipeaction-group",
		data() {
			return {};
		},
		created() {
			this.children = [];
		},
		methods: {
			reset() {
				// wxs 会自己计算组件大小，所以无需执行下面代码
				// #ifndef APP-VUE || H5 || MP-WEIXIN
				this.children.forEach(child => {
					child.init()
				})
				// #endif
			},
			close() {
				this.children.forEach(child => {
					// #ifdef APP-VUE || H5 || MP-WEIXIN
					child.isShow = false;
					// #endif

					// #ifndef APP-VUE || H5 || MP-WEIXIN
					child.close()
					// #endif
				})
			},
			closeAuto(child) {
				// #ifndef APP-VUE || H5 || MP-WEIXIN
				if (this.openItem && this.openItem !== child) {
					this.openItem.close()
				}
				this.openItem = child
				// #endif

				// #ifdef APP-VUE || H5 || MP-WEIXIN
				this.children.forEach(item => {
					if (item !== child) {
						item.isShow = false;
					}
				})
				// #endif
			}
		}
	}
</script>

<style scoped></style>