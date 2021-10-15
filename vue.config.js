// const path = require('path')
// 打包分析工具
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  outputDir: './build',
  productionSourceMap: false,
  // configureWebpack: {
  //   resolve: {
  //     alias: {
  //       views: '@/views'
  //     }
  //   },
  //   plugins: [
  //     // element plus 按需引入
  //     require('unplugin-element-plus/webpack')({})
  //   ]
  // },
  configureWebpack: (config) => {
    config.resolve.alias = {
      views: '@/views'
    }

    config.plugins.push(require('unplugin-element-plus/webpack')({}))
    // 生产环境的配置
    if (process.env.NODE_ENV === 'production') {
      if (process.env.npm_config_report) {
        config.plugins.push(new BundleAnalyzerPlugin())
      }
    }
  }
  // chainWebpack: (config) => {
  // config.resolve.alias
  //   .set('@', path.resolve(__dirname, 'src'))
  //   .set('views', '@/views')
  // if (process.env.NODE_ENV === 'production') {
  //   if (process.env.npm_config_report) {
  //     config
  //       .plugin('webpack-bundle-analyzer')
  //       .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
  //       .end()
  //   }
  // }
  // }
}
