<template>
	<view style="padding-top: 10px;">
		<uni-card title="输入邀请码查询" >
			<uni-forms>
				<uni-forms-item label="联系电话" required>
					<uni-easyinput 
					maxlength="11"
					type="number" 
					name="phone" 
					@blur="checkPhone()"
					v-model="phone" 
					placeholder="请输入手机号" 
					/>
				</uni-forms-item>
			</uni-forms>
			<button type="primary" @click="submit()">查看分销详情</button>
			<!-- 是否需要发送验证码 -->
			<br/>
			<button type="primary" @click="getUserInfo()">去个人中心</button>
		</uni-card>
		
		<view>
			<!-- 普通弹窗 -->
			<uni-popup ref="popup" background-color="#fff">
				<view class="popup-content right" >
					<uni-collapse style="width: 300px;"  accordion @change="change">
						<uni-collapse-item 
							v-for="item in list"
							:clickable="true"
							:title="'一级码：'+ item.code"  
							@click="getMySubordinate(item)"
							:rightText="item.profit_my_chil+'元'"
							>
							<view class="content" >
								<uni-table stripe>
									<uni-tr >
										<uni-th align="center" width="100px">本单收益</uni-th>
										<uni-th align="center" width="100px">本单状态</uni-th>
										<uni-th align="center" width="100px">操作</uni-th>
									</uni-tr>
									<uni-tr>
										<uni-td align="center">{{item.profit_my_chil}}元</uni-td>
										<uni-td 
										align="center" 
										:style="item.status == 0?'color:#0000ff':'color:#ff0000'">
										{{item.status == 0?'进行中':'已分润' }}
										</uni-td>
										<uni-td align="center">
											<view class="uni-group">
												<button 
												class="uni-button" 
												size="mini" 
												@click="getMySubordinate(item)"
												type="primary">
												ta的推荐
												</button>
											</view>
										</uni-td>
									</uni-tr>
								</uni-table>
								<uni-collapse v-show="hasNext(item.id)" style="width: 260px; margin-left: 35px;">
									<uni-list>
										<uni-list-item
										v-for="i in list2" 
										:title="'二级码:'+i.code" 
										:note="i.status == 0?'进行中':'已分润'" 
										:rightText="i.profit_my_chil+'元'" />
									</uni-list>
								</uni-collapse>
							</view>
						</uni-collapse-item>
						
					</uni-collapse>
					<uni-fab 
					ref="fab" 
					v-show="total >= 2"
					:pattern="pattern" 
					:content="content" 
					:horizontal="horizontal" 
					:vertical="vertical"
					direction="horizontal" 
					@trigger="trigger" 
					@fabClick="fabClick" />
					
					
					<uni-load-more 
					v-show="total >= 10"
					style="margin-bottom: 20px;" 
					:status="status"
					:contentText="contentText"
					></uni-load-more>
				</view>
			</uni-popup>
		</view>
		
	</view>
</template>

<script>
	import helper from '@/common/helper.js';
	export default {
		data() {
			return {
				total:0,
				page:1,
				page2:1,
				// active:true,
				phone:'',
				list:[],
				list2:[],
				id:0,
				status: 'more',
				contentText: {
					contentdown: '查看更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多'
				},
				
				horizontal: 'right',
				vertical: 'bottom',
				pattern: {
					color: '#7A7E83',
					backgroundColor: '#fff',
					selectedColor: '#007AFF',
					buttonColor: '#007AFF',
					iconColor: '#fff'
				},
				content: [{
						iconPath: '/static/image.png',
						selectedIconPath: '/static/image-active.png',
						text: '上一页',
						active: false
					},
					{
						iconPath: '/static/home.png',
						selectedIconPath: '/static/home-active.png',
						text: '下一页',
						active: false
					}
				]
			}
		},
		onLoad(e){
			let _t = this;
			// 获取url 参数
			console.log(e.phone)
			if(e.phone !== undefined){
				// 有参数 
				_t.phone = e.phone
			}
			
		},
		methods: {
			change(e) {
				console.log('当前模式：' + e.type + ',状态：' + e.show);
			},
			checkPhone(){
				let _t = this
				// 手机号为空
				if(_t.phone==""){
					uni.showToast({
						icon:'none',
						title: '号码不能为空',
						duration:2000
					})
					return
				}
				// 正则表达式验证手机号
				var checkphone = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
				if(!checkphone.test(_t.phone)){
					uni.showToast({
						icon:'none',
						title:'号码不合法'
					})
					return
				}
			},
			// 弹出层
			toggle() {
				let _t = this
				_t.$refs.popup.open('right');
			},
			hasNext(id){
				let _t = this
				return _t.id == id 
			},
			trigger(e) {
				console.log(e)
				uni.showToast({
					title:'e',
					icon: 'none'
				})
				// this.content[e.index].active = !e.item.active
				// uni.showModal({
				// 	title: '提示',
				// 	content: `您${this.content[e.index].active ? '选中了' : '取消了'}${e.item.text}`,
				// 	success: function(res) {
				// 		if (res.confirm) {
				// 			console.log('用户点击确定')
				// 		} else if (res.cancel) {
				// 			console.log('用户点击取消')
				// 		}
				// 	}
				// })
			},
			fabClick() {
				uni.showToast({
					title: '点击了悬浮按钮',
					icon: 'none'
				})
			},
			// 获取二级用户
			async getMySubordinate(item){
				console.log("item:" , item.code)
				let _t = this
				const res = await helper.myRequest({
					url:'getMyDistribution',
					method:'POST',
					data:{page:_t.page2 , phone:item.code}
				})
				if(res.data.code ==0){
					
					_t.id = item.id
					_t.list2 = res.data.data;
				}
				
			},
			async submit(){
				let _t = this
				if(_t.phone == ''){
					uni.showToast({
						title:'请输入您绑定时填写的手机号',
						duration:2000
					})
				}
				const res = await helper.myRequest({
					url:'getMyDistribution',
					method:'POST',
					data:{page:_t.page , phone:_t.phone}
				})
				
				if(res.data.code ==0){
					_t.total = res.data.msg;
					_t.list = res.data.data;
					// _t.active = false
					_t.toggle()
					
				}
			},
			// 获取用户详情
			async getUserInfo(){
				let _t =  this
				
				const res = await helper.myRequest({
					url:'getUserInfo',
					method:'POST',
					data:{page:_t.page , phone:_t.phone}
				})
				
				if(res.data.code ==0){
					// _t.userInfo = res.data.data;
					uni.setStorage({
						key: _t.phone,
						data: res.data.data,
						success: function () {
							console.log('用户信息已经缓存：' , res);
							uni.showModal({
								title:'获取成功',
								content:'是否离开本页去个人中心？',
								success: (res) => {
									if (res.confirm) {
										console.log('用户点击确定');
										uni.redirectTo({
											url: '../userInfo/userInfo?phone=' +_t.phone
										})
									} else if (res.cancel) {
										console.log('用户点击取消');
									}
								}
							})
						}
					});
				}
			}
		}
	}
</script>

<style>
	
</style>
