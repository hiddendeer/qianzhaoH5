<template>
	<view class="content">
		<view class="header-bg">
			<img style="width: 100%;" :src="detail" />
		</view>
		<view style="padding-top: 155%;">
			<!-- <image class="top-bg" :src="top_bg"></image> -->
			<!-- <uni-swiper-dot class="uni-swiper-dot-box" :info="info" :current="current">
				<swiper class="swiper-box" @change="change">
					<swiper-item v-for="(item, index) in info" :key="index">
						<view class="swiper-item"><image :src="item.url"></image></view>
					</swiper-item>
				</swiper>
			</uni-swiper-dot> -->

			<view>
				<uni-popup ref="popup" backgroundColor="#fff">
					<scroll-view scroll-y="true" class="popup-content " :class="{ 'popup-height': 'right' }">
						<uni-list style="width: 100%;">
							<uni-list-item v-for="(item, i) in list" :clickable="true" @click="changeSetMeal(item)"
								:key="i" :ellipsis=1 :title="item.name" :note="item.des_content" :thumb="item.des_picture"
								thumb-size="lg" :rightText="item.price + '元/月'"></uni-list-item>
						</uni-list>
					</scroll-view>
				</uni-popup>
			</view>

			<view>
				<!-- <uni-popup :maskClick="true" ref="cityList" backgroundColor="#fff"> -->
			<!-- 		<div style="text-align: right;" @click="closePop">
					<uni-icons type="checkmarkempty" color="#22ac38" size="30"></uni-icons>
					</div>
					<view class="popup-content" :class="{ 'popup-height': 'right' }">
						<areaSelect @change="changeArea"></areaSelect>
					</view> -->
				<!-- </uni-popup> -->
			</view>

			<uni-card>
				<uni-list :border="false">
					<uni-list-item @click="open()" :clickable="true" :ellipsis="1" :title="meal.name"
						:note="meal.des_content" showArrow :thumb="meal.des_picture" thumb-size="lg" :rightText="meal.price + '元/月'" />



					<uni-list-item :clickable="true" style="color: red;" v-show="myfrom.number !== ''" title="已选号码"
						@click="myfrom.number = ''" showArrow :rightText="myfrom.number" />
				</uni-list>
			</uni-card>

			<uni-card v-show="myfrom.number == ''" style="margin-bottom: 50rpx;">

				<uni-list-item class="choose-city " :clickable="true" @click="chooseCity()" showArrow title="收货地址"
					:rightText="myfrom.postAddress" />

				<uni-search-bar @input="input" @confirm="search" @cancel="reflash" @clear="reflash" radius="5" maxlength="4" type="number"
					placeholder="生日,幸运数字等(4位)" clearButton="auto" />

				<!-- <own-check :list="tips" color="#fff" bgColor="#d9d9d9" activeTextColor="#ffffff" activeBgColor="#0078e8" type="checkbox" :defaultProps="defaultProps"></own-check> -->

			</uni-card>
			<!-- 号码列表 -->
			<view v-show="myfrom.number == ''" class="my-phone-box">
				<view v-for="(item, index) in phones" :key="index" class="my-btn" @click="choosePhone(item)">
					<view>
						{{ item}}
					</view>
					<view style="display: flex; justify-content: space-around;">
						<view class="flex-item old-price">
							¥99
						</view>
						<view class="flex-item phone-price">
							免费领取
						</view>
					</view>
				</view>

				<view style="width: 100%; padding:0px 10px">
					<button size="mini" @click="getPhones()" class="change-phones-btn" type="default">
						换一批
					</button>
				</view>

			</view>

			<uni-card v-show="myfrom.number != ''" title="填写收件人信息">
				<uni-forms ref="baseForm" :modelValue="myfrom">
					<uni-forms-item label="姓名" required>
						<uni-easyinput v-model="myfrom.postName" name="postName" placeholder="请输入姓名" />
					</uni-forms-item>
					<uni-forms-item label="身份证" required>
						<uni-easyinput type="text" maxlength="18" v-model="myfrom.certId" name="certId"
							placeholder="请输入身份证号" />
					</uni-forms-item>
					<uni-forms-item label="联系电话" required>
						<uni-easyinput maxlength="11" type="number" name="postNumber" v-model="myfrom.postNumber"
							placeholder="请输入手机号" />
					</uni-forms-item>
			<!-- 		<uni-forms-item label="验证码" required>
						<uni-easyinput maxlength="6" type="number" v-if="send_code" 
							v-model="myfrom.captcha" placeholder="请输入短信验证码" />
						<button v-if="!send_code" @click="sendSMS()" type="default">发送验证码</button>
					</uni-forms-item> -->
				<!-- 	<uni-forms-item label="推荐码">
						<uni-easyinput maxlength="11" type="number" v-model="myfrom.recommender" name="recommender"
							placeholder="请输入推荐人手机号" />
					</uni-forms-item> -->
				</uni-forms>
			</uni-card>

			<uni-card v-show="myfrom.number != ''" title="详细收货地址">
				<!-- @blur="inputCity()" -->
				<uni-easyinput v-model="myfrom.postAddress" type="textarea" placeholder="请输入详细收货地址" />
			</uni-card>

			<button @click="submit" v-show="myfrom.number != ''" type="primary"
				style="width: 90%; margin: 0 auto ;">提交</button>




		</view>
		<!-- <uni-fab 
		@fabClick="fabClick" 
		:content="fabM" 
		direction="horizontal"
		horizontal="right"
		vertical="bottom"
		 @trigger="trigger"></uni-fab> -->
	
		 <citySelect ref="refCitySelect" @emitArea="emitArea"></citySelect>
	</view>
</template>

<script>
	import areaSelect from 'uni_modules/leo-area-select/components/leo-area-select/index.vue';
	import citySelect from "@/components/city-select/index.vue"
	import ownCheck from '@/components/own-checkBtn/own-check.vue';
	import helper from '@/common/helper.js';
	export default {
		data() {
			return {
				send_code: false,
				searchValue: '',
				page: 1,
				// loading:true,
				city: '选择归属地',
				// top_bg: 'http://whole.qztele.com/static/h5/static/img/top.png',
				detail: 'static/default.jpeg',
				meal: {
					id: 0,
					name: '套餐名称',
					des_content: '套餐说明',
					price: '0',
					des_picture: 'static/logo.jpeg'
				},
				myfrom: {
					// orderid: 0,
					// name: '',
					// idcard: '',
					// phone: '',
					// number: '',
					// address: '',
					// code: '',
					// recommender: '', // 推荐人 （手机号）
					// unicomid: ''
					"goodsId": "",
					"number": "",
					"provinceCode": "",
					"cityCode": "",
					"certName": "",
					"certId": "",
					"postName": "",
					"postNumber": "",
					"postProvinceCode": "",
					"postCityCode": "",
					"postDistrictCode": "",
					"postAddress": "选择归属地",
					// captcha: ""
				},
				list: [],
				defaultProps: {
					name: 'name',
					id: 'code'
				},
				tips: [{
						name: '不带4',
						code: 'no_4'
					},
					{
						name: '不带7',
						code: 'no_7'
					},
					{
						name: '优选',
						code: 'good'
					},
					{
						name: '超级靓号',
						code: 'sugood'
					}
				],
				phones: [],
				info: [{
					// colorClass: '',
					url: 'http://code.qztele.com/static/h5/static/img/top.png',
					content: '1'
				}],
				current: 0,
				mode: 'round',
				fabM: [{
						iconPath: '/static/icon/fenhong.png',
						selectedIconPath: '/static/icon/fenhong-active.png',
						text: '我要分销',
						url: '/pages/qrcode/qrcode',
						active: false
					},
					{
						iconPath: '/static/icon/geren.png',
						selectedIconPath: '/static/icon/geren-active.png',
						text: '个人',
						url: '/pages/distribution/distribution',
						active: false
					}
				],
				pattern: {
					color: '#7A7E83',
					backgroundColor: '#fff',
					selectedColor: '#007AFF',
					buttonColor: '#007AFF',
					iconColor: '#fff'
				},
			};
		},
		components: {
			areaSelect,
			ownCheck,
			citySelect
		},
		onLoad() {
			let _t = this;
			// uni.showLoading({title:'加载中.'});
			// URL中获取code
			let code = helper.getUrlKey('code', window.location.href);
			console.log('code:', code);
			if (code != undefined) {
				_t.getRecommenderCode(code);
			}
			_t.init();
		},
		onBackPress() {
			if (this.$refs.fab.isShow) {
				this.$refs.fab.close();
				return true;
			}
			return false;
		},
		methods: {
			init() {
				// 初始化全部 数
				let _t = this;
				uni.showLoading({
					title: '数据准备中'
				});
				// _t.getList();
				// _t.getPhones();
				_t.getInitData();
				setTimeout(function() {
					console.log('sleep');
					// 等2秒执行隐藏加载
					uni.hideLoading();
				}, 1000);
			},
			// banner
			change(e) {
				let _t = this;
				_t.current = e.detail.current;
			},
			async getRecommenderCode(code) {
				let _t = this;
				console.log('=========>');
				console.log('code:', code);
				let res = await helper.myRequest({
					url: 'getRecommenderPhoneByCode',
					method: 'POST',
					data: {
						code: code
					}
				});
				if (res.data.code == 0) {
					_t.myfrom.recommender = res.data.data;
				}
			},
			async getInitData() {
				let _t = this;
				const res = await helper.myRequest({
					url: '/api/plans'
				});
				_t.list = res.data.data;
			
				
				if (_t.list.length>0) {
					_t.meal.name = _t.list[0].name;
					_t.meal.price = _t.list[0].price;
					_t.meal.des_content = _t.list[0].des_content;
					_t.meal.des_picture = _t.list[0].des_picture;
					_t.myfrom.goodsId = _t.list[0].goods_id;
					const numbersRes = await helper.myRequest({
						url: '/api/numbers',
						// method: 'POST',
						data: {
							// page: _t.page
							    "provinceCode": "34",
							    "cityCode": "340",
							    "goodsId": _t.list?.[0]?.goods_id,
							    "qryType": "02",
							    "searchCategory": "1",
								amounts: 10,
								searchValue: ''
						}
					});
					_t.phones = numbersRes.data.data.numArray;
					console.log(_t.phones)
				}
			},
			async getList() {
				// 获取套餐列表
				let _t = this;
				const res = await helper.myRequest({
					url: '/api/plans'
				});
			},
			// 获取顶部图片
			// async getTopBg() {
			// 	let _t = this;
			// 	const res = helper.myRequest({ url: '' });
			// },
			// 获取靓号列表
			async getPhones() {
				let _t = this;
				// let data = {};
				// data.page = _t.page;
				// // 不存在 则直接使用默认
				// if(_t.myfrom.unicomid != ''){
				// 	data.unicomid = _t.myfrom.unicomid;
				// } 
				const res = await helper.myRequest({
					url: '/api/numbers',
					// method: 'POST',
					data: {
						// page: _t.page
						    "provinceCode": "34",
						    "cityCode": "340",
						    "goodsId": _t.myfrom.goodsId || _t.list?.[0].goods_id,
						    "qryType": "02",
						    "searchCategory": "1",
							amounts: 10,
							searchValue: _t.searchValue
					}
				});
				if (res.data.errCode != '') {
					let size = res.data.msg
					if (_t.page >= size) {
						uni.showToast({
							icon: 'none',
							title: '',
							duration: 2000
						})
					}
					_t.phones = res.data.data.numArray;
					_t.page++;
				}

			},
			open() {
				let _t = this;
				// 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
				_t.$refs.popup.open('right');
			},
			chooseCity() {
				console.log('chooseCity click!');
				// 选择城市
				let _t = this;
				// 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
				// _t.$refs.cityList.open('right');
				_t.$refs.refCitySelect.open();
			},
			changeArea(result) {
				
				let _t = this;
				// _t.city = result
				// console.log("item:" , result[0])
				console.log('area change', result);

				_t.myfrom.postProvinceCode = result[0]['postCode'];
				_t.myfrom.postCityCode = result[1]['postCode'];
				_t.myfrom.postDistrictCode = result[2]['postCode'];
				_t.myfrom.provinceCode = result[0]['id'];
				_t.myfrom.cityCode = result[1]['id'];
				// _t.city = result[0]['name'] + ',' + result[1]['name'] + ',' + result[2]['name'];
				_t.myfrom.postAddress = result[0]['name'] + ',' + result[1]['name'] + ',' + result[2]['name'];
				// _t.$refs.pop.cityList.close();
			},
			
			closePop() {
				let _t = this;
				 _t.$refs.cityList.close();
			},
			changeSetMeal(item) {
				let _t = this;
				_t.meal = item;
				_t.myfrom.goodsId = item.goods_id;
				// _t.myfrom.unicomid = item.unicomid;
				_t.getPhones(); //重新获取小宝卡内容
				_t.$refs.popup.close();
			},
			
			reflash() {
				let _t = this;
				_t.searchValue = '';
				_t.getPhones();
			},
			async search(e) {
				let _t = this;
				_t.searchValue = e.value;
				_t.getPhones();
				// // 提交 查询的内容
				// const res = await helper.myRequest({
				// 	url: 'searchPhone?key=' + e.value
				// });

				// if (res.data.code == 0) {
				// 	console.log(res.data.data == "")
				// 	if (res.data.data == "") {
				// 		uni.showToast({
				// 			icon: 'none',
				// 			title: "没有查询到符合结果的号码"
				// 		})
				// 	} else {
				// 		_t.phones = res.data.data;
				// 	}
				// }
			},
			input(res) {
				// 校验输入内容
				console.log('input：', res);
			},
			choosePhone(item) {
				let _t = this;
				if (_t.myfrom.postAddress == '选择归属地') {
					uni.showToast({
						icon: 'none',
						title: '请选择号码归属地',
						duration: 2000
					});
					return;
				}
				_t.myfrom.number = item;
				// console.log("phone:" , item.number)
			},
			checkPhone() {
				let _t = this;
				// 手机号为空
				if (_t.myfrom.postNumber == '') {
					uni.showToast({
						icon: 'none',
						title: '号码不能为空',
						duration: 2000
					});
					return false;
				}
				// 正则表达式验证手机号
				// var checkphone = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
				var checkphone = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[0123456789])|(?:7[0-8])|(?:8[\d])|(?:9[0123456789]))\d{8}$/;
				
				if (!checkphone.test(_t.myfrom.postNumber)) {
					uni.showToast({
						icon: 'none',
						title: '号码不合法'
					});
					return false;
				}
				
				return true;
			},
			async sendSMS() {
				let _t = this;

				const checkRes = _t.checkPhone();
				if (!checkRes) {
					return;
				}

				_t.send_code = true;
				
				uni.showToast({
					icon: 'none',
					title: '验证码发送中',
					duration: 2000
				});

				const res = await helper.myRequest({
					url: '/api/sendCaptcha',
					method: 'POST',
					data: {
						postNumber: _t.myfrom.postNumber
					}
				});

				console.log(res);
			},
			async checkCode() {
				let _t = this;
				return

				if (_t.myfrom.code == '' || _t.myfrom.code.length != 6) {
					uni.showModal({
						title: '提示',
						content: '请正确填写验证码',
						confirmText: '填写',
						cancelText: '重发',
						success: function(res) {
							if (res.cancel) {
								//
								_t.send_code = false;
							}
						}
					});
				}
				// 验证 输入验证码是否正确
				_t.checkPhone();
				const res = await helper.myRequest({
					url: 'checkCode?phone=' + _t.myfrom.phone + '&code=' + _t.myfrom.code
				});
				if (res.data.code == 0) {
					uni.showToast({
						icon: 'none',
						title: '验证码校验成功',
						duration: 2000
					});
				}
			},
			emitArea(e) {
				let _t = this;
				_t.myfrom.postProvinceCode = e?.postProvinceCode;
				_t.myfrom.postCityCode = e?.postCityCode;
				_t.myfrom.postDistrictCode = e?.postDistrictCode;
				_t.myfrom.provinceCode = e?.provinceCode;
				_t.myfrom.cityCode = e?.cityCode;
				_t.myfrom.postAddress = e?.postAddress;
				console.log(_t.myfrom);
			},
			inputCity() {
				let _t = this;
				// _t.myfrom.address = _t.city + _t.myfrom.address;
				// _t.myfrom.address = _t.city;
			},
			async submit() {
				let _t = this;

				uni.showLoading({
					title: '正在提交数据'
				});
				if (_t.myfrom.goodsId == '') {
					uni.showToast({
						icon: 'none',
						title: '请选择套餐',
						duration: 2000
					});
					return;
				}
				// 验证数据
				if (_t.myfrom.postName == '') {
					// 预约人员姓名
					uni.showToast({
						icon: 'none',
						title: '姓名为必填',
						duration: 2000
					});
					return;
				}
				// 身份证
				if (_t.myfrom.certId == '') {
					uni.showToast({
						icon: 'none',
						title: '身份证号不能为空',
						duration: 2000
					});
					return;
				}
				// 身份证 合法性判断
				var checkid = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
				if (!checkid.test(_t.myfrom.certId)) {
					uni.showToast({
						icon: 'none',
						title: '请填写正确的身份证号码',
						duration: 2000
					});
					return;
				}
				
				if (!_t.checkPhone()) {
					return;
				}
				// if (_t.myfrom.captcha == '') {
				// 	uni.showToast({
				// 		icon: 'none',
				// 		title: '请填写短信验证码',
				// 		duration: 2000
				// 	});
				// 	return;
				// }
				if (_t.myfrom.postAddress == '') {
					uni.showToast({
						icon: 'none',
						title: '请正确填写地址',
						duration: 2000
					});
					return;
				}
				_t.myfrom.certName = _t.myfrom.postName;
				console.log('address:', _t.myfrom);
				const res = await helper.myRequest({
					url: '/api/orders/postCbOrder',
					method: 'POST',
					data: _t.myfrom
				});
				uni.hideLoading();
				console.log('order return:', res);
				if (res.data.errorCode == '') {
					uni.showToast({
						icon: 'none',
						title: '订单提交成功',
						duration: 2000
					});
					uni.redirectTo({
						url: '../success/success'
					});
				}
			},
			trigger(e) {
				let _t = this
				console.log(e);
				_t.fabM[e.index].active = !e.item.active;
				// 将其他颜色 恢复
				_t.fabM.forEach(ii => {
					// console.log(ii.text)
					if (e.item.text != ii.text) {
						ii.active = false
					}
				})

				// 跳转到 对应页面
				//在起始页面跳转到test.vue页面并传递参数
				console.log(e.item.url)
				uni.navigateTo({
					url: e.item.url
				});

				// uni.showModal({
				// 	title: '提示',
				// 	content: `您${this.content[e.index].active ? '选中了' : '取消了'}${e.item.text}`,
				// 	success: function(res) {
				// 		if (res.confirm) {
				// 			console.log('用户点击确定');
				// 		} else if (res.cancel) {
				// 			console.log('用户点击取消');
				// 		}
				// 	}
				// });
			},
			fabClick() {
				uni.showToast({
					title: '点击了悬浮按钮',
					icon: 'none'
				});
			}
		}
	};
</script>

<style lang="scss">
	.header-bg {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
	}

	.change-phones-btn {
		width: 100%;
		border-radius: 20px;
		font-size: 20px;
		background-color: #fa9e0a;
		color: #FFFFFF;
	}

	.choose-city {
		background-color: #f8f8f8;
		border-radius: 5px;
	}


	.uni-searchbar {
		padding: 10px 0px !important;
	}

	.old-price {
		text-decoration: line-through;
		font-size: 16px;
		font-weight: 200;
		color: #B3B3B3;
	}

	.phone-price {
		font-size: 16px;
		font-weight: 200;
		color: #fa9e0a;
	}

	// content
	// .cpt-mask {
	// 	position: fixed;
	// 	top: 0;
	// 	left: 0;
	// 	width: 100%;
	// 	height: 100%;
	// 	background-color: #000000;
	// 	opacity: 0.5;
	// 	z-index: 99;
	// }

	// .main-bg {
	// 	background-size: 100% 5500px;
	// 	// background: url('http://whole.qztele.com/static/upload/detail3.jpg');
	// 	background-image: url('../../static/data/default.jpg');
	// }

	uni-image {
		width: 100%;
		height: 120%;
		display: inline-block;
		/* overflow: hidden; */
		position: relative;
	}

	@media screen and (min-width: 500px) {
		.uni-swiper-dot-box {
			width: 100%;
			margin: 0 auto;
			margin-top: 8px;
		}

		.image {
			width: 100%;
		}
	}

	.swiper-box {
		width: 100%;
		height: 240px;
	}

	.swiper-item {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: center;
		align-items: center;
		object-fit: cover;
		height: 240px;
		color: #ff0000;
	}

	.my-phone-box {
		width: 100%;
		text-align: center;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;

	}

	.my-btn {
		// width: 290rpx;
		width: 45%;
		background-color: #fff;
		border-radius: 10rpx;
		font-size: 22px;
		font-weight: 600;
		text-align: center;
		margin: 10rpx;
		color: #000;
	}

	.top-bg {
		width: 100%;
		background-size: cover !important;
		object-fit: cover;
	}

	@mixin flex {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
	}

	@mixin height {
		/* #ifndef APP-NVUE */
		height: 100%;
		/* #endif */
		/* #ifdef APP-NVUE */
		flex: 1;
		/* #endif */
		height: 100vh;
	}

	.popup-content {
		@include flex;
		// align-items: center;
		justify-content: flex-start;
		// padding: 15px;
		// height: 50px;
		background-color: #fff;
	}

	.popup-box {
		height: 1000px;
		overflow-x: hidden;

		.scroll_view_style {
			height: 100%;
		}
	}

	.popup-height {
		@include height;
		width: 250px;
	}
</style>
