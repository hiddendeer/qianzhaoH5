<!--本文件由FirstUI授权予江苏伟岸纵横科技股份有限公司（手机号：1  3 0 2 9 4598 2   1，身份证尾号：  2 9 0 670）专用，请尊重知识产权，勿私下传播，违者追究法律责任。-->
<template>
	<!-- #ifdef APP-PLUS || H5 || MP-ALIPAY || MP-TOUTIAO -->
	<radio-group :name="name">
		<slot></slot>
	</radio-group>
	<!-- #endif -->

	<!-- #ifdef MP-WEIXIN || MP-BAIDU || MP-QQ  -->
	<fui-form-field :name="name" :value="val">
		<slot></slot>
	</fui-form-field>
	<!-- #endif -->
</template>

<script>
	export default {
		name: "fui-radio-group",
		emits: ['change', 'input', 'update:modelValue'],
		// #ifndef VUE3
		// #ifdef MP-WEIXIN
		behaviors: ['wx://form-field-group'],
		// #endif
		// #endif
		props: {
			name: {
				type: String,
				default: ''
			},
			// #ifdef VUE3
			modelValue: {
				type: String,
				default: ''
			},
			// #endif
			value: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				val: ''
			}
		},
		watch: {
			// #ifdef VUE3
			modelValue(val) {
				this.modelChange(val)
			},
			// #endif
			value(val) {
				this.modelChange(val)
			}
		},
		created() {
			this.childrens = []
		},
		methods: {
			radioChange(e) {
				this.$emit('change', e)
				// TODO vue2 兼容
				this.$emit('input', e.detail.value)
				// TODO vue3 兼容
				// #ifdef VUE3
				this.$emit("update:modelValue", e.detail.value);
				// #endif
			},
			changeValue(value, target) {
				this.val = value;
				this.childrens.forEach(item => {
					if (item !== target) {
						item.val = false;
					}
				})
				let e = {
					detail: {
						value: value
					}
				}
				this.radioChange(e)
			},
			modelChange(val){
				this.childrens.forEach(item => {
					if (item.value === val) {
						item.val = true;
					} else {
						item.val = false;
					}
				})
			}
		}
	}
</script>
<style scoped></style>