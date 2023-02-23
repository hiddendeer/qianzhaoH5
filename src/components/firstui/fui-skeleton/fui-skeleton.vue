<!--本文件由FirstUI授权予江苏伟岸纵横科技股份有限公司（手机号：   1  3  0294 598 2 1，身份证尾号：2 9   0 670）专用，请尊重知识产权，勿私下传播，违者追究法律责任。-->
<template>
	<view class="fui-skeleton__wrap " :style="{background:background,height:height+'px'}">
		<view class="fui-skeleton__item"
			:class="{'fui-skeleton__dark':theme==='dark','fui-skeleton__dark-ani':active && theme==='dark','fui-skeleton__light-ani':active && theme!=='dark'}"
			:style="{width: item.width+'px', height:item.height+'px', left: item.left+'px', top: item.top+'px',borderRadius:item.type==='round'?(isNvue?item.width/2+'px':'50%'):'6rpx'}"
			v-for="(item,index) in elList" :key="index">
		</view>
	</view>
</template>

<script>
	// #ifdef APP-NVUE
	// const dom = uni.requireNativePlugin('dom');
	// #endif
	export default {
		name: "fui-skeleton",
		emits: ['change'],
		props: {
			//外层元素class值
			outerClass: {
				type: String,
				default: "fui-skeleton"
			},
			//需要在骨架元素添加以下class值，也可传入自定义class值
			//需要做骨架的元素class值，包含round表示处理成圆形，其他为矩形
			selector: {
				type: Array,
				default () {
					return ['fui-round', 'fui-rect']
				}
			},
			//骨架屏背景色
			background: {
				type: String,
				default: "transparent"
			},
			//骨架屏预载数据，如果传入数据则不动态获取节点信息
			preloadList: {
				type: Array,
				default () {
					return []
				}
			},
			//是否展示动画效果
			active: {
				type: Boolean,
				default: true
			},
			//light、dark
			theme: {
				type: String,
				default: 'light'
			}
		},
		data() {
			let isNvue = false
			// #ifdef APP-NVUE
			isNvue = true
			// #endif
			return {
				isNvue: isNvue,
				//round、rect
				elList: [],
				height: 0
			};
		},
		created() {
			const res = uni.getSystemInfoSync();
			this.height = res.windowHeight;
			if (this.preloadList && this.preloadList.length > 0) {
				this.elList = this.preloadList
			}
		},
		mounted() {
			// #ifndef APP-NVUE
			this.$nextTick(() => {
				this.nodesRef(this.outerClass).then((res) => {
					if (res && res[0]) {
						this.height = res[0].height
					}
				});
				if (!this.preloadList || this.preloadList.length === 0) {
					this.selectorQuery()
				}
			})
			// #endif
		},
		methods: {
			// #ifndef APP-NVUE
			//nvue端暂不支持动态获取节点信息
			async selectorQuery() {
				let selector = this.selector || []
				let nodes = []
				for (let item of selector) {
					await this.nodesRef(item).then((res) => {
						res.map(d => {
							d.type = item.indexOf('round') === -1 ? 'rect' : 'round';
						})
						nodes = nodes.concat(res)
					})
				}
				this.elList = nodes
				this.$emit('change', {
					nodes: nodes
				})
			},
			async nodesRef(name) {
				return await new Promise((resolve, reject) => {
					uni.createSelectorQuery()
						.selectAll(`.${name}`)
						.boundingClientRect((res) => {
							if (res) {
								resolve(res);
							} else {
								reject(res)
							}
						}).exec();
				})
			}
			// #endif
		}
	}
</script>

<style scoped>
	.fui-skeleton__wrap {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		/* #ifndef APP-NVUE */
		width: 100%;
		z-index: 900;
		/* #endif */
	}

	.fui-skeleton__item {
		position: absolute;
		background: #eee;
	}

	.fui-skeleton__dark {
		background: #333;
	}

	/* #ifndef APP-NVUE */
	.fui-skeleton__light-ani {
		background: linear-gradient(90deg, #eee 25%, #e6e6e6 37%, #eee 63%);
		animation: ani 1.4s ease infinite;
		background-size: 400% 100%;
	}

	.fui-skeleton__dark-ani {
		background: linear-gradient(90deg, #333 25%, #555 37%, #333 63%);
		animation: ani 1.4s ease infinite;
		background-size: 400% 100%;
	}

	@keyframes ani {
		0% {
			background-position: 100% 50%
		}

		100% {
			background-position: 0 50%
		}
	}

	/* #endif */
</style>