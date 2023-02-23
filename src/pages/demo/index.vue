<template>
	<fui-upload-video immediate :url="url"  :header="header"  :fileList="fileList" ref="upload"
		@success="success" @error="error" @complete="complete"></fui-upload-video>

<!-- <video src="http://120.48.115.253:18080/files/plan/220831211231709_kbmmgxv.mp4"></video>
<video src="https://fastly.jsdelivr.net/gh/scuiadmin/CDN/video/scui-player-demo-720.mp4"></video> -->

</template>

<script>
export default {
	data() {
		return {
			//上传接口地址
			url: 'https://ffa.firstui.cn/api/example/upload-file',
			fileList: [],
			fileList: ['http://120.48.115.253:18080/files/plan/220831211231709_kbmmgxv.mp4','https://fastly.jsdelivr.net/gh/scuiadmin/CDN/video/scui-player-demo-720.mp4'],
			// fileList: [],
			//上传状态，用于保存或其他操作时做判断
			status: '',
			//上传的视频地址列表
			urls: [],
			header: {
				// 'Authorization': 'JWT ' + localStorage.getItem('TOKEN')
				accept: '*/*'
			},
			formData: {
				name:
					33,
				goods_id:
					33,
				base_product_id:
					33,
				price:
					33,
				des_content:
					33,
				status: 'outline',
				type: 'common'

			}
		}
	},
	methods: {
		//上传成功时触发
		success(e) {
			//e.res 为服务器返回数据
			//上传成功回调，处理服务器返回数据【此处根据实际返回数据进行处理】
			let res = JSON.parse(e.res.data.replace(/\ufeff/g, "") || "{}")
			console.log(res)

			this.status = e.status
			if (res.data.url) {
				//处理结果返回给组件 
				//res.data.url为上传成功后返回的视频地址
				//e.index为视频索引值
				this.$refs.upload.result(res.data.url, e.index)
			}
		},
		//上传失败时触发
		error(e) {
			this.status = e.status
		},
		//选择视频或上传完成时触发
		complete(e) {
			this.status = e.status
			this.urls = e.urls
			if (this.status === 'success' && e.action === 'upload') {
				// this.fui.toast('上传完成！')
				//已上传完成的视频列表 this.urls
				console.log(this.urls)
			}
		}
	}


}
</script>

<style lang="scss" scoped>
.demoClass {
	font-size: 16px;
}
</style>
