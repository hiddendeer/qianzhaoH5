<template>
	<div>
		<uni-nav-bar 
		@clickLeft="goBack()"
		left-icon="back" 
		title="提现申请">
		</uni-nav-bar>
		
		<uni-card title="提现"  >
			<uni-forms ref="baseForm" :modelValue="myfrom" >
				<uni-forms-item label="提现账户" required>
					<uni-easyinput 
					type="text"
					maxlength="16"
					v-model="myfrom.phone" 
					name="phone" 
					@blur="checkPhone()"
					placeholder="请输入您的推荐码" />
				</uni-forms-item>
				<uni-forms-item label="提现金额" required>
					<uni-easyinput 
					maxlength="11"
					type="number" 
					name="balance" 
					v-model="myfrom.balance" 
					placeholder="请输入提现金额" 
					/>
				</uni-forms-item>
				<uni-forms-item label="验证码" required>
					<uni-easyinput 
					maxlength="6"
					type="number" 
					name="code" 
					v-model="myfrom.code" 
					placeholder="请输入验证码" 
					/>
				</uni-forms-item>
			</uni-forms>
			
			<button type="primary" @click="sendApply()">发起申请</button>
		</uni-card>
		
		
	</div>
</template>

<script>
	import helper from '@/common/helper.js';
	export default {
		data() {
			return {
				myfrom:{
					balance:0.0,
					phone:"",
					code:""
				},
			}
		},
		onLoad: (option) => {
			let _t = this
			console.log("phone：",option.phone)
			// getList();
		},
		methods:{
			goBack(){
				uni.navigateBack()
			},
			checkPhone(){
				let _t = this
				// 手机号为空
				if(_t.myfrom.phone==""){
					uni.showToast({
						icon:'none',
						title: '号码不能为空',
						duration:2000
					})
					return
				}
				// 正则表达式验证手机号
				var checkphone = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
				if(!checkphone.test(_t.myfrom.phone)){
					uni.showToast({
						icon:'none',
						title:'号码不合法'
					})
					return
				}
			},
			// 发起提现申请
			async sendApply(){
				let _t = this
				const res = await helper.myRequest({
					url:'doWithdrow',
					method:'POST',
					data:_t.myfrom
				})
				
				console.log(_t.myfrom.code)
				if(res.data.code ==0){
					console.log(res.data)
					uni.showToast({
						icon:'none',
						title: res.data.msg,
						duration:2000
					})
					uni.navigateTo({
						url:'history?phone='+_t.myfrom.phone
					})
				}
				
			},
			
		}
	}
</script>

<style>
</style>
