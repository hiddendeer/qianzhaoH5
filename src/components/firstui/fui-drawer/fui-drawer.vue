<!--本文件由FirstUI授权予江苏伟岸纵横科技股份有限公司（手机号： 13  0   2 945 98 2 1，身份证尾号：2 9 0 6 7 0）专用，请尊重知识产权，勿私下传播，违者追究法律责任。-->
<template>
	<view class="fui-drawer__popup-wrap" :class="{'fui-drawer__wrap-show':show}"
		:style="{ zIndex: zIndex,background:maskBackground,alignItems:direction==='left'?'flex-start':'flex-end' }"
		@tap.stop="handleClose" @touchmove.stop.prevent="stop" v-if="isShow || !isNvue" ref="fui_dwr_mk_ani">
		<view ref="fui_dwr_ani" class="fui-drawer__popup" :class="['fui-drawer_'+direction,show?'fui-drawer__show':'']"
			:style="{background: background,borderTopLeftRadius:(direction==='right'? radius:0)+'rpx',borderBottomLeftRadius:(direction==='right'? radius:0)+'rpx',borderTopRightRadius:(direction==='left'? radius:0)+'rpx',borderBottomRightRadius:(direction==='left'? radius:0)+'rpx'}"
			@tap.stop="stop($event,true)">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	// #ifdef APP-NVUE
	const animation = uni.requireNativePlugin('animation');
	// #endif
	/*顶部状态栏部分可使用fui-status-bar组件占位*/
	export default {
		name: 'fui-drawer',
		emits: ['close'],
		props: {
			show: {
				type: Boolean,
				default: false
			},
			//left/right
			direction: {
				type: String,
				default: 'right'
			},
			//背景颜色
			background: {
				type: String,
				default: '#fff'
			},
			zIndex: {
				type: [Number, String],
				default: 996
			},
			//点击遮罩 是否可关闭
			maskClosable: {
				type: Boolean,
				default: true
			},
			maskBackground: {
				type: String,
				default: 'rgba(0,0,0,.6)'
			},
			//圆角值，左侧打开时为右侧圆角，右侧打开时为左侧圆角
			radius: {
				type: [Number, String],
				default: 0
			}
		},
		data() {
			let isNvue = false;
			// #ifdef APP-NVUE
			isNvue = true;
			// #endif
			return {
				isNvue: isNvue,
				isShow: false
			}
		},
		// #ifdef APP-NVUE
		watch: {
			show: {
				handler(newVal) {
					if (newVal) {
						this.open();
					} else {
						this.close();
					}
				},
				immediate: true
			}
		},
		// #endif
		methods: {
			handleClose(e) {
				if (!this.maskClosable) return;
				this.$emit('close', {});
			},
			// #ifdef APP-NVUE
			open() {
				this.isShow = true;
				this.$nextTick(() => {
					setTimeout(() => {
						this._animation(true);
					}, 50);
				})
			},
			close() {
				this._animation(false);
			},
			_animation(type) {
				if (!this.$refs['fui_dwr_ani'] || !this.$refs['fui_dwr_mk_ani']) return;
				animation.transition(
					this.$refs['fui_dwr_mk_ani'].ref, {
						styles: {
							opacity: type ? 1 : 0
						},
						duration: 250,
						timingFunction: 'ease-in-out',
						needLayout: false,
						delay: 0 //ms
					},
					() => {
						if (!type) {
							this.isShow = false
						}
					}
				);
				let translateX = this.direction === 'left' ? '-100%' : '100%'
				animation.transition(
					this.$refs['fui_dwr_ani'].ref, {
						styles: {
							transform: `translateX(${type ? '0' : translateX})`
						},
						duration: 250,
						timingFunction: 'ease-in-out',
						needLayout: false,
						delay: 0 //ms
					},
					() => {}
				);
			},
			// #endif
			stop(e, tap) {
				// #ifdef APP-NVUE
				tap && e.stopPropagation();
				// #endif
			}
		}
	};
</script>

<style scoped>
	.fui-drawer__popup-wrap {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		z-index: 1001;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		/* #ifndef APP-NVUE */
		transition: all ease-in-out .3s;
		visibility: hidden;
		/* #endif */
		opacity: 0;
		overflow: hidden;
	}


	/* #ifndef APP-NVUE */
	.fui-drawer__wrap-show {
		opacity: 1;
		visibility: visible;
	}

	/* #endif */
	.fui-drawer__popup {
		/* #ifndef APP-NVUE */
		height: 100%;
		transition: all 0.3s ease-in-out;
		min-width: 40rpx;
		display: flex;
		/* #endif */
		flex: 1;
		flex-direction: column;
		overflow: hidden;
	}

	.fui-drawer_left {
		/* #ifndef APP-NVUE */
		transform: translate3d(-100%, 0, 0);
		/* #endif */
		/* #ifdef APP-NVUE */
		transform: translateX(-100%);
		/* #endif */
	}

	.fui-drawer_right {
		/* #ifndef APP-NVUE */
		transform: translate3d(100%, 0, 0);
		/* #endif */
		/* #ifdef APP-NVUE */
		transform: translateX(100%);
		/* #endif */
	}

	/* #ifndef APP-NVUE */
	.fui-drawer__show {
		transform: translate3d(0, 0, 0);
	}

	/* #endif */
</style>