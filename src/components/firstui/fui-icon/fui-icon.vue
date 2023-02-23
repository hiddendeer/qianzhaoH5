<!--本文件由FirstUI授权予江苏伟岸纵横科技股份有限公司（手机号：      130 29  45982 1，身份证尾号： 29 0 6  70）专用，请尊重知识产权，勿私下传播，违者追究法律责任。-->
<template>
	<!-- #ifndef APP-NVUE -->
	<text :style="{ color: color, fontSize: getSize, fontWeight: fontWeight}" class="fui-icon"
		:class="[!color && !primary?'fui-icon__color':'',primary && !color?'fui-icon__active-color':'',disabled?'fui-icon__not-allowed':'',customPrefix,customPrefix?name:'']"
		@click="handleClick">{{ icons[name] || '' }}</text>
	<!-- #endif -->
	<!-- #ifdef APP-NVUE -->
	<text :style="{ color: color, fontSize: getSize,lineHeight:getSize, fontWeight: fontWeight}" class="fui-icon"
		:class="[customPrefix]" @click="handleClick">{{ customPrefix?name:icons[name] }}</text>
	<!-- #endif -->
</template>

<script>
	import icons from './fui-icon.js';
	// #ifdef APP-NVUE
	var domModule = weex.requireModule('dom');
	import fuiicons from './fui-icon.ttf'
	domModule.addRule('fontFace', {
		'fontFamily': 'fuiFont',
		'src': "url('" + fuiicons + "')"
	});
	// #endif

	export default {
		name: "fui-icon",
		emits: ['click'],
		// #ifdef MP-WEIXIN
		options: {
			addGlobalClass: true
		},
		// #endif
		props: {
			name: {
				type: String,
				default: ''
			},
			size: {
				type: [Number, String],
				default: 0
			},
			//rpx | px
			unit: {
				type: String,
				default: ''
			},
			// #ifdef APP-NVUE
			color: {
				type: String,
				default: '#333333'
			},
			// #endif
			// #ifndef APP-NVUE
			color: {
				type: String,
				default: ''
			},
			// #endif
			//字重
			fontWeight: {
				type: [Number, String],
				default: 'normal'
			},
			//是否禁用点击
			disabled: {
				type: Boolean,
				default: false
			},
			params: {
				type: [Number, String],
				default: 0
			},
			customPrefix: {
				type: String,
				default: ''
			},
			//是否显示为主色调，color为空时有效。nvue不支持【内部使用】
			primary: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			getSize() {
				const size = (uni.$fui && uni.$fui.fuiIcon && uni.$fui.fuiIcon.size) || 64
				const unit = (uni.$fui && uni.$fui.fuiIcon && uni.$fui.fuiIcon.unit) || 'rpx'
				return (this.size || size) + (this.unit || unit)
			}
		},
		data() {
			return {
				icons: icons
			};
		},
		methods: {
			handleClick() {
				if (this.disabled) return;
				this.$emit('click', {
					params: this.params
				});
			}
		}
	}
</script>

<style scoped>
	/* #ifndef APP-NVUE */
	/* 头条小程序组件内不能引入字体，需要在父级页面引入字体文件*/
	@font-face {
		font-family: fuiFont;
		src: url("./fui-icon.ttf") format("truetype");
	}

	/* #endif */
	.fui-icon {
		font-family: fuiFont;
		text-decoration: none;
		text-align: center;
		/* #ifdef H5 */
		cursor: pointer;
		/* #endif */
	}

	/* #ifndef APP-NVUE */
	.fui-icon__color {
		color: var(--fui-color-section, #333333) !important;
	}

	.fui-icon__active-color {
		color: var(--fui-color-primary, #465CFF) !important;
	}

	/* #endif */

	.fui-icon__not-allowed {
		/* #ifdef H5 */
		cursor: not-allowed !important;
		/* #endif */
	}
</style>