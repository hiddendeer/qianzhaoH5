<!--本文件由FirstUI授权予江苏伟岸纵横科技股份有限公司（手机号：13 0  29  45    98 21，身份证尾号：290  6 7  0）专用，请尊重知识产权，勿私下传播，违者追究法律责任。-->
<template>
	<view class="fui-backtop__wrap"
		:style="{width:width+'rpx',height:width+'rpx',borderRadius:isNvue?width+'rpx':'50%' ,bottom: bottom + 'rpx', right: right + 'rpx',background:background }"
		v-if="isShow && visible" @tap.stop="goBacktop">
		<fui-icon :name="name" :size="52" :color="color" v-if="!custom"></fui-icon>
		<slot></slot>
	</view>
</template>

<script>
	//非easycom模式取消注释引入字体组件，按实际路径进行调整
	// import fuiIcon from "@/components/firstui/fui-icon/fui-icon.vue"
	export default {
		name: "fui-backtop",
		emits: ['click'],
		// components:{
		// 	fuiIcon
		// },
		props: {
			scrollTop: {
				type: [Number, String]
			},
			targetRef: {
				type: String,
				default: ''
			},
			threshold: {
				type: [Number, String],
				default: 320
			},
			width: {
				type: [Number, String],
				default: 80
			},
			bottom: {
				type: [Number, String],
				default: 160
			},
			right: {
				type: [Number, String],
				default: 40
			},
			background: {
				type: String,
				default: '#FFFFFF'
			},
			name: {
				type: String,
				default: 'top'
			},
			color: {
				type: String,
				default: '#333333'
			},
			custom: {
				type: Boolean,
				default: false
			}
		},
		watch: {
			scrollTop(newValue, oldValue) {
				this.scrollChange();
			}
		},
		data() {
			let isNvue = false;
			// #ifdef APP-NVUE
			isNvue = true;
			// #endif
			return {
				isNvue: isNvue,
				isShow: false,
				visible: true
			};
		},
		methods: {
			goBacktop: function() {
				// #ifndef APP-NVUE
				//防止fixed元素先消失再显示
				this.visible = false;
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 120
				});
				setTimeout(() => {
					this.visible = true;
				}, 220);
				// #endif

				// #ifdef APP-NVUE
				if (this.targetRef) {
					dom.scrollToElement(this.targetRef, {});
				}
				// #endif
				this.$emit('click', {})
			},
			scrollChange() {
				let show = this.scrollTop > this.threshold;
				if ((show && this.isShow) || (!show && !this.isShow)) return;
				this.isShow = show;
			}
		}
	}
</script>

<style scoped>
	.fui-backtop__wrap {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		position: fixed;
		z-index: 888;
		box-shadow: 0 0 6px rgb(0 0 0 / 12%);
		justify-content: center;
		align-items: center;
		/* #ifdef H5 */
		cursor: pointer;
		/* #endif */
	}
</style>