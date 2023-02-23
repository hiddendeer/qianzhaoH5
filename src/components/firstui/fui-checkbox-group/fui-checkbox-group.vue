<!--本文件由FirstUI授权予江苏伟岸纵横科技股份有限公司（手机号：  1 30   2   9459 821，身份证尾号： 2   9067 0）专用，请尊重知识产权，勿私下传播，违者追究法律责任。-->
<template>
	<!-- #ifdef APP-PLUS || H5 || MP-ALIPAY || MP-TOUTIAO -->
	<checkbox-group :name="name">
		<slot></slot>
	</checkbox-group>
	<!-- #endif -->

	<!-- #ifdef MP-WEIXIN || MP-BAIDU || MP-QQ -->
	<fui-form-field :name="name" :value="vals">
		<slot></slot>
	</fui-form-field>
	<!-- #endif -->
</template>

<script>
	export default {
		name: "fui-checkbox-group",
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
				type: Array,
				default () {
					return []
				}
			},
			// #endif
			value: {
				type: Array,
				default () {
					return []
				}
			}
		},
		data() {
			return {
				vals: ''
			};
		},
		watch: {
			// #ifdef VUE3
			modelValue(vals) {
				this.modelChange(vals)
			},
			// #endif
			value(vals) {
				this.modelChange(vals)
			}
		},
		created() {
			this.childrens = []
		},
		methods: {
			checkboxChange(e) {
				this.$emit('change', e)
				// TODO vue2 兼容
				this.$emit('input', e.detail.value)
				// TODO vue3 兼容
				// #ifdef VUE3
				this.$emit("update:modelValue", e.detail.value);
				// #endif
			},
			changeValue(checked, target) {
				let vals = []
				this.childrens.forEach(item => {
					if (item.val) {
						vals.push(item.value);
					}
				})
				this.vals = vals;
				let e = {
					detail: {
						value: vals
					}
				}
				this.checkboxChange(e)
			},
			modelChange(vals) {
				this.childrens.forEach(item => {
					if (vals.includes(item.value)) {
						item.val = true;
					} else {
						item.val = false
					}
				})
			}
		}
	}
</script>

<style scoped></style>