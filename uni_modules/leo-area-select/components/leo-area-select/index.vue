<template>
	<view class="leo-area-select">
		<scroll-view scroll-y class="list" v-for="(item, index) in allData" :key="index"
			:ref="'leo-area-select-sc-'+index"
			:scroll-top="tops[index] ? tops[index] : 0">
			<view class="list-item" 
				:class="sindex == actives[index] ? 'active' : ''" 
				v-for="(sitem, sindex) in item" 
				:key="sitem[props.id]"
				@click.stop="changeType(sindex, index)"
				:ref="'leo-area-select-item-'+index+'-'+sindex">
				<text class="text">{{sitem[props.name]}}</text>
			</view>
		</scroll-view>
	</view>
</template>
<script>
	const all = require('../../citys.json');
	export default {
		props: {
			level: { // 需要几级
				type: Number,
				default: 3
			},
			data: { // 数据源 如不设置则使用系统自带省市区数据
				type: Array,
				default: () => {
					return all;
				}
			},
			props: {
				type: Object,
				default: () => { // 配置选项，
					return {
						id: 'code',
						postCode: 'postCode',
						name: 'name',
						children: 'children'
					}
				}
			},
			activeName: {
				type: Array,
				default: () => {
					return [] // 默认选中的省市区 ['广东省', '深圳市', '宝安区']
				}
			}
		},
		data() {
			return {
				actives: [],
				allData: [],
				tops: []
			}
		},
		watch:{
			data (nval) {
				this.createLevelData(this.data);
			},
			activeName (nval) {
				this.createActiveForName();
			}
		},
		created() {
			if (this.activeName.length > 0) {
				this.createActiveForName();
			} else {
				this.createActiveData();
				this.createLevelData(this.data);
			}
			
		},
		methods: {
			createActiveForName() {
				let arr = [],
					atd = [];
				for (let i = 0; i < this.level; i++) {
					if (i == 0) {
						atd.push(this.data);
						arr.push(this.getIndex(this.activeName[i], this.data));
					} else {
						atd.push(atd[i-1][arr[i-1]][this.props.children]);
						arr.push(this.getIndex(this.activeName[i], atd[i]))
					}
				}
				this.actives = arr;
				this.allData = atd;
				this.$nextTick(() => {
					let ts = [];
					for (let i = 0; i < arr.length; i++) {
						let target = this.$refs['leo-area-select-item-'+i+'-'+arr[i]][0],
							sc = this.$refs['leo-area-select-sc-'+i][0];
						ts.push( target.$el.offsetTop);
					}
					this.tops = ts;
				})
			},
			getIndex(name, list) {
				let index = list.findIndex((e) => e[this.props.name] == name);
				return index > -1 ? index : 0;
			},
			createActiveData() {
				let arr = [];
				for (let i = 0; i < this.level; i++) {
					arr.push(0);
				}
				this.actives = arr;
			},
			createLevelData(data) {
				let dts = [];
				for (let i = 0; i < this.actives.length; i++) {
					if (i == 0) {
						dts.push(data);
					} else {
						dts.push(this.createSingleData(dts[i-1][this.actives[i-1]][this.props.children]));
					}
				}
				this.allData = dts;
			},
			createSingleData(data, key) {
				return Array.isArray(data) ? data : [];
			},
			/**
			 * 切换选中
			 * @param {Object} sindex
			 * @param {Object} index
			 */
			changeType(sindex, index){
				if (this.actives[index] == sindex) return;
				let arr = JSON.parse(JSON.stringify(this.actives)),
					ads = JSON.parse(JSON.stringify(this.allData));
				arr[index] = sindex;
				for (let i = 0; i < arr.length; i++) {
					if (i > index) {
						arr[i] = 0;
						ads[i] = this.createSingleData(ads[i-1][arr[i-1]][this.props.children])
					}
				}
				this.actives = arr;
				this.allData = ads;
				this.getSelectData(arr, ads);
			},
			/**
			 * 组装最终返回的结果
			 * @param {Object} arr
			 * @param {Object} ads
			 */
			getSelectData(arr, ads) {
				console.log(arr,1)
				console.log(ads,2)
				let result = [];
				for (let i = 0; i < arr.length; i++) {
					let t = ads[i][arr[i]];
					console.log(t,'t')
					result.push({
						id: t[this.props.id],
						name: t[this.props.name],
						postCode: t[this.props?.postCode] || t[this.props.id],
					})
				}
				this.$emit('change', result);
			}
		}
	}
</script>
<style lang="scss">
	.leo-area-select{
		display: flex;
		width: 100%;
		height: 100%;
		.list{
			flex: 1;
			display: flex;
			flex-direction: column;
			border-right: 1rpx solid rgba(0,0,0,0.05);
			overflow: hidden;
			.list-item{
				width: 100%;
				display: flex;
				flex-direction: column;
				text-align: center;
				line-height: 80rpx;
				font-size: 30rpx;
				color: #222;
				overflow: hidden;
				&.active{
					background-color: rgba(0,0,0,0.04);
				}
				.text{
					display: inline-block;
					margin: 0 auto;
					width: 80%;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis; 
				}
			}
		}
	}
</style>
