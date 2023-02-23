// 本文件由FirstUI授权予江苏伟岸纵横科技股份有限公司（手机号：1     3 0  2945  9821，身份证尾号：2 906   7 0）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
// #ifdef APP-VUE || H5
export default {
	data() {
		return {
			percentage: -1
		}
	},
	watch: {
		percent(val) {
			this.percentage = Number(val) || 0
		}
	},
	mounted() {
		this.percentage = Number(this.percent) || 0
	},
	methods: {
		change(e) {
			this.$emit('change', e);
		},
		end(e) {
			this.$emit('end', e);
		}
	}
}

// #endif

// #ifndef APP-VUE || H5
export default {}
// #endif