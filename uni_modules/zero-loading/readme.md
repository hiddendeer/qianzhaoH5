# zero-loading


## 使用方法

导入 `uni_modules` 后直接使用即可

提供多种加载动画类型,传入type改变loading样式，不传默认circle

### 全屏使用
```html
<template v-if="error">
	<view >{{error.message}}</view>
</template>
<template v-else-if="loading">
	<zero-loading></zero-loading>
</template>
<template v-else>

//或

<zero-loading v-if="loading"></zero-loading>

```

### 局部使用

**父元素的 `position` 记得改为 `relative` 哦**

```html

<zero-loading  type="pulse" position="absolute"></zero-loading>

```


## 参数说明

|参数		|类型	|默认值	|描述			|
|--			|--		|--		|--				|
|type		|String	|circle	|样式		|
|position	|String	|fixed	|定位方式		|
|zIndex		|Number	|9		|				|
|mask		|Boolean|false	|是否需要遮罩	|

### type可选值：
- circle
- love
- pulse
- sun
- eyes
- triangle
- bounce

插件预览:
![code](https://img.jszero.cn/mweb/we_code.jpg)