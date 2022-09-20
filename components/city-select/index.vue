<template>
	<div>
		<uni-data-picker v-model="selectValue" ref="picker" v-show="hasPicker" :localdata="cityJson" @popupclosed="handleClose" popup-title="请选择省市区" @change="onchange"
			@nodeclick="onnodeclick" :map="mapObj"></uni-data-picker>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				hasPicker: false,
				cityJson: [],
				selectValue: '',
				mapObj: {text:'name',value:'code'},
				param: {
					provinceCode: '',
					cityCode: '',
					postProvinceCode:'',
					postCityCode:'',
					postDistrictCode:'',
					postAddress: ''
				}
			}
		},
		mounted() {
			this.cityJson = require('./citys.json');
		},
		methods: {
			onchange(e) {
				this.param.postDistrictCode = e.detail.value?.[2]?.value;
				this.param.postAddress = e.detail.value?.[0]?.text+'/'+e.detail.value?.[1]?.text+'/'+e.detail.value?.[2]?.text;
				this.$emit('emitArea', this.param);
			},
			onnodeclick(node) {
				if (node?.postCode) {
					if (node?.parent_value) {
						this.param.cityCode = node.code;
						this.param.postCityCode = node.postCode;
						
					} else {
						this.param.provinceCode = node.code;
						this.param.postProvinceCode = node.postCode;
					}
				}
			},
			open() {
				this.hasPicker = true;
				this.$refs.picker.show()
			},
			handleClose() {
				this.hasPicker = false;
			},
			
		}
	}
</script>

<style>
</style>
