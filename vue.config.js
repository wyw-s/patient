module.exports = {
  // 解决部署后访问空白页的问题；
  publicPath: './',
  // 输出文件目录 默认为: dist
  outputDir: 'dist',
  // 放置打包生成的静态资源 (js、css、img、fonts) 的目录。该目录相对于 outputDir 。
  assetsDir: 'static',
  // 为生产环境禁用 SourceMap
  productionSourceMap: false,
  // 将打包生成的的静态资源的文件名中加入hash以便控制浏览器缓存问题。
  filenameHashing: false,
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: process.env.NODE_ENV === 'production',
    // 开启 CSS source maps?
    sourceMap: false
  },
  chainWebpack: config => {
    config.plugin('html')
      .tap(args => {
        args[0].title = '百草堂'
        return args
      })
  },
  devServer: {
    host: '0.0.0.0',
    port: 8086,
    open: true,
    hot: true,
    proxy: {
      '/customer': {
        target: 'http://47.114.139.71:9091',
        changeOrigin: true,
        pathRewrite: {
          '^/customer': '/'
        }
      }
    }
  }
}
