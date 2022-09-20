<template>
	<view>
		<uni-card title="我的分销" thumbnail="" extra="分销详情" note="Tips">
			<uni-grid :column="2" :showBorder="false" :highlight="false" :square="false">
				<uni-grid-item>
					<view class="grid-item-box item" style="background-color: #fff;">
						<view class="info">{{userInfo.name}}</view>
						<view class="text">姓名</view>
					</view>
				</uni-grid-item>
				<uni-grid-item>
					<view class="grid-item-box item" style="background-color: #fff;">
						<view class="info">{{userInfo.phone}}</view>
						<view class="text">我的手机号</view>
					</view>
				</uni-grid-item>
				<uni-grid-item>
					<view class="grid-item-box item" style="background-color: #fff;" @click="withdrow()">
						<view class="info">{{userInfo.total_profit-userInfo.withdraw_profit}}元</view>
						<view class="text">未提现收益</view>
					</view>
				</uni-grid-item>
				<uni-grid-item>
					<view class="grid-item-box item" style="background-color: #fff;">
						<view class="info">{{userInfo.com_profit}}元</view>
						<view class="text">未到收益（30日清零）</view>
					</view>
				</uni-grid-item>
				<uni-grid-item>
					<view @click="withdrow(userInfo.phone)" class="grid-item-box item" style="background-color: #fff;">
						<view class="info">{{userInfo.withdraw_profit}}元</view>
						<view class="text"><strong>可提现收益</strong></view>
					</view>
				</uni-grid-item>
				
			</uni-grid>
			
			<button type="primary" @click="showMyWithdrowHistory(userInfo.phone)">提现历史</button>
			</br>
			<button type="default" @click="showMyQrCode()">查看二维码</button>
			</br>
			<button type="default" style="background-color: #18BC37; color: #ffffff;" @click="goDistributionPage(userInfo.phone)">推荐分销码</button>
			<!-- 输出个人信息，包含
			用户姓名
			用户号码（推荐码）
			已到手分销收益  
			进行中 分销收益 -->
			<uni-card v-show="showMyQR" title="我的二维码" >
				<image :src="canvasUrl" mode="widthFix"></image>
				<mosowe-canvas-image 
				ref="mosoweCanvasComponents" 
				@canvasImage="_canvasImage" 
				:lists="lists" 
				height="300" 
				width="300"
				showPreview />
			</uni-card>
				
		</uni-card>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo:{
					name:'未获取',
					phone:'未知',
					total_profit:'未获取', // 到手收益
					com_profit:'未获取' ,// 未到手的收益
					my_code:'未获取',// 分銷碼
				},
				// 二维码生成参数
				showMyQR:false,
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
						content: 'http://code.qztele.com/pub/home/#/', 
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
		onLoad(e) {
			let _t = this;
			// 获取url 参数
			console.log(e.phone)
			if(e.phone !== undefined){
				// 有参数 
				_t.userInfo.phone = e.phone
			}
			uni.getStorage({
				key: e.phone,
				success: function (res) {
					console.log("res:",res);
					_t.userInfo = res.data
					// _t._canvasImage(_t.userInfo.my_code)
				}
			})
			
		},
		methods: {
			showMyQrCode(){
				let _t = this
				if(_t.showMyQR){
					_t.showMyQR = !_t.showMyQR
				}else{
					// console.log("befote:",_t.lists[1].content)
					_t.lists.forEach(item=>{
						console.log(item.type)
						if(item.type == 'qr'){
							item.content = _t.userInfo.my_code // 为啥32位不可以
						}
					})
				
					_t.$refs.mosoweCanvasComponents.createCanvas();
					_t.showMyQR = !_t.showMyQR
				}
			},
			_canvasImage (e) {
				let _t = this
				_t.canvasUrl = e;
			},
			// 发起提现请求
			withdrow(phone){
				uni.navigateTo({
					url: 'withdrow?phone='+phone
				});
			},
			// 提现历史
			showMyWithdrowHistory(phone){
				console.log(phone)
				uni.navigateTo({
					url: 'history?phone='+phone
				});
			},
			goDistributionPage(phone){
				uni.navigateTo({
					// url: ' history?phone='+phone
					url:'../qrcode/onlyqr?phone='+phone
				});
			}
		}
	}
</script>

<style>
	.item {
		margin: auto 0px;
		text-align: center;
	}
	.info {
		color: #7a77d6;
		font-size: 15px;
		margin-top: 5px;
		white-space:nowrap;
		overflow: hidden;
		text-overflow:ellipsis;
	}
	.text {
		color: #6A6A6A;
		font-size: 14px;
		margin-top: 5px;
	}
</style>
