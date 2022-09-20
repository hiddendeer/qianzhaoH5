<template>
	<view class="">
		<view class="flex-box flex-wrap" v-if="type == 'radio'">
			<view class="check" v-for="(item,index) in list" :key="index" :btnStyle="btnStyle"
				:style="{'background':active == index?activeBgColor:bgColor,'color':active == index?activeTextColor:color}"
				@click="checkBtn(index,item)">
				{{item[defaultProps.name]}}
			</view>
		</view>
		<view class="flex-box flex-wrap" v-if="type == 'checkbox'">
			<view class="check" v-for="(item,index) in arr" :key="index" :btnStyle="btnStyle"
				:style="{'background':item.isCheck?activeBgColor:bgColor,'color':item.isCheck?activeTextColor:color}"
				@click="checkboxBtn(index,item)">
				{{item[defaultProps.name]}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default () {
					return []
				}
			},
			color: {
				type: String,
				default () {
					return "#666666"
				}
			},
			activeTextColor: {
				type: String,
				default () {
					return "#409dff"
				}
			},
			bgColor: {
				type: String,
				default () {
					return "#f6f6f6"
				}
			},
			activeBgColor: {
				type: String,
				default () {
					return "#cae4ff"
				}
			},
			type: {
				type: String,
				default () {
					return "radio"
				}
			},
			btnStyle: {
				type: Object,
				default () {
					return {}
				}
			},
			defaultProps: {
				type: Object,
				default: () => {
					return {
						name: 'name',
						id: 'id',
					}
				}
			}
		},
		data() {
			return {
				active: null,
				arr: [],
				select: []
			}
		},
		mounted() {
			if (this.type == 'checkbox') {
				for (let i in this.list) {
					this.list[i].isCheck = false;
					this.arr.push(this.list[i])
				}
			}
		},
		methods: {
			/* 单选 */
			checkBtn(e, info) {
				// console.log(info)
				this.active = e;
				this.$emit("chooseItem", info)
			},
			/* 多选 */
			checkboxBtn(e, info) {
				// info.isCheck = true;
				let arr = [...this.arr];
				let selarr = [...this.select];
				if (arr[e].isCheck == false) {
					arr[e].isCheck = true;
					selarr.push(info)
				} else {
					arr[e].isCheck = false;
					var index11 = selarr.indexOf(e)
					selarr.splice(index11, 1)

				}
				this.arr = arr;
				this.select = selarr;
				this.$emit("chooseItem", this.select)
			}
		}
	}
</script>

<style scoped>
	.flex-wrap {
		flex-wrap: wrap;
	}

	/* flex横向左右两边布局*/

	.flex-space-between {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}


	/* flex垂直居中布局*/

	.flex-column {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}


	/* flex横向不居中布局 */

	.flex-box {
		display: flex;
		align-items: center;
	}


	/* flex横向居中布局 */

	.flex-center {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	/* flex横向平均布局 */

	.flex-space-around {
		display: flex;
		align-items: center;
		justify-content: space-around;
	}

	/* flex 布局 */
	.flex {
		display: flex;
		flex-direction: row;
	}

	/* flex1 */
	.flex1 {
		flex: 1;
	}

	.check {
		padding: 20rpx;
		background-color: #f6f6f6;
		color: #666666;
		border-radius: 10rpx;
		margin: 10rpx 10rpx;
	}

	/* .check:nth-child(3n) {
		margin-right: 0;
	} */

	.check_y {
		background-color: #cae4ff;
		color: #409dff;
	}
</style>
