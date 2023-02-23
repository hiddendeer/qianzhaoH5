import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import Unocss from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    uni(),
    Unocss()
  ],
  css: {
    postcss: {
      plugins: [
        require("postcss-px-to-viewport")({
          unitToConvert: 'rpx',//需要转换的单位，默认为"px"
          viewportWidth: 750, // 视窗的宽度，对应的是我们设计稿的宽度，iPhone 6s 一般是375
          viewportHeight: 667, // 视窗的高度，iPhone 6s 一般是667
          unitPrecision: 3, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
          viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw
          selectorBlackList: ['.ignore', '.hairlines'], // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
          minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
          mediaQuery: false, // 允许在媒体查询中转换`px`
          fontViewportUnit: 'vw',//字体使用的视口单位
          exclude: [/node_modules/]
        })
      ]
    }
  },

  server: {
    open:true,
    proxy: {
      "/api": {
        // target: "http://120.48.115.253:18080",
        target: "http://www.qztele.com",
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, "api"),
      },
    },
  },
  // optimizeDeps: ['@dcloudio/uni-ui']
})
