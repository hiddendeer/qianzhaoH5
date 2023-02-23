<!--本文件由FirstUI授权予江苏伟岸纵横科技股份有限公司（手机号：  1  30 294  598   21，身份证尾号：2  9067   0）专用，请尊重知识产权，勿私下传播，违者追究法律责任。-->
<template>
	<view class="fui-load__ani" :class="{'fui-load__ani-fixed':isFixed}">
		<!-- #ifndef APP-NVUE -->
		<view class="fui-load__ani-1" v-if="type==1">
			<view class="fui-load__ani-a" :class="{'fui-load__ani-bg':!color || color==='true'}"
				:style="{background:color}"></view>
			<view class="fui-ani__ani-b" :class="{'fui-load__ani-bg':!color || color==='true'}"
				:style="{background:color}"></view>
			<view :class="{'fui-load__ani-bg':!color || color==='true'}" :style="{background:color}"></view>
		</view>

		<view class="fui-load__ani-2" v-if="type==2">
			<view class="fui-load__ani-line fui-load__ani-c" :class="{'fui-load__ani-bg':!color || color==='true'}"
				:style="{background:color}"></view>
			<view class="fui-load__ani-line fui-load__ani-d" :class="{'fui-load__ani-bg':!color || color==='true'}"
				:style="{background:color}"></view>
			<view class="fui-load__ani-line fui-load__ani-e" :class="{'fui-load__ani-bg':!color || color==='true'}"
				:style="{background:color}"></view>
		</view>

		<view class="fui-load__ani-3" :class="{'fui-load__ani-border':!color || color==='true'}"
			:style="{'border-left-color':color,'border-right-color':color}" v-if="type==3">
		</view>

		<view class="fui-load__ani-4" :class="{'fui-load__ani-bcolor':!color || color==='true'}"
			:style="{borderColor:color}" v-if="type==4">
			<view class="fui-load__ani-f" :class="{'fui-load__ani-bg':!color || color==='true'}"
				:style="{background:color}"></view>
		</view>

		<view class="fui-load__ani-5" :class="{'fui-load__ani-bg':!color || color==='true'}" :style="{background:color}"
			v-if="type==5">
			<view class="fui-load__ani-g" :class="{'fui-load__ani-bg':!color || color==='true'}"
				:style="{background:color}"></view>
			<view class="fui-load__ani-h" :class="{'fui-load__ani-bg':!color || color==='true'}"
				:style="{background:color}"></view>
		</view>
		<!-- #endif -->

		<!-- #ifdef APP-NVUE -->
		<loading-indicator :animating="true"></loading-indicator>
		<!-- #endif -->
	</view>
</template>

<script>
	export default {
		name: "fui-load-ani",
		props: {
			//loading 类型：1~5
			type: {
				type: [Number, String],
				default: 1
			},
			//loading颜色
			color: {
				type: String,
				default: ''
			},
			//是否固定在屏幕中间显示
			isFixed: {
				type: Boolean,
				default: false
			}
		}
	}
</script>

<style scoped>
	.fui-load__ani {
		/* #ifdef APP-VUE */
		flex: 1;
		/* #endif */
		/* #ifndef APP-NVUE */
		width: 100%;
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}


	/* #ifndef APP-NVUE */
	.fui-load__ani-fixed {
		position: fixed;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
		z-index: 1008;
	}

	.fui-load__ani-1 view {
		width: 36rpx;
		height: 36rpx;
		border-radius: 50%;
		display: inline-block;
		animation: ani_1 1.4s infinite ease-in-out;
		animation-fill-mode: both;
	}

	.fui-load__ani-1 .fui-load__ani-a {
		animation-delay: -0.30s;
	}

	.fui-load__ani-1 .fui-load__ani-b {
		animation-delay: -0.15s;
	}

	@keyframes ani_1 {

		0%,
		80%,
		100% {
			-webkit-transform: scale(0)
		}

		40% {
			-webkit-transform: scale(1)
		}
	}

	.fui-load__ani-2 {
		position: relative;
		width: 60rpx;
		height: 60rpx;
		display: inline-block;
		vertical-align: middle;
	}

	.fui-load__ani-line {
		width: 8rpx;
		position: absolute;
		border-top-left-radius: 8rpx;
		border-top-right-radius: 8rpx;
		bottom: 0;
		transform: translateZ(0);
	}

	.fui-load__ani-c {
		animation: ani_2 0.5s ease alternate infinite;
	}

	.fui-load__ani-d {
		left: 20rpx;
		animation: ani_2 0.5s 0.2s ease alternate infinite;
	}

	.fui-load__ani-e {
		left: 40rpx;
		animation: ani_2 0.5s 0.4s ease alternate infinite;
	}

	@keyframes ani_2 {
		0% {
			height: 0;
		}

		100% {
			height: 75%;
		}
	}

	.fui-load__ani-3 {
		width: 40rpx;
		height: 40rpx;
		border: 2px solid transparent;
		border-radius: 50%;
		animation: 0.9s ani_3 linear infinite;
	}

	@keyframes ani_3 {
		0% {
			transform: rotate(0deg);
		}

		100% {
			transform: rotate(360deg);
		}
	}


	.fui-load__ani-4 {
		width: 52rpx;
		height: 52rpx;
		border: 1px solid;
		border-radius: 50%;
		-webkit-animation: 1s ani_3 linear infinite;
		animation: .9s ani_3 linear infinite;
		position: relative;
	}

	.fui-load__ani-f {
		width: 16rpx;
		height: 16rpx;
		position: absolute;
		top: -8rpx;
		left: 50%;
		border-radius: 50%;
		opacity: .6;
	}

	.fui-load__ani-5 {
		position: relative;
		width: 16rpx;
		height: 16rpx;
		border-radius: 50%;
		animation: ani_4 1s infinite linear;

	}

	.fui-load__ani-g,
	.fui-load__ani-h {
		display: inline-block;
		position: absolute;
		top: 0;
		width: 16rpx;
		height: 16rpx;
		border-radius: 50%;
		opacity: 0.25;
	}

	.fui-load__ani-g {
		left: -30rpx;
		animation: ani_4_2 1s infinite linear;

	}

	.fui-load__ani-h {
		left: 30rpx;
		animation: ani_4_1 1s infinite linear;
	}

	@-webkit-keyframes ani_4 {
		0% {
			opacity: 1;
		}

		33% {
			opacity: 0.25;
		}

		66% {
			opacity: 0.25;
		}

		100% {
			opacity: 1;
		}

	}

	@keyframes ani_4_1 {
		0% {
			opacity: 0.25;
		}

		33% {
			opacity: 1;
		}

		66% {
			opacity: 0.25;
		}
	}

	@keyframes ani_4_2 {
		33% {
			opacity: 0.25;
		}

		66% {
			opacity: 1;
		}

		100% {
			opacity: 0.25;
		}
	}

	.fui-load__ani-bcolor {
		border-color: var(--fui-color-primary, #465CFF) !important;
	}

	.fui-load__ani-border {
		border-left-color: var(--fui-color-primary, #465CFF) !important;
		border-right-color: var(--fui-color-primary, #465CFF) !important;
	}

	.fui-load__ani-bg {
		background: var(--fui-color-primary, #465CFF) !important;
	}

	/* #endif */
</style>