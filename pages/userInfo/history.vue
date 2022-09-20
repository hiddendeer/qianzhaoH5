<template>
	<div>
		<uni-nav-bar 
		@clickLeft="goBack()"
		left-icon="back" 
		title="提现历史">
		</uni-nav-bar>
		
		<uni-list class="my-content">
			<uni-list-item 
			v-for="(item,index) in list" 
			:key="index" 
			:title="'提现:'+item.balance+'元'"
			:rightText="item.status==0?'提现中':item.status=='1'?'提现完成':'不成功'"
			:note="item.created">
			</uni-list-item>
			
			<uni-load-more @clickLoadMore="myLoadMore()" iconType="circle" :status="loadstatus"></uni-load-more>
		</uni-list>
		
		
	</div>
</template>

<script>
	import helper from '@/common/helper.js';
	export default {
		data() {
			return {
				page:1,
				phone:'',
				status:9, 
				total:0,
				list:[],
				loadstatus:'more',
			}
		},
		onLoad(option) {
			let _t = this
			console.log("phone：",option.phone)
			if(option.phone==''){
				uni.showToast({
					icon:'none',
					title: '参数异常',
					duration:2000
				})
				
				_t.loadstatus = 'no-more'
			}else{
				console.log(_t.loadstatus)
				_t.phone = option.phone
				_t.loadstatus = 'loading'
				_t.getList();
			}
			
		},
		methods:{
			goBack(){
				uni.navigateBack()
			},
			onReachBottom() {
				let _t = this
				if(_t.loadstatus != 'no-more'){
					_t.loadstatus = 'loading'
					_t.getList()
				}
			},
			myLoadMore(){
				let _t = this
				if(_t.loadstatus != 'no-more'){
					_t.loadstatus = 'loading'
					_t.getList()
				}
			},
			async getList(){
				let _t = this
				
				console.log(_t.page + "-"+ _t.phone+"-"+_t.status)
				const res = await helper.myRequest({
					url:'getHistory',
					method:'POST',
					data:{
						page:_t.page , 
						phone:_t.phone , 
						status:_t.status,
					}
				})
				
				console.log("------",res.data.code)
				if(res.data.code ==0){
					if(_t.page == 1){
						_t.total = res.data.msg;
						_t.list = res.data.data;	
					}else{
						_t.list = _t.list.concat(res.data.data);
					}
					
					if(_t.page*10 < _t.total){
						_t.page=_t.page+1
						_t.loadstatus = 'more'
					}else{
						_t.loadstatus = 'no-more'
					}
					
				}else{
					uni.showToast({
						icon:'none',
					    title: res.data.msg,
						duration:2000
					})
					_t.loadstatus = 'no-more'
				}
				
			}
		}
	}
</script>

<style >
	.my-content{
		overflow-y: auto;
		height: auto;
	}
</style>
