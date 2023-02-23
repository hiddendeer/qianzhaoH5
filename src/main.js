import {
	createSSRApp
} from "vue";
import App from "./App.vue";
// 状态管理
import store from './store/index' // pinia状态管理
// 工具类引入
import utils from '@/components/firstui/fui-utils'; // firstUI 工具类
// css
import 'uno.css'



export function createApp() {
	const app = createSSRApp(App);

	app.config.globalProperties.$utils = utils;
	app.use(store)

	return {
		app,
	};
}
