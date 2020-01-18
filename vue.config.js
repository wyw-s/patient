module.exports = {
  devServer: {
    host: 'localhost',
    port: 8080,
    proxy: {
      '/customer': {
        target: 'http://106.12.205.155',
        changeOrigin: true,
        pathRewrite: {
          '^/customer': ''
        }
      }
    }
  }
}
