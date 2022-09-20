<template>
	<div>
		<view>
			<uni-popup ref="popup" backgroundColor="#fff">
				<scroll-view scroll-y="true" class="popup-content" :class="{ 'popup-height': 'right' }">
					<uni-list style="width: 100%;">
						<uni-list-item
							v-for="(item, i) in list"
							:clickable="true"
							@click="changeSetMeal(item)"
							:key="i"
							:title="item.title"
							:note="item.content"
							:thumb="item.img"
							thumb-size="lg"
							:rightText="item.price + '元/月'"
						></uni-list-item>
					</uni-list>
				</scroll-view>
			</uni-popup>
		</view>
		
		<uni-card title="推荐关系补全" >
			<uni-forms ref="baseForm" :modelValue="myfrom" >
				<uni-list :border="false">
					<uni-list-item
						@click="open()"
						:clickable="true"
						:ellipsis="1"
						:title="meal.title"
						:note="meal.content"
						:thumb="meal.img"
						thumb-size="lg"
						:rightText="meal.price + '元/月'"
					/>
				</uni-list>
				<uni-forms-item label="推荐码" required>
					<uni-easyinput 
					type="text"
					maxlength="11"
					v-model="myfrom.mycode" 
					name="mycode" 
					placeholder="请输入您的号码" />
				</uni-forms-item>
				<uni-forms-item label="推荐人" required>
					<uni-easyinput 
					maxlength="11"
					type="number" 
					name="distribution" 
					@blur="checkPhone()"
					v-model="myfrom.distribution" 
					placeholder="请输入推荐人号码" 
					/>
				</uni-forms-item>
				
			</uni-forms>
			<button type="primary" @click="beforeSubmit()">提交</button>
			
		</uni-card>
	</div>
	
</template>

<script>
	import helper from '@/common/helper.js';
	export default{
		data(){
			return {
				myfrom:{
					mycode:'',
					distribution:'',
					orderId:''
				},
				meal: {
					id: 0,
					title: '套餐名称',
					content: '套餐说明',
					price: '0',
					img: 'http://ide.qztele.com/data/User/admin/home/document/web/img/logo.jpg'
				},
				list: [],
			}
		},
		onLoad() {
			let _t = this;
			// uni.showLoading({title:'加载中.'});
			// URL中获取code
			let code = helper.getUrlKey('phone', window.location.href);
			console.log('code:', code);
			if (code != undefined) {
				_t.myfrom.mycode = code;
			}
			let distri = helper.getUrlKey('distribution', window.location.href);
			console.log('distribution:', distri);
			if (distri != undefined) {
				_t.myfrom.distribution = distri;
			}
			_t.init();
		},
		methods:{
			init() {
				// 初始化全部 数
				let _t = this;
				uni.showLoading({
					title: '数据准备中'
				});
				_t.getList();
				setTimeout(function() {
					console.log('sleep');
					// 等1秒执行隐藏加载
					uni.hideLoading();
				}, 1000);
			},
			async getList() {
				// 获取套餐列表
				let _t = this;
				const res = await helper.myRequest({ url: 'apiOrderList' });
				console.log(res);
				_t.list = res.data.data;
			},
			open() {
				let _t = this;
				// 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
				_t.$refs.popup.open('right');
			},
			change(e) {
			  console.log("e:", e);
			},
			changeSetMeal(item) {
				let _t = this;
				console.log("item:" , item.id)
				_t.meal = item;
				_t.myfrom.orderId = item.id;
				_t.$refs.popup.close();
			},
			beforeSubmit(){
				let _t = this
				
				console.log(_t.myfrom.mycode)
				if(!(_t.checkPhone(_t.myfrom.mycode)
				&&_t.checkPhone(_t.myfrom.distribution))){
					uni.showToast({
						title:'推荐码/推荐人 不合法',
						icon:'error',
						duration:2000
					})
				}else{
					console.log("in else")
					_t.submit()
				}
			},
			async submit(){
				let _t = this	
				
				const res = await helper.myRequest({
					url:'upRelationship',
					method:'POST',
					data:_t.myfrom
				})
				if(res.data.code ==0){
					uni.showToast({
						title:'添加成功',
						icon:'success',
						duration:2000
					})
					console.log(res.data)
				}
			},
			checkPhone(phone){
				let _t = this
				// 正则表达式验证手机号
				var checkphone = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
				if(!checkphone.test(phone)){
					console.log('in check phone ' , phone)
					return false;
				}
				return true;
			},
		}
	}
</script>

<style lang="scss">
	
	@mixin flex {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
	}
	
	@mixin height {
		/* #ifndef APP-NVUE */
		/* height: 100%; */
		/* #endif */
		/* #ifdef APP-NVUE */
		flex: 1;
		/* #endif */
		height: 100vh;
	}
	
	
	.popup-content {
		@include flex;
		justify-content: start;
		background-color: #fff;
		overflow-x: hidden;
		.scroll_view_style{
		  height: 100%;
		}
	}
	
	.popup-height {
		@include height;
		width: 250px;
	}
</style>
