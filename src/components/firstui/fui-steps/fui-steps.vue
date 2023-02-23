<!--本文件由FirstUI授权予江苏伟岸纵横科技股份有限公司（手机号：1 3029 4 598     2  1，身份证尾号：290 6    70）专用，请尊重知识产权，勿私下传播，违者追究法律责任。-->
<template>
	<view class="fui-steps__wrap" :class="{'fui-steps__flex':direction==='row'}"
		:style="{paddingTop:padding[0] || 0,paddingRight:padding[1]||0,paddingBottom:padding[2] || padding[0]||0,paddingLeft:padding[3] || padding[1]||0,background:background}">
		<view class="fui-steps__node-wrap"
			:class="[direction==='column'?'fui-steps__flex-row':'fui-steps__flex-col',direction==='row'?'fui-steps__nw-col':'fui-steps__nw-row']"
			v-for="(item,index) in items" :key="index" @tap.stop="handleClick(index)">
			<view class="fui-steps__node-box"
				:class="[direction==='row'?'fui-steps__flex-row':'fui-steps__flex-col',direction==='row'?'':'fui-steps__node-weex']"
				:style="getStyles">
				<view class="fui-steps__line"
					:class="[direction==='row'?'fui-steps__line-row':'fui-steps__line-col',index<=current && index!==0 && !activeColor?'fui-steps__background':'']"
					:style="{background:index===0?'transparent':(index<=current?activeColor:nodeColor)}"
					v-if="direction==='row'"></view>
				<view class="fui-steps__node">
					<text class="fui-steps__node-text"
						:class="{'fui-steps__background':index<=current && !activeColor,'fui-steps__border':index<=current && !activeColor}"
						v-if="item.text && !(isMark && index==current)"
						:style="{background:index<=current?activeColor:'#fff',borderColor:index<=current?activeColor:nodeColor,color:index<=current?'#fff':color}">{{item.text}}</text>
					<view class="fui-steps__checkbox" :class="{'fui-steps__background':!activeColor}"
						:style="{background:activeColor}" v-if="isMark && index==current">
						<view class="fui-steps__checkmark"></view>
					</view>
					<view class="fui-steps__node-dot" :class="{'fui-steps__background':index<=current && !activeColor}"
						:style="{background:index<=current?activeColor:nodeColor}"
						v-if="!item.text && !item.src && !(isMark && index==current)">
					</view>
					<image :src="index<=current?(item.activeSrc || item.src):item.src" mode="widthFix"
						class="fui-steps__node-icon" v-if="!item.text && item.src && !(isMark && index==current)"
						:style="{borderRadius:radius || 0}"></image>
				</view>
				<view class="fui-steps__line"
					:class="[direction==='row'?'fui-steps__line-row':'fui-steps__line-col',index!==items.length-1 && !activeColor  && (index<current || (index==current && isWait && direction==='row'))?'fui-steps__background':'']"
					:style="{background:index===items.length-1?'transparent':((index<current) || (index==current && isWait && direction==='row')?activeColor:nodeColor)}">
				</view>
			</view>
			<view class="fui-steps__content"
				:class="[direction==='row'?'fui-steps__content-row':'fui-steps__content-col']"
				:style="{paddingBottom:index===items.length-1 || direction==='row'? '0rpx':'64rpx',paddingLeft:direction==='row'?'20rpx':(isNvue?`${height+24}rpx`:'24rpx')}">
				<text class="fui-steps__title"
					:class="{'fui-steps__text-row':direction==='row','fui-steps__color':index<=current && !activeColor}"
					v-if="item.title"
					:style="{color:index<=current?activeColor:color,fontSize:size+'rpx',fontWeight:fontWeight}">{{item.title}}</text>
				<text class="fui-steps__descr"
					:class="{'fui-steps__text-row':direction==='row','fui-steps__color':index<=current && !activeColor}"
					v-if="item.descr"
					:style="{color:index<=current?activeColor:descrColor,fontSize:descrSize+'rpx'}">{{item.descr}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "fui-steps",
		emits: ['click'],
		props: {
			items: {
				type: Array,
				default () {
					return []
				}
			},
			current: {
				type: [Number, String],
				default: 0
			},
			//row/column
			direction: {
				type: String,
				default: 'row'
			},
			padding: {
				type: Array,
				default () {
					return []
				}
			},
			background: {
				type: String,
				default: 'transparent'
			},
			height: {
				type: [Number, String],
				default: 50
			},
			nodeColor: {
				type: String,
				default: '#ccc'
			},
			color: {
				type: String,
				default: '#181818'
			},
			size: {
				type: [Number, String],
				default: 32
			},
			fontWeight: {
				type: [Number, String],
				default: 400
			},
			descrColor: {
				type: String,
				default: '#B2B2B2'
			},
			descrSize: {
				type: [Number, String],
				default: 24
			},
			// #ifdef APP-NVUE
			activeColor: {
				type: String,
				default: '#465CFF'
			},
			// #endif
			// #ifndef APP-NVUE
			activeColor: {
				type: String,
				default: ''
			},
			// #endif
			radius: {
				type: String,
				default: '0rpx'
			},
			//完成到当前步骤时是否需要对号标识
			isMark: {
				type: Boolean,
				default: true
			},
			isWait: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			getStyles() {
				let styles = `height:${this.height}rpx`;
				if (this.direction === 'column') {
					styles = `width:${this.height}rpx`;
				}
				return styles
			}
		},
		data() {
			let isNvue = false;
			// #ifdef APP-NVUE
			isNvue = true;
			// #endif
			return {
				isNvue
			}
		},
		methods: {
			handleClick(index) {
				this.$emit('click', {
					index: index,
					...this.items[index]
				})
			}
		}
	}
</script>

<style scoped>
	.fui-steps__wrap {
		/* #ifndef APP-NVUE */
		width: 100%;
		box-sizing: border-box;
		/* #endif */
		/* #ifdef APP-NVUE */
		flex: 1;
		/* #endif */
		flex-direction: column;
	}

	.fui-steps__flex {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		/* #ifdef APP-NVUE */
		align-items: flex-start !important;
		/* #endif */
	}

	.fui-steps__node-wrap {
		position: relative;
		/* #ifndef APP-NVUE */
		width: 100%;
		display: flex;
		/* #endif */
	}

	.fui-steps__nw-col {
		flex: 1;
	}

	.fui-steps__flex-row {
		flex-direction: row;
		/* #ifndef APP-NVUE */
		flex-shrink: 0;
		/* #endif */
	}

	.fui-steps__flex-col {
		flex-direction: column;
	}

	/* #ifdef APP-NVUE */
	.fui-steps__nw-row {
		align-items: flex-start;
	}

	/* #endif */

	.fui-steps__line {
		/* #ifndef APP-NVUE */
		transform-origin: center;
		/* #endif */
		flex: 1;
	}

	.fui-steps__line-row {
		/* #ifdef APP-NVUE */
		height: 0.5px;
		/* #endif */

		/* #ifndef APP-NVUE */
		height: 1px;
		transform: scaleY(.5) translateZ(0);
		/* #endif */

	}

	.fui-steps__line-col {
		/* #ifdef APP-NVUE */
		width: 0.5px;
		/* #endif */

		/* #ifndef APP-NVUE */
		width: 1px;
		transform: scaleX(.5) translateZ(0);
		/* #endif */
	}

	.fui-steps__node-box {
		/* #ifndef APP-NVUE */
		display: flex;
		flex-shrink: 0;
		/* #endif */
		align-items: center;
		overflow: hidden;
	}

	/* #ifdef APP-NVUE */
	.fui-steps__node-weex {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
	}

	/* #endif */

	.fui-steps__node {
		/* #ifndef APP-NVUE */
		display: flex;
		flex-shrink: 0;
		/* #endif */
		align-items: center;
		justify-content: center;
	}

	.fui-steps__node-text {
		/* #ifndef APP-NVUE */
		display: flex;
		box-sizing: border-box;
		border-radius: 50%;
		/* #endif */
		width: 44rpx;
		height: 44rpx;
		/* #ifdef APP-NVUE */
		border-radius: 24rpx;
		line-height: 44rpx;
		/* #endif */
		background-color: #fff;
		border-style: solid;
		border-width: 1rpx;
		font-size: 28rpx;
		align-items: center;
		justify-content: center;
		text-align: center;
		font-weight: normal;
		overflow: hidden;
	}

	.fui-steps__node-icon {
		width: 44rpx;
		height: 44rpx;
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
	}

	.fui-steps__node-dot {
		width: 9px;
		height: 9px;
		/* #ifndef APP-NVUE */
		border-radius: 50%;
		/* #endif */
		/* #ifdef APP-NVUE */
		border-radius: 9px;
		/* #endif */
		background-color: #ccc;
	}

	.fui-steps__content {
		/* #ifndef APP-NVUE */
		width: 100%;
		display: flex;
		box-sizing: border-box;
		/* #endif */
		flex: 1;
		flex-direction: column;
	}

	.fui-steps__content-row {
		/* #ifndef APP-NVUE */
		flex-shrink: 0;
		word-break: break-all;
		/* #endif */
		padding: 12rpx 20rpx 0;
		align-items: center;
		overflow: hidden;
	}

	.fui-steps__content-col {
		padding-left: 24rpx;
		padding-bottom: 64rpx;
	}

	.fui-steps__title,
	.fui-steps__descr {
		/* #ifndef APP-NVUE */
		display: block;
		word-break: break-all;
		/* #endif */
		padding-bottom: 8rpx;
		font-weight: normal;
	}

	.fui-steps__text-row {
		text-align: center;
	}

	.fui-steps__checkbox {
		width: 44rpx;
		height: 44rpx;
		/* #ifdef APP-NVUE */
		border-radius: 44rpx;
		/* #endif */
		/* #ifndef APP-NVUE */
		display: inline-flex;
		box-sizing: border-box;
		border-radius: 50%;
		vertical-align: top;
		flex-shrink: 0;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		position: relative;
	}

	.fui-steps__checkmark {
		width: 22rpx;
		height: 44rpx;
		border-bottom-style: solid;
		border-bottom-width: 3px;
		border-bottom-color: #FFFFFF;
		border-right-style: solid;
		border-right-width: 3px;
		border-right-color: #FFFFFF;
		transform: rotate(45deg) scale(0.5);
		/* #ifndef APP-NVUE */
		box-sizing: border-box;
		transform: rotate(45deg) scale(0.5) translateZ(0);
		/* #endif */
		/* #ifdef APP-NVUE */
		transform: rotate(45deg) scale(0.5);
		/* #endif */
		transform-origin: 54% 48%;
	}

	/* #ifndef APP-NVUE */
	.fui-steps__color {
		color: var(--fui-color-primary, #465CFF) !important;
	}

	.fui-steps__border {
		border-color: var(--fui-color-primary, #465CFF) !important;
	}

	.fui-steps__background {
		background: var(--fui-color-primary, #465CFF) !important;
	}

	/* #endif */
</style>