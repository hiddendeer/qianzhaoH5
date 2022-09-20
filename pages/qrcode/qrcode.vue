<template >
	<view >
		<view class="top">
			<uni-steps :options="options" :active="active"></uni-steps>
		</view>
		<uni-card v-show="active==1" title="补全个人信息" >
			<uni-forms ref="baseForm" :modelValue="myfrom" >
				<uni-forms-item label="姓名" required>
					<uni-easyinput 
					type="text"
					maxlength="16"
					v-model="myfrom.name" 
					name="name" 
					placeholder="请输入姓名" />
				</uni-forms-item>
				<uni-forms-item label="联系电话" required>
					<uni-easyinput 
					maxlength="11"
					type="number" 
					name="phone" 
					@blur="checkPhone()"
					v-model="myfrom.phone" 
					placeholder="请输入手机号" 
					/>
				</uni-forms-item>
			</uni-forms>
			<button type="primary" @click="submit('baseForm')">提交并生成二维码</button>
			</br>
			<button type="primary" @click="relashionship()">补全推荐关系</button>
		</uni-card>
		
		<uni-card v-show="active == 2" title="生成二维码" >
			<image :src="canvasUrl" mode="widthFix"></image>
			<mosowe-canvas-image 
			ref="mosoweCanvasComponents" 
			@canvasImage="_canvasImage" 
			:lists="lists" 
			height="300" 
			width="300"
			showPreview />
			
			<button type="primary" @click="checkMyInfo()">查看我的账户</button>
		</uni-card>
	</view>
</template>

<script>
	import helper from '@/common/helper.js';
	
	export default {
		data() {
			return {
				active:1,
				options:[
					{title:"我要分销"},
					{title:"补充个人信息"},
					{title:"生成推荐码"},
				],
				myfrom:{
					name:"",
					phone:""
				},
				canvasUrl: '',
				lists: [
					{
						type: 'image',
						content: 'http://code.qztele.com/static/h5/static/img/bg2.png', 
						width: 300, 
						height: 300, 
						x: 0, 
						y: 0, 
					},
					{
						type: 'qr',
						content: 'https://i2.hdslb.com/bfs/archive/db3ea0580ab1ef0', 
						width: 80, 
						height: 80,   
						// x: 110, 
						// y: 185, 
						x: 20,
						y: 185, 
						arc: false, 
						arcX: 0, 
						arcY: 0, 
						arcR: 0 
					},
					{
						type: 'text',
						content: '', 
						x: 120, 
						y: 250, 
						color: '#ff0000', 
						// size: 10, 
						// maxWidth: 100, 
						align: 'left', 
					},
				]
			}
		},
		methods: {
			async submit(){
				let _t = this
				_t.active = 2
				
				const res = await helper.myRequest({
					url:'addDistribution',
					method:'POST',
					data:{page:_t.page , phone:_t.myfrom.phone , name:_t.myfrom.name}
				})
				console.log("res:" , res);
				
				if(res.data.code ==0){
					// 添加 分销人员 并且获取 分销人员的 二维码
					_t.lists.forEach(item=>{
						console.log(item.type)
						if(item.type == 'qr'){
							item.content = res.data.data
						}
					})
					_t.$refs.mosoweCanvasComponents.createCanvas();
				}else{
					uni.showToast({
						icon:'none',
						title: res.data.msg,
						duration:2000
					})
				}
			},
			_canvasImage (e) {
				let _t = this
				_t.canvasUrl = e;
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
			checkMyInfo(){
				let _t = this;
				uni.redirectTo({
					url: '../distribution/distribution?phone='+_t.myfrom.phone
				});
			},
			// 跳转到关系补全页面 并传入用户号码
			relashionship(){
				let _t = this;
				uni.redirectTo({
					url: '../distribution/myDistribution?phone='+_t.myfrom.phone
				});
			}
		}
	}
</script>

<style>
	
	 .top{
		 margin-top: 10px;
		
	 }
</style>
