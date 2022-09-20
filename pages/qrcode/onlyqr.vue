<template>
	<div>
		<uni-nav-bar
		@clickLeft="goBack()"
		left-icon="back" 
		title="推荐分销二维码">
		</uni-nav-bar>
		
		<uni-card title="分销二维码" note="Tips" style="height: 100%; text-align: center; ">
			<view class="qrimg">
			    <tki-qrcode
			    ref="qrcode"
			    :cid="cid"
			    :val="val"
			    :size="size"
			    :unit="unit"
			    :background="background"
			    :foreground="foreground"
			    :pdground="pdground"
			    :icon="icon"
			    :iconSize="iconsize"
			    :lv="lv" 
			    :onval="onval"
			    :loadMake="loadMake"
			    :usingComponents="usingComponents"
			    :showLoading="showLoading"
			    :loadingText="loadingText"
			    @result="qrR" />
			</view>
			</br>
			<slider value="200" @change="sliderChange" min="100" max="350" show-value />
			</br>
			<!-- <input class="uni-input" type="text" placeholder="请填写您的手机号" :value="val" /> -->
			<textarea hidden :value="val" placeholder="请填写您的手机号" style="border: #C8C7CC 1px solid; width: 98%;border-radius: 10px; text-align: left; height: 100px;" />
			</br>
			<button type="primary" @click="makeCode()" >生成二维码</button>
			</br>
			<!-- <button type="primary" @click="saveCode()">保存二维码</button>
			</br> -->
			<button type="warn" @click="clearCode()">清除二维码</button>
		</uni-card>		
	</div>
</template>

<script>
	import tkiQrcode from "@/components/tki-qrcode/tki-qrcode.vue"
	
	const HOST="http://code.qztele.com/pub/home#/pages/distribution/myDistribution";
	
	export default {
		
	    components: {tkiQrcode},
		
		data() {
			return {
				cid:'tuijian',
				size:200,
				unit:'px',
				show:true,
				val:'',
				background:'#000000',
				foreground:'#ffffff',
				pdground:'#ffff00',
				onval:true,
				loadMake:true,
				showLoading:true,
				usingComponents:false,
				loadingText:'正在生成二维码',
				url:"",
				lv:3,
				icon:"",
				iconsize:40,
			}
		},
		onLoad(e) {
			let _t = this;
			// 获取url 参数
			console.log(e.phone)
			if(e.phone !== undefined){
				// 有参数 
				_t.val = HOST + "?distribution=" + e.phone
			}
		},
		methods:{
			sliderChange(e){
				let _t = this
				console.log("size："+ e.detail.value)
				_t.size = e.detail.value
			},
			makeCode(){
				let _t = this
				_t.$refs.qrcode._makeCode()
			},
			saveCode(){
				let _t = this
				_t.$refs.qrcode._saveCode()
			},
			clearCode(){
				let _t = this
				_t.$refs.qrcode._clearCode()
			}
		}
	}
	
</script>

<style>
	.page-content {
		background-color: #C0C0C0;
	}
</style>
