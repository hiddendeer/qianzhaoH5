# leo-area-select
#### props
#### level 需要几级联动，默认一级
#### data 数据源 如不设置则使用系统自带省市区数据
#### props 配置选项，return { id: 'code', name: 'name', children: 'children' }
#### activeName  默认选中的省市区，如： ['广东省', '深圳市', '宝安区']
#### emit 
#### change 监听选中变化，返回选中的数据组
#### [{id: "110000", name: "北京市"},{id: "110000", name: "北京市"},{id: "110105", name: "朝阳区"}]


### 使用
#### import areaSelect from 'uni_modules/leo-area-select/components/leo-area-select/index.vue';
```javascript
	components:{
		areaSelect
	},
	
	template
	<areaSelect @change="changeArea" ></areaSelect>
	
	methods
	changeArea(result) {
		console.log('area change', result);
	}
	
```